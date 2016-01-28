var ld = require('lodash');
var graphs = {};

graphs.Edge = function(edge,head,tail,weight){
  this.edge = edge;
  this.head = head;
  this.tail = tail;
  this.weight = weight;
};

var initializeWeights = function(vertices,source){
  var distance = {};
  vertices.forEach(function(vertex){
    distance[vertex] = Infinity;
  })
  distance[source] = 0;
  return distance;
};
var getLeastWeightedEdge = function(distances,vertex){
  var smallEdge;
  var edge = Object.keys(distances).reduce(function(prev_edge,new_edge,index) {
    smallEdge = distances[prev_edge]<=distances[new_edge]?prev_edge:new_edge;
    if(vertex.indexOf(smallEdge)>=0) return smallEdge;
  })
  return edge || vertex[0];
}
var getSmallestPath = function(parants,head,tail,path){
  path = path || [];
  if(tail == head)return path;
  path.push(parants[tail])
  getSmallestPath(parants,head,parants[tail]['head'],path);
  return path || [];
};
graphs.WeightedGraph = function(){
  this.graph = {};
};
graphs.WeightedGraph.prototype = {
  addVertex : function(vertex){
    this.graph[vertex] = this.graph[vertex] || [];
  },
  addEdge : function(edge){
    this.graph[edge['head']].push(edge);
  },
  shortestPath : function(head,tail){
    var vertices = Object.keys(this.graph);
    var edgeSet = JSON.parse(JSON.stringify(this.graph));
    var distances = initializeWeights(vertices,head);
    var parants = {};
    parants[head] = head;
    while(vertices.length){
      var LeastWeightedge = getLeastWeightedEdge(distances,vertices);
      var edges = edgeSet[LeastWeightedge];
      edges.forEach(function(edge){
        if((distances[LeastWeightedge]+edge.weight)<=distances[edge.tail]){
            distances[edge.tail] = distances[LeastWeightedge]+edge.weight;
            parants[edge.tail] = edge;
          }
      });
      vertices.splice(vertices.indexOf(LeastWeightedge),1);
      delete edgeSet[LeastWeightedge];
    }
    var path = getSmallestPath(parants,head,tail);
    return path.reverse();
  }
};

module.exports = graphs;
