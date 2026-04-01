const campoBusca = document.getElementById("campoBusca");
const botao = document.getElementById("btnPesquisar");
const botaoRandom = document.getElementById("btnRandom");
const resultados = document.getElementById("resultados");


botao.addEventListener("click", async () => {


    if (navigator.vibrate) {
        navigator.vibrate(100);
         }
    const busca = campoBusca.value.trim();

    if (busca === "") {
        resultados.innerHTML = "Digite o nome de uma carta";
        return;
    }

    try {
        const resposta = await fetch(`https://api.scryfall.com/cards/search?q=${busca}`);
        const dados = await resposta.json();

        resultados.innerHTML = "";

        dados.data.forEach(carta => {
            resultados.innerHTML += `
                <div style="margin-bottom:20px;">
                    <h3>${carta.name}</h3>
                    ${carta.image_uris ? `<img src="${carta.image_uris.normal}">` : ""}
                </div>
            `;
        });

    } catch (erro) {
        resultados.innerHTML = "Erro ao buscar cartas";
        console.error(erro);
    }
});



botaoRandom.addEventListener("click", async () => {

     if (navigator.vibrate) {
        navigator.vibrate(500);
    }

    try {
        const resposta = await fetch(`https://api.scryfall.com/cards/random`);
        const carta = await resposta.json();

        resultados.innerHTML = `
            <div style="margin-bottom:20px;">
                <h2>${carta.name}</h2>
                ${carta.image_uris ? `<img src="${carta.image_uris.normal}">` : ""}
            </div>
        `;
    } catch (erro) {
        resultados.innerHTML = "Erro ao buscar carta aleatória";
        console.error(erro);
    }
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("serviceWorker.js")
    .then(() => console.log("Service Worker registrado"))
    .catch(err => console.log("Erro:", err));
}