'use strict';

const test = require('tape');
const times = require('lodash.times');
const hashpool = require('..');

test('taking', function(assert) {

  let hp = hashpool();

  let hash = hp.take();
  assert.ok(hp.taken(hash));

  assert.end();

});

test('freeing', function(assert) {

  let hp = hashpool({ bits: 3 });

  times(8, () => hp.take());

  hp.free('3');
  assert.is(hp.take(), '3');

  hp.free('6');
  assert.is(hp.take(), '6');

  assert.end();

});

test('nonrepeating', function(assert) {

  let hp = hashpool({ bits: 3 });

  times(8, () => hp.take());
  assert.throws(hp.take);

  assert.end();

});

test('bases', function(assert) {

  let hp = hashpool({ base: 7 });
  assert.ok(hp.take().match(/[0-7]+/));

  hp = hashpool({ base: 27 });
  assert.ok(hp.take().match(/[0-9a-q]+/));

  hp = hashpool({ base: 36 });
  assert.ok(hp.take().match(/[0-9a-z]/));

  assert.end();

});

test('padding', function(assert) {

  let hp = hashpool({ bits: 4, base: 7 });

  times(16, () => {

    let hash = hp.take();
    assert.is(hash.length, 2);

  });

  hp = hashpool({ bits: 4, base: 3 });

  times(16, () => {

    let hash = hp.take();
    assert.is(hash.length, 3);

  })

  assert.end();

});

