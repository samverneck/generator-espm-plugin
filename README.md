# generator-espm-plugin
[![NPM version][npm-image]][npm-url] 

[![Build Status][travis-image]][travis-url] 

[![Dependency Status][daviddm-image]][daviddm-url]

[![Coverage percentage][coveralls-image]][coveralls-url]

> Yeoman generator para gerar plugins para o projeto [ES na palma da mão](https://github.com/prodest/es-na-palma-da-mao) usando [jspm](http://jspm.io/).


## 1. Instale `generator-espm-plugin` e dependências:

Primeiro, instale [yeoman](http://yeoman.io), [jspm CLI](http://jspm.io/), [jspm Server](https://github.com/geelen/jspm-server) 
 e então `generator-espm-plugin` usando [npm](https://www.npmjs.com/) (assumindo que você tem [node.js](https://nodejs.org/) e [npm](https://www.npmjs.com/) instalados).
```bash
npm i -g yo jspm jspm-server generator-espm-plugin
```

### 2. Crie um novo diretório para o plugin:
```bash
mkdir meu-plugin & cd meu-plugin
```
Opcionalmente *bloqueie* a versão do jspm para o projeto:

```
cd meu-plugin
npm install jspm --save-dev
```
> É aconselhável instalar jspm localmente para *bloquear* a versão do jspm para o plugin.
Essa medida garante que eventuais atualizações ao jspm global não interfiram no comportamento do plugin. 
Use `jspm -v` para ver a versão local instalada.


### 3. Gere um novo plugin:
Execute `generator-espm-plugin` dentro do diretório criado, opcionalmente informando o nome do plugin:
```bash
yo espm-plugin [nome do plugin]
```

Se o nome do plugin **não** for informado, o nome do plugin será o nome do diretório onde o *generator* está sendo executado.


### 4. Responda às perguntas do *generator*
O *generator* fará as seguintes perguntas: 

**Pergunta:** *Por favor digite seu username do Github:*

Digite seu nome de usuário do GitHub (obrigatório), o qual será usado para configurar o jspm.


**Pergunta:** *Deseja executar o plugin imediatamente após a instalação? (Yn)*

Responda sim (Y ou y) para iniciar um servidor local, abrir uma janela do browser e exibir o recém-criado plugin imediatamente após a instalação.

> Repare que `generator-espm-plugin` *emula* uma versão de desenvolvimento *lightweight* da aplicação **ES na palma da mão** e executa o plugin no contexto dessa aplicação.

**Pergunta:** *Qual o "module system" usado pelo plugin?*

Selecione **ES6** para usar a sintaxe e o sistema de módulos do [ECMAScript 2015](https://babeljs.io/docs/learn-es2015/) ou selecione
**CommonJS** para usar o sistema de módulos [CommonJS](https://pt.wikipedia.org/wiki/CommonJS), como usado tradicionalmente usado no módulos do node.js.
Indepentemente do sistema de módulos escolhido, o conjunto *jspm + systemjs* vai fazer a requisição assíncrona dos seus scripts dentro
do seu plugin à medida que você os requisitar, seja através de `require(xxxx)` (CommonJS) ou `import xxx from 'XXXXX'` (ES6).

**Pergunta:** *Deseja criar unit tests?*

Escolha sim (Y ou y)  para gerar configurações de teste e testes unitários de exemplo para o plugin.

### 4. Instale *packages* a partir dos seguintes registros: jspm, GitHub ou npm:
Exemplos:
```
jspm install jquery
jspm install myname=npm:underscore
jspm install github:components/jquery
jspm install npm:lodash-node
```

## Tooling
Abaixo seguem breves descrições das ferramentas utilizadas no projeto:

- [yeoman](http://yeoman.io) é uma ferramenta de *scaffolding* de aplicações *web* modernas.
- [jspm CLI](http://jspm.io/) é um *package manager* para o browser.
- [jspm Server](https://github.com/geelen/jspm-server) é um servidor local que será usado para *rodar* seu plugin em desenvolvimento.


## Workflow em desenvolvimento

### JSPM linking (com **watching**)

```bash
gulp link
```

### Deploy de uma nova versão para o Github.
 
```bash
gulp deploy
```
Este comando irá criar um *tagged commit* seguido de *push* para o repositório do plugin no Github.


> Leia mais sobre Yeoman [sobre Yeoman](http://yeoman.io/).

## License

MIT © [PRODEST](http://prodest.es.gov.br/)
[npm-image]: https://badge.fury.io/js/generator-espm-plugin.svg
[npm-url]: https://badge.fury.io/js/generator-espm-plugin
[travis-image]: https://travis-ci.org/prodest/generator-espm-plugin.svg
[travis-url]: https://travis-ci.org/prodest/generator-espm-plugin
[daviddm-image]: https://david-dm.org/prodest/generator-espm-plugin.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/prodest/generator-espm-plugin
[coveralls-image]: https://coveralls.io/repos/prodest/generator-espm-plugin/badge.svg
[coveralls-url]: https://coveralls.io/r/prodest/generator-espm-plugin
