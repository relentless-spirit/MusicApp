document.addEventListener("DOMContentLoaded", () => {
  // Assume user ID is stored in a global variable or obtained from the server
  const user = document.querySelector("[user-id]");
  const userId = user ? user.getAttribute("user-id") : null;

  // Function to get the storage key for the current user
  const getStorageKey = (key) => `${userId ? userId : "guest"}_${key}`;

  // Utility functions
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

  const getFromStorage = () => {
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

  const getCurrentAudio = () => {
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

  const saveCurrentPlayback = () => {
    const currentAudio = getCurrentAudio();
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

  const restorePlayback = () => {
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

  const attachEventListeners = (element) => {
    const songImage = element.querySelector("[song-src]");
    if (songImage) {
      songImage.addEventListener("click", () => {
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
      });
    }

    const actionToggle = element.querySelector("[action-menu-toggle]");
    if (actionToggle) {
      actionToggle.addEventListener("click", (event) => {
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
      });
    }
  };

  const renderSong = (item) => {
    const newDiv = document.createElement("div");
    newDiv.classList.add("latest-release-entry2", "flex-space");

    const imgDiv = `
      <div class="latest-release-image2">
        <img src="${item.img}" song-src="${item.fileUrl}"
              song-name="${item.songName}"
              song-artist="${item.songArtist}"
              song-cover="${item.img}">
      </div>
    `;

    const infoDiv = `
      <div class="latest-release-info2">
        <p>
          <a href="#">
            <b>${item.songName}</b>
          </a>
        </p>
        <p class="latest-release-sub2">MAR 29, 2019</p>
      </div>
    `;

    const actionDiv = `
      <div class="action-icon">
        <i class="fa fa-ellipsis-h " action-menu-toggle="action-menu-toggle" aria-hidden="true" ></i>
        <div class="action-menu hidden">
          <ul>
            <li>
              <a href="/add-to-playlist/${item.songId}">Add to Playlist</a>
            </li>
            <li>
              <a data-path="/favorite-songs/favorite-song/${item.songId}" favorite-song-button>Save to your Favorite Songs</a>
            </li>
            <li>
              <a href="/add-to-queue/12345">Remove</a>
            </li>
            <li>
              <a href="/artist/${item.artistId}">Go to the artist detail</a>
            </li>
          </ul>
        </div>
      </div>
    `;

    newDiv.innerHTML = imgDiv + infoDiv + actionDiv;
    attachEventListeners(newDiv);
    return newDiv;
  };

  const setQueueFromStorage = () => {
    const queueArray = getFromStorage();
    if (queueArray && queueList) {
      queueList.innerHTML = "";
      queueArray.forEach((item) => {
        const songElement = renderSong(item);
        queueList.appendChild(songElement);
        attachEventListeners(songElement);
      });
    }
  };

  // Initialize the queue from storage
  const queueList = document.querySelector(".queue-list");
  const queueArray = getFromStorage() || new Map();
  setQueueFromStorage();

  // Initialize APlayer
  const aplayer = new APlayer({
    container: document.getElementById("aplayer"),
    audio: [],
    autoplay: true,
    listFolded: true,
    listMaxHeight: 90,
  });

  // Event listeners
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
        shouldPlayNextSong = true;
      });
    });
  }

  const songImage = document.querySelectorAll("[song-src]");
  if (songImage.length > 0) {
    songImage.forEach((song) => {
      song.addEventListener("click", () => {
        const songSrc = song.getAttribute("song-src");
        const songName = song.getAttribute("song-name");
        const songArtist = song.getAttribute("song-artist");
        const songCover = song.getAttribute("song-cover");

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
      });
    });
  }

  aplayer.on("ended", () => {
    aplayer.list.remove(aplayer.list.index);
    playNextSong();
  });

  setInterval(saveCurrentPlayback, 1000);
  restorePlayback();

  const actionToggles = document.querySelectorAll("[action-menu-toggle]");
  actionToggles.forEach((toggle) => {
    toggle.addEventListener("click", (event) => {
      event.stopPropagation();
      const actionMenu = toggle.nextElementSibling;

      document.querySelectorAll(".action-menu.visible").forEach((menu) => {
        if (menu !== actionMenu) {
          menu.classList.remove("visible");
          menu.classList.add("hidden");
        }
      });

      actionMenu.classList.toggle("visible");
      actionMenu.classList.toggle("hidden");
    });
  });

  document.addEventListener("click", () => {
    document.querySelectorAll(".action-menu.visible").forEach((menu) => {
      menu.classList.remove("visible");
      menu.classList.add("hidden");
    });
  });

  const favoriteSongButtons = document.querySelectorAll(
    "[favorite-song-button]"
  );
  if (favoriteSongButtons.length > 0) {
    favoriteSongButtons.forEach((button) => {
      button.addEventListener("click", async () => {
        if (!userId) {
          alert("Please log in to save songs to your favorites.");
          return;
        }

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
              button.innerHTML = "Remove from your Favorited Songs";
            }
          } else if (data.code === "remove") {
            if (button) {
              button.innerHTML = "Save to your Favorited Songs";
            }
          }
        } catch (error) {
          console.error("Error adding to favorite songs:", error);
        }
      });
    });
  }

  // Playlist play all button
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

  // Loading page
  const loading = document.getElementById("loading");
  const spinner = document.querySelector(".spinner");
  setTimeout(() => {
    spinner.classList.add("stopped");
    loading.classList.add("hidden");
  }, 1500);

  // User menu click
  const userMenu = document.querySelector(".user-menu");
  const dropdownMenu = document.querySelector(".dropdown-menu");
  if (userMenu && dropdownMenu) {
    userMenu.addEventListener("click", (e) => {
      e.stopPropagation();
      dropdownMenu.classList.toggle("visible");
    });
    document.addEventListener("click", () => {
      dropdownMenu.classList.remove("visible");
    });
  }

  // Sidebar toggle
  const sidebar = document.querySelector(".sidebar");
  const toggleIconOpen = document.querySelector(".toggle-icon.open");
  const toggleIconClose = document.querySelector(".toggle-icon.close");
  const toggleSidebar = () => {
    const isVisible = sidebar.classList.toggle("visible");
    toggleIconOpen.classList.toggle("hidden", isVisible);
    toggleIconClose.classList.toggle("hidden", !isVisible);
  };
  document
    .querySelector(".toggle-sidebar")
    .addEventListener("click", toggleSidebar);

  // Follow button
  const followButton = document.querySelector("[button-follow]");
  if (followButton) {
    followButton.addEventListener("click", async () => {
      if (!userId) {
        alert("Please log in to follow.");
        return;
      }

      const path = followButton.getAttribute("data-path");
      await fetch(path, {
        headers: { "Content-type": "application/json" },
        method: "PATCH",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.code == "success") {
            followButton.innerHTML = "Followed";
          } else if (data.code == "remove") {
            followButton.innerHTML = "Follow";
          }
        });
    });
  }

  // Searching logic
  const searchBox = document.querySelector(".search-box");
  if (searchBox) {
    let currentUrl = new URL(location.origin);
    searchBox.addEventListener("submit", (event) => {
      event.preventDefault();
      const inputValue = searchBox.inputValue.value;
      if (inputValue) {
        currentUrl.searchParams.set("search", inputValue);
      } else {
        currentUrl.searchParams.delete("search");
      }
      location.href = currentUrl.href;
    });
    const inputValue = currentUrl.searchParams.get("search");
    if (inputValue) {
      searchBox.inputValue.value = inputValue;
    }

    // Suggestion searching using debounce
    const searchInput = searchBox.inputValue;
    const suggestionsDiv = document.getElementById("suggestions");
    let timeout = null;
    searchInput.addEventListener("input", () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        fetch(`/autocomplete?q=${searchInput.value}`)
          .then((res) => res.json())
          .then((data) => {
            suggestionsDiv.innerHTML = "";
            if (data.length > 0) {
              data.forEach((item) => {
                const suggestionItem = document.createElement("div");
                suggestionItem.classList.add("suggestion-item");
                suggestionItem.textContent = item.title;
                suggestionItem.addEventListener("click", () => {
                  searchInput.value = item.title;
                  suggestionsDiv.classList.add("hidden");
                });
                suggestionsDiv.appendChild(suggestionItem);
              });
              suggestionsDiv.classList.remove("hidden");
            } else {
              suggestionsDiv.classList.add("hidden");
            }
          });
      }, 300);
    });

    const searchIcon = document.getElementById("search-icon");
    if (searchIcon && searchInput) {
      searchIcon.addEventListener("click", () => {
        searchInput.focus();
      });
    }
  }

  // Follow artist button
  const followArtistButton = document.querySelector(".button-follow-artist");
  if (followArtistButton) {
    followArtistButton.addEventListener("click", async () => {
      if (!userId) {
        alert("Please log in to follow the artist.");
        return;
      }

      const path = followArtistButton.getAttribute("data-path");
      await fetch(path, {
        headers: { "Content-type": "application/json" },
        method: "PATCH",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.code == "add") {
            followArtistButton.innerHTML = "Following";
          } else if (data.code == "remove") {
            followArtistButton.innerHTML = "Follow";
          }
        });
    });
  }

  // Logout button
  const logoutButton = document.querySelector(".logoutButton");
  if (logoutButton) {
    logoutButton.addEventListener("click", async () => {
      const path = logoutButton.getAttribute("data-path");
      await fetch(path, {
        headers: { "Content-type": "application/json" },
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.code == 200) {
            location.reload();
          }
        });
    });
  }
});

