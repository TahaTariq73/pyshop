//  Side panel search logic

const sidePanelSearchBar = document.getElementById("side-search-input");
const sidePanelSearchBtn = document.getElementById("side-search-btn");

sidePanelSearchBar.addEventListener("keydown", (e) => {
    if ((e.code == "Enter" || e.code == "NumpadEnter") && sidePanelSearchBar.value != "") {
        window.location = `/products/search=${sidePanelSearchBar.value}`;
    }
})

sidePanelSearchBtn.addEventListener("click", () => {
    if (sidePanelSearchBar.value != "") {
        window.location = `/products/search=${sidePanelSearchBar.value}`;
    }
})

//  Side panel filtration logic

// Product element is look like this 
// <div> -- eDisplay
// </div>
// <br> -- brDisplay
// <hr> -- hrDisplay

function productsDisplayByCondition(productsCondition, eDisplay, brDisplay, hrDisplay) {
    Array.from(productsCondition).forEach(element => {
        const productContainer = element.parentElement.parentElement;
        productContainer.style.display = eDisplay;
        productContainer.nextElementSibling.style.display = brDisplay;
        if (productContainer.nextElementSibling.nextElementSibling != null) {
            productContainer.nextElementSibling.nextElementSibling.style.display = hrDisplay;
        } 
    })
} 

function productsDisplayByBrand(productsBrands, label, eDisplay, brDisplay, hrDisplay) {
    Array.from(productsBrands).forEach(element => {
        const productContainer = element.parentElement.parentElement.parentElement;

        if (element.innerText == label) {
            productContainer.style.display = eDisplay;
            productContainer.nextElementSibling.style.display = brDisplay;
            if (productContainer.nextElementSibling.nextElementSibling != null) {
                productContainer.nextElementSibling.nextElementSibling.style.display = hrDisplay;
            }
        }
    })
}

function productsDisplayByPrice(element, eDisplay, brDisplay, hrDisplay) {
        const productContainer = element.parentElement.parentElement.parentElement;
        productContainer.style.display = eDisplay;
        productContainer.nextElementSibling.style.display = brDisplay;
        if(productContainer.nextElementSibling.nextElementSibling != null) {
            productContainer.nextElementSibling.nextElementSibling.style.display = hrDisplay;
        }
}   

document.querySelector("#filter-btn").addEventListener("click", () => {
    const sidebarBrandNames = document.querySelectorAll(".brands-name");
    const productsBrandNames = document.querySelectorAll(".brand-name");

    Array.from(document.querySelectorAll(".brands-checkbox")).forEach(
        (element, index) => {
            const brandLabel = sidebarBrandNames[index].innerText;
            if (element.checked == true) {
                productsDisplayByBrand(productsBrandNames, brandLabel, "flex", "block", "block");
            } else {
                productsDisplayByBrand(productsBrandNames, brandLabel, "none", "none", "none");
            }
    })

    const newProducts = Array.from(document.querySelectorAll(".condition-New"));
    const usedProducts = Array.from(document.querySelectorAll(".condition-Used"));

    const filteredNewProducts = newProducts.filter(element => {
        if (getComputedStyle(element.parentElement.parentElement).getPropertyValue("display") != "none") {
            return true;
        }
    })
    const filteredUsedProducts = usedProducts.filter(element => {
        if (getComputedStyle(element.parentElement.parentElement).getPropertyValue("display") != "none") {
            return true;
        }
    })

    if (document.querySelector("#checkbox-new").checked == true) {
        productsDisplayByCondition(filteredNewProducts, "flex", "block", "block");
    } else {
        productsDisplayByCondition(filteredNewProducts, "none", "none", "none");
    }

    if (document.querySelector("#checkbox-used").checked == true) {
        productsDisplayByCondition(filteredUsedProducts, "flex", "block", "block");
    } else {
        productsDisplayByCondition(filteredUsedProducts, "none", "none", "none");
    }

    const minInputVal = document.querySelector("#min-price-input").value;
    const maxInputVal = document.querySelector("#max-price-input").value;

    if (minInputVal == "" && maxInputVal == "") return;
    
    const productsPrice = Array.from(document.querySelectorAll(".product-price"));
    const filteredProductsPrice = productsPrice.filter(element => {
        if (getComputedStyle(element.parentElement.parentElement.parentElement).getPropertyValue("display") != "none") {
            return true;
        }
    })

    if ((minInputVal == "" || maxInputVal == "") && minInputVal != "") {
        let minimumValue = Number(minInputVal);
        filteredProductsPrice.forEach(element => {
            productPrice = Number(element.innerText);
            if (minimumValue <= productPrice) {
                productsDisplayByPrice(element, "flex", "block", "block");
            }
            else {
                productsDisplayByPrice(element, "none", "none", "none");
            }
        })
    }

    else if ((minInputVal == "" || maxInputVal == "") && maxInputVal != "") {
        let maximumValue = Number(maxInputVal);
        filteredProductsPrice.forEach(element => {
            productPrice = Number(element.innerText);
            if (maximumValue >= productPrice) {
                productsDisplayByPrice(element, "flex", "block", "block");
            }
            else {
                productsDisplayByPrice(element, "none", "none", "none");
            }
        })
    }

    else {
        let minimumValue = Number(minInputVal);
        let maximumValue = Number(maxInputVal);

        filteredProductsPrice.forEach(element => {
            productPrice = Number(element.innerText);
            if (maximumValue >= productPrice && minimumValue <= productPrice) {
                productsDisplayByPrice(element, "flex", "block", "block");
            }
            else {
                productsDisplayByPrice(element, "none", "none", "none");
            }
        })
    }
})