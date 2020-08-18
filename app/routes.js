module.exports = function(app, passport) {

// normal routes ===============================================================

    // show the home page (will also have our login links)
    app.get('/', function(req, res) {
        res.render('pages/index.ejs');
    });

    // PROFILE SECTION =========================
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('pages/profile.ejs')
    });

    app.get('/main', function(req,res) {
        res.render('pages/main.ejs')
    });

    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('/chat', function(req,res) {
        res.render('pages/chat.ejs');
    });

    app.get('/user/current', function(req,res) {
        if(req.isAuthenticated()) {
            res.json(req.user);
        } else
        {
            res.json({"_id":-1});
        }
    });


// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // locally --------------------------------
        // LOGIN ===============================
        // show the login form
        app.get('/login', function(req, res) {
            res.render('pages/login.ejs', { message: req.flash('loginMessage') });
        });

        app.post('/login', function(req, res, next) {
            passport.authenticate('local-login', function(err, user, info) {
                if (err) { res.json(err); }
                if (!user) { return res.json(info); }
                req.logIn(user, function(err) {
                    if (err) { res.json(err); }
                    return res.json(user);
                });
            })(req, res, next);
        });


        // SIGNUP =================================
        // show the signup form
        app.get('/signup', function(req, res) {
            res.render('pages/signup.ejs', { message: req.flash('signupMessage') });
        });

        app.post('/signup', function(req, res, next) {
            passport.authenticate('local-signup', function(err, user, info) {
                if (err) { res.json(err); }
                if (!user) { return res.json(info); }
                req.logIn(user, function(err) {
                    if (err) { res.json(err); }
                    return res.json(user);
                });
            })(req, res, next);
        });

        // process the signup form
        //app.post('/signup', passport.authenticate('local-signup', {
        //    successRedirect : '/profile', // redirect to the secure profile section
        //    failureRedirect : '/signup', // redirect back to the signup page if there is an error
        //    failureFlash : true // allow flash messages
        //}));


// =============================================================================
// AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
// =============================================================================

    // locally --------------------------------
        app.get('/connect/local', function(req, res) {
            res.render('pages/connect-local.ejs', { message: req.flash('loginMessage') });
        });

        app.post('/connect/local', passport.authenticate('local-signup', function(err,req,res){
            if(err)
                res.json(err);
            res.json(req.user);
        }));
            //successRedirect : '/profile', // redirect to the secure profile section
            //failureRedirect : '/connect/local', // redirect back to the signup page if there is an error
            //failureFlash : true // allow flash messages
        //}));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
