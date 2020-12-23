import pluralize from 'pluralize';

//eslint-disable-next-line
String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

//eslint-disable-next-line
String.prototype.plural = function() {
  return pluralize.plural(this);
};

//eslint-disable-next-line
String.prototype.singular = function() {
  return pluralize.singular(this);
};

//eslint-disable-next-line
String.prototype.smartPlural = function(quantity) {
  if (quantity === 1) {
    return pluralize.singular(this);
  }

  return pluralize.plural(this);
};