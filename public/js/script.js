$(document).ready(function() {
	// fixed header

	var gRecaptchaKey3 = document.location.hostname.match('sunvalue.com') 
	? '6LdjtT4jAAAAAAXAYGvliijdNk95NHqHQ2alubLN'
	: '6LdHS4IjAAAAAJs5wdnT6bBIhZbo62mFMWkH2tdy'  // for automated testing

	var gRecaptchaKey2 = document.location.hostname.match('sunvalue.com') 
	? '6LeY4X0jAAAAADgo8Ugrk8rHcV0kL8chMjr0XuNq'
	: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'  // for automated testing

	$.ajax({
		url: `https://www.google.com/recaptcha/api.js?render=${gRecaptchaKey3}`,
		dataType: 'script',
		success: function () {
			grecaptcha.ready(() => {
				grecaptcha.render('recaptcha2', {
				   'sitekey' : gRecaptchaKey2,
				});
			});
		}
	});

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

    $(".menu-btn").click(function(){
        $(".menu-btn, .main-menu").toggleClass("active");
        $(".content-wrapper").toggleClass("menu-open")
    });

    $(window).resize(function(){
        if($(window).width() > 1023){
          $(".menu-btn, .main-menu").removeClass('active');
          $(".content-wrapper").removeClass('menu-open')
        }
    });

    $('.main-menu li a[href^="#"]').on('click', function (e) {
	    e.preventDefault();
	    $('html, body').animate({
	        scrollTop: $($.attr(this, 'href')).offset().top
	    }, 500);
	});

	$('.accordian-title').click(function(){
		$('.accordian-title').removeClass('accordian-active');
		$('.accordian-content').slideUp();
		if(!$(this).next().is( ":visible" )){
			$(this).addClass('accordian-active');
			$(this).next().slideDown();
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
	
	$('.parallax-bg').viewportChecker({
		classToAdd: 'in-viewport',
		callbackFunction: function(elem) {
			startAnimation = true;
		}
    });

    $('.text-field').keyup(function(){
		if($(this).val()){
			$(this).addClass('active');
		}else{
			$(this).removeClass('active');
		}
	});
	
	$('.text-field').each(function(){
		if($(this).val()){
			$(this).addClass('active');
		}else{
			$(this).removeClass('active');
		}		
	});	
	
	startAnimation = false;

    $(window).on('scroll',function(e){
		if($(window).width() > 1023){
			if(startAnimation){
				console.log('here');
				var scrolled = $(window).scrollTop();
				
				var st = $(window).scrollTop();
				
				updateBackground($('.parallax-bg'));
			}
        }else{
            $('.parallax-bg').css('background-position', 'center top');
        }
    });
	
	var speed = 0.4;
	
	function updateBackground($el) {

        var diff = -$(window).scrollTop() + $el.offset().top;
        var yPos = -(diff * speed);

        var coords = '50% ' + yPos + 'px';

        $el.css({
            backgroundPosition: coords
        });
    }

	if($('.rangeslider-wrapper').length){
		var $document = $(document);
		var selector = '[data-rangeslider]';
		var $element = $(selector);

		var textContent = ('textContent' in document) ? 'textContent' : 'innerText';

		function valueOutput(element) {
			var value = element.value;
			var output = element.parentNode.getElementsByTagName('output')[0] || element.parentNode.parentNode.getElementsByTagName('output')[0];
			output[textContent] = value;
		}

		$document.on('input', 'input[type="range"], ' + selector, function(e) {
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
	}

	// step slider start
	var slider = $('.steps');
	
	$('.prev').click(function(){
		$(this).blur();
	    slider.slick('slickPrev');
		window.scrollTo(0,0);
	    return false;
	});

	$('form#solarForm').on('submit', function(e){
		e.preventDefault();
		if(!validateStep(8)) return false;
		submitForm()
	})

	$('.next').click(function(){
		$(this).blur()
     	    var step=$(this).attr('id').replace('next-','');
	    if(!validateStep(step))return false;

		if(step==1) loadSeonScript()    
	    if(step<8) slider.slick('slickNext');
	

	    window.scrollTo(0,0);

	    return false;
	});



	slider.on('beforeChange', function(event, slick, currentSlide, nextSlide){
		$('.step-loading').fadeIn();
		setTimeout(function(){
			$('.step-loading').fadeOut();
		},1500);
	});
	
	if($('.steps').length){
		$(".steps").slick({
			infinite:false,
			slidesToShow:1,
			slidesToScroll:1,
			dots:false,
			arrows:false,
			autoplay:false,
			draggable:false,
			swipe:false,
			waitForAnimate: false
		});
	}
	// step slider end

	// address field auto complete
	if($('#autoaddress').length){
		var searchInput = 'autoaddress';	
		var autocomplete;
		autocomplete = new google.maps.places.Autocomplete((document.getElementById(searchInput)), {
			types: ['geocode']
		   
		});
		google.maps.event.addListener(autocomplete, 'place_changed', function () {
			var near_place = autocomplete.getPlace();
		});
	}
	$(document).on('click', 'a[href^="#"]', function (event) {
		event.preventDefault();
		var slf = $(this).parent();
		$(".content-nav .nav-inner li").removeClass("active");
		slf.addClass("active");
	
		$('html, body').animate({
			scrollTop: $($.attr(this, 'href')).offset().top + (-135)
		}, 500);
	});

	var width1 = $(window).width();
			if (width1 < 768){
				$(document).on('click', 'a[href^="#"]', function (event) {
					event.preventDefault();
					if($(".nav-inner ul").hasClass("open")) {
						$(".nav-inner ul").slideUp("fast");
						$(".nav-inner ul").removeClass("open");
					}
					$('html, body').animate({
						scrollTop: $($.attr(this, 'href')).offset().top + (-70)
					}, 500);
				});
				$('.nav-inner .selected').click(function(){
					$(this).toggleClass("open");
					$(".nav-inner ul").addClass("open");
					$(".nav-inner ul").slideToggle("fast");
				});
			}
			var wwidth = $(window).width();
			if (wwidth > 767){
				$(".nav-inner ul").removeAttr('style');
			}
			$(window).resize(function() {
				var wwidth = $(window).width();
				if (wwidth > 767){
					$(".nav-inner ul").removeAttr('style');
				}
			});
	
	function validate($this){
		var output = true;
		$('span.error').text('');
		$('span.error').removeClass('popped');
		if($this.find("input[name='first_name']").val() == ''){
			$this.find("input[name='first_name']").next().next().text('this field is required').addClass('popped');
			output = false;
		}
		
		if(!isEmail($this.find("input[name='email']").val())){
			$this.find("input[name='email']").next().next().text('Please enter a valid email address').addClass('popped');
			output = false;
		}

		var captche2Elm = $this.find("textarea[name='g-recaptcha-response']")

		if(captche2Elm.val() == '' || !captche2Elm.length){
			$this.find("div.g-recaptcha").next().text('Please complete the captcha').addClass('popped')
			output = false;
		}
		return output;
	}
	
	
    // ccpa form submit
	const apiUrl = 'https://api.sunvalue.com/api'

	$('#ccpaForm').submit('click', function(e){
		e.preventDefault();
		var $this = $(this);
		const data = convertFormToJSON($this)
		const url = `${apiUrl}/send-mail/ccpa`
		$.ajax({
			contentType: 'application/json',
			type: "POST",
			url,
			dataType: 'json',
			data: JSON.stringify(data),
			success: function(data, status){

				if(status==='success'){
					location.href= data.redirectUrl
					alert(data.message)
					return;
				}
				alert(data.message ||'An error occoured please try again later.')
			},
			error: function(err){
				alert('An error occoured please try again later.')
				console.log(err)
			}
		})
	})

	// contact form send mail script
	$('#contactForm').submit(function(e){
		e.preventDefault();
		var $this = $(this);
		var data = convertFormToJSON($this)
		var $formMsg = $('.form-msg')
		var $submit = $this.find('#contact-submit')

		if(validate($this)){
			toggleSubmitLoader($submit, true)
			grecaptcha.ready(function() {
				$formMsg.removeClass('error')
				grecaptcha
					.execute(gRecaptchaKey3, {action: 'submit'})
					.then(function(token) {
						data.captchaToken = token
							postContact(apiUrl, data, function(err, msg){
								if(err) {
									toggleFormMsg($formMsg, true, err);
									toggleSubmitLoader($submit, false);
									return
								}
								toggleFormMsg($formMsg, false, msg);
								$this
									.css("opacity", "1.0")
									.animate({opacity: 0}, 500, function(){
										$this.css("visibility", "hidden");
									});
							});
						
					})
					.catch(function(err){
						console.log(err);
						toggleFormMsg($formMsg, true, err);
						toggleSubmitLoader($submit, false);
					})
			});
		}

	});
	
	// zip form validation
	function validateZip($this, cb){
		const zipInput = $this.find("input[name='zip']")

		function toggleLoading() {
			$this.find('button.btn-with-loader')
				.toggleClass('btn-loading')
				.prop('disabled', (_, val) => !val)

			$this.find('button.btn-with-loader > span')
				.text((_, text) => {
					if (text === 'Get Started') {
						return 'Validating Zip...'
					}

					return 'Get Started'
				})

			$this.find('button.btn-with-loader > div')
				.toggleClass('loader-hidden loader')
		}

		$('span.error.zip-error').text('');
		$('span.error.zip-error').removeClass('popped');
		if(zipInput.val() == ''){
			zipInput.next().next().text('this field is required').addClass('popped');

			cb(false)
			return
		}

		if(zipInput.val().trim().length != 5){
			zipInput.next().next().text('enter 5 digits zip code').addClass('popped');

			cb(false)
			return
		}
		
		toggleLoading()
		validateZipAgainstDB(apiUrl, zipInput.val(), function(isValid) {
			if (!isValid) {
				zipInput.next().next().text('Please enter a valid U.S. zip code').addClass('popped')
			}

			toggleLoading()
			cb(isValid)
		})
	}
	
	$('.zip-form').on('submit', function(e){
		e.preventDefault();

		validateZip($(this), (isValid) => {
			if (!isValid) {
				$(this).find("input[name='zip']").focus();
			} else {
				if(window.location.href.indexOf("/news/") != -1)
					location.href="/steps.html?zip="+$(this).find("input[name='zip']").val();
				else
					location.href="steps.html?zip="+$(this).find("input[name='zip']").val();
			}
		});
	})
	
	$('.zip-form input[name="zip"]').on('keypress', function(e){
		if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
			 // Allow: Ctrl+A
			(e.keyCode == 65 && e.ctrlKey === true) || 
			 // Allow: home, end, left, right
			(e.keyCode >= 35 && e.keyCode <= 39)) {
				 // let it happen, don't do anything
				 return;
		}

		var charValue = String.fromCharCode(e.keyCode)
			, valid = /^[0-9]+$/.test(charValue);

		if (!valid) {
			e.preventDefault();
		}
		
		if($(this).val().trim().length > 4){
			$(this).next().next().text('Maximum 5 digits allowed').addClass('popped');
			e.preventDefault();
		}else{
			$(this).next().next().text('').removeClass('popped');
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


function validateStep(step)
{

	console.log("Validate Step:"+ step);

	if(step==1)
	{
			var isValidZip = /(^\d{5}$)/.test($("#zip").val());
			if(!isValidZip)
			{
				$('#zip').addClass('input-error');
				console.log("Invalid Zip");
				return false;
			}

			
			else
			{
				const apiUrl = 'https://api.sunvalue.com/api'

				$("#companies").html("Loading Companies...");
				$.get(`${apiUrl}/utilcos?zip=`+$('#zip').val(), function(data){
					var isEmptyUtil = data.length === 0

					if(isEmptyUtil){
						$('<input>').attr({
							type: 'hidden',
							id: 'company_other_hidden',
							name: 'electric_utility',
							value: 'Other'
						}).appendTo("#solarForm");
						
						$('.steps').slick('slickFilter', function() {
							return $(this).find('.step').attr('id') !== 'step-util';
						});

						return
					}

					$('#company_other_hidden').remove()
					$('.steps').slick('slickUnfilter')
					

					$("#companies").empty();
					for(var i=0;i<data.length;i++){	

						if(i==0)	
							$('<div class="custom-radio style-btn"><input type="radio" checked="checked" id="company_'+i+'" name="electric_utility" value="'+data[i].name+'"><label for="company_'+i+'">'+data[i].name+'</label></div>').appendTo("#companies");
						else
							$('<div class="custom-radio style-btn"><input type="radio" id="company_'+i+'" name="electric_utility" value="'+data[i].name+'"><label for="company_'+i+'">'+data[i].name+'</label></div>').appendTo("#companies");

					}


					if(data.length>0)
						$('<div class="custom-radio style-btn"><input type="radio" id="company_other" name="electric_utility" value="Other"><label for="company_other">Other</label></div>').appendTo("#companies");
					else
					{
						$('<div class="custom-radio style-btn"><input type="radio" checked="checked" id="company_other" name="electric_utility" value="Other"><label for="company_other">Other</label></div>').appendTo("#companies");
					}

				
				});

				$.get(`${apiUrl}/address?zip=`+$('#zip').val(), function(data){
					$("#city").val(data.city);
					$('#state').val(data.state_code);
          $(`<input id="state_name" type="hidden" name="state_name" value="${data.state_name}" />`).appendTo('body')
			       });

			}

	}

	else if(step==4)
	{
        const address = $('#autoaddress').val()
        if (address.length === 0 || !hasAlphabet(address) || !hasNumber(address) || address.includes('@')) {
			$('#autoaddress').addClass('input-error');
          	$('#address-error').text('Your address must contain letters and numbers')
			return false;
        }
	}

	else if(step==6)
	{
			$('#fname').val($.trim($('#fname').val()));
			$('#lname').val($.trim($('#lname').val()));
            
			if(($('#fname').val().length==0))
			{
				$('#fname').addClass('input-error');
				return false;
			}
			else if(($('#lname').val().length==0))
			{
				$('#lname').addClass('input-error');
				return false;
			}

	}

	else if(step==7)
	{
			$('#email').val($.trim($('#email').val()));
			if(!isEmail($('#email').val()))
			{
				$('#email').addClass('input-error');
				return false;
			}

	}

	else if(step==8)
	{
			if(!isValidPhone($('#phone').val()))
			{
				$('#phone').addClass('input-error');
				return false;
			}

	}


	return true;
}

const isNumericInput = (event) => {
	const key = event.keyCode;
	return ((key >= 48 && key <= 57) || // Allow number line
		(key >= 96 && key <= 105) // Allow number pad
	);
};


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


	$('#zip,#email,#fname,#lname,#phone,#autoaddress').on('input',function(e){
			$(this).removeClass('input-error');
      $('.error-msg').html('')
	});

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

function submitForm()
{

	var slider = $('.steps');
	slider.slick('slickNext');

	const params = (new URL(document.location)).searchParams;
	
	$('<input>')
	 .attr({type: 'hidden',value: params.get('r') ,name: 'lp_request_id' })
	 .appendTo('#solarForm')

	for (let i = 1; i <= 5; i++) {
		$('<input>')
		 .attr({type: 'hidden', value: params.get(`s${i}`), name: `lp_s${i}` })
		 .appendTo('#solarForm')
	}
	
	var frm=$("#solarForm");

	
	const apiUrl = 'https://api.sunvalue.com/api'

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
					retryFromEmail()
					return;
				}, 5000);
			}

			window.localStorage.removeItem('fd_metric')
		}
	}

	postToSeon(frm, apiUrl, function (error, data) {
		if (error) console.log(error)

    let seonTransactionID = null;
		if (data) {
			var state = data.data.state;
      seonTransactionID = data.data?.id;
			if (state === 'DECLINE') {
				retryFromEmail();
				return;
			}
		}
		postToLeadspediaTrack(frm, apiUrl, seonTransactionID);
		return;
	})
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



function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}


$(function(){
    if(getParameterByName('zip')){
        $("#next-1").click();
    }
});

function convertFormToJSON(form) {
	const array = $(form).serializeArray();
	const json = {};
	$.each(array, function () {
	  json[snakeToCamel(this.name)] = this.value || "";
	});
	json.fullName = json.firstName + " " + json.lastName;
	json.requestType = $("input[name=request_type]:checked")
	.map(function(){return $(this).val();}).get().join(",");
	return json;
}

function snakeToCamel (str = '') {
  return str
  .toLowerCase()
  .replace(/[-_][a-z0-9]/g, (group) => group.slice(-1).toUpperCase());
}

function postToSeon (frm, apiUrl, cb) {
	$.ajax({
		contentType: 'application/json',
		url: `${apiUrl}/seon/lead`,
		type: 'POST',
		data: JSON.stringify(getFraudData(frm)),
		dataType: 'json',
		success: function (data) { cb(null, data) },
		error: (xhr,status,error) => { cb(error) },
	});
}

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
				loadLeadSoldInfo(apiUrl, data.lead_id, function () {
					location.href = (data.redirect !== undefined) 
					? data.redirect 
					:  `/thankyou/?v=2&id=${data.lead_id}&lander=${lander}`;
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

function convertToJSONBySnakeCamel (form){
	const array = $(form).serializeArray();
	const json = {};
	$.each(array, function () {
		json[!this.name.includes('_') 
		? this.name 
		: snakeToCamel(this.name)] = this.value || "";
	});
	json.fullName = json.firstName + " " + json.lastName;
	json.street = json.ad
	return json;
} 

function loadLeadSoldInfo(apiUrl, leadId, cb) {
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
		error: function (xhr, status, error) { console.log(error) },
		complete: function () { cb() }
	})
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
		user_fullname: jsonForm.fullName,
		user_created: (new Date()).valueOf(),
		user_country: jsonForm.country,
		user_city: jsonForm.city,
		user_region: jsonForm.state,
		user_zip: jsonForm.zip,
		user_street: jsonForm.street,
		phone_number: `+1${jsonForm.phoneNumber.replace(/[-()\s]/g, '')}`,
		custom_fields: {
			source: (new URL(window.document.location)).searchParams.get('s'),
			state: stateName,
			r: jsonForm.lpRequestId,
			s1: jsonForm.lpS1,
			s2: jsonForm.lpS2,
			s3: jsonForm.lpS3,
			s4: jsonForm.lpS4,
			s5: jsonForm.lpS5
		},
		session_id: window.seon_session_id || '',
		session: window.seon_session || '',
		details_url: window.location.href.slice(window.location.protocol.length+2, 100)
	}
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

			cb(true)
		},
		error: function (xhr, status, error) {
			console.log(error)

			cb(false)
		},
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

function retryFromEmail() {
	var slider = $(".steps")
	slider.slick('slickGoTo', 6)

	$('#email').addClass('input-error');
	$('#email-error').css("color","red");
	$('#email-error').css("padding-left","0");
	$('#email-error').text('Please Enter a Valid Email Address');

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

function postContact (apiUrl, postData, cb) {
	$.ajax({
		contentType: 'application/json',
		url : `${apiUrl}/send-mail/contact`,
		data: JSON.stringify(postData),
		dataType: 'json',
		type:'POST',				
		success:function(data, status){	
			if(!data.error && status === 'success'){
				return cb(null, data.message)
			}
			return cb(data.message)
		},
		error: (xhr,status,error) => {
			return cb(xhr.responseJSON && xhr.responseJSON.error || error)
		}
	});
}

function toggleSubmitLoader($submit, loaderState) {
	var $loader = $submit.find('div')
	var $btnTxt = $submit.find('span')
	
	if(loaderState){
		$submit.prop("disabled",true)
		$submit.addClass('btn-loading')
		$loader.removeClass('loader-hidden')
		$btnTxt.text("Working...")
		return
	}
	$submit.prop("disabled",false)
	$submit.removeClass('btn-loading')
	$loader.addClass('loader-hidden')
	$btnTxt.text("Submit")
}

function toggleFormMsg ($formMsg, errorState, msg){
	if (errorState){
		$formMsg.removeClass('success');
		$formMsg.addClass('error');
	} else {
		$formMsg.removeClass('error');
		$formMsg.addClass('success');
	}

	$formMsg.text(msg);	
	$formMsg.fadeIn();
}

function getCookie(name){
	return Object
		.fromEntries(document.cookie.split('; ')
		.map(v=>v.split(/=(.*)/s)
		.map(decodeURIComponent)))[name]
}
