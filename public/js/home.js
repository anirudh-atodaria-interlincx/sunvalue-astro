$(document).ready(function () {
  // fixed header
  $(window).scroll(function () {
    if ($(window).scrollTop() >= 50) {
      $('.site-header').addClass('fixed')
    } else {
      $('.site-header').removeClass('fixed')
    }
  })
  if ($(window).scrollTop() >= 50) {
    $('.site-header').addClass('fixed')
  } else {
    $('.site-header').removeClass('fixed')
  }

  $('.menu-btn').click(function () {
    $('.menu-btn, .main-menu').toggleClass('active')
    $('.content-wrapper').toggleClass('menu-open')
  })

  $(window).resize(function () {
    if ($(window).width() > 1023) {
      $('.menu-btn, .main-menu').removeClass('active')
      $('.content-wrapper').removeClass('menu-open')
    }
  })

  $('.main-menu li a[href^="#"]').on('click', function (e) {
    e.preventDefault()
    $('html, body').animate({
      scrollTop: $($.attr(this, 'href')).offset().top
    }, 500)
  })

  $('.animation').viewportChecker({
    classToAdd: 'in-viewport',
    offset: 50,
    callbackFunction: function (elem) {
      var time = elem.data('delay') || 0
      setInterval(function () {
        elem.addClass('go')
      }, time)
    }
  })

  $('.parallax-bg').viewportChecker({
    classToAdd: 'in-viewport',
    callbackFunction: function (elem) {
      startAnimation = true
    }
  })

  $('.text-field').keyup(function () {
    if ($(this).val()) {
      $(this).addClass('active')
    } else {
      $(this).removeClass('active')
    }
  })

  $('.text-field').each(function () {
    if ($(this).val()) {
      $(this).addClass('active')
    } else {
      $(this).removeClass('active')
    }
  })

  let startAnimation = false

  $(window).on('scroll', function (e) {
    if ($(window).width() > 1023) {
      if (startAnimation) {
        var scrolled = $(window).scrollTop()

        var st = $(window).scrollTop()

        updateBackground($('.parallax-bg'))
      }
    } else {
      $('.parallax-bg').css('background-position', 'center top')
    }
  })

  var speed = 0.4

  function updateBackground ($el) {
    var diff = -$(window).scrollTop() + $el.offset().top
    var yPos = -(diff * speed)

    var coords = '50% ' + yPos + 'px'

    $el.css({
      backgroundPosition: coords
    })
  }

  $(document).on('click', 'a[href^="#"]', function (event) {
    event.preventDefault()
    var slf = $(this).parent()
    $('.content-nav .nav-inner li').removeClass('active')
    slf.addClass('active')

    $('html, body').animate({
      scrollTop: $($.attr(this, 'href')).offset().top + (-135)
    }, 500)
  })

  var width1 = $(window).width()
  if (width1 < 768) {
    $(document).on('click', 'a[href^="#"]', function (event) {
      event.preventDefault()
      if ($('.nav-inner ul').hasClass('open')) {
        $('.nav-inner ul').slideUp('fast')
        $('.nav-inner ul').removeClass('open')
      }
      $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top + (-70)
      }, 500)
    })
    $('.nav-inner .selected').click(function () {
      $(this).toggleClass('open')
      $('.nav-inner ul').addClass('open')
      $('.nav-inner ul').slideToggle('fast')
    })
  }
  var wwidth = $(window).width()
  if (wwidth > 767) {
    $('.nav-inner ul').removeAttr('style')
  }
  $(window).resize(function () {
    var wwidth = $(window).width()
    if (wwidth > 767) {
      $('.nav-inner ul').removeAttr('style')
    }
  })

  var apiUrl = 'https://api.sunvalue.com/api'

  // zip form validation
  function validateZip ($this, cb) {
    var zipInput = $this.find("input[name='zip']")

    function toggleLoading () {
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

    $('span.error.zip-error').text('')
    $('span.error.zip-error').removeClass('popped')
    if (zipInput.val() == '') {
      zipInput.next().next().text('this field is required').addClass('popped')

      cb(false)
      return
    }

    if (zipInput.val().trim().length != 5) {
      zipInput.next().next().text('enter 5 digits zip code').addClass('popped')

      cb(false)
      return
    }

    toggleLoading()
    validateZipAgainstDB(apiUrl, zipInput.val(), function (isValid) {
      if (!isValid) {
        zipInput.next().next().text('Please enter a valid U.S. zip code').addClass('popped')
      }

      toggleLoading()
      cb(isValid)
    })
  }

  $('.zip-form').on('submit', function (e) {
    e.preventDefault()

    validateZip($(this), (isValid) => {
      if (!isValid) {
        $(this).find("input[name='zip']").focus()
      } else {
        if (window.location.href.indexOf('/news/') != -1) { window.location.href = '/steps.html?zip=' + $(this).find("input[name='zip']").val() } else { window.location.href = 'steps.html?zip=' + $(this).find("input[name='zip']").val() }
      }
    })
  })

  $('.zip-form input[name="zip"]').on('keypress', function (e) {
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
      // Allow: Ctrl+A
      (e.keyCode == 65 && e.ctrlKey === true) ||
      // Allow: home, end, left, right
      (e.keyCode >= 35 && e.keyCode <= 39)) {
      // let it happen, don't do anything
      return
    }

    var charValue = String.fromCharCode(e.keyCode)
    var valid = /^[0-9]+$/.test(charValue)

    if (!valid) {
      e.preventDefault()
    }

    if ($(this).val().trim().length > 4) {
      $(this).next().next().text('Maximum 5 digits allowed').addClass('popped')
      e.preventDefault()
    } else {
      $(this).next().next().text('').removeClass('popped')
    }
  })
})

function validateZipAgainstDB (apiUrl, zip, cb) {
  $.ajax({
    type: 'GET',
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
    }
  })
}
