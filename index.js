// Custom JavaScript Swiper
document.addEventListener('DOMContentLoaded', function () {
    var mySwiper = new Swiper('.swiper-container', {
      // Optional parameters
      direction: 'horizontal',
      loop: true,
      
      // If you need pagination
      pagination: {
        el: '.swiper-pagination',
      },
    });
  });

// Add click event listener to each image
var images = document.querySelectorAll('.swiper-slide img');
images.forEach(function (image) {
  image.addEventListener('click', function () {
    // Open image in a modal
    var modal = document.createElement('div');
    modal.classList.add('modal');
    var modalImg = document.createElement('img');
    modalImg.src = this.src;
    modal.appendChild(modalImg);
    document.body.appendChild(modal);

    // Close modal when clicked outside of the image
    modal.addEventListener('click', function () {
      document.body.removeChild(modal);
    });
  });
});

