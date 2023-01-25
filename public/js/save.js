$(document).ready(function() {	
    $("#nogo").text("Loading Form...");
    $('.custom-radio-item input[type=radio]:checked').parent().addClass('checked');
    $('.custom-radio-item input[type=radio]:not(:checked)').parent().removeClass('checked');
    $('.custom-radio-item input[type=radio]').change(function() {
        $(this).parents('.custom-radio').find('.custom-radio-item').removeClass('checked');
        $(this).parent().addClass('checked');
    });

	var $document = $(document);
    var selector = '[data-rangeslider]';
    var $element = $(selector);

    var isProgramPage = document.location.pathname.includes('program');
    var useSqftSlider = isProgramPage && new URL(document.location.href).searchParams.get('slider') === 'sqf';
    if (useSqftSlider) {
      $('#footage-headline > strong').text('What\'s your Approximate Home Square Footage?');

      const min = 500;
      const max = 3500;
      const defaultValue = 2000;

      $('.footage .sliderLegendItem--start').text(`${min} sq.ft.`);
      $('.footage .sliderLegendItem--end').text(`${max}+ sq.ft.`);
      $('#unit-pre').text('');
      $('#unit-post').text(' sq.ft.');
      $('#output').text(defaultValue)
      $('#range-slider').attr({
        max,
        min,
        value: defaultValue
      });
    }

    var textContent = ('textContent' in document) ? 'textContent' : 'innerText';

    function valueOutput(element) {
        var value = element.value;
        var output = element.parentNode.getElementsByTagName('output')[0] || element.parentNode.parentNode.getElementsByTagName('output')[0];
     
	if(value==element.max)
	value=value+'+';
	 output[textContent] = value;

    }

    $document.on('input', 'input[type="range"], ' + selector, function(e) {
		if($(this).attr('name') == 'monthly_elec'){			
			var a = 19/799;
			var b = a * $(this).val();
			var c;
			if($(this).val() == 101){
				var c = 50.5 + b - 2.5;	
			}else{
				var c = 50.5 + b;	
			}
			
			$('.status-indicator .inner .indicator').css('left', c + '%');
		}		
				
        valueOutput(e.target);
    });

    $element.rangeslider({
        polyfill: false,
        onInit: function() {
            valueOutput(this.$element[0]);
			setTimeout(function(){
				$element.trigger('change');
			},0);
			
        }
    });

	const inputElement = document.getElementById('phone');
	inputElement.maxLength = 14
  	inputElement.addEventListener('paste', function (e) {
    	e.preventDefault();

    	let phoneNumber = (e.clipboardData || window.clipboardData).getData('text');
    	e.target.value = phoneNumber

    	formatToPhone(e)
  	})
	inputElement.addEventListener('keydown', function (e) {
		if (e.ctrlKey || e.metaKey) {
			return false;
		}

		enforceFormat(e)
		formatToPhone(e)
	});
	inputElement.addEventListener('keyup', function (e) {
		if (e.ctrlKey || e.metaKey) {
			return false;
		}

    	formatToPhone(e)
  	});

});

