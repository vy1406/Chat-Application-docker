//Capitalize first letter and lower case everything else
exports.capitalize = str => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
