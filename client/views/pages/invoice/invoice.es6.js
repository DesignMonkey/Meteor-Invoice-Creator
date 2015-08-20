Template['invoice'].helpers({
  nicePrice: function(price, times) {
    return 'kr. '+ (parseFloat(price) * times).formatMoney(2, ',', '.');
  },
  getTotalPrice: function() {
    var self = this;
    var totalSum = 0;
    var totalPercent = 0;
    _.each(Orderlines.find().fetch(), function(ol) {
      var totalHours = 0;
      var calculating = false;
      for(var i = 1; i <=3; i++) {
        var calc = ol['calc'+ i];
        if(calc.active) {
          calculating = true;
          totalHours+= ((calc.min + calc.max) / 2);
        }
      }
      if(calculating) {
        totalSum += (totalHours * self.rate);
      }
      else {
        totalPercent += self.managementPercent;
      }
    });
    return totalSum + (totalSum / 100 * totalPercent);

  }
});

Template['orderlines'].helpers({
  nicePrice: function(hours) {
    var hourRate = Template.instance().data.parent.rate;
    var managementPercent = Template.instance().data.parent.managementPercent;
    if(hours == -1) {
      var totalSum = 0;
      console.log(Orderlines.find().fetch());
      _.each(Orderlines.find().fetch(), function(ol) {
        var totalHours = 0;
        var calculating = false;
        for(var i = 1; i <=3; i++) {
          var calc = ol['calc'+ i];
          if(calc.active) {
            calculating = true;
            totalHours+= ((calc.min + calc.max) / 2);
          }
        }
        if(calculating) {
          totalSum += (totalHours * hourRate);
        }
      });
      return 'kr. '+ (totalSum / 100 * managementPercent).formatMoney(2, ',', '.');
    }
    else {
      return 'kr. '+ (parseFloat(hours) * hourRate).formatMoney(2, ',', '.');
    }
  },
  getOrderlines: function(_label, _id) {
    return Orderlines.find({ invoiceId: _id, label: _label })
  },
  calculatedHours: function() {
    var self = this;
    var calculating = false;
    var totalHours = 0;
    for(var i = 1; i <=3; i++) {
      var calc = self['calc'+ i];
      if(calc.active) {
        calculating = true;
        totalHours+= ((calc.min + calc.max) / 2);
      }
    }
    return (calculating) ? totalHours : -1;
  },
  bothActive: function(bool1, bool2) {
    return bool1 && bool2;
  },
  allActive: function(bool1, bool2, bool3) {
    return bool1 && bool2 && bool3;
  },
  niceQty: function(hours) {
    if(hours == -1) {
      var percentRate = Template.instance().data.parent.managementPercent;
      return percentRate +"%";
    }
    else {
      return (Math.round( hours * 10 ) / 10) + ' timer';
    }
  }
});

Template['orderlines'].events({
  'click .addOrderline': function(e) {
    e.preventDefault();
    Meteor.call('addOrderline', this.label, this.invoiceId, function() {
      $(".td label").each(function() {
        if($(this).closest('.checkbox').length == 0) {
          $(this).hide();
        }
      });
    });
  },
  'click .removeLabels': function() {
    setTimeout(function() {
      $(".td label").each(function() {
        if($(this).closest('.checkbox').length == 0) {
          $(this).hide();
        }
      });
    }, 100);
  }
});


Template['invoice'].onCreated(function() {
  var self = this;
});

Template['invoice'].onRendered(function() {
  var self = this;
  $(".td label").each(function() {
    if($(this).closest('.checkbox').length == 0) {
      $(this).hide();
    }
  });
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