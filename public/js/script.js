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

//Favorite-Song
const favoriteSongButtons = document.querySelectorAll("[favorite-song-button]");
if (favoriteSongButtons.length > 0) {
  favoriteSongButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const path = button.getAttribute("data-path");
      try {
        const response = await fetch(path, {
          headers: {
            "Content-Type": "application/json",
          },
          method: "PATCH",
        });
        const data = await response.json();
        if (data.code === "success") {
          if (button) {
            button.classList.add("filled");
          }
        } else if (data.code === "remove") {
          if (button) {
            button.classList.remove("filled");
          }
        }
      } catch (error) {
        console.error("Error adding to favorite songs:", error);
      }
    });
  });
}
//End Favorite-Song

//playlist play all button //
const playAllButton = document.querySelector(".playAllButton");
if (playAllButton) {
  playAllButton.addEventListener("click", () => {
    const songImage = document.querySelectorAll("[song-src]");
    const songs = [];
    if (songImage.length > 0) {
      songImage.forEach((song) => {
        const songSrc = song.getAttribute("song-src");
        const songName = song.getAttribute("song-name");
        const songArtist = song.getAttribute("song-artist");
        const songCover = song.getAttribute("song-cover");
        songs.push({
          name: songName,
          artist: songArtist,
          url: songSrc,
          cover: songCover,
        });
      });
    }
    const aaplayer = new APlayer({
      container: document.getElementById("aplayer"),
      audio: songs,
      autoplay: true,
    });
  });
}
//end play playlist play all button //
