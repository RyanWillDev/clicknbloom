"use strict";function createProductArray(t,a){for(var i=0;i<t.length;i++)listingsData[i]={id:t[i].listing_id,title:t[i].title,url:t[i].url,price:t[i].price,thumb:t[i].MainImage.url_170x135,full:t[i].MainImage.url_fullxfull};a()}function displayListings(){for(var t=$("#featured-list"),a="",i=0;i<listingsData.length;i++)a='<li class="featured-list-item">',a+='<a href="'+listingsData[i].url+'"><img class="product-img" src="'+listingsData[i].thumb,a+='"alt="'+listingsData[i].title+' "></a></li>',t.append(a)}function updateListingsData(t){for(var a=0;a<listingsData.length;a++)t.results[0].listing_id===listingsData[a].id&&(listingsData[a].thumb=t.results[0].url_170x135,listingsData[a].full=t.results[0].url_fullxfull,counter++);counter===listingsData.length&&displayListings()}function getData(t){t.ok?createProductArray(t.results,displayListings):console.log("No featured items found.")}var listingsData=[];$.ajax({url:"https://openapi.etsy.com/v2/shops/clickandbloom/listings/featured/.js?callback=getData&limit=8&includes=MainImage&api_key=w1db2hhyn6vtfn79hy4ahzhj",dataType:"jsonp"}).done(getData),$(window).on("scroll",function(){$(window).scrollTop()>50?$("header").addClass("hasScrolled"):$("header").removeClass("hasScrolled")}),$('a[href^="#"').on("click",function(t){t.preventDefault(),$(".nav-link a").removeClass("active"),$(this).addClass("active");var a=this.hash,i=$(a);$("html, body").stop().animate({scrollTop:i.offset().top-60},900,function(){window.location.hash=a})});