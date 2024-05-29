import React from "react";
import TodoList from "./_components/TodoList";
import { serverClient } from "./_trpc/server";
import MotionDemo from "./_components/MotionDemo";

export const revalidate = 0;

export default async function Home() {
  const todos = await serverClient.todo.getTodos();
  const users = await serverClient.user.users();

  return (
    <main className="max-w-3xl mx-auto mt-5">
      server - {todos.length}
      <hr />
      <TodoList initialTodos={todos} />
      <hr />
      <MotionDemo />
      <hr />
      {JSON.stringify(users)}
    </main>
  );
}
