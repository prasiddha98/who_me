// Modern Portfolio JavaScript with Dramatic Effects

// Custom Cursor
const cursor = document.querySelector('.custom-cursor');
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
    requestAnimationFrame(animateCursor);
}
animateCursor();

// Cursor scaling on hover
document.querySelectorAll('button, .skill-card, .id-card').forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
    });
});

// Scroll Progress Bar
const progressBar = document.querySelector('.scroll-progress-bar');

function updateScrollProgress() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
}

window.addEventListener('scroll', updateScrollProgress);

// Card Stacking Effect (only on desktop)
function handleCardStacking() {
    // Only apply on large screens
    if (window.innerWidth < 1070) return;
    
    const sections = document.querySelectorAll('.content-section');
    const scrollTop = window.pageYOffset;
    
    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const progress = Math.max(0, Math.min(1, (scrollTop - sectionTop + window.innerHeight) / sectionHeight));
        
        if (scrollTop > sectionTop - window.innerHeight * 0.5) {
            const scale = 0.95 + (progress * 0.05);
            const translateY = (1 - progress) * 20;
            
            section.style.transform = `translateY(${translateY}px) scale(${scale})`;
            section.style.opacity = 0.8 + (progress * 0.2);
        }
    });
}

// Simple scroll animations with Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all section content
document.querySelectorAll('.section-content').forEach(section => {
    observer.observe(section);
});

// Natural scroll handler (no forced behavior)
window.addEventListener('scroll', () => {
    // Only apply desktop effects on large screens
    if (window.innerWidth >= 1070) {
        handleCardStacking();
        
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.2}px)`;
            heroContent.style.opacity = Math.max(0.3, 1 - scrolled / (window.innerHeight * 0.8));
        }
    }
});

// Smooth scroll for buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Add click animation
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);
        
        // Handle different button actions
        const buttonText = button.textContent.toLowerCase();
        
        if (buttonText.includes('work') || buttonText.includes('view')) {
            document.querySelector('.section-projects').scrollIntoView({
                behavior: 'smooth'
            });
        } else if (buttonText.includes('touch') || buttonText.includes('contact')) {
            document.querySelector('.section-contact').scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ID Card Interactions (now scrolls with content)
const idCard = document.querySelector('.id-card');

if (idCard) {
    // Subtle hover effect for better blending
    idCard.addEventListener('mouseenter', () => {
        idCard.style.transform = 'rotateY(5deg) rotateX(2deg) scale(1.02)';
        idCard.style.boxShadow = '0 20px 50px rgba(0,0,0,0.5), 0 15px 25px rgba(255,255,255,0.05)';
    });
    
    idCard.addEventListener('mouseleave', () => {
        idCard.style.transform = '';
        idCard.style.boxShadow = '';
    });
    
    // Click to flip effect
    idCard.addEventListener('click', () => {
        idCard.style.transform = 'rotateY(180deg) scale(1.05)';
        setTimeout(() => {
            idCard.style.transform = '';
        }, 600);
    });
}

// Add floating particles effect
function createParticle() {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: fixed;
        width: 2px;
        height: 2px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1;
        left: ${Math.random() * 100}vw;
        top: 100vh;
        animation: floatUp ${Math.random() * 10 + 10}s linear forwards;
    `;
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 20000);
}

// Add particle animation CSS
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes floatUp {
        to {
            transform: translateY(-110vh) translateX(${Math.random() * 200 - 100}px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);

// Create particles periodically (reduced on mobile)
const particleInterval = window.innerWidth >= 1070 ? 2000 : 5000;
setInterval(createParticle, particleInterval);

// Natural keyboard navigation (no forced jumps)
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
        window.scrollBy({ top: window.innerHeight * 0.3, behavior: 'smooth' });
    } else if (e.key === 'ArrowUp') {
        window.scrollBy({ top: -window.innerHeight * 0.3, behavior: 'smooth' });
    }
});

console.log('🔐 Welcome to Famous Dhungana\'s Portfolio - Where Security Meets Style!');
