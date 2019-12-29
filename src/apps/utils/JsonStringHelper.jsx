function CommaStringToJson(str) {
  var json = [];
  var toSplit = str.split(',');
  for (var i = 0; i < toSplit.length; i++) {
    json.push(toSplit[i]);
  }

  return json;
}

function JsonToCommaString(json) {
  var str = json
    .map(function(val) {
      return val;
    })
    .join(',');
  return str;
}

export { CommaStringToJson, JsonToCommaString };
