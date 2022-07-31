import React, { useState } from "react";
import styled from "styled-components";

interface ITodoInputProps {
  createTodo: (title: string, content: string) => Promise<void>;
}

export default function TodoInput({ createTodo }: ITodoInputProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleCreateClick = async () => {
    await createTodo(title, content);
    setTitle("");
    setContent("");
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
      <Button onClick={handleCreateClick}>추가</Button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin-top: 30px;
  margin-bottom: 30px;
  background-color: lightgray;
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

const Button = styled.button`
  width: 100%;
  cursor: pointer;
  padding: 10px;
  border: 1px solid black;
`;
