function MapList(map) {
  thisML = this;
  thisML.map = map;

  var countryNames = db.getUSNames();
  console.log(countryNames);

  thisML.svg = d3.select('#mapbox')
  .append('svg')
  .attr('class', 'usmapList')
  .attr('width', '0%')
  .attr('height', '100%')
  .attr('viewBox', '0 0 960 700')
  .attr('preserveAspectRatio', 'xMinYMin meet');

  for (var i = 1; i < countryNames.length; i++) {
    thisML.svg.append('text')
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'central')
    .attr('font-family', 'Arial')
    .attr('font-size', '30px')
    .attr('dy', '.3em')
    .attr('color', 'rgb(64, 64, 64)')
    .attr('x', function () {
      if (i%4 == 1) {
        return '14%';
      } else if (i%4 == 2) {
        return '38%';
      } else if (i%4 == 3) {
        return '62%';
      } else if (i%4 == 0) {
        return '86%';
      }
    })
    .attr('y', function () {
      return (50 + Math.floor(i/4)*50);
    })
    .on('click', function () {
      console.log(this.innerHTML);
      thisML.map.nameClicked(this.innerHTML);
    }
    )
    .text(countryNames[i]);
  }

}
