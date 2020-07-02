# Labenu | Desenvolvimento Web Full Stack


<p align="center">
  <img src="https://user-images.githubusercontent.com/59856574/86274338-e7bbd280-bba7-11ea-9b0f-312418c0c364.png"/>
</p>

## Projeto La Book :books:

<p align="center">
  <img src="https://img.shields.io/static/v1?label=node&message=framework&color=green&style=for-the-badge&logo=NODE.JS"/>
  <img src="https://img.shields.io/static/v1?label=mysql&message=Banco%20de%20Dados%20&color=blue&style=for-the-badge&logo=MYSQL"/>
  <img src="http://img.shields.io/static/v1?label=License&message=MIT&color=green&style=for-the-badge"/>
  <img src="https://img.shields.io/static/v1?label=typescript&message=3.8.3&color=black&style=for-the-badge&logo=TYPESCRIPT"/>
  <img src="http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=RED&style=for-the-badge"/>
</p>

> Status do Projeto: Em desenvolvimento :warning: 


## Descrição do projeto 

<p align="justify">
  O LaBook é uma rede social com o objetivo de promover a conexão e interação entre seus mais diversos usuários. Os usuários podem criar posts de dois tipos ("evento" ou "normal), comentá-los e curti-los também.
</p>


## Funcionalidades

#### 1. Cadastrar

  Para o cadastro nessa rede social, o usuário deve fornecer seu nome, seu e-mail e uma senha. Além disso, esse endpoint já tem que realizar o login do usuário, fornecendo seu token de autenticação no retorno da requisição.

#### 2. Logar

Para realizar o login, basta informar seu e-mail e a sua senha. O retorno deve conter o token de autenticação do usuário.

#### 3. Fazer Amizade  

Para realizar o login, basta informar seu e-mail e a sua senha. O retorno deve conter o token de autenticação do usuário.

Uma amizade é uma "relação mútua": quando um usuário vira amigo de outro, esse outro "já é amigo" desse primeiro usuário (ou seja, o segundo usuário não precisa virar amigo do outro depois)

Não há a necessidade de "aceitar" uma amizade.

#### 4. Desfazer Amizade

Encerrar uma amizade segue o mesmo fluxo de fazer: com o token de autenticação e o id do usuário, já é possível realizar esse processo.

#### 5. Criar Post 

O post deve ser criado, passando-se as informações de: foto, descrição, data de criação e tipo ("normal" ou "evento").

#### 6. Ver todo o feed

O feed é composto por todos os posts dos  amigos do usuário logado. Os posts devem ser retornado em ordem de criação: do mais recente ao mais antigo.

#### 7. Ver apenas um tipo de post do Feed

Esse endpoint deve receber um tipo ("normal" ou "evento") e retornar todos os posts que sejam do tipo especificado. Os posts devem ser retornado em ordem de criação: do mais recente ao mais antigo.

#### 8. Curtir Post

Essa requisição deve receber somente o id do post e retornar uma mensagem de sucesso ou erro. Um usuário não pode curtir o mesmo post duas vezes.

#### 9. Descurtir Post

Essa requisição deve receber somente o id do post e retornar uma mensagem de sucesso ou erro. Um usuário não pode descurtir um post que não tenha curtido

#### 10. Comentar Post

Recebendo o id do post e mensagem do comentário, o endpoint deve funcionar sem problemas. Um usuário pode, se quiser, comentar mais de uma vez o mesmo post. 


## Pré-requisitos

:warning: [Node](https://nodejs.org/en/download/)

:warning: [MYSQL](https://www.mysql.com/downloads/)



## Como rodar a aplicação :arrow_forward:

No terminal, clone o projeto: 

```
git clone https://github.com/nauaramelo/labenu-labook-frontend.git
```
Entre no projeto e instale as dependências através do comando:
```
npm install
```
Por último, suba a aplicação: 
```
npm start
```

## Iniciando/Configurando o Banco de Dados 🗃️

- Criação da tabela de usuários:
```
CREATE TABLE UsersLabook (
    id VARCHAR(255) PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);
```
- Criação da tabela de Relações: 
```
CREATE TABLE RelationsLabook (
    id_inviter VARCHAR(255) NOT NULL,
    id_invited VARCHAR(255) NOT NULL,
    FOREIGN KEY (id_inviter) REFERENCES UsersLabook(id),
    FOREIGN KEY (id_invited) REFERENCES UsersLabook(id)
);
```
- Criação da tabela de Posts:
```
CREATE TABLE PostsLabook (
    id VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    type VARCHAR(255) NOT NULL,
    id_user VARCHAR(255) NOT NULL,
    FOREIGN KEY (id_user) REFERENCES UsersLabook(id)
);
```
- Criação da tabela de Refresh Token: 
```
CREATE TABLE RefreshTokenLabook (
    refresh_token VARCHAR(255) PRIMARY KEY,
    device VARCHAR(255) NOT NULL,
    is_active TINYINT NOT NULL DEFAULT 1,
    user_id VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES UsersLabook(id)
);
```


## Linguagens, dependencias e libs utilizadas :books:

- [Node](https://nodejs.org/en/)
- [MYSQL](https://www.mysql.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [Knex](http://knexjs.org/)
- [Moment](https://momentjs.com/)
- [Json Web Token](https://jwt.io/)

## Desenvolvedora/Contribuinte :octocat:

| [<img src="https://user-images.githubusercontent.com/59856574/86283681-d11d7780-bbb7-11ea-90a5-9312ee67cdec.jpg" width=115><br><sub>Nauara Melo</sub>](https://www.linkedin.com/in/nauara-melo-mayer-464a82135/) | 
| :---: |

## Licença 

[MIT License](https://opensource.org/licenses/MIT)

Copyright :copyright: 2020 - Labook

