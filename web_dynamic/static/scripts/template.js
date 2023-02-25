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
