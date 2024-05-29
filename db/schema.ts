import { relations } from "drizzle-orm";
import { integer, sqliteTable, text, blob } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
}));

export const posts = sqliteTable("posts", {
  id: integer("id").primaryKey(),
  content: text("content").notNull(),
  authorId: integer("author_id").notNull(),
});

export const postsRelations = relations(posts, ({ one }) => ({
  author: one(users, { fields: [posts.authorId], references: [users.id] }),
}));
