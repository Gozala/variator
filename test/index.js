"use strict";

var variator = require("../core")

exports["test not implemented"] = function(assert) {
  var fn = variator("fn")

  assert.throws(function() {
    fn(1)
  }, /not implemented for:/, "method not implemented")
}

exports["test define"] = function(assert) {
  var fn = variator("fn")
  fn.define("foo", function(foo, arg) {
    return [foo, arg]
  })

  assert.deepEqual(fn("foo", "bar"), ["foo", "bar"],
                   "argument was dispatched")

  assert.throws(function() {
    fn("bar", "foo")
  }, /not implemented for:/, "method not implemented")
}

exports["test default"] = function(assert) {
  var fn = variator("fn")
  var foo = {}
  var bar = {}

  fn.define(function() { return false })
  fn.define(foo, function(foo, arg) { return true })

  assert.equal(fn(bar), false, "dispatches on default")
  assert.equal(fn(foo), true, "dispatches no implementation")
}


require("test").run(exports)
