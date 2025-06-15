
# 🧪 NestJS Starter

A scalable, production-ready NestJS boilerplate with batteries included. This starter is built for teams and individuals who want a robust backend setup with Redis, Elasticsearch, WebSockets, and more.

---

## 🚀 Features

* ✅ **Modular Configuration**: Centralized config management via `.env` and `ConfigModule`.
* 🔐 **Authentication System**:

  * Passport.js integration
  * Built-in **JWT strategy**
  * Easily extendable to add OAuth, local, etc.
* 📦 **Elasticsearch**: Seamless integration for full-text search and analytics use-cases.
* 🧰 **Utility Functions**: Common helper functions to keep your code DRY and clean.
* 🧠 **Redis Integration** (via `ioredis`):

  * Caching layer
  * Pub/Sub support
  * Redis Streams support for message/event queues
* 🌐 **WebSocket Manager**:

  * Centralized gateway
  * **Redis adapter** for horizontal scaling
  * User connections registered for **1-to-1 messaging**
* 📬 **Mailing Module**: Easily plug in mailing services like SendGrid, Mailgun, or SMTP.
* 🛡️ **Security**:

  * CSRF protection (double-submit cookie strategy)
  * Secure headers via `Helmet`
* 📚 **API Documentation**:

  * Swagger auto-generated docs
  * Beautiful UI powered by **Scalar**
* 🎯 **Background Jobs**:

  * Bull Module with Redis backend
  * For tasks like email queues, notifications, etc.
* 📑 **Request & Response Logging**:

  * Custom **interceptors** log HTTP traffic
  * Extendable for audit logging or debugging

---

## 📂 Folder Structure

```
src/
├── authentication/
│   ├── decorators/
│   ├── dtos/
│   ├── guards/
│   ├── strategies/
│   ├── types/
│   ├── authentication.controller.ts
│   ├── authentication.controller.spec.ts
│   ├── authentication.module.ts
│   └── authentication.service.ts
│
├── common/
│   ├── constants/
│   │   ├── jobs.ts
│   │   └── queues.ts
│   └── utils/
│       ├── authentication/
│       └── webSocket/
│           ├── index.ts
│           ├── json.utils.ts
│           ├── object.utils.ts
│           ├── query.utils.ts
│           └── result.util.ts
│
├── config/
├── redis/
├── user/
│
├── app.controller.ts
├── app.controller.spec.ts
├── app.module.ts
├── app.service.ts
└── main.ts
```

---

## 🛠️ Setup & Run

```bash
# Clone the repo
git clone https://github.com/your-org/nestjs-starter.git
cd nestjs-starter

# Install dependencies
npm install

# Setup environment
cp .env.example .env

# Run the app
npm run start:dev
```

---

## 🧪 Scripts

| Script       | Description                   |
| ------------ | ----------------------------- |
| `start:dev`  | Start in development mode     |
| `start:prod` | Build and start in production |
| `test`       | Run unit tests                |
| `lint`       | Lint your codebase            |

---

## 📖 API Documentation

Swagger is auto-generated at runtime and available at:

```
http://localhost:3000/docs
```

Beautiful UI powered by [Scalar](https://github.com/sdorra/swagger-ui-scalar).

---

## 📬 Mailer Setup

Update your mailing provider details in the `.env` file:

```env
MAIL_HOST=smtp.example.com
MAIL_PORT=587
MAIL_USER=username
MAIL_PASS=securepassword
```

---

## ⚙️ Background Jobs

Jobs are processed using **Bull** and stored in Redis. Define jobs under `common/constants/` and register them in the job queues.

---

## 🧠 Redis Usage

You can use Redis for:

* Caching
* Pub/Sub (real-time messaging)
* WebSocket scaling

Configured in `redis/` module.

---

## 🌐 WebSockets

Supports **single-user messaging** and **distributed WebSocket server** setup using Redis adapter. Define events in `common/utils/webSocket/`.

---

## 🔒 Security

This starter includes:

* Helmet for HTTP header protection
* Double CSRF strategy using cookie and token
* Rate limiting (optional)
---
## Current Status
the starter is in the start of it but it should only take 1-2 days to be production ready, the current features are enough to start a project and add more features later on.
## 📜 Contributing
We welcome contributions! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests.

## 📦 License

MIT © 2025  Mouloud Hasrane


