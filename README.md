# generator-espm-plugin 
[![NPM version][npm-image]][npm-url] 
[![Build Status][travis-image]][travis-url] 
[![Dependency Status][daviddm-image]][daviddm-url]
 [![Coverage percentage][coveralls-image]][coveralls-url]
> Yeoman generator para gerar plugins para o projeto [ES na palma da mão](https://github.com/prodest/es-na-palma-da-mao) usando ES6 e [JSPM](http://jspm.io/).

## Instalação

Primeiro, instale [Yeoman](http://yeoman.io) e generator-espm-plugin usando [npm](https://www.npmjs.com/) (assumindo que você tem [node.js](https://nodejs.org/) instalado).

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
Este comando irá criar um *tagged commit* seguido de *push* para o repositório do plugin no Github.


> Leia mais sobre Yeoman [sobre Yeoman](http://yeoman.io/).

## License

MIT © [PRODEST]()

[npm-image]: https://badge.fury.io/js/generator-jspm.svg
[npm-url]: https://npmjs.org/package/generator-jspm
[travis-image]: https://travis-ci.org/prodest/generator-espm-plugin.svg?branch=master
[travis-url]: https://travis-ci.org/prodest/generator-espm-plugin
[daviddm-image]: https://david-dm.org/prodest/generator-espm-plugin.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/prodest/generator-espm-plugin
[coveralls-image]: https://coveralls.io/repos/prodest/generator-espm-plugin/badge.svg
[coveralls-url]: https://coveralls.io/r/prodest/generator-espm-plugin
