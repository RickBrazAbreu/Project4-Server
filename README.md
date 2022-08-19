### Authentication

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| POST   | `/sign-up`             | `users#signup`    |
| POST   | `/sign-in`             | `users#signin`    |
| PATCH  | `/change-password/` | `users#changepw`  |
| DELETE | `/sign-out/`        | `users#signout`   |


### Shop Itens
| Verb   | URI Pattern            | 
|--------|------------------------|
| POST   | `/shopitens`            |
| GET   | `/shopitens`             |
| GET   | `/shopitens`             |
| PATCH  | `/shopitens/:id`    |
| DELETE | `/shopitens/:id`           |
