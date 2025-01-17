const $ = window.$;

$( document ).ready(function () {

  /*****************************************************
    display list of Amenity checkboxes clicked
   *****************************************************/
  let ls_amen = {};
  $('.amenities input[type=checkbox]').change (function () {
    if ($(this).is(':checked')) {
      ls_amen[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete ls_amen[$(this).data('id')];
    }
    $('.amenities h4').text(Object.values(ls_amen).join(', '));
  });

  /*****************************************************
    display list of City checkboxes clicked
   *****************************************************/
  let ls_cities = {};
  $('.locations ul.popover LI.c input[type=checkbox]').change (function () {
    if ($(this).is(':checked')) {
      ls_cities[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete ls_cities[$(this).data('id')];
    }
    $('.locations h4').text(Object.values(ls_cities).join(', '));
  });

  /*****************************************************
    display list of State checkboxes clicked
   *****************************************************/
  let ls_states = {};
  $('.locations ul.popover LI.s input[type=checkbox]').change (function () {
    if ($(this).is(':checked')) {
      ls_states[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete ls_states[$(this).data('id')];
    }
    $('.locations h4').text(Object.values(ls_states).join(', '));
  });

  /*******************************************************
    display red circle on top right of page if status ok
   *******************************************************/
  $.ajax({
    type: 'GET',
    url: 'http://0.0.0.0:5001/api/v1/status/',
    dataType: 'json',
    success: function (data) {
      if (data.status === 'OK') {
	$('#api_status').addClass('available');
      } else {
	$('#api_status').removeClass('available');
      }
    }
  });

  /*******************************************************
    populate Places from frontend, instead of backend jinja
   *******************************************************/
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      data: JSON.stringify({}),
      contentType: 'application/json',
      success: function (data) {
	for (let i = 0; i < data.length; i++) {
	  $('section.places').append('<article><div class="title_box"><h2>' + place.name + '</h2><div class="price_by_night">' + place.price_by_night + '</div></div><div class="information"><div class="max_guest">' + place.max_guest + '</div><div class="number_rooms">' + place.number_rooms + 'Bedroom(s)</div><div class="number_bathrooms">' + place.number_bathrooms + ' Bathroom(s)</div></div><div class="description">' + place.description + '</div></article>');
	}
      }
    });

  /*******************************************************
    populate Places from frontend, instead of backend jinja;
    filter places displayed based on amenity and locations checkboxed list
   *******************************************************/
  $('button').click(function () {
    $('article').remove();
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      data: JSON.stringify({'amenities': Object.keys(ls_amen), 'cities': Object.keys(ls_cities), 'states': Object.keys(ls_states)}),
      contentType: 'application/json',
      success: function (data) {
	for (let i = 0; i < data.length; i++) {
	  console.log(data[i]);
	  console.log(ls_amen);
	  console.log('cities: ', ls_cities);
	  console.log('states: ', ls_states);
	  $('section.places').append('<article><div class="title_box"><h2>' + place.name + '</h2><div class="price_by_night">' + place.price_by_night + '</div></div><div class="information"><div class="max_guest">' + place.max_guest + '</div><div class="number_rooms">' + place.number_rooms + 'Bedroom(s)</div><div class="number_bathrooms">' + place.number_bathrooms + ' Bathroom(s)</div></div><div class="description">' + place.description + '</div></article>');
	}
      }
    });
  });

});
