import { Component, OnInit } from '@angular/core';
import * as R from 'ramda';
import * as d3 from '../../../../assets/js/d3.v4.min';

@Component({
  selector: 'grouped-bar-chart',
  templateUrl: './grouped-bar-chart.component.html',
  styleUrls: ['./grouped-bar-chart.component.scss']
})
export class GroupedBarChartComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    setTimeout(() => {
      const svg = d3.select('svg'),
        margin = { top: 20, right: 20, bottom: 30, left: 40 },
        width =
          document.querySelector('svg').width.animVal.value -
          margin.left -
          margin.right,
        height = +svg.attr('height') - margin.top - margin.bottom,
        g = svg
          .append('g')
          .attr(
            'transform',
            'translate(' + margin.left + ',' + margin.top + ')'
          );

      const x0 = d3
        .scaleBand()
        .rangeRound([0, width])
        .paddingInner(0.1);

      const x1 = d3.scaleBand().padding(0.05);

      const y = d3.scaleLinear().rangeRound([height, 0]);

      const z = d3.scaleOrdinal().range(['#bd0000', '#0000bd', '#bdbd00']);

      const tooltip = d3
        .select('body')
        .append('div')
        .attr('class', 'toolTip');

      d3.json('./assets/resources/data.json', function(data) {
        data = R.pipe(
          R.filter(row => row.yearly > 0),
          R.sortBy(R.prop('yearly')),
          R.reverse
        )(data);
        const keys = R.keys(data[0]).slice(1);

        x0.domain(
          data.map(function(d) {
            return d.expense;
          })
        );
        x1.domain(keys).rangeRound([0, x0.bandwidth()]);
        y.domain([
          0,
          d3.max(data, function(d) {
            return d3.max(keys, function(key) {
              return d[key];
            });
          })
        ]).nice();

        g.append('g')
          .selectAll('g')
          .data(data)
          .enter()
          .append('g')
          .attr('transform', function(d) {
            return 'translate(' + x0(d.expense) + ',0)';
          })

          .selectAll('rect')
          .data(function(d) {
            return keys.map(function(key) {
              return { key: key, value: d[key] };
            });
          })
          .enter()
          .append('rect')
          .attr('x', function(d) {
            return x1(d.key);
          })
          .attr('y', function(d) {
            return y(d.value);
          })
          .attr('width', x1.bandwidth())
          .attr('height', function(d) {
            return height - y(d.value);
          })
          .attr('fill', function(d) {
            return z(d.key);
          })
          .on('mousemove', function(d) {
            tooltip
              .style('left', d3.event.pageX + 'px')
              .style('top', d3.event.pageY - 25 + 'px')
              .style('display', 'inline-block')
              .html(d.value);
          })
          .on('mouseout', function(d) {
            tooltip.style('display', 'none');
          });

        g.append('g')
          .attr('class', 'axis')
          .attr('transform', 'translate(0,' + height + ')')
          .call(d3.axisBottom(x0));

        g.append('g')
          .attr('class', 'axis')
          .call(d3.axisLeft(y).ticks(null, 's'))
          .append('text')
          .attr('x', 2)
          .attr('y', y(y.ticks().pop()) + 0.5)
          .attr('dy', '0.32em')
          .attr('fill', '#000')
          .attr('font-weight', 'bold')
          .attr('text-anchor', 'start');

        const legend = g
          .append('g')
          .attr('font-family', 'sans-serif')
          .attr('font-size', 10)
          .attr('text-anchor', 'end')
          .selectAll('g')
          .data(keys.slice().reverse())
          .enter()
          .append('g')
          .attr('transform', function(d, i) {
            return 'translate(0,' + i * 20 + ')';
          });

        legend
          .append('rect')
          .attr('x', width - 19)
          .attr('width', 19)
          .attr('height', 19)
          .attr('fill', z);

        legend
          .append('text')
          .attr('x', width - 24)
          .attr('y', 9.5)
          .attr('dy', '0.32em')
          .text(function(d) {
            return d;
          });
      });
    });
  }
}
