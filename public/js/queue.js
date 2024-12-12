// Assume user ID is stored in a global variable or obtained from the server
const user = document.querySelector("[user-id]");
const userId = user ? user.getAttribute("user-id") : null;
// Function to get the storage key for the current user
const getStorageKey = (key) => `${userId ? userId : "guest"}_${key}`;
// Initialize the queue from storage
const queueList = document.querySelector(".queue-list");

const attachEventListeners = (container) => {
    if (container === null) return;
    container.addEventListener("click", (event) => {
        // Xử lý sự kiện cho action-menu-toggle
        const actionToggle = event.target.closest("[action-menu-toggle]");
        if (actionToggle) {
            event.stopPropagation();
            const actionMenu = actionToggle.nextElementSibling;

            document.querySelectorAll(".action-menu.visible").forEach((menu) => {
                if (menu !== actionMenu) {
                    menu.classList.remove("visible");
                    menu.classList.add("hidden");
                }
            });

            actionMenu.classList.toggle("visible");
            actionMenu.classList.toggle("hidden");
        }

        // Xử lý sự kiện cho song-src
        const songImage = event.target.closest("[song-src]");
        if (songImage) {
            const songSrc = songImage.getAttribute("song-src");
            const songName = songImage.getAttribute("song-name");
            const songArtist = songImage.getAttribute("song-artist");
            const songCover = songImage.getAttribute("song-cover");

            aplayer.list.add([
                {
                    name: songName,
                    artist: songArtist,
                    url: songSrc,
                    cover: songCover,
                },
            ]);
            aplayer.list.switch(aplayer.list.audios.length - 1);
            aplayer.play();
        }
    });
};

export const setQueueFromStorage = () => {
    const queueArray = getFromStorage();
    if (queueArray && queueList) {
        queueList.innerHTML = "";
        queueArray.forEach((item) => {
            const songElement = renderSong(item);
            queueList.appendChild(songElement);
        });
    }
    attachEventListeners(queueList); // Đảm bảo sự kiện được thiết lập
};

const renderSong = (item) => {
    const newDiv = document.createElement("div");
    newDiv.classList.add("latest-release-entry2", "flex-space");

    newDiv.innerHTML = `
        <div class="latest-release-image2">
          <img src="${item.img}" song-src="${item.fileUrl}"
                song-name="${item.songName}"
                song-artist="${item.songArtist}"
                song-cover="${item.img}">
        </div>
        <div class="latest-release-info2">
          <p>
            <a href="#">
              <b>${item.songName}</b>
            </a>
          </p>
          <p class="latest-release-sub2">MAR 29, 2019</p>
        </div>
        <div class="action-icon">
          <i class="fa fa-ellipsis-h" action-menu-toggle aria-hidden="true"></i>
          <div class="action-menu hidden">
            <ul>
              <li><a href="/add-to-playlist/${item.songId}">Add to Playlist</a></li>
              <li><a data-path="/favorite-songs/favorite-song/${item.songId}" favorite-song-button>Save to your Favorite Songs</a></li>
              <li><a href="/add-to-queue/12345">Remove</a></li>
              <li><a href="/artist/${item.artistId}">Go to the artist detail</a></li>
            </ul>
          </div>
        </div>
      `;
    return newDiv;
};

const saveToStorage = (queueArr) => {
    const queueFromMapToArray = Array.from(queueArr.entries());
    if (userId) {
        localStorage.setItem(
            getStorageKey("queueArray"),
            JSON.stringify(queueFromMapToArray)
        );
    } else {
        sessionStorage.setItem(
            getStorageKey("queueArray"),
            JSON.stringify(queueFromMapToArray)
        );
    }
};

export const getFromStorage = () => {
    const queueArray = userId
        ? localStorage.getItem(getStorageKey("queueArray"))
        : sessionStorage.getItem(getStorageKey("queueArray"));
    if (queueArray) {
        const parsedArray = JSON.parse(queueArray);
        if (Array.isArray(parsedArray)) {
            return new Map(parsedArray.map((item) => [item[0], item[1]]));
        }
    }
    return new Map();
};

export const getCurrentAudio = (aplayer) => {
    if (aplayer.list.index !== -1 && aplayer.audio[aplayer.list.index]) {
        const currentAudio = aplayer.audio[aplayer.list.index];
        return {
            name: currentAudio.name,
            artist: currentAudio.artist,
            url: currentAudio.url,
            cover: currentAudio.cover,
        };
    }
    return null;
};

export const saveCurrentPlayback = (aplayer) => {
    const currentAudio = getCurrentAudio(aplayer);
    if (currentAudio) {
        const currentTime = aplayer.audio.currentTime;
        if (userId) {
            localStorage.setItem(
                getStorageKey("currentAudio"),
                JSON.stringify(currentAudio)
            );
            localStorage.setItem(getStorageKey("currentTime"), currentTime);
        } else {
            sessionStorage.setItem(
                getStorageKey("currentAudio"),
                JSON.stringify(currentAudio)
            );
            sessionStorage.setItem(getStorageKey("currentTime"), currentTime);
        }
    }
};

export const restorePlayback = () => {
    const currentAudio = JSON.parse(
        userId
            ? localStorage.getItem(getStorageKey("currentAudio"))
            : sessionStorage.getItem(getStorageKey("currentAudio"))
    );
    const currentTime = userId
        ? localStorage.getItem(getStorageKey("currentTime"))
        : sessionStorage.getItem(getStorageKey("currentTime"));

    if (currentAudio && currentTime !== null) {
        aplayer.list.add([currentAudio]);
        aplayer.list.switch(aplayer.list.audios.length - 1);
        aplayer.audio.currentTime = currentTime;
        aplayer.play();
    }
};

const playNextSong = () => {
    if (queueArray.size > 0) {
        const nextSong = queueArray.values().next().value;
        aplayer.list.add([
            {
                name: nextSong.songName,
                artist: nextSong.songArtist,
                url: nextSong.fileUrl,
                cover: nextSong.img,
            },
        ]);
        aplayer.list.switch(aplayer.list.audios.length - 1);
        aplayer.play();

        // Remove the song from the queue
        queueArray.delete(nextSong.fileUrl);
        saveToStorage(queueArray);
        setQueueFromStorage();
    } else {
        aplayer.pause();
    }
};

export const addToQueue = (queueArray) => {
    const addToQueueButton = document.querySelectorAll("[queue-button]");
    if (addToQueueButton) {
        addToQueueButton.forEach((button) => {
            button.addEventListener("click", () => {
                const img = button.getAttribute("src-img-data");
                const fileUrl = button.getAttribute("song-src-data");
                const songName = button.getAttribute("song-name-data");
                const songArtist = button.getAttribute("song-artist-data");
                const songId = button.getAttribute("song-id");
                const artistId = button.getAttribute("artist-id");

                queueArray.set(fileUrl, {
                    img,
                    fileUrl,
                    songName,
                    songArtist,
                    songId,
                    artistId,
                });

                saveToStorage(queueArray);
                setQueueFromStorage();
                // shouldPlayNextSong = true;
            });
        });
    }
}