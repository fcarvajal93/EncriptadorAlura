const encriptar = document.getElementById("button__encriptar");
const desencriptar = document.getElementById("button__desencriptar");
const copy = document.getElementById("button__copiar");
const textoInicial = document.getElementById("textoInput");
const textFinal = document.getElementById("textoFinal");
const muneco = document.getElementById("muneco");
const textInfo = document.getElementById("textoInfo");
const rigth = document.getElementById("rigth");

const remplazar = [
    ["e", "enter"],
    ["i", "imes"],
    ["a", "ai"],
    ["o", "ober"],
    ["u", "ufat"],
];

const remplace = (newvalue) => {
    textFinal.innerHTML = newvalue;
    textFinal.classList.add("ajustar");
    rigth.classList.add("ajuste");
    textoInicial.value = "";
    textoInicial.style.height = "auto";
    textoInicial.placeholder = "Ingrese el texto aquí";
    muneco.classList.add("ocultar");
    textInfo.classList.add("ocultar");
    copy.classList.remove("bn_ocultar");
};

const reset = () => {
    textoInicial.value = "";
    textoInicial.style.height = "auto";
    textFinal.innerHTML = "";
    rigth.classList.remove("ajuste");
    textFinal.classList.remove("ajustar");
    muneco.classList.remove("ocultar");
    textFinal.placeholder = "Ningún mensaje fue encontrado";
    textInfo.classList.remove("ocultar");
    copy.classList.add("bn_ocultar");
    textoInicial.focus();
};

function procesarTexto(texto) {
    const regex = /^[a-z\s]+$/; // Expresión regular para letras minúsculas y espacios
    if (!regex.test(texto)) {
        alert("Solo se permiten letras minúsculas sin acentos ni caracteres especiales.");
        reset();
        return null;
    }
    return texto; // Si el texto es válido, lo retorna
}

function encript(newtext) {
    for (let i = 0; i < remplazar.length; i++) {
        newtext = newtext.replaceAll(remplazar[i][0], remplazar[i][1]);
    }
    return newtext;
}

function desencript(newtext) {
    for (let i = 0; i < remplazar.length; i++) {
        newtext = newtext.replaceAll(remplazar[i][1], remplazar[i][0]);
    }
    return newtext;
}

encriptar.addEventListener('click', () => {
    const texto = textoInicial.value;
    const textoValidado = procesarTexto(texto);
    if (textoValidado) {
        remplace(encript(textoValidado));
    }
});

desencriptar.addEventListener('click', () => {
    const texto = textoInicial.value;
    const textoValidado = procesarTexto(texto);
    if (textoValidado) {
        remplace(desencript(textoValidado));
    }
});

copy.addEventListener("click", () => {
    navigator.clipboard.writeText(textFinal.textContent)
        .then(() => alert("Texto Copiado"))
        .catch(err => alert("Error al copiar el texto"));
    reset();
});

const ajustarAltura = () => {
    textoInicial.style.height = "auto";
    textoInicial.style.height = `${textoInicial.scrollHeight}px`;
};

textoInicial.addEventListener("change", ajustarAltura);
textoInicial.addEventListener("keyup", ajustarAltura);
