HashPool = require '../lib/hashpool'

describe 'a default hashpool', ->
  it 'should generate 6 digit hexadecimal hashes', ->
    hp = new HashPool
    for i in [0..100]
      h = do hp.take
      h.should.have.length 6
      h.should.match /[0-9a-f]{6}/
  it 'should take and return hashes to the internal bitset', ->
    hp = new HashPool
    taken = ( do hp.take for i in [0..99] )
    hp.pool.cardinality().should.equal 100
    hp.taken(hash).should.equal true for hash in taken
    hp.free hash for hash in taken
    hp.pool.cardinality().should.equal 0
    hp.taken(hash).should.equal false for hash in taken

describe 'a small hashpool', ->
  it 'should run out of hashes', ->
    hp = new HashPool { bits: 3 }
    do hp.take for i in [0..6]
    hp.take().should.throw()
  it 'should not repeat hashes', ->
    hp = new HashPool { bits: 3 }
    taken = [ ]
    for i in [0..6]
      h = do hp.take
      taken.should.not.include h
      taken.push h
  it 'should repeat hashes after they are freed', ->
    hp = new HashPool { bits: 3 }
    do hp.take for i in [0..6]
    hp.take().should.throw()
    hp.free '3'
    hp.take().should.equal '3'
    hp.free '6'
    hp.take().should.equal '6'

describe 'a hashpool with a wierd base', ->
  it 'should generate hashes in the right base', ->
    hp = new HashPool { base: 7 }
    for i in [0..100]
      hp.take().should.match /[0-7]+/
    hp = new HashPool { base: 27 }
    for i in [0..100]
      hp.take().should.match /[0-9a-q]+/
    hp = new HashPool { base: 36 }
    for i in [0..100]
      hp.take().should.match /[0-9a-z]/
  it 'should have a min base of 2, and a max base of 36', ->
    hp = new HashPool { base: -1 }
    hp.base.should.equal 2
    hp = new HashPool { base: 43 }
    hp.base.should.equal 36
  it 'should pad the result with zeroes', ->
    hp = new HashPool { bits: 4, base: 7 }
    for i in [0..15]
      hp.take().should.have.length 2