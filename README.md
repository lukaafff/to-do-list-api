
# 👋 Gerenciador de tarefas (API)


## ✈️ O projeto

## Visão Geral:
A API de Gerenciador de Tarefas permite a criação, listagem, atualização e remoção de tarefas de usuários. Além de criar seu usuário.

## Autenticação
Para acessar as rotas da API, é necessário enviar um token JWT no cabeçalho Authorization com o formato Bearer <token>.

## Endpoints Disponíveis
 - Criação de conta

**URL:** https://to-do-list-api-jet.vercel.app/auth/register

**Método:** POST

**Descrição:** Cria conta do usuário.

**Requer Autenticação:** Não

**Exemplo de Requisição:**

```
{
    "name": "helen",
    "lastName": "Maria",
    "email": "h.maria@gmail.com",
    "password": "123456",
    "confirmPassword": "123456"
}
```

**Exemplo de Resposta:**
```
{
    "msg": "Usuário criado com sucesso!"
}
```
---

- Entrar na conta

**URL:** https://to-do-list-api-jet.vercel.app/auth/login

**Método:** POST

**Descrição:** Entrar na conta do usuário.

**Requer Autenticação:** Não

**Exemplo de Requisição:**

```
{
    "email":           "h.maria@gmail.com",
    "password":        "123456",
}
```

**Exemplo de Resposta:**
```
{
    "msg": "Autenticação realizada com sucesso",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NjY1ZDIzNTdmYTdjMmQ5MGRiZmM4NCIsImlhdCI6MTcwMTIwNzcxOXl.TOiD-a6_g7OPF_5pWiKKjGooGPkoFlT76ipho5__l5Q",
    "user": {
        "_id": "65665d2357fa7c2d90dbfc54",
        "name": "helen",
        "lastName": "Maria",
        "email": "h.maria@gmail.com",
        "__v": 0
    }
}
```

---

### CRUD usuário
- Dados do usuário

**URL:** https://to-do-list-api-jet.vercel.app/user/:userId

**Método:** GET

**Descrição:** Ver dados do usuário.

**Requer Autenticação:** Sim

**Exemplo de Requisição:**

```

```

**Exemplo de Resposta:**
```
{
    "user": {
        "_id": "65665d2357fa7c2d90dbfc54",
        "name": "helen",
        "lastName": "Maria",
        "email": "h.maria@gmail.com",
        "__v": 0
    }
}
```

---

- Editar dados do usuário

**URL:** https://to-do-list-api-jet.vercel.app/user/:userId

**Método:** PUT

**Descrição:** Editar dados do usuário.

**Requer Autenticação:** Sim

**Exemplo de Requisição:**

```
{
    "name": "Marcia"
}

```

**Exemplo de Resposta:**
```
{
    "msg": "Dados do usuário atualizados com sucesso!",
    "user": {
        "_id": "656667b4b1ed9ca5efde2fe9",
        "name": "Maria",
        "lastName": "Maria",
        "email": "maria@gmail.com",
        "__v": 0
    }
}
```

---

- Deletar usuário

**URL:** https://to-do-list-api-jet.vercel.app/user/:userId

**Método:** DELETE

**Descrição:** Deleta o usuário.

**Requer Autenticação:** Sim

**Exemplo de Requisição:**

```

```

**Exemplo de Resposta:**
```
{
    "msg": "Usuário deletado com sucesso!"
}
```

---

### CRUD tarefas

- Criar tarefa

**URL:** https://to-do-list-api-jet.vercel.app/task/:userId

**Método:** POST

**Descrição:** Criar  tarefa.

**Requer Autenticação:** Sim

**Exemplo de Requisição:**

```
{
    "title": "ir as compras",
    "description": "leite, pão, ovo"   
}

```

**Exemplo de Resposta:**
```
{
    "_id": "656669ad480cb42013e0f27f",
    "title": "ir as compras",
    "description": "leite, pão, ovo",
    "createdAt": "2023-11-28T22:29:01.341Z"
}
```
---

**URL:** https://to-do-list-api-jet.vercel.app/task/:userId

**Método:** GET

**Descrição:** Ver tarefas do usuário.

**Requer Autenticação:** Sim

**Exemplo de Requisição:**

```

```

**Exemplo de Resposta:**
```
[
    {
        "_id": "6566620fd83312a5ca7d03cd",
        "title": "academia",
        "description": "fazer cardio",
        "createdAt": "2023-11-28-18:56"
    },
    {
        "_id": "65666823480cb42013e0f278",
        "title": "ir as compras",
        "description": "leite, pão, ovo",
        "createdAt": "2023-11-28-19:22"
    }
]
```

---

- Editar tarefas do usuário

**URL:** https://to-do-list-api-jet.vercel.app/task/:userId/:taskId

**Método:** PUT

**Descrição:** Editar tarefa do usuário.

**Requer Autenticação:** Sim

**Exemplo de Requisição:**

```
{
    "title": "ir ao mercado"
}

```

**Exemplo de Resposta:**
```
{
    "_id": "65666823480cb42013e0f278",
    "title": "ir ao mercado",
    "description": "leite, pão, ovo",
    "createdAt": "2023-11-28-19:22",
    "updatedAt": "2023-11-28-19:25"
}
```

---

- Deletar tarefa

**URL:** https://to-do-list-api-jet.vercel.app/task/:userId/:taskId

**Método:** DELETE

**Descrição:** Deleta tarefa.

**Requer Autenticação:** Sim

**Exemplo de Requisição:**

```

```

**Exemplo de Resposta:**
```
{
    "message": "Tarefa excluída com sucesso!",
    "deletedTask": {
        "_id": "65666823480cb42013e0f278",
        "title": "ir ao mercado",
        "description": "leite, pão, ovo",
        "user": "65665d2357fa7c2d90dbfc84",
        "createdAt": "2023-11-28T22:22:27.988Z",
        "__v": 0
    }
}
```
