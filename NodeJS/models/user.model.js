// Leah
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Schema für jeden einzelnen User 
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: 'User can not be empty.'
  },
  email: {
    type: String,
    required: 'Email can not be empty',
    unique: true
  },
  password: {
    type: String,
    required: 'Password can not be empty',
    minlength : [6,'Password has to have at least 6 characters']
  },
  saltSecret: String
});

// Email wird mit regulärem Ausdruck verglichen
userSchema.path('email').validate((val) => {
  emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
  return emailRegex.test(val);
}, 'Ungültige Email.');

// Vor dem speichern des neuen Benutzers in der Datenbank, wird das Passwort
// gehashed und ein saltwert wird angehängt. 
userSchema.pre('save', function (next) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(this.password, salt, (err, hash) => {
      this.password = hash;
      this.saltSecret = salt;
      next();
    });
  });
});

// Das übergebene Passwort wird durch die Funktion compareSync
// mit dem verschlüsselten Passwort verglichen 
userSchema.methods.verifyPassword = function (password) {
  return bcrypt.compareSync(password, this.password); // Klartext Passwort / codiertes Passwort 
};


// generiert JSON Web Tocken mit User ID
userSchema.methods.generateJwt = function () {
  return jwt.sign({ _id: this._id}, // User Id wird für die Payload übergeben
    process.env.JWT_SECRET,       // Verschlüsslung (Wert in config.json)
    {
    expiresIn: process.env.JWT_EXP 
  });
}

module.exports = mongoose.model('User', userSchema);