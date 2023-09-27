let poet = document.querySelector(".poet");
let profileDropdown = document.querySelector(".dropDown");
let collection = document.querySelector(".collections");
let rotation = document.querySelector(".filterDropdown i");
let groupList = document.querySelector(".groupList");
let completeList = [...document.querySelectorAll(".groupList p")];
let allPackage = document.querySelector(".totalPackage");

let everyProduct = null;

completeList.forEach((eachOption) => {
  eachOption.addEventListener("click", () => {
    console.log(eachOption.textContent);
    allPackage.textContent = eachOption.textContent;
    groupList.classList.remove("active");

    if (eachOption.textContent.toLowerCase() === "all") {
      allDesign(everyProduct);
    } else {
      let allProducts = everyProduct.filter(
        (eachProduct) =>
          eachProduct.category === eachOption.textContent.toLowerCase()
      );
      allDesign(allProducts)
    }
  });
});

poet.addEventListener("click", () => {
  profileDropdown.classList.toggle("active");
});

let newData = async () => {
  let res = await fetch("https://dummyjson.com/products");
  let gadgets = await res.json();
  console.log(gadgets.products);
  everyProduct = gadgets.products 
  allDesign(gadgets.products);
};

newData();

function allDesign(phones) {
  let phoneBrand = phones.map((gadget) => {
    return `<div class='shadow px-3 py-4 text-white'> 
    <img class='w-100' src="${gadget.images.splice(0, 1)}" >
        <p>${gadget.brand}: ${gadget.title}</p>
        <p>$${gadget.price} with a ${Math.floor(
      gadget.discountPercentage
    )}% discount on purchase</p>
        <p>It has a rating of ${Math.floor(gadget.rating)} and we have only ${
      gadget.stock
    } in stock</p>
    <button class="btn bg-dark text-white w-100">Add to cart</button>
        </div>`;
  });
  //   console.log(phoneBrand);

  collection.innerHTML = phoneBrand.join("");
}

rotation.addEventListener("click", () => {
  groupList.classList.toggle("active");
  rotation.classList.toggle("active");
});
