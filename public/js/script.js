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
    const aplayer = new APlayer({
      container: document.getElementById("aplayer"),
      audio: songs,
      autoplay: true,
    });
  });
}
//end play playlist play all button //

//loading page
document.addEventListener("DOMContentLoaded", () => {
  const loading = document.getElementById("loading");
  const spinner = document.querySelector(".spinner");

  // Giả lập tải trang (nếu cần)
  setTimeout(() => {
    // Ngừng quay và thu nhỏ spinner
    spinner.classList.add("stopped");

    // Ẩn overlay
    loading.classList.add("hidden");
  }, 1500); // Tùy chỉnh thời gian tải giả lập (2 giây)
});

//end loading  page
//click menu user
document.addEventListener("DOMContentLoaded", function () {
  const userMenu = document.querySelector(".user-menu");
  const dropdownMenu = document.querySelector(".dropdown-menu");

  userMenu.addEventListener("click", function (e) {
    e.stopPropagation(); // Ngăn chặn sự kiện click lan truyền lên document
    dropdownMenu.classList.toggle("visible"); // Toggle menu
  });

  // Đóng menu nếu click bên ngoài
  document.addEventListener("click", function () {
    dropdownMenu.classList.remove("visible");
  });
});

//edn click menu user

//sidebar
document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.querySelector(".sidebar");
  const toggleIconOpen = document.querySelector(".toggle-icon.open");
  const toggleIconClose = document.querySelector(".toggle-icon.close");

  // Xử lý toggle
  const toggleSidebar = () => {
    const isVisible = sidebar.classList.toggle("visible");
    toggleIconOpen.classList.toggle("hidden", isVisible);
    toggleIconClose.classList.toggle("hidden", !isVisible);
  };

  // Thêm sự kiện click cho nút toggle
  document
    .querySelector(".toggle-sidebar")
    .addEventListener("click", toggleSidebar);
});
//end sidebar

//Button Follow
const followButton = document.querySelector("[button-follow]");
if (followButton) {
  followButton.addEventListener("click", async () => {
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
//End button Follow

//Searching Logic
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
  //suggestion searching/ using debounce
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
}
// Hide suggestions when clicking outside
document.addEventListener("click", (event) => {
  if (
    !searchInput.contains(event.target) &&
    !suggestionsDiv.contains(event.target)
  ) {
    suggestionsDiv.classList.add("hidden");
  }
});
//Ending Searching Logic

//Follow-artist
const followArtistButton = document.querySelector(".button-follow-artist");
if (followArtistButton) {
  followArtistButton.addEventListener("click", async () => {
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
//End follow-artist

document.addEventListener("DOMContentLoaded", function () {
  const searchIcon = document.getElementById("search-icon");
  const searchInput = document.getElementById("search-input");

  if (searchIcon && searchInput) {
    searchIcon.addEventListener("click", function () {
      searchInput.focus();
    });
  }
});
//Ending Searching Logic
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

// ------------------------------------------------------------------------------------------------//
//Add to queue logic
const saveToLocalStorage = (queueArr) => {
  const queueFromMapToArray = Array.from(queueArr.entries());
  localStorage.setItem("queueArray", JSON.stringify(queueFromMapToArray));
};

const getFromLocalStorage = () => {
  const queueArray = localStorage.getItem("queueArray");
  if (queueArray) {
    const parsedArray = JSON.parse(queueArray);
    if (Array.isArray(parsedArray)) {
      return new Map(parsedArray.map((item) => [item[0], item[1]]));
    }
  }
  return new Map();
};

const queueList = document.querySelector(".queue-list");
const queueArray = getFromLocalStorage() || new Map();

// Function to render a song in the queue
const renderSong = (item) => {
  const newDiv = document.createElement("div");
  newDiv.classList.add("latest-release-entry2", "flex-space");

  const imgDiv = `
    <div class="latest-release-image2">
      <img src="${item.img}"  song-src="${item.fileUrl}"
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
  return newDiv;
};

// Load queue from localStorage
const setQueueFromLocalStorage = () => {
  const queueArray = getFromLocalStorage();
  if (queueArray) {
    queueList.innerHTML = ""; // Clear the list before rendering
    queueArray.forEach((item) => {
      const songElement = renderSong(item);
      queueList.appendChild(songElement);
    });
  }
};

// Add to queue logic
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

      // Add song to queue
      queueArray.set(fileUrl, {
        img,
        fileUrl,
        songName,
        songArtist,
        songId,
        artistId,
      });

      // Save to localStorage
      saveToLocalStorage(queueArray);

      // Re-render queue
      setQueueFromLocalStorage();
    });
  });
}

// Initialize the queue from localStorage
setQueueFromLocalStorage();

//End Add to queue logic

// ------------------------------------------------------------------------------------------------//

// ----------------------------------------------------------------------------------------------//
// Drop down menu for songs

const actionToggles = document.querySelectorAll("[action-menu-toggle]");
actionToggles.forEach((toggle) => {
  toggle.addEventListener("click", (event) => {
    event.stopPropagation(); // Prevent triggering the document click event
    const actionMenu = toggle.nextElementSibling;

    // Close all open menus except the clicked one
    document.querySelectorAll(".action-menu.visible").forEach((menu) => {
      if (menu !== actionMenu) {
        menu.classList.remove("visible");
        menu.classList.add("hidden");
      }
    });

    // Toggle the clicked menu
    if (actionMenu.classList.contains("hidden")) {
      actionMenu.classList.remove("hidden");
      actionMenu.classList.add("visible");
    } else {
      actionMenu.classList.remove("visible");
      actionMenu.classList.add("hidden");
    }
  });
});

// Close menus when clicking outside
document.addEventListener("click", () => {
  document.querySelectorAll(".action-menu.visible").forEach((menu) => {
    menu.classList.remove("visible");
    menu.classList.add("hidden");
  });
});
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
//End Favorite-Song

//LOGIC APLAYER
const aplayer = new APlayer({
  container: document.getElementById("aplayer"),
  audio: [],
  autoplay: true,
  listFolded: true,
  listMaxHeight: 90,
});

// Function to get the current audio information
const getCurrentAudio = () => {
  const currentAudio = aplayer.audio[aplayer.list.index];
  return {
    name: currentAudio.name,
    artist: currentAudio.artist,
    url: currentAudio.url,
    cover: currentAudio.cover,
  };
};
// Function to play the next song in the queue
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
    queueArray.delete(nextSong.fileUrl); //curent is a map => deleted the key
    saveToLocalStorage(queueArray); //MVC
    setQueueFromLocalStorage(); //MVC
  } else {
    aplayer.pause();
  }
};
// Select song to play
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
// Event listener for when a song ends
aplayer.on("ended", () => {
  aplayer.list.remove(aplayer.list.index);
  playNextSong();
});

// Initialize the queue and play the first song if available
setQueueFromLocalStorage();
if (queueArray.size > 0) {
  playNextSong();
}

//END LOGIC APLAYER
