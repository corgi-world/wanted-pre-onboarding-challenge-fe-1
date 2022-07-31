import React from "react";
import styled from "styled-components";
import { requestCreateUser, requestLoginUser } from "../../services/userService";
import { setUserToken } from "../../store/storage";
import { useSetRecoilState } from "recoil";
import { isLoggedInAtom } from "../../store/atom";

const email = "msw@inu.ac.kr";
const password = "12345678";

export default function Login() {
  const setIsLoggedIn = useSetRecoilState(isLoggedInAtom);

  const handleCreateClick = async () => {
    const { isError, data } = await requestCreateUser(email, password);
    const message = isError ? data.details : data.message;
    alert(message);
  };
  const handleLoginClick = async () => {
    const { isError, data } = await requestLoginUser(email, password);
    if (!isError && data.token) {
      setUserToken(data.token);
      setIsLoggedIn(true);
    }

    const message = isError ? data.details : data.message;
    alert(message);
  };

  return (
    <Wrapper>
      <Button onClick={handleCreateClick}>회원가입</Button>
      <Button onClick={handleLoginClick}>로그인</Button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 100vh;
`;

const Button = styled.button`
  cursor: pointer;
  background-color: lightgray;
  font-size: 40px;
  font-weight: 600;
  width: 300px;
  height: 300px;
`;
