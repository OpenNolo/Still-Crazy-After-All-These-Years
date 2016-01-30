function BarChart(dataset, container, columnId, percOn) {
  thisBC = this;
  //thisBC.stateName = stateName;
  var barchartContainer = container;
  var stateData = dataset;
  var granularity = 1;
  var eventYear = 0;
  var percentageOn = percOn;

  // Dataset changed by granularity
  var newDataset = [];

  // Computes the total population
  var totalPopulation = 0;
  for (var i = 0; i < stateData.length; i++) {
    totalPopulation = totalPopulation + parseInt(stateData[i].POPEST2014);
  }
  console.log(totalPopulation);

  // Define ViewBox dimensions
  var viewBoxWidth = 800;
  var viewBoxHeight = 500;
  var viewBoxMargin = 50;

  // Define scales
  var xScale = d3.scale.ordinal()
  .domain(d3.range(stateData.length))
  .rangeRoundBands([viewBoxMargin, viewBoxWidth - viewBoxMargin], 0.2);

  var xAxisScale = d3.scale.ordinal()
  .domain(d3.range(stateData.length))
  .rangeRoundBands([viewBoxMargin, viewBoxWidth - viewBoxMargin], 0.2);

  var yScale = d3.scale.linear().domain([0, d3.max(stateData , function (d, i) {
    if(percentageOn) {
      return (parseInt(d.POPEST2014)/totalPopulation);
    } else {
      return parseInt(d.POPEST2014);
    }
  })])
  .range([viewBoxMargin, viewBoxHeight - viewBoxMargin]);

  // Need a different one cause it is inverted
  var yAxisScale = d3.scale.linear().domain([0, d3.max(stateData , function (d, i) {
   if(percentageOn) {
    return (parseInt(d.POPEST2014)/totalPopulation);
  } else {
    return parseInt(d.POPEST2014);
  }
})])
  .range([viewBoxHeight - viewBoxMargin, viewBoxMargin]);

  // Define Axes
  var xAxis = d3.svg.axis()
  .scale(xScale);

  // Formatter for the y axis
  formatter = d3.format(".2%");
  formatterAbs =d3.format(".");


  var yAxis = d3.svg.axis()
  .scale(yAxisScale)
  .orient("left")
  .ticks(10);

  if(percentageOn) {
    yAxis.tickFormat(formatter);
  } else {
    yAxis.tickFormat(formatterAbs);
 }



  // Create SVG element
  var svg = container
  .append('svg')
  .attr('class', 'svg barchart' + columnId)
  .style('width', '100%')
  .style('height', '100%')
  .attr('viewBox', '0 0 ' + viewBoxWidth + ' ' + viewBoxHeight);
  //.attr('preserveAspectRatio', 'xMinYMin meet');

  // Create bars
  svg.selectAll('rect')
  .data(stateData)
  .enter().append('rect')
  .attr('x', function (d, i) {
    //console.log(i);
    return xScale(i);
  })
  .attr('y', function (d, i) {
    //console.log(d.POPEST2010_CIV);
    if(percentageOn) {
      return viewBoxHeight - yScale(parseInt(d.POPEST2014)/totalPopulation);
    } else {
      return viewBoxHeight - yScale(parseInt(d.POPEST2014));
    }
  })
  .attr('width', xScale.rangeBand())
  .attr('height', function (d, i) {
   if(percentageOn) {
    return yScale(parseInt(d.POPEST2014)/totalPopulation) - viewBoxMargin;
  } else {
    return yScale(parseInt(d.POPEST2014)) - viewBoxMargin;
  }
})
  /*.attr("fill", function(d, i) {return "rgba(" + 0 + "," + (255 - i*2) + "," + (255 - i*2) + "," + 0.7 + ")"; })*/
  .attr('fill', 'rgb(166,206,227)')
  .attr('stroke', 'black')
  .attr('stroke-width', 1); //then scales with granularity (i*granularity)

  //Create X axis
  var myXAxis = svg.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + (viewBoxHeight - viewBoxMargin) + ")")
  .call(xAxis);

  /*this.myXAxis = this.svg.append("g").attr('class',"x axis" ).call(this.xAxis)
  .attr('shape-rendering', 'geometricPrecision')
  .attr('font-size', this.viewBoxHeight/10)
  .attr("transform", "translate(0,"+this.viewBoxHeight+")");*/

  //Create Y axis
  svg.append("g")
  .attr("class", "y axis")
  .attr("transform", "translate(" + viewBoxMargin + ",0)")
  .call(yAxis);

  // Hide some ticks
  var xTicksText =  svg.select('.x.axis')
  .selectAll('.tick text');

  xTicksText.style('opacity', function (d, i) {
    if(i%3!==0) {
      return 0;
    } else {
      return 1;
    }
  });


  this.updateGraph = function (dataset, gran, ymax) {
    //RICALCOLARE QUA LA TOTAL POPULATION PER CHECKARE CHE IL DATASET GRANULARE SIA COERENTE!!

    console.log('in2');
    newDataset = dataset;
    granularity = gran;
    //passare dominio per scale e vedere se va fatta exit su dati esistenti

    //per ora provo con dominio calcolato qua,
    // poi passarlo in base al max tra i graphs da comparare

    // Split JSON Objects (fare come funzione)
    var onlyAges = [];

    for (var i = 0; i < dataset.length; i++) {
      onlyAges.push(dataset[i].AGE);
    }
    console.log(onlyAges);

    //Update scale domains
    xScale.domain(d3.range(newDataset.length));
    xAxisScale.domain(onlyAges).rangeRoundBands([viewBoxMargin, viewBoxWidth - viewBoxMargin], 0.2);
    xAxis.scale(xAxisScale).tickValues(onlyAges);
    yScale.domain([0, d3.max(newDataset, function(d) {
      if(percentageOn) {
        return parseInt(d.POPEST2014)/totalPopulation;
      } else {
        return parseInt(d.POPEST2014);
      } })]);
    yAxisScale.domain([0, d3.max(newDataset, function(d) {
      if(percentageOn) {
        return parseInt(d.POPEST2014)/totalPopulation;
      } else {
        return parseInt(d.POPEST2014);
      } })]);

    if(percentageOn) {
      yAxis.tickFormat(formatter);
    } else {
      yAxis.tickFormat(formatterAbs);
    }

    //Select…
    var bars = svg.selectAll("rect")
    .data(newDataset);

    //Enter…
    bars.enter()
    .append("rect")
    .attr("x", function(d, i) {
      return xScale(i);
    })
    .attr('y', function (d, i) {
      if(percentageOn) {
        return viewBoxHeight - yScale(parseInt(d.POPEST2014)/totalPopulation);
      } else {
        return viewBoxHeight - yScale(parseInt(d.POPEST2014));
      }
    })
    .attr('width', 0)
    .attr('height', function (d, i) {
      if(percentageOn) {
        return yScale(parseInt(d.POPEST2014)/totalPopulation) - viewBoxMargin;
      } else {
        return yScale(parseInt(d.POPEST2014)) - viewBoxMargin;
      }
    })
    .attr('fill', 'rgb(166,206,227)')
    .attr('stroke', 'rgb(255,255,255)')
    .attr('stroke-width', 1);

    //Update…
    bars/*.attr("fill", function(d, i) { return "rgba(" + 0 + "," + (255 - i*2*granularity) + "," + (255 - i*2*granularity) + "," + 0.7 + ")"; })*/
    .attr('fill', 'rgb(166,206,227)')
    .attr('stroke', 'black')
    .attr('stroke-width', 1)
    .transition()
    .duration(500)
    .attr("x", function(d, i) {
      return xScale(i);
    })
    .attr("y", function(d) {
      if(percentageOn) {
        return viewBoxHeight - yScale(parseInt(d.POPEST2014)/totalPopulation);
      } else {
        return viewBoxHeight - yScale(parseInt(d.POPEST2014));
      }
    })
    .attr("width", xScale.rangeBand())
    .attr("height", function(d) {
     if(percentageOn) {
      return yScale(parseInt(d.POPEST2014)/totalPopulation) - viewBoxMargin;
    } else {
      return yScale(parseInt(d.POPEST2014)) - viewBoxMargin;
    }
  });

    //Exit…
    bars.exit()
    .transition()
    .duration(500)
    /*.attr('height', 0)
    .attr('y', viewBoxHeight - viewBoxMargin)*/
    //.attr('fill', 'rgba(166,206,227,0.5)')
    //.attr('stroke', 'rgba(255,255,255,0.5)')
    //.attr('x', 0)
    .attr('width', 0)
    .remove();

    //Update X axis
    svg.select(".x.axis")
    .transition()
    .duration(500)
    .call(xAxis)
    .selectAll('tick')
    .style('fill', 'blue');

    //Update Y axis
    svg.select(".y.axis")
    .transition()
    .duration(500)
    .call(yAxis);

    // Hide some ticks
    xTicksText = svg.select('.x.axis')
    .selectAll('.tick text');

    xTicksText.style('opacity', function (d, i) {
      console.log('test');
      if(granularity < 4) {
        hider = 5 - granularity;
      } else {
        hider = 1;
      }
      console.log('innn');
      console.log(d);
      if(i%hider!==0) {
        return 0;
      } else {
        return 1;
      }
    });

    this.showEvent(eventYear);
      /*xT.selectAll('.tick text')
      .style('opacity', function (d, i) {
        console.log('in');
        // body...
      });*/

};


