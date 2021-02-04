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
var svg = d3.select("#d3div")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data
d3.csv("../../../../../../assets/budget.csv", function(data) {

// X axis
var x = d3.scaleBand()
  .range([ 0, width ])
  .domain(data.map(function(d) { return d.Ministry; }))
  .paddingInner(0.2);
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))
  .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

// Add Y axis
var y = d3.scaleLinear()
  .domain([0, 20000000000])
  .range([ height, 0]);
svg.append("g")
  .call(d3.axisLeft(y)
	.tickFormat(d => d/1000000000 + " bln"));
	//.tickFormat( data.map( function(d) {return d.Budget/1000000 + " Million"})));

// Bars
svg.selectAll("mybar")
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


</script>
