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
    return "Ela já criou soluções pra causas sociais, sites institucionais e até joguinhos simples em JS. Mas em vez de listar tudo, que tal dar uma olhada rápida na seção de projetos acima? Se quiser detalhes ou acesso ao repositório, é só chamar a Rafa por e-mail ou GitHub no final da página! 📬";
}

        } else if (mensagem.includes("habilidade") || mensagem.includes("skill")) {
            return "A Rafa está aprendendo tecnologias como HTML, CSS e JavaScript, e começou a explorar o mundo do Python também! 🐍 Tudo com foco em criar coisas úteis e simples. Quer ver como ela tem aplicado isso?";
        } else {
            return "Hmm, não peguei muito bem, mas posso te mostrar projetos e habilidades. Qual você prefere? 😉";
            ;
        }
    }

    if (mensagem.includes("me fale mais dela") || mensagem.includes("quero saber mais dela")) {
        etapaConversacao = "projetos_ou_habilidades";
        return "Claro! 😄 O que você gostaria de saber mais? Vamos conversar sobre os **projetos incríveis** ou as **habilidades que ela está desenvolvendo**? 💻🚀";
    }
    

    if (mensagem.includes("tudo bem") || mensagem.includes("como você está") || mensagem.includes("como vai") || mensagem.includes("tudo certo")) {
        const respostasTudoBem = [
            "Tudo bem por aqui! E você, tudo certo? 😄",
            "Com o cérebro cheio de código, mas tudo tranquilo! 😎",
            "Estou sempre cheia de energia! E você, como vai? 🚀",
        ];
        return respostasTudoBem[Math.floor(Math.random() * respostasTudoBem.length)];
    }
    if (mensagem.includes("trabalho em equipe") || mensagem.includes("soft skills")) {
        return "A Rafa curte muito trabalhar em equipe, resolver problemas de forma prática e criar com empatia. Ela acredita que o lado humano também conta (e muito!) na tecnologia. Que tal ver como ela coloca isso em prática nos projetos? 👩‍💻";
    }

     if (mensagem.includes("vantari") || mensagem.includes("empresa")) {
            return "A Vantari nasceu com o propósito de tornar a tecnologia mais acessível, prática e humana. Começou com ideias pequenas e já tá virando solução real. Quer entender a visão por trás da marca? Fala com a fundadora — ela adora trocar ideia!";
        }        
🌱";
    }
    if (mensagem.includes(Curiosidades) || mensagem.includes("Algo que eu ainda não saiba")){
        [
            const interacoesExtras = [
                "Sabia que a Rafa veio da área da saúde? Essa transição tá rendendo umas ideias bem criativas! 💡",
                "Se quiser, posso contar como foi o processo de criação desse portfólio... ou você pode perguntar direto pra ela ali no final! 😉",
                "Ela acredita que a simplicidade e a empatia também fazem parte do bom código. Curioso pra entender melhor? Manda uma pergunta pra ela!",
                "Cada projeto aqui tem um porquê. Mas não vou entregar tudo de bandeja... Quer entender o contexto? Bora conversar com ela. 💬",
                "Ah, e ela é daquelas que aprende rápido e vai fundo! Quer ver isso ao vivo? Clica no contato lá embaixo. 🚀" 
            ];
            
          ]
          
    }
    if (mensagem.includes("oi") || mensagem.includes("olá") || mensagem.includes("e aí")) {
        const respostasSaudacao = [
            "Oi! 😊 Eu sou a Auri. Quer saber mais sobre a Rafaella? É só perguntar!",
            "Olá! 👋 Posso te contar sobre os projetos, habilidades e a história da Rafa.",
            "E aí! 🚀 Bora bater um papo sobre essa jornada na tecnologia?",
            "Oi, oi! Estou por aqui pra te ajudar a conhecer melhor a Rafaella. 😄""
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
    const sugestoes = [
        "Pergunte sobre os projetos dela.",
        "Quer saber mais sobre a criadora deste chatbot? É só perguntar! 💡",
        "Quer conhecer a Vantari System?"🚀",
        "Se quiser, posso sugerir algo para conversarmos. É só dizer! 🤖"
    ];
    return "Hmm... 😅 não entendi muito bem. Mas tô aprendendo! Tenta perguntar de outro jeitinho?\nAlgumas dicas:\n- Pergunte sobre os projetos dela\n- Ou as habilidades que ela tá desenvolvendo\n- Ou ainda sobre a Vantari System!";
}

// Função para interações extras
function interacaoExtra() {
    const interacoesExtras = [
        "Sabia que a Rafa tá migrando da saúde pra tecnologia? 💡 Uma virada e tanto!",
        "Se quiser, posso te contar os bastidores da criação deste portfólio. 😏",
        "Você é mais do tipo que gosta de design ou prefere focar no código? 👩‍🎨👨‍💻",
        "Ah, e ela adora criar soluções simples que realmente ajudam alguém de verdade. ❤️",
        "Ainda tô aprendendo junto com ela, então vamos evoluindo aos poucos, combinado? 😉"
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

// Carregar tema ao iniciar
window.onload = () => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.body.setAttribute("data-theme", savedTheme);
    carregarHistorico();
};
