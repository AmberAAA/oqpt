import { drizzle } from "drizzle-orm/better-sqlite3";
import { router } from "./trpc";
import Database from "better-sqlite3";
import { todoRouter } from "./router/user";

const sqlite = new Database("sqlite.db");
const db = drizzle(sqlite);

export const appRouter = router({
  todo: todoRouter,
  user: todoRouter,
});

export type AppRouter = typeof appRouter;
