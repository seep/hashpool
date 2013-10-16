BitterSet = require 'bitterset'

module.exports = class HashPool

  defaults =
    bits: 24
    base: 16

  constructor: (options = defaults) ->

    options.bits ?= defaults.bits
    options.base ?= defaults.base
    
    # The maximum base for the returned hash is 36, which will use the digits [0-9a-z]. The minimum base is 2, which 
    # will only use the digits [0-1].
    options.base = 36 if options.base > 36
    options.base = 2 if options.base < 2

    @base = options.base
    @bits = options.bits
    @size = (1 << options.bits)

    # We construct the estimated number of digits created by Number#toString function for the desired base. The 
    @digits = Math.ceil( Math.log(@size) / Math.log(options.base) )
    
    @pool = new BitterSet

  take: ->
    index = offset = Math.floor(Math.random() * @size) % @size

    if @pool.get index
      index = @pool.next false, offset
      unless -1 < index < @size then index = @pool.previous false, offset
      unless -1 < index < @size then throw new Error 'The hashpool is empty.'

    @pool.set index

    # Before returning the final hash, we need to pad the front of it with zeroes so that all of the hashes have the 
    # same length.
    result = index.toString @base
    result = '0' + result until result.length >= @digits
    return result

  taken: (hash) ->
    index = parseInt hash, @base
    return @pool.get index

  free: (hash) ->
    index = parseInt hash, @base
    @pool.clear index
    return