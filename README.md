# Teste para Engenheiro de Software Backend

A proposta deste teste é criar uma integração com a API da marvel.

Ferramentas e tecnologias utilizadas:
- NodeJS
- Express
- MongoDB
- RabbitMQ (mensageria)
- Swagger (documentação)
- Docker

## Para rodar o projeto
   - Fazer o clone do repositório 
   - Instalar as dependências com utilizando `yarn`
   - Subir os serviços no docker utilizando `docker-compose up`
   - A documentação no Swagger está presente na rota `/api-docs`
   - Obs: sei que não é uma boa prática, mas estou enviando no commit o arquivo .env, para que possam rodar o projeto mais facilmente, sem a necessidade de fazer outro cadastro na API da Marvel.

## Primeiro exercício

  - Realizado na rota GET `/characters`

## Segundo exercício

 - Realizado na rota POST `/characters/import`

## Terceiro exercício

   - Realizado parcialmente: Apesar de ter criado a fila, tive dificuldades em implementar/subir o worker para consumo da fila. Para dar continuidade nos outros passos do desafio, salvei os dados diretamente no banco no momento do import do "segundo exercício".

## Quarto exercício

   - Realizado na rota GET `/comics/{id}`

## Quinto exercício

  - Realizado.

  ## Sexto exercício

  - Realizado na rota `/api-docs`

## Sétimo exercício

  - Não consegui realizar a tempo, visto que investi grande parte do tempo em aprender e implementar o Docker Compose e RabbitMQ do zero, algo que não havia feito até o momento.
