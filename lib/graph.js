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
    for (var vertex in this.graph) {
      size+=this.graph[vertex].length;
    }
    return size/2;
  }
};
module.exports =graphs;
