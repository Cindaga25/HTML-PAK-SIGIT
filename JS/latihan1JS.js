// JSON Object
const buah = [
  { product_id: 1, product_name: "Banana", product_desc: "Pisang Banana", product_price: 1000, product_image: "../img/banana.png" },
  { product_id: 2, product_name: "Guava", product_desc: "Jambu Guava", product_price: 2000, product_image: "../img/guava.png" },
  { product_id: 3, product_name: "Lemon", product_desc: "Jeruk Lemon", product_price: 3000, product_image: "../img/lemon.png" },
  { product_id: 4, product_name: "Orange", product_desc: "Jeruk Orange", product_price: 4000, product_image: "../img/orange.png" },
  { product_id: 5, product_name: "Pineapple", product_desc: "Nanas Apple", product_price: 5000, product_image: "../img/pineapple.png" },
  { product_id: 5, product_name: "Strawberry", product_desc: "Stroberi", product_price: 5000, product_image: "../img/strawberry.png" }


]

const showBuah = () => {
  let itemBuah = "", indexBuah = "", idx = 0
  buah.forEach(({ product_name, product_image, product_desc }) => {
    itemBuah += `
            <div class="carousel-item ${idx == 0 ? 'active' : ''}">
                <img class="d-block m-auto" src=${product_image} alt=${product_name} />
                <div class="carousel-caption">
                  <h5>${product_name}</h5>
                  <p>${product_desc}</p>
                </div>
            </div>`;

    indexBuah += `<button type="button" data-bs-target="#carouselBuah" data-bs-slide-to="${idx}" class="${idx == 0 ? 'active' : ''}"></button>`
    idx++;


  }

  )
  document.querySelector(".carousel-indicators").innerHTML = indexBuah
  document.querySelector(".carousel-inner").innerHTML = itemBuah
}

document.addEventListener("DOMContentLoaded", showBuah)

