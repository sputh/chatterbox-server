var display = function(){
  var makeBubbles = function(msgs){
    var rooms = {};
    var numrooms = 0;
    for(var k = 0; k < msgs.length; k++){
      if(rooms[msgs[k].room] === undefined) {
        rooms[msgs[k].room] = 1;
      }
      rooms[msgs[k].room] += 1;
    }
    var result = []
    for(var room in rooms){
      result.push({name: room, count: rooms[room]});
    }
    return result;
  }

  var dataSet = app.getBubbleData();
  var dataArray = makeBubbles(dataSet);


  var color = d3.scale.category20b();
  var width = document.documentElement.clientWidth*0.85;
  var height = document.documentElement.clientHeight*0.75;
  var svg = d3.select('body').append('svg').attr({
    "width": width,
    "height": height,
    "border-style" : "solid",
    "border-width" : "5px"
  });
  // console.log(color());
  var force = d3.layout.force()
  .gravity(0.02)
  .charge(function(d, i){
    return i ? 0 : -500
  })
  .nodes(dataArray)
  .size([width, height]);


  var element = svg.selectAll('g').data(dataArray).enter().append('g');
    //.attr("transform", function(d){ return "translate(40,80)" });

    var circle = element.append("circle")
    .attr("r", function(d){ return Math.min(d.count*10, 100); })
    .attr("class", "room")
    .attr("id", function(d) {
      return d.name;
    }).attr('text', function(d){ return d.name; })
    .call(force.drag)
    .style("fill", function(d,i) { return color(i%7); });

  // Add Text to Rooms
  var text = svg.selectAll("g")
  .append('text')
  .attr('x', 1)
  .attr('y', ".31em")
  .style("text-anchor", "middle")
  .text(function(d){ return d.name });

var padding = 5;
var clusterPadding = 6;

  // function collide(alpha) {
  //   var quadtree = d3.geom.quadtree(alpha);
  //   return function(d) {
  //     var r = d.count + 65 + Math.max(padding, clusterPadding),
  //     nx1 = d.x - r,
  //     ny1 = d.y - r,
  //     nx2 = d.x + r,
  //     ny2 = d.y + r;
  //     quadtree.visit(function(quad, x1, y1, x2, y2) {
  //       if(quad.point && (quad.point !==d)) {
  //         var x = d.x - quad.point.x,
  //         y = d.y - quad.point.y,
  //         l = Math.sqrt(x * x + y * y),
  //         r = d.radius + quad.point.radius + (d.cluster === quad.point.cluster ? padding : clusterPadding);
  //           if ( l < r ) {
  //             l = (l - r) / a * alpha;
  //             d.x -= x *= 1;
  //             d.y -= y *= 1;
  //             quad.point.x += x;
  //             quad.point.y += y;
  //           }
  //       }
  //       return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
  //     });
  //   };
  // }
function collide(node) {
  var r = 10*node.count + 16,
      nx1 = node.x - r,
      nx2 = node.x + r,
      ny1 = node.y - r,
      ny2 = node.y + r;
  return function(quad, x1, y1, x2, y2) {
    if (quad.point && (quad.point !== node)) {
      var x = node.x - quad.point.x,
          y = node.y - quad.point.y,
          l = Math.sqrt(x * x + y * y),
          r = node.count + quad.point.radius;
      if (l < r) {
        l = (l - r) / l * .5;
        node.x -= x *= l;
        node.y -= y *= l;
        quad.point.x += x;
        quad.point.y += y;
      }
    }
    return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
  };
}
  force.on('tick', function(e) {
    var q = d3.geom.quadtree(dataArray),
    i = 0,
    n = dataArray.length;
    // console.log(dataArray.length)
    while(++i < n){
      q.visit(collide(dataArray[i]))
    }
    svg.selectAll("circle")
    .attr({
      "cx" : function(d){ return d.x },
      "cy" : function(d){ return d.y }
    })
    //.each(collide(dataArray));
    d3.selectAll("text")
    .attr("transform", function(d){
     return "translate("+d.x+","+d.y+")";
   })
  })
  force.start();
}
// Need to collect an array of all the rooms--unique names
// Filter data from fetch() by room name
  // d3.data(^).append array of objects of EACH room to individual g/svg element
  // allow for click of room to open queue of messages
  // attr(radius to data.length)
  // TO START: create an array of room names, generate a set of bubbles with roomname text

// var basement = [{text, username}]

// when queue opens, have text area at the bottom

