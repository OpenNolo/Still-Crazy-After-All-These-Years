function Map (container, layout) {
  this.layout = layout;
  this.container = container;
  thisMap = this;
  console.log(layout.provaNumero);

  thisMap.mapList = new MapList(this);

  //Width and height
  var w = 960;
  var h = 500;
  var active = d3.select(null);

  //Define map projection
  thisMap.projection = d3.geo.albersUsa()
  .translate([w/2, h/2])
  .scale([1000]);

  //Define path generator
  thisMap.path = d3.geo.path()
  .projection(thisMap.projection);

  //Create SVG element
  thisMap.svg = this.container
  .append("svg")
  .attr('class', 'usmap')
  .attr("width", '100%')
  .attr("height", '100%')
  .attr('viewBox', '0 0 960 500')
  .attr('preserveAspectRatio', 'xMinYMin meet');

  //Create background
  thisMap.svg.append('rect')
  .attr('class', 'background')
  .attr('width', w)
  .attr('height', h)
  .style('fill', 'rgb(153,216,201)');

  //Create borders between states
  thisMap.g = thisMap.svg.append('g')
  .style('stroke-width', '1.5px');

      //Load in GeoJSON data
      d3.json("data/us-states.json", function(json) {

        thisMap.g.selectAll('path')
        .data(json.features)
        .enter()
        .append('path')
        .attr('d', thisMap.path)
        .attr('class', function (d) {
          var temp = d.properties.name.split(' ');
          if(temp.length == 1) {
            return 'feature statename' + temp[0];
          } else {
            return 'feature statename' + temp[0] + temp[1];
          }
       })
        //.attr('class', 'feature')
        .style('fill', 'rgb(44,162,95)')
        .on('click', clicked);
      });

      function clicked(d) {
        console.log(d);
        console.log(layout.getTransitionOn());
        if(!layout.getTransitionOn()) {
          layout.setTransitionOn(true);
          //console.log(this.getAttribute('active'));
          stateActive = this.getAttribute('active') ? true : false;
          console.log(stateActive);
          console.log(layout.availableColumn());
          if(!stateActive && layout.availableColumn()) {
          //console.log(d);
          d3.select(this).attr('active', true);
          switch(layout.nextGeneratedId()) {
            case 1: {
              d3.select(this).style('fill', 'rgb(224,243,219)');
              break;
            }
            case 2: {
              d3.select(this).style('fill', 'rgb(179,226,205)');
              break;
            }
            case 3: {
              d3.select(this).style('fill', 'rgb(168,221,181)');
              break;
            }
          }
          layout.stateClicked(d.properties.name, true);
        } else if (stateActive) {
          d3.select(this).style('fill', 'rgb(44,162,95)')
          .attr('active', null);
          layout.stateClicked(d.properties.name, false);
        } else {
          layout.setTransitionOn(false);
        }
        /*stateActive = this.getAttribute('active') ? true : false;
        layout.stateClicked(d.properties.name, stateActive);*/
      }
    }

    function clickedName(d) {
      console.log(d);
      console.log(layout.getTransitionOn());
      if(!layout.getTransitionOn()) {
        layout.setTransitionOn(true);
          //console.log(this.getAttribute('active'));
          stateActive = d.getAttribute('active') ? true : false;
          console.log(stateActive);
          console.log(layout.availableColumn());
          if(!stateActive && layout.availableColumn()) {
          //console.log(d);
          d3.select(d).attr('active', true);
          switch(layout.nextGeneratedId()) {
            case 1: {
              d3.select(d).style('fill', 'rgb(224,243,219)');
              break;
            }
            case 2: {
              d3.select(d).style('fill', 'rgb(179,226,205)');
              break;
            }
            case 3: {
              d3.select(d).style('fill', 'rgb(168,221,181)');
              break;
            }
          }
          layout.stateClicked(d.__data__.properties.name, true);
        } else if (stateActive) {
          d3.select(d).style('fill', 'rgb(44,162,95)')
          .attr('active', null);
          layout.stateClicked(d.__data__.properties.name, false);
        } else {
          layout.setTransitionOn(false);
        }
        /*stateActive = this.getAttribute('active') ? true : false;
        layout.stateClicked(d.properties.name, stateActive);*/
      }
    }

    this.nameClicked = function (statename) {
      d = getPathByStateName(statename)[0][0];
      console.log(d);
      clickedName(d);
    };

    function getPathByStateName(statename) {
      var statenamenospace = '';
      var temp = statename.split(' ');
          if(temp.length == 1) {
            statenamenospace = temp[0];
          } else {
            statenamenospace = temp[0] + temp[1];
          }
      return d3.select('.statename' + statenamenospace);
    }

  }

