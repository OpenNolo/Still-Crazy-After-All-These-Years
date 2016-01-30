(function (data,undefined){

  data.US2014Population = {};
  data.World2014Population = {};

  //Function to load all data in queue
  data.loadData = function(endLoadCallback){
    queue()

    .defer(loadUS2014Population)
    .defer(loadWorld2014Population)

    .await(endLoadCallback);
  };


  // Load data of us
  function loadUS2014Population(callback) {
    d3.json("data/us-states-popest2014.json", function(json) {
      data.US2014Population = json;
      console.log(data.US2014Population);

      callback(null,null);
    });
  }

  // Load data of world
  function loadWorld2014Population(callback) {
    d3.json("data/world-popest2014.json", function(json) {
      data.World2014Population = json;
      console.log(data.World2014Population);

      callback(null,null);
    });
  }

  //QUANDO AVRÒ ANCHE ALTRO DATASET CAMBIARE CICLANDO ANCHE QUELLO!!
  data.getAgeDistributionByStateName = function(stateName) {
    var stateData = [];
    for (var i = 0; i < data.US2014Population.length; i++) {
      if(data.US2014Population[i].NAME == stateName && data.US2014Population[i].AGE < 85) {
        stateData.push(data.US2014Population[i]);
      }
    }
    if (stateName == "United States") {
      stateData = [];
    }
    if (stateName == "Georgia") {
      return stateData;
    }
    for (i = 0; i < data.World2014Population.length; i++) {
      if(data.World2014Population[i].NAME == stateName && data.World2014Population[i].AGE < 85) {
        stateData.push(data.World2014Population[i]);
      }
    }
    return stateData;
  };

  data.getTotalPopulationByStateName = function(stateName) {
    var statePopulation = [];
    for (var i = 0; i < data.US2014Population.length; i++) {
      if(data.US2014Population[i].NAME == stateName && data.US2014Population[i].AGE == 999) {
        statePopulation.push(data.US2014Population[i]);
      }
    }
    return statePopulation;
  };

  data.getUSNames = function () {
    var usNames = [];
    var lastName = '';
    for (var i = 0; i < data.US2014Population.length; i++) {
      if(data.US2014Population[i].NAME!=lastName) {
        usNames.push(data.US2014Population[i].NAME);
        lastName = data.US2014Population[i].NAME;
      }
    }
    return usNames;
  };


})(window.db = window.db || {});
