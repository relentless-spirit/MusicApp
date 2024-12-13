export const search = () => {
  const searchBox = document.querySelector(".search-box");
  let currentUrl = new URL(location.href); // Use location.href to include search parameters

  if (searchBox) {
    const searchInput = searchBox.querySelector("input[name='inputValue']"); // Ensure correct input selector
    const suggestionsDiv = document.getElementById("suggestions");

    // Set the input value based on the current URL parameters
    const inputValue = currentUrl.searchParams.get("search");
    if (inputValue) {
      searchInput.value = inputValue;
    }

    searchBox.addEventListener("submit", (event) => {
      event.preventDefault();
      const inputValue = searchInput.value;
      if (inputValue) {
        currentUrl.searchParams.set("search", inputValue);
      } else {
        currentUrl.searchParams.delete("search");
      }
      location.href = currentUrl.href;
    });

    // Suggestion searching using debounce
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
};
