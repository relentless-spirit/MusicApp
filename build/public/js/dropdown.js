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