$(document).ready(function() {	
	var isEmptyUtil = false
	var swiper = new Swiper('.swiper-container.banner-slider', {
        autoHeight: true,
        allowTouchMove: false,
        observer: true,
        observeParents: true,
        effect: 'fade',
		navigation: {
		    nextEl: '.nextSlide2',
            prevEl: '.prevSlide2'
		},
     	navigationClickable: true,
        on: {
                init: function () {
    	            $("#nogo").hide();
                }
            }
    });
	
	totalStep = $('.swiper-container.banner-slider .swiper-slide').length;
	currentStep = 1;
	percentComplete = Math.round(currentStep * 100 / totalStep);
	
	$('.progress .progress-bar').css({'width':percentComplete+'%'});
	$('.progress .progress-bar').attr('fill', percentComplete);
    $('.progress-block .progress-width').html(percentComplete+'%');
	
	swiper.on('transitionEnd', function() {			
		if(swiper.realIndex == 1){
			$('.status-indicator').removeClass('js-great js-amazing js-massive');
			$('.status-indicator').addClass('js-great');
			$('.status span').text('Great');
			loadSeonScript()
		}				
		
		if(swiper.realIndex == 3){
			$('.status-indicator').removeClass('js-great js-amazing js-massive');
			$('.status-indicator').addClass('js-amazing');
			$('.status span').text('Amazing');
		}
		
		if(swiper.realIndex == 4){
			$('.status-indicator').removeClass('js-great js-amazing js-massive');
			$('.status-indicator').addClass('js-massive');
			$('.status span').text('Massive');
		}		
		
		if (swiper.realIndex == 0) {
			$('.progress-block').hide();
			$('.status-indicator').hide();
            $('.wrapper').addClass('show');
            $('.btn-block').addClass('hide');
		} else {
			$('.progress-block').show();
			$('.status-indicator').show();
            $('.wrapper').removeClass('show');
            $('.btn-block').removeClass('hide');
		}
		
		totalStep = swiper.slides.length;
		currentStep = swiper.realIndex;
		percentComplete = Math.round(currentStep * 100 / totalStep);
		$('.progress .progress-bar').css({'width':percentComplete+'%'});
        $('.progress .progress-bar').attr('fill', percentComplete);
		$('.progress-block .progress-width').html(percentComplete+'%');
	});
    
    	swiper.on('transitionStart', function() {
		$('.step-loading').fadeIn();
		setTimeout(function(){
			$('.step-loading').fadeOut();
		},1500);
	});
	
	swiper.on('slideChange', function(event) {
		if([2,4,7].indexOf(swiper.realIndex)>=0)
		{
			$('.nextSlide').hide();
		}
		else
		{
			if(swiper.realIndex>0)
			$('.nextSlide').show();
		}

	window.scrollTo(0,0);

		if(isEmptyUtil) {
			$("#util-other").prop("checked", true)
			if(event.realIndex==2) {
				if(event.previousIndex > event.realIndex){
					return this.slidePrev()
				} 
				this.slideNext()
			}
		}

    	document.activeElement.blur();
	});
	swiper.on('slideChange', hideNextByIndex);
	swiper.on('slideChange', function(event) {
		const stepToValidate = event.realIndex - 1;
		var noErrors = true;

        if (stepToValidate == 2) {
            const utilityCompany = $('input[name="electric_utility"]:checked');
            if (!utilityCompany || !utilityCompany?.val()) {
                $('#companies-error').text('Select your utility provider');

                event.slideTo(2);
                noErrors = false;
            } else {
                $('#companies-error').text('');
            }
        }

		if (stepToValidate == 3) {
			const address = $('#autoaddress').val()
			if (address.length == 0 || !hasNumber(address) || !hasAlphabet(address) || address.includes('@')) {
				$('#autoaddress').addClass('input-error');
				$('#address-error').text('Your address must contain letter and numbers');

				event.slideTo(3);
				noErrors = false;
			}
		}

        if (stepToValidate == 4) {
            const shade = $('input[name="shade"]:checked');
            if (!shade || !shade?.val()) {
                $('#shade-error').text('Select the amount of sunlight your roof gets');

                event.slideTo(4);
                noErrors = false;
            } else {
                $('#shade-error').text('');
            }
        }

		if (stepToValidate == 5) {
			$('#email').val($.trim($('#email').val()));

			if (!isEmail($('#email').val())) {
				$('#email').addClass('input-error');
				$('#email-error').text('Please Enter a Valid Email Address');
				event.slideTo(5);
				noErrors = false;
			}
		}

		if (stepToValidate == 6) {
			$('#fname').val($.trim($('#fname').val()));
			$('#lname').val($.trim($('#lname').val()));

			if (($('#fname').val().length == 0)) {
				$('#fname').addClass('input-error');
				$('#fname-error').text('Please Enter Your First Name');
				event.slideTo(6);
				noErrors = false;
			}
			else if (($('#lname').val().length == 0)) {
				$('#lname').addClass('input-error');
				$('#lname-error').text('Please Enter Your Last Name');
				event.slideTo(6);
				noErrors = false;
			}
		}

		if (!noErrors) {
			window.dispatchEvent(new Event('resize'));
		}
	})

	$('.prevSlide').click(function(event){
		$(this).blur();
		swiper.slidePrev();
		window.scrollTo(0,0);
	});

	$('.nextSlide').click(function() {
        if (isStepWithHiddenNext(swiper.realIndex)) return;

		swiper.slideNext();
	})

	$('#zip,#email,#fname,#lname,#phone,#autoaddress').on('input',function(e){
			$(this).removeClass('input-error');
			$('.error-msg').html('');
	});


	$('#consent').on('change',function(e){
			$('#cmark').removeClass('input-error');
			$('#clabel').css('border-bottom',"0px");
	});

	const apiUrl = 'https://api.sunvalue.com/api'
	
	$('#calculateYourSavings').click(function() {
		$(this).blur();

        if (swiper.realIndex !== 0) return;

		validateZip(apiUrl, $("#zip").val(), (isValidZip, address) => {
			if(isValidZip)
			{
							$('#cdiv').hide();
				swiper.slideNext();
				$('#zip').removeClass('input-error');		
				$('#zip-error').text('');		
	
				$.get(`${apiUrl}/utilcos?zip=`+$('#zip').val(), function(data){
					isEmptyUtil = data.length === 0
					$("#companies").empty();
					for(var i=0;i<data.length;i++){		
						$('<div class="custom-radio-item radioNext"><input type="radio" name="electric_utility" value="'+ data[i].name+'">'+data[i].name+'</div>').appendTo("#companies");						
					}
					$('<div class="custom-radio-item radioNext"><input id="util-other" type="radio" name="electric_utility" value="Other">Other</div>').appendTo("#companies");						
				});
	
								$("#city").val(address.city);
								$('#state').val(address.state_id);
                $(`<input id="state_name" type="hidden" name="state_name" value="${address.state_name}" />`).appendTo('body')
							
		
			}
			else
			{
				$('#zip').focus();
			}
			window.dispatchEvent(new Event('resize'));
		})

	});	


	$('.radioNext').click(function(){
    	if (swiper.realIndex === 4) swiper.slideNext();
	});	

	$('#companies').on('click', '.radioNext', function(){
    	if (swiper.realIndex === 2) swiper.slideNext();
	});

	const params = (new URL(document.location)).searchParams;




	$('<input>')
		.attr({type: 'hidden',value: params.get('r') ,name: 'lp_request_id' })
		.appendTo('#solarForm')

	for (let i = 1; i <= 5; i++) {
		$('<input>')
		.attr({type: 'hidden', value: params.get(`s${i}`), name: `lp_s${i}` })
		.appendTo('#solarForm')
	}

	if (params.get('id')) {
		$('#header-empty-id').css('display', 'none')
		$('#header-with-id').css('display', 'block')
	}

	$('form#solarForm').on('submit', function(e){
		e.preventDefault();

		if(!isValidPhone($('#phone').val()))
		{
			$('#phone').addClass('input-error');
			$('#phone-error').text('Please Enter a Valid US Phone Number');	
			noErrors=false;
			window.dispatchEvent(new Event('resize'));
		}
		else
		{
				$('.banner-slider,.progress-block,.btn-block').addClass('d-none');
				$('.report-block').removeClass('d-none');


		if($.trim($("input[name=electric_utility]","#solarForm").val()).length==0)
		$("input[name=electric_utility]","#solarForm").val('Other');
		

		var frm=$("#solarForm");


		var params = (new URL(document.location)).searchParams

		var blockList = ['GA', 'YT', 'PM']
		
		if(params.get('s') && blockList.indexOf(params.get('s')) === -1){
			return postToSeon(frm, apiUrl, function (error, data) {
				if (error) console.log(error)

        		const seonTransactionID = data?.data?.id || null;
				postToLeadspediaTrack(frm, apiUrl, seonTransactionID);
				return;
			})
		}

		// hold for 24 hours
		var fdMetric = window.localStorage.getItem('fd_metric')
		if (fdMetric){
			fdMetric = JSON.parse(fdMetric)

			if(fdMetric.dec > 1) {
				var hourDiff = Math.floor(Math.abs((new Date(fdMetric.dec_t)-new Date()))/36e5)

				// 5 second fake loader
				if(hourDiff < 24){
					return setTimeout(() => {
						retryFromEmail(swiper)
						return;
					}, 5000);
				}

				window.localStorage.removeItem('fd_metric')
			}
		}

		postToSeon(frm, apiUrl, function (error, data) {
      // Ignore SEON if response when response error has -
      // status of `503` and in response data property `code` is set to `SEON_COOLDOWN`
      // This indicates that SEON endpoint on our API is in cooldown. refer to #208 for more details.
      // OR
      // status of `408` and `code` set to `SEON_TIMEOUT`
      // This indicates that SEON request was timeout (currently 4000ms)

      // Above cases are already covered as we are ignoring error from this callback above. 

			if (error) console.log(error)

      		let seonTransactionID = null;
      if (data) {
			  var state = data.data.state;
        	  seonTransactionID = data.data?.id;

			  if(state === 'DECLINE') {
				  retryFromEmail(swiper)
				  return;
			  }
      }

			noErrors=true;
			postToLeadspediaTrack(frm, apiUrl, seonTransactionID);
			return;
		})

		}
	});	

	$(window).resize(function () {
		var sliderBtns = $('#slider-block')
		var sliderNext = sliderBtns.find('a:nth-child(2)')
		var onlyNext = $('#next-block')
		var onlyNextBtn = onlyNext.find('a')

		if ($(window).width() < 1024) {

			sliderNext.addClass('btn nextSlide')
			sliderNext.removeClass('d-none')
			onlyNext.removeClass('btn-block')
			onlyNextBtn.removeClass('nextSlide btn')
			onlyNext.addClass('d-none')
			hideNextByIndex()
			return
		}
		sliderNext.removeClass('btn nextSlide')
		sliderNext.addClass('d-none')
		onlyNext.addClass('btn-block')
		onlyNextBtn.addClass('btn nextSlide')
		onlyNext.removeClass('d-none')
		hideNextByIndex()
	})

	function hideNextByIndex(){
		window.scrollTo(0,0);
		if([2,4,7].indexOf(swiper.realIndex)>=0){
			$('.nextSlide').hide();
			return
		}
		if(swiper.realIndex>0)$('.nextSlide').show();
	}
});

