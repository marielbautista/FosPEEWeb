
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


//News & Events Page
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
            
            // Run the filter
            filterArticles(selectedCategory);
        });
    });
});