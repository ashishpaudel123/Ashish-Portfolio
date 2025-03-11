window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 110) {
        header.classList.add('fixed-header');
    } else {
        header.classList.remove('fixed-header');
    }
});


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
$(window).on('scroll',function(){
    let scroll = $(window).scrollTop();
    let oTop = $('.progress-bar').offset().top - window.innerHeight;
    if(scroll>oTop){
        $(".progress-bar").addClass("progressbar-active");
    }
    else{
        $(".progress-bar").removeClass("progressbar-active");
    }
});
// linear progess bar js end



