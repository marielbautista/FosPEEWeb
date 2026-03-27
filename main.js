//NAVBAR SCROLLED DOWN FUNCTION
document.addEventListener('DOMContentLoaded', function() {
    // Get the elements once the page content is loaded
    const navbar = document.querySelector('.navbar');
    const backToTopBtn = document.getElementById('backToTopBtn');

    // Define constants
    const navbarThreshold = 50;
    const backToTopThreshold = 300;

    // --- 1. Combined Scroll Handler Function ---
    function handleScroll() {
        // Get the current vertical scroll position
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

        // ⭐️ NAVBAR SCROLL LOGIC ⭐️
        if (scrollPosition > navbarThreshold) {
            navbar.classList.add('scrolled');
            // console.log("Added class scrolled");
        } else {
            navbar.classList.remove('scrolled');
            // console.log("Removed class scrolled");
        }

        // ⭐️ BACK TO TOP BUTTON LOGIC ⭐️
        if (scrollPosition > backToTopThreshold) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    }

    // --- 2. Assign the Combined Function to the Scroll Event ---
    // This is the ONLY place we set window.onscroll
    window.onscroll = handleScroll;

    // --- 3. Smooth Scroll Click Handler (Stays the same) ---
    backToTopBtn.addEventListener('click', function(event) {
        event.preventDefault(); 
        
        window.scrollTo({
            top: 0,
            behavior: 'smooth' 
        });
    });

    // Optional: Run the handler once on load in case the user reloads the page while already scrolled down
    handleScroll();
});


//ARTICLES PAGE CATEGORIES SHOWING CARDS FUNCTION
document.addEventListener('DOMContentLoaded', function() {
    const filterLinks = document.querySelectorAll('.category-list a');
    const articleCards = document.querySelectorAll('.article-card');
    const articlesGrid = document.querySelector('.articles-list-grid');
    // Get the new message element
    const noArticlesMessage = document.getElementById('no-articles-message');

    // --- 1. Initial Load: Show All Articles ---
    function showAllArticles() {
        let visibleCount = 0;
        articleCards.forEach(card => {
            card.classList.add('show');
            visibleCount++;
        });
        toggleMessage(visibleCount); // Check visibility after showing all
    }
    
    // Function to hide/show the 'Stay Tuned' message
    function toggleMessage(count) {
        if (count === 0) {
            noArticlesMessage.style.display = 'block';
        } else {
            noArticlesMessage.style.display = 'none';
        }
    }

    // Call this once on load
    showAllArticles();


    // --- 2. Filter Function (Modified) ---
    function filterArticles(category) {
        let visibleCount = 0;
        
        // 1. Hide all cards
        articleCards.forEach(card => {
            card.classList.remove('show');
        });

        // 2. Determine which cards to show
        if (category === 'all') {
            showAllArticles();
            return; // Exit the function since showAllArticles handles the message
        } 
        
        // 3. Show filtered cards and count them
        const selector = '.category-' + category; 
        const cardsToShow = articlesGrid.querySelectorAll(selector);

        cardsToShow.forEach(card => {
            card.classList.add('show');
            visibleCount++;
        });
        
        // 4. Toggle the 'Stay Tuned' message based on the count
        toggleMessage(visibleCount);
    }


    // --- 3. Event Listeners ---
    filterLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); 
            
            const selectedCategory = this.getAttribute('data-category');

            // Update active state
            filterLinks.forEach(l => l.classList.remove('active-filter'));
            this.classList.add('active-filter');
            
            filterArticles(selectedCategory);
        });
    });
});

