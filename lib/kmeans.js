// kmeans.js 0.0.1

//The kmeans clustering algorithm relies upon knowing in advance
//the number of clusters in which to place vectors. 


// Expose 
// ----------

//Expose our library to be called externally
module.exports = function(vector, k, callback = null) {
    if (!vector || !k) throw new Error(
            "Provide 2 arguments: vector, clusters")
    
    return new Kmeans(vector, k, callback)
}

// Initialize
// ----------
function Kmeans (vector, k, callback = null) {
    //**Vector:** array of arrays. Inner array
    //represents a multidimensional data point (vector)  
    //*These should be normalized*
    this.callback = callback
    this.vector = vector 
    //**K:** represents the number of groups/clusters into 
    //which the vectors will be grouped
    this.k = k
    //Initialize the centroids and clusters     
    //**Centroids:** represent the center of each cluster. 
    //They are taken by averaging each dimension of the vectors
    this.centroids = new Array(k)
    this.cluster = new Array(k) 

    //Create centroids and place them randomly because 
    //we don't yet know where the vectors are most concentrated
    this.createCentroids()
    var count = 0
        , notFinished = true
    
    this.iterate(this.centroids.slice(0))
}

// Assign vector to each centroid
// ----------
// Randomly choose **k** vectors from the vector 
// array **vector**. These represent our guess 
// at where clusters may exist. 
Kmeans.prototype.createCentroids = function () {
    var randomArray = this.vector.slice(0)
    var self = this
    randomArray.sort(function() {
        return (Math.floor(Math.random() * self.vector.length))
    });
    this.centroids = randomArray.slice(0, this.k);
}

// Recursively cluster and move the centroids
// ----------
//This method groups vectors into clusters and then determine the 
//the new location for each centroid based upon the mean
//location of the vectors in the cooresponding cluster
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
    //Group each vector to a cluster based upon the 
    //cooresponding centroid
    for (i in this.vector) {
        var v = this.vector[i].slice(0)
        var index = this.assignCentroid(v)
        
        if (!this.cluster[index]) this.cluster[index]=[]
            this.cluster[index].push(v)

        for (var a=0; a<v.length; a++){
            vecArray[index][a]+=v[a] //keep a sum for cluster
        }
    }

    //Calculate the mean values for each cluster.
    var distance 
        , max = 0 
   
    for (var a=0; a<this.k; a++) {
        
        var clusterSize = 0 //cluster is empty
        if (this.cluster[a]) clusterSize = this.cluster[a].length
        
        for (b in vecArray[a]) {
            vecArray[a][b] = vecArray[a][b]/clusterSize
        }
        distance = this.distance(vecArray[a], this.centroids[a])
        if (distance>max) 
            max=distance
    }

    if (max<=0.5){
        if(this.callback === null){
            return {
                cluster: this.cluster,
                centroids: this.centroids
            }
        }

        return this.callback(null, this.cluster, this.centroids)
    }
       
    //For each centroid use the mean calculated for the 
    //corresponding cluster (effectively "moving" the centroid
    //to its new "location")
    for (z in vecArray) {
        this.centroids[z] = vecArray[z].slice(0)
    }
    this.iterate(vecArray)

}


// Determine the closest centroid to a vector
// ----------
Kmeans.prototype.assignCentroid = function (point) {
    var min = Infinity
        , res = 0

    //For each vector we determine the distance to the 
    //nearest centroid. The vector is assigned to the 
    //cluster that corresponds to the nearest centroid.
    for (i in this.centroids) {
        dist = this.distance(point, this.centroids[i])
        if (dist < min) {
            min = dist
            res = i       
        }
    }
    return res
}

// Calculate euclidian distance between vectors
// ----------
Kmeans.prototype.distance = function(v1, v2) {
    var total = 0
    for (c in v1) {
        if (c!=0)
        total += Math.pow(v2[c]-v1[c], 2)
    }
    return Math.sqrt(total)
}
