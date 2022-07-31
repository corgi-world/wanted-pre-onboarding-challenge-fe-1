import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getUserToken, clearStorage } from "../../store/storage";
import {
  ITodo,
  requestGetTodos,
  requestCreateTodo,
  requestUpdateTodo,
  requestDeleteTodo,
} from "../../services/todoService";
import { useSetRecoilState } from "recoil";
import { isLoggedInAtom } from "../../store/atom";
import Todo from "./Todo";
import TodoInput from "./TodoInput";

export default function Todos() {
  const [todos, setTodos] = useState<ITodo[]>([]);

  const setIsLoggedIn = useSetRecoilState(isLoggedInAtom);
  const logout = () => {
    clearStorage();
    setIsLoggedIn(false);
  };

  const getTodos = async () => {
    const token = getUserToken();
    const { isError, data } = await requestGetTodos(token);
    if (!isError && data) {
      setTodos(data);
    } else if (isError) {
      logout();
    }
  };

  const createTodo = async (title: string, content: string) => {
    const token = getUserToken();
    const { isError } = await requestCreateTodo(token, title, content);
    if (isError) {
      alert("추가 실패");
    }
    getTodos();
  };
  const updateTodo = async (id: string, title: string, content: string) => {
    const token = getUserToken();
    const { isError } = await requestUpdateTodo(token, id, title, content);
    if (isError) {
      alert("수정 실패");
    }
    getTodos();
  };
  const deleteTodo = async (id: string) => {
    const token = getUserToken();
    const { isError } = await requestDeleteTodo(token, id);
    if (isError) {
      alert("삭제 실패");
    }
    getTodos();
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <Wrapper>
      <TodoInput createTodo={createTodo} />
      {todos.length === 0
        ? null
        : todos.map((todo) => (
            <Todo
              key={todo.createdAt}
              todo={todo}
              updateTodo={updateTodo}
              deleteTodo={deleteTodo}
            />
          ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
