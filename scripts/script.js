window.addEventListener('load', () => {
    document.getElementById("loader").style.display="none";
    const altura = 600;
    const largura = 800;
    const res = 150;
    const linhas = altura / res;
    const colunas = largura / res;
    const tab = new Tabuleiro(linhas, res);
    tab.desenha();

    const raio = res;
    const x = 0;// + res / 2;
    const y = 0;// + res / 2;
    const passo = res / 2;
    const robo = new Robo(x, y, linhas-1);
    
    tab.desenhaRobo(robo);
    // robo.desenha();

    const elemento = document.getElementById('editor');
    const editor = new Editor(elemento);

    const analisaBtn = document.getElementById('analisa');
    analisaBtn.addEventListener('click', () => {
        const instrucoes = editor.analisaTexto();
        let i = 0;
        let interval = setInterval(() => {
            if (i < instrucoes.length) {
                robo.move(instrucoes[i]);
                tab.desenhaRobo(robo);
            }
            else 
                clearInterval(interval);
            i++;
        }, 1000);
    });
})