function isNumberKey(evt){
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}

function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

function isValidPhone(phone) {
  var regex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
  return regex.test(phone);
}

$(function(){
	setTimeout(function(){
		var tcpa = $("#leadid_tcpa_disclosure");
		if(!tcpa.val()){
			var text = $("#tcpa_label").text().replace(/^\s+|\s+$/g, '');
			tcpa.val(text);
		}
	}, 2000);
});


const isNumericInput = (event) => {
	const key = event.keyCode;
	return ((key >= 48 && key <= 57) || // Allow number line
		(key >= 96 && key <= 105) // Allow number pad
	);
};

const isModifierKey = (event) => {
	const key = event.keyCode;
	return (event.shiftKey === true || key === 35 || key === 36) || // Allow Shift, Home, End
		(key === 8 || key === 9 || key === 13 || key === 46) || // Allow Backspace, Tab, Enter, Delete
		(key > 36 && key < 41) || // Allow left, up, right, down
		(
			// Allow Ctrl/Command + A,C,V,X,Z
			(event.ctrlKey === true || event.metaKey === true) &&
			(key === 65 || key === 67 || key === 86 || key === 88 || key === 90)
		)
};

const enforceFormat = (event) => {
	// Input must be of a valid number format or a modifier key
	if(!isNumericInput(event) && !isModifierKey(event)){
		event.preventDefault();
	}
};

