function MapToolBox(container, layout) {
  thisMTB = this;
  thisMTB.layout = layout;
  var usOn = true;
  var textButton = 'Map';


  // Create the buttons
  d3.select('#maptoolbox').append('svg')
  .attr('class', 'button usmap')
  .attr('viewBox', '0 0 ' + 100 + ' ' + 100)
  .attr('preserveAspectRatio', 'xMidYMid meet')
  .on('click', function () {
    if(textButton == 'Map') {
      d3.select('.usmap').style('width', '100%');
      d3.select('.worldmap').style('width', '0%');
    } else {
      d3.select('.usmapList').style('width', '100%');
      d3.select('.worldmapList').style('width', '0%');
    }
    usOn = true;
  })
  .append('text')
  .attr('text-anchor', 'middle')
  .attr('dominant-baseline', 'central')
  .attr('font-family', 'FontAwesome')
  .attr('font-size', 35)
  .attr('font-weight', 200)
  .attr('color', 'rgb(64, 64, 64)')
  .attr('x', 50)
  .attr('y', 40)
  .text("USA");


  d3.select('#maptoolbox').append('svg')
  .attr('class', 'switchbutton')
  .attr('viewBox', '0 0 ' + 100 + ' ' + 100)
  .attr('preserveAspectRatio', 'xMidYMid meet')
  .on('click', function () {
    if(textButton == 'Map') {
      textButton = 'List';
      d3.select('.switchbuttontext').text('\uf278');
      if(usOn) {
        d3.select('.usmap').style('width', '0%');
        d3.select('.usmapList').style('width', '100%');
      } else {
        d3.select('.worldmap').style('width', '0%');
        d3.select('.worldmapList').style('width', '100%');
      }
    } else {
     textButton = 'Map';
     d3.select('.switchbuttontext').text('\uf0ca');
     if(usOn) {
      d3.select('.usmap').style('width', '100%');
      d3.select('.usmapList').style('width', '0%');
    } else {
      d3.select('.worldmap').style('width', '100%');
      d3.select('.worldmapList').style('width', '0%');
    }
  }
})
  .append('text')
  .attr('class', 'switchbuttontext')
  .attr('text-anchor', 'middle')
  .attr('dominant-baseline', 'central')
  .attr('font-family', 'FontAwesome')
  .attr('font-size', 60)
  .attr('font-weight', 200)
  .attr('color', 'rgb(64, 64, 64)')
  .attr('x', 50)
  .attr('y', 40)
  .text(function(d) {
    return '\uf0ca';});

   /*f278
   f03a*/
   d3.select('#maptoolbox').append('svg')
   .attr('class', 'button worldmap')
   .attr('viewBox', '0 0 ' + 100 + ' ' + 100)
   .attr('preserveAspectRatio', 'xMidYMid meet')
   .on('click', function () {
    if(textButton == 'Map') {
      d3.select('.usmap').style('width', '0%');
      d3.select('.worldmap').style('width', '100%');
    } else {
      d3.select('.usmapList').style('width', '0%');
      d3.select('.worldmapList').style('width', '100%');
    }
    usOn = false;
  })
   .append('text')
   .attr('text-anchor', 'middle')
   .attr('dominant-baseline', 'central')
   .attr('font-family', 'FontAwesome')
   .attr('font-size', 35)
   .attr('font-weight', 200)
   .attr('color', 'rgb(64, 64, 64)')
   .attr('x', 50)
   .attr('y', 40)
   .text("WORLD");

 }
