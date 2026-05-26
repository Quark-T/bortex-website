// Registration Form Handler
let currentStep = 1;
let usageType = null;
let selectedPlan = null;
let selectedPlatform = null;
let selectedIntegrations = [];

const formData = {
    fullName: '',
    email: '',
    usageType: '',
    // Business fields
    businessName: '',
    businessType: '',
    businessWebsite: '',
    businessSize: '',
    businessDescription: '',
    platform: '',
    // Personal fields
    birthDate: '',
    phone: '',
    country: 'IT',
    // Plan/Integration
    plan: '',
    integrations: []
};

// Platform pricing adjustments
const platformPricing = {
    'shopify': 10,  // +€10 extra for Shopify
    'wordpress': 10, // +€10 extra for WordPress
    'custom': 0      // No extra cost
};

// Theme toggle
function updateThemeIcon(theme) {
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');

    if (theme === 'light') {
        if (sunIcon) sunIcon.style.display = 'block';
        if (moonIcon) moonIcon.style.display = 'none';
    } else {
        if (sunIcon) sunIcon.style.display = 'none';
        if (moonIcon) moonIcon.style.display = 'block';
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', function () {
    // Load theme preference
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    // Update logos based on theme
    const themeLogo = document.getElementById('theme-logo');
    const sidebarLogo = document.getElementById('sidebar-logo');
    if (savedTheme === 'light') {
        if (themeLogo) themeLogo.src = 'https://www.bortex.site/ui/assets/image/logo/bortex-logo-ai.svg';
        if (sidebarLogo) sidebarLogo.src = 'https://www.bortex.site/ui/assets/image/logo/bortex-logo-ai.svg';
    }

    // Setup theme toggle handler
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);

            // Update all logos
            const themeLogo = document.getElementById('theme-logo');
            const sidebarLogo = document.getElementById('sidebar-logo');

            if (newTheme === 'light') {
                if (themeLogo) themeLogo.src = 'https://www.bortex.site/ui/assets/image/logo/bortex-logo-ai.svg';
                if (sidebarLogo) sidebarLogo.src = 'https://www.bortex.site/ui/assets/image/logo/bortex-logo-ai.svg';
            } else {
                if (themeLogo) themeLogo.src = 'https://www.bortex.site/ui/assets/image/logo/bortex-logo-white-ai.svg';
                if (sidebarLogo) sidebarLogo.src = 'https://www.bortex.site/ui/assets/image/logo/bortex-logo-white-ai.svg';
            }
        });
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

                const spans = mobileMenuBtn.querySelectorAll('span');
                spans[0].style.top = '19px';
                spans[0].style.transform = 'rotate(45deg)';
                spans[1].style.opacity = '0';
                spans[2].style.top = '19px';
                spans[2].style.transform = 'rotate(-45deg)';

                document.body.style.overflow = 'hidden';
            }
        });

        if (mobileMenuOverlay) {
            mobileMenuOverlay.addEventListener('click', closeMobileMenu);
        }

        const menuLinks = mobileMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                setTimeout(closeMobileMenu, 200);
            });
        });
    }

    // Handle Enter key press on form inputs
    const form = document.getElementById('registrationForm');
    if (form) {
        form.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();

                // Check if we're on an input field (not textarea)
                const target = e.target;
                if (target.tagName === 'INPUT' || target.tagName === 'SELECT') {
                    // Find the next button
                    const nextButton = document.querySelector('.form-step.active .btn-next');
                    if (nextButton) {
                        nextButton.click();
                    }
                }
            }
        });
    }

    // Update current year in footer
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
});

// Show error message
function showError(message) {
    const errorEl = document.getElementById('errorMessage');
    errorEl.textContent = message;
    errorEl.classList.add('show');

    setTimeout(() => {
        errorEl.classList.remove('show');
    }, 5000);
}

// Hide error message
function hideError() {
    const errorEl = document.getElementById('errorMessage');
    errorEl.classList.remove('show');
}

// Update progress bar
function updateProgress() {
    const steps = document.querySelectorAll('.progress-step');
    steps.forEach((step, index) => {
        if (index < currentStep) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });
}

