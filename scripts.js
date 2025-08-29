// Elementos DOM
const themeToggle = document.getElementById('themeToggle');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const sidebar = document.getElementById('sidebar');
const sidebarClose = document.getElementById('sidebarClose');
const overlay = document.getElementById('overlay');
const navLinks = document.querySelectorAll('.nav a, .sidebar-nav a');

// Tema claro/escuro
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
    if (theme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

// Menu mobile e sidebar
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

// Navegação suave
function smoothScroll(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    
    if (targetId.startsWith('#')) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Fechar sidebar se estiver aberta
            closeSidebar();
        }
    }
}

// Animações de scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.produto-card, .post-card, .contato-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

// Header scroll effect
function handleHeaderScroll() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'var(--bg-color)';
            header.style.backdropFilter = 'blur(10px)';
        }
    });
}

// Navegação ativa
function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav a[href^="#"], .sidebar-nav a[href^="#"]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY + 100;
        
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

// Formulário de contato (WhatsApp)
function initWhatsAppLinks() {
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
    
    whatsappLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Adicionar mensagem personalizada
            const message = encodeURIComponent('Olá! Gostaria de saber mais sobre seu curso de Libras.');
            const currentHref = link.getAttribute('href');
            
            if (!currentHref.includes('text=')) {
                link.setAttribute('href', `${currentHref}?text=${message}`);
            }
        });
    });
}

// Lazy loading para ícones
function initLazyLoading() {
    const icons = document.querySelectorAll('.hero-icon, .sobre-icon');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0.3';
                entry.target.style.animation = 'float 3s ease-in-out infinite';
            }
        });
    });
    
    icons.forEach(icon => {
        observer.observe(icon);
    });
}

// Preloader simples
function initPreloader() {
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        
        // Animar elementos principais
        const mainElements = document.querySelectorAll('.hero-content, .logo');
        mainElements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('fade-in');
            }, index * 200);
        });
    });
}

// Botão de voltar ao topo
function initBackToTop() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: var(--shadow);
    `;
    
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
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Efeito de typing no hero
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
        
        // Iniciar após um pequeno delay
        setTimeout(typeWriter, 500);
    }
}

// Contador animado para estatísticas (se necessário)
function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        // Iniciar quando o elemento estiver visível
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

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar funcionalidades
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
    
    // Event listeners para botões
    themeToggle.addEventListener('click', toggleTheme);
    mobileMenuToggle.addEventListener('click', openSidebar);
    sidebarClose.addEventListener('click', closeSidebar);
    overlay.addEventListener('click', closeSidebar);
    
    // Event listeners para navegação
    navLinks.forEach(link => {
        if (link.getAttribute('href').startsWith('#')) {
            link.addEventListener('click', smoothScroll);
        }
    });
    
    // Fechar sidebar ao redimensionar janela
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeSidebar();
        }
    });
    
    // Prevenir scroll horizontal
    document.body.style.overflowX = 'hidden';
});

// Adicionar estilos CSS dinâmicos
const dynamicStyles = `
    .nav a.active {
        color: var(--primary-color) !important;
    }
    
    .nav a.active::after {
        width: 100% !important;
    }
    
    .back-to-top:hover {
        background: var(--secondary-color) !important;
        transform: translateY(-2px) !important;
    }
    
    .loaded .hero-content,
    .loaded .logo {
        opacity: 1;
        transform: translateY(0);
    }
    
    .hero-content,
    .logo {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s ease;
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = dynamicStyles;
document.head.appendChild(styleSheet);

// Performance optimization
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Registrar service worker se necessário para PWA
        console.log('Site carregado com sucesso!');
    });
}

// Adicionar meta tags dinâmicas para SEO
function addMetaTags() {
    const metaTags = [
        { name: 'description', content: 'Sheilas Limpeza - Produtos de limpeza de qualidade na Região Oceânica, Niterói-RJ. Cloro, detergentes, desinfetantes e muito mais.' },
        { name: 'keywords', content: 'produtos de limpeza, cloro, detergente, desinfetante, Niterói, Região Oceânica, limpeza doméstica' },
        { name: 'author', content: 'Sheilas Limpeza' },
        { property: 'og:title', content: 'Sheilas Limpeza - Produtos de Limpeza | Região Oceânica - Niterói - RJ' },
        { property: 'og:description', content: 'Produtos de limpeza de qualidade para sua casa e empresa na Região Oceânica - Niterói - RJ.' },
        { property: 'og:type', content: 'website' }
    ];
    
    metaTags.forEach(tag => {
        const meta = document.createElement('meta');
        if (tag.name) meta.name = tag.name;
        if (tag.property) meta.setAttribute('property', tag.property);
        meta.content = tag.content;
        document.head.appendChild(meta);
    });
}

// Executar após carregamento
window.addEventListener('load', addMetaTags);

// Função para analytics (Google Analytics, etc.)
function trackEvent(action, category, label) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: label
        });
    }
}

// Rastrear cliques em botões importantes
document.addEventListener('click', (e) => {
    if (e.target.closest('.whatsapp-btn')) {
        trackEvent('click', 'contact', 'whatsapp_button');
    }
    if (e.target.closest('.btn-primary')) {
        trackEvent('click', 'cta', 'primary_button');
    }
});
