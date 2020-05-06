function GetData(parent, child, placeHolder = '', suffix, decimalPlace) {
  var data = placeHolder;

  if (parent != null && parent[child] != null) {
    data = parent[child];

    if (decimalPlace != null) {
      data = data.toFixed(decimalPlace);
    }
  }

  if (suffix != null) {
    data += suffix;
  }

  return data;
}

function GetIcon(icon) {
  if (icon === '') {
    return '';
  }
  return `https://openweathermap.org/img/wn/${icon}@2x.png`;
}

export { GetData, GetIcon };
