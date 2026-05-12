// ============================================
// SCRIPT PRINCIPAL - CURRÍCULO KELVIN LENER
// ============================================

// Função para animar as barras de skills quando entram em viewport
document.addEventListener('DOMContentLoaded', function() {
    initSkillBars();
    initScrollAnimations();
    initSmoothScroll();
});

// ============================================
// ANIMAÇÃO DAS BARRAS DE SKILLS
// ============================================

function updateSkillBar(skillItem) {
    const level = parseInt(skillItem.getAttribute('data-level'));
    const skillFill = skillItem.querySelector('.skill-fill');
    const skillLevel = skillItem.querySelector('.skill-level');
    const percentage = level * 10;
    
    // Atualizar a barra
    skillFill.style.width = percentage + '%';
    skillFill.style.background = 'linear-gradient(90deg, #87CEEB 0%, #FF0000 100%)';
    
    // Atualizar o texto do nível
    skillLevel.textContent = level + '/10';
    
    // Reiniciar animação
    skillFill.style.animation = 'none';
    void skillFill.offsetWidth;
    skillFill.style.animation = 'fillSkill 1.5s ease-out forwards';
}

function initSkillBars() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                updateSkillBar(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    skillItems.forEach(item => observer.observe(item));
    
    // Permitir edição clicando 2x na barra
    skillItems.forEach(item => {
        item.addEventListener('dblclick', function() {
            const currentLevel = parseInt(this.getAttribute('data-level'));
            const newLevel = prompt('Digite o novo nível de habilidade (0-10):', currentLevel);
            
            if (newLevel !== null && newLevel >= 0 && newLevel <= 10) {
                this.setAttribute('data-level', newLevel);
                updateSkillBar(this);
            } else if (newLevel !== null) {
                alert('Por favor, digite um número entre 0 e 10');
            }
        });
    });
}

// ============================================
// ANIMAÇÕES DE SCROLL
// ============================================

function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.experience-item, .cert-item, .recommendation-item'
    );

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(element);
    });
}

// ============================================
// SCROLL SUAVE
// ============================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

// ============================================
// EFEITO DE PARALLAX NA FOTO DE PERFIL
// ============================================

window.addEventListener('scroll', function() {
    const profilePhoto = document.querySelector('.profile-photo');
    if (profilePhoto) {
        const scrollPosition = window.pageYOffset;
        profilePhoto.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    }
});

// ============================================
// ADICIONAR CLASSE ATIVA AO SCROLL
// ============================================

window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            section.style.opacity = '1';
        }
    });
});

// ============================================
// FUNÇÃO PARA COPIAR EMAIL
// ============================================

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        alert('Email copiado para a área de transferência!');
    }, function(err) {
        console.error('Erro ao copiar:', err);
    });
}

// ============================================
// EFEITO DE HOVER NAS SKILL BARS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const skillFill = this.querySelector('.skill-fill');
            if (skillFill) {
                skillFill.style.filter = 'brightness(1.2)';
                skillFill.style.boxShadow = '0 0 20px rgba(0, 255, 0, 0.6)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const skillFill = this.querySelector('.skill-fill');
            if (skillFill) {
                skillFill.style.filter = 'brightness(1)';
                skillFill.style.boxShadow = '0 0 10px rgba(0, 255, 0, 0.3)';
            }
        });
    });
});

// ============================================
// CONTADOR DE EXPERIÊNCIA (OPCIONAL)
// ============================================

function calculateExperience() {
    const startDate = new Date('2021-08-01');
    const today = new Date();
    const years = Math.floor((today - startDate) / (365.25 * 24 * 60 * 60 * 1000));
    const months = Math.floor(((today - startDate) % (365.25 * 24 * 60 * 60 * 1000)) / (30.44 * 24 * 60 * 60 * 1000));
    
    return { years, months };
}

// ============================================
// FUNÇÃO PARA DETECTAR TEMA ESCURO/CLARO
// ============================================

function detectTheme() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.add('light-theme');
    }
}

// Chamar ao carregar
detectTheme();

// ============================================
// MONITORAR MUDANÇAS DE TEMA DO SISTEMA
// ============================================

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (e.matches) {
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
    }
});

// ============================================
// FUNÇÃO PARA IMPRIMIR O CURRÍCULO
// ============================================

function printResume() {
    window.print();
}

// ============================================
// FUNÇÃO PARA DOWNLOAD DO CURRÍCULO (FUTURO)
// ============================================

function downloadResume() {
    alert('Funcionalidade de download será implementada em breve!');
}

// ============================================
// ANIMAÇÃO DE ENTRADA DA PÁGINA
// ============================================

window.addEventListener('load', function() {
    document.body.style.opacity = '1';
    document.body.style.animation = 'fadeIn 0.8s ease-out';
});

// ============================================
// FUNÇÃO DE VALIDAÇÃO DE LINKS
// ============================================

function validateLinks() {
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        if (!link.href || link.href === '#') {
            console.warn('Link inválido encontrado:', link);
        }
    });
}

// Executar validação ao carregar
validateLinks();

// ============================================
// FUNÇÃO PARA ADICIONAR TOOLTIPS
// ============================================

function initTooltips() {
    const elements = document.querySelectorAll('[data-tooltip]');
    elements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.getAttribute('data-tooltip');
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.position = 'fixed';
            tooltip.style.top = (rect.top - 40) + 'px';
            tooltip.style.left = (rect.left + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';
        });
        
        element.addEventListener('mouseleave', function() {
            const tooltip = document.querySelector('.tooltip');
            if (tooltip) tooltip.remove();
        });
    });
}

// ============================================
// PERFORMANCE: LAZY LOADING DE IMAGENS
// ============================================

function initLazyLoading() {
    const images = document.querySelectorAll('img');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Chamar ao carregar
initLazyLoading();

// ============================================
// CONSOLE LOG DE BOAS-VINDAS
// ============================================

console.log('%c Bem-vindo ao Currículo de Kelvin Lener! ', 'background: #e94560; color: white; font-size: 14px; padding: 10px;');
console.log('%c Analista de Sistemas | Especialidade: FreeFlow, HS WIM, Cloud ', 'color: #0f3460; font-size: 12px;');
console.log('%c Dica: Clique 2x em qualquer barra de skills para editar o nível! ', 'color: #00ff00; font-size: 11px; font-weight: bold;');
console.log('%c Desenvolvido com dedicação e atenção aos detalhes ', 'color: #b0b0b0; font-size: 11px; font-style: italic;');
