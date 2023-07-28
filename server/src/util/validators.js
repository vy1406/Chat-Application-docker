//export const RegexName = /^([a-zA-Zא-ת]){5,10}$/;
 const RegexName = /^(?:[\u0590-\u05FF\s]|[\w\s]){5,10}$/;

module.exports = {
  RegexName: RegexName
};