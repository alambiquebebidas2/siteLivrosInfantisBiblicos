// 1. GESTÃO DE COOKIES (Salva no Local, mas controla exibição pela Sessão)
function acceptCookies() {
    const overlay = document.getElementById('cookie-overlay');
    if (overlay) {
        overlay.style.display = 'none';
        document.body.classList.remove('stop-scroll');
        
        // SALVA PERMANENTE: Não será deletado
        localStorage.setItem('historico_aceitacao', 'true');
        
        // CONTROLE VISUAL: Este aqui morre quando fechar a aba/navegador
        sessionStorage.setItem('exibir_banner_nesta_aba', 'confirmado');
    }
}

// 2. INICIALIZAÇÃO GERAL
document.addEventListener('DOMContentLoaded', () => {
    // A lógica é: Só esconde o banner se existir a marca na SESSÃO.
    // Se ele fechar o navegador, a marca da SESSÃO some, o banner volta, 
    // mas o que está no localStorage continua lá guardado.
    
    if (sessionStorage.getItem('exibir_banner_nesta_aba') === 'confirmado') {
        const overlay = document.getElementById('cookie-overlay');
        if (overlay) overlay.style.display = 'none';
        document.body.classList.remove('stop-scroll');
    }

    // Inicia os outros componentes (Timer e Vendas)
    const timerDisplay = document.getElementById('timer');
    startTimer(60 * 15, timerDisplay);
    initSalesPopup();
});

// 3. TIMER REGRESSIVO 15 MIN
function startTimer(duration, display) {
    if (!display) return;
    let timer = duration, minutes, seconds;
    setInterval(() => {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        display.textContent = minutes + ":" + seconds;
        if (--timer < 0) timer = duration;
    }, 1000);
}

// --- CONFIGURAÇÃO DE FREQUÊNCIA DO POPUP DE VENDAS ---

function initSalesPopup() {
    const names = ["Fernanda", "Marcos", "Cláudia", "Renata", "Ester", "Paulo", "Juliana", "Mariana", "Ricardo", "Beatriz", "Samuel", "Raquel", "Lucas", "Pedro", "Manoel"];
    const popup = document.getElementById('sales-notification');
    const nameSpan = document.getElementById('buyer-name');

    if (!popup || !nameSpan) return;

    // Função para mostrar o popup
    const showPopup = () => {
        // Só exibe se o usuário já aceitou os cookies (site liberado)
        if (!document.body.classList.contains('stop-scroll')) {
            const randomName = names[Math.floor(Math.random() * names.length)];
            nameSpan.textContent = randomName;
            
            popup.classList.add('active');

            // Fica visível por 4 segundos
            setTimeout(() => {
                popup.classList.remove('active');
            }, 4000);
        }
    };

    // --- AJUSTE DE TEMPO AQUI ---
    // 8000 milisegundos = 10 segundos (mude para 5000 se quiser ainda mais rápido)
    setInterval(showPopup, 20000); 

    // Dispara a primeira vez logo após 4 segundos que a página carregar
    setTimeout(showPopup, 5000);
}


window.onscroll = function() {
    const btn = document.getElementById("backToTop");
    if (!btn) return;

    // 1. Mostrar/Esconder botão (300px)
    if (window.pageYOffset > 300) {
        btn.style.display = "flex";
    } else {
        btn.style.display = "none";
    }

    // 2. Detectar se chegou no rodapé (margem de 100px)
    const totalHeight = document.documentElement.scrollHeight;
    const currentPos = window.innerHeight + window.pageYOffset;
    
    if (currentPos >= totalHeight - 100) {
        btn.classList.add("pulse-red");
    } else {
        btn.classList.remove("pulse-red");
    }
};

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}