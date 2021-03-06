var ld = require('lodash');
var graphs = {};

graphs.UndirectedGraph = function(){
  this.graph = {};
};
graphs.UndirectedGraph.prototype= {
  addVertex : function(vertex){
    this.graph[vertex] = this.graph[vertex] || [];
  },
  addEdge : function(vertex,edge){
    this.graph[vertex].push(edge);
    this.graph[edge].push(vertex);
  },
  hasEdgeBetween : function(vertex,edge){
      if(this.graph[vertex].indexOf(edge) < 0)
        return false;
      return true;
  },
  order : function(){
    return Object.keys(this.graph).length;
  },
  size : function(){
    var size = 0;
    for (var vertex in this.graph)
      size+=this.graph[vertex].length;
    return size/2;
  },
  pathBetween: function (head, tail, visited) {
    visited = visited || [];
    if(head == tail)
      return visited.concat(head);
    for (var index in this.graph[head]){
      var nextHead = this.graph[head][index];
      if(visited.indexOf(nextHead) >=0 )continue;
        // nextHead = this.graph[head][index+1];
      var path = this.pathBetween(nextHead, tail, visited.concat(head));
      if(path.length) return path;
    }
    return [];
  },
  farthestVertex : function(vertex){
    var farthestPath = [];
    for (tail of Object.keys(this.graph)) {
      var path = this.pathBetween(vertex,tail);
      farthestPath = path.length > farthestPath.length?path:farthestPath;
    }
    return farthestPath[farthestPath.length-1];
  },
  allPaths : function (head, tail, visited,paths) {
    paths = paths || [];
    visited = visited || [];
    if(head == tail){
      paths.push(visited.concat(head));
      return paths;
    }
    for (var index in this.graph[head]){
      var nextHead = this.graph[head][index];
      if(visited.indexOf(nextHead) < 0)
        paths = this.allPaths(nextHead, tail, visited.concat(head),paths);
    }
    return paths;
  }

};
module.exports =graphs;
