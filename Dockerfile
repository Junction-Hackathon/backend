
FROM node:22-alpine as base
# Set working directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Install dependencies using pnpm
RUN pnpm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the application
FROM base as build

# Generate Prisma client
RUN pnpm prisma generate

# Build the application
RUN pnpm run build

# Copy entrypoint.sh into the container

# Give execution permissions

ENV DATABASE_URL="postgresql://dba7:pass@db:5432/main?schema=public&connection_limit=15&pool_timeout=10&connect_timeout=30"
#RUN pnpm dlx prisma migrate deploy

# Expose the port the app runs on, here, I was using port 3000
EXPOSE 3000

# FALLBack command
CMD ["pnpm", "run", "start:dev"]
