$(document).ready(() => {
  const amenityId = {};
  $('.amenities INPUT').change(function () {
    if (this.checked) {
      amenityId[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete amenityId[$(this).attr('data-id')];
    }
    $('.amenities H4').html(Object.values(amenityId).join(', '));
  });
});
