let particle = new Particle();
let token = document.getElementById('tokenHere').value;
let i = 0
let title = ['Skyrim Theme', 'Haddaway - What is love', 'Diggy diggy hole', 'Pizza kid - We like pizza']

var sound = [
    new Howl({
        src: ['SkyrimTheme.mp3'],
        volume: 0.5,
        onend: function() {
            onMusicChange()
        }
    }),
    new Howl({
        src: ['luv.mp3'],
        volume: 0.5,
        onend: function() {
            onMusicChange()
        }
    }),
    new Howl({
        src: ['Diggy.mp3'],
        volume: 0.5,
        onend: function() {
            onMusicChange()
        }
    }),
    new Howl({
        src: ['pizza.mp3'],
        volume: 0.5,
        onend: function() {
            onMusicChange()
        }
    }),
];


sound[0].play();

particle.getEventStream({ name: 'sendData', auth: token}).then(function(stream) {
    stream.on('event', function(data) {
        if (data["data"] == 'stop') {
            sound[i].stop();
            onMusicChange();
        } else {
            let tmp = data["data"].split(':');

            x = normalize(tmp[0], -1, 1)
            sound[i].volume(x);
            y = normalize(tmp[1], -1, 1) + 0.5;
            sound[i].rate(y);
            z = tmp[2];

            console.log("Event: ", x, y, z);
        }
    });
});

function onMusicChange() {
    if (i == 3)
        i = 0;
    else
        i += 1;
    console.log(title[i], ' Finished!');
    sound[i].play();
    let fnPr = particle.callFunction({ deviceId: '510047001851353530333932', name: 'twitterPost', argument: title[i], auth: token });

    fnPr.then(
        function(data) {
            console.log('Function called succesfully:', data);
        }, function(err) {
            console.log('An error occurred:', err);
        });
}

function normalize(x, min, max) {
    first = x - min;
    second = max - min;

    return (first/second);
}