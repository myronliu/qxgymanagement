
var FormatMoney  = {};

FormatMoney.formatMoney = function(s, n){
  n = n > 0 && n <= 20 ? n : 2;  
  s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";  
  var l = s.split(".")[0].split("").reverse();
  var r = s.split(".")[1];  
  var t = "";  
  for (var i = 0; i < l.length; i++) {  
      t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");  
  }  
  return t.split("").reverse().join("") + "." + r;  
};

FormatMoney.formatCount = function(s){
  s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(0) + "";  
  var l = s.split(".")[0].split("").reverse();  
  var t = "";  
  for (var i = 0; i < l.length; i++) {  
      t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");  
  }  
  return t.split("").reverse().join("");  
};

FormatMoney.formatInt = function(s){
  return Math.round(parseFloat(s));
}

module.exports = FormatMoney;
