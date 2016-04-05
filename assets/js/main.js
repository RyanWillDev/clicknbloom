'use strict';

// Array to store all the data for each listing
var listingsData = [];

// Adds the results from the AJAX request
function createProductArray(data) {
  for (var i = 0; i < data.length; i++) {
    listingsData[i] = {
      id: data[i].listing_id,
      title: data[i].title,
      url: data[i].url,
    };
  }
}

// Updates the listingsData array
function updateListings(data) {
  console.log(data.params.listing_id);
  for (var i = 0; i < data.length; i++) {
    console.log(i);
    listingsData[i].thumb = data.results[0].url_570xN;
    listingsData[i].full = data.results[0].url_fullxfull;
  }
}

// Another AJAX request for the images associated with the listings
function getImgs() {
  for (var i = 0; i < listingsData.length; i++) {
    $.ajax({
      url: 'https://openapi.etsy.com/v2/listings/' + listingsData[i].id + '/images.js?&api_key=w1db2hhyn6vtfn79hy4ahzhj',
      dataType: 'jsonp',
    }).success(updateListings);
  }
}

// Appends the results of the AJAX requests as an <ol>
function displayListings() {
  var featList = $('.featured-list');
  var html = '';

// Creates a <li> for every item in listings and appends to featured list
  for (var i = 0; i < listingsData.length; i++) {
    html = '<li class="featured-list-item">';
    html += '<div class="product">';
    html += '<a href=""><img class="product-img" src="" alt=""></a></div>';
    html += '<a class="title" href="' + listingsData[i].url + '">' + listingsData[i].title + '</a></li>';
    featList.append(html);
  }
}

// Callback for Etsy API call
function getData(data) {
  if (data.ok) {
    createProductArray(data.results);
    getImgs();
    displayListings();
  } else {
    console.log('No featured items found.');
  }
}


// Requests featured items from Etsy
$.ajax({
  url: 'https://openapi.etsy.com/v2/shops/clickandbloom/listings/featured.js?callback=getData&api_key=w1db2hhyn6vtfn79hy4ahzhj',
  dataType: 'jsonp',
})
.done(getData);

