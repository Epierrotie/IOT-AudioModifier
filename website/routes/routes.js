var Particle = require('particle-api-js');
var particle = new Particle();
let token = null;

module.exports = function(app) {

    // normal routes ===============================================================

        // show the home page (will also have our login links)
        app.get('/', function(req, res) {
            console.log("index get");
            if (token == null)
                res.render('index.ejs');
            else
                res.redirect('/player');
        });

        app.get('/login', function(req, res) {
            console.log("login get");
            if (token == null)
                res.render('login.ejs');
            else
                res.redirect('/player');
        });

        app.post('/login', function(req, res) {
            console.log("login post");
            particle.login({username: req.body['email'], password: req.body['password']}).then(
                function(data) {
                    token = data.body.access_token;
                    res.redirect('/player');
                },
                function (err) {
                    console.log('Could not log in.', err);
                    res.render('login.ejs');
                }
            );
        });

        app.get('/player', function(req, res) {
            console.log("player get");

            if (token == null)
                res.render('login.ejs');

            res.render('player.ejs', { token : token} );
        });

        app.get('*', function(req, res) {
            if (token == null)
                res.render('index.ejs');
            else
                res.redirect('/player');
        })
}