"use strict";

var method = require("method")

var make = Object.create

var define = method.define
var implement = method.implement

var cases = "cases@" + module.filename
var labels = "labels@" + module.filename
var Default = -1

function extendVariator(variator, label, implementation) {
  var index = variator[labels].indexOf(label)
  if (index >= 0)
    throw TypeError("Method is already implemted for label: " + label)
  if (implementation) {
    variator[labels].push(label)
    variator[cases].push(implementation)
  } else {
    variator[cases][Default] = label
  }
}

function variator(hint) {
  var dispatcher = method(hint)
  var prefixes = []
  var implementations = []
  dispatcher[labels] = prefixes
  dispatcher[cases] = implementations
  dispatcher.define(function dispatch(label) {
    var index = prefixes.indexOf(label)
    var implementation = implementations[index]
    if (!implementation)
      throw TypeError("Method " + dispatcher + " not implemented for: " + label)
    return implementation.apply(dispatcher, arguments)
  })
  define.implement(dispatcher, extendVariator)
  implement.implement(dispatcher, extendVariator)

  return dispatcher
}

module.exports = variator
