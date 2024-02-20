// Custom JavaScript Swiper
document.addEventListener('DOMContentLoaded', function () {
    var mySwiper = new Swiper('.swiper-container', {
      // Optional parameters
      direction: 'horizontal',
      loop: true,
      effect: 'slide',
      speed: 600,
      
      // If you need pagination
      pagination: {
        el: '.swiper-pagination',
      },
    });
  });