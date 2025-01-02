class Tabuleiro {
    constructor(linhas) {
        this.tabuleiro = document.getElementById("tabuleiro");
        this.linhas = linhas;
        this.colunas = linhas;
        this.tamanhoCasa = this.tabuleiro.clientWidth / linhas;
        this.casas = [];
        this.posAtual = 0;
        this.inicio = true;
        this.largura = linhas;
    }

    desenha() {
        for (let y = 0; y < this.linhas; y++) {
            for (let x = 0; x < this.colunas; x++) {
                let rectX = x * this.tamanhoCasa;
                let rectY = y * this.tamanhoCasa;

                let div = document.createElement('div');
                div.style.width = this.tamanhoCasa + 'px';
                div.style.height = this.tamanhoCasa + 'px';
                div.style.left = rectX + 'px';
                div.style.top = rectY + 'px';
                div.classList.add('quadro');

                this.tabuleiro.appendChild(div);
                this.casas.push({ div, status: 'vazio', cultivar: '' });
            }
        }
    }

    executaInstrucao(instrucao, robo) {
        if (instrucao.includes('plantar->'))
            this.planta(instrucao, robo.x, robo.y);

        else if (instrucao.includes('status') && instrucao.indexOf('status') == 0)
            this.mostraStatus(robo.x, robo.y);

        else if (instrucao.includes('se->'))
            this.tratarSe(instrucao, robo);

        else {
            robo.move(instrucao);
            this.desenhaRobo(robo);
        }

    }


    desenhaRobo(robo) {
        let indice = robo.x + this.largura * robo.y;
        const divComRobo = this.casas[indice].div;
        divComRobo.classList.add('robo');
        divComRobo.textContent = 'R';

        if (!this.inicio) {
            this.casas[this.posAtual].div.textContent = '';
        }

        this.inicio = false;
        this.posAtual = indice;
    }

    planta(cultivar, x, y) {
        cultivar = cultivar.replace('plantar->', '');
        let indice = x + this.largura * y;
        const divComRobo = this.casas[indice];
        divComRobo.div.classList.add(cultivar);
        divComRobo.status = `ocupado`;
        divComRobo.cultivar = cultivar;
    }

    mostraStatus(x, y) {
        let indice = x + this.largura * y;
        const divComRobo = this.casas[indice];
        console.log(divComRobo.status);
        return divComRobo.status;
    }
    // se->status=ocupado:   BAIXO   status
    tratarSe(instrucao, robo) {
        var palavras = instrucao.split(':');
        palavras[0] = palavras[0].replace('se->', '');
        palavras[0] = palavras[0].trimStart();
        if (palavras[0].includes('=')) {
            var operandos = palavras[0].split('=');
            if (operandos[0] == 'status') {
                let status = this.mostraStatus(robo.x, robo.y);
                if (status == operandos[1]) {

                }
            }
        }
    }
}