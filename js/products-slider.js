// PRODUCTS SLIDER WOMEN
$('.products-slider-women').slick({
    dots: false,
    infinite: true,
    speed: 300,
    arrows: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 1000,
    cssEase: 'ease',
    prevArrow: $('.prev-btn-women'),
    nextArrow: $('.next-btn-women'),
    responsive: [
        {
        breakpoint: 1200,
        settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true,
            dots: false
        }
        },
        {
        breakpoint: 600,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            dots: false
        }
        }
    ]
});

// PRODUCTS SLIDER MEN
$('.products-slider-men').slick({
    dots: false,
    infinite: true,
    speed: 300,
    arrows: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 1000,
    cssEase: 'ease',
    prevArrow: $('.prev-btn-men'),
    nextArrow: $('.next-btn-men'),
    responsive: [
        {
        breakpoint: 1200,
        settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true,
            dots: false
        }
        },
        {
        breakpoint: 600,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            dots: false
        }
        }
    ]
});