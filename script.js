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
    mobileMenuButton.setAttribute("aria-expanded", "true");
    mobileMenuButton.setAttribute("aria-label", "Fechar menu de navegação");
    mobileMenu.classList.add("active");
    mobileMenuOverlay.classList.remove("hidden");
    document.body.classList.add("menu-open");
    document.body.style.overflow = "hidden";

    // Focus primeiro item do menu para acessibilidade
    const firstLink = mobileMenu.querySelector('a');
    if (firstLink) {
      setTimeout(() => firstLink.focus(), 100);
    }
  });

  // Close mobile menu function
  function closeMobileMenuFunction() {
    mobileMenuButton.classList.remove("active");
    mobileMenuButton.setAttribute("aria-expanded", "false");
    mobileMenuButton.setAttribute("aria-label", "Abrir menu de navegação");
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

    // Add keyboard support
    item.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModal(index);
      }
    });
  });

  function openModal(index) {
    currentImageIndex = index;
    modalImg.src = images[index].src;
    modalImg.alt = images[index].alt;
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    // Focus no botão fechar para acessibilidade
    setTimeout(() => closeBtn.focus(), 100);
  }

  function closeModal() {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "auto";
  }

  function showPrevious() {
    currentImageIndex =
      currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1;
    modalImg.src = images[currentImageIndex].src;
    modalImg.alt = images[currentImageIndex].alt;

    // Anunciar mudança para leitores de tela
    announceToScreenReader(`Imagem ${currentImageIndex + 1} de ${images.length}: ${images[currentImageIndex].alt}`);
  }

  function showNext() {
    currentImageIndex =
      currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1;
    modalImg.src = images[currentImageIndex].src;
    modalImg.alt = images[currentImageIndex].alt;

    // Anunciar mudança para leitores de tela
    announceToScreenReader(`Imagem ${currentImageIndex + 1} de ${images.length}: ${images[currentImageIndex].alt}`);
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

// Screen reader announcement function
function announceToScreenReader(message) {
  const announcer = document.getElementById("aria-live-announcer");
  if (announcer) {
    announcer.textContent = message;

    // Clear after announcement
    setTimeout(() => {
      announcer.textContent = "";
    }, 1000);
  }
}

// Create aria-live announcer if not exists
document.addEventListener("DOMContentLoaded", function () {
  if (!document.getElementById("aria-live-announcer")) {
    const announcer = document.createElement("div");
    announcer.id = "aria-live-announcer";
    announcer.setAttribute("aria-live", "polite");
    announcer.setAttribute("aria-atomic", "true");
    announcer.className = "sr-only";
    document.body.appendChild(announcer);
  }
});

// Hero Carousel Functionality
document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".carousel-slide");
  const indicators = document.querySelectorAll(".indicator");
  const prevBtn = document.querySelector(".carousel-control.prev");
  const nextBtn = document.querySelector(".carousel-control.next");

  let currentSlide = 0;
  let autoPlayInterval;

  function showSlide(index) {
    // Remove active class from all slides and indicators
    slides.forEach((slide) => slide.classList.remove("active"));
    indicators.forEach((indicator) => indicator.classList.remove("active"));

    // Wrap around if index is out of bounds
    if (index >= slides.length) {
      currentSlide = 0;
    } else if (index < 0) {
      currentSlide = slides.length - 1;
    } else {
      currentSlide = index;
    }

    // Add active class to current slide and indicator
    slides[currentSlide].classList.add("active");
    indicators[currentSlide].classList.add("active");

    // Announce to screen readers
    announceToScreenReader(`Slide ${currentSlide + 1} de ${slides.length}`);
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function prevSlide() {
    showSlide(currentSlide - 1);
  }

  // Event listeners for controls
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      nextSlide();
      resetAutoPlay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      prevSlide();
      resetAutoPlay();
    });
  }

  // Event listeners for indicators
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      showSlide(index);
      resetAutoPlay();
    });
  });

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      prevSlide();
      resetAutoPlay();
    } else if (e.key === "ArrowRight") {
      nextSlide();
      resetAutoPlay();
    }
  });

  // Auto play
  function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, 8000); // Change slide every 8 seconds
  }

  function resetAutoPlay() {
    clearInterval(autoPlayInterval);
    startAutoPlay();
  }

  // Touch/swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  const heroSection = document.getElementById("home");
  if (heroSection) {
    heroSection.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });

    heroSection.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });
  }

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      resetAutoPlay();
    }
  }

  // Pause autoplay when hovering over carousel
  if (heroSection) {
    heroSection.addEventListener("mouseenter", () => {
      clearInterval(autoPlayInterval);
    });

    heroSection.addEventListener("mouseleave", () => {
      startAutoPlay();
    });
  }

  // Ensure CTA links in carousel work properly
  const carouselLinks = heroSection.querySelectorAll('a[href^="#"]');
  carouselLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        e.preventDefault();
        targetSection.scrollIntoView({ behavior: "smooth" });

        // Update URL hash without jumping
        history.pushState(null, null, targetId);
      }
    });
  });

  // Start autoplay
  startAutoPlay();
});

