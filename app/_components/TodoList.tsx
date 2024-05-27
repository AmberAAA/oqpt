"use client";

import exp from "constants";
import { trpc } from "../_trpc/client";
import { useCallback, useState } from "react";
import { serverClient } from "../_trpc/server";

type Todo = Awaited<ReturnType<(typeof serverClient)["getTodos"]>>[number];

interface TodoListProps {
  initialTodos: Todo[];
}

const TodoList = ({ initialTodos }: TodoListProps) => {
  const [done, setDone] = useState<number | undefined>();
  const todos = trpc.getTodos.useQuery(
    {
      done,
    },
    {
      initialData: initialTodos,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );
  const addTodo = trpc.addTodo.useMutation({
    onSuccess(data, variables, context) {
      setContext("");
      todos.refetch();
    },
  });
  const changeTodoState = trpc.changeTodoState.useMutation({
    onSuccess(data, variables, context) {
      todos.refetch();
    },
  });
  const [context, setContext] = useState("");

  return (
    <div>
      <h3>{todos.isLoading ? 1 : 0}</h3>
      <div>
        filter done:{" "}
        <input
          type="checkbox"
          onChange={(e) => setDone(e.target.checked ? 0 : undefined)}
        />
      </div>
      <div>
        {todos.data?.map((i) => (
          <div key={i.id} className=" flex gap-2">
            <input
              type="checkbox"
              checked={!!i.done}
              onChange={(e) =>
                changeTodoState.mutate({
                  id: i.id,
                  done: e.target.checked ? 1 : 0,
                })
              }
            ></input>
            <span>{i.id}</span>
            <span>-</span>
            <span>{i.context}</span>
          </div>
        ))}
        <hr />
        <input
          type="text"
          value={context}
          onChange={(e) => setContext(e.target.value)}
          onKeyUp={(e) =>
            e.key.toLowerCase() === "enter" && addTodo.mutate(context)
          }
        />
      </div>
    </div>
  );
};

export default TodoList;
