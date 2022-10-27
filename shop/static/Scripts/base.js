const searchBar = document.getElementById("search-input");
const searchIcon = document.getElementById("search-icon");

searchIcon.addEventListener("click", () => {
    if (searchBar.value != "") {
        window.location = `/products/search=${searchBar.value}`;
    }
})

searchBar.addEventListener("keydown", (e) => {
    if ((e.code == "Enter" || e.code == "NumpadEnter") && searchBar.value != "") {
        window.location = `/products/search=${searchBar.value}`;
    }
})