function Layout(container,width,height) {
  var thisLayout = this;
  var maxColumns = 3;
  thisLayout.transitionON = false;
  //console.log(db.US2014Population);
  //console.log(db.getAgeDistributionByStateName('Alabama'));
  //console.log(db.getTotalPopulationByStateName('Illinois'));

  //that.currentVisualizationMode = "histogram";
  //that.currentView = "single";
  thisLayout.root = container.select("#main");
  thisLayout.graphbox = this.root.select("#graphbox");
  thisLayout.columns = [];
  thisLayout.boxes = [];
  thisLayout.columns = [];
  thisLayout.existingIds = [];

  // Global Max for scales
  // Barchart
  var yGlobalMax = 0;

  var percentageOn = false;

  // Create all layout components
  this.map = new Map(thisLayout.root.select("#mapbox"), this);
  this.worldmap = new WorldMap(thisLayout.root.select("#mapbox"), this);
  this.mapToolbox = new MapToolBox(thisLayout.root.select("#maptoolbox"), this);
  this.granularityToolBox = new GranularityToolBox(thisLayout.root.select("#granularitytoolbox"), this);
  this.eventBox = new EventBox(thisLayout.root.select("#eventbox"), this);
  this.compareBox = new CompareBox(thisLayout.root.select("#comparebox"), this);


  // Core functions of the application
  thisLayout.stateClicked = function (stateName, stateActive) { // <-- la mappa chiamerà questa funzione quando viene cliccato uno stato

    console.log(stateName);
    console.log(stateActive);
    //console.log(thisLayout.columns.length);

    if (stateActive) {
      if (thisLayout.columns.length < maxColumns ) {
        thisLayout.addColumn(stateName);
      }
    } else {
      console.log('here');
      var columnId;
      for (var i = 0; i < thisLayout.columns.length; i++) {
        console.log(thisLayout.columns[i]);
        if (thisLayout.columns[i].getStateName() == stateName) {
          columnId = thisLayout.columns[i].getColumnId();
        }
      }
      removeColumn(columnId);
    }

  };

  thisLayout.addColumn = function (stateName) {
    columnWidth = (100/this.columns.length);   //depends on number of columns
    columnId = generateId();
    thisLayout.columns.push(new Column(thisLayout.graphbox, stateName, columnId, percentageOn));
    actualGran = this.granularityToolBox.getGranularity();
    if (actualGran != 1) {
      //console.log(actualGran);
      //console.log(thisLayout.columns[thisLayout.columns.length - 1].getDataset());
      granDataset = this.granularityToolBox.updateGranularity(thisLayout.columns[thisLayout.columns.length - 1].getDataset(), actualGran);
      //console.log(granDataset);
      thisLayout.columns[thisLayout.columns.length - 1].updateGraphs(granDataset, actualGran);
    }
    adjustColumns(columnId);
    //thisLayout.adjustYmax();
    this.eventBox.showAlive();
  };

  thisLayout.availableColumn = function () {
    if (thisLayout.columns.length < 3) {
      return true;
    } else {
      return false;
    }
  };

  function generateId() {
    //console.log(thisLayout.existingIds);
    if (thisLayout.existingIds.indexOf(1) ==  -1) {
      thisLayout.existingIds.push(1);
      return 1;
    } else if (thisLayout.existingIds.indexOf(2) ==  -1) {
      thisLayout.existingIds.push(2);
      return 2;
    } else {
      thisLayout.existingIds.push(3);
      return 3;
    }
  }

  thisLayout.nextGeneratedId = function () {
    if (thisLayout.existingIds.indexOf(1) ==  -1) {
      return 1;
    } else if (thisLayout.existingIds.indexOf(2) ==  -1) {
      return 2;
    } else {
      return 3;
    }
  };

  function removeColumn (columnId) {
    console.log('Remove column: ' + columnId);
    for (var i = 0; i < thisLayout.columns.length; i++) {
      if (thisLayout.columns[i].getColumnId() == columnId) {
        thisLayout.columns.splice(i, 1);
        $("#column" + columnId).animate({'width' : '0'}, { duration:500,
          start: function() {
            thisLayout.transitionON = true;
            //console.log(thisLayout.transitionON);
          },
          complete: function() {
            $("#column" + columnId).remove();
            thisLayout.transitionON = false;
            //console.log(thisLayout.transitionON);
          }
        });
      }
    }
    //console.log(columnId);
    for (var j = 0; j < thisLayout.existingIds.length; j++) {
      //console.log(thisLayout.existingIds[j]);
      if (thisLayout.existingIds[j] == columnId) {
        thisLayout.existingIds.splice(j, 1);
      }
    }
    adjustColumns(null);
    //thisLayout.adjustYmax();
    //console.log(thisLayout.existingIds);
  }

  function adjustColumns (columnId) {
    switch(thisLayout.columns.length) {
      case 1: {
        $('.column').animate({'width' : '100%'}, { duration:500,
          start: function() {
            thisLayout.transitionON = true;
            //console.log(thisLayout.transitionON);
          },
          complete: function() {
            thisLayout.transitionON = false;
            //console.log(thisLayout.transitionON);
          }
        });
        //d3.selectAll('.column').style('width', '100%');
        break;
      }
      case 2: {
        $('.column').animate({'width' : '50%'}, { duration:500,
          start: function() {
            thisLayout.transitionON = true;
            //console.log(thisLayout.transitionON);
          },
          complete: function() {
            thisLayout.transitionON = false;
            //console.log(thisLayout.transitionON);
          }
        });
        //d3.selectAll('.column').style('width', '50%').transition();
        break;
      }
      case 3: {
        $('.column').animate({'width' : '33.33333333333333%'}, { duration:500,
          start: function() {
            thisLayout.transitionON = true;
            //console.log(thisLayout.transitionON);
          },
          complete: function() {
            thisLayout.transitionON = false;
            //console.log(thisLayout.transitionON);
          }
        });
        //d3.selectAll('.column').style('width', '33%');
        break;
      }
    }

    switch(columnId) {
      case 1: {
        d3.select('#column' + columnId).style('background-color', 'rgb(224,243,219)');
        break;
      }
      case 2: {
        d3.select('#column' + columnId).style('background-color', 'rgb(179,226,205)');
        break;
      }
      case 3: {
        d3.select('#column' + columnId).style('background-color', 'rgb(168,221,181)');
        break;
      }
    }
    /*rgb(141,211,199) old light blue*/


  }

  //lanciarla dopo che si aggiunge o toglie una colonna, e poi updatare, la colonna deve essere creata prima
  //va fatto anche quando cambia la granularità
  function computeGlobalMax() {
    var max = 0;
    var tempMax = 0;
    var percMax = 0;
    var absMax = 0;
    console.log(thisLayout.columns.length);
    for (var i = 0; i < thisLayout.columns.length; i++) {
      var totPop = thisLayout.columns[i].getTotalPopulation();
      tempMax = d3.max(thisLayout.columns[i].getActualDataset(), function (d, i) { return parseInt(d.POPEST2014); });
      console.log(tempMax);
      percMax = tempMax / totPop;
      console.log(percMax);
      if( percMax > max) {
        max = percMax;
      }
      if (tempMax > absMax) {
        absMax = tempMax;
      }
    }
    if(thisLayout.columns[0].getBarchart().getPercentageOn()) {
      return max;
    } else {
      return absMax;
    }

  }

  thisLayout.adjustYmax = function () {
    var ymax = computeGlobalMax();
     for (var i = 0; i < thisLayout.columns.length; i++) {
      thisLayout.columns[i].updateYmax(ymax);
     }
  };

  thisLayout.setPercentageOn = function (bool) {
    percentageOn = bool;
  };

  thisLayout.getTransitionOn = function () {
    return thisLayout.transitionON;
  };

  thisLayout.setTransitionOn = function (bool) {
    thisLayout.transitionON = bool;
  };

  // roba padu
  function endLoadCallback() { // <-- IMPORTANTE PER ASPETTARE IL CARICAMENTO DEI FILE CON I DATI, medio, era di questa queue personale probabilmente
    that.map.start();
    //set up box
    that.comparebox = new CompareBox(that.comparepage, columnWidth);
    that.heatmapbox = new HeatmapBox(that.heatpage, columnWidth,that.map);

    layout.start();
  }

}
