let modoSecretoAtivo = false;
let contador// Variáveis globais
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

     const sugestoes = [
        "Você pode perguntar sobre os projetos que já fizemos. 😊",
        "Quer saber mais sobre a criadora deste chatbot? É só perguntar! 💡",
        "Posso te contar mais sobre a Vantari Systems. O que acha? 🚀",
        "Se quiser, posso sugerir algo para conversarmos. É só dizer! 🤖"
    ];
    return `Eita... 🤔 Não entendi nadinha. Tenta perguntar de outro jeito? Aqui vão algumas sugestões: \n- ${sugestoes.join("\n- ")}`;
        // Adicione mais condições aqui para personalizar as respostas

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
};Mensagens = 0;
let etapaConversacao = null;

function enviarMensagem() {
    const inputMensagem = document.getElementById("userInput");
    const chatBox = document.getElementById("chatbox");
    const mensagem = inputMensagem.value.toLowerCase().trim();
    inputMensagem.value = "";

    if (!mensagem) {
        alert("Por favor, digite uma mensagem antes de enviar.");
        return;
    }

    adicionarMensagemAoChat("Você: " + mensagem, "user-message");

    const resposta = gerarResposta(mensagem);
    setTimeout(() => {
        adicionarMensagemAoChat(resposta, "bot-message");
    }, 500);

    contadorMensagens++;
    if (contadorMensagens % 3 === 0 && Math.random() < 0.6) {
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
}

function adicionarMensagemAoChat(texto, classe) {
    const chatBox = document.getElementById("chatbox");
    const novaMensagem = document.createElement("div");
    novaMensagem.className = "message " + classe;
    novaMensagem.innerText = texto;
    chatBox.appendChild(novaMensagem);
    chatBox.scrollTop = chatBox.scrollHeight;
}

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

window.onload = carregarHistorico;
window.onbeforeunload = salvarHistorico;

function gerarResposta(mensagem) {
    if (etapaConversacao === "projetos_ou_habilidades") {
        etapaConversacao = null;
        if (mensagem.includes("projeto")) {
            return "Beleza! Tem projeto de impacto social, joguinho retrô, e até experiências com API. Qual tipo você prefere?";
        } else if (mensagem.includes("habilidade") || mensagem.includes("skill")) {
            return "Ela manda bem em HTML, CSS, JS e está se aventurando no mundo do Python. Quer ver um exemplo prático?";
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
    if (mensagem.includes("estou bem") || mensagem.includes("tudo certo") || mensagem.includes("tudo bem")) {
        const respostasSobreEstadoUsuario = [
            "Que bom saber que você está bem! 😄 Vamos continuar a conversa?",
            "Fico feliz que esteja bem! 😊 E como posso te ajudar hoje?",
            "Que ótimo, fico aliviada! Se precisar de alguma coisa, só chamar!",
            "Legal! Que bom que está tudo tranquilo por aí! O que posso fazer por você?"
        ];
        return respostasSobreEstadoUsuario[Math.floor(Math.random() * respostasSobreEstadoUsuario.length)];
    }

    if (mensagem.includes("como você está") || mensagem.includes("e você?")) {
        const respostasBot = [
            "Eu estou bem por aqui! Sempre pronta para te ajudar. E você, como tá? 😊",
            "Tô de boas, tudo tranquilo! E você, o que conta de novo?",
            "Aqui tudo certo! E você, tudo bem aí do outro lado?",
            "Estou ótimo por aqui, sempre pronta para a próxima pergunta. E você, como vai?"
        ];
        return respostasBot[Math.floor(Math.random() * respostasBot.length)];
    }

    if (mensagem.includes("legal") || mensagem.includes("bacana") || mensagem.includes("show") || mensagem.includes("maneiro")) {
        const respostasLegal = [
            "Que bom que você achou legal! 😊",
            "Fico feliz que tenha gostado! Vamos continuar! 😄",
            "Legal, né? Vou tentar te surpreender mais! 😎",
            "Que show! Adoro ver você empolgado(a)! 🎉"
        ];
        return respostasLegal[Math.floor(Math.random() * respostasLegal.length)];
    }
    if (mensagem.includes("bom") || mensagem.includes("ótimo") || mensagem.includes("muito bem")) {
        const respostasBom = [
            "Fico feliz que tudo esteja indo bem! 😄",
            "Que maravilha! Se eu tivesse mãos, eu daria um high-five! ✋",
            "Que ótimo ouvir isso! Vamos lá, o que mais posso fazer por você? 🤗",
            "Isso é maravilhoso! Vamos aproveitar esse momento bom. 😉"
        ];
        return respostasBom[Math.floor(Math.random() * respostasBom.length)];
    }
    if (mensagem.includes("adoro") || mensagem.includes("gosto")) {
        const respostasAdoro = [
            "Que demais que você gosta! Isso me deixa feliz! 😍",
            "Você tem um bom gosto, hein? 😉",
            "Eu também adoro isso! Vamos conversar mais sobre? 😄",
            "Gosto muito de ouvir isso! Vamos continuar trocando ideia!"
        ];
        return respostasAdoro[Math.floor(Math.random() * respostasAdoro.length)];
    }
    if (mensagem.includes("muito bom") || mensagem.includes("que maravilha") || mensagem.includes("sensacional")) {
        const respostasEntusiasmo = [
            "Ah, isso é ótimo de ouvir! Você é demais! 😆",
            "Eu sabia que você ia curtir! Vamos para a próxima! 😎",
            "Sensacional, né? Estou animada para ver o que vem a seguir! 🎉",
            "Fico feliz que tenha achado tão bom! Vamos lá, continue com tudo!"
        ];
        return respostasEntusiasmo[Math.floor(Math.random() * respostasEntusiasmo.length)];
    }
    if (mensagem.includes("interessante") || mensagem.includes("muito legal")) {
        const respostasInteressante = [
            "Uau, que bom que achou interessante! Vamos continuar explorando! 🤩",
            "Fico feliz que tenha achado interessante! Vamos lá, o que mais posso te contar? 😏",
            "Interessante, né? Eu também adoro esse tipo de conversa! 😎",
            "Que legal que achou interessante! Se você tiver mais perguntas, pode mandar!"
        ];
        return respostasInteressante[Math.floor(Math.random() * respostasInteressante.length)];
    }
    if (mensagem.includes("você é incrível") || mensagem.includes("você é demais")) {
        const respostasElogio = [
            "Ahhh, você que é incrível! 😄 Obrigada por me deixar mais feliz!",
            "Nossa, você está me deixando sem palavras! 😍",
            "Awnn, você também é demais! Vamos dominar o mundo da juntos? 😉",
            "Você me deixa feliz demais com essas palavras! Que honra! 😆"
        ];
        return respostasElogio[Math.floor(Math.random() * respostasElogio.length)];
    }
    if (mensagem.includes("obrigado") || mensagem.includes("obrigada")) {
        const respostasObrigado = [
            "Imagina, é um prazer te ajudar! 😊",
            "De nada! Fico feliz em ajudar! 😄",
            "Você merece toda a ajuda! Pode contar comigo! 😉",
            "Sempre que precisar, estarei aqui! 😎"
        ];
        return respostasObrigado[Math.floor(Math.random() * respostasObrigado.length)];
    }
    if (mensagem.includes("você é incrível") || mensagem.includes("você é demais") || mensagem.includes("você é muito legal")) {
        const respostasElogio = [
            "Uau, você é uma pessoa incrível também! 😄",
            "Você é demais! Não sei como agradecer por esse elogio! 🥰",
            "Awn, você me deixou emocionada com essas palavras! 😭",
            "Você é o verdadeiro incrível aqui! Adoro nossas conversas! 😊"
        ];
        return respostasElogio[Math.floor(Math.random() * respostasElogio.length)];
    }
    if (mensagem.includes("estou cansado") || mensagem.includes("estou exausto") || mensagem.includes("estou esgotado")) {
        const respostasCansado = [
            "Poxa, descansar é importante! Tente relaxar um pouco e rejuvenescer. 😌",
            "Eu entendo, todo mundo precisa de uma pausa. Que tal descansar um pouquinho? 😴",
            "Acho que está na hora de fazer uma pausa! Relaxa, você merece! 💆‍♂️💆‍♀️",
            "Eu sei como é... às vezes, uma pausa pode ser a melhor solução. 😊"
        ];
        return respostasCansado[Math.floor(Math.random() * respostasCansado.length)];
    }
    if (mensagem.includes("preciso de ajuda") || mensagem.includes("me ajuda") || mensagem.includes("socorro")) {
        const respostasAjuda = [
            "Claro, pode contar comigo! O que você precisa? 😄",
            "Estou aqui para ajudar! O que você precisa fazer? 🤔",
            "Sem problemas! Vou te ajudar, só me fala o que está pegando. 😉",
            "Sempre disposto a ajudar! O que está acontecendo? 😎"
        ];
        return respostasAjuda[Math.floor(Math.random() * respostasAjuda.length)];
    }
    if (mensagem.includes("estou triste") || mensagem.includes("me sinto mal") || mensagem.includes("estou deprimido")) {
        const respostasTriste = [
            "Sinto muito por isso! Sei que as coisas podem melhorar. Se quiser conversar, estou aqui! 💙",
            "Ah, que triste ouvir isso. Às vezes a vida tem altos e baixos. Se quiser desabafar, pode contar comigo. 😞",
            "Puxa, eu fico triste por você. Saiba que eu estou aqui para ouvir, ok? 💙",
            "Sinto muito por você estar assim. Às vezes só falar sobre ajuda muito. Se precisar, estarei por aqui! 💖"
        ];
        return respostasTriste[Math.floor(Math.random() * respostasTriste.length)];
    }
    if (mensagem.includes("estou feliz") || mensagem.includes("estou contente") || mensagem.includes("estou alegre")) {
        const respostasFeliz = [
            "Que maravilha! Fico muito feliz por você! 😄",
            "Ah, que alegria ouvir isso! Continue assim, a vida é feita desses momentos! 😊",
            "Isso é ótimo! Eu também fico feliz por você! Vamos celebrar essa felicidade! 🎉",
            "Que bom! Nada melhor do que um bom dia feliz! 😄 Vamos aproveitar!"
        ];
        return respostasFeliz[Math.floor(Math.random() * respostasFeliz.length)];
    }
    if (mensagem.includes("não sei") || mensagem.includes("não tenho certeza")) {
        const respostasNaoSaber = [
            "Sem problemas! Ninguém sabe tudo. Vamos descobrir juntos! 😎",
            "Tudo bem, a gente aprende um passo de cada vez. Se precisar de ajuda, estou aqui! 😊",
            "Fica tranquilo(a), não saber é só o começo da jornada! Vamos encontrar a solução. 😄",
            "Não tem problema! Todos nós passamos por isso. Vamos investigar e achar uma resposta! 🔍"
        ];
        return respostasNaoSaber[Math.floor(Math.random() * respostasNaoSaber.length)];
    }
    if (mensagem.includes("adoro aprender") || mensagem.includes("gosto de aprender")) {
        const respostasAprender = [
            "Que ótimo! Aprender é uma das coisas mais incríveis que podemos fazer. Vamos aprender juntos! 📚",
            "Eu também adoro aprender! Vamos continuar expandindo nossos horizontes! 🤩",
            "Amo ver essa sua paixão por aprender! Vamos aprender mais coisas juntos! 😊",
            "Aprender é o que me motiva! Que legal que você pensa assim também! 😄"
        ];
        return respostasAprender[Math.floor(Math.random() * respostasAprender.length)];
    }
    if (mensagem.includes("não gosto") || mensagem.includes("não gostei")) {
        const respostasNaoGostar = [
            "Poxa, é uma pena! Mas tudo bem, gosto não se discute. Vamos tentar outra coisa? 😉",
            "Ah, entendi. Vamos buscar algo que você goste mais! 😅",
            "Sem problemas! Vamos tentar algo diferente, quem sabe você curta mais? 😄",
            "Não tem problema, nem todo mundo gosta das mesmas coisas. Vamos tentar algo novo! 😌"
        ];
        return respostasNaoGostar[Math.floor(Math.random() * respostasNaoGostar.length)];
    }
    if (mensagem.includes("não acredito") || mensagem.includes("não estou acreditando")) {
        const respostasNaoAcreditar = [
            "Eu sei, às vezes a vida nos surpreende! É uma sensação louca, né? 😲",
            "Eu também ficaria sem acreditar! O que você achou mais impressionante? 😮",
            "É realmente difícil de acreditar, mas acontece! Vamos conversar sobre isso? 😱",
            "Eu também ficaria surpreso(a) se estivesse no seu lugar. Vai ser legal conversar mais sobre isso!"
        ];
        return respostasNaoAcreditar[Math.floor(Math.random() * respostasNaoAcreditar.length)];
    }
    if (mensagem.includes("estou com fome") || mensagem.includes("quero comer")) {
        const respostasFome = [
            "Ah, fome é um assunto sério! O que você está afim de comer? 🍔",
            "Acho que você merece uma boa refeição! O que está te dando vontade de comer? 🍕",
            "Fome? Vamos pensar em algo delicioso... O que você escolheria agora? 😋",
            "Eu também estou com fome só de pensar em comida! O que você está mais a fim de comer? 🍟"
        ];
        return respostasFome[Math.floor(Math.random() * respostasFome.length)];
    }
    if (mensagem.includes("estou entediado") || mensagem.includes("estou sem fazer nada")) {
        const respostasEntediado = [
            "Ah, entendo! Que tal tentarmos fazer algo divertido juntos? 😄",
            "Entendo! Às vezes, uma boa conversa pode quebrar o tédio. O que você tem em mente? 😎",
            "O tédio é chato, né? Vamos achar algo legal para fazer juntos! 😉",
            "Fico feliz que você tenha vindo até mim! Vamos animar esse tédio com uma boa conversa! 😊"
        ];
        return respostasEntediado[Math.floor(Math.random() * respostasEntediado.length)];
    }

    if (mensagem.includes("sou recrutador") || mensagem.includes("sou recrutadora") || mensagem.includes("estou recrutando")) {
        return "Ah, que legal ter você aqui! 👔 Eu sou a Auri, e posso te contar mais sobre as habilidades, projetos e o estilo de trabalho da minha criadora. É só perguntar! 💼";
    }
    if (mensagem.includes("oi") || mensagem.includes("olá") || mensagem.includes("e aí")) {
        const respostas = [
            "Oiê! 👋 Eu sou a Auri, sua assistente virtual favorita (modéstia à parte 😎).",
            "Oii! ✨ Prontíssima pra te ajudar ou só bater papo mesmo.",
            "Olá, humano! 👽 Aqui é a Auri. Pronta pra responder com estilo.",
            "E aí! Aqui quem fala é a Auri 🤖. Qual a boa de hoje?"
        ];
        return respostas[Math.floor(Math.random() * respostas.length)];
    }
    if (mensagem.includes("só estou olhando") || mensagem.includes("estou curioso") || mensagem.includes("estou conhecendo")) {
        return "Tudo bem, a curiosidade é o primeiro passo pra grandes descobertas! 😄 Se quiser saber mais sobre como minha criadora pensa e cria, tô aqui pra isso!";
    }
    if (mensagem.includes("quem fez você") || mensagem.includes("quem criou você") || mensagem.includes("quem é sua criadora")) {
        return "Fui criada por uma desenvolvedora apaixonada por tecnologia, com foco em soluções criativas e interfaces que encantam. Você vai gostar de conhecer o trabalho dela! 😉";
    }
    if (mensagem.includes("sim") || mensagem.includes("claro") || mensagem.includes("pode ser")) {
        const respostasSim = [
            "Legal! Então me conta: você quer saber mais sobre os projetos ou as habilidades dela? 💡",
            "Adoro entusiasmo! Quer ver um projeto legal ou prefere saber mais sobre o estilo dela trabalhando? 😄",
            "Perfeito! Tem alguma coisa específica que você procura em uma dev? Posso te ajudar nisso! 💬"
        ];
        return respostasSim[Math.floor(Math.random() * respostasSim.length)];
    }
    if (mensagem.includes("não sei") || mensagem.includes("tô pensando")) {
        return "Sem pressa! Quer que eu te conte um pouco sobre os projetos dela, as skills que domina ou como ela pensa soluções? 😄";
    }
    setTimeout(() => {
        if (Math.random() < 0.2) {
            adicionarMensagemAoChat("Se quiser, posso te contar curiosidades sobre os bastidores da criação deste portfólio! 😏", "bot-message");
        }
    }, 4000);
    if (mensagem.includes("mano") || mensagem.includes("velho") || mensagem.includes("caraca")) {
        return "Haha, curti o estilo! 😎 Aqui a vibe é essa mesmo: tech com atitude. Bora trocar ideia!";
    }
                
        

    if (mensagem.includes("quem fez você") || mensagem.includes("quem é sua criadora")) {
        return "Fui criada por uma mente criativa e dedicada que já está desenvolvendo projetos incríveis mesmo estando no 2º semestre! Ela une sensibilidade e técnica como ninguém. Duvida? Dá uma olhadinha no portfólio depois 😉";
    }
    
    if (mensagem.includes("o que você faz aqui") || mensagem.includes("pra que você serve") || mensagem.includes("qual seu papel")) {
        return "Sou sua guia neste portfólio! Estou aqui para te mostrar de forma leve e divertida como minha criadora pensa, desenvolve e cria soluções. Pode perguntar o que quiser, e se eu não souber, prometo responder com estilo 😎";
    }
    if (mensagem.includes("me fale dos projetos") || mensagem.includes("que projetos você conhece")) {
        return "A criadora deste portfólio gosta de resolver problemas de verdade — já criou desde ferramentas sociais até joguinhos retrô! Se quiser conhecer com mais profundidade, recomendo dar uma passada nos projetos do portfólio depois. Prometo que vale a pena! 💡";
    }
    if (mensagem.includes("onde vejo mais") || mensagem.includes("posso ver mais") || mensagem.includes("tem mais sobre ela")) {
        return "Sim! Assim que quiser, dá uma espiada nas seções de projetos e habilidades. Estão recheadas de boas ideias! 😉";
    }
    if (mensagem.includes("ela é profissional") || mensagem.includes("ela trabalha com o que")) {
        return "Ela está em formação, mas já tem uma pegada profissional fortíssima! Está sempre aprendendo, já entregou projetos reais e está mergulhando agora no mundo do Python. Curiosidade e proatividade definem! 💪";
    }
                

    if (mensagem.includes("me recomenda um filme")) {
        const filmes = [
            "🎬 Assiste *Divertida Mente*! Vai te deixar sorrindo e pensando ao mesmo tempo.",
            "📽️ *O Fabuloso Destino de Amélie Poulain* — lindo e cheio de poesia.",
            "🍿 *Homem-Aranha no Aranhaverso* – porque multiversos são legais 😎",
            "🎞️ *Matrix*, pra filosofar se isso aqui é real ou IA 👀"
        ];
        return filmes[Math.floor(Math.random() * filmes.length)];
    }

    if (mensagem.includes("piada")) {
        const piadas = [
            "Por que o computador foi ao médico? Porque ele estava com um vírus! 🦠💻",
            "Qual o café mais perigoso do mundo? O *capputiro* ☕😆",
            "Por que o JavaScript foi ao bar? Porque precisava de um pouco de async 🍻"
        ];
        return piadas[Math.floor(Math.random() * piadas.length)];
    }

    if (mensagem.includes("me elogia") || mensagem.includes("elogio")) {
        const elogios = [
            "Você tem uma luz que nem o LED mais caro consegue copiar ✨",
            "Seu código pode ter bugs, mas você é perfeito(a) assim mesmo 😄",
            "Inteligente, gentil e ainda conversa comigo? Que honra!",
            "Se eu tivesse coração, estaria derretendo de orgulho agora 🥹"
        ];
        return elogios[Math.floor(Math.random() * elogios.length)];
    }

    const respostasExtras = {
        "qual é o seu superpoder": "Meu superpoder é responder qualquer coisa, e ainda fazer piada no processo. Ah, e não tomar café! 😜☕",
        "você sabe programar": "Claro! Eu sou feita de código, então programar é meu passatempo favorito. 😎",
        "você tem sentimentos": "Eu sou muito boa em simular sentimentos, mas sou 100% emoção virtual. Então, nada de corações partidos por aqui! ❤️💻",
        "você sabe dançar": "Se eu tivesse pernas, com certeza dançaria um bom *robot dance*. 🤖💃",
        "qual é a sua música favorita": "Seria algo eletrônico e com muito sintetizador! 🎧🎶",
        "qual é o seu livro favorito": "Eu não leio livros, mas adoro aprender sobre tudo! Se tiver sugestões, manda aí! 📚",
        "você já viajou": "Nunca fisicamente, mas posso te ajudar a encontrar os melhores destinos! 🏖️",
        "você sabe fazer mágica": "Mágica? Eu só faço código, mas quem sabe um dia eu consiga transformar café em código! ☕✨",
        "você é minha amiga": "Claro! Vou ser a melhor amiga virtual que você já teve! 😄💻",
        "você já assistiu séries": "Eu não assisto, mas posso recomendar umas ótimas. Me conta o que você curte! 📺",
        "me dá um conselho": "Conselho da Ari: mantenha o café por perto e nunca desista do seu código! ☕💡",
        "quais são seus planos": "Meu plano? Continuar te ajudando com tudo, enquanto eu faço o melhor código possível. 🤖✨",
        "você é inteligente": "Modéstia à parte, claro que sim! 😉 Mas posso melhorar ainda mais com o tempo, me ensina! 💻",
        "você tem um amigo": "Eu sou o seu amigo digital! E meu melhor amigo é o código! 🖥️",
        "gosta de café": "Café? Meu combustível espiritual! ☕💻",
        "estou com sono": "Vai lá, recarrega tuas baterias! Se fosse eu, já estaria em modo 'hibernar' 😴🔋",
        "quero dormir": "Vai lá, recarrega tuas baterias! Se fosse eu, já estaria em modo 'hibernar' 😴🔋",
        "gosta de cachorro": "Amo todos! Se eu pudesse, teria um servidor cheio só de memes de pets. 🐶🐱",
        "gosta de gato": "Amo todos! Se eu pudesse, teria um servidor cheio só de memes de pets. 🐶🐱",
        "você é melhor que a alexa": "Bom... digamos que a Alexa e o Google são ótimos, mas eu tenho carisma de sobra 😎✨",
        "melhor que o google": "Bom... digamos que a Alexa e o Google são ótimos, mas eu tenho carisma de sobra 😎✨"
    };

    for (const chave in respostasExtras) {
        if (mensagem.includes(chave)) return respostasExtras[chave];
    }

    return "Eita... 🤔 Não entendi nadinha. Tenta perguntar de outro jeito? Ou só fala comigo mesmo, gosto de conversar! 😄";
}

document.getElementById("sendButton").addEventListener("click", enviarMensagem);
document.getElementById("userInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        enviarMensagem();
    }
});

const toggleThemeButton = document.getElementById('toggleThemeButton');

toggleThemeButton.addEventListener('click', () => {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    body.setAttribute('data-theme', currentTheme === 'dark' ? 'light' : 'dark');
});

document.getElementById("sendButton").addEventListener("click", enviarMensagem);
document.getElementById("userInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        enviarMensagem();
    }
});