// Show specific step
function showStep(step) {
    // Hide all steps
    document.querySelectorAll('.form-step').forEach(s => {
        s.classList.remove('active');
    });

    // Show current step
    const stepEl = document.querySelector(`.form-step[data-step="${step}"]`);
    if (stepEl) {
        stepEl.classList.add('active');
    }
}

// Next Step
async function nextStep() {
    // return;
    hideError();

    // Validate current step
    if (currentStep === 1) {
        const fullName = document.getElementById('fullName').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (!fullName) {
            showError('Per favore inserisci il tuo nome completo');
            return;
        }

        if (!email || !isValidEmail(email)) {
            showError('Per favore inserisci un indirizzo email valido');
            return;
        }

        if (!password || password.length < 8) {
            showError('La password deve essere di almeno 8 caratteri');
            return;
        }

        if (password !== confirmPassword) {
            showError('Le password non coincidono');
            return;
        }

        // Verifica whitelist se attiva
        if (typeof window.checkEmailWhitelist === 'function') {
            const whitelistCheck = await window.checkEmailWhitelist(email);
            if (whitelistCheck.mode === 'whitelist' && !whitelistCheck.allowed) {
                showError(whitelistCheck.message || 'Questa email non è autorizzata alla registrazione');
                return;
            }
        }

        formData.fullName = fullName;
        formData.email = email;
        formData.password = password;
        currentStep = 2;

    } else if (currentStep === 3) {
        if (usageType === 'business') {
            const businessName = document.getElementById('businessName').value.trim();

            if (!businessName) {
                showError('Per favore inserisci il nome del tuo business');
                return;
            }

            formData.businessName = businessName;
            formData.businessType = document.getElementById('businessType').value;
            formData.businessWebsite = document.getElementById('businessWebsite').value;
            formData.businessSize = document.getElementById('businessSize').value;
            formData.businessDescription = document.getElementById('businessDescription').value;

        } else if (usageType === 'personal') {
            formData.birthDate = document.getElementById('birthDate').value;
            formData.phone = document.getElementById('phone').value;
            formData.country = document.getElementById('country').value;
        }

        // Complete registration after step 3
        completeRegistration();
        return;
    }

    showStep(currentStep);
    updateProgress();
}

