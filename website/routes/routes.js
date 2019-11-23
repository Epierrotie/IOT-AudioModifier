var Particle = require('particle-api-js');
var particle = new Particle();
let token;

module.exports = function(app) {

    // normal routes ===============================================================

        // show the home page (will also have our login links)
        app.get('/', function(req, res) {
            console.log("index get");
            res.render('index.ejs');
        });

        app.get('/login', function(req, res) {
            console.log("login get");
            res.render('login.ejs');
        });

        app.post('/login', function(req, res) {
            console.log("login post");
            particle.login({username: req.body['email'], password: req.body['password']}).then(
                function(data) {
                    token = data.body.access_token;
                    res.render('player.ejs');
                },
                function (err) {
                    console.log('Could not log in.', err);
                    res.render('login.ejs');
                }
            );
        });

        app.post('/lightItUp', function(req, res) {
            var fnPr = particle.callFunction({ deviceId: '510047001851353530333932', name: 'lightItUp', argument: '', auth: token });

            fnPr.then(
            function(data) {
                console.log('Function called succesfully:', data);
            }, function(err) {
                console.log('An error occurred:', err);
            });

            res.render('player.ejs');
        });
}