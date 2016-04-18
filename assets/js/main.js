'use strict';

// Array to store all the data for each listing
var listingsData = [];
var counter = 0;

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

// Appends the results of the AJAX requests as an <ol>
function displayListings() {
  var featList = $('.featured-list');
  var html = '';

// Creates a <li> for every item in listings and appends to featured list
  for (var i = 0; i < listingsData.length; i++) {
    html = '<li class="featured-list-item">';
    html += '<div class="product">';
    html += '<a href=""><img class="product-img" src="' + listingsData[i].thumb;
    html += '"alt="' + listingsData[i].title + ' "></a></div>';
    html += '<a class="title" href="' + listingsData[i].url + '">';
    html += listingsData[i].title + '</a></li>';
    featList.append(html);
  }
}

// Updates the listingsData array
function updateListingsData(data) {
  for (var i = 0; i < listingsData.length; i++) {
    if (data.results[0].listing_id === listingsData[i].id) {
      listingsData[i].thumb = data.results[0].url_170x135;
      listingsData[i].full = data.results[0].url_fullxfull;
      counter++;
    }
  }
  if (counter === listingsData.length) {
    displayListings();
  }
}

// Another AJAX request for the images associated with the listings
function getImgs() {
  for (var i = 0; i < listingsData.length; i++) {
    $.ajax({
      url: 'https://openapi.etsy.com/v2/listings/' + listingsData[i].id + '/images.js?&api_key=w1db2hhyn6vtfn79hy4ahzhj',
      dataType: 'jsonp',
    }).done(updateListingsData);
  }
}

// Callback for Etsy API call
function getData(data) {
  if (data.ok) {
    createProductArray(data.results);
    getImgs();
    // displayListings(); Commented out for testing
  } else {
    console.log('No featured items found.');
  }
}

// Requests featured items from Etsy
$.ajax({
  url: 'https://openapi.etsy.com/v2/shops/clickandbloom/listings/featured.js?limit=8&callback=getData&api_key=w1db2hhyn6vtfn79hy4ahzhj',
  dataType: 'jsonp',
})
.done(getData);
