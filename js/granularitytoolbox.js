function GranularityToolBox(container, layout) {
  thisGTB = this;
  thisGTB.layout = layout;
  console.log(thisGTB.layout.columns);
  thisGTB.stateDatasets = [[]];
  thisGTB.granularity = 1;
  thisGTB.minGranularity = 1;
  thisGTB.maxGranularity = 10;

  // 'Load' datasets in the constructor of this object
  for (var i = 0; i < thisGTB.layout.columns[i]; i++) {
    thisGTB.stateDatasets[i] = thisGTB.layout.columns[i].dataset;
  }

  // Dataset changed by granularity
  thisGTB.granularDatasets = [[]];

  // Create the buttons
  d3.select('#granularitytoolbox').append('svg')
  .attr('class', 'granularityButton down')
  .attr('viewBox', '0 0 ' + 100 + ' ' + 100)
  .attr('preserveAspectRatio', 'xMidYMid meet')
  .on('click', function () {
    updateGranularities(-1);
  })
  .append('text')
  .attr('text-anchor', 'middle')
  .attr('dominant-baseline', 'central')
  .attr('font-family', 'FontAwesome')
  .attr('font-size', 60)
  .attr('x', 20)
  .attr('y', 40)
  .text(function(d) {
    //return '\uf191';
    return '\uf147';});

  d3.select('#granularitytoolbox').append('svg')
  .attr('class', 'granularityText')
  .attr('viewBox', '0 0 ' + 100 + ' ' + 100)
  .attr('preserveAspectRatio', 'xMidYMid meet')
  .append('text')
  .attr('text-anchor', 'middle')
  .attr('dominant-baseline', 'central')
  .attr('font-family', 'Arial')
  .attr('font-size', '30px')
  .attr('color', 'rgb(64, 64, 64)')
  .attr('x', 50)
  .attr('y', 40)
  .text('Granularity');

  d3.select('#granularitytoolbox').append('svg')
  .attr('class', 'granularityButton up')
  .attr('viewBox', '0 0 ' + 100 + ' ' + 100)
  .attr('preserveAspectRatio', 'xMidYMid meet')
  .on('click', function () {
    updateGranularities(1);
  })
  .append('text')
  .attr('text-anchor', 'middle')
  .attr('dominant-baseline', 'central')
  .attr('font-family', 'FontAwesome')
  .attr('font-size', 60)
  .attr('font-weight', 200)
  .attr('color', 'rgb(64, 64, 64)')
  .attr('x', 80)
  .attr('y', 40)
  .text(function(d) {
    //return '\uf152';
    return '\uf196';});

  function updateGranularities (change) {
    if ((thisGTB.granularity + change) >= thisGTB.minGranularity && (thisGTB.granularity + change) <= thisGTB.maxGranularity) {
      thisGTB.granularity = thisGTB.granularity + change;
      for (var i = 0; i < thisGTB.layout.columns.length; i++) {
        console.log(thisGTB.layout.columns[i].getDataset());
        thisGTB.stateDatasets[i] = thisGTB.layout.columns[i].getDataset();
        thisGTB.granularDatasets[i] = thisGTB.updateGranularity(thisGTB.stateDatasets[i], thisGTB.granularity);
        thisGTB.layout.columns[i].updateGraphs(thisGTB.granularDatasets[i], thisGTB.granularity);
      }
      //console.log(thisGTB.stateDatasets);
      //console.log(thisGTB.granularDatasets);
      //thisGTB.layout.adjustYmax();
    }
  }


  // Define scales
  /*thisBC.xScale = d3.scale.ordinal()
  .domain(d3.range(thisBC.stateData.length))
  .rangeRoundBands([0, thisBC.svgWidth], 0.1);

  thisBC.yScale = d3.scale.linear().domain([0, d3.max(thisBC.stateData , function (d, i) {
    return parseInt(d.POPEST2014);
  })])
.range([thisBC.svgMargin, thisBC.svgHeight - thisBC.svgMargin]);*/


  //poi la chiamo da un punto a caso con valore 1, 2, ecc... per provarla
  //magari updategranularity in column per entrambi i grafici e qua solo update graph, ottimizzo computazione
  thisGTB.updateGranularity = function (dataset, granularity) {

    stateData = dataset;
    granularDataset = [];
      //thisBC.granularity
      //thisBC.stateData
      var tempRange = "";
      var tempTot = 0;
      var i = 0;
      while (i < stateData.length) {
        tempTot = 0;
        tempRange = stateData[i].AGE;
        if(stateData.length - i >= granularity) {
          for (var j = 0; j < granularity; j++) {
            tempTot = tempTot + parseInt(stateData[i+j].POPEST2014);
          }
          i = i+j;
        } else {
          console.log('in');
          for (i; i < stateData.length; i++) {
            tempTot = tempTot + parseInt(stateData[i].POPEST2014);
          }
        }
        tempRange = tempRange + "-" + stateData[i-1].AGE;
        json = '{' +'"NAME" : "' + "inserire nome" + '",' +'"AGE" : "' + tempRange + '",' +'"POPEST2014" : "' + tempTot + '"'+'}';
        //console.log(json);
        granularDataset.push(JSON.parse(json));
      }
      console.log(granularDataset);
      console.log(granularDataset.length);
      return granularDataset;

    };

    thisGTB.updateGraph = function () {
    //chiama funzione update graph dei grafici,
    //mettendo come parametro il dataset con granularità nuova, che di là verrà salvato come variabile
    //
    //di là: prendere dati, riattaccarli a .date() e fare l'update con enter
  };

  this.getGranularity = function () {
    return thisGTB.granularity;
  };
}
