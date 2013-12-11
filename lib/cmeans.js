//var _ = require('underscore');

module.exports = function(vector, k, callback) {
    if (!vector || !k || !callback) throw new Error(
            "Provide 3 arguments: callback, vector, clusters")
    
    return new Kmeans(vector, k, callback)
}

function Kmeans (vector, k, callback) {
    
    this.callback = callback
    this.vector=vector
    this.k = k

    this.centroids = new Array(k)
    this.cluster = new Array(k) 

    this.startClustering()
}

Kmeans.prototype.startClustering = function() {
    
    this.createCentroids()
    
    var count = 0
        , notFinished = true
    
    console.log("") 
    console.log(this.centroids) 

    this.iterate(1)
}

Kmeans.prototype.iterate = function (moved) {
   
    if (moved==0) return this.callback(this.cluster)
   
    var tempArray = []    
    for (var a=0; a<this.vector[0].length; a++) {
        tempArray.push(0)
    }
    var vecArray = []
    for (var a=0; a<this.k; a++) {
        vecArray[a] = (tempArray.slice(0))
    }
    
    //classify points to clusters.
    for (i in this.vector) {
        var v = this.vector[i]
        var index = this.assignCentroid(v)
        
        if (!this.cluster[index]) this.cluster[index]=[]
            this.cluster[index].push(v)
        for (var a=0; a<v.length; a++){
            vecArray[index][a]+=v[a] //keep a sum for cluster
        }
    }

    console.log(vecArray)
    //update means
    for (var a=0; a<this.k; a++) {
        var clusterSize = this.cluster[a].length
        var point = vecArray[a]
        for (var b=0; b<point; b++)
            vecArray[a][b]=point[b]/clusterSize
    }
   
    console.log(vecArray)

    //move centroids
    for (var a=0; a<this.k; a++) {
        var cluster = this.cluster[a]
        for (var b=0; b<cluster.length; b++){
            for (var c=0; c<cluster.length; c++) {
                
            }
            //careful to use this.cluster..
        }
    } 
    console.log("====clusters====")    
    console.log(this.cluster) 
    //update centroid
    moved=0
    this.iterate(moved)

}

Kmeans.prototype.createCentroids = function () {
  
    var randomArray = this.vector.slice(0)
    var self = this
    //sort the whole thing?
    randomArray.sort(function() {
        return (Math.floor(Math.random() * self.vector.length))
    });
    this.centroids = randomArray.slice(0, this.k);

    //for (var i=0; i<this.k; i++) {
    //    rand = Math.floor(Math.random() * (this.vector.length  )) 
    //    this.centroids[i] = this.vector[rand]
    //}
}

Kmeans.prototype.assignCentroid = function (point) {
    var min = Infinity
        , res = 0
    for (i in this.centroids) {
        dist = this.distance(point, this.centroids[i])
        if (dist < min) {
            min = dist
            res = i       
        }
    }

    return res
}

Kmeans.prototype.distance = function(v1, v2) {

    //Calculate euclidian distances
    var total = 0
    for (c in v1) {
        total += Math.pow(v2[i]-v1[i], 2)
    }
    return Math.sqrt(total)
}
