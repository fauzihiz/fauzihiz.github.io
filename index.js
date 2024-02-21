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

  //back to top button
  document.addEventListener('DOMContentLoaded', function () {
    var backToTopButton = document.getElementById('back-to-top');
  
    window.addEventListener('scroll', function () {
      if (window.pageYOffset > 100) {
        // Show back to top button when scrolling down
        backToTopButton.style.display = 'block';
      } else {
        // Hide back to top button when at the top of the page
        backToTopButton.style.display = 'none';
      }
    });
  
    backToTopButton.addEventListener('click', function (e) {
      e.preventDefault();
      // Smooth scroll to top of the page
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  });
  
  document.addEventListener('DOMContentLoaded', function () {
    var creditLink = document.getElementById('credit-link');
    var creditBox = document.getElementById('credit-box');
    var overlay = document.getElementById('overlay');
  
    creditLink.addEventListener('click', function (e) {
      e.preventDefault();
      creditBox.classList.add('active');
      //overlay.style.display = 'block';
    });
  
    document.addEventListener('click', function (e) {
      // Check if e is defined
      if (typeof e !== 'undefined') {
        if (!creditBox.contains(e.target) && e.target !== creditBox && e.target !== creditLink) {
          creditBox.classList.remove('active');
          //overlay.style.display = 'none';
        }
      }
    });
  });
  