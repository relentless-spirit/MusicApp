//Aplayer
document.addEventListener("DOMContentLoaded", function () {
    const aplayer = new APlayer({
        container: document.getElementById('aplayer'),
        audio: [
            {
                name: 'Photograph',
                artist: 'Ed Sheeran',
                url: 'https://backend.daca.vn/assets/audios/cat-doi-noi-sau.mp3',
                cover: 'src/song_pic1.jpg',
            }
        ]
    });
    aplayer.play();
});

//End aplayer