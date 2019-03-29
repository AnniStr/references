// Leah 
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

var User = mongoose.model('User');

// Hier wird geprüft ob die gegebene Daten existieren und richtig sind
passport.use(
  new localStrategy({usernameField: 'email'}, 
    (username, password, done) => {
      User.findOne({email: username}, (err, user) => { // gibt es den Benutzer, wird das eingetragene Passwort gespeichert (in password)
        if(err) // Eingabe ist ungültig
          return done(err); 
        else if(!user) // Der Benutzer wurde nicht gefunden 
          return done(null, false, {message: 'Kein Nutzer unter dieser Email registeriert.'});
        else if (!user.verifyPassword(password)) // Das Passort wurde falsch eingeben
          return done(null, false, { message: 'Falsches Passwort wurde eingegeben.'});    
        else 
          return done(null, user);    
      });
    }
  )
);