const formatToPhone = (event) => {
	if(isModifierKey(event)) {return;}

	// I am lazy and don't like to type things more than once
	const target = event.target;
	const input = event.target.value.replace(/(^\+[1-2])|\D/g,'').substring(0,10); // First ten digits of input only
	const zip = input.substring(0,3);
	const middle = input.substring(3,6);
	const last = input.substring(6,10);

	if(input.length > 6){target.value = `(${zip}) ${middle}-${last}`;}
	else if(input.length > 3){target.value = `(${zip}) ${middle}`;}
	else if(input.length > 0){target.value = `(${zip}`;}
};

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}


$(function(){
	const zip = getParameterByName('zip')

	if(zip){
		$('#zip').val(zip)
		$("#calculateYourSavings").click();
	}
});

function postToLeadspediaTrack (frm, apiUrl, seonTransactionID){
	var data = convertToJSONBySnakeCamel(frm);
  	data.seonTransactionID = seonTransactionID;
	data.fbc = getCookie('_fbc')
	data.fbp = getCookie('_fbp')
	$.ajax({
		contentType: 'application/json',
		type: "POST",
		url: `${apiUrl}/leadspedia/lead`,
		dataType: 'json',
		data: JSON.stringify(data),
		success: function(data, status){

			const lander = frm
			.serializeArray()
			.find(e=>e.name==='landing_page')
			.value


			if(status==='success' && data.lead_id){
				getAndSetLeadSoldInfo(apiUrl, data.lead_id, function () {
					location.href = (data.redirect !== undefined) 
					? data.redirect 
					:  `/thankyou/?id=${data.lead_id}&lander=${lander}`;
				});
				return;
			}

			msgs="There were some errors in your submission\n* "+Object.values(data.errors).join("\n* ");
			console.log (msgs);
			$("#processor-title").text("Error");
			$("#processor").hide();
			$("#sub-title").hide();

			
		},
		error: function(e, stat){
			var msg=e && e.responseJSON && e.responseJSON.message ? e.responseJSON.message : stat;
			msg=msg.split("(")[0];
			console.log("Networking error. Try to submit again in 10 seconds. \n\nError: "+msg);
			$("#processor-title").text("Networking Error");
			$("#processor").hide();
			$("#sub-title").hide();
		}
	})
}

