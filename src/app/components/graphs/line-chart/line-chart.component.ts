import { Component, OnInit, Input } from '@angular/core';

import * as d3 from '../../../../assets/js/d3.v4.min';

@Component({
  selector: 'line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {
  @Input() selector: string;
  @Input() showAxes?: boolean;
  @Input() showGrid?: boolean;
  @Input() showPoints?: boolean;
  @Input() width?: number;
  @Input() height: number;

  constructor() {}

  ngOnInit() {
    setTimeout(() => {
      // 2. Use the margin convention practice
      const margin = { top: 50, right: 50, bottom: 50, left: 50 },
        width = this.width
          ? this.width
          : document.querySelector(this.selector).clientWidth -
            margin.left -
            margin.right, // Use the window's width
        height = this.height - margin.top - margin.bottom; // Use the window's height

      // The number of datapoints
      const n = 7;

      // 5. X scale will use the index of our data
      const xScale = d3
        .scaleLinear()
        .domain([0, n - 1]) // input
        .range([0, width]); // output

      // 6. Y scale will use the randomly generate number
      const yScale = d3
        .scaleLinear()
        .domain([0, 1]) // input
        .range([height, 0]); // output

      // 7. d3's line generator
      const line = d3
        .line()
        .x(function(d, i) {
          return xScale(d.x);
        }) // set the x values for the line generator
        .y(function(d) {
          return yScale(d.y);
        }) // set the y values for the line generator
        .curve(d3.curveMonotoneX); // apply smoothing to the line

      // 8. An array of objects of length N. Each object has key -> value pair, the key being "y" and the value is a random number
      d3.json('./assets/resources/line-graph.json', (data) => {
        const dataset = d3.range(n).map(function(d) {
          return { y: d3.randomUniform(1)() };
        });

        // 1. Add the SVG to the page and employ #2
        const svg = d3
          .select(this.selector)
          .append('svg')
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom)
          .append('g')
          .attr(
            'transform',
            'translate(' + margin.left + ',' + margin.top + ')'
          );

        // gridlines in x axis function
        function make_x_gridlines() {
          return d3.axisBottom(xScale).ticks(7);
        }

        // gridlines in y axis function
        function make_y_gridlines() {
          return d3.axisLeft(yScale).ticks(5);
        }
        if (this.showAxes) {
          // 3. Call the x axis in a group tag
          svg
            .append('g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0,' + height + ')')
            .call(d3.axisBottom(xScale)); // Create an axis component with d3.axisBottom

          // 4. Call the y axis in a group tag
          svg
            .append('g')
            .attr('class', 'y axis')
            .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft
        }

        if (this.showGrid) {
          // add the X gridlines

          svg
            .append('g')
            .attr('class', 'grid')
            .attr('transform', 'translate(0,' + height + ')')
            .call(
              make_x_gridlines()
                .tickSize(-height)
                .tickFormat('')
            );

          // add the Y gridlines
          svg
            .append('g')
            .attr('class', 'grid')
            .call(
              make_y_gridlines()
                .tickSize(-width)
                .tickFormat('')
            );
        }

        // 9. Append the path, bind the data, and call the line generator
        svg
          .append('path')
          .datum(data) // 10. Binds data to the line
          .attr('class', 'line') // Assign a class for styling
          .attr('d', line); // 11. Calls the line generator

        if (this.showPoints) {
          // 12. Appends a circle for each datapoint
          svg
            .selectAll('.dot')
            .data(data)
            .enter()
            .append('circle') // Uses the enter().append() method
            .attr('class', 'dot') // Assign a class for styling
            .attr('cx', function(d, i) {

              return xScale(d.x);
            })
            .attr('cy', function(d) {
              return yScale(d.y);
            })
            .attr('r', 4);
        }
      });
    });
  }
}
