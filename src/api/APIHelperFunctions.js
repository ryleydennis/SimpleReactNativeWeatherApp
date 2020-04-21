function GetData(parent, child, suffix, decimalPlace) {
    var data = ""

    if (parent != null && parent[child] != null) {
        data = parent[child];

        if (decimalPlace != null) {
            data = data.toFixed(decimalPlace);
        }
    } else {
        data = ''
    }

    if (suffix != null) {
        data = data + suffix;
    }

    return data
}

export { GetData }