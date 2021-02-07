var width = 1200,
    height = 600,
		margin = 50,
    radius = Math.min(width, height) / 2 - margin;

    //.range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

var arc = d3.arc()
	.outerRadius(radius * 0.7)
	.innerRadius(radius * 0.02);

var labelArc = d3.arc()
	.outerRadius(radius * 1.2)
	.innerRadius(radius * 1.2);

var pie = d3.pie()
    .sort(null)
    .value(function(d) { return d.Budget; });

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var offset = -250;

var tooltip = d3.select("body")
	.append("div")
		.style("position", "absolute")
		.style("text-align", "center")
		.style("width", "60px")
		.style("height", "30px")
    .style("background-color", "white");

var arr = [];
d3.csv("../../../../../../assets/budget.csv", type, function(error, data) {
  if (error) throw error;

var row = 16;
sorted_data = data.sort(function (x, y) {return d3.descending(+x.Budget, +y.Budget)});

arr.push([data.Ministry, data.Budget]);

console.log(data);

var color = d3.scaleSequential()
    .interpolator(d3.interpolateInferno)
    .domain([1,16]);

  var g = svg.selectAll(".arc")
      .data(pie(sorted_data))
    .enter().append("g")
      .attr("class", "arc");
// create a tooltip

  g.append("path")
      .attr("d", arc)
      .style("fill", function(d) {row = row - 1; return color(row); })
			.attr("stroke", "black")
				.style("stroke-width", "1px")
				.style("opacity", 0.9)
				.on("mouseenter", function(d) {		
						tooltip.style("opacity", .9);		
						tooltip.html((d.data.Ministry) + "<br/>"  + d.data.Budget / 1000000000 + 'bln')
										.style("left", (d3.event.pageX) + "px")
										.style("top", (d3.event.pageY - 28) + "px");})
				.on("mousemove", function(d) {
						tooltip.style("opacity", .9);
						tooltip.html((d.data.Ministry) + "<br/>"  + d.data.Budget / 1000000000 + 'bln')
										.style("left", (d3.event.pageX) + "px")
										.style("top", (d3.event.pageY - 28) + "px");})
				.on("mouseout", function(d) {		
						tooltip.style("opacity", 0);});

  g.append("text")
      .attr("transform", function(d) {offset = offset + 30; return "translate(250, " + offset + ")"; })
      .attr("dy", ".65em")
      .text(function(d) { return d.data.Ministry; });

});
    
console.log(arr);

function type(d) {
  d.Budget= +d.Budget;
  return d;
}
