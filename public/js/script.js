import { playAllButton, createPlaylistButton, addPlaylistButton } from "./playlist.js";
import { dropdownPlaylist } from "./dropdown.js";
import { logout } from "./auth.js";
import { followArtist } from "./artist.js";
import { search } from "./search.js";
import { followTopic } from "./topic.js";
import { addFavoriteSong } from "./song.js";
import { addToQueue, getCurrentAudio, getFromStorage, restorePlayback, saveCurrentPlayback, setQueueFromStorage } from "./queue.js";



// Assume user ID is stored in a global variable or obtained from the server
const user = document.querySelector("[user-id]");
const userId = user ? user.getAttribute("user-id") : null;
// Initialize the queue from storage
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
// Event listeners

//Add to Queue
addToQueue(queueArray);
//Add to Queue

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

setInterval(saveCurrentPlayback(aplayer), 1000);
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

//Favorite song
addFavoriteSong(userId);
//Favorite song

// Playlist play all button
playAllButton(aplayer);
// End playlist play all button

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
if (sidebar) {
  const toggleSidebar = () => {
    const isVisible = sidebar.classList.toggle("visible");
    toggleIconOpen.classList.toggle("hidden", isVisible);
    toggleIconClose.classList.toggle("hidden", !isVisible);
  };
  document
    .querySelector(".toggle-sidebar")
    .addEventListener("click", toggleSidebar);
}

// Follow Topic
followTopic(userId);
//Follow Topic

// Searching logic
search();
// Searching logic

// Follow artist
followArtist(userId);
//End Follow artist

// Logout
logout();
// End Logout

//Show dropdown playlist
dropdownPlaylist();
//End show dropdown playlist

//Create new playlist
createPlaylistButton();
//End create new playlist

//Add playlist
addPlaylistButton();
//End add playlist

