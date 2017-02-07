//som aparicao zerk
var SOM_ZERK = new Audio();
SOM_ZERK.src = 'snd/orc.mp3';
SOM_ZERK.volume = 0.4;
SOM_ZERK.type = 'type="audio/mp3';
SOM_ZERK.load();

//som aparicao zerk
var SOM_GROWL = new Audio();
SOM_GROWL.src = 'snd/growl.mp3';
SOM_GROWL.volume = 0.5;
SOM_GROWL.type = 'type="audio/mp3';
SOM_GROWL.load();

function Zerk(context, imagem, imgExplosao, imgFumaca) {
    this.context = context;
    this.imagem = imagem;
    this.x = 0;
    this.y = 0;
    this.velocidade = 0;
    this.imgExplosao = imgExplosao;
    this.imgFumaca = imgFumaca;
    this.vidasExtras = 3;

    // Criando a spritesheet a partir da imagem recebida
    this.sheet = new Spritesheet(context, imagem, 1, 8);
    this.sheet.intervalo = 60;

    // Estado inicial
    this.andando = true;
    SOM_ZERK.currentTime = 0.0;
    SOM_ZERK.play();
}

Zerk.prototype = {

    atualizar: function () {

        this.sheet.proximoQuadro();
        this.y += this.velocidade * this.animacao.decorrido / 1000;
        if (this.y > this.context.canvas.height) {
            this.animacao.excluirSprite(this);
            this.colisor.excluirSprite(this);
        }
    },
    desenhar: function () {
        this.sheet.desenhar(this.x, this.y);

        /*        var ctx = this.context;
                var img = this.imagem;
                ctx.drawImage(img, this.x, this.y, img.width, img.height);*/
    },
    retangulosColisao: function () {

        var rets = [
            {
                x: this.x + 1,
                y: this.y + 1,
                largura: 58,
                altura: 60
            }
        ];
        /*        var ctx = this.context;
        for (var i in rets) {
        ctx.save();
        ctx.strokeStyle = 'yellow';
        ctx.strokeRect(rets[i].x, rets[i].y, rets[i].largura,
        rets[i].altura);
        ctx.restore();
        }*/
        return rets;
    },
    colidiuCom: function (outro) {
        // Se colidiu com um Tiro, os dois desaparecem
        if (outro instanceof Tiro || outro instanceof Tiro2) {
            var zerk = this;
            zerk.vidasExtras--;
            var fumaca = new Fumaca(this.context, this.imgFumaca, this.x, this.y);
            this.animacao.novoSprite(fumaca);
            if (zerk.vidasExtras < 1) {
                SOM_GROWL.currentTime = 0.0;
                SOM_GROWL.play();
                this.animacao.excluirSprite(this);
                this.colisor.excluirSprite(this);
                this.animacao.excluirSprite(outro);
                this.colisor.excluirSprite(outro);

                var explosao = new Explosao(this.context, this.imgExplosao, this.x, this.y);
                this.animacao.novoSprite(explosao);
            } else {

                this.animacao.excluirSprite(outro);
                this.colisor.excluirSprite(outro);
            }
        }
    }
}