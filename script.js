document.addEventListener('DOMContentLoaded', () => {
  
  function loadHTML(url, elementId) {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then((data) => {
        const targetElement = document.getElementById(elementId);
        if (targetElement) {
          targetElement.innerHTML = data;

          
          if (elementId === 'home-section') {
            initializeDropdown();
          }
        } else {
          console.error(`Element with id '${elementId}' not found.`);
        }
      })
      .catch((error) => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  }

  
  // Function to initialize the dropdown behavior
function initializeDropdown() {
    const dropdownContainer = document.getElementById('home-section');
    if (!dropdownContainer) return;
  
    dropdownContainer.addEventListener('click', function (event) {
      const productsLink = event.target.closest('#products-link');
      const dropdownMenu = document.getElementById('products-dropdown');
  
      if (productsLink && dropdownMenu) {
        event.preventDefault(); 
        dropdownMenu.classList.toggle('visible');
      }
    });
  
    document.addEventListener('click', function (event) {
      const dropdownMenu = document.getElementById('products-dropdown');
      const productsLink = document.getElementById('products-link');
  
      if (
        dropdownMenu &&
        productsLink &&
        !productsLink.contains(event.target) &&
        !dropdownMenu.contains(event.target)
      ) {
        dropdownMenu.classList.remove('visible');
      }
    });
  }
  


  const sections = [
    { url: 'header.html', id: 'home-section' }, 
    { url: 'hero.html', id: 'hero-section' },
    { url: 'category.html', id: 'categories-section' },
    { url: 'contact.html', id: 'contact-section' },
    { url: 'footer.html', id: 'footer-section' },
  ];

 
  sections.forEach((section) => loadHTML(section.url, section.id));
});