// Previous Step
function prevStep() {
    hideError();

    // Check current visible step
    const visibleStep = document.querySelector('.form-step.active');
    const stepId = visibleStep ? visibleStep.getAttribute('data-step') : null;

    if (stepId === '3a-platform') {
        // From platform selection back to business info
        showStep('3a');
        return;
    }

    if (currentStep === 2) {
        currentStep = 1;
        showStep(currentStep);
        updateProgress();
    } else if (currentStep === 3) {
        currentStep = 2;
        usageType = null;
        document.querySelectorAll('.choice-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
        showStep(currentStep);
        updateProgress();
    } else if (currentStep === 4) {
        // Back to platform selection for business
        if (usageType === 'business') {
            showStep('3a-platform');
            selectedPlatform = null;
            document.querySelectorAll('.platform-card').forEach(card => {
                card.classList.remove('selected');
            });
        } else if (usageType === 'personal') {
            currentStep = 3;
            showStep('3b');
        }
        updateProgress();
    }
}

// Select Usage Type
function selectUsageType(type) {
    usageType = type;
    formData.usageType = type;

    // Update UI
    document.querySelectorAll('.choice-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    event.currentTarget.classList.add('selected');

    // Move to next step after a short delay
    setTimeout(() => {
        currentStep = 3;
        if (type === 'business') {
            showStep('3a');
        } else {
            showStep('3b');
        }
        updateProgress();
    }, 300);
}

// Select Platform
function selectPlatform(platform) {
    selectedPlatform = platform;
    formData.platform = platform;

    // Update UI
    document.querySelectorAll('.platform-card').forEach(card => {
        card.classList.remove('selected');
    });
    event.currentTarget.classList.add('selected');

    // Move to pricing step after a short delay
    setTimeout(() => {
        currentStep = 4;
        showStep('4a');
        updateProgress();
        updateBusinessPricing();
    }, 300);
}

// Update Business Pricing based on platform
function updateBusinessPricing() {
    if (!selectedPlatform) return;

    // Update prices in step 4a
    const step4a = document.querySelector('[data-step="4a"]');
    if (step4a) {
        const starterCard = step4a.querySelector('.plan-card:nth-child(1)');
        const proCard = step4a.querySelector('.plan-card:nth-child(2)');

        // Always show both cards
        if (starterCard) starterCard.style.display = 'block';
        if (proCard) proCard.style.display = 'block';

        if (selectedPlatform === 'custom') {
            // Codice Custom: Gratis or €15/mese
            if (starterCard) {
                starterCard.querySelector('.plan-price').textContent = 'Gratis';
                starterCard.querySelector('.plan-description').textContent = 'Perfetto per iniziare';
            }
            if (proCard) {
                proCard.querySelector('.plan-price').textContent = '€15/mese';
                proCard.querySelector('.plan-description').textContent = 'Per far crescere il tuo business';
            }
        } else {
            // Shopify or WordPress: Gratis or €25/mese
            if (starterCard) {
                starterCard.querySelector('.plan-price').textContent = 'Gratis';
                starterCard.querySelector('.plan-description').textContent = 'Perfetto per iniziare';
            }
            if (proCard) {
                proCard.querySelector('.plan-price').textContent = '€25/mese';
                proCard.querySelector('.plan-description').textContent = `Include integrazione ${selectedPlatform === 'shopify' ? 'Shopify' : 'WordPress'}`;
            }
        }
    }
}

// Select Plan
function selectPlan(plan) {
    selectedPlan = plan;
    formData.plan = plan;

    // Update UI
    document.querySelectorAll('.plan-card').forEach(card => {
        card.classList.remove('selected');
    });
    event.currentTarget.classList.add('selected');

    // If free or trial, complete registration after short delay
    setTimeout(() => {
        completeRegistration();
    }, 300);
}

// Toggle Integration
function toggleIntegration(integration) {
    const card = event.currentTarget;

    // If "none" is selected, clear all others
    if (integration === 'none') {
        document.querySelectorAll('.integration-card').forEach(c => {
            c.classList.remove('selected');
        });
        card.classList.add('selected');
        selectedIntegrations = ['none'];
    } else {
        // Remove "none" if selecting specific integration
        const noneCard = Array.from(document.querySelectorAll('.integration-card')).find(
            c => c.textContent.includes('Configurazione Manuale')
        );
        if (noneCard) {
            noneCard.classList.remove('selected');
        }
        selectedIntegrations = selectedIntegrations.filter(i => i !== 'none');

        // Toggle this integration
        if (card.classList.contains('selected')) {
            card.classList.remove('selected');
            selectedIntegrations = selectedIntegrations.filter(i => i !== integration);
        } else {
            card.classList.add('selected');
            selectedIntegrations.push(integration);
        }
    }

    formData.integrations = selectedIntegrations;
}

// Complete Registration
async function completeRegistration() {
    hideError();

    // Split fullName into first_name and last_name
    const nameParts = formData.fullName.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    // Prepare data for backend (including all form data for onboarding later)
    const registrationData = {
        username: formData.email, // Use email as username
        password: formData.password,
        email: formData.email,
        phone: formData.phone || formData.businessWebsite || '',
        first_name: firstName,
        last_name: lastName,
        // Additional data for onboarding
        usage_type: formData.usageType,
        business_name: formData.businessName || '',
        business_type: formData.businessType || '',
        business_website: formData.businessWebsite || '',
        business_size: formData.businessSize || '',
        business_description: formData.businessDescription || '',
        birth_date: formData.birthDate || '',
        country: formData.country || 'IT'
    };

    console.log('Sending registration to server:', registrationData);

    // Send to backend
    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registrationData)
        });

        const responseContentType = response.headers.get('content-type') || '';
        let data = null;

        if (responseContentType.includes('application/json')) {
            data = await response.json();
        } else {
            const rawText = await response.text();
            throw new Error(`Risposta non JSON dal server (status ${response.status})`);
        }

        if (response.ok && data.success) {
            console.log('Registration successful:', data);

            // Show success message
            currentStep = 4;
            showStep('5');
            updateProgress();

            // Redirect to login page
            setTimeout(() => {
                window.location.href = 'https://bortex.site/login';
            }, 2000);
        } else {
            showError(data.message || 'Errore durante la registrazione');
        }
    } catch (error) {
        console.error('Errore durante la registrazione:', error);
        showError(error.message || 'Errore di connessione. Riprova più tardi.');
    }
}

// Email validation
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
