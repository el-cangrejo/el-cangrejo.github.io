svg = d3.select('body')
  .append('svg')
  .style('background-color', 'yellow');
  // .attr("width", 500)
  // .attr("height", 200);

svg_1 = d3.select('#svg_1')
  .append('svg')
  .style('background-color', 'black')
  .attr("width", 500)
  .attr("height", 200);

svg_2 = d3.select('#svg_2').append('svg').style('background-color', 'blue');

svg_3 = d3.select('#svg_1').append('svg').style('background-color', 'blue');

