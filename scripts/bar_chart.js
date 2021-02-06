// set the dimensions and margins of the graph
var margin = {top: 10, right: 10, bottom: 200, left: 150},
    width = 1500 - margin.left - margin.right,
    height = 800 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg_bar = d3.select("body")
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

svg_bar.append('g')
    .attr('class', 'grid')
    .attr('transform', 'translate(width, 0)')
    .call(d3.axisLeft()
        .scale(y)
        .tickSize(-width, 0, 0)
        .tickFormat(''))
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
		.on('mouseenter', function (actual, i) {
				d3.select(this)
						.transition()
						.duration(300)
						.attr('opacity', 0.6)
						.attr('x', (a) => x(a.Ministry) - 5)
						.attr('width', x.bandwidth() + 10);
      
			 const y_v = y(actual.Budget)

			 svg_bar.append('line')
				.attr('id', 'limit')
        .attr('x1', 0)
        .attr('y1', y_v)
        .attr('x2', width)
        .attr('y2', y_v)
        .attr('stroke', 'red')
})
			.on('mouseleave', function () {
					d3.selectAll('.value')
						.attr('opacity', 1)

					d3.select(this)
						.transition()
						.duration(300)
						.attr('opacity', 1)
						.attr('x', (a) => x(a.Ministry))
						.attr('width', x.bandwidth())

					svg_bar.selectAll('#limit').remove()
					svg_bar.selectAll('.divergence').remove()
				})

})
