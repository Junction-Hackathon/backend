🛠️ Backend Documentation – Qurbani Management System
Overview

The backend of the Qurbani Management System is a robust, production-ready NestJS microservice architecture built on a custom starter boilerplate that integrates Kafka, Redis, Prisma, and BullMQ. It leverages the full power of asynchronous messaging, offline-first strategies, and AI-powered processing, while providing secure and scalable services to support the high-throughput nature of Eid Qurbani operations.
🧪 Powered by: NestJS Starter Boilerplate

The backend was bootstrapped using a custom NestJS Starter, offering:

    🔐 JWT Auth with Passport.js and multi-strategy support

    🧠 Redis: Caching, Pub/Sub, Streams

    🌐 WebSocket Gateway: Centralized, horizontally scalable via Redis

    📬 Mailer: SendGrid/Mailgun/SMTP ready

    🔁 BullMQ: Background jobs with custom queues

    📚 Swagger API Docs: Powered by Scalar

    🛡️ Security: Helmet, CSRF, rate limiting

    📊 Health Checks: Terminus support

    🐳 Docker Compose: Redis, Elasticsearch, etc.

    🚄 Optional Fastify Support

    🧰 Common utility functions and logging interceptors

🏗️ Architectural Stack
Layer	Technology
Framework	NestJS (Microservices Mode)
Messaging Queue	Kafka (Confluent Platform) + Zookeeper
Queue Management	Redis + BullMQ
Database ORM	Prisma ORM (PostgreSQL)
Caching	Redis (ioredis integration)
Cloud Storage 	Cloudinary  (via SDK)
Auth	JWT + Role-Based Access Control
Automatic video archivng into a cold storage after a 3 months of creation
Realtime Layer	NestJS WebSocket Gateway + Redis Adapter
AI Processing	External Python (REST + Kafka)
Notification	Firebase Cloud Messaging, Twilio SMS
🔁 Kafka Topics & Event Flow
video.initial-upload

    Triggered after client requests video upload.

    Job is offloaded via BullMQ to avoid long HTTP requests.

video.uploaded-preprocessed

    Triggered after BullMQ job uploads the video to Wasabi.

    Consumed by AI service to begin processing.

video.processed-final

    After AI finishes processing, metadata and AI results are saved.

    Backend updates video record and prepares client notification.

notification.send

    Sends push notifications or WhatsApp/SMS and logs it.

🎬 AI Integration Pipeline
1. Enhancement & Privacy

    Denoise & upscale video → filename_enhanced.mp4

    Optional blurring of blood and sensitive areas → filename_blurred.mp4

2. Scene Validation

    Extract frames @ 1fps, detect presence of:

        🧍 Person

        🐑 Animal

        🔪 Knife

    Mark video as authentic if all are detected in the same frame

3. Donor Name Verification

    Audio transcribed using Whisper

    Fuzzy-matched with expected donor name

    Returns:

        Match status

        Confidence score

📦 Microservices & Modules
Service	Key Responsibilities
video-upload-service	Handles validation, pre-upload logic, BullMQ enqueueing
video-processing-service	Publishes & listens to AI pipeline messages
notification-service	Sends FCM or SMS/WhatsApp alerts via Kafka
donor-service	Manages orders and metadata
executor-service	Tracks sacrifices, uploads, and feedback
delivery-service	Manages driver routes, live tracking, and delivery updates
skin-trade-service	Handles skin post-processing, storage, and sales
admin-service	Dashboards, audit logs, and oversight tools
🔒 Security Design

    JWT + Refresh Tokens

    Role-based Guards & Interceptors

    Helmet for HTTP headers

    CSRF via double-submit cookie

    Rate limiting (@nestjs/throttler)

    AES encryption for sensitive data

    Data validation using class-validator

    Audit trails for sensitive actions

🧠 Redis Usage
Purpose	Details
Caching	Frequently queried entities (e.g., donors, routes)
Pub/Sub	For WebSocket & microservice updates
Streams	For log/event queuing
BullMQ Backend	Job queues for video uploads, notifications, etc.
🎯 BullMQ Jobs
Queue Name	Description
videoUpload	Compress, rename, and upload to Wasabi
notification	Send FCM/WhatsApp/SMS messages
deliveryEvents	Background delivery logs & route updates
aiFallbacks	Manual review jobs for flagged videos
📬 Mailing Support

    Easily configured via .env

    Works with SMTP, Mailgun, SendGrid

    Used for:

        Admin alerts

        Manual donor communications

        AI pipeline failure notifications

🌐 Real-Time Support

    WebSocket Gateway built-in

    Redis adapter for scale-out deployments

    Supports:

        Live delivery tracking

        Admin monitoring dashboards

        Direct 1-to-1 updates (e.g., donor status)

⚙️ Performance
Area	Optimization
Video Upload	Background jobs via BullMQ
API Load	Fastify support available (branch)
Storage	Wasabi SDK with chunked uploads
CPU-bound Tasks	Offloaded to external workers
Clustering	PM2 used for clustering via start:prod
CDN Support	Wasabi + CloudFront planned
📚 API Docs

    Swagger via @nestjs/swagger

    Hosted at /api-docs

    Uses Scalar UI for enhanced interface

❤️ Health Checks

    /health endpoint (via Terminus)

    Checks:

        PostgreSQL (Prisma)

        Redis

        Kafka brokers

        Elasticsearch (if used)

🐳 Docker Compose Setup

Compose file includes:

    Redis

    PostgreSQL

    Elasticsearch (optional)

    Zookeeper + Kafka

    Node.js services in isolated containers

🧪 Dev Scripts
Script	Description
start:dev	Run all services in dev
start:prod	Start clustered server
test	Run unit tests (Jest)
lint	Run ESLint/Prettier
✅ Success Metrics (Backend)
Metric	Target
Kafka Message Latency	< 200ms
Upload-to-Processed Time (avg)	< 3 min
API Response Time (p95)	< 500ms
FCM/SMS Delivery Rate	> 99%
AI Scene Validation Accuracy	> 95%
Redis Cache Hit Ratio	> 90%
📘 Notes

    QR Code management was deprecated for this phase to simplify UX and lower the cost .

    All video tracking is tied directly to the donor record ID.

🧑‍💻 Author & Maintainer

Mouloud Hasrane
MIT License © 2025
For questions or contributions, see CONTRIBUTING.md
