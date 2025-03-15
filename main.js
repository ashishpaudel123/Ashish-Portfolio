//Aos Animation
AOS.init();

// header js start
window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  if (window.scrollY > 100) {
    header.classList.add("fixed-header");
  } else {
    header.classList.remove("fixed-header");
  }
});
// header js end

// type writer js start
const textElement = document.getElementById("animatedText");
const text = "Frontend Developer ";
let index = 8;
let isDeleting = false;

function typeEffect() {
  if (!isDeleting && index <= text.length) {
    textElement.innerText = text.slice(0, index++);
  } else if (isDeleting && index > 0) {
    textElement.innerText = text.slice(0, --index);
  }

  if (index === text.length) {
    isDeleting = true;
    setTimeout(typeEffect, 1000);
  } else if (index === 8 && isDeleting) {
    isDeleting = false;
    setTimeout(typeEffect, 500);
  } else {
    setTimeout(typeEffect, isDeleting ? 100 : 150);
  }
}

typeEffect();
// type writer js end

// linear progess bar js start
$(window).on("scroll", function () {
  let scroll = $(window).scrollTop();
  let oTop = $(".progress-bar").offset().top - window.innerHeight;
  if (scroll > oTop) {
    $(".progress-bar").addClass("progressbar-active");
  } else {
    $(".progress-bar").removeClass("progressbar-active");
  }
});
// linear progess bar js end

// Change nav link color on scroll
document.addEventListener("DOMContentLoaded", function () {
  let sections = document.querySelectorAll("section");
  let navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  window.addEventListener("scroll", function () {
    let scrollPosition = window.scrollY;

    sections.forEach((section) => {
      let top = section.offsetTop - 100;
      let height = section.offsetHeight;
      let id = section.getAttribute("id");

      if (scrollPosition >= top && scrollPosition < top + height) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
        });
        document
          .querySelector(".navbar-nav a[href='#" + id + "']")
          .classList.add("active");
      }
    });
  });
});
