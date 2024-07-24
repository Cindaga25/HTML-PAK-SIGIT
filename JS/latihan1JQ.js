const buah = [
    { product_id: 1, product_name: "Banana", product_desc: "Pisang Raja", product_price: 1000, product_image: "../img/banana.png" },
    { product_id: 2, product_name: "Guava", product_desc: "Jambu Belanda", product_price: 2000, product_image: "../img/guava.png" },
    { product_id: 3, product_name: "Lemon", product_desc: "Lemonade", product_price: 3000, product_image: "../img/lemon.png" },
    { product_id: 4, product_name: "Orange", product_desc: "Jeruk Brazil", product_price: 4000, product_image: "../img/orange.png" },
    { product_id: 5, product_name: "Pineapple", product_desc: "Nanas Janda", product_price: 5000, product_image: "../img/pineapple.png" },
    { product_id: 5, product_name: "Strawberry", product_desc: "Stroberi", product_price: 5000, product_image: "../img/strawberry.png" }
]


var idProduct = [3, 5]
var idDiscount = 50

function insertBuah(){
    itemBuah = ""
    indexBuah = ""
    idx = 0
    itemCard = ""

$.each(buah, (key, value) => {
    itemBuah += `
            <div class="carousel-item ${idx == 0 ? 'active' : ''}">
                <h1 class="d-flex justify-content-center">${$.inArray(value.product_id, idProduct) >= 0 ? 'Discount' + idDiscount + '%' : ''}</h1> 
                <img class="d-block m-auto" src=${value.product_image} alt=${value.product_name}>
                <div class="carousel-caption">
                  <h5>${value.product_name}</h5>
                  <p class="d-none d-md-block">${value.product_desc}</p>
                </div>
            </div>`

    indexBuah += `<button type="button" data-bs-target="#carouselBuah"
    data-bs-slide-to="${idx}" class="${idx == 0 ? 'active' : ''}"></button>`
    idx++;

    itemCard += `
    <div class="col-12 col-sm-4 col-md-2 mb-3">
        
        <div class="card h-100 mx-2">

            <div class="card-header">Nama Toko</div>
                <div class="row justify-content-center align-item-center h-100 position-relative" id="row-${value.product_id}"> 


                    <img id="img-${value.product_id}" class="card-img-top" src=${value.product_image} alt=${value.product_name}>
                </div>

                <div class="card-body">
                    <h5 class="card-title">${value.product_name}</h5>
                    <P class="card-text">${value.product_desc}</P>
                    <div class="input-group">
                        <span>${value.product_price}</span>
                       
                        <input type="number" value="" min="0" step="1" class="form-control" placeholder="pack"
                            id="qty-${value.product_id}" name="qty-${value.product_id}" 
                            data-price="${value.product_price}" data-discount="100">

                             <a href="" class="btn btn-primary btn-buy" id="buy-${value.product_id}">
                            <i class="fa fa-cart-plus pe-3">    Buy</i>
                        </a>
                    </div>
                    <p>Total : Rp <span class="ms-2" id="total-${value.product_id}">0</span></p>
                </div>
                <div class="card-footer">Footer</div>

        </div>

    </div>`
})
    // console.log(indexBuah)
    $(".carousel-indicators").html(indexBuah)
    $(".carousel-inner").html(itemBuah)
    $(".card-group").html(itemCard)

    promo();
}


function promo() {
    $.each(idProduct, (key, val) => {
        $("#row-" + val).prepend("<img class='img-promo' src='..//img/diskon01.png' style='z-index: 10;'>")

        // $("#row-"+val).before("<img src='..//img/discount.png' style='z-index: 10;'>")

        $("#qty-" + val).attr("data-discount", idDiscount)


    })
}

// function sortBuah(a, b){
//     x=a.product_price;
//     y=b.product_price;
//     return((x<y) ? -1 : (x>y)? 1 : 0);

// }

function sortBuah(key, order){
    return(a, b) => {
        if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) return 0;

        varA= typeof a[key] === "string" ? a [key].toUpperCase() : a[key];
        varB= typeof b[key] === "string" ? b [key].toUpperCase() : b[key];

        compsort =(varA > varB) ? 1 : ((varA < varB) ? -1 : 0);
        return((order==="dsc")? compsort * -1 : compsort);
    };
}



//$(document).ready(function(){})
$(function () {
    buah.sort(sortBuah);
    insertBuah();

    $(".card-body").on("click", ".btn-buy", function (e) {
        e.preventDefault();  //stop bubling up

        id = $(this).attr("id").split("-")[1]
        price = $("#qty-" + id).data("price")
        discount = $("#qty-" + id).data("discount")
        qty = $("#qty-" + id).val()

        total = (price * (discount / 100)) * qty
        $("#total-" + id).text(total)

    })

    $("#sortselect").on("change",function(){

    });

    $("input:radio[name='sortorder']").on("click",function(){
        refreshBuah($("#sortselect").val());
    });

    $("#sortselect").on("change", function(){
        key=$(this).val();
        switch (key){
            case "Buah":
                keysort="product_name";
                break;
            case "harga":
                keysort="product_price";
                break;
            
        }

        buah.sort(sortBuah(keysort,$("input:radio[name='sortorder']:checked").val()));
        insertBuah();


    });

    $("input:radio[name='sortorder']").on("click", function(){
        key=$("#sortselect").val();
        switch (key){
            case "Buah":
                keysort="product_name";
                break;
            case "harga":
                keysort="product_price";
                break;
        }
            
        buah.sort(sortBuah(key,$("input:radio[name='sortorder']:checked").val()));
        insertBuah();
    });

})
