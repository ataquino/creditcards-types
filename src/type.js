'use strict';

var extend = require('xtend/mutable');

function CardType (name, config) {
  extend(this, {name: name}, config);
}

CardType.prototype.cvcLength = 3;

CardType.prototype.luhn = true;

CardType.prototype.groupPattern = /(\d{1,4})(\d{1,4})?(\d{1,4})?(\d{1,4})?/;

CardType.prototype.group = function (number) {
  return (number.match(this.groupPattern) || [])
    .slice(1)
    .filter(identity);
};

CardType.prototype.test = function (number, eager) {
  return this[eager ? 'eagerPattern' : 'pattern'].test(number);
};

module.exports = CardType;

function identity (value) {
  return value;
}
