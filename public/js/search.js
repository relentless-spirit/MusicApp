export const search = () => {
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

        // Suggestion searching using debounce
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

        const searchIcon = document.getElementById("search-icon");
        if (searchIcon && searchInput) {
            searchIcon.addEventListener("click", () => {
                searchInput.focus();
            });
        }
    }

}