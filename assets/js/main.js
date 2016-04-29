'use strict';

// Array to store all the data for each listing
var listingsData = [];

// Adds the results from the AJAX request
function createProductArray(data, callback) {
  for (var i = 0; i < data.length; i++) {
    listingsData[i] = {
      id: data[i].listing_id,
      title: data[i].title,
      url: data[i].url,
      price: data[i].price,
      thumb: data[i].MainImage.url_170x135,
      full: data[i].MainImage.url_fullxfull,
    };
  }
  callback();
}

// Appends the results of the AJAX requests as an <ol>
function displayListings() {
  var featList = $('#featured-list');
  var html = '';

// Creates a <li> for every item in listings and appends to featured list
  for (var i = 0; i < listingsData.length; i++) {
    html = '<li class="featured-list-item">';
    html += '<a href="' + listingsData[i].url + '"><img class="product-img" src="' + listingsData[i].thumb;
    html += '"alt="' + listingsData[i].title + ' "></a></li>';
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

// Callback for Etsy API call
function getData(data) {
  if (data.ok) {
    createProductArray(data.results, displayListings);
  } else {
    console.log('No featured items found.'); // Remove once finished
  }
}

// Requests featured items from Etsy
$.ajax({
  url: 'https://openapi.etsy.com/v2/shops/clickandbloom/listings/featured/.js?callback=getData&limit=8&includes=MainImage&api_key=w1db2hhyn6vtfn79hy4ahzhj',
  dataType: 'jsonp',
})
.done(getData);


// Change color on header when scrolled
$(window).on('scroll', function headerScrollHandler() {
  if ($(window).scrollTop() > 50) {
    $('header').addClass('hasScrolled');
  } else {
    $('header').removeClass('hasScrolled');
  }
});


$('a[href^="#"').on('click', function(event) {
  event.preventDefault();
  // Add active class to nav links when clicked
  $('.nav-link a').removeClass('active');
  $(this).addClass('active');
  // Scroll to corresponding section of page
  var target = this.hash;
  var $target = $(target);

  $('html, body').stop().animate({
    scrollTop: $target.offset().top - 60,
  },
    900, function() {
    // move to target section
      window.location.hash = target;
    });
});// End click handler