this.updateScale = function (ymax) {
  console.log('in4');
  console.log(ymax);

    //Update scale domains
    yScale.domain([0, ymax]);
    yAxisScale.domain([0, ymax]);

    yAxis.scale(yAxisScale)
    .ticks(10);

    //Select…
    var bars = svg.selectAll("rect");

    //Update…
    bars.transition()
    .duration(500)
    .attr("y", function(d) {
     if(percentageOn) {
      return viewBoxHeight - yScale(parseInt(d.POPEST2014)/totalPopulation);
    } else {
      return viewBoxHeight - yScale(parseInt(d.POPEST2014));
    }
  })
    .attr("height", function(d) {
      if(percentageOn) {
        return yScale(parseInt(d.POPEST2014)/totalPopulation) - viewBoxMargin;
      } else {
        return yScale(parseInt(d.POPEST2014)) - viewBoxMargin;
      }
    });

    svg.select(".y.axis")
    .transition()
    .duration(500)
    .call(yAxis);

  };

  this.showEvent = function (year) {
    eventYear = year;
    var remembers = 2014 - eventYear + 12;

    svg.selectAll('rect').attr('fill', function (d, i) {
      if(granularity==1) {
        if(parseInt(d.AGE) >= remembers) {
          return 'rgb(67,162,202)';
        } else {
          return 'rgba(166,206,227,0.5)';
        }
      } else {
        var extremes =  d.AGE.split('-');
        console.log(extremes);
        if(extremes[1] >= remembers) {
         return 'rgb(67,162,202)';
       } else {
        return 'rgba(166,206,227,0.5)';
      }
    }
  });
  };

  this.getPercentageOn = function () {
    return percentageOn;
  };

  this.setPercentageOn = function (bool) {
    percentageOn = bool;
    console.log(percentageOn);
    if(granularity==1) {
      this.updateGraph(stateData, granularity);
    } else {
      this.updateGraph(newDataset, granularity);
    }

  };

}
