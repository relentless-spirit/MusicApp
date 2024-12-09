// //Aplayer
// document.addEventListener("DOMContentLoaded", function () {
//   const aplayer = new APlayer({
//     container: document.getElementById("aplayer"),
//     audio: [
//       {
//         name: "Qua Từng Khung Hình",
//         artist: "Hustlang Robber & Ngắn",
//         url: "../songs/QUA TỪNG KHUNG HÌNH (Feat. Robber, Ngắn) - RAP VIỆT (youtube).mp3",
//         cover:
//           "https://lh3.googleusercontent.com/F2ywvCxiucFEM2CwP_6-3rYeoSUIhKPZO9rpMsKz8W3wDYE5SILCU7b9crM9GqwjmIy8TZtOPDqOJx1T=w60-h60-l90-rj",
//       },
//     ],
//     autoplay: true,
//   });
//   aplayer.play();
// });

// //End aplayer

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

//get current audio aplayer

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

// Drop down menu for songs
document.addEventListener("DOMContentLoaded", () => {
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
});
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
  let currentUrl = new URL(location.href);
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
}
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

const addToQueueButton = document.querySelectorAll("[queue-button]");
const queueList = document.querySelector(".queue-list");
const queueArray = getFromLocalStorage() || new Map();
if (addToQueueButton) {
  addToQueueButton.forEach((button) => {
    button.addEventListener("click", async () => {
      const img = button.getAttribute("src-img-data");
      const fileUrl = button.getAttribute("song-src-data");
      const songName = button.getAttribute("song-name-data");
      const songArtist = button.getAttribute("song-artist-data");
      queueArray.set(fileUrl, {
        img,
        fileUrl,
        songName,
        songArtist,
      });
      if (queueArray.has(fileUrl)) {
        const existingItem = queueArray.get(fileUrl);
        queueArray.delete(fileUrl);
        queueArray.set(fileUrl, existingItem);

        // Remove existing HTML element with the same fileUrl
        const existingElements = queueList.querySelectorAll(
          `[song-src="${fileUrl}"]`
        );
        existingElements.forEach((element) => {
          element.parentElement.parentElement.remove();
        });
      }
      saveToLocalStorage(queueArray);
      const newDiv = document.createElement("div");
      newDiv.classList.add("latest-release-entry2", "flex-space");

      const imgDiv = `
        <div class="latest-release-image2">
          <img src="${img}"  song-src="${fileUrl}"
                        song-name="${songName}"
                        song-artist="${songArtist}"
                        song-cover="${img}">
        </div>
      `;

      const infoDiv = `
        <div class="latest-release-info2">
          <p>
            <a href="#">
              <b>${songName}</b>
            </a>
          </p>
          <p class="latest-release-sub2">MAR 29, 2019</p>
        </div>
      `;

      const actionDiv = `
        <div class="action-icon">
          <i class="fa fa-ellipsis-h action-menu-toggle" aria-hidden="true"></i>
          <div class="action-menu hidden">
            <ul>
              <li>
                <a href="/add-to-playlist/12345">Add to Playlist</a>
              </li>
              <li>
                <a data-path="/favorite-songs/favorite-song/12345" favorite-song-button>Save to your Favorite Songs</a>
              </li>
              <li>
                <a href="/add-to-queue/12345">Add to Queue</a>
              </li>
              <li>
                <a href="#">Go to the artist detail</a>
              </li>
            </ul>
          </div>
        </div>
      `;

      newDiv.innerHTML = imgDiv + infoDiv + actionDiv;
      if (queueList) {
        queueList.appendChild(newDiv);
      }
    });
  });
}
const setQueueFromLocalStorage = () => {
  const queueArray = getFromLocalStorage();
  if (queueArray) {
    queueArray.forEach((item) => {
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
          <i class="fa fa-ellipsis-h action-menu-toggle" aria-hidden="true"></i>
          <div class="action-menu hidden">
            <ul>
              <li>
                <a href="/add-to-playlist/12345">Add to Playlist</a>
              </li>
              <li>
                <a data-path="/favorite-songs/favorite-song/12345" favorite-song-button>Save to your Favorite Songs</a>
              </li>
              <li>
                <a href="/add-to-queue/12345">Add to Queue</a>
              </li>
              <li>
                <a href="#">Go to the artist detail</a>
              </li>
            </ul>
          </div>
        </div>
      `;

      newDiv.innerHTML = imgDiv + infoDiv + actionDiv;
      if (queueList) {
        queueList.appendChild(newDiv);
      }
    });
  }
};

setQueueFromLocalStorage();
//End Add to queue logic

// ------------------------------------------------------------------------------------------------//
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
      const queueArray = getFromLocalStorage();
      const songs = [];
      queueArray.forEach((item) => {
        songs.push({
          name: item.songName,
          artist: item.songArtist,
          url: item.fileUrl,
          cover: item.img,
        });
      });
      aplayer.list.add(songs);
    });
  });
}
//End select song to play
