const perguntasRespostas = {
    "o que é câncer de mama?": "O câncer de mama é o crescimento descontrolado de células nas mamas.",
    "como posso fazer o autoexame?": "Você pode fazer o autoexame tocando suas mamas com movimentos circulares, cobrindo toda a área e observando mudanças.",
    "quais são os sintomas do câncer de mama?": "Os sintomas podem incluir nódulos palpáveis, mudanças na forma da mama, alterações na pele e secreção no mamilo.",
    "quando devo procurar um médico?": "Você deve procurar um médico se perceber algum nódulo ou mudança incomum nas suas mamas.",
    "encontrei um nódulo. isso significa que tenho câncer?": "Nem todos os nódulos são cancerosos. Muitas vezes, podem ser benignos. É importante procurar um médico para uma avaliação mais detalhada.",
    "o que devo fazer se sentir dor durante o autoexame?": "A dor nas mamas pode ser causada por diferentes fatores, incluindo alterações hormonais. Se a dor persistir ou for acompanhada de outros sintomas, consulte um médico.",
    "detectei uma secreção no mamilo. isso é normal?": "Secreções no mamilo podem ocorrer por várias razões, mas secreções sanguinolentas ou claras devem ser avaliadas por um médico.",
    "minhas mamas parecem assimétricas. isso é um problema?": "É normal que uma mama seja ligeiramente maior que a outra. No entanto, se você notar uma nova assimetria ou mudanças significativas, consulte seu médico.",
    "senti mudanças na textura da pele da mama. o que isso significa?": "Mudanças na textura da pele, como pele enrugada ou com aspecto de casca de laranja, podem ser sinais de alerta. Procure um médico para uma avaliação."
};

document.addEventListener('DOMContentLoaded', function() {
    // Função para alternar a visibilidade do chatbox
    function toggleChat() {
        const chatbox = document.getElementById('chatbox');
        chatbox.classList.toggle('hidden');
    }

    // Evento de clique no botão do chatbot
    document.getElementById('chatbot-toggle').addEventListener('click', toggleChat);

    // Enviar mensagem
    document.getElementById('btn-submit').addEventListener('click', function() {
        const messageInput = document.getElementById('message-input');
        const message = messageInput.value.trim();
        if (message !== '') {
            const history = document.getElementById('history');
            
            // Adicionar a pergunta do usuário
            const userMessage = document.createElement('div');
            userMessage.textContent = 'Você: ' + message;
            userMessage.classList.add('user-message');
            history.appendChild(userMessage);

            // Verificar se a pergunta existe no "banco de dados"
            const resposta = perguntasRespostas[message];
            const botResponse = document.createElement('div');
            botResponse.classList.add('bot-response');
            if (resposta) {
                botResponse.textContent = 'Resposta: ' + resposta;
            } else {
                botResponse.textContent = 'Resposta: Desculpe, não entendi sua pergunta. Tente outra vez.';
            }
            history.appendChild(botResponse);

            // Limpar o campo de entrada e rolar o histórico para a última mensagem
            messageInput.value = '';
            history.scrollTop = history.scrollHeight;
        }
    });
});

let currentSlide = 1;
const totalSlides = 3;

function moveSlide(direction) {
    currentSlide += direction;
    if (currentSlide > totalSlides) {
        currentSlide = 1;
    } else if (currentSlide < 1) {
        currentSlide = totalSlides;
    }
    document.getElementById('slide' + currentSlide).checked = true;
}

function autoScroll() {
    moveSlide(1);
}

// Start auto-scrolling
let scrollInterval = setInterval(autoScroll, 3000);

// Pause auto-scrolling when hovering over the carousel
document.querySelector('.carousel-container').addEventListener('mouseenter', () => {
    clearInterval(scrollInterval);
});

// Resume auto-scrolling when mouse leaves the carousel
document.querySelector('.carousel-container').addEventListener('mouseleave', () => {
    scrollInterval = setInterval(autoScroll, 3000);
});
