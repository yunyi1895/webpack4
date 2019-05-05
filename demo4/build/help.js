var path = require('path');
module.exports.getMode = function() {
  return process.env.NODE_ENV === 'development'?'development':'production'
};
module.exports.resolve = function(p){
  return path.resolve(process.cwd(),p);
}