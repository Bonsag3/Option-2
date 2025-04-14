document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for sidebar links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
            // Close sidebar on mobile after clicking a link
            if (window.innerWidth < 768) {
                sidebar.classList.remove('sidebar-visible');
                sidebar.classList.add('sidebar-hidden');
            }
        });
    });

    // Section fade-in on scroll
    const sections = document.querySelectorAll('.fade-section');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Typing Animation
    const typedTextElement = document.getElementById('typed-text');
    const texts = ['Chief Operations Officer', 'Senior Project Manager'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentText = texts[textIndex];
        if (!isDeleting && charIndex < currentText.length) {
            typedTextElement.textContent += currentText.charAt(charIndex);
            charIndex++;
            setTimeout(type, 100);
        } else if (isDeleting && charIndex > 0) {
            typedTextElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            setTimeout(type, 50);
        } else if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(type, 1500);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(type, 500);
        }
    }

    type();

    // Hamburger Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('sidebar-hidden');
        sidebar.classList.toggle('sidebar-visible');
    });
});