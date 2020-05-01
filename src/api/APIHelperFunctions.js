export default function GetData(parent, child, placeHolder = '', suffix, decimalPlace) {
  var data = placeHolder;

  if (parent != null && parent[child] != null) {
    data = parent[child];

    if (decimalPlace != null) {
      data = data.toFixed(decimalPlace);
    }
  } else {
    data = '';
  }

  if (suffix != null) {
    data += suffix;
  }

  return data;
}
