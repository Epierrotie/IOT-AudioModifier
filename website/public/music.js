let particle = new Particle();
let token = document.getElementById('tokenHere').value;
let i = 0
let title = ['Skyrim Theme', 'Luv resval', 'Halo Theme']

var sound = [
    new Howl({
        src: ['SkyrimTheme.mp3'],
        volume: 0.5,
        onend: function() {
            i = 1
            onMusicChange()

        }
    }),
    new Howl({
        src: ['luv.mp3'],
        volume: 0.5,
        onend: function() {
            i = 2
            onMusicChange()
        }
    }),
    new Howl({
        src: ['HaloTheme.mp3'],
        volume: 0.5,
        onend: function() {
            i = 0
            onMusicChange()
        }
    }),
];


sound[0].play();

particle.getEventStream({ name: 'sendData', auth: token}).then(function(stream) {
    stream.on('event', function(data) {
        let tmp = data["data"].split(':');


        x = normalize(tmp[0], -1, 1)
        sound[i].volume(x);
        y = normalize(tmp[1], -1, 1) + 0.5;
        sound[i].rate(y);
        z = tmp[2];

        console.log("Event: ", x, y, z);
    });
});

function onMusicChange() {
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