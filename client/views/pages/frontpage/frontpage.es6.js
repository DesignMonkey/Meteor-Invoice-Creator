Template['frontpage'].helpers({
  nicePrice: function(hours) {
    var hourRate = Template.instance().viewmodel.rate();
    return 'kr. '+ (parseFloat(hours) * hourRate).formatMoney(2, ',', '.');
  }
});

Template['frontpage'].events({

});

Template['frontpage'].onCreated(function() {
  var self = this;
  //  self.data.test = 'hej med dig';
  self.subscribe('posts');
});

Template['frontpage'].viewmodel('frontpage', {
  rate: 950,
  beforeStartItems: function() {
    return Posts.find({ label: 'before'});
  },
  isActive: function(active) {
    return (active === true);
  },
  getValue: function(val) {
    return val;
  }

}, ['beforeStartItems']);

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