// Cart summary logic

const drawerExample = document.querySelector("#drawer-example");
const jsonCart = JSON.parse(localStorage.getItem("cart"));

for (let [key, value] of Object.entries(jsonCart)) {
    let item = document.createElement("div");
    item.className = "flex justify-between px-4 mb-2 text-sm";
    item.innerHTML = `
      <div> ${key} <span class="bg-yellow-100 text-yellow-800 text-sm font-medium mr-2 px-2.5 rounded"> ${value}x </span> </div>
      <button type="button" class="text-black border border-gray-900 px-3 rounded-md bg-gray-100
      active:bg-gray-200 text-sm remove-btn" id="${key}"> remove </button>
    `
    drawerExample.append(item);
}

document.querySelectorAll(".remove-btn").forEach(element => {
    element.addEventListener("click", (e) => {
      e.target.parentElement.innerHTML = "";
      delete jsonCart[e.target.id];
      localStorage.setItem("cart", JSON.stringify(jsonCart));
    })
})