//Ending Searching Logic
const logoutButton = document.querySelector(".logoutButton");
console.log(logoutButton);

if (logoutButton) {
  logoutButton.addEventListener("click", async () => {
    const path = logoutButton.getAttribute("data-path");
    await fetch(path, {
      headers: { "Content-type": "application/json" },
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code == 200) {
          location.reload();
        }
      });
  });
}

//Show dropdown playlist
const addToPlaylistButtons = document.querySelectorAll("[add-to-playlist-button]");
if (addToPlaylistButtons.length > 0) {
  addToPlaylistButtons.forEach((button) => {
    button.addEventListener("mouseover", (event) => {
      const id = button.getAttribute("data-id");
      const addPlaylistDropdown = document.querySelector(`.dropdown-menu-playlist[data-id="${id}"]`);
      if (addPlaylistDropdown) {
        addPlaylistDropdown.classList.add("show");
        addPlaylistDropdown.addEventListener("mouseleave", (event) => {
          addPlaylistDropdown.classList.remove("show");
        }, { once: true });
      }
      event.stopPropagation();
    });
  });
}
//End show dropdown playlist

//Create new playlist
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
      // .then(res => res.json())
      // .then(data => {
      //   if (data.code == "success") {

      //   }
      // })
    });
  });
}
//End create new playlist

//Add playlist
const addPlaylistButtons = document.querySelectorAll("[add-playlist]");
if (addPlaylistButtons.length > 0) {
  addPlaylistButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const song = button.getAttribute("data-song");
      const playlist = button.getAttribute("data-playlist");
      const path = button.getAttribute("data-path");
      const data = {
        song: song,
        playlist: playlist
      };
      await fetch(path, {
        headers: {
          "Content-type": "application/json"
        },
        method: "PATCH",
        body: JSON.stringify(data),
      });
    })
  });
}
//End add playlist
