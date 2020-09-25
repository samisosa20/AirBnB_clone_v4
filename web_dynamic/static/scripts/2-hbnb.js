$(document).ready(() => {
	let amenityId = {};
	$(".amenities INPUT").change(function() {
		if (this.checked) {
			amenityId[$(this).attr("data-id")] = $(this).attr("data-name");
		} else {
			delete amenityId[$(this).attr("data-id")];
		}
		$(".amenities H4").html(Object.values(amenityId).join(', '));
	});

	$.get("http://0.0.0.0:5001/api/v1/status/", function (data) {
		if (data.status === 200)
			$('DIV#api_status').removeClass('disabled').addClass('available');
		else
			$('DIV#api_status').removeClass('available').addClass('disabled');
	});
});
