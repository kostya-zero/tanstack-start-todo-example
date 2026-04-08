# TanStack To-Do Demo

This is a demo project of using TanStack Start with Prisma to build full-stack apps.

# Prepare

Install all dependencies:

```shell
bun install
```

Then in `.env` file provide a `DATABASE_URL` variable that should contain connection to the PostgreSQL database. Then
run migrations:

```shell
bunx --bun prisma migrate deploy
bunx --bun prisma db pull
```

Now you can start the project:

```shell
# Start dev server
bun --bun dev

# Build the app and run it
bun --bun run build
bun --bun run .output/server/index.mjs
```
