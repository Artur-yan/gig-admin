//eslint-disable-next-line
Number.prototype.formatMoney = function(c = 2) {
  return this.toFixed(c).replace(/(\d)(?=(\d{3})+(,|$))/g, '$1,');
};