---
layout: post
title:  "Greek Govt Budget per Ministry"
date:   2021-01-02 16:55:42 -0300
categories: combinatorial optimization
---
<script src="//code.jquery.com/jquery.js"></script>
<style>

.node {
  stroke: #fff;
  stroke-width: 1.5px;
}

.link {
  stroke: #999;
  stroke-opacity: .6;
}

</style>

<div id='d3div'></div>

<script src="//d3js.org/d3.v4.js"></script>

<script>

// set the dimensions and margins of the graph
var margin = {top: 50, right: 50, bottom: 150, left: 50},
    width = 560 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg_bar = d3.select("#d3div")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data
d3.csv("../../../../../../assets/budget.csv", function(data) {

sorted_data = data.sort(function (x, y) {return d3.descending(+x.Budget, +y.Budget)});

// X axis
var x = d3.scaleBand()
  .range([ 0, width ])
  .domain(data.map(function(d) { return d.Ministry; }))
  .paddingInner(0.2);
svg_bar.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))
  .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

// Add Y axis
var y = d3.scaleLinear()
  .domain([0, 20000000000])
  .range([ height, 0]);
svg_bar.append("g")
  .call(d3.axisLeft(y)
	.tickFormat(d => d/1000000000 + " bln"));
	//.tickFormat( data.map( function(d) {return d.Budget/1000000 + " Million"})));

// Bars
svg_bar.selectAll("mybar")
  .data(data)
  .enter()
  .append("rect")
    .attr("x", function(d) { return x(d.Ministry); })
    .attr("y", function(d) { return y(d.Budget) ; })
    .attr("width", x.bandwidth())
    .attr("height", function(d) { return (height - y(d.Budget)); })
    .attr("fill", "#69b3a2")
//
})

var width = 960,
    height = 400,
    radius = Math.min(width, height) / 2;

var color = d3.scaleOrdinal(d3.schemeCategory10);
    //.range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

var arc = d3.arc()
	.outerRadius(radius * 0.8)
	.innerRadius(0);

var labelArc = d3.arc()
	.outerRadius(radius * 1.1)
	.innerRadius(radius * 1.5);

var pie = d3.pie()
    .sort(null)
    .value(function(d) { return d.Budget; });

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

d3.csv("../../../../../../assets/budget.csv", type, function(error, data) {
  if (error) throw error;
  
  console.log(pie(data))

  var g = svg.selectAll(".arc")
      .data(pie(sorted_data))
    .enter().append("g")
      .attr("class", "arc");

  g.append("path")
      .attr("d", arc)
      .style("fill", function(d) { return color(d.data.Ministry); });

  g.append("text")
      .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .text(function(d) { return d.data.Ministry; });

});

function type(d) {
  d.Budget= +d.Budget;
  return d;
}
</script>
