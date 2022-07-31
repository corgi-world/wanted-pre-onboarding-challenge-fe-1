import React, { useState } from "react";
import styled from "styled-components";
import { ITodo } from "../../services/todoService";

interface ITodoProps {
  todo: ITodo;
  updateTodo: (id: string, title: string, content: string) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
}

export default function Todo({ todo, updateTodo, deleteTodo }: ITodoProps) {
  const [title, setTitle] = useState(todo.title);
  const [content, setContent] = useState(todo.content);

  const handleUpdateClick = async () => {
    await updateTodo(todo.id, title, content);
  };
  const handleDeleteClick = async () => {
    await deleteTodo(todo.id);
  };

  return (
    <Wrapper>
      <TitleInput
        value={title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setTitle(e.target.value);
        }}
      />
      <ContentInput
        value={content}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
          setContent(e.target.value);
        }}
      />
      <ButtonWrapper>
        <Button onClick={handleUpdateClick}>수정</Button>
        <Button onClick={handleDeleteClick}>삭제</Button>
      </ButtonWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const TitleInput = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid black;
`;
const ContentInput = styled.textarea`
  padding: 10px;
  height: 60px;
  border: 1px solid black;
  margin-bottom: 10px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  > :nth-child(1) {
    margin-right: 5px;
  }
  > :nth-child(2) {
    margin-left: 5px;
  }
`;
const Button = styled.button`
  width: 100%;
  cursor: pointer;
  padding: 10px;
  border: 1px solid black;
`;
