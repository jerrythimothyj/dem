import { Component, OnInit } from '@angular/core';

import * as d3 from 'd3';

@Component({
  selector: 'horizontal-bar-chart',
  templateUrl: './horizontal-bar-chart.component.html',
  styleUrls: ['./horizontal-bar-chart.component.scss']
})
export class HorizontalBarChartComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    setTimeout(() => {
      let data = [
        {
          name: 'Apples',
          value: 20
        },
        {
          name: 'Bananas',
          value: 12
        },
        {
          name: 'Grapes',
          value: 19
        },
        {
          name: 'Lemons',
          value: 5
        },
        {
          name: 'Limes',
          value: 16
        },
        {
          name: 'Oranges',
          value: 26
        },
        {
          name: 'Pears',
          value: 30
        }
      ];

      // sort bars based on value
      data = data.sort(function(a, b) {
        return d3.ascending(a.value, b.value);
      });

      // set up svg using margin conventions - we'll need plenty of room on the left for labels
      const margin = {
        top: 15,
        right: 25,
        bottom: 15,
        left: 60
      };

      const width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

      const svg = d3
        .select('#graphic')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      const x = d3
        .scaleLinear()
        .range([0, width])
        .domain([
          0,
          d3.max(data, function(d) {
            return d.value;
          })
        ]);

      const y = d3
        .scaleBand()
        .range([height, 0], 0.1)
        .domain(
          data.map(function(d) {
            return d.name;
          })
        );

      // make y axis to show bar names
      const yAxis = d3.axisLeft(y);

      const gy = svg
        .append('g')
        .attr('class', 'y axis')
        .call(yAxis);

      const bars = svg
        .selectAll('.bar')
        .data(data)
        .enter()
        .append('g');

      // append rects
      bars
        .append('rect')
        .attr('class', 'bar')
        .attr('y', function(d) {
          return y(d.name);
        })
        .attr('height', y.bandwidth())
        .attr('x', 0)
        .attr('width', function(d) {
          return x(d.value);
        });

      // add a value label to the right of each bar
      bars
        .append('text')
        .attr('class', 'label')
        // y position of the label is halfway down the bar
        .attr('y', function(d) {
          return y(d.name) + y.bandwidth() / 2 + 4;
        })
        // x position is 3 pixels to the right of the bar
        .attr('x', function(d) {
          return x(d.value) + 3;
        })
        .text(function(d) {
          return d.value;
        });
    });
  }
}
