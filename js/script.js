document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Loader ---
    const loader = document.getElementById('loader');
    const loaderBar = document.getElementById('loader-bar');
    
    // Simulate loading
    setTimeout(() => loaderBar.style.width = '100%', 100);
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
                startTyping(); // Start typing after load
            }, 500);
        }, 1000);
    });

    // --- 2. Typing Effect (Hero) ---
    const typingElement = document.getElementById('typewriter');
    const phrases = ["Hi, welcome.", "I am Alexander.", "I create art."];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function startTyping() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            // Finished typing phrase, wait before deleting
            isDeleting = true;
            setTimeout(startTyping, 2000);
        } else if (isDeleting && charIndex === 0) {
            // Finished deleting, move to next
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            setTimeout(startTyping, 500);
        } else {
            // Typing speed
            const speed = isDeleting ? 50 : 100;
            setTimeout(startTyping, speed);
        }
    }

    // --- 3. Navbar Scrolled State & Mobile Menu ---
    const navbar = document.getElementById('navbar');
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    let isMenuOpen = false;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('bg-brand-black/90', 'backdrop-blur-md', 'border-brand-gray/20');
            navbar.classList.remove('bg-brand-black/0', 'backdrop-blur-none', 'border-transparent');
        } else {
            navbar.classList.remove('bg-brand-black/90', 'backdrop-blur-md', 'border-brand-gray/20');
            navbar.classList.add('bg-brand-black/0', 'backdrop-blur-none', 'border-transparent');
        }
    });

    menuBtn.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        // Toggle Icon
        menuBtn.innerHTML = isMenuOpen 
            ? '<iconify-icon icon="lucide:x" width="24" height="24"></iconify-icon>' 
            : '<iconify-icon icon="lucide:menu" width="24" height="24"></iconify-icon>';
        
        // Toggle Menu Panel
        if(isMenuOpen) {
            mobileMenu.classList.remove('translate-x-full');
        } else {
            mobileMenu.classList.add('translate-x-full');
        }
    });

    // Close mobile menu on link click
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            isMenuOpen = false;
            mobileMenu.classList.add('translate-x-full');
            menuBtn.innerHTML = '<iconify-icon icon="lucide:menu" width="24" height="24"></iconify-icon>';
        });
    });

    // --- 4. Scroll Reveal Animations ---
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target); // Only animate once
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- 5. Parallax Effect (Hero) ---
    const heroBg = document.getElementById('hero-bg').querySelector('img');
    window.addEventListener('scroll', () => {
        if (window.scrollY < window.innerHeight) {
            const yPos = window.scrollY * 0.4;
            heroBg.style.transform = `translateY(${yPos}px) scale(1.1)`;
        }
    });

    // --- 6. Lightbox ---
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lbImg = document.getElementById('lightbox-img');
    const lbTitle = document.getElementById('lightbox-title');
    const lbCat = document.getElementById('lightbox-cat');
    const closeBtn = document.getElementById('lightbox-close');
    const nextBtn = document.getElementById('lightbox-next');
    const prevBtn = document.getElementById('lightbox-prev');
    
    let currentIndex = 0;

    function openLightbox(index) {
        currentIndex = index;
        const item = galleryItems[index];
        const highResSrc = item.dataset.src;
        const title = item.dataset.title;
        const cat = item.dataset.category;

        lbImg.src = highResSrc;
        lbTitle.innerText = title;
        lbCat.innerText = cat;
        
        lightbox.classList.remove('hidden');
        // Allow DOM update then fade in
        requestAnimationFrame(() => {
            lightbox.classList.remove('opacity-0');
            lbImg.classList.add('lightbox-enter-active');
        });
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.add('opacity-0');
        setTimeout(() => {
            lightbox.classList.add('hidden');
            lbImg.classList.remove('lightbox-enter-active');
            document.body.style.overflow = '';
        }, 300);
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % galleryItems.length;
        openLightbox(currentIndex);
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        openLightbox(currentIndex);
    }

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => openLightbox(index));
    });

    closeBtn.addEventListener('click', closeLightbox);
    nextBtn.addEventListener('click', (e) => { e.stopPropagation(); showNext(); });
    prevBtn.addEventListener('click', (e) => { e.stopPropagation(); showPrev(); });
    
    // Close on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // Keyboard Nav
    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('hidden')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') showNext();
        if (e.key === 'ArrowLeft') showPrev();
    });

    // --- 7. Form Validation & Mailto Fallback ---
    const form = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Basic Validation
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        if(name && email && message) {
            // 1. API Integration Placeholder (e.g., Formspree/EmailJS)
            /* fetch("https://formspree.io/f/YOUR_ID", {
                method: "POST",
                body: new FormData(form),
                headers: {'Accept': 'application/json'}
            }).then(...)
            */

            // 2. Mailto Fallback (Active)
            const subject = document.getElementById('subject').value;
            const mailtoLink = `mailto:contact@alexander.com?subject=${encodeURIComponent(subject)}&body=Name: ${encodeURIComponent(name)}%0D%0AEmail: ${encodeURIComponent(email)}%0D%0A%0D%0A${encodeURIComponent(message)}`;
            
            // Trigger mail client
            window.location.href = mailtoLink;

            // Show success UI
            form.style.display = 'none';
            formSuccess.classList.remove('hidden');
        }
    });

});