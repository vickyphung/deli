const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  // checks to see if there is a token present in EITHER an Authorization header OR a query parameter
  let token = req.get('Authorization') || req.query.token;
  // if there is a token present in either location
  if (token) {
    // replaces the word Bearer with an empty string to isolate just the token
    token = token.replace('Bearer ', '');
    // verifies that the token is valid via the secret stored in the .env file
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      // sets a property on the request object of 'user' to null if there is an error, or the decoded user's info if there was no error
      req.user = err ? null : decoded.user;
      // sets a property on the request object of 'exp' or expiration to null if there is an error, or converts the given expiration date to a new Date object to be used later.
      req.exp = err ? null : new Date(decoded.exp * 1000)
      // moves on to the next bit of code, usually to check the routes.
      return next();
    })
  } else {
    // if no token was found, sets a property on the request object called 'user' to null, because there is no user.
    req.user = null;
    // moves on to the next bit of code, usually to check the routes.
    return next()
  }
}