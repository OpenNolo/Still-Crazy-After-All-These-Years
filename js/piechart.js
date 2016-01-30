function PieChart(dataset, container, columnId) {
  thisPC = this;
  //thisPC.stateName = stateName;
  var piechartContainer = container;
  var stateData = dataset;
  var granularity = 1;
  var remembersPercentage = "";

  // Dataset changed by granularity
  var granularDataset = [];

  // Computes the total population
  var totalPopulation = 0;
  for (var i = 0; i < stateData.length; i++) {
    totalPopulation = totalPopulation + parseInt(stateData[i].POPEST2014);
  }
  console.log(totalPopulation);

  // Define ViewBox dimensions
  var viewBoxWidth = 500;
  var viewBoxHeight = 500;
  var viewBoxMargin = 20;

  var enterAntiClockwise = {
    startAngle: Math.PI * 2,
    endAngle: Math.PI * 2
  };

  // Easy colors accessible via a 10-step ordinal scale
  var color = d3.scale.category20();

  // Define attributes for pie chart
  var radius = 200;
  //var outerRadius = radius;
  //var innerRadius = radius/2;

  var arc = d3.svg.arc()
  .innerRadius(radius*0.55)
  .outerRadius(radius);

  var pie = d3.layout.pie() //this will create arc data for us given a list of values
  .value(function (d) { // Binding each value to the pie
    return parseInt(d.POPEST2014);
  })
  .sort(null);

   // Split JSON Objects (fare come funzione)
   var onlyAges = [];
   var onlyDistribution = [];

   for (var i = 0; i < stateData.length; i++) {
    onlyAges.push(parseInt(stateData[i].AGE));
    onlyDistribution.push(parseInt(stateData[i].POPEST2014));
  }
  console.log(onlyDistribution);

  // Variable for split JSON objects after granularity update
  var onlyGranularAges = [];
  var onlyGranularDistribution = [];

  console.log(stateData);
  // Create SVG element
  var svg = piechartContainer
  .append('svg')
  //.data(stateData)
  .attr('class', 'svg piechart' + columnId)
  .style('width', '100%')
  .style('height', '100%')
  .attr('viewBox', '0 0 500 500')
  .attr('preserveAspectRatio', 'xMidYMid meet');

  //Percentage remembers text
  svg.append('text')
  .attr('class', 'rememberspercentage' + columnId)
  .attr('x', '250')
  .attr('y', '240')
  .attr('text-anchor', 'middle')
  .attr('dominant-baseline', 'central')
  .attr('font-family', 'Arial')
  .attr('font-size', '35px')
  .attr('dy', '.3em')
  .attr('color', 'rgb(64, 64, 64)')
  .text("");

  var pieg = svg.append("g")
  .attr("transform", "translate(" + 500 / 2 + "," + 500 / 2 + ")");

  var path = pieg.selectAll('path')
  .data(pie(stateData))
  .enter()
  .append('path')
  .attr('class', 'piepath')
  .attr("fill", function(d, i) {
    return "rgba(" + (166-i*2) + "," + (206 - i*2) + "," + (227 - i*2) + "," + 1 + ")"; })
  .style('stroke-width', 2)
  .style('stroke', 'black')
  .attr('d', arc)
  .each(function (d) {
          this._current = d; // store the initial angles
          //console.log(this._current);
        });

  // arc for labels position
  var labelArc = d3.svg.arc()
  .innerRadius(radius * 1)
  .outerRadius(radius *1.2);
  //Labels APPENDERE ANCHE PERCENTUALE!!
  var labels = pieg
  .selectAll('text')
  .data(pie(stateData))
  .enter()
  .append("text")
  .attr("transform", function(d) {
    //d.outerRadius = outerRadius + 50; //*
     //d.innerRadius = outerRadius + 45; //*
     return "translate(" + labelArc.centroid(d) + ")";
   })
  .attr("text-anchor", "middle")
  .style("fill", "Black")
  .style("font", "bold 12px Arial")
  .text(function(d, i) {
    return stateData[i].AGE;
  });

  // Hide some labels
  for (var labelindex = 0; labelindex < labels.size(); labelindex++) {
    if(labelindex%3 !== 0) {
      //console.log(labels[0][labelindex]);
      d3.select(labels[0][labelindex]).attr('opacity', 0);
    } else {
      d3.select(labels[0][labelindex]).attr('opacity', 1);
    }
  }
  d3.select(labels[0][labelindex-1]).attr('opacity', 0);


  //Intern piechart
  var internData = [20, 80];

  var piegIntern = svg.append("g")
  .attr("transform", "translate(" + 500 / 2 + "," + 500 / 2 + ")");

   // Define attributes for intern pie chart
   var internRadius = 100;

   var internArc = d3.svg.arc()
   .innerRadius(internRadius*0.9)
   .outerRadius(internRadius*1.1);

   var internPie = d3.layout.pie().sort(null);

   var pathIntern = pieg.selectAll('internpiepath')
   .data(internPie(internData))
   .enter()
   .append('path')
   .attr('class', 'internpiepath')
   .attr("fill", function(d, i) {
    if (i == 0) {
      return 'black';
    } else {
      return 'none';
    }
  })
   .attr('d', internArc)
   .each(function (d) {
          this._current = d; // store the initial angles
          //console.log(this._current);
        });


  //UPDATE
  this.updateGraph = function (dataset, gran, domain) {
    onlyGranularAges = [];
    onlyGranularDistribution = [];
    granularDataset = dataset;
    granularity = gran;

    var enterAntiClockwise = {
      startAngle: Math.PI * 2,
      endAngle: Math.PI * 2
    };

    d3.selectAll('svg').data(granularDataset);

    // Split JSON Objects
    for (var i = 0; i < granularDataset.length; i++) {
      onlyGranularAges.push(parseInt(granularDataset[i].AGE));
      onlyGranularDistribution.push(parseInt(granularDataset[i].POPEST2014));
    }
    console.log(onlyGranularDistribution);

    path = path.data(pie(granularDataset));
    //arcs = arcs.data(pie(granularDataset));

    path.enter().append('path')
    .attr('class', 'piepath')
    .attr("fill", function(d, i) {
      return "rgba(" + (166-i*2*granularity) + "," + (206 - i*2*granularity) + "," + (227 - i*2*granularity) + "," + 1 + ")"; })
    .style('stroke-width', 2)
    .style('stroke', 'black')
    .attr("d", arc(enterAntiClockwise))
    .each(function (d) {
      console.log(d);
      this._current = {
        data: d.data,
        value: d.value,
        startAngle: enterAntiClockwise.startAngle,
        endAngle: enterAntiClockwise.endAngle
      };
           }); // store the initial values;

    //Update..
    path.attr("fill", function(d, i) {
      return "rgba(" + (166-i*2*granularity) + "," + (206 - i*2*granularity) + "," + (227 - i*2*granularity) + "," + 1 + ")"; })
    .style('stroke-width', 2)
    .style('stroke', 'black');

    path.exit()
    .transition()
    .duration(500)
    .attrTween('d', arcTweenOut)
          .remove();     // now remove the exiting arcs

          path.transition().duration(500).attrTween("d", arcTween); // redraw the arcs
          console.log(path);

   //add text
   labels = labels.data(pie(granularDataset));

   labels
   .exit().remove();

  //update text
  labels
  .enter()
  .append("text")
  .attr("transform", function(d) {
    //d.outerRadius = outerRadius + 50; //*
     //d.innerRadius = outerRadius + 45; //*
     return "translate(" + labelArc.centroid(d) + ")";
   })
  .attr("text-anchor", "middle")
  .style("fill", "Black")
  .style("font", "bold 12px Arial")
  .text(function(d, i) {
    return granularDataset[i].AGE;
  });

  labels
  .attr("transform", function(d) {
    //d.outerRadius = outerRadius + 50; //*
     //d.innerRadius = outerRadius + 45; //*
     return "translate(" + labelArc.centroid(d) + ")";
   })
  .attr("text-anchor", "middle")
  .style("fill", "Black")
  .style("font", "bold 12px Arial")
  .text(function(d, i) {
    return granularDataset[i].AGE;
  });

    // Hide some labels
    for (var labelindex = 0; labelindex < labels.size(); labelindex++) {
      if(granularity < 3) {
        hider = 4 - granularity;
      } else {
        hider = 1;
      }

      if(labelindex%hider !== 0) {
        //console.log(labels[0][labelindex]);
        d3.select(labels[0][labelindex]).attr('opacity', 0);
      } else {
        d3.select(labels[0][labelindex]).attr('opacity', 1);
      }
    }
    d3.select(labels[0][labelindex-1]).attr('opacity', 0);


  };

  // Store the displayed angles in _current.
  // Then, interpolate from _current to the new angles.
  // During the transition, _current is updated in-place by d3.interpolate.
  function arcTween(a) {
    var i = d3.interpolate(this._current, a);
    this._current = i(0);
    return function(t) {
      return arc(i(t));
    };
  }
  // Interpolate exiting arcs start and end angles to Math.PI * 2
  // so that they 'exit' at the end of the data
  function arcTweenOut(a) {
    var i = d3.interpolate(this._current, {startAngle: Math.PI * 2, endAngle: Math.PI * 2, value: 0});
    this._current = i(0);
    return function (t) {
      return arc(i(t));
    };
  }

  this.showEvent = function (year) {
    eventYear = year;
    var populationRemember = 0;
    var remembers = 2014 - eventYear + 12;

    for (var i = 0; i < stateData.length; i++) {
      if(parseInt(stateData[i].AGE) >= remembers) {
        populationRemember = populationRemember + parseInt(stateData[i].POPEST2014);
      }
    }
    console.log(totalPopulation);
    console.log(populationRemember);
    remembersPercentage = (populationRemember/totalPopulation);

    var formatter = d3.format(".1%");
    if(remembersPercentage!=0) {
      d3.select('.rememberspercentage' + columnId).text(formatter(remembersPercentage));
    } else {
      d3.select('.rememberspercentage' + columnId).text("");
    }

    var newInternData = [remembersPercentage*100, 100-remembersPercentage*100];
    console.log(newInternData);
    //Update intern piechart
    pathIntern = pathIntern.data(internPie(newInternData));
    pathIntern.transition().duration(750).attrTween("d", arcTween2);
  };

  // Store the displayed angles in _current.
  // Then, interpolate from _current to the new angles.
  // During the transition, _current is updated in-place by d3.interpolate.
  function arcTween2(a) {
    var i = d3.interpolate(this._current, a);
    this._current = i(0);
    return function(t) {
      return internArc(i(t));
    };
  }


}
