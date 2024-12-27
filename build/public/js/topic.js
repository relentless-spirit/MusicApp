export const followTopic = (userId) => {
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
}
