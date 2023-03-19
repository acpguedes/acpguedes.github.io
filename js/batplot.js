var data = [];

for (var i = 0; i < 10; i++) {
    data.push(Math.random() * 100);
}

var svg = d3.select("#barplot")
    .append("svg")
    .attr("width", 400)
    .attr("height", 300);

var bars = svg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", function(d, i) {
        return i * 40;
    })
    .attr("y", function(d) {
        return 300 - d;
    })
    .attr("width", 30)
    .attr("height", function(d) {
        return d;
    })
    .attr("fill", "blue");
