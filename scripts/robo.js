class Robo {
    constructor(x, y, limite) {
        this.x = x;
        this.y = y;
        this.limite = limite;
    }

    desenha() {
        this.ctx.font = '100px Pixelify Sans';
        this.ctx.fillText('r', this.x, this.y + 50);
    }

    move(direcao) {
        switch (direcao) {
            case 'CIMA':
                this.y = this.y <= 0 ? this.limite : this.y - 1;
                break;
            case 'BAIXO':
                this.y = this.y >= this.limite ? 0 : this.y + 1;
                break;
            case 'DIREITA':
                this.x = this.x >= this.limite ? 0 : this.x + 1;
                break;
            case 'ESQUERDA':
                this.x = this.x <= 0 ? this.limite : this.x - 1;
                break;
        }
    }
}