function convertFormToJSON(form) {
	const array = $(form).serializeArray();
	const json = {};
	$.each(array, function () {
	  json[this.name] = this.value || "";
	});
	json.full_name = json.first_name + " " + json.last_name;
	return json;
}

function snakeToCamel (str = '') {
	return str
	.toLowerCase()
	.replace(/[-_][a-z0-9]/g, (group) => group.slice(-1).toUpperCase());
}

function convertToJSONBySnakeCamel (form){
	const array = $(form).serializeArray();
	const json = {};
	$.each(array, function () {
		json[!this.name.includes('_') ? this.name : snakeToCamel(this.name)] = this.value || "";
	});
	json.fullName = json.firstName + " " + json.lastName;
	return json;
} 

function getFraudData(form, ip ='') {
	var jsonForm = convertFormToJSON(form);
  	var stateName = $('#state_name').val()
	return {
		config: {
			ip: {
				include: "flags,history,id",
				version: "v1.1"
			},
			email: {
				include: "flags,history,id",
				version: "v2.2"
			},
			phone: {
				"include": "flags,history,id,cnam_lookup,hlr_details",
				"version": "v1.4"
			},
			"ip_api": true,
			"email_api": true,
			"phone_api": true,
			"device_fingerprinting": true
		},
		ip,
		email: jsonForm.email,
		email_domain: jsonForm.email.split('@')[1],
		user_fullname: jsonForm.full_name,
		user_created: (new Date()).valueOf(),
		user_country: jsonForm.country,
		user_city: jsonForm.city,
		user_region: jsonForm.state,
		user_zip: jsonForm.zip,
		user_street: jsonForm.street,
		phone_number: `+1${jsonForm.phone_number.replace(/[-()\s]/g, '')}`,
		custom_fields: {
			source: (new URL(window.document.location)).searchParams.get('s'),
			state: stateName,
			r: jsonForm.lp_request_id,
			s1: jsonForm.lp_s1,
			s2: jsonForm.lp_s2,
			s3: jsonForm.lp_s3,
			s4: jsonForm.lp_s4,
			s5: jsonForm.lp_s5,
		},
		session_id: window.seon_session_id || '',
		session: window.seon_session || '',
		details_url: window.location.href.slice(window.location.protocol.length+2, 100)
	}
}

function getAndSetLeadSoldInfo(apiUrl, leadId, onComplete) {
	$.ajax({
		type: "GET",
		url: `${apiUrl}/leadspedia/getSoldInfo?leadId=${leadId}`,
		success: function (data, status, xhr) {
			if (status == 'success') {
				const soldInfo = data.response?.data[0]
				if (soldInfo) {
					window.sessionStorage.setItem(`lead_${leadId}`, JSON.stringify(soldInfo))
				}
			}
		},
		error: function (xhr, status, error) {
			console.log(error)
		},
		complete: function () {
			onComplete()
		}
	})
}