// Dental Virtual Agent
document.addEventListener("DOMContentLoaded", function () {
  const panel = document.getElementById("dental-agent-panel");
  const toggleBtn = document.getElementById("dental-agent-toggle");
  const hint = document.getElementById("dental-agent-hint");
  const messagesBox = document.getElementById("dental-agent-messages");
  const form = document.getElementById("dental-agent-form");
  const input = document.getElementById("dental-agent-input");
  const chips = document.querySelectorAll(".dental-chip");

  if (!panel || !toggleBtn || !messagesBox || !form || !input) {
    return;
  }

  const whatsappUrl =
    "https://wa.me/556198210565?text=Olá!%20Gostaria%20de%20agendar%20uma%20consulta.";

  const initialMessages = [
    "Bem-vindo(a)! Eu sou o assistente virtual da Vivacqua Odontologia.",
    "Posso te ajudar com dúvidas sobre serviços, horários, localização e encaminhar para agendamento.",
  ];

  function normalizeText(text) {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();
  }

  function addMessage(content, sender) {
    const message = document.createElement("div");
    message.className = `dental-msg ${sender}`;
    message.textContent = content;
    messagesBox.appendChild(message);
    messagesBox.scrollTop = messagesBox.scrollHeight;
  }

  function addTypingAndReply(reply) {
    const typing = document.createElement("div");
    typing.className = "dental-msg bot";
    typing.textContent = "Digitando...";
    messagesBox.appendChild(typing);
    messagesBox.scrollTop = messagesBox.scrollHeight;

    setTimeout(() => {
      typing.remove();
      addMessage(reply, "bot");
    }, 550);
  }

  function getReply(userMessage) {
    const text = normalizeText(userMessage);

    if (!text) {
      return "Pode escrever sua dúvida que eu te ajudo agora.";
    }

    if (/(oi|ola|bom dia|boa tarde|boa noite|tudo bem)/.test(text)) {
      return "Olá! Posso te orientar sobre clareamento, prevenção, endodontia, odontologia do esporte, horários e agendamento.";
    }

    if (/(servico|servicos|tratamento|tratamentos|fazem|oferecem)/.test(text)) {
      return "A clínica atende Clareamento, Prevenção, Endodontia, Odontologia do Esporte, Periodontia, Cirurgia, Odontopediatria, Restauradora e Prótese.";
    }

    if (/(esporte|atleta|protetor|bucal)/.test(text)) {
      return "Sim! A Dra. Amanda é referência em Odontologia do Esporte no DF, incluindo orientação e protetor bucal profissional para atletas.";
    }

    if (/(clareamento|dente branco|branqueamento)/.test(text)) {
      return "No clareamento, primeiro é feita uma avaliação para indicar o protocolo ideal e seguro para seu caso. Se quiser, já te encaminho para agendar avaliação.";
    }

    if (/(endodontia|canal|dor no dente)/.test(text)) {
      return "A clínica realiza Endodontia (tratamento de canal) com foco em aliviar dor e preservar o dente. O ideal é avaliar clinicamente para definir urgência.";
    }

    if (/(prevencao|limpeza|profilaxia|manutencao)/.test(text)) {
      return "Em prevenção, fazemos limpeza e acompanhamento para reduzir risco de cárie e problemas gengivais, mantendo sua saúde bucal em dia.";
    }

    if (/(horario|horarios|funcionamento|aberto|atendimento)/.test(text)) {
      return "Horários: Segunda a Sexta, 08:00 às 22:00. Sábado e Domingo, 14:00 às 22:00.";
    }

    if (/(onde|endereco|localizacao|mapa|taguatinga)/.test(text)) {
      return "A clínica fica no Alameda Shopping Empresarial, Taguatinga Centro - DF.";
    }

    if (/(contato|telefone|whatsapp|numero)/.test(text)) {
      return "Você pode falar com a clínica pelo WhatsApp/telefone: (61) 98210-0565.";
    }

    if (/(preco|valor|quanto custa|orcamento)/.test(text)) {
      return "Os valores dependem do tipo de tratamento e da avaliação clínica. Posso te encaminhar para um atendimento rápido no WhatsApp e orçamento personalizado.";
    }

    if (/(agendar|consulta|marcar)/.test(text)) {
      return "Perfeito! Para agendar sua consulta agora, clique no botão de WhatsApp: " + whatsappUrl;
    }

    return "Posso te ajudar com serviços, horários, localização, contato e agendamento. Se preferir, me diga: clareamento, esporte, canal, prevenção ou consulta.";
  }

  function handleUserMessage(text) {
    addMessage(text, "user");
    const reply = getReply(text);
    addTypingAndReply(reply);
  }

  function togglePanel() {
    const isActive = panel.classList.contains("active");
    panel.classList.toggle("active", !isActive);
    toggleBtn.setAttribute("aria-expanded", String(!isActive));

    if (hint) {
      hint.classList.add("hidden");
    }

    if (!isActive) {
      setTimeout(() => input.focus(), 80);
    }
  }

  toggleBtn.addEventListener("click", function () {
    togglePanel();
  });

  document.addEventListener("click", function (event) {
    const clickedInsidePanel = panel.contains(event.target);
    const clickedToggle = toggleBtn.contains(event.target);
    if (!clickedInsidePanel && !clickedToggle) {
      panel.classList.remove("active");
      toggleBtn.setAttribute("aria-expanded", "false");
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      panel.classList.remove("active");
      toggleBtn.setAttribute("aria-expanded", "false");
    }
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const text = input.value.trim();
    if (!text) {
      return;
    }

    handleUserMessage(text);
    input.value = "";
  });

  chips.forEach((chip) => {
    chip.addEventListener("click", function () {
      const question = this.getAttribute("data-question") || "";
      handleUserMessage(question);
    });
  });

  initialMessages.forEach((message) => addMessage(message, "bot"));
});
