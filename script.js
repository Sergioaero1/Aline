// ==================== ELEMENTOS DOM ====================
const themeToggle = document.getElementById('themeToggle');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const sidebar = document.getElementById('sidebar');
const sidebarClose = document.getElementById('sidebarClose');
const overlay = document.getElementById('overlay');
const navLinks = document.querySelectorAll('.nav a, .sidebar-nav a');
const video = document.getElementById('librasTrailer'); // Vídeo Aula 01

// ==================== VÍDEO PREVIEW ====================
function playPreview(videoElement = video) {
  videoElement.currentTime = 0;
  videoElement.play();
  setTimeout(() => {
    videoElement.pause();
    videoElement.currentTime = 0;
  }, 10000);
}
document.querySelectorAll('.librasTrailer').forEach(video => {
  video.addEventListener('mouseenter', () => playPreview(video));
  video.addEventListener('mouseleave', () => { video.pause(); video.currentTime = 0; });
  video.addEventListener('touchstart', () => playPreview(video));
});

// ==================== TEMA CLARO/ESCURO ====================
function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
}
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);
}
function updateThemeIcon(theme) {
  const icon = themeToggle.querySelector('i');
  icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// ==================== SIDEBAR ====================
function openSidebar() {
  sidebar.classList.add('active');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeSidebar() {
  sidebar.classList.remove('active');
  overlay.classList.remove('active');
  document.body.style.overflow = 'auto';
}

// ==================== NAVEGAÇÃO SUAVE ====================
function smoothScroll(e) {
  e.preventDefault();
  const targetId = this.getAttribute('href');
  if (targetId.startsWith('#')) {
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const headerHeight = document.querySelector('.header').offsetHeight;
      const targetPosition = targetElement.offsetTop - headerHeight;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      closeSidebar();
    }
  }
}

// ==================== ANIMAÇÕES DE SCROLL ====================
function animateOnScroll() {
  const elements = document.querySelectorAll('.produto-card, .post-card, .contato-item');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  elements.forEach(element => observer.observe(element));
}

// ==================== HEADER SCROLL EFFECT ====================
function handleHeaderScroll() {
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// ==================== NAVEGAÇÃO ATIVA ====================
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav a[href^="#"], .sidebar-nav a[href^="#"]');
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + window.innerHeight / 3;
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

// ==================== WHATSAPP LINKS ====================
function initWhatsAppLinks() {
  const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
  whatsappLinks.forEach(link => {
    link.addEventListener('click', () => {
      const message = encodeURIComponent('Olá! Gostaria de saber mais sobre suas aulas de conversação');
      const currentHref = link.getAttribute('href');
      if (!currentHref.includes('text=')) {
        link.setAttribute('href', `${currentHref}?text=${message}`);
      }
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    });
  });
}

// ==================== LAZY LOADING ÍCONES ====================
function initLazyLoading() {
  const icons = document.querySelectorAll('.hero-icon, .sobre-icon');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('icon-loaded');
        observer.unobserve(entry.target);
      }
    });
  });
  icons.forEach(icon => observer.observe(icon));
}

// ==================== PRELOADER ====================
function initPreloader() {
  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    const preloader = document.getElementById('preloader');
    if (preloader) preloader.style.display = 'none';
    const mainElements = document.querySelectorAll('.hero-content, .logo');
    mainElements.forEach((element, index) => {
      setTimeout(() => { element.classList.add('fade-in'); }, index * 200);
    });
  });
}

// ==================== BACK TO TOP ====================
function initBackToTop() {
  const backToTopBtn = document.createElement('button');
  backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  backToTopBtn.className = 'back-to-top';
  backToTopBtn.setAttribute('aria-label', 'Voltar ao topo');
  document.body.appendChild(backToTopBtn);
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.style.opacity = '1';
      backToTopBtn.style.visibility = 'visible';
    } else {
      backToTopBtn.style.opacity = '0';
      backToTopBtn.style.visibility = 'hidden';
    }
  });
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ==================== TYPING EFFECT ====================
function initTypingEffect() {
  const heroTitle = document.querySelector('.hero-content h1');
  if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      }
    };
    setTimeout(typeWriter, 500);
  }
}

// ==================== CONTADORES ====================
function animateCounters() {
  const counters = document.querySelectorAll('[data-count]');
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-count'));
    let current = 0;
    const updateCounter = () => {
      if (current < target) {
        current += Math.ceil(target / 100);
        counter.textContent = current > target ? target : current;
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          updateCounter();
          observer.unobserve(entry.target);
        }
      });
    });
    observer.observe(counter);
  });
}

// ==================== CAROUSEL ====================
function initCarousel() {
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  if (!slides.length || !prevBtn || !nextBtn || !dots.length) return;

  let currentIndex = 0;
  let autoplayTimer = null;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
      if (dots[i]) dots[i].classList.toggle('active', i === index);
    });
    currentIndex = index;
  }

  function nextSlide() {
    const newIndex = (currentIndex + 1) % slides.length;
    showSlide(newIndex);
  }

  function prevSlide() {
    const newIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(newIndex);
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(nextSlide, 5000);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  // Controles
  prevBtn.addEventListener('click', prevSlide);
  nextBtn.addEventListener('click', nextSlide);

  // Indicadores (bolinhas)
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => showSlide(i));
  });

  // Pausar autoplay ao interagir com o mouse
  const carousel = document.querySelector('.carousel');
  if (carousel) {
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);
  }

  // Inicializa
  showSlide(0);
  startAutoplay();
}

// ==================== FAQ ACCORDION ====================
function initFAQAccordion() {
  const buttons = document.querySelectorAll('.accordion-btn');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const content = button.nextElementSibling;
      // Fecha todos os outros
      document.querySelectorAll('.accordion-content').forEach(c => {
        if (c !== content) c.classList.remove('active');
      });
      // Alterna o atual
      content.classList.toggle('active');
    });
  });
}

// ==================== INICIALIZAÇÃO ====================
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  animateOnScroll();
  handleHeaderScroll();
  updateActiveNav();
  initWhatsAppLinks();
  initLazyLoading();
  initPreloader();
  initBackToTop();
  initTypingEffect();
  animateCounters();
  initCarousel();       // chama o carousel
  initFAQAccordion();   // chama o FAQ corrigido

  // Event listeners para botões
  themeToggle.addEventListener('click', toggleTheme);
  mobileMenuToggle.addEventListener('click', openSidebar);
  sidebarClose.addEventListener('click', closeSidebar);
  overlay.addEventListener('click', closeSidebar);

  // Navegação suave
  navLinks.forEach(link => {
    if (link.getAttribute('href').startsWith('#')) {
      link.addEventListener('click', smoothScroll);
    }
  });

  // Fechar sidebar ao redimensionar
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      closeSidebar();
      overlay.classList.remove('active');
    }
  });

  // Prevenir scroll horizontal
  document.body.style.overflowX = 'hidden';
});
   