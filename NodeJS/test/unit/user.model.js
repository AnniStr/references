const expect = require('chai').expect;
const User = require('../../models/user.model');

describe('UserModal Schema', function() {
    it('checks if username exists', function(done) {
        var newUser = new User(
            {
                username: 'Max',
                email: 'max@email.de',
                password: '123456'
            }
        );

        newUser.validate(function() {
            expect(newUser.username).to.exist;
            done();
        });
    });

    it('checks if email exists', function(done) {
        var newUser = new User(
            {
                username: 'max',
                email: 'max@email.de',
                password: '123456'
            }
        );

        newUser.validate(function() {
            expect(newUser.email).to.exist;
            done();
        });
    });

    it('checks if password exists', function(done) {
        var newUser = new User(
            {
                username: 'Max',
                email: 'max@email.de',
                password: '123456'
            }
        );

        newUser.validate(function() {
            expect(newUser.password).to.exist;
            done();
        });
    });

    it('should be invalid if username is empty', function(done) {
        var newUser = new User(
            {
                username: '',
                email: 'max@email.de',
                password: '123456'
            }
        );

        newUser.validate(function(err) {
            expect(err.errors.username).to.exist;
            done();
        });
    });

    it('should be invalid if email is empty', function(done) {
        var newUser = new User(
            {
                username: 'MAx',
                email: '',
                password: '123456'
            }
        );

        newUser.validate(function(err) {
            expect(err.errors.email).to.exist;
            done();
        });
    });

    it('should be invalid if username is empty', function(done) {
        var newUser = new User(
            {
                username: 'MAx',
                email: 'max@email.de',
                password: ''
            }
        );

        newUser.validate(function(err) {
            expect(err.errors.password).to.exist;
            done();
        });
    });

    it('should fail with a bad email', function(done) {
        var newUser = new User(
            {
                username: 'Max',
                email: 'max',
                password: '123456'
            }
        );

        newUser.validate(function(err) {
            expect(err.errors.email).to.exist;
            done();
        });
    });

    it('password should have a minlength', function(done) {
        var newUser = new User(
            {
                username: 'Max',
                email: 'max',
                password: '1236333'
            }
        );

        newUser.validate(function() {
            expect(newUser.password).to.have.length.above(6);
            done();
        });
    });
});
