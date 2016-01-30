function Column (container, stateName, columnId, percOn) {
  thisColumn = this;
  var columnStateName = stateName;
  var thisColumnId = columnId;
  var columnContainer = container;
  var barchartOn = true;
  var piechartOn = true;
  var pecentageOn = percOn;

  // Load column dataset
  var columnDataset = db.getAgeDistributionByStateName(stateName); //is private!!
  var actualDataset = db.getAgeDistributionByStateName(stateName); //is private!!

  // Computes the total population
  var totalPopulation = 0;
  for (var i = 0; i < columnDataset.length; i++) {
    totalPopulation = totalPopulation + parseInt(columnDataset[i].POPEST2014);
  }
  console.log(totalPopulation);

  var columnDiv = columnContainer.append('div')

  .attr('id', 'column' + thisColumnId)
  .attr('class', 'column');
  //.style('width', '100px');

  // Title Box
  var columnTitlebox = columnDiv.append('div')
  .attr('class', 'columnTitlebox')
  .append('svg')
  .attr('class', 'svg barchart' + columnId)
  .style('width', '100%')
  .style('height', '100%')
  .attr('viewBox', '0 0 ' + 8196 + ' ' + 2188);

  var thisText = columnTitlebox.append('text')
  .attr('x', 1850)
  .attr('y', 1500)
  .style('font-size', '700')
  .style('font-family', 'arial')
  .style('fill', 'rgb(64,64,64)') //#475B62
  .style('font-weight', 'bold')
  .text(columnStateName);

  thisText.attr('transform', 'translate(' + -(columnStateName.length/2)*15 + ',' + 0 + ')');



  // BarChart
  var barchartDiv = columnDiv.append('div').attr('class', 'barchart ' + thisColumnId);
  var barchart = new BarChart(columnDataset, barchartDiv, thisColumnId, percOn);

  //###Set the toolbox###
  var columnToolbox = columnDiv.append('div').attr('class', 'columnToolbox');

  // Barchart Button
  var barchartButton = columnToolbox.append('svg')
  .attr('class', 'barchartButton' + thisColumnId)
  .style('width', '15%')
  .style('height', '80%')
  //.style('background-color', 'rgb(190,174,212)')
  .attr('viewBox', '0 0 500 500')
  .on('click', function () {
    if(barchartOn && piechartOn) {
      $('.barchart.' + thisColumnId).animate({'height' : '0%'}, 500);
      $('.piechart.' + thisColumnId).animate({'height' : '80%'}, 500);
      barchartOn = false;
      barchartButton.selectAll('rect').style('fill', 'grey');
    } else if(barchartOn && !piechartOn) {
      $('.barchart.' + thisColumnId).animate({'height' : '0%'}, 500);
      barchartOn = false;
      barchartButton.selectAll('rect').style('fill', 'grey');
    } else if(!barchartOn && piechartOn) {
      $('.barchart.' + thisColumnId).animate({'height' : '40%'}, 500);
      $('.piechart.' + thisColumnId).animate({'height' : '40%'}, 500);
      barchartOn = true;
      barchartButton.selectAll('rect').style('fill', 'rgb(44,162,95)');
    } else {
      $('.barchart.' + thisColumnId).animate({'height' : '80%'}, 500);
      barchartOn = true;
      barchartButton.selectAll('rect').style('fill', 'rgb(44,162,95)');
    }
  });

  //###'Paint' the barchart button###
  var barchartButtonData = [4,5,3,2,1];

  barchartButton.selectAll('rect')
  .data(barchartButtonData)
  .enter().append('rect')
  .attr('x', function (d, i) {
    return 100*i + 50;
  })
  .attr('y', function (d, i) {
    return 450 - d*80;
  })
  .attr('width', 60)
  .attr('height', function (d, i) {
    return d*80;
  })
  .style('fill', 'rgb(44,162,95)');
  //#################################

  //gestire con gli if perchè i toggle dipendono da chi è attivo<-il problema è tra grafi diversi, printare i column id al click dei bottoni per checkare
  var piechartButton = columnToolbox.append('svg')
  .attr('class', 'piechartButton' + thisColumnId)
  .style('width', '15%')
  .style('height', '80%')
  //.style('background-color', 'rgb(127,201,127)')
  .attr('viewBox', '0 0 500 500')
  .on('click', function () {
    if(piechartOn && barchartOn) {
     $('.piechart.' + thisColumnId).animate({'height' : '0%'}, 500);
     $('.barchart.' + thisColumnId).animate({'height' : '80%'}, 500);
     piechartOn = false;
     piechartButton.selectAll('path').style('fill', 'grey');
   } else if(piechartOn && !barchartOn) {
     $('.piechart.' + thisColumnId).animate({'height' : '0%'}, 500);
     piechartOn = false;
     piechartButton.selectAll('path').style('fill', 'grey');
   } else if(!piechartOn && barchartOn) {
     $('.piechart.' + thisColumnId).animate({'height' : '40%'}, 500);
     $('.barchart.' + thisColumnId).animate({'height' : '40%'}, 500);
     piechartOn = true;
     piechartButton.selectAll('path').style('fill', 'rgb(44,162,95)');
   } else {
    $('.piechart.' + thisColumnId).animate({'height' : '80%'}, 500);
    piechartOn = true;
    piechartButton.selectAll('path').style('fill', 'rgb(44,162,95)');
  }
});

  //###'Paint' the piechart button###
  var piechartButtonData = [4,5,3,2,1];

  var buttonOuterRadius = 500 / 2 - 20;
  //var buttonInnerRadius = 500 / 3;
  var buttonInnerRadius = 0;
  var arc = d3.svg.arc()
  .innerRadius(buttonInnerRadius)
  .outerRadius(buttonOuterRadius);

  var pieButton = d3.layout.pie();

  //Set up groups
  var buttonArcs = piechartButton.selectAll("g.arc")
  .data(pieButton(piechartButtonData))
  .enter()
  .append("g")
  .attr("class", "arc")
  .attr("transform", "translate(" + (buttonOuterRadius + 20) + "," + (buttonOuterRadius + 20) + ")");

  //Draw arc paths
  buttonArcs.append("path")
  .attr('class', 'piechartButtonPath')
  .attr("d", arc);
  //#################################



  // PieChart
  var piechartDiv = columnDiv.append('div').attr('class', 'piechart ' + thisColumnId);
  var piechart = new PieChart(columnDataset, piechartDiv, thisColumnId);

  this.updateGraphs = function (dataset, gran) {
    actualDataset = dataset;
    console.log('in1');
    barchart.updateGraph(actualDataset, gran);
    piechart.updateGraph(actualDataset, gran);
  };

  this.updateYmax = function (ymax) {
    barchart.updateScale(ymax);
  };

  this.updateToEvent = function (year) {
    barchart.showEvent(year);
    piechart.showEvent(year);
  };

  //##GETTER AND SETTER###
  this.getDataset = function () {
    return columnDataset;
  };

   this.getActualDataset = function () {
    return actualDataset;
  };

  this.getColumnId = function () {
    return thisColumnId;
  };

  this.getStateName = function () {
    return stateName;
  };

  this.getTotalPopulation = function () {
    return totalPopulation;
  };

  this.getBarchart = function () {
    return barchart;
  };

  //######################
}
