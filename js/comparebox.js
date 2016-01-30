function CompareBox(container, layout) {
  thisCB = this;
  thisCB.layout = layout;
  var showPercentageOn = false;

  // Create the buttons

  var percentageButtonDiv = d3.select('#comparebox')
  .append('div')
  .attr('class', 'percentagebuttondiv');

  var compareButtonDiv = d3.select('#comparebox')
  .append('div')
  .attr('class', 'comparebuttondiv');

  percentageButtonDiv.append('svg')
  .attr('class', 'percentagebutton')
  .attr('viewBox', '0 0 ' + 200 + ' ' + 100)
  .attr('preserveAspectRatio', 'xMidYMid meet')
  .on('click', function () {
    thisCB.percentageToggle();
    if(showPercentageOn) {
      d3.select('.togglepercentagetext').text('ABS');
    } else {
      d3.select('.togglepercentagetext').text('%');
    }
  })
  .append('text')
  .attr('class', 'togglepercentagetext')
  .attr('text-anchor', 'middle')
  .attr('dominant-baseline', 'central')
  .attr('font-family', 'Arial')
  .attr('font-size', '30px')
  .attr('dy', '.3em')
  .attr('color', 'rgb(64, 64, 64)')
  .attr('x', '50%')
  .attr('y', '40%')
  .text('%');

  compareButtonDiv.append('svg')
  .attr('class', 'comparebutton')
  .attr('viewBox', '0 0 ' + 200 + ' ' + 100)
  .attr('preserveAspectRatio', 'xMidYMid meet')
  .on('click', function () {
    thisCB.compare();
  })
  .append('text')
  .attr('text-anchor', 'middle')
  .attr('dominant-baseline', 'central')
  .attr('font-family', 'Arial')
  .attr('font-size', '30px')
  .attr('dy', '.3em')
  .attr('color', 'rgb(64, 64, 64)')
  .attr('x', '50%')
  .attr('y', '40%')
  .text('COMPARE');

  thisCB.percentageToggle = function () {
    if(showPercentageOn) {
      showPercentageOn = false;
      thisCB.layout.setPercentageOn(false);
      for (var i = 0; i < thisCB.layout.columns.length; i++) {
        thisCB.layout.columns[i].getBarchart().setPercentageOn(false);
      }
    } else {
      showPercentageOn = true;
      thisCB.layout.setPercentageOn(true);
      for (var i = 0; i < thisCB.layout.columns.length; i++) {
        thisCB.layout.columns[i].getBarchart().setPercentageOn(true);
      }
    }
  };

  thisCB.compare = function () {
    for (var i = 0; i < thisCB.layout.columns.length; i++) {
      thisCB.layout.adjustYmax();
    }
  };

}
