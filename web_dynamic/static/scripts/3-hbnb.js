$(document).ready(() => {
  let amenityId = {};
  $(".amenities INPUT").change(function () {
    if (this.checked) {
      amenityId[$(this).attr("data-id")] = $(this).attr("data-name");
    } else {
      delete amenityId[$(this).attr("data-id")];
    }
    $(".amenities H4").html(Object.values(amenityId).join(", "));
  });

  $.get("http://ed0050123a1d.19.hbtn-cod.io:5000/api/v1/status/", function (
    data
  ) {
    if (data.status === "OK")
      $("DIV#api_status").removeClass("disabled").addClass("available");
    else $("DIV#api_status").removeClass("available").addClass("disabled");
  });

  $.get(
    "http://ed0050123a1d.19.hbtn-cod.io:5000/api/v1/places_search/",
    function (data) {
      $(".places").html("");
      //console.log(data);
      let places = "";
      $.each(data, function (index, value) {
        places =
          places +
          "<article>" +
          "<div class='title_box'>" +
          "<h2>" +
          value.name +
          "</h2>" +
          "<div class='price_by_night'>" +
          value.price_by_night +
          "</div>" +
          "</div>" +
          "<div class='information'>" +
          "<div class='max_guest'>" +
          value.max_guest +
          " Guests</div>" +
          "<div class='number_rooms'>" +
          value.number_rooms +
          " Bedrooms</div>" +
          "<div class='number_bathrooms'>" +
          value.number_bathrooms +
          " Bathrooms</div>" +
          "</div>" +
          "<div class='user'>" +
          "<b>Owner:</b> " +
          value.user.first_name +
          " " +
          value.user.last_name +
          "</div>" +
          "<div class='description'>" +
          value.description +
          "</div>" +
          "</article>";
      });
      $(".places").append(places);
    },
    "json"
  );
});
