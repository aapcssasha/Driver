$(document).ready(function() {

    const heroImages = document.querySelectorAll('.hero-image');
let currentImageIndex = 0;

function changeHeroImage() {
  heroImages[currentImageIndex].style.opacity = 0; // Hide the current image
  currentImageIndex = (currentImageIndex + 1) % heroImages.length; // Update the index
  heroImages[currentImageIndex].style.opacity = 1; // Show the new image

  setTimeout(changeHeroImage, 5000); // Run the function again after 5 seconds
}

changeHeroImage();

  });
  