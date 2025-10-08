
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  });

  const hiddenElements = document.querySelectorAll('.hidden');
  hiddenElements.forEach(el => observer.observe(el));


window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    var navbar = document.querySelector('.navbar');
    console.log("Scroll position: " + window.pageYOffset); // For debugging

    if (window.pageYOffset > 50) {
        navbar.classList.add('scrolled');
        console.log("Added class scrolled");
    } else {
        navbar.classList.remove('scrolled');
        console.log("Removed class scrolled");
    }
}
