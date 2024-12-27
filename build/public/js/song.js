export const addFavoriteSong = (userId) => {
    const favoriteSongButtons = document.querySelectorAll("[favorite-song-button]");
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
}
