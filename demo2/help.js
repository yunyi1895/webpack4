module.exports.getMode = function() {
  return process.env.NODE_ENV === 'development'?'development':'production'
};