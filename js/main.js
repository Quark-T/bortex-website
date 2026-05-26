// Google Analytics (G-HE958NP5D7)
const gaScript = document.createElement('script');
gaScript.async = true;
gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-HE958NP5D7';
document.head.appendChild(gaScript);

window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', 'G-HE958NP5D7');

document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Logic
    const themeToggleBtn = document.getElementById('theme-toggle');
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');
    const themeLogo = document.getElementById('theme-logo');
    const footerLogo = document.getElementById('footer-logo');
    const sidebarLogo = document.getElementById('sidebar-logo');

    const LOGO_LIGHT_MODE = 'https://www.bortex.site/ui/assets/image/logo/bortex-logo-ai.svg'; // For Light Theme
    const LOGO_DARK_MODE = 'https://www.bortex.site/ui/assets/image/logo/bortex-logo-white-ai.svg'; // For Dark Theme (Default)

    // Check for saved user preference, if any, on load of the website
    const currentTheme = localStorage.getItem('theme') || 'dark';

    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'light') {
        setLightModeUI();
    } else {
        setDarkModeUI();
    }

    function setLightModeUI() {
        if (sunIcon) sunIcon.style.display = 'block';
        if (moonIcon) moonIcon.style.display = 'none';
        if (themeLogo) themeLogo.src = LOGO_LIGHT_MODE;
        if (footerLogo) footerLogo.src = LOGO_LIGHT_MODE;
        if (sidebarLogo) sidebarLogo.src = LOGO_LIGHT_MODE;
    }

    function setDarkModeUI() {
        if (sunIcon) sunIcon.style.display = 'none';
        if (moonIcon) moonIcon.style.display = 'block';
        if (themeLogo) themeLogo.src = LOGO_DARK_MODE;
        if (footerLogo) footerLogo.src = LOGO_DARK_MODE;
        if (sidebarLogo) sidebarLogo.src = LOGO_DARK_MODE;
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            let theme = document.documentElement.getAttribute('data-theme');
            if (theme === 'light') {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                setDarkModeUI();
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
                setLightModeUI();
            }
        });
    }



    // Notification Logic (Demo)
    const notificationBtn = document.getElementById('notifications-toggle');
    const notificationDot = document.querySelector('.notification-dot');

    // Simulate an unread notification after 2 seconds for demo purposes
    setTimeout(() => {
        if (notificationDot) notificationDot.classList.add('active');
    }, 2000);

    if (notificationBtn) {
        notificationBtn.addEventListener('click', () => {
            if (notificationDot) {
                notificationDot.classList.remove('active');
            }
            console.log('Notifications clicked');
            // Open notification panel logic here
        });
    }

    // Language Toggle Logic
    const langToggleBtn = document.getElementById('lang-toggle');
    const langCode = document.querySelector('.lang-code');

    function setPublicLanguageCookie(lang) {
        try {
            document.cookie = `public_lang=${lang}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
        } catch (e) {}
    }

    function detectCurrentLanguage() {
        return window.location.pathname.startsWith('/en/') ? 'en' : 'it';
    }

    function getLanguageTargetPath(targetLang) {
        const path = window.location.pathname || '/';
        const map = {
            '/': { en: '/en/', it: '/' },
            '/index': { en: '/en/', it: '/' },
            '/index.html': { en: '/en/index.html', it: '/index.html' },
            '/features': { en: '/en/features', it: '/features' },
            '/features.html': { en: '/en/features.html', it: '/features.html' },
            '/features/widget-ai-siti-web': { en: '/en/features/widget-ai-siti-web.html', it: '/features/widget-ai-siti-web' },
            '/features/widget-ai-siti-web.html': { en: '/en/features/widget-ai-siti-web.html', it: '/features/widget-ai-siti-web.html' },
            '/pricing': { en: '/en/pricing', it: '/pricing' },
            '/pricing.html': { en: '/en/pricing.html', it: '/pricing.html' },
            '/about': { en: '/en/about', it: '/about' },
            '/about.html': { en: '/en/about.html', it: '/about.html' },
            '/contact': { en: '/en/contact', it: '/contact' },
            '/contact.html': { en: '/en/contact.html', it: '/contact.html' },
            '/register': { en: '/en/register', it: '/register' },
            '/register.html': { en: '/en/register.html', it: '/register.html' },
            '/blog': { en: '/en/blog', it: '/blog' },
            '/blog-widget-chat': { en: '/en/blog-widget-chat.html', it: '/blog-widget-chat' },
            '/blog-widget-chat.html': { en: '/en/blog-widget-chat.html', it: '/blog-widget-chat.html' },
            '/blog-virtual-try-on': { en: '/en/blog-virtual-try-on.html', it: '/blog-virtual-try-on' },
            '/blog-virtual-try-on.html': { en: '/en/blog-virtual-try-on.html', it: '/blog-virtual-try-on.html' },
            '/blog-article': { en: '/en/blog-article.html', it: '/blog-article' },
            '/blog-article.html': { en: '/en/blog-article.html', it: '/blog-article.html' },
            '/blog-bortex-workflow-automazioni-operative': { en: '/en/blog-bortex-workflow-operational-automations', it: '/blog-bortex-workflow-automazioni-operative' },
            '/blog-bortex-workflow-automazioni-operative.html': { en: '/en/blog-bortex-workflow-operational-automations.html', it: '/blog-bortex-workflow-automazioni-operative.html' },
            '/blog.html': { en: '/en/blog.html', it: '/blog.html' },
            '/blog-remote-control': { en: '/en/blog-remote-control', it: '/blog-remote-control' },
            '/blog-remote-control.html': { en: '/en/blog-remote-control.html', it: '/blog-remote-control.html' },
            '/privacy': { en: '/en/privacy', it: '/privacy' },
            '/privacy.html': { en: '/en/privacy.html', it: '/privacy.html' },
            '/terms': { en: '/en/terms', it: '/terms' },
            '/terms.html': { en: '/en/terms.html', it: '/terms.html' },
            '/gdpr': { en: '/en/gdpr', it: '/gdpr' },
            '/gdpr.html': { en: '/en/gdpr.html', it: '/gdpr.html' },
            '/cookies': { en: '/en/cookies', it: '/cookies' },
            '/cookies.html': { en: '/en/cookies.html', it: '/cookies.html' },
            '/en': { en: '/en/', it: '/' },
            '/en/': { en: '/en/', it: '/' },
            '/en/features': { en: '/en/features', it: '/features' },
            '/en/features/widget-ai-siti-web': { en: '/en/features/widget-ai-siti-web.html', it: '/features/widget-ai-siti-web.html' },
            '/en/features/widget-ai-siti-web.html': { en: '/en/features/widget-ai-siti-web.html', it: '/features/widget-ai-siti-web.html' },
            '/en/blog-widget-chat': { en: '/en/blog-widget-chat.html', it: '/blog-widget-chat' },
            '/en/blog-widget-chat.html': { en: '/en/blog-widget-chat.html', it: '/blog-widget-chat.html' },
            '/en/blog-virtual-try-on': { en: '/en/blog-virtual-try-on.html', it: '/blog-virtual-try-on' },
            '/en/blog-virtual-try-on.html': { en: '/en/blog-virtual-try-on.html', it: '/blog-virtual-try-on.html' },
            '/en/blog-article': { en: '/en/blog-article.html', it: '/blog-article' },
            '/en/blog-article.html': { en: '/en/blog-article.html', it: '/blog-article' },
            '/en/blog-bortex-workflow-operational-automations': { en: '/en/blog-bortex-workflow-operational-automations', it: '/blog-bortex-workflow-automazioni-operative' },
            '/en/blog-bortex-workflow-operational-automations.html': { en: '/en/blog-bortex-workflow-operational-automations.html', it: '/blog-bortex-workflow-automazioni-operative.html' },
            '/en/blog': { en: '/en/blog', it: '/blog' },
            '/en/blog.html': { en: '/en/blog.html', it: '/blog.html' },
            '/en/blog-remote-control': { en: '/en/blog-remote-control', it: '/blog-remote-control' },
            '/en/blog-remote-control.html': { en: '/en/blog-remote-control.html', it: '/blog-remote-control.html' },
            '/en/privacy': { en: '/en/privacy', it: '/privacy' },
            '/en/privacy.html': { en: '/en/privacy.html', it: '/privacy.html' },
            '/en/terms': { en: '/en/terms', it: '/terms' },
            '/en/terms.html': { en: '/en/terms.html', it: '/terms.html' },
            '/en/gdpr': { en: '/en/gdpr', it: '/gdpr' },
            '/en/gdpr.html': { en: '/en/gdpr.html', it: '/gdpr.html' },
            '/en/cookies': { en: '/en/cookies', it: '/cookies' },
            '/en/cookies.html': { en: '/en/cookies.html', it: '/cookies.html' },
            '/en/index.html': { en: '/en/index.html', it: '/index.html' },
            '/en/features.html': { en: '/en/features.html', it: '/features.html' },
            '/en/pricing': { en: '/en/pricing', it: '/pricing' },
            '/en/pricing.html': { en: '/en/pricing.html', it: '/pricing.html' },
            '/en/about': { en: '/en/about', it: '/about' },
            '/en/about.html': { en: '/en/about.html', it: '/about.html' },
            '/en/contact': { en: '/en/contact', it: '/contact' },
            '/en/contact.html': { en: '/en/contact.html', it: '/contact.html' },
            '/en/register': { en: '/en/register', it: '/register' },
            '/en/register.html': { en: '/en/register.html', it: '/register.html' }
        };

        if (map[path] && map[path][targetLang]) {
            return map[path][targetLang];
        }

        return targetLang === 'en' ? '/en/' : '/';
    }

    const currentLang = detectCurrentLanguage();
    try { localStorage.setItem('lang', currentLang); } catch (e) {}
    setPublicLanguageCookie(currentLang);
    updateLanguageUI(currentLang);

    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', () => {
            const current = detectCurrentLanguage();
            const newLang = current === 'it' ? 'en' : 'it';
            try { localStorage.setItem('lang', newLang); } catch (e) {}
            setPublicLanguageCookie(newLang);
            updateLanguageUI(newLang);
            window.location.href = getLanguageTargetPath(newLang);
        });
    }

    function updateLanguageUI(lang) {
        if (langCode) {
            langCode.textContent = lang.toUpperCase();
        }
    }

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');

    function closeMobileMenu() {
        if (mobileMenu) mobileMenu.classList.remove('active');
        if (mobileMenuOverlay) mobileMenuOverlay.classList.remove('active');
        if (mobileMenuBtn) {
            const spans = mobileMenuBtn.querySelectorAll('span');
            spans[0].style.top = '10px';
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.top = '28px';
            spans[2].style.transform = 'none';
        }
        // Re-enable body scroll
        document.body.style.overflow = '';
    }

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isActive = mobileMenu.classList.contains('active');

            if (isActive) {
                closeMobileMenu();
            } else {
                mobileMenu.classList.add('active');
                if (mobileMenuOverlay) mobileMenuOverlay.classList.add('active');

                // Animate hamburger to perfect X
                const spans = mobileMenuBtn.querySelectorAll('span');
                spans[0].style.top = '19px';
                spans[0].style.transform = 'rotate(45deg)';
                spans[1].style.opacity = '0';
                spans[2].style.top = '19px';
                spans[2].style.transform = 'rotate(-45deg)';

                // Disable body scroll when menu is open
                document.body.style.overflow = 'hidden';
            }
        });

        // Close menu when clicking overlay
        if (mobileMenuOverlay) {
            mobileMenuOverlay.addEventListener('click', closeMobileMenu);
        }

        // Close menu when clicking links
        const menuLinks = mobileMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                setTimeout(closeMobileMenu, 200);
            });
        });
    }

    // Sticky Header
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Close mobile menu if open
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    if (mobileMenuBtn) {
                        const spans = mobileMenuBtn.querySelectorAll('span');
                        spans[0].style.transform = 'none';
                        spans[1].style.opacity = '1';
                        spans[2].style.transform = 'none';
                    }
                }

                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for Fade-in Animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    });

    document.querySelectorAll('.glass-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});

// Hero Toggle Logic
// Hero Toggle Logic
const heroToggle = document.getElementById('hero-toggle');
const labelBusiness = document.getElementById('label-business');
const labelUser = document.getElementById('label-user');
const heroBusiness = document.getElementById('hero-business');
const heroUser = document.getElementById('hero-user');
const heroBg = document.querySelector('.hero-bg'); // Might be missing in new HTML, check or handle safely

function applyLandingMode(mode) {
    const isUserMode = mode === 'user';

    document.documentElement.classList.toggle('landing-user-mode', isUserMode);

    const ctaTitle = document.getElementById('cta-title');
    const ctaSubtitle = document.getElementById('cta-subtitle');
    const ctaPrimary = document.getElementById('cta-primary');
    const ctaSecondary = document.getElementById('cta-secondary');

    if (ctaTitle && ctaSubtitle && ctaPrimary && ctaSecondary) {
        if (isUserMode) {
            ctaTitle.textContent = 'Attiva il tuo Assistente Personale Oggi';
            ctaSubtitle.textContent = 'Organizza agenda, task e promemoria con BORTEX in pochi minuti.';
            ctaPrimary.textContent = 'Iscriviti in lista';
            ctaPrimary.href = 'register.html';
            ctaSecondary.textContent = 'Funzionalità User';
            ctaSecondary.href = '#user-features';
        } else {
            ctaTitle.textContent = 'Trasforma il tuo Customer Support Oggi';
            ctaSubtitle.textContent = 'Inizia gratuitamente. Nessuna carta di credito richiesta. Setup in 5 minuti.';
            ctaPrimary.textContent = 'Crea Account Gratis';
            ctaPrimary.href = 'register.html';
            ctaSecondary.textContent = 'Prenota Demo';
            ctaSecondary.href = '#contact';
        }
    }
}

if (heroToggle && heroBusiness && heroUser) {
    const LANDING_MODE_KEY = 'bortex_landing_mode';

    function persistLandingMode(mode) {
        try {
            localStorage.setItem(LANDING_MODE_KEY, mode);
        } catch (e) {
            console.warn('Unable to persist landing mode', e);
        }
    }

    function getSavedLandingMode() {
        try {
            return localStorage.getItem(LANDING_MODE_KEY);
        } catch (e) {
            return null;
        }
    }

    function setBusinessMode() {
        heroToggle.classList.remove('user-active');
        labelBusiness.classList.add('active');
        labelUser.classList.remove('active');

        heroBusiness.classList.add('active');
        heroUser.classList.remove('active'); // CSS handles fading

        // Optional: Change background if supported
        if (heroBg) heroBg.style.background = 'radial-gradient(circle at 50% 50%, rgba(249, 115, 22, 0.15) 0%, rgba(15, 23, 42, 0) 50%)';
        applyLandingMode('business');
        persistLandingMode('business');
    }

    function setUserMode() {
        heroToggle.classList.add('user-active');
        labelUser.classList.add('active');
        labelBusiness.classList.remove('active');

        heroUser.classList.add('active');
        heroBusiness.classList.remove('active');

        if (heroBg) heroBg.style.background = 'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.15) 0%, rgba(15, 23, 42, 0) 50%)';
        applyLandingMode('user');
        persistLandingMode('user');
    }

    // Initial state
    const savedLandingMode = getSavedLandingMode();
    if (savedLandingMode === 'user') {
        setUserMode();
    } else {
        setBusinessMode();
    }

    // Toggle Click
    heroToggle.addEventListener('click', () => {
        if (heroToggle.classList.contains('user-active')) {
            setBusinessMode();
        } else {
            setUserMode();
        }
    });

    // Label Clicks
    if (labelBusiness) {
        labelBusiness.addEventListener('click', setBusinessMode);
    }

    if (labelUser) {
        labelUser.addEventListener('click', setUserMode);
    }
}

function initAiFeaturesBanner() {
    const section = document.getElementById('ai-features-banner');
    if (!section) return;

    const tabs = Array.from(section.querySelectorAll('[data-ai-feature-tab]'));
    const slides = Array.from(section.querySelectorAll('[data-ai-feature-slide]'));
    const dots = Array.from(section.querySelectorAll('[data-ai-feature-dot]'));
    const previousButton = section.querySelector('[data-ai-feature-prev]');
    const nextButton = section.querySelector('[data-ai-feature-next]');
    const currentLabel = section.querySelector('[data-ai-feature-current]');
    const totalLabel = section.querySelector('[data-ai-feature-total]');
    const watermark = section.querySelector('.ai-feature-watermark');
    const progressBar = section.querySelector('.ai-feature-progress__bar');
    const interval = Number.parseInt(section.dataset.interval || '5000', 10);
    const autoAdvance = section.dataset.autoAdvance === 'true' && Number.isFinite(interval) && interval > 0;
    let current = 0;
    let timerId = null;

    if (!tabs.length || !slides.length) return;

    section.style.setProperty('--ai-progress-duration', `${interval}ms`);
    if (totalLabel) totalLabel.textContent = String(slides.length).padStart(2, '0');

    function formatNumber(index) {
        return String(index + 1).padStart(2, '0');
    }

    function restartProgress() {
        if (!progressBar) return;
        progressBar.style.animation = 'none';
        progressBar.offsetHeight;
        progressBar.style.animation = '';
    }

    function activateFeature(index) {
        current = (index + slides.length) % slides.length;
        const number = formatNumber(current);

        tabs.forEach((tab, tabIndex) => {
            const isActive = tabIndex === current;
            tab.classList.toggle('is-active', isActive);
            tab.setAttribute('aria-selected', String(isActive));
        });

        slides.forEach((slide, slideIndex) => {
            const isActive = slideIndex === current;
            slide.classList.toggle('is-active', isActive);
            slide.hidden = !isActive;
        });

        dots.forEach((dot, dotIndex) => {
            dot.classList.toggle('is-active', dotIndex === current);
        });

        if (currentLabel) currentLabel.textContent = number;
        if (watermark) watermark.textContent = number;
        restartProgress();
    }

    function stopAutoAdvance() {
        if (!timerId) return;
        clearInterval(timerId);
        timerId = null;
    }

    function startAutoAdvance() {
        if (!autoAdvance || section.hidden || timerId) return;
        timerId = setInterval(() => activateFeature(current + 1), interval);
    }

    function resetAutoAdvance() {
        stopAutoAdvance();
        startAutoAdvance();
    }

    tabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            activateFeature(Number.parseInt(tab.dataset.aiFeatureTab, 10));
            resetAutoAdvance();
        });
    });

    dots.forEach((dot) => {
        dot.addEventListener('click', () => {
            activateFeature(Number.parseInt(dot.dataset.aiFeatureDot, 10));
            resetAutoAdvance();
        });
    });

    if (previousButton) {
        previousButton.addEventListener('click', () => {
            activateFeature(current - 1);
            resetAutoAdvance();
        });
    }

    if (nextButton) {
        nextButton.addEventListener('click', () => {
            activateFeature(current + 1);
            resetAutoAdvance();
        });
    }

    section.addEventListener('mouseenter', stopAutoAdvance);
    section.addEventListener('mouseleave', startAutoAdvance);
    section.addEventListener('focusin', stopAutoAdvance);
    section.addEventListener('focusout', startAutoAdvance);

    const visibilityObserver = new MutationObserver(() => {
        if (section.hidden) {
            stopAutoAdvance();
        } else {
            startAutoAdvance();
        }
    });

    visibilityObserver.observe(section, { attributes: true, attributeFilter: ['hidden'] });
    activateFeature(0);
    startAutoAdvance();
}

document.addEventListener('DOMContentLoaded', initAiFeaturesBanner);
