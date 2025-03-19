document.getElementById("tamanho").addEventListener("input", function() {
    document.getElementById("valorTamanho").textContent = this.value;
});

function gerarSenha() {
    const tamanhoSenha = document.getElementById("tamanho").value;
    const incluirMaiusculas = document.getElementById("maiusculas").checked;
    const incluirMinusculas = document.getElementById("minusculas").checked;
    const incluirNumeros = document.getElementById("numeros").checked;
    const incluirSimbolos = document.getElementById("simbolos").checked;

    const letrasMaiusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const letrasMinusculas = "abcdefghijklmnopqrstuvwxyz";
    const numeros = "0123456789";
    const simbolos = "!@#$%^&*()_+=-{}[]<>?/";

    let caracteresPermitidos = "";
    if (incluirMaiusculas) caracteresPermitidos += letrasMaiusculas;
    if (incluirMinusculas) caracteresPermitidos += letrasMinusculas;
    if (incluirNumeros) caracteresPermitidos += numeros;
    if (incluirSimbolos) caracteresPermitidos += simbolos;

    if (caracteresPermitidos.length === 0) {
        alert("Selecione pelo menos um tipo de caractere!");
        return;
    }

    let senhaGerada = "";
    for (let i = 0; i < tamanhoSenha; i++) {
        const indiceAleatorio = Math.floor(Math.random() * caracteresPermitidos.length);
        senhaGerada += caracteresPermitidos[indiceAleatorio];
    }

    document.getElementById("campoSenha").value = senhaGerada;
    verificarForcaSenha(senhaGerada);
}

function copiarSenha() {
    const campoSenha = document.getElementById("campoSenha");
    if (!campoSenha.value) {
        alert("Nada para copiar!");
        return;
    }
    campoSenha.select();
    document.execCommand("copy");
    alert("Senha copiada!");
}

document.getElementById("botaoAlternarSenha").addEventListener("click", function() {
    const campoSenha = document.getElementById("campoSenha");
    if (campoSenha.type === "password") {
        campoSenha.type = "text";
        this.textContent = "🙈";
    } else {
        campoSenha.type = "password";
        this.textContent = "👁️";
    }
});

function verificarForcaSenha(senha) {
    let nivelForca = 0;

    if (senha.length >= 8) nivelForca += 1;
    if (senha.length >= 12) nivelForca += 1;
    if (/[A-Z]/.test(senha)) nivelForca += 1;
    if (/[0-9]/.test(senha)) nivelForca += 1;
    if (/[^A-Za-z0-9]/.test(senha)) nivelForca += 1;

    const barraForca = document.getElementById("barraForca");
    const cores = ["red", "orange", "yellow", "green", "darkgreen"];
    barraForca.style.width = `${(nivelForca / 5) * 100}%`;
    barraForca.style.backgroundColor = cores[nivelForca - 1] || "red";
}
