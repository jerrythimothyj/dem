import { Component, OnInit, Input } from '@angular/core';

import * as d3 from 'd3';

@Component({
  selector: 'bubble-chart',
  templateUrl: './bubble-chart.component.html',
  styleUrls: ['./bubble-chart.component.scss']
})
export class BubbleChartComponent implements OnInit {
  @Input() selector: string;
  @Input() data: any;

  constructor() {}

  ngOnInit() {
    setTimeout(() => {
      if (this.data.length > 0) {
        const dataset = {
          children: this.data
        };

        const diameter = document.querySelector(this.selector).clientWidth;
        const color = d3.scaleOrdinal(d3.schemeCategory20);

        const bubble = d3
          .pack(dataset)
          .size([diameter, diameter])
          .padding(1.5);

        const svg = d3
          .select(this.selector)
          .append('svg')
          .attr('width', diameter)
          .attr('height', diameter)
          .attr('class', 'bubble');

        const nodes = d3.hierarchy(dataset).sum(function(d) {
          return d.value;
        });

        const node = svg
          .selectAll('.node')
          .data(bubble(nodes).descendants())
          .enter()
          .filter(function(d) {
            return !d.children;
          })
          .append('g')
          .attr('class', 'node')
          .attr('transform', function(d) {
            return 'translate(' + d.x + ',' + d.y + ')';
          });

        node.append('title').text(function(d) {
          return d.name + ': ' + d.value;
        });

        node
          .append('circle')
          .attr('r', function(d) {
            return d.r;
          })
          .style('fill', function(d, i) {
            return d.data.color;
          });

        node
          .append('text')
          .attr('dy', '.2em')
          .style('text-anchor', 'middle')
          .text(function(d) {
            return d.data.name.substring(0, d.r / 3);
          })
          .attr('font-family', 'sans-serif')
          .attr('font-size', function(d) {
            return d.r / 5;
          })
          .attr('fill', 'white');

        node
          .append('text')
          .attr('dy', '1.3em')
          .style('text-anchor', 'middle')
          .text(function(d) {
            return d.data.value;
          })
          .attr('font-family', 'Gill Sans', 'Gill Sans MT')
          .attr('font-size', function(d) {
            return d.r / 5;
          })
          .attr('fill', 'white');

        d3.select(self.frameElement).style('height', diameter + 'px');
      }
    });
  }
}
