export const logout = () => {
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
}
