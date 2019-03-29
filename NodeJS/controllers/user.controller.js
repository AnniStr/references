// Leah
const mongoose = require('mongoose');
const passport = require('passport');
const _ = require ('lodash');

const User = mongoose.model('User');

//Neuer Benutzer wird erstellt, wenn keine Errors auftauchen.
module.exports.register = (req, res, next) => {
    var user = new User();
    user.username = req.body.username;
    user.email = req.body.email;
    user.password = req.body.password;
    user.save((err, doc) => {
      if (!err)
        res.send(doc);
      else {
        if (err.code == 11000)
          res.status(422).send(['Duplicate email adrress found.']);
        else
          return next(err);
      }
    });
}

// Authentifizierung von Passwort 
module.exports.authenticate = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => { //'local' = Passport-Strategie
  if(err) // Error von passport middleware
    return res.status(400).json(err);
  else if(user) { // Wenn die Authentifizierung erfolgreich ist wir ein jwt Token zurückgegeben 
    return res.status(200).json({"token": user.generateJwt()});
  }   
  else // ungültiger Benutzer oder Passwort
    return res.status(404).json(info);  
  })(req, res);
}

// Gibt das Benutzerprofil zurück
module.exports.userProfile = (req, res, next) => {
  User.findOne({ _id: req._id},
    (err, user) => {
      if(!user)
        return res.status(404).json({status: false, message: 'User record not found'});
      else 
        return res.status(200).json({ status: true, user : _.pick(user,['username', 'email'])}); //lodash um  nur username und email von user auszuwählen   
    }
  );
}