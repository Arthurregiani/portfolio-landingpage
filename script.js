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

    // Form submission with robust cold-start handling
    function initFormSubmission() {
        const form = document.querySelector('form');
        if (!form) return;
        
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const button = e.target.querySelector('button');
            if (!button) return;
            
            const formData = new FormData(e.target);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                message: formData.get('message')
            };
            
            // Validation
            if (!data.name || !data.email || !data.message) {
                showNotification('❌ Por favor, preencha todos os campos', 'error');
                return;
            }
            
            const originalText = button.innerHTML;
            
            try {
                const result = await submitFormWithRetry(data, button);
                
                if (result.success) {
                    button.innerHTML = `<span class="relative z-10">${CONFIG.MESSAGES.SUCCESS}</span>`;
                    showNotification('✅ ' + result.message, 'success');
                    e.target.reset();
                } else {
                    throw new Error(result.message || 'Erro ao enviar mensagem');
                }
                
            } catch (error) {
                console.error('Erro ao enviar formulário:', error);
                button.innerHTML = `<span class="relative z-10">${CONFIG.MESSAGES.ERROR}</span>`;
                
                if (error.name === 'AbortError') {
                    showNotification('❌ Tempo limite excedido. O servidor pode estar inicializando.', 'error');
                } else {
                    showNotification('❌ Erro ao enviar mensagem. Tente novamente.', 'error');
                }
            } finally {
                setTimeout(() => {
                    button.innerHTML = originalText;
                    button.disabled = false;
                }, 3000);
            }
        });
    }
    
    // Smart endpoint selection with automatic fallback
    async function getWorkingEndpoint() {
        if (!CONFIG.BACKEND_ENDPOINTS) {
            return { contactUrl: CONFIG.BACKEND_URL, healthUrl: CONFIG.HEALTH_CHECK_URL };
        }
        
        // Try endpoints in priority order
        for (const endpoint of CONFIG.BACKEND_ENDPOINTS.sort((a, b) => a.priority - b.priority)) {
            try {
                console.log(`Testing endpoint: ${endpoint.name}`);
                const response = await fetchWithTimeout(endpoint.healthUrl, { method: 'HEAD' }, 5000);
                if (response.ok) {
                    console.log(`✅ Selected working endpoint: ${endpoint.name}`);
                    return endpoint;
                }
            } catch (error) {
                console.log(`❌ Endpoint failed: ${endpoint.name} - ${error.message}`);
                continue;
            }
        }
        
        // If all endpoints fail, return the first one as last resort
        console.log('⚠️ All endpoints failed, using primary as fallback');
        return CONFIG.BACKEND_ENDPOINTS[0];
    }
    
    // Enhanced form submission with intelligent endpoint selection
    async function submitFormWithRetry(data, button) {
        let attempt = 0;
        let selectedEndpoint = null;
        
        while (attempt <= CONFIG.MAX_RETRIES) {
            try {
                // Select working endpoint on first attempt
                if (attempt === 0) {
                    button.innerHTML = `<span class="relative z-10">$ selecionando melhor servidor...</span>`;
                    selectedEndpoint = await getWorkingEndpoint();
                    button.innerHTML = `<span class="relative z-10">${CONFIG.MESSAGES.COLD_START_WARNING}</span>`;
                } else {
                    button.innerHTML = `<span class="relative z-10">${CONFIG.MESSAGES.RETRYING(attempt, CONFIG.MAX_RETRIES)}</span>`;
                }
                button.disabled = true;
                
                const contactUrl = selectedEndpoint ? selectedEndpoint.contactUrl : CONFIG.BACKEND_URL;
                console.log(`Sending form to: ${contactUrl}`);
                
                const response = await fetchWithTimeout(contactUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }, CONFIG.REQUEST_TIMEOUT_MS);
                
                const result = await response.json();
                
                if (response.ok) {
                    return result;
                } else if (response.status >= 400 && response.status < 500) {
                    // Client errors (4xx) - don't retry
                    throw new Error(result.message || 'Erro na requisição');
                } else {
                    // Server errors (5xx) - retry
                    throw new Error(result.message || 'Erro no servidor');
                }
                
            } catch (error) {
                console.log(`Tentativa ${attempt + 1} falhou:`, error.message);
                
                // Check for various network/connection errors
                if (error.message.includes('certificate') || 
                    error.message.includes('SSL') || 
                    error.message.includes('CERT') ||
                    error.message.includes('net::ERR_CERT') ||
                    error.message.includes('ERR_NAME_NOT_RESOLVED') ||
                    error.message.includes('ERR_CONNECTION') ||
                    error.name === 'TypeError' && attempt === 0) {
                    
                    console.log('Detectado erro de rede/DNS:', error.message);
                    // Show troubleshooting help modal
                    showTroubleshootingHelp(error);
                    throw new Error('Problema de conectividade detectado');
                }
                
                // Don't retry on client errors or abort errors
                if (error.name === 'AbortError' || (error.message && error.message.includes('na requisição'))) {
                    throw error;
                }
                
                attempt++;
                
                // If we have more attempts, wait before retrying
                if (attempt <= CONFIG.MAX_RETRIES) {
                    const delay = CONFIG.RETRY_DELAYS[attempt - 1] || 5000;
                    await new Promise(resolve => setTimeout(resolve, delay));
                } else {
                    throw error; // Final attempt failed
                }
            }
        }
    }
    
    // Fetch with configurable timeout using AbortController
    async function fetchWithTimeout(url, options = {}, timeoutMs = 30000) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
        
        try {
            const response = await fetch(url, {
                ...options,
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            return response;
        } catch (error) {
            clearTimeout(timeoutId);
            throw error;
        }
    }
    
    // Show troubleshooting help modal
    function showTroubleshootingHelp(error) {
        // Remove existing modal
        const existing = document.querySelector('.troubleshoot-modal');
        if (existing) existing.remove();
        
        const modal = document.createElement('div');
        modal.className = 'troubleshoot-modal fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4';
        
        let troubleshootContent = '';
        if (error.message.includes('ERR_NAME_NOT_RESOLVED') || error.message.includes('ERR_CONNECTION')) {
            troubleshootContent = `
                <h3 class="text-xl font-bold text-accent-cyan mb-4">🌐 Problema de Conexão</h3>
                <p class="text-text-dark mb-4">Não foi possível conectar à API. Isso pode ser:</p>
                <ul class="text-text-dark text-sm mb-4 space-y-1">
                    <li>• Problema temporário de DNS (aguarde alguns minutos)</li>
                    <li>• Bloqueio de firewall/antivírus</li>
                    <li>• Problemas na sua conexão de internet</li>
                </ul>
            `;
        } else {
            troubleshootContent = `
                <h3 class="text-xl font-bold text-accent-cyan mb-4">🔒 Problema de Segurança</h3>
                <p class="text-text-dark mb-4">A API usa certificados SSL confiáveis, mas houve um erro:</p>
                <ul class="text-text-dark text-sm mb-4 space-y-1">
                    <li>• Tente recarregar a página (Ctrl+F5)</li>
                    <li>• Limpe o cache do navegador</li>
                    <li>• Verifique se não há extensões bloqueando</li>
                </ul>
            `;
        }
        
        modal.innerHTML = `
            <div class="bg-background-secondary rounded-xl p-6 max-w-md mx-auto glass-strong">
                ${troubleshootContent}
                <div class="bg-background-dark rounded p-3 mb-4">
                    <p class="text-xs font-mono text-accent-green">Erro técnico:</p>
                    <p class="text-xs font-mono text-text-dark">${error.message}</p>
                </div>
                <div class="flex gap-3">
                    <button class="btn-test-api bg-accent-cyan text-background-dark px-4 py-2 rounded font-bold hover:bg-accent-blue transition-colors" onclick="window.open('https://arthurlandingapi.duckdns.org/health', '_blank')">
                        🔗 Testar API
                    </button>
                    <button class="btn-reload bg-accent-green text-background-dark px-4 py-2 rounded font-bold hover:bg-green-600 transition-colors" onclick="location.reload(true)">
                        🔄 Recarregar
                    </button>
                    <button class="btn-close bg-background-dark text-text-dark px-4 py-2 rounded font-bold hover:bg-gray-600 transition-colors">
                        ✖ Fechar
                    </button>
                </div>
            </div>
        `;
        
        // Close modal on click
        modal.querySelector('.btn-close').addEventListener('click', () => {
            modal.remove();
        });
        
        // Close modal on backdrop click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
        document.body.appendChild(modal);
    }
    
    // Show notification function
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existing = document.querySelector('.notification');
        if (existing) existing.remove();
        
        const notification = document.createElement('div');
        notification.className = `notification fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg font-mono text-sm max-w-sm transition-all duration-300 transform translate-x-full`;
        
        if (type === 'success') {
            notification.classList.add('bg-accent-green', 'text-background-dark');
        } else if (type === 'error') {
            notification.classList.add('bg-red-500', 'text-white');
        } else {
            notification.classList.add('bg-accent-cyan', 'text-background-dark');
        }
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
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
    
    // Keep-alive mechanism to prevent server cold starts
    function initKeepAlive() {
        if (!CONFIG.KEEP_ALIVE_ENABLED) return;
        
        console.log('🔄 Keep-alive ativado - ping a cada', CONFIG.KEEP_ALIVE_INTERVAL / 1000 / 60, 'minutos');
        
        const pingServer = async () => {
            try {
                const response = await fetchWithTimeout(CONFIG.HEALTH_CHECK_URL, {
                    method: 'GET',
                    headers: { 'Cache-Control': 'no-cache' }
                }, 10000); // 10 second timeout for keep-alive
                
                if (response.ok) {
                    console.log('🟢 Keep-alive ping successful');
                } else {
                    console.warn('🟡 Keep-alive ping failed:', response.status);
                }
            } catch (error) {
                console.warn('🟡 Keep-alive ping error:', error.message);
            }
        };
        
        // Initial ping after 1 minute (let page load first)
        setTimeout(pingServer, 60000);
        
        // Set up regular interval
        setInterval(pingServer, CONFIG.KEEP_ALIVE_INTERVAL);
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
        initKeepAlive();
    }

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();