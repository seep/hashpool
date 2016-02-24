const benchmark = require('benchmark');
const hashpool = require('..');

const testpool = hashpool();
const log = event => console.log(String(event.target));

const bench = benchmark('hashpool#take', () => testpool.take())
  .on('complete', log)
  .run();