function WorldMapList(map) {
  thisWML = this;
  thisWML.map = map;

  var countryNames = ["gap","Afghanistan","Bangladesh","Belgium", "Brazil", "Canada", "China", "Colombia", "Croatia",
   "Denmark","Gabon", "Germany", "Greece", "Egypt", "Finland","France", "Hungary", "India","Indonesia","Iraq", "Japan", "Kuwait", "Italy",
   "Lebanon","Mexico", "Morocco", "Netherlands", "Nigeria",
   "Pakistan","Philippines", "Poland","Portugal", "Russia", "Singapore", "Spain", "Serbia", "South Africa","Sweden", "Switzerland", "Taiwan",
   "Turkey", "United Kingdom", "United States", "Vietnam"];

  thisWML.svg = d3.select('#mapbox')
  .append('svg')
  .attr('class', 'worldmapList')
  .attr('width', '0%')
  .attr('height', '100%')
  .attr('viewBox', '0 0 960 700')
  .attr('preserveAspectRatio', 'xMinYMin meet');

  for (var i = 1; i < countryNames.length; i++) {
    thisWML.svg.append('text')
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
      thisWML.map.nameClicked(this.innerHTML);
    }
    )
    .text(countryNames[i]);
  }

}
