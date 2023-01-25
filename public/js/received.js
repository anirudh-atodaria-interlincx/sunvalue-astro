$(document).ready(function() {
    // fixed header
    $(window).scroll(function() {
        if ($(window).scrollTop() >= 50) {
            $('.site-header').addClass('fixed');
        } else {
            $('.site-header').removeClass('fixed');
        }
    });
    if ($(window).scrollTop() >= 50) {
        $('.site-header').addClass('fixed');
    } else {
        $('.site-header').removeClass('fixed');
    }

    $('.animation').viewportChecker({
		classToAdd: 'in-viewport',
		offset: 50,
		callbackFunction: function(elem) {
			var time = elem.data('delay') || 0;
			setInterval(function(){
				elem.addClass('go');
			},time);
		}
    });

	const params = (new URL(document.location)).searchParams
	const apiUrl = 'https://api.sunvalue.com/api'

	$.ajax({
		type: "GET",
		url: `${apiUrl}/leadspedia/getSoldInfo?leadId=${params.get('id')}`,
		success: function (data, status, xhr) {
			if (status == 'success') {
				window.dataLayer.push({
					'event': 'pageview',
					'pageTitle': 'Received',
					'pagePath': '/received/',
					'price': data.response.data[0].price || 0,
				});
			}
		},
		error: function (xhr, status, error) {
			console.log(error)
		}
	})

});
