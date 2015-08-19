Template['invoice'].helpers({
  nicePrice: function(hours) {
    var hourRate = Template.instance().data.rate;
    return 'kr. '+ (parseFloat(hours) * hourRate).formatMoney(2, ',', '.');
  },
  beforeItems: function() {
    var orderlines = Template.instance().data.orderlines;
    return _.where(orderlines, { label: 'before'});
  },
  checkboxAttr: function() {
    return (this.active) ? { checked: 'checked' } : {};
  },
  getQuantity: function() {

  }
});

Template['invoice'].events({
});


Template['frontpage'].onCreated(function() {
  var self = this;
});


Number.prototype.formatMoney = function(c, d, t){
  var n = this,
    c = isNaN(c = Math.abs(c)) ? 2 : c,
    d = d == undefined ? "." : d,
    t = t == undefined ? "," : t,
    s = n < 0 ? "-" : "",
    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
    j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
 };