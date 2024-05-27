import { publicProcedure, router } from "../trpc";
import z from "zod";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { todos } from "@/db/schema";
import { SQL, and, eq } from "drizzle-orm";

const sqlite = new Database("sqlite.db");
const db = drizzle(sqlite);

export const todoRouter = router({
  getTodos: publicProcedure
    .input(
      z
        .object({
          done: z.number().optional(),
        })
        .optional()
    )
    .query(async ({ input }) => {
      const args = [];
      if (typeof input?.done === "number") {
        args.push(eq(todos.done, input.done));
      }
      const todoList = db
        .select()
        .from(todos)
        .where(and(...args))
        .all();
      return todoList;
    }),
  addTodo: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    await db.insert(todos).values({ context: input, done: 0 }).run();
    return true;
  }),
  changeTodoState: publicProcedure
    .input(z.object({ id: z.number(), done: z.number() }))
    .mutation(async ({ input }) => {
      await db
        .update(todos)
        .set({ done: input.done })
        .where(eq(todos.id, input.id));
    }),
});
