// Variáveis globais
let modoSecretoAtivo = false;
let contadorMensagens = 0;
let etapaConversacao = null;

// Função principal para enviar mensagens
function enviarMensagem() {
    const inputMensagem = document.getElementById("userInput");
    const mensagem = inputMensagem.value.toLowerCase().trim();
    inputMensagem.value = "";

    if (!mensagem) {
        alert("Por favor, digite uma mensagem antes de enviar.");
        return;
    }

    adicionarMensagemAoChat("Você: " + mensagem, "user-message");

    const resposta = gerarResposta(mensagem);
    const indicador = mostrarDigitando();

    setTimeout(() => {
        removerDigitando(indicador);
        adicionarMensagemAoChat(resposta, "bot-message");
    }, 1000);

    contadorMensagens++;
    if (contadorMensagens % 3 === 0 && Math.random() < 0.6) {
        interacaoExtra();
    }
}

// Função para adicionar mensagens ao chat
function adicionarMensagemAoChat(texto, classe) {
    const chatBox = document.getElementById("chatbox");
    const novaMensagem = document.createElement("div");
    novaMensagem.className = "message " + classe;
    novaMensagem.innerText = texto;
    chatBox.appendChild(novaMensagem);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Função para salvar e carregar histórico do chat
function salvarHistorico() {
    const chatBox = document.getElementById("chatbox");
    const mensagens = chatBox.innerHTML;
    localStorage.setItem("historicoChat", mensagens);
}

function carregarHistorico() {
    const historico = localStorage.getItem("historicoChat");
    if (historico) {
        document.getElementById("chatbox").innerHTML = historico;
    }
}

// Função para gerar respostas do chatbot
function gerarResposta(mensagem) {
    if (etapaConversacao === "projetos_ou_habilidades") {
        etapaConversacao = null;
        if (mensagem.includes("projeto")) {
            return "Beleza! Tem projeto de impacto social, joguinho retrô, e até experiências com API. Qual tipo você prefere?";
        } else if (mensagem.includes("habilidade") || mensagem.includes("skill")) {
            return "Ela manda bem em HTML, CSS, JS e está por começar a se aventurar no mundo do Python. Quer ver um exemplo prático?";
        } else {
            return "Hmm, não entendi bem, mas posso te mostrar os dois se quiser! 😄";
        }
    }

    if (mensagem.includes("me fale mais dela") || mensagem.includes("quero saber mais dela")) {
        etapaConversacao = "projetos_ou_habilidades";
        return "Você quer saber mais sobre os projetos ou sobre as habilidades dela? 💡";
    }

    if (mensagem.includes("tudo bem") || mensagem.includes("como você está") || mensagem.includes("como vai") || mensagem.includes("tudo certo")) {
        const respostasTudoBem = [
            "Tudo ótimo aqui! E você? Tudo certo por aí? 😄",
            "Tá tudo bem! E você, como está se sentindo?",
            "Tudo bem, sempre na correria aqui! E aí, como vai você?",
            "Eu estou bem, e você? Como está indo o dia? 😊"
        ];
        return respostasTudoBem[Math.floor(Math.random() * respostasTudoBem.length)];
    }

    if (mensagem.includes("oi") || mensagem.includes("olá") || mensagem.includes("e aí")) {
        const respostasSaudacao = [
            "Oi! Tudo bem com você? 😊",
            "Olá! Como posso te ajudar hoje? 😄",
            "E aí! Pronto para bater um papo? 🤖",
            "Oi, oi! Espero que seu dia esteja ótimo! 🚀"
        ];
        return respostasSaudacao[Math.floor(Math.random() * respostasSaudacao.length)];
    }

    if (mensagem.includes("vantari") || mensagem.includes("empresa")) {
        const sobreVantari = [
            "A Vantari Systems é uma empresa focada em soluções tecnológicas inovadoras. Quer saber mais sobre o que fazemos? 💻",
            "Na Vantari, desenvolvemos sistemas que ajudam empresas a crescer e se destacar no mercado. Quer conhecer alguns projetos? 🚀",
            "A Vantari é conhecida por sua abordagem criativa e eficiente no desenvolvimento de software. Quer saber como trabalhamos? 🛠️",
            "Além de tecnologia, a Vantari valoriza o impacto social e a sustentabilidade. Quer saber como aplicamos isso nos projetos? 🌱",
            "Se você está curioso, posso te contar mais sobre a equipe incrível da Vantari. Quer ouvir? 👩‍💻👨‍💻"
        ];
        return sobreVantari[Math.floor(Math.random() * sobreVantari.length)];
    }

    // Adicione mais condições aqui para personalizar as respostas
    return "Eita... 🤔 Não entendi nadinha. Tenta perguntar de outro jeito? Ou só fala comigo mesmo, gosto de conversar! 😄";
}

// Função para interações extras
function interacaoExtra() {
    const interacoesExtras = [
        "Sabia que a criadora deste portfólio adora unir código e arte? 🎨💻",
        "Se quiser, posso contar os bastidores da criação desse site. Quer ouvir? 😏",
        "Você prefere ver mais sobre os projetos ou sobre as habilidades dela? 👀",
        "Aliás, você sabia que ela começou a programar há pouco tempo e já manda super bem? 🚀",
        "Curte design também ou está mais pelo código mesmo? 👩‍💻👨‍🎨"
    ];
    setTimeout(() => {
        adicionarMensagemAoChat(interacoesExtras[Math.floor(Math.random() * interacoesExtras.length)], "bot-message");
    }, 2000);
}

// Funções para indicador de "digitando..."
function mostrarDigitando() {
    const chatBox = document.getElementById("chatbox");
    const digitando = document.createElement("div");
    digitando.className = "bot-message typing-indicator";
    digitando.innerText = "Digitando...";
    chatBox.appendChild(digitando);
    chatBox.scrollTop = chatBox.scrollHeight;

    return digitando;
}

function removerDigitando(elemento) {
    elemento.remove();
}

// Eventos de carregamento e saída da página
window.onload = carregarHistorico;
window.onbeforeunload = salvarHistorico;

// Eventos de interação com o botão e o campo de entrada
document.getElementById("sendButton").addEventListener("click", enviarMensagem);
document.getElementById("userInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        enviarMensagem();
    }
});

// Tema alternativo (dark/light)
const toggleThemeButton = document.getElementById('toggleThemeButton');
toggleThemeButton.addEventListener("click", () => {
    const body = document.body;
    const currentTheme = body.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    body.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
});

// Carregar tema ao iniciar
window.onload = () => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.body.setAttribute("data-theme", savedTheme);
    carregarHistorico();
};
