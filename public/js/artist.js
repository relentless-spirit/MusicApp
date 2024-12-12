export const followArtist = (userId) => {
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
}
