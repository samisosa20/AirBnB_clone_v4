$(document).ready(() => {
	let amenityId = {};
	$("INPUT").change(function() {
		if (this.checked) {
			amenityId[$(this).attr("data-id")] = $(this).attr("data-name");
		} else {
			delete amenityId[$(this).attr("data-id")];
		}
		console.log(amenityId);
	});
});
