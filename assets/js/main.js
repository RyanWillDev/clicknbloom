'use strict';

var key = '?api_key=w1db2hhyn6vtfn79hy4ahzhj';
var featuredURL = 'https://openapi.etsy.com/v2/shops/clickandbloom/listings/featured';

function getData (data) {
  if (data.ok) {
    console.dir(data);
  } else {
    console.log('error');
  }
}
