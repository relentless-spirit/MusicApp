//Aplayer
document.addEventListener("DOMContentLoaded", function () {
  const aplayer = new APlayer({
    container: document.getElementById("aplayer"),
    audio: [
      {
        name: "Qua Từng Khung Hình",
        artist: "Hustlang Robber & Ngắn",
        url: "../songs/QUA TỪNG KHUNG HÌNH (Feat. Robber, Ngắn) - RAP VIỆT (youtube).mp3",
        cover:
          "https://lh3.googleusercontent.com/F2ywvCxiucFEM2CwP_6-3rYeoSUIhKPZO9rpMsKz8W3wDYE5SILCU7b9crM9GqwjmIy8TZtOPDqOJx1T=w60-h60-l90-rj",
      },
    ],
  });
  aplayer.play();
});

//End aplayer

//Select song to play
const songImage = document.querySelectorAll("[song-src]");
if (songImage.length > 0) {
  songImage.forEach((song) => {
    song.addEventListener("click", () => {
      const songSrc = song.getAttribute("song-src");
      const songName = song.getAttribute("song-name");
      const songArtist = song.getAttribute("song-artist");
      const songCover = song.getAttribute("song-cover");

      const aplayer = new APlayer({
        container: document.getElementById("aplayer"),
        audio: [
          {
            name: songName,
            artist: songArtist,
            url: songSrc,
            cover: songCover,
          },
        ],
      });
      aplayer.play();
    });
  });
}
//End select song to play
