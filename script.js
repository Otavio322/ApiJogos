const botao = document.getElementById("btnPesquisar");
const input = document.getElementById("campoBusca");
const resultados = document.getElementById("resultados");

const jogosFixos = document.querySelectorAll(".jogo");

botao.onclick = function () {

    const busca = input.value.toLowerCase();

    fetch("https://api.sampleapis.com/playstation/games")
        .then(res => res.json())
        .then(jogos => {

            const filtrados = jogos.filter(jogo =>
                jogo.name.toLowerCase().includes(busca)
            );

            resultados.innerHTML = "";

            
            if (filtrados.length > 0) {

                jogosFixos.forEach(j => j.style.display = "none");

                filtrados.forEach(jogo => {
                    resultados.innerHTML += `
                        <div class="jogo">
                            <img src="${jogo.image || 'https://via.placeholder.com/300'}" class="imagem">
                            <h2>${jogo.name}</h2>
                            <ul>
                                <li>Lançamento: ${jogo.releaseDate || "Não informado"}</li>
                            </ul>
                        </div>
                    `;
                });

            } else {
                

                resultados.innerHTML = "<p>Mostrando jogos da sua lista</p>";

                let encontrou = false;

                jogosFixos.forEach(jogo => {

                    const nome = jogo.querySelector("h2").textContent.toLowerCase();

                    if (nome.includes(busca)) {
                        jogo.style.display = "block";
                        encontrou = true;
                    } else {
                        jogo.style.display = "none";
                    }
                });

                if (!encontrou) {
                    resultados.innerHTML = "<p>Nenhum jogo encontrado</p>";
                }
            }
        });
};


input.addEventListener("input", () => {
    if (input.value === "") {
        resultados.innerHTML = "";
        jogosFixos.forEach(j => j.style.display = "block");
    }
});