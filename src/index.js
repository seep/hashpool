'use strict';

const bitterset = require('bitterset');

const defaults = { bits: 24, base: 16 };

function hashpool(options) {

  if (!(this instanceof hashpool)) return new hashpool(options);

  if (options === undefined) options = defaults;

  this.bits = options.bits || defaults.bits;
  this.base = options.base || defaults.base;

  // The maximum base for the returned hash is 36, which will use the digits
  // [0-9a-z].The minimum base is 2, which will only use the digits [0-1].
  if (this.base < 2 || this.base > 36) throw new Error('The base is out of range. Please use a number between 2 and 36.');

  // The total size of the pool.
  this.size = (1 << this.bits);

  // The number of digits in each hash.
  this.digits = Math.ceil(Math.log(this.size) / Math.log(this.base));

  // The actual pool of indexes that we'll draw from.
  this.pool = bitterset();

}

hashpool.prototype.take = function() {

  let start = Math.floor(Math.random() * this.size);

  // Look for an available hash after the random starting point.
  let next = this.pool.forwards(false, start).next();

  // If there weren't any open hashes after the start index, look backwards.
  if (next.done || next.value >= this.size)
    next = this.pool.backwards(false, start).next();

  // If there still aren't any open hashes before the start index, it's full.
  if (next.done)
    throw new Error('The pool is empty.');

  // Flag the hash as taken.
  let index = next.value;
  this.pool.set(index);

  // Render the index in the chosen base.
  let hash = index.toString(this.base);

  // Before returning the final hash, we need to pad the front of it with zeroes
  // so that all of the hashes have the same length.
  let pad = Array(this.digits - hash.length + 1).join('0');

  return pad + hash;

}

hashpool.prototype.taken = function(hash) {

  let index = parseInt(hash, this.base);
  return this.pool.get(index);

}

hashpool.prototype.free = function(hash) {

  let index = parseInt(hash, this.base);
  this.pool.clear(index);

}

module.exports = hashpool;
