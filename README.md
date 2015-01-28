hashpool
=========
[![Build Status](https://travis-ci.org/atonparker/hashpool.png?branch=master)](https://travis-ci.org/atonparker/hashpool)

__hashpool__ is a fixed-size pool of reusable IDs. Because it is a fixed-size, the generated IDs will always be the same length and are garunteed unique. It generates IDs in O(n/2) time.

Methods
-------

#### new HashPool(options)
The constructor takes an object with two optional parameters: `bits`, which is the number of bits in the generated IDs, and `base`, which is the radix of the generated IDs. The defaults are `{ bits: 24, base: 16 }` which generate 6-digit hexadecimal IDs.

#### take()
Take an ID from the pool. Will throw an `Error` if the pool is empty.

#### taken(value)
Returns true if the given ID was taken from the pool.

#### free(value)
Return an ID to the pool, where it is eligible for reuse.

Examples
--------

Generating 6-digit hexadecimal IDs:

    hp = new HashPool
    
    for i in [0..99]
      uid = do hp.take

Returning IDs to the pool:

    hp = new HashPool
    
    uid = do hp.take
    hp.taken uid # true

    hp.free uid
    hp.taken uid # false

Generating custom IDs:
  
    hp = new HashPool { bits: 4, base: 8 }

    uid = do hp.take # generates a base-8 ID between 00 and 17

Testing
-------

__hashpool__ uses [Mocha](http://mochajs.org) for testing. To run the test suite, call `npm test` in the project directory.