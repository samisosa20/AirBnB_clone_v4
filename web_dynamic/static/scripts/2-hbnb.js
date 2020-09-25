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

	$.get("http://ed0050123a1d.19.hbtn-cod.io:5000/api/v1/status/", function (data) {
		if (data.status === 'OK')
			$('DIV#api_status').removeClass('disabled').addClass('available');
		else
			$('DIV#api_status').removeClass('available').addClass('disabled');
	});
});
