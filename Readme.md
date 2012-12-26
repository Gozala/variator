# variator

[![Build Status](https://secure.travis-ci.org/Gozala/variator.png)](http://travis-ci.org/Gozala/variator)

Prefix based method dispatch is an extendable alternative to imperative
[switch][] statements.

## Usage


```js
var variator = require("variator")
var price = variator("price")

price.define("Oranges", function(fruit, pound) {
  var n = pound || 1
  return "Total price for " + fruit + " is $" + n * 0.59
})
price.define("Apples", function(fruit, pound) {
  var n = pound || 1
  return "Total price for " + fruit + " is $" + n * 0.32
})

price("Oranges")      // => "Total price for Oranges is $1"
price("Apples", 5)    // => "Total price for Apples is $1.6"

// Errors are thrown for unknown cases:
price("Cherries", 2)  // => TypeError: Method price#0hq76f not implemented for: Cherries

// Although new cases can be defined
price.define("Cherries", function(fruit, pound) {
  var n = pound || 1
  return "Total price for " + fruit + " is $" + n * 3.00
})

price("Cherries", 2)  // => "Total price for Cherries is $6"
```

## Install

    npm install variator

[switch]:https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Statements/switch
