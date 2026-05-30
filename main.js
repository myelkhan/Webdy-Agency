document.addEventListener('DOMContentLoaded', () => {
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Set initial 3D transforms for elements to prevent flash
    gsap.set('.laptop-lid', { transformPerspective: 1000, transformStyle: "preserve-3d" });
    gsap.set('.laptop-base', { transformPerspective: 1000, transformStyle: "preserve-3d" });

    // Hero Entrance Animation (elastic and playful)
    const heroTl = gsap.timeline();
    heroTl.from('.hero-content > *', {
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 1.2,
        ease: 'power4.out'
    });

    // Laptop Lid Elastic Opening
    heroTl.fromTo('.laptop-lid', 
        { rotateX: -90 },
        {
            rotateX: -12,
            duration: 1.8,
            ease: 'elastic.out(1, 0.75)',
            immediateRender: false
        },
        '-=0.8'
    );

    // Floating cartoon elements popup
    heroTl.fromTo('.float-item',
        { scale: 0, opacity: 0 },
        {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            stagger: 0.08,
            ease: 'back.out(2.5)',
            clearProps: "transform" // Keep hover zoom functioning
        },
        '-=1.2'
    );

    // Continuous floating badges sine wave motion loops
    gsap.utils.toArray('.float-item').forEach((item, index) => {
        gsap.to(item, {
            y: '-=15',
            x: `+=${(index % 2 === 0 ? 8 : -8)}`,
            rotation: (index % 2 === 0 ? 6 : -6),
            duration: 3 + index * 0.4,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: index * 0.1
        });
    });

    // Mouse interactive parallax on the cartoon laptop within the Hero section
    const hero = document.getElementById('hero');
    const lid = document.querySelector('.laptop-lid');
    const base = document.querySelector('.laptop-base');
    const viewport = document.querySelector('.laptop-viewport');

    if (hero && lid && base && viewport) {
        hero.addEventListener('mousemove', (e) => {
            const rect = hero.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
            const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5

            // Tilt the laptop screen
            gsap.to(lid, {
                rotateY: x * 20,
                rotateX: -12 + (y * 12),
                duration: 0.6,
                ease: 'power2.out'
            });

            // Tilt the laptop base
            gsap.to(base, {
                rotateY: x * 6,
                rotateX: y * 4,
                duration: 0.6,
                ease: 'power2.out'
            });

            // Slight viewport offset
            gsap.to(viewport, {
                x: x * 25,
                y: y * 15,
                duration: 0.6,
                ease: 'power2.out'
            });
        });

        // Reset positions smoothly on mouseleave
        hero.addEventListener('mouseleave', () => {
            gsap.to(lid, { rotateX: -12, rotateY: 0, duration: 1, ease: 'power3.out' });
            gsap.to(base, { rotateX: 0, rotateY: 0, duration: 1, ease: 'power3.out' });
            gsap.to(viewport, { x: 0, y: 0, duration: 1, ease: 'power3.out' });
        });
    }

    // Scroll trigger to close the laptop screen lid when scrolling down the page
    gsap.to('.laptop-lid', {
        scrollTrigger: {
            trigger: '#hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        },
        rotateX: -92, // fold closed completely
        ease: 'none'
    });

    // Hero Text Parallax scrolling
    gsap.fromTo('.hero-content', 
        { opacity: 1, y: 0 },
        {
            scrollTrigger: {
                trigger: '#hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true,
                invalidateOnRefresh: true
            },
            y: 80,
            opacity: 0,
            immediateRender: false
        }
    );

    // Sections Scroll Reveal
    gsap.utils.toArray('section').forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power3.out'
        });
    });

    // Mobile Navigation
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');

        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger Animation
        burger.classList.toggle('toggle');
    });

    // Navigation scroll effect
    const navbar = document.getElementById('main-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '0.5rem 0';
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 10px 30px rgba(15, 23, 42, 0.05)';
        } else {
            navbar.style.padding = '1.5rem 0';
            navbar.style.background = 'rgba(255, 255, 255, 0.85)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Review Form Submission
    const reviewForm = document.getElementById('review-form');
    const reviewsList = document.getElementById('reviews-list');

    reviewForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get values
        const name = document.getElementById('reviewer-name').value;
        const mobile = document.getElementById('reviewer-mobile').value;
        const email = document.getElementById('reviewer-email').value;
        const address = document.getElementById('reviewer-address').value;
        const text = document.getElementById('reviewer-text').value;

        // Create new review card
        const reviewCard = document.createElement('div');
        reviewCard.className = 'review-card new-review';
        reviewCard.innerHTML = `
            <div class="review-header">
                <span class="reviewer-name">${name}</span>
                <div class="stars">★★★★★</div>
            </div>
            <p class="review-text">"${text}"</p>
            <div style="font-size: 0.7rem; color: #555; margin-top: 10px;">
                Verified: ${email} | ${mobile}
            </div>
        `;

        // Add to list
        reviewsList.prepend(reviewCard);

        // Reset form
        reviewForm.reset();

        // Feedback
        alert('Thank you for your review, ' + name + '! It has been added.');
        
        // Scroll to the new review
        reviewCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Close mobile nav if open
                if (nav.classList.contains('nav-active')) {
                    nav.classList.remove('nav-active');
                    burger.classList.remove('toggle');
                }
            }
        });
    });
});

// Add keyframes for mobile nav animation via JS
const style = document.createElement('style');
style.innerHTML = `
    .nav-active {
        display: flex !important;
        flex-direction: column;
        position: absolute;
        right: 0px;
        height: 92vh;
        top: 80px;
        background-color: rgba(255, 255, 255, 0.98);
        backdrop-filter: blur(15px);
        width: 100%;
        align-items: center;
        justify-content: center;
        z-index: 999;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        border-bottom: 1px solid var(--border-color);
    }
    @keyframes navLinkFade {
        from { opacity: 0; transform: translateX(50px); }
        to { opacity: 1; transform: translateX(0px); }
    }
    .toggle .line1 { transform: rotate(-45deg) translate(-5px, 6px); }
    .toggle .line2 { opacity: 0; }
    .toggle .line3 { transform: rotate(45deg) translate(-5px, -6px); }
    .new-review {
        border-color: var(--secondary-color) !important;
        animation: slideIn 0.5s ease-out;
    }
    @keyframes slideIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0px); }
    }
`;
document.head.appendChild(style);
