HashPool
=========
[![Build Status](https://travis-ci.org/atonparker/hashpool.png?branch=master)](https://travis-ci.org/atonparker/hashpool)

__HashPool__ is a fixed-size pool of reusable IDs. Because it is a fixed-size, the generated IDs will always be the same length and are garunteed unique. It generates IDs in O(n/2) time.

Methods
-------

<dl>

  <dt>(options)</dt>
  <dd>The constructor takes an object with two optional parameters: <code>bits</code>, which is the number of bits in the generated IDs, and <code>base</code>, which is the radix of the generated IDs. The defaults are <code>{ bits: 24, base: 16 }</code> which generate 6-digit hexadecimal IDs.</dd>

  <dt>take()</dt>
  <dd>Take an ID from the pool. Will throw an <code>Error</code> if the pool is empty.</dd>

  <dt>taken(value)</dt>
  <dd>Returns true if the given ID was taken from the pool.</dd>

  <dt>free(value)</dt>
  <dd>Return an ID to the pool, where it is eligible for reuse.</dd>

</dl>

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

HashPool uses [Mocha](http://visionmedia.github.io/mocha/) for testing. To run the test suite, call `npm test` in the project directory.

License
-------

The MIT License (MIT)

Copyright (c) 2013 Chris Parker

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
