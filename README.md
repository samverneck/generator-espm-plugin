> [Yeoman](http://yeoman.io) generator

Yeoman generator para gerar plugins para o projeto [ES na palma da mão](https://github.com/prodest/es-na-palma-da-mao) usando ES6 e [JSPM](http://jspm.io/).


##Instalação

###Instalando o generator

```bash
npm install -g yo
npm install -g generator-espm-plugin
```

###Gerando um plugin

```bash
mkdir meuPlugin & cd meuPlugin
yo espm-plugin
```

O **generator** perguntará o nome seu nome de usuário do GitHub, o qual será usado para configurar o JSPM.

###Configurando autenticação no registro do GitHub para evitar [GitHub rate limit](https://developer.github.com/changes/2012-10-14-rate-limit-changes/):
```bash
jspm registry config github
```

##Workflow em desenvolvimento

###JSPM linking (com **watching**)

```bash
gulp link
```

###Deploy de uma nova versão para o Github.

```bash
gulp deploy
```
