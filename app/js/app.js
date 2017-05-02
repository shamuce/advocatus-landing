function initSlider() {
  var slider = new Siema({
    selector: '.clients__slider',
    duration: 350,
    easing: 'ease-out',
    perPage: 1,
    startIndex: 0,
    draggable: false,
    threshold: 20,
    loop: true,
  });
  const slides = $('.clients__slider-item');
  slides.map(function(index, item) {
    $('.clients__slider-counter').append('<div class="clients__slider-dot"></div>');
  });

  const dots = $('.clients__slider-dot');
  $(dots[slider.currentSlide]).addClass('clients__slider-dot--active');
  dots.map(function(index, item) {
    $(item).on('click', function() {
      slider.goTo(index);
      $('.clients__slider-dot').removeClass('clients__slider-dot--active');
      $(dots[slider.currentSlide]).addClass('clients__slider-dot--active');
    });
  });

  setInterval(function() {
    slider.next();
    $('.clients__slider-dot').removeClass('clients__slider-dot--active');
    $(dots[slider.currentSlide]).addClass('clients__slider-dot--active');
  }, 4000)
}

$(document).ready(function() {
  initSlider();


  $('a[href^="#"]').on('click', function() {
    let el = $(this).attr('href');
    $('body').animate({ scrollTop: $(el).offset().top }, 500);
  });


  const competenties = $('.faq__item--title');
  const competentiesText = $('.faq__item--subtitle');

  competenties.map(function(index, item) {
    $(item).on('click', function() {
      if ($(item).hasClass('faq__item--title--active')) {
        $(item).removeClass('faq__item--title--active');
        $(competentiesText[index]).fadeOut().delay(100).removeClass('faq__item--subtitle--active');
      } else {
        $(item).addClass('faq__item--title--active');
        $(competentiesText[index]).fadeIn().delay(100).addClass('faq__item--subtitle--active');
      }
    });
  });
});
