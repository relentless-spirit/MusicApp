// add hovered class to selected list item
let list = document.querySelectorAll(".navigation li");

function activeLink() {
  list.forEach((item) => {
    item.classList.remove("hovered");
  });
  this.classList.add("hovered");
}

list.forEach((item) => item.addEventListener("mouseover", activeLink));

// Menu Toggle
let toggle = document.querySelector(".toggle");
let navigation = document.querySelector(".navigation");
let main = document.querySelector(".main");
if (toggle) {
  toggle.onclick = function () {
    navigation.classList.toggle("active");
    main.classList.toggle("active");
  };
}

// Preview ảnh
const uploadImage = document.querySelector("[upload-image]");
if (uploadImage) {
  const uploadImageInput = uploadImage.querySelector("[upload-image-input]");
  const uploadImagePreview = uploadImage.querySelector(
    "[upload-image-preview]"
  );
  console.log(uploadImageInput, uploadImagePreview);

  uploadImageInput.addEventListener("change", () => {
    const file = uploadImageInput.files[0];
    if (file) {
      uploadImagePreview.src = URL.createObjectURL(file);
    }
  });
}
// Hết Preview ảnh

// Nghe thử
const uploadAudio = document.querySelector("[upload-audio]");
if (uploadAudio) {
  const uploadAudioInput = uploadAudio.querySelector("[upload-audio-input]");
  const uploadAudioPlay = uploadAudio.querySelector("[upload-audio-play]");
  const uploadAudioSource = uploadAudio.querySelector("source");

  uploadAudioInput.addEventListener("change", () => {
    const file = uploadAudioInput.files[0];
    if (file) {
      uploadAudioSource.src = URL.createObjectURL(file);
      uploadAudioPlay.load();
    }
  });
}
// Hết Nghe thử

//alert message
const notifications = document.querySelector("[alert-message]");
if (notifications) {
  setTimeout(() => {
    notifications.style.display = "none";
  }, 2500);
}

//delete song
const buttonDelete = document.querySelectorAll("[button-delete]");
if (buttonDelete) {
  buttonDelete.forEach((button) => {
    button.addEventListener("click", function () {
      const deleteSongModal = document.getElementById("myModal");
      const confirmDeleteButton = document.getElementById(
        "confirmDeleteButton"
      );
      let songIdToDelete = button.getAttribute("button-delete");
      let link = button.getAttribute("link");
      confirmDeleteButton.addEventListener("click", function () {
        fetch(link, {
          method: "PATCH",
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              location.reload();
            } else {
              alert("Error deleting song");
            }
          });
      });
    });
  });
}
//Delete topic
const deletedTopicButtons = document.querySelectorAll("[deleted-topic-button]");
if (deletedTopicButtons.length > 0) {
  deletedTopicButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const myDeletedTopicModal = document.getElementById("deleteTopicModal");
      const myModal = new bootstrap.Modal(myDeletedTopicModal);
      myModal.show();
      const confirmDeleteButton = myDeletedTopicModal.querySelector(
        ".modal-footer button[button-confirm]"
      );
      if (confirmDeleteButton)
        confirmDeleteButton.addEventListener("click", async () => {
          const id = button.getAttribute("id");
          const path = button.getAttribute("data-path");
          await fetch(path, {
            method: "DELETE",
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.code) {
                location.reload();
              }
            });
        });
    });
  });
}
//End delete topic

//PLAYLIST ADMIN
document.addEventListener("DOMContentLoaded", () => {
  const addSongButton = document.getElementById("addSongButton");
  const songsDropdown = document.getElementById("songsDropdown");
  const selectedSongsList = document.getElementById("selectedSongsList");
  const songsInput = document.getElementById("songs");

  let selectedSongs = [];

  addSongButton.addEventListener("click", () => {
    const selectedSongId = songsDropdown.value;
    const selectedSongText =
      songsDropdown.options[songsDropdown.selectedIndex].text;

    if (selectedSongId && !selectedSongs.includes(selectedSongId)) {
      // Thêm bài hát vào danh sách được chọn
      selectedSongs.push(selectedSongId);

      // Hiển thị bài hát trong giao diện
      const listItem = document.createElement("li");
      listItem.className =
        "list-group-item d-flex justify-content-between align-items-center";
      listItem.dataset.songId = selectedSongId;
      listItem.innerHTML = `
        ${selectedSongText}
        <button type="button" class="btn btn-danger btn-sm remove-song">Xóa</button>
      `;
      selectedSongsList.appendChild(listItem);

      // Cập nhật giá trị ẩn
      songsInput.value = JSON.stringify(selectedSongs);
    }
  });

  // Xử lý xóa bài hát khỏi danh sách
  selectedSongsList.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-song")) {
      const listItem = e.target.closest("li");
      const songId = listItem.dataset.songId;

      // Xóa bài hát khỏi danh sách được chọn
      selectedSongs = selectedSongs.filter((id) => id !== songId);
      songsInput.value = JSON.stringify(selectedSongs);

      // Xóa bài hát khỏi giao diện
      listItem.remove();
    }
  });
});

//END PLAYLIST ADMIN
