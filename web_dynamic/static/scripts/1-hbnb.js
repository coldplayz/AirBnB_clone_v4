const $ = window.$

let amenityIds = []

$(document).ready(function () {
  $('div.amenities li[type="checkbox"]').on('click', function () {
    if (this.checked === true) {
      amenityIds.push(this.data-id);
    } else {
      // Checkbox unchecked
      if (amenityIds.includes(this.data-id)) {
        // Delete the id in a way that actually affects the array length
        amenityIds.splice(amenityIds.indexOf(this.data-id), 1);
      }
    }
    
    // Update h4 tag
    $('.amenities h4').text(amenityIds.join(', '));
  });
});