//CARDS SECTION MOBILE-VIEW FUNCTION
(function () {
  const BREAKPOINT = 576;
  const carousel = document.getElementById('eventsCarousel');
  if (!carousel) return;

  const originalInnerHTMLKey = 'data-original-inner';
  const transformedKey = 'data-transformed';

  const innerEl = carousel.querySelector('.carousel-inner');
  if (!innerEl) return;
  if (!carousel.hasAttribute(originalInnerHTMLKey)) {
    carousel.setAttribute(originalInnerHTMLKey, innerEl.outerHTML);
  }

  function disposeBootstrapCarousel() {
    if (typeof bootstrap === 'undefined') return;
    const inst = bootstrap.Carousel.getInstance(carousel);
    if (inst) inst.dispose();
  }
  function initBootstrapCarousel() {
    if (typeof bootstrap === 'undefined') return;
    new bootstrap.Carousel(carousel, { interval: false, ride: false });
  }

  function transformToSingleCardSlides() {
    if (carousel.getAttribute(transformedKey) === 'true') return;

    const currentInner = carousel.querySelector('.carousel-inner');
    const newInner = document.createElement('div');
    newInner.className = 'carousel-inner';

    let first = true;
    const slides = currentInner.querySelectorAll('.carousel-item');

    slides.forEach(slide => {
      const cols = slide.querySelectorAll('.row > div');
      cols.forEach(col => {
        const item = document.createElement('div');
        item.className = 'carousel-item' + (first ? ' active' : '');
        first = false;

        const wrapper = document.createElement('div');
        wrapper.className = 'col-12 mb-4';
        wrapper.innerHTML = col.innerHTML;

        item.appendChild(wrapper);
        newInner.appendChild(item);
      });
    });

    currentInner.replaceWith(newInner);
    carousel.setAttribute(transformedKey, 'true');

    disposeBootstrapCarousel();
    initBootstrapCarousel();
  }

  function restoreOriginalSlides() {
    if (carousel.getAttribute(transformedKey) !== 'true') return;

    const original = carousel.getAttribute(originalInnerHTMLKey);
    if (!original) return;

    const curInner = carousel.querySelector('.carousel-inner');
    curInner.outerHTML = original;

    carousel.removeAttribute(transformedKey);

    disposeBootstrapCarousel();
    initBootstrapCarousel();
  }

  let resizeTimer = null;
  function onResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.innerWidth <= BREAKPOINT) {
        transformToSingleCardSlides();
      } else {
        restoreOriginalSlides();
      }
    }, 150);
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (window.innerWidth <= BREAKPOINT) {
      transformToSingleCardSlides();
    } else {
      restoreOriginalSlides();
    }
    window.addEventListener('resize', onResize);
  });

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    if (window.innerWidth <= BREAKPOINT) {
      transformToSingleCardSlides();
    } else {
      restoreOriginalSlides();
    }
    window.addEventListener('resize', onResize);
  }
})();

// Gallery Strip
// 1. Grab all elements
const modal = document.getElementById("myModal");
const modalImg = document.getElementById("modalImg");
const counter = document.getElementById("image-counter");
const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");

// 2. UNIFIED ARRAY: This finds images in the strip AND your new 2-photo layout
const allGalleryImages = Array.from(document.querySelectorAll('.photo-gallery-strip img, .clickable-img'));
let currentIndex = 0;

// 3. Unified Function to update the modal
function updateModalImage(index) {
    if (index >= 0 && index < allGalleryImages.length) {
        currentIndex = index;
        modalImg.src = allGalleryImages[currentIndex].src;
        
        // Update the counter: "1 of 55"
        if (counter) {
            counter.innerText = `${currentIndex + 1} of ${allGalleryImages.length}`;
        }
    }
}

// 4. Single Loop to attach clicks
allGalleryImages.forEach((img, index) => {
    img.addEventListener('click', () => {
        modal.style.display = "flex";
        updateModalImage(index);
    });
});

// 5. Navigation Logic (Next/Prev)
nextBtn.onclick = (e) => {
    e.stopPropagation();
    let nextIndex = (currentIndex + 1) % allGalleryImages.length;
    updateModalImage(nextIndex);
};

prevBtn.onclick = (e) => {
    e.stopPropagation();
    let prevIndex = (currentIndex - 1 + allGalleryImages.length) % allGalleryImages.length;
    updateModalImage(prevIndex);
};

// 6. Close logic
document.querySelector(".close-modal").onclick = () => modal.style.display = "none";
modal.onclick = (e) => { if (e.target === modal) modal.style.display = "none"; };

// 7. Keyboard support
document.addEventListener('keydown', (e) => {
    if (modal.style.display === "flex") {
        if (e.key === "ArrowRight") nextBtn.click();
        if (e.key === "ArrowLeft") prevBtn.click();
        if (e.key === "Escape") modal.style.display = "none";
    }
});