function validateZipAgainstDB(apiUrl, zip, cb) {
	$.ajax({
		type: "GET",
		url: `${apiUrl}/address?zip=${zip}`,
		success: function (data, status, xhr) {
			if (!data || (Array.isArray(data) && data.length === 0)) {
				console.log(xhr)
				cb(false)

				return
			}

			if(data.redirectUrl) return location.href = data.redirectUrl

			cb(true, data)
		},
		error: function (xhr, status, error) {
			console.log(error)

			cb(false)
		},
	})
}

function validateZip(apiUrl, zip, cb) {
	function toggleLoading() {
		$('#calculateYourSavings')
			.toggleClass('btn-loading')
			.prop('disabled', (_, val) => !val)

		$('#calculateYourSavings > span')
			.text((_, text) => {
				const defaultBtnText = window.location.href.includes('save') ? 'Next' : 'Calculate'
				if (text === defaultBtnText) {
					return 'Validating Zip...'
				}

				return defaultBtnText
			})

		$('#calculateYourSavings > div')
			.toggleClass('loader-hidden loader')
	}

	if(zip == ''){
		$('#zip').addClass('input-error');
		$('#zip-error').text('this field is required');		

		cb(false)
		return
	}

	if(zip.trim().length != 5){
		$('#zip').addClass('input-error');
		$('#zip-error').text('enter 5 digits zip code');		

		cb(false)
		return
	}
	
	toggleLoading()
	validateZipAgainstDB(apiUrl, zip, function(isValid, address) {
		if (!isValid) {
			$('#zip').addClass('input-error');
			$('#zip-error').text('Please enter a valid U.S. zip code');		
		}

		toggleLoading()
		cb(isValid, address)
	})
}

function loadSeonScript () {
	$.getScript('https://cdnjs.cloudflare.com/ajax/libs/uuid/8.2.0/uuidv4.min.js',  function() {
		$.getScript('https://cdn.seondf.com/js/v5/agent.js', function () {
			window.seon_session_id = uuidv4();
			seon.config({
				host: "seondf.com",
				session_id: window.seon_session_id,
				audio_fingerprint: true,
				canvas_fingerprint: true,
				webgl_fingerprint: true,
				onSuccess: async function(message) {
					window.seon_session = await seon.getBase64Session()
					console.log(message)
				},
				onError: function(message) {
					console.log("error", message);
				}
			});
		})
	})
}

function postToSeon (frm, apiUrl, cb) {
	$.ajax({
		contentType: 'application/json',
		url: `${apiUrl}/seon/lead`,
		type: 'POST',
		data: JSON.stringify(getFraudData(frm)),
		dataType: 'json',
		success: function (data) {
			cb(null, data)
		},
		error: (xhr,status,error) => {
			cb(error)
		},
	});
}

function retryFromEmail(swiper) {
	swiper.slideTo(5) // back to email
	$('.banner-slider,.progress-block,.btn-block').removeClass('d-none');
	$('.report-block').addClass('d-none');
	$('#email').addClass('input-error');
	$('#email-error').css("color","red");
	$('#email-error').text('Please Enter a Valid Email Address');

	noErrors=false;

	var fdMetric = window.localStorage.getItem('fd_metric')

	// set first decline if empty
	if(!fdMetric){
		window.localStorage.setItem('fd_metric', JSON.stringify({ dec: 1, dec_t: Date.now()}));
		return;
	}

	//  update decline count & timer
	fdMetric = JSON.parse(fdMetric)
	window.localStorage.setItem('fd_metric',  JSON.stringify({ dec: fdMetric.dec + 1, dec_t: Date.now()}))
}

function hasAlphabet(input) {
  return /[a-z]/i.test(input)
}

function hasNumber(input) {
  return /[0-9]/.test(input)
}

function getCookie(name){
	return Object
		.fromEntries(document.cookie.split('; ')
		.map(v=>v.split(/=(.*)/s)
		.map(decodeURIComponent)))[name]
}

function isStepWithHiddenNext(currentStep) {
  return [2,4,7].indexOf(currentStep) >= 0;
}
