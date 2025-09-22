'use strict';

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
                // Use simple direct approach like the test page
                const result = await submitFormDirect(data, button);
                
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
                } else if (error.message.includes('certificate') || error.message.includes('NetworkError')) {
                    showTroubleshootingHelp(error);
                } else {
                    showNotification('❌ Erro ao enviar mensagem. Tente novamente.', 'error');
                }
            }
                setTimeout(() => {
                    button.innerHTML = originalText;
                    button.disabled = false;
                }, 3000);
            }
        });
    }
    
    // Simple direct form submission (same logic as working test page)
    async function submitFormDirect(data, button) {
        const endpoints = [
            'https://arthurlandingapi.duckdns.org/api/contact',
            'https://18.228.193.155/api/contact'
        ];
        
        button.innerHTML = `<span class="relative z-10">$ enviando...</span>`;
        button.disabled = true;
        
        // Try each endpoint until one works
        for (let i = 0; i < endpoints.length; i++) {
            const endpoint = endpoints[i];
            const endpointName = i === 0 ? 'DuckDNS + Let\'s Encrypt' : 'Direct IP + Self-signed';
            
            try {
                console.log(`Trying ${endpointName}: ${endpoint}`);
                
                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                
                if (!response.ok) {
                    console.warn(`${endpointName} failed with status ${response.status}`);
                    continue; // Try next endpoint
                }
                
                const result = await response.json();
                console.log(`✅ Success with ${endpointName}:`, result);
                return result;
                
            } catch (error) {
                console.error(`${endpointName} failed:`, error.message);
                
                if (i === endpoints.length - 1) {
                    // Last endpoint failed, throw error
                    throw new Error(`Todos os endpoints falharam. Último erro: ${error.message}`);
                }
                // Continue to next endpoint
            }
        }
        
        throw new Error('Nenhum endpoint funcionou');
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
                
                // Use direct URL that works in tests
                const contactUrl = 'https://arthurlandingapi.duckdns.org/api/contact';
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
                    <li>• Verifique a data e hora do seu sistema</li>
                    <li>• Tente em outro navegador ou dispositivo</li>
                </ul>
            `;
        }
        
        modal.innerHTML = `
            <div class="bg-background-secondary p-8 rounded-lg shadow-lg max-w-md w-full relative border border-accent-cyan">
                <button class="absolute top-3 right-3 text-text-dark hover:text-accent-cyan text-2xl" onclick="this.closest('.troubleshoot-modal').remove()">×</button>
                ${troubleshootContent}
                <p class="text-text-dark text-xs mt-4">Detalhes do erro: ${error.message}</p>
                <a href="https://github.com/Arthurregiani/portfolio-landingpage/blob/main/TESTING_GUIDE.md" target="_blank" class="text-accent-blue hover:underline text-sm mt-2 block">Guia de Testes e Solução de Problemas</a>
            </div>
        `;
        document.body.appendChild(modal);
    }

    // Show notification
    function showNotification(message, type) {
        const notificationContainer = document.getElementById('notification-container');
        if (!notificationContainer) {
            const div = document.createElement('div');
            div.id = 'notification-container';
            div.className = 'fixed bottom-5 right-5 z-50 space-y-2';
            document.body.appendChild(div);
            notificationContainer = document.getElementById('notification-container');
        }

        const notification = document.createElement('div');
        notification.className = `p-4 rounded-lg shadow-md text-white ${type === 'success' ? 'bg-green-500' : 'bg-red-500'}`;
        notification.textContent = message;
        notificationContainer.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 5000);
    }

    // Initialize all effects and functionalities
    document.addEventListener('DOMContentLoaded', () => {
        // Remover classes loading imediatamente para elementos críticos
        const criticalElements = document.querySelectorAll('.loading');
        criticalElements.forEach(el => {
            // Adicione aqui os seletores para os elementos que você considera críticos e devem ser visíveis imediatamente
            // Por exemplo, se o header e o título principal devem ser visíveis:
            if (el.closest('header') || el.querySelector('.hero-title')) {
                el.classList.remove('loading');
                el.classList.add('loaded');
            }
        });

        // Inicializar efeitos apenas se elementos existirem
        if (document.getElementById('matrix')) {
            createMatrix();
        }
        if (document.getElementById('particles')) {
            createParticles();
        }
        if (document.getElementById('typed-text')) {
            typeWriter();
        }
        initSmoothScrolling();
        initParallaxEffect();
        initHeaderScrollEffect();
        initFormSubmission();

        // Observe elementos para animações
        document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .scale-in').forEach(el => {
            observer.observe(el);
        });
    });

})();

// Verificação de fallback caso recursos não carreguem
window.addEventListener('load', function() {
    // Se após 2 segundos ainda houver elementos loading, remover as classes
    setTimeout(function() {
        const loadingElements = document.querySelectorAll('.loading');
        loadingElements.forEach(function(el) {
            el.classList.remove('loading');
            el.classList.add('loading-fallback');
        });
    }, 2000);
});


