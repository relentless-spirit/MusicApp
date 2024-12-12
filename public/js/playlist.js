export const playAllButton = (aplayer) => {
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
            aplayer.list.clear();
            aplayer.list.add(songs);
            aplayer.list.switch(0);
            aplayer.play();
        });
    }
}

export const createPlaylistButton = () => {
    const createPlaylistButtons = document.querySelectorAll("[create-playlist]");
    if (createPlaylistButtons.length > 0) {
        createPlaylistButtons.forEach((button) => {
            button.addEventListener("click", async () => {
                const id = button.getAttribute("data-song");
                const title = button.getAttribute("data-title");
                const coverImage = button.getAttribute("data-coverImage");
                const path = button.getAttribute("data-path");
                const data = {
                    title: title,
                    songs: id,
                    coverImage: coverImage
                };
                await fetch(
                    path, {
                    headers: {
                        "Content-type": "application/json"
                    },
                    method: "POST",
                    body: JSON.stringify(data),
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.code == "unsuccess") {
                            location.href = `${location.origin}/auth/login`;
                        }
                    })
            });
        });
    }
}

export const addPlaylistButton = () => {
    const addPlaylistButtons = document.querySelectorAll("[add-playlist]");
    if (addPlaylistButtons.length > 0) {
        addPlaylistButtons.forEach((button) => {
            button.addEventListener("click", async () => {
                const song = button.getAttribute("data-song");
                const playlist = button.getAttribute("data-playlist");
                const path = button.getAttribute("data-path");
                const data = {
                    song: song,
                    playlist: playlist,
                };
                await fetch(path, {
                    headers: {
                        "Content-type": "application/json",
                    },
                    method: "PATCH",
                    body: JSON.stringify(data),
                });
            });
        });
    }
}
