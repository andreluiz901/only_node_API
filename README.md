# API de Tasks

Bem-vindo à documentação da API de Tasks! Esta API foi desenvolvida para permitir a gestão de tarefas (tasks) por meio das operações CRUD (Create, Read, Update, Delete). Além disso, oferece a funcionalidade de importação em massa de tarefas por meio de um arquivo CSV.

Esta API utiliza APENAS node e javascript, sem libs para implementar uma API com um CRUD capaz de armazenar dados de Tasks a serem feitas

## Sobre a API

Nesta API, você é capaz de lidar com as seguintes operações:

- Criação de uma task
- Listagem de todas as tasks
- Atualização de uma task pelo id
- Remoção de uma task pelo id
- Marcação de uma task como completa pelo id
- Importação de tasks em massa por um arquivo CSV

## Estrutura de uma Task

Cada task possui as seguintes propriedades:

- id - Identificador único de cada task com UUID.
- title - Título da task definida pelo usuário ao criar a task.
- description - Descrição detalhada da task definida pelo usuário ao criar a task.
- completed_at - Data de quando a task foi concluída. O valor inicial é `null`.
- created_at - Data de quando a task foi criada, gerada automaticamente ao criar.
- updated_at - Gerado automaticamente quando a task for atualizada, inicialmente é `null`.

## Rotas e Regras de Negócio

### `[POST] /tasks`

Cria uma task no banco de dados.

- Request Body:

  - title (`string`) - Título da task
  - description (`string`) - Descrição detalhada da task

- Response:

  - id - Identificador único gerado automaticamente
  - title - Título da task
  - description - Descrição detalhada da task
  - completed_at - Data de conclusão (inicialmente null)
  - created_at - Data de criação
  - updated_at - Data de atualização

### `[GET] /tasks`

Lista todas as tasks salvas no banco de dados.

- Query Parameters:

  - title (`string`, **opcional**) - Filtra tasks pelo título
  - description (`string`, **opcional**) - Filtra tasks pela descrição

- Response:

  Lista de tasks com as propriedades mencionadas acima.

### `[PUT] /tasks/:id`

Atualiza uma task pelo id.

- Request Body:

  - title (`string`, **opcional**) - Novo título da task
  - description (`string`, **opcional**) - Nova descrição da task

- Response:

  Task atualizada com as propriedades mencionadas acima.

### `[DELETE] /tasks/:id`

Remove uma task pelo id.

- Response:
  - message - Mensagem indicando a remoção bem-sucedida.

### `PATCH /tasks/:id/complete`

Marca ou desmarca uma task como completa.

- Response:
  - Task atualizada com as propriedades mencionadas acima.

### `POST /tasks/multi`

Importa tasks em massa por meio de um arquivo CSV.

- Response:
  - message - Mensagem indicando a importação bem-sucedida.

## Exemplos de Uso

A seguir, são fornecidos exemplos de como usar cada rota da API.

Exemplo de Criação de Task

```
POST /tasks
{
"title": "Realizar Desafio",
"description": "Desenvolver uma API para gerenciar tasks"
}
```

Exemplo de Listagem de Tasks

```
GET /tasks
```

Exemplo de Atualização de Task

```
PUT /tasks/id
{
  "title": "Concluir Desafio"
}
```

Exemplo de Remoção de Task

```
DELETE /tasks/id
```

Exemplo de Marcação de Task como Completa

```
PATCH /tasks/1/complete
```

Exemplo de Importação em Massa por CSV

```
POST /tasks/multi
```
