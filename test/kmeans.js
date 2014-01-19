var assert = require('assert')
  , mocha = require('mocha')
  , kmeans = require('../lib/kmeans.js')

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
            [20, 5, 10],
            [1,1,1],
            [2,4,5],
            [6,10,3],
            [1000,51,200]
        ]

        kmeans(vector, 3, function (err, res) {
            console.log(res)
            //assert.equals(err, null)
        })
    
        //asert.equal(,)
    done()
  })
})
