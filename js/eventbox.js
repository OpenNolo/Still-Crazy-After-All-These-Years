function EventBox(container, layout) {
  this.container = container;
  thisEB = this;
  thisEB.layout = layout;

  var activeEventYear = 0;

  // RICORDARSI PARSEINT PER YEAR!!
  var events = [
  {
    EVENT: "Atomic Bombings on Japan",
    YEAR: "1945"
  },
  {
    EVENT: "Asian flu",
    YEAR: "1956"
  },
  {
    EVENT: "Hong Kong flu",
    YEAR: "1968"
  },
  {
    EVENT: "First man on moon",
    YEAR: "1969"
  },
  {
    EVENT: "Start Lebanese Civil War",
    YEAR: "1975"
  },
  {
    EVENT: "Chernobyl Disaster",
    YEAR: "1986"
  },
  {
    EVENT: "Berlin Wall demolished",
    YEAR: "1989"
  },
  {
    EVENT: "Persian Gulf War",
    YEAR: "1991"
  },
  {
    EVENT: "September 11 attacks",
    YEAR: "2001"
  },
  {
    EVENT: "Start Iraq War",
    YEAR: "2003"
  },
  {
    EVENT: "None",
    YEAR: "0"
  }
  ];

  // Create the buttons
  var svg = this.container
  .append("svg")
  .attr("width", '100%')
  .attr("height", '100%')
  .attr('viewBox', '0 0 200 100')
  .attr('preserveAspectRatio', 'xMinYMin meet');

  svg.append('text')
   //.attr('text-anchor', 'middle')
   .attr('dominant-baseline', 'central')
   .attr('font-family', 'Arial')
   .attr('font-size', 13)
   .attr('color', 'rgb(64, 64, 64)')
   .attr('x', 40)
   .attr('y', 20)
   .text("People that remember: ");

  var eventCircles = svg.selectAll('circle')
  .data(events)
  .enter()
  .append("circle")
  .attr("cx", 50)
  .attr("cy", function(d, i) {
    return (i+1)*20 + 25;
  })
  .attr("r", 5)
  .style('fill', 'black')
  .on('click', function (d, i) {
    console.log(d.YEAR);
    activeEventYear = parseInt(d.YEAR);
    thisEB.showAlive();
    for (var j = 0; j < innerCircles.length; j++) {
      if(j == i) {
        d3.select(innerCircles[j]).transition().style('fill', 'black');
      } else {
        d3.select(innerCircles[j]).transition().style('fill', 'rgb(153,216,201)');
      }
    }
  });

  var innerCircles = [];
  for (var i = 0; i < events.length; i++) {
    tempCircle = svg.append("circle")
    .attr('pointer-events', 'none')
    .attr("cx", 50)
    .attr("cy", (i+1)*20 + 25)
    .attr("r", 3)
    .style('fill', 'rgb(153,216,201)');
    innerCircles.push(tempCircle[0][0]);
  }
  console.log(innerCircles);

  svg.selectAll("textevents")
  .data(events)
  .enter()
  .append("text")
  .attr('class', 'textevents')
  .text(function(d) {
    return d.EVENT;
  })
  .attr("x", 60)
  .attr("y", function(d, i) {
    return (i+1)*20 + 28;
  })
  .attr("font-family", "arial")
  .attr("font-size", "11px")
  .attr("fill", "black");

  /*

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
  */

  thisEB.showAlive = function () {
    console.log('test');
    for (var i = 0; i < thisEB.layout.columns.length; i++) {
      thisEB.layout.columns[i].updateToEvent(activeEventYear);
    }
  };

}
