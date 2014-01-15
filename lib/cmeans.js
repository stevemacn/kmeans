//var _ = require('underscore');

module.exports = function(vector, k, callback) {
    if (!vector || !k || !callback) throw new Error(
            "Provide 3 arguments: callback, vector, clusters")
    
    return new Kmeans(vector, k, callback)
}

function Kmeans (vector, k, callback) {

    this.vector = vector

    this.callback = callback
    this.k = k

    this.centroids = new Array(k)
    this.cluster = new Array(k) 

    this.startClustering()
}

Kmeans.prototype.startClustering = function() {
    
    this.createCentroids()
    console.log(this.centroids) 
    var count = 0
        , notFinished = true

    this.iterate(this.centroids.slice(0))
}

Kmeans.prototype.iterate = function (vecArray) {
   
    this.cluster = new Array(this.k) 
    
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
        var v = this.vector[i].slice(0)
        var index = this.assignCentroid(v)
        
        if (!this.cluster[index]) this.cluster[index]=[]
            this.cluster[index].push(v)

        for (var a=0; a<v.length; a++){
            vecArray[index][a]+=v[a] //keep a sum for cluster
        }
    }

    //update means and move centroids
    var distance 
        , max = 0 
   

    for (var a=0; a<this.k; a++) {
        var clusterSize = this.cluster[a].length
        for (b in vecArray[a]) {
            vecArray[a][b] = vecArray[a][b]/clusterSize
        }
        distance = this.distance(vecArray[a], this.centroids[a])
        if (distance>max) 
            max=distance
    }
    
    if (max<=0.5)
        return this.callback(null, this.cluster, this.centroids)
       
    //update centroid
    for (z in vecArray) {
        this.centroids[z] = vecArray[z].slice(0)
    }
    this.iterate(vecArray)

}

Kmeans.prototype.createCentroids = function () {
  
    var randomArray = this.vector.slice(0)
    var self = this
    //sort the whole thing?
    randomArray.sort(function() {
        return (Math.floor(Math.random() * self.vector.length))
    });
    this.centroids = randomArray.slice(0, this.k);
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
        if (c!=0)
        total += Math.pow(v2[c]-v1[c], 2)
    }
    return Math.sqrt(total)
}
