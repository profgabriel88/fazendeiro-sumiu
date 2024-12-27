class Tabuleiro {
    constructor (linhas, tamanhoCasa) {
        this.linhas = linhas;
        this.colunas = linhas;
        this.tamanhoCasa = tamanhoCasa;
        this.tabuleiro = document.getElementById("tabuleiro");
        this.casas = [];
        this.posAtual = 0;
        this.inicio = true;
        this.largura = linhas;
    }

    desenha () {
        for (let y = 0; y < this.linhas; y++) {
            for (let x = 0; x < this.colunas; x++) {
                let rectX = x * this.tamanhoCasa;
                let rectY = y * this.tamanhoCasa;
                
                let div = document.createElement('div');
                div.style.width = this.tamanhoCasa+'px';
                div.style.height = this.tamanhoCasa+'px';
                div.style.left = rectX+'px';
                div.style.top = rectY+'px';
                div.classList.add('quadro');

                this.tabuleiro.appendChild(div);
                this.casas.push(div);
            }
        }
    }

    desenhaRobo(robo) {
        let indice = robo.x + this.largura * robo.y;
        const divComRobo = this.casas[indice];
        divComRobo.classList.add('robo');
        divComRobo.textContent = 'R';
        
        if (!this.inicio) {
            this.casas[this.posAtual].textContent = '';
        }

        this.inicio = false;
        this.posAtual = indice;
    }
}