$(document).ready(() => {
  const amenityId = {};
  const statesId = {};
  const citiesId = {};

  // API status
  $.get('http://ed0050123a1d.19.hbtn-cod.io:5000/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('DIV#api_status').removeClass('disabled').addClass('available');
    } else {
      $('DIV#api_status').removeClass('available').addClass('disabled');
    }
  });

  // Filter checkbox amenities
  $('.amenities INPUT').change(function () {
    if (this.checked) {
      amenityId[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete amenityId[$(this).attr('data-id')];
    }
    $('.amenities H4').html(Object.values(amenityId).join(', '));
  });

  // Filter checkbox states
  $('.locations ul li h2 INPUT').change(function () {
    if (this.checked) {
      statesId[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete statesId[$(this).attr('data-id')];
    }
    $('.locations H4').html(Object.values(statesId).join(', ') + ', ' + Object.values(citiesId).join(', '));
  });

  // Filter checkbox cities
  $('.locations ul li ul li INPUT').change(function () {
    if (this.checked) {
      citiesId[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete citiesId[$(this).attr('data-id')];
    }
    $('.locations H4').html(Object.values(citiesId).join(', ') + ', ' + Object.values(statesId).join(', '));
  });

  $.ajax({
    url: 'http://ed0050123a1d.19.hbtn-cod.io:5000/api/v1/places_search/',
    type: 'post',
    data: '{}',
    headers: { 'Content-Type': 'application/json' },
    dataType: 'json',
    success: function (data) {
      // console.log(data);
      let places = '';
      let description = '';
      let guest = '';
      let bath = '';
      let bed = '';
      $.each(data, function (index, value) {
        description = value.description === null ? 'None' : value.description;
        guest = value.max_guest > 1 ? 'Guests' : 'Guest';
        bath = value.number_bathrooms > 1 ? 'Bathrooms' : 'Bathroom';
        bed = value.number_rooms > 1 ? 'Bedrooms' : 'Bedroom';
        places =
                    places +
                    '<article>' +
                    "<div class='title_box'>" +
                    '<h2>' +
                    value.name +
                    '</h2>' +
                    "<div class='price_by_night'>" +
                    value.price_by_night +
                    '</div>' +
                    '</div>' +
                    "<div class='information'>" +
                    "<div class='max_guest'>" +
                    value.max_guest +
                    ' ' + guest + '</div>' +
                    "<div class='number_rooms'>" +
                    value.number_rooms +
                    ' ' + bed + '</div>' +
                    "<div class='number_bathrooms'>" +
                    value.number_bathrooms +
                    ' ' + bath + '</div>' +
                    '</div>' +
                    "<div class='user'>" +
                    '<b>Owner:</b> ' +
                    value.user_first_name +
                    ' ' + value.user_last_name +
                    '</div>' +
                    "<div class='description'>" +
                    description +
                    '</div>' +
                    '</article>';
      });
      $('.places').html(places);
    }
  });

  $('.filters button').click(function () {
    console.log(amenityId);
    $.ajax({
      url: 'http://ed0050123a1d.19.hbtn-cod.io:5000/api/v1/places_search/',
      type: 'post',
      data: JSON.stringify({ amenities: amenityId, cities: citiesId, states: statesId }),
      headers: { 'Content-Type': 'application/json' },
      dataType: 'json',
      success: function (data) {
        console.log(data);
        let places = '';
        let description = '';
        let guest = '';
        let bath = '';
        let bed = '';
        $.each(data, function (index, value) {
          description = value.description === null ? 'None' : value.description;
          guest = value.max_guest > 1 ? 'Guests' : 'Guest';
          bath = value.number_bathrooms > 1 ? 'Bathrooms' : 'Bathroom';
          bed = value.number_rooms > 1 ? 'Bedrooms' : 'Bedroom';
          places =
                        places +
                        '<article>' +
                        "<div class='title_box'>" +
                        '<h2>' +
                        value.name +
                        '</h2>' +
                        "<div class='price_by_night'>" +
                        value.price_by_night +
                        '</div>' +
                        '</div>' +
                        "<div class='information'>" +
                        "<div class='max_guest'>" +
                        value.max_guest +
                        ' ' + guest + '</div>' +
                        "<div class='number_rooms'>" +
                        value.number_rooms +
                        ' ' + bed + '</div>' +
                        "<div class='number_bathrooms'>" +
                        value.number_bathrooms +
                        ' ' + bath + '</div>' +
                        '</div>' +
                        "<div class='user'>" +
                        '<b>Owner:</b> ' +
                        value.user_first_name +
                        ' ' + value.user_last_name +
                        '</div>' +
                        "<div class='description'>" +
                        description +
                        '</div>' +
                        '</article>';
        });
        $('.places').html(places);
      }
    });
  });
});
