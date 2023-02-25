const $ = window.$;

const amenityIds = [];

$(document).ready(function () {
  $('div.amenities input[type="checkbox"]').on('click', function () {
    $(this).each(function (idx, item) {
      if ($(this).is(':checked')) {
        amenityIds.push($(this).attr('data-id'));
      } else {
        // Checkbox unchecked
        if (amenityIds.includes($(this).attr('data-id'))) {
          // Delete the id in a way that actually affects the array length
          amenityIds.splice(amenityIds.indexOf($(this).attr('data-id')), 1);
        }
      }
    });

    // Update h4 tag
    $('.amenities h4').text(amenityIds.join(', '));
  });

  $.get('http://0.0.0.0:5001/api/v1/status/', function (data, textStatus) {
    if (data.status === 'OK') {
      // Add class
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });

  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    data: '{}',
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    success: function (data) {
      for (const placeObj of data) {
      /* article structure:
      <article> --L0--
        <div> --L1A--
          <h2></h2> --L2A--
          <div></div> --L2B--
        </div>
        <div> --L1B--
          <div></div> --L2C--
          <div></div> --L2D--
          <div></div> --L2E--
        </div>
        <div> --L1C--
        </div>
      </article>
      */
        const article = '<article></article>';
        $('section.places').append(article);
        /** **********L0************/

        const divTB = '<div class="title_box"></div>';
        $('section.places article').append(divTB);
        /** **********L1A************/

        const h2 = `<h2>${placeObj.name}</h2>`;
        const divPBN = `<div class="price_by_night">${placeObj.price_by_night}</div>`;
        $('section.places article div.title_box').append(h2, divPBN);
        /** **********L2A-B**********/

        const divINFO = '<div class="information"></div>';
        $('section.places article').append(divINFO);
        /** **********L1B************/

        const divMG = `<div class="max_guest">${placeObj.max_guest} Guest${placeObj.max_guest !== 1 ? 's' : ''}</div>`;
        const divNR = `<div class="number_rooms">${placeObj.number_rooms} Bedroom${placeObj.number_rooms !== 1 ? 's' : ''}</div>`;
        const divNB = `<div class="number_bathrooms">${placeObj.number_bathrooms} Bathroom${placeObj.number_bathrooms !== 1 ? 's' : ''}</div>`;
        $('section.places article div.information').append(divMG, divNR, divNB);
        /** **********L2C-E**********/

        // alert(placeObj.description);
        const divDESC = `<div class="description">${placeObj.description}</div>`;
        $('section.places article').append(divDESC);
        /** **********L1C************/
      }
    }
  });
});
