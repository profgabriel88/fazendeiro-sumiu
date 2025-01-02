class Editor {
    constructor(txtArea) {
        this.txtArea = txtArea;
        this.instrucoes = [];
    }

    analisaTexto() {
        var texto = this.txtArea.value.split('\n');
        this.instrucoes = [];
        texto.forEach((linha, indice) => {
            linha = linha.trimEnd();
            if (linha.indexOf(' ') == 0 || linha == '') return;
            if (linha.includes('status')) {
                this.instrucoes.push(linha)
            }
            if (linha.includes('repete->')) {
                this.tratarRepete(linha, indice, texto, 0);
                return;
            }
            if (linha.includes('mover->') && linha.indexOf('mover->') == 0) {
                var palavras = linha.replace('mover->', '');
                this.instrucoes.push(palavras);
                return;
            }
            if (linha.includes('plantar->') && linha.indexOf('plantar->') == 0) {
                this.instrucoes.push(linha);
                return;
            }
        })
        return this.instrucoes;
        // console.log(texto);
    }

    tratarRepete(linha, indice, texto, indentacao) {
        // número de repetições
        var quantidade = linha.replace('repete->', '');
        for (let j = 0; j < quantidade; j++) {
            for (let i = indice + 1; i < texto.length; i++) {
                if (texto[i].indexOf(' ') == 0) {
                    // repete aninhado
                    let ind = texto[i]?.match(/\s/g)?.length || 0;
                    if (texto[i].includes('repete->')) {
                        // indentação da instrução atual
                        this.tratarRepete(texto[i], i, texto, ind);
                    }
                    // outra instrução, só pega aquilo q está indentado um nível a mais que o repete
                    else if (texto[i]?.match(/\s/g)?.length == indentacao + 1) {
                        if (texto[i].includes('mover->')) {
                            var palavras = texto[i].replace('mover->', '');
                            var re = /\s/g;
                            palavras = palavras.replace(re, '');
                            this.instrucoes.push(palavras);
                        }
                        else if (texto[i].includes('plantar->')) {
                            var re = /\s/g;
                            var plantar = texto[i].replace(re, '');
                            this.instrucoes.push(plantar);
                        }
                        else if (texto[i].includes('se->'))
                            this.tratarSe(texto[i], indice, texto, ind)
                        else this.instrucoes.push(texto[i]);
                    }
                }
                else break;
            }
        }
    }

    tratarSe(linha, indice, texto, indentacao) {
        let novaLinha = linha + ':';
        for (let i = indice; i < texto.length; i++) {
            if (texto[i]?.match(/\s/g)?.length == indentacao + 1) {
                let palavras = '';
                
                if (texto[i].includes('mover->')) 
                    palavras = texto[i].replace('mover->', '');
                else palavras = texto[i];

                novaLinha += palavras;
            }
        }
        this.instrucoes.push(novaLinha);
    }

}