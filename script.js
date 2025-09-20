"use strict";

// Advanced Profile JavaScript
(function() {

    // Matrix effect
    function createMatrix() {
        const matrix = document.getElementById('matrix');
        if (!matrix) return;
        
        const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        
        function createChar() {
            const char = document.createElement('div');
            char.className = 'matrix-char';
            char.textContent = chars[Math.floor(Math.random() * chars.length)];
            char.style.left = Math.random() * 100 + '%';
            char.style.animationDuration = (Math.random() * 3 + 2) + 's';
            char.style.fontSize = (Math.random() * 10 + 10) + 'px';
            matrix.appendChild(char);
            
            setTimeout(() => {
                char.remove();
            }, 5000);
        }
        
        setInterval(createChar, 200);
    }

    // Particles effect
    function createParticles() {
        const particles = document.getElementById('particles');
        if (!particles) return;
        
        function createParticle() {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.width = particle.style.height = (Math.random() * 4 + 2) + 'px';
            particle.style.animationDuration = (Math.random() * 10 + 5) + 's';
            particle.style.animationDelay = Math.random() * 2 + 's';
            particles.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 15000);
        }
        
        setInterval(createParticle, 300);
    }

    // Typewriter effect
    function typeWriter() {
        const texts = [
            'Desenvolvedor Backend // Criando soluções robustas',
            'Especialista Java // Construindo APIs escaláveis', 
            'Arquiteto de Sistemas // Projetando infraestruturas sólidas',
            'Problem Solver // Resolvendo desafios complexos'
        ];
        let textIndex = 0;
        let charIndex = 0;
        const typedElement = document.getElementById('typed-text');
        
        if (!typedElement) return;
        
        function type() {
            if (charIndex < texts[textIndex].length) {
                typedElement.textContent += texts[textIndex].charAt(charIndex);
                charIndex++;
                setTimeout(type, 50);
            } else {
                setTimeout(erase, 2000);
            }
        }
        
        function erase() {
            if (charIndex > 0) {
                typedElement.textContent = texts[textIndex].substring(0, charIndex - 1);
                charIndex--;
                setTimeout(erase, 30);
            } else {
                textIndex = (textIndex + 1) % texts.length;
                setTimeout(type, 500);
            }
        }
        
        type();
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('loading');
                entry.target.classList.add('loaded');
            }
        });
    }, observerOptions);

    // Smooth scrolling for navigation links
    function initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Enhanced parallax effect
    function initParallaxEffect() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.parallax-back');
            
            parallaxElements.forEach(element => {
                const speed = 0.5;
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
            
            // Floating elements parallax
            const floatingElements = document.querySelectorAll('.floating');
            floatingElements.forEach((element, index) => {
                const speed = 0.1 + (index * 0.05);
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }

    // Header background on scroll
    function initHeaderScrollEffect() {
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            if (!header) return;
            
            if (window.scrollY > 100) {
                header.classList.add('glass-strong');
            } else {
                header.classList.remove('glass-strong');
            }
        });
    }

    // Form submission with animation
    function initFormSubmission() {
        const form = document.querySelector('form');
        if (!form) return;
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const button = e.target.querySelector('button');
            if (!button) return;
            
            const originalText = button.innerHTML;
            
            button.innerHTML = '<span class="relative z-10">$ sending...</span>';
            button.disabled = true;
            
            setTimeout(() => {
                button.innerHTML = '<span class="relative z-10">$ sent ✓</span>';
                setTimeout(() => {
                    button.innerHTML = originalText;
                    button.disabled = false;
                    // Reset form
                    e.target.reset();
                }, 2000);
            }, 1500);
        });
    }

    // Glitch effect for skill tags
    function initSkillTagGlitch() {
        const skillTags = document.querySelectorAll(".skill-tag");
        skillTags.forEach(tag => {
            const originalText = tag.textContent;
            // Criar um span para o texto dentro da tag para controlar melhor o conteúdo
            const textSpan = document.createElement('span');
            textSpan.textContent = originalText;
            tag.innerHTML = ''; // Limpa o conteúdo original
            tag.appendChild(textSpan);

            tag.addEventListener("mouseover", () => {
                if (tag.classList.contains("glitch-active")) return; // Prevent re-triggering if already active
                tag.classList.add("glitch-active");
                textSpan.classList.add("glitch-effect"); // Aplica o glitch ao span interno
                let glitchInterval = setInterval(() => {
                    let glitchText = "";
                    for (let i = 0; i < originalText.length; i++) {
                        glitchText += Math.random() < 0.5 ? originalText[i] : String.fromCharCode(33 + Math.floor(Math.random() * 94));
                    }
                    textSpan.textContent = glitchText;
                }, 50);

                const mouseOutHandler = () => {
                    clearInterval(glitchInterval);
                    textSpan.textContent = originalText;
                    // Remove a classe glitch-effect após um pequeno atraso para permitir que a animação CSS termine
                    setTimeout(() => {
                        textSpan.classList.remove("glitch-effect");
                    }, 300); // Duração da animação glitch CSS
                    tag.classList.remove("glitch-active");
                    tag.removeEventListener("mouseout", mouseOutHandler);
                };
                tag.addEventListener("mouseout", mouseOutHandler);
            });
        });
    }

    // Add glitch effect on random intervals for titles
    function initRandomGlitchEffect() {
        setInterval(() => {
            const elements = document.querySelectorAll("h1, h2");
            if (elements.length === 0) return;
            
            const randomElement = elements[Math.floor(Math.random() * elements.length)];
            randomElement.classList.add("glitch-effect");
            setTimeout(() => {
                randomElement.classList.remove("glitch-effect");
            }, 300);
        }, 10000);
    }

    // Initialize everything when DOM is loaded
    function init() {
        // Start effects
        createMatrix();
        createParticles();
        typeWriter();
        
        // Observe loading elements
        const loadingElements = document.querySelectorAll('.loading');
        loadingElements.forEach(el => observer.observe(el));
        
        // Remove loading class from body
        setTimeout(() => {
            document.body.classList.remove('loading');
            document.body.classList.add('loaded');
        }, 100);
        
        // Initialize interactions
        initSmoothScrolling();
        initParallaxEffect();
        initHeaderScrollEffect();
        initFormSubmission();
        initSkillTagGlitch();
        initRandomGlitchEffect();
    }

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();