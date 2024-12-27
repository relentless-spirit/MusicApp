export const dropdownPlaylist = () => {
    const addToPlaylistButtons = document.querySelectorAll("[add-to-playlist-button]");
    if (addToPlaylistButtons.length > 0) {
        addToPlaylistButtons.forEach((button) => {
            button.addEventListener("mouseover", (event) => {
                const id = button.getAttribute("data-id");
                const addPlaylistDropdown = document.querySelector(
                    `.dropdown-menu-playlist[data-id="${id}"]`
                );
                if (addPlaylistDropdown) {
                    addPlaylistDropdown.classList.add("show");
                    addPlaylistDropdown.addEventListener(
                        "mouseleave",
                        (event) => {
                            addPlaylistDropdown.classList.remove("show");
                        },
                        { once: true }
                    );
                }
                event.stopPropagation();
            });
        });
    }
}

export const modalEditDetail = (userId) => {
    const editDetailCondition = document.querySelector(".featured-playlist-details h3").getAttribute("userID");
    console.log(editDetailCondition);
    if (editDetailCondition == userId) {
        document.querySelector(".featured-playlist-info-name h2").addEventListener("click", () => {
            document.querySelector(".modal").style.display = "flex";
        });

        document.querySelector(".featured-playlist-image").addEventListener("click", () => {
            document.querySelector(".modal").style.display = "flex";
        });

        document.querySelector(".close").addEventListener("click", () => {
            document.querySelector(".modal").style.display = "none";
        });
    }
}