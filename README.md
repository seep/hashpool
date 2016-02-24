hashpool
=========
[![Build Status](https://travis-ci.org/atonparker/hashpool.png?branch=master)](https://travis-ci.org/atonparker/hashpool)

__hashpool__ is a fixed-size pool of reusable hashes.

## Examples

Generating six-digit hex hashes:

```javascript
const pool = hashpool();

pool.take(); // 5a73f0
pool.take(); // 98de2c
pool.take(); // 4718ef
```

Returning hashes to the pool:

```javascript
const pool = hashpool();

let hash = pool.take();
pool.taken(hash); // true

pool.free(hash);
pool.taken(hash); // false
```

Generating custom hashes:

```javascript
const pool = hashpool({ bits: 4, base: 2 });

pool.take() // 0110
pool.take() // 0010
pool.take() // 1011
```

## API

#### `hashpool(options)`
Makes a new hashpool. `options.bits` will change the number of bits the hashes. More bits, bigger pool. `options.base` will change the radix of the hashes, between 2 and 36. Bigger base, fewer digits with more characters. The defaults are `{ bits: 24, base: 16 }` which generate six-digit hexadecimal hashes.

#### `hashpool#take()`
Take a hash from the pool. Will throw if the pool is empty.

#### `hashpool#taken(hash)`
Returns true if the hash was taken from the pool.

#### `hashpool#free(value)`
Put a hash back in the pool, where it can be reused.

## Testing

__hashpool__ uses [tape](https://github.com/substack/tape) for testing. Simply run `npm test` in the project directory.