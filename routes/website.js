// routes/website.js

module.exports = function(app, passport){
    app.get('/', function(req, res){
        res.render('index.ejs');
    });

    app.get('/church', function(req, res){
        res.render('church.ejs');
    });

    app.get('/member', function(req, res){
        res.render('member.ejs');
    });

    app.get('/profile', isLoggedIn, function(req, res){
        res.render('profile.ejs', {
            user: req.user // get user out of session and pass to template
        });
    });

    // Signup ==============================
    app.get('/signup', function(req, res){
        res.render('signup.ejs', {message: req.flash('signupMessage')} );
    });

    //process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    }));

    // Login ===============================
    app.get('/login', function(req, res){
        res.render('login.ejs', {message: req.flash('loginMessage')});
    });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    }));

    app.get('/logout', function(req, res){
        req.logout();
        res.redirect('/');
    });


}

// route middleware to make sure user is logged in.
function isLoggedIn(req, res, next){
    //if user is logged in the session, carry on
    if(req.isAuthenticated()){
        return next();
    }

    res.redirect('/');
}
