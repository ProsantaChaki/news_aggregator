
function isDefined(object, property = null) {
  if (property === null) {
    return typeof object !== 'undefined';
  }

  return (
    typeof object !== 'undefined' &&
    object &&
    typeof object[property] !== 'undefined'
  );
}

function timeConversion(time) {
  return time;
}

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function random32BitInteger(max = 2147483647) {
  return Math.floor(Math.random() * Math.floor(max));
}

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function durationString(sec, isNumeric) {
  return isNumeric
    ? `${Math.floor(sec / 60)}:${Math.ceil(sec % 60)}`
    : `${Math.floor(sec / 60 / 60)} hr ${Math.floor((sec / 60) % 60)} mins ${
        sec % 60
      } sec`;
}

function millisecondConvert(millisecond) {
  const d = new Date(millisecond);
  return d.toLocaleString();
}

function millisecondsDifference(date1, date2) {
  const one_day = 1000 * 60 * 60 * 24;
  const difference_ms = date1 - date2;
  const result = Math.round(difference_ms / one_day);
  if (isNaN(result)) {
    return '0';
  } else {
    return result;
  }
}

function checkIsExpired(date) {
  const currentTime = Date.now();
  return date <= currentTime;
}

function jsonConvert(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function syntaxHighlightJson(json) {
  if (typeof json !== 'string') {
    json = JSON.stringify(json, undefined, 2);
  }
  json = json
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  return json.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
    function (match) {
      var cls = 'number';
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = 'key';
        } else {
          cls = 'string';
        }
      } else if (/true|false/.test(match)) {
        cls = 'boolean';
      } else if (/null/.test(match)) {
        cls = 'null';
      }
      return '<span class="' + cls + '">' + match + '</span>';
    },
  );
}

export {
  isDefined,
  uuidv4,
  random32BitInteger,
  millisecondConvert,
  millisecondsDifference,
  checkIsExpired,
  durationString,
  syntaxHighlightJson,
  jsonConvert,
};
