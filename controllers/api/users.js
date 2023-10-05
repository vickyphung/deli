const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

function createJWT(user) {
  return jwt.sign(
    { user },
    process.env.SECRET,
    { expiresIn: '24h' }
  );
}

async function create(req, res) {
  try {
    await User.create(req.body)
      .then(user => {
        const token = createJWT(user);

        res.status(200).json(token)
      })
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
}

async function login(req, res) {
  // we need the try catch block here so that if there is an error anywhere in our function, the program keeps going instead of crashing!
  try {
    // ------------------
    // This is a findOne for a single user matching the email that was input into the login form
    User.findOne({ email: req.body.email })
      // ------------------
      // after the findOne completes, we do this next bit
      .then(foundUser => {
        // ------------------
        // important thing to note is that findOne will not error if no user is found, instead it just sets foundUser to undefined. therefore, we have to check if a user was found.
        if (foundUser) {
          // ------------------
          // if a user was found, we then need to compare the password they entered in the login form with the password stored in the database. We do not have to input the salt becuase the hash in the database also contains a key used to rehash a new password for comparison.
          bcrypt.compare(req.body.password, foundUser.password, (error, result) => {
            // ------------------
            // if there was an error in the compare, this runs
            if (error) {
              console.log(error);
              res.status(400).json(error);
              // ------------------
              // if there was no error, this runs (important: the password being wrong does not count as an error!)
            } else {
              // ------------------
              // if the passwords match
              if (result === true) {
                // ------------------
                // create a token using the info that we found initially
                const token = createJWT(foundUser);
                // ------------------
                // sends back a status code of 200 (ok) as well as the token that we just created
                res.status(200).json(token);
                // ------------------
                // if the passwords do not match
              } else {
                // ------------------
                // sends back a status code of 403(invalid password) as well as a message stating why
                res.status(403).json({ error: 'Invalid password!' })
              }
            }
          })
          // if a user was not found matching the email provided
        } else {
          // ------------------
          // sends back a 404 error code which means no user was found
          res.status(404).json({ error: 'User not found' });
        }
      });
    // ------------------
    // if any program-breaking error happens inside of the try block, this code runs here and the program continues as normal.
  } catch (error) {
    res.status(400).json({ error });
  }
}

function checkToken(req, res) {
  console.log('req.user', req.user);
  res.status(200).json(req.exp);
}

module.exports = {
  create,
  login,
  checkToken
}