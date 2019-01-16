$(document).ready(function () {
    showCategories()
    showProducts()
})

function showCategories() {
    $.get("/categories", function (data) {
        var html = ''
        data.forEach(function (category) {
            html = html + '<li><a href="#" onClick="showProducts(' + category.id + ')">' + category.name + '</a></li>'
        })
        $('#categories').html(html)
    });
}

//todo: implement showProducts method
function showProducts(categoryId) {
    if (categoryId) {
        var url = '/categories/' + categoryId + '/products';
    } else {
        var url = '/products'
    }
    $.get(url, function (data) {
        var html = '';
        data.forEach(
            function (product) {
                html = html + '<div class="product">'
                    + '<h2>' + product.name + '</h2>'
                    + '<p>' + product.description + '</p>'
                    + '<p>Pret: ' + product.price + '</p>'
                    + '<p>Categorie: ' + product.category.name + '</p>'
                    + '</div>';

                html = html + '<h3>Product reviews</h3>'

                if (product.reviews) {
                    product.reviews.forEach(
                        function (reviewData) {
                            html = html + reviewData.name + ' ' + reviewData.content;
                            html = html + '<br>';
                        }
                    )
                }


            }
        )
        $('#content').html(html);
    })
}

function saveContacts() {
    var first_name = $('#fname').val();
    var last_name = $('#lname').val();
    var country = $('#country').find(":selected").text();
    var subject = $('#subject').val();

    $.ajax({
        url: '/contacts',
        type: 'POST',
        accepts: {
            json: 'application/json'
        },
        data: {first_name, last_name, country, subject},
        success: function (data) {
            $('#fname').val('');
            $('#lname').val('');
            $('#subject').val('');
            $('#alerta').css('display', 'inline-block');
        }
    })
}