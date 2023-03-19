var dataset = [];
for (var i = 0; i < 10; i++) {
  dataset.push(Math.random() * 50);
}

var svgWidth = 500;
var svgHeight = 300;
var barPadding = 5;
var barWidth = (svgWidth / dataset.length);

var svg = d3.select('#barplot')
            .append('svg')
            .attr('width', svgWidth)
            .attr('height', svgHeight);

var bars = svg.selectAll('rect')
              .data(dataset)
              .enter()
              .append('rect')
              .attr('x', function(d, i) {
                return i * barWidth;
              })
              .attr('y', function(d) {
                return svgHeight - d;
              })
              .attr('width', barWidth - barPadding)
              .attr('height', function(d) {
                return d;
              })
              .attr('fill', 'steelblue');
