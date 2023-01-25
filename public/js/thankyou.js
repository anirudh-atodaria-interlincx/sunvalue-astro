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

    $(window).resize(function(){
        if($(window).width() > 1023){
          $(".content-wrapper").removeClass('menu-open')
        }
    });

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

	handleVersion(params)

	$.ajax({
		type: "GET",
		url: `${apiUrl}/leadspedia/getLeadInfo?leadId=${params.get('id')}`,
		success: function (data, status, xhr) {
			if (status == 'success' && data.success) {
				if (data.data?.sold ==='Yes') {
					$('body').show();
					window.dispatchEvent(new Event('resize'));
					return;
				}
				window.location.replace(`/received/${window.location.search}`)
				return;
			}
			window.location.replace(`/404`)
		},
		error: function (xhr, status, error) {
			console.log(error)
		}
	})
});

function handleVersion(params){
	if(params.get('v')==='2') {
		let soldInfo = window.sessionStorage.getItem(`lead_${leadId}`)
		soldInfo = JSON.parse(soldInfo) || {}

		$('<link/>', getStyle('/css/style.css')).appendTo('head');
		$('<link/>', getStyle('/css/flipdown.css')).appendTo('head');

		$('#default-step').hide()
		$('#v2-step').show()

		const acceptedIds = ['3', '4', '6', '7']

		if(acceptedIds.includes(soldInfo.buyerID)){
			$('#buyer-block').show()
			$('#buyer-logo').attr('src', `/images/logo-${soldInfo.buyerID}.png`)
		}
	
		if(soldInfo.buyerID === '3') {
			$('#call-now').show().attr('href', 'tel:2133388980')
		}

		$.getScript( "/js/flipdown.js", function() {
			new FlipDown((new Date().getTime() / 1000) + (43200) + 1).start();
		});

		window.sessionStorage.removeItem(`lead_${leadId}`)
	}

	function getStyle(path){
		return { rel: 'stylesheet', type: 'text/css', href: path }
	}

}
