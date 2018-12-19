
$( document ).ready(function() {
    

    $('.slider').slick({
        dots: true,
        autoplay: true,
        infinite: true,
        autoplaySpeed: 2000
    });

    $('.slider-prod').slick({
        dots: true,
        autoplay: true,
        infinite: true,
        prevArrow: false,
        nextArrow: false,
        autoplaySpeed: 3000
    });

    $('.header__menu-burger-button').on('click', function () {
        $('.header__menu-l1').toggleClass('header__menu-mobile-open');
    });
    
    if( $( window ).width() <= 1024) {
        $('.our-products').removeAttr('id');
    };


    $('.header__menu-home').on('click', function() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    });

    $(window).scroll(function(){
        if ($(window).scrollTop() >= $('.header').height()) {
            $('.header').addClass('sticky')
        }
        else {
            $('.header').removeClass('sticky')
        }
    });

    
    $('.contact-form__form-input-like').on('click', function(){
        $('span').toggleClass('contact-form__activate-icon');
    });

    var sections = $('.section')
    var navigation = $('.header__menu-l1')
    var navigation_height = navigation.outerHeight();

    
    $(window).on('scroll', function () {
    var scroll_position = $(this).scrollTop();
    
    sections.each(function() {
        var top = $(this).offset().top - navigation_height - 50;
        var bottom = top + 100 + $(this).outerHeight();
        

            if (scroll_position < 400) {

                navigation.find('a').removeClass('active');
                sections.removeClass('active');  

            } else {    
                if (scroll_position >= top && scroll_position <= bottom) {

                    navigation.find('a').removeClass('active');
                    navigation.find('a[href="#'+$(this).attr('id')+'"]').addClass('active');
                }
            }
    });
});

});

