var moment = require("../../moment");


var symbolMap = {
  '1': '!',
  '2': '@',
  '3': '#',
  '4': '$',
  '5': '%',
  '6': '^',
  '7': '&',
  '8': '*',
  '9': '(',
  '0': ')'
};

var numberMap = {
  '!': '1',
  '@': '2',
  '#': '3',
  '$': '4',
  '%': '5',
  '^': '6',
  '&': '7',
  '*': '8',
  '(': '9',
  ')': '0'
};

var symbolLang = {
    preparse: function(string) {
        return string.replace(/[!@#$%^&*()]/g, function(match) {
            return numberMap[match];
        });
    },

    postformat: function(string) {
        return string.replace(/\d/g, function(match) {
          return symbolMap[match];
        });
    }
};

exports.preparse_postformat = {
    "transform": function(test) {
        test.expect(2);
        moment.lang('symbol', symbolLang);

        test.equal(moment('@)!@-)*-@&', 'YYYY-MM-DD').unix(), 1346047200, "preparse");
        test.equal(moment.unix(1346047200).format('YYYY-MM-DD'), '@)!@-)*-@&', "postformat");

        test.done();
    },
};
