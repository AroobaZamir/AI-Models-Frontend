document.addEventListener('DOMContentLoaded', function() {
  // Load the header component
  const headerContainer = document.getElementById('header-container');
  
  if (headerContainer) {
    fetch('../components/header.html')
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to load header component: ${response.status}`);
        }
        return response.text();
      })
      .then(data => {
        headerContainer.innerHTML = data;
        
        // Initialize header functionality after loading
        initializeHeader();
        
        // Show the header that was previously hidden
        const header = document.querySelector('header');
        if (header) {
          header.style.display = 'block';
        }
      })
      .catch(error => {
        console.error('Error loading header component:', error);
        // Display error in the header container for debugging
        headerContainer.innerHTML = '<div style="color: red; padding: 20px;">Error loading header component. Check console for details.</div>';
      });
  }
});

function initializeHeader() {
  // Set active navigation based on current page
  const currentPage = window.location.pathname;
  const pageName = currentPage.split('/').pop();
  
  // For desktop navigation
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href').split('/').pop();
    if (pageName === linkPage) {
      link.classList.add('active');
    }
  });
  
  // For mobile sidebar navigation
  const sidebarLinks = document.querySelectorAll('.sidebar a');
  sidebarLinks.forEach(link => {
    const linkPage = link.getAttribute('href').split('/').pop();
    if (pageName === linkPage) {
      link.classList.add('active');
    }
  });
  
  // Mobile menu toggle functionality
  const menuToggle = document.querySelector('.menu-toggle');
  const body = document.body;
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.overlay');
  
  if (menuToggle && overlay) {
    // Toggle sidebar
    function toggleSidebar() {
      body.classList.toggle('sidebar-open');
    }
    
    menuToggle.addEventListener('click', toggleSidebar);
    overlay.addEventListener('click', toggleSidebar);
    
    // Close sidebar when a link is clicked
    const sidebarLinks = sidebar.querySelectorAll('a');
    sidebarLinks.forEach(link => {
      link.addEventListener('click', toggleSidebar);
    });
  }
}