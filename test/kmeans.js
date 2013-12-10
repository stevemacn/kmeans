var assert = require('assert')
  , fs = require('fs')
  , path = require('path')
  , kmeans = require('../lib/cmeans.js')

describe('kmeans', function () {

    it('correctly groups data together', function (done) {

        var vector = [
            [10, 2, 30],
            [30, 20, 2],
            [30, 30, 3],
            [10, 10, 1],
            [20, 1, 30],
            [1, 25, 30],
            [10, 15, 1],
            [20, 5, 10]
        ]

        kmeans(vector, 3, function (err, res) {
            console.log("DONE")
            //assert.equals(err, null)
        })
    
        //asert.equal(,)
    done()
  })
})
