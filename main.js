//Aos Animation
AOS.init();

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  
  // header js start
  window.addEventListener("scroll", function () {
    const header = document.querySelector("header");
    if (window.scrollY > 100) {
      header.classList.add("fixed-header");
    } else {
      header.classList.remove("fixed-header");
    }
  });

  const progressBar = $(".progress-bar");
  if (progressBar.length > 0) {
    $(window).on("scroll", function () {
      let scroll = $(window).scrollTop();
      let oTop = progressBar.offset().top - window.innerHeight;
      if (scroll > oTop) {
        progressBar.addClass("progressbar-active");
      } else {
        progressBar.removeClass("progressbar-active");
      }
    });
  }

  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  function setActiveLink() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    let currentSection = "home"; // Default to home

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionId = section.getAttribute("id");
      
      if (scrollPosition >= sectionTop - 250) {
        currentSection = sectionId;
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
    });

    const activeLink = document.querySelector('.navbar-nav a[href="#' + currentSection + '"]');
    if (activeLink) {
      activeLink.classList.add("active");
    }
  }

  setActiveLink();

  // Update on scroll with throttling
  let isScrolling = false;
  window.addEventListener("scroll", function() {
    if (!isScrolling) {
      window.requestAnimationFrame(function() {
        setActiveLink();
        isScrolling = false;
      });
      isScrolling = true;
    }
  });

});
