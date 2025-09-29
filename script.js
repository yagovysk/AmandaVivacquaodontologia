// Mobile Menu and Scroll Animations
document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu elements
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileMenuOverlay = document.getElementById("mobile-menu-overlay");
  const closeMobileMenu = document.getElementById("close-mobile-menu");
  const mobileMenuLinks = mobileMenu.querySelectorAll('a[href^="#"]');

  // Open mobile menu
  mobileMenuButton.addEventListener("click", function () {
    mobileMenuButton.classList.add("active");
    mobileMenu.classList.add("active");
    mobileMenuOverlay.classList.remove("hidden");
    document.body.classList.add("menu-open");
    document.body.style.overflow = "hidden";
  });

  // Close mobile menu function
  function closeMobileMenuFunction() {
    mobileMenuButton.classList.remove("active");
    mobileMenu.classList.remove("active");
    mobileMenuOverlay.classList.add("hidden");
    document.body.classList.remove("menu-open");
    document.body.style.overflow = "auto";
  }

  // Close menu event listeners
  closeMobileMenu.addEventListener("click", closeMobileMenuFunction);
  mobileMenuOverlay.addEventListener("click", closeMobileMenuFunction);

  // Close menu when clicking links
  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", closeMobileMenuFunction);
  });

  // Smooth scrolling
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const headerHeight = document.querySelector("header").offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Header scroll effect
  const header = document.querySelector("header");
  window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > 100) {
      header.classList.add("shadow-xl");
    } else {
      header.classList.remove("shadow-xl");
    }
  });

  // Scroll animations with Intersection Observer
  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -100px 0px",
  };

  // Track scroll direction for smoother animations
  let lastScrollY = window.scrollY;
  let scrollDirection = "down";

  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;
    scrollDirection = currentScrollY > lastScrollY ? "down" : "up";
    lastScrollY = currentScrollY;
  });

  const scrollObserver = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Elemento entrou na viewport - adiciona animação
        entry.target.classList.add("animate");

        // Adiciona uma pequena animação extra para elementos que voltam
        if (scrollDirection === "down") {
          entry.target.style.animationDelay = "0s";
        } else {
          entry.target.style.animationDelay = "0.1s";
        }
      } else {
        // Elemento saiu da viewport - remove animação para reiniciar
        entry.target.classList.remove("animate");

        // Reset animation delay
        entry.target.style.animationDelay = "0s";
      }
    });
  }, observerOptions);

  // Observe scroll elements
  const scrollElements = document.querySelectorAll(
    ".scroll-element, .scroll-element-left, .scroll-element-right, .scroll-element-scale"
  );
  scrollElements.forEach((element) => {
    scrollObserver.observe(element);
  });

  // Close mobile menu on resize
  window.addEventListener("resize", function () {
    if (window.innerWidth >= 768) {
      closeMobileMenuFunction();
    }
  });

  // Add stagger delays to grid items
  const gridItems = document.querySelectorAll(
    ".grid .scroll-element-scale, .grid .scroll-element"
  );
  gridItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.1}s`;
  });

  // Service cards hover effects
  const serviceCards = document.querySelectorAll(
    "#services .bg-white.shadow-lg"
  );
  serviceCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-8px) scale(1.02)";
      this.style.boxShadow = "0 15px 30px rgba(0,0,0,0.15)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
      this.style.boxShadow = "";
    });
  });

  // WhatsApp button pulse effect
  const whatsappButton = document.querySelector('a[href*="wa.me"]');
  if (whatsappButton) {
    setInterval(() => {
      whatsappButton.style.transform = "scale(1.05)";
      setTimeout(() => {
        whatsappButton.style.transform = "scale(1)";
      }, 200);
    }, 4000);
  }
});

// Utility functions
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);

  function updateCounter() {
    start += increment;
    if (start < target) {
      element.textContent = Math.floor(start);
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  }
  updateCounter();
}

function showNotification(message, type = "success") {
  const notification = document.createElement("div");
  notification.className = `fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 text-white ${type === "success" ? "bg-green-500" : "bg-red-500"
    }`;
  notification.textContent = message;
  notification.style.transform = "translateX(100%)";
  notification.style.transition = "transform 0.3s ease";

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  setTimeout(() => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

// Gallery Functionality
document.addEventListener("DOMContentLoaded", function () {
  const galleryItems = document.querySelectorAll(".gallery-item");
  const modal = document.getElementById("gallery-modal");
  const modalImg = document.getElementById("gallery-modal-img");
  const closeBtn = document.querySelector(".gallery-close");
  const prevBtn = document.querySelector(".gallery-prev");
  const nextBtn = document.querySelector(".gallery-next");

  let currentImageIndex = 0;
  const images = [];

  // Collect all gallery images
  galleryItems.forEach((item, index) => {
    const img = item.querySelector("img");
    const overlay = item.querySelector(".gallery-overlay h3");

    images.push({
      src: img.src,
      alt: img.alt,
      title: overlay ? overlay.textContent : img.alt,
    });

    // Add click event to open modal
    item.addEventListener("click", () => {
      openModal(index);
    });
  });

  function openModal(index) {
    currentImageIndex = index;
    modalImg.src = images[index].src;
    modalImg.alt = images[index].alt;
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
  }

  function showPrevious() {
    currentImageIndex =
      currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1;
    modalImg.src = images[currentImageIndex].src;
    modalImg.alt = images[currentImageIndex].alt;
  }

  function showNext() {
    currentImageIndex =
      currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1;
    modalImg.src = images[currentImageIndex].src;
    modalImg.alt = images[currentImageIndex].alt;
  }

  // Event listeners
  closeBtn.addEventListener("click", closeModal);
  prevBtn.addEventListener("click", showPrevious);
  nextBtn.addEventListener("click", showNext);

  // Close modal when clicking outside the image
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (modal.classList.contains("active")) {
      switch (e.key) {
        case "Escape":
          closeModal();
          break;
        case "ArrowLeft":
          showPrevious();
          break;
        case "ArrowRight":
          showNext();
          break;
      }
    }
  });

  // Touch/swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  modal.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  modal.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        showNext(); // Swipe left, show next
      } else {
        showPrevious(); // Swipe right, show previous
      }
    }
  }

  // Lazy loading for gallery images
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "50px 0px 50px 0px",
  };

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute("data-src");
          imageObserver.unobserve(img);
        }
      }
    });
  }, observerOptions);

  // Observe all gallery images for lazy loading
  document.querySelectorAll(".gallery-item img[data-src]").forEach((img) => {
    imageObserver.observe(img);
  });
});
