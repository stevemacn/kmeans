An implementation of Kmeans
=====

Setup
---
    npm install

Usage
---
    //Creating 3 clusters with vector dataset

    var vector = [
        [10, 2, 30],
        [30, 20, 2],
        [30, 30, 3],
        [10, 10, 1],
        [20, 1, 30],
        [1, 25, 30]
    ]
    
    kmeans(vector, 3, function(err, res) {
        if (err) throw new Error(err)

        //do something with the result
    })


Testing
---
    npm test
