class Editor {
    constructor(txtArea) {
        this.txtArea = txtArea;
    }

    analisaTexto() {
        var texto = this.txtArea.value.split('\n');
        var instrucoes = [];
        texto.forEach(linha => {
            if (linha.includes('mover->')) {
                var palavras = linha.replace('mover->', '');
                instrucoes.push(palavras);
            }
            // bloco identado
            if (linha.indexOf(' ') == 0) {
                // console.log(linha);
            }
        })
        return instrucoes;
        // console.log(texto);
    }

}