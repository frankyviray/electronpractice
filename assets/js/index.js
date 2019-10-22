const assortment = require("./data/assortment.json");
//console.log(assortment);

// RETRIEVES CATEGORIES FROM JSON
let categories = [];

const categoriesArr = assortment.map(function(assortment) {
    return (
        {
            category: assortment.category,
            class: assortment.class
        }
    )
});

// REMOVES DUPLICATE CATEGORIES
function removeDuplicates(myArr, prop) {
    return myArr.filter((obj, pos, arr) => {
        return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
};

categories = removeDuplicates(categoriesArr,"category");
// console.log(categories);

// PRINTS EACH CATEGORY TO SIDE BAR
function getCategories() {
    categories.forEach(function(category) {
        
        categoryName = category.category.charAt(0).toUpperCase() + category.category.substr(1);

        $("#category-list").append(`
            <li class="category list-group-item" data=${category.class}>${category.class} - ${categoryName}</li>
        `)
    })
};

var categoryItems = [];

// PRINTS EACH ITEM FROM categoryItems
function getItemsByCategory(num) {
    $("#category-result").empty();
    for (var i = 0; i < assortment.length; i++) {
        if ( num == assortment[i].class) {
            categoryItems.push(assortment[i]);
            var table = `
                <tr class="product">
                    <td class="mx-auto" scope="row">
                        <img id="result-img" class="mx-auto" src=${assortment[i].image}></img>
                    </td>
                    <td>${assortment[i].item_no}</td>
                    <td>${assortment[i].item}</td>
                    <td><button class="info-btn btn btn-outline-primary" data=${assortment[i].item_no} style="float:right;">More Info</button></td>
                </tr>
            `
            $("#category-result").append(table);
        }
    }
};

let selectedProduct;

// PRINTS PRODUCT PAGE
function getItemByItemNum(itemNum) {


    var pTag = assortment[0].description.match(/<\s*P[^>]*>([^<]*)<\s*\/\s*P\s*>/g);
    console.log(pTag);

    for (var i = 0; i < assortment.length; i++) {
        if ( itemNum == assortment[i].item_no ) {
            selectedProduct = assortment[i];
            var removeCom = selectedProduct.description.replace("?", "").replace('<td width="110" height="">', "").replace("http://extranet.acetools.com/Catalog/","assets/img/items/").split('<CENTER><FONT COLOR="RED">', 1);
            console.log(removeCom);
        }
    }
    $("#wrapper").empty();
    $("#wrapper").html(`
        <div class="container">
            <div class="row">
            <div class="col-12">
                <div class="card">
                    <h6 class="card-header">Item # ${selectedProduct.item_no} - ${selectedProduct.item}</h6>
                    <div class="card-body">
                        <div class="row">    
                            <div class="col-6">${removeCom}</div>
                            <div class="col-6"><img src=${selectedProduct.image}></img></div>
                        </div>
                        <div class="row">
                            <button id="back-btn" class="btn btn-outline-primary" data=${selectedProduct.class}>BACK</button>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    `)
};


// SEARCH FUNCTION
function search(input) {
    var userInput = input.toUpperCase();
    var searchResults = [];

    for (var i = 0; i < assortment.length; i++) {
        var itemNames = assortment[i].item;
        var match = itemNames.indexOf(userInput);

        if (match > -1) {
            searchResults.push(assortment[i])
        }
    }

    $("#category-result").empty();
    for (var i = 0; i < searchResults.length; i++) {
        var table = `
            <tr class="product" data=${searchResults[i].item_no}>
                <td scope="row">
                    <img id="result-img" class="mx-auto" src=${searchResults[i].image}></img>
                </td>
                <td>${searchResults[i].item_no}</td>
                <td>${searchResults[i].item}<button class="info-btn btn btn-outline-primary" data=${searchResults[i].item_no} style="float:right;">More Info</button></td>
            </tr>
        `
        $("#category-result").append(table);
    }
};

// EVENT LISTENERS

// ON LOAD
$(document).ready(function() {
    getCategories();

    var categoryId = sessionStorage.getItem("category")
    console.log(categoryId)
    if (categoryId) {
        getItemsByCategory(categoryId)
        $("#category-list").find(`[data=${categoryId}]`).addClass("active");
        $("#result-card").css("display","inline-block");
    }
});

// CATEGORY BUTTON CLICK
$(document).on("click", ".category", function() {
    let selectedCat = $(this).attr("data");
    $(".category").removeClass("active");
    $(this).addClass("active");
    getItemsByCategory(selectedCat);
    $("#result-card").css("display","inline-block");
});

// PRODUCT INFO CLICK
$(document).on("click", ".info-btn", function() {
    let itemNum = $(this).attr("data");
    sessionStorage.setItem("itemNum", itemNum)
    window.location.href = "product.html"
});

// SEARCH INPUT BOX CLICK
$(document).on("click", "#searchSubmit", function () {
    event.preventDefault();
    var userInput = $("#searchInput").val();
    search(userInput);
    $(".category").removeClass("active");
    $("#result-card").css("display","inline-block");
});

// BACK BUTTON CLICK
$(document).on("click", "#back-btn", function() {
    var category = $(this).attr("data");
    sessionStorage.setItem("category", category)
    window.history.back();
});