import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import { addWordFB } from "./redux/modules/word";

const Plus = (props) => {
  let history = useHistory();
  const dispatch = useDispatch();
  const word = React.useRef(null);
  const mean = React.useRef(null);
  const example = React.useRef(null);

  const checkWordList = () => {
    if (word.current.value == ""){
      alert("단어를 입력해 주세요!");
    } else if (mean.current.value == ""){
      alert("뜻을 입력해 주세요!");
    } else if (example.current.value == ""){
      alert("예문을 입력해 주세요!");
    } else {
      addWordList();
    }
  }
  const addWordList = () => {
    dispatch(addWordFB({ word: word.current.value, mean: mean.current.value, example: example.current.value, completed: false }));
    history.goBack();
  }

  return (
    <>
     <Container>
      <h1 style={{color:"#8aaae5", textAlign:"center"}}> 단어 추가하기 </h1>
      <TextInputBox>
      <TextInput ref={word} placeholder="단어" autoFocus></TextInput>
      <TextInput ref={mean} placeholder="뜻"></TextInput>
      <TextInput style={{width: "400px"}} ref={example} placeholder="예문"></TextInput>
      </TextInputBox>
      <ButtonBox>
      <Button onClick={checkWordList} style={{width: "100px", margin:"10px auto"}} variant="outlined" size="small" color="primary">추가</Button>
      <Button onClick={() => {history.push("/");}} style={{width: "100px", margin:"10px auto"}} variant="outlined" size="small" color="secondary">취소</Button>
      </ButtonBox>
     </Container>
    </>
  );
};


const Container = styled.div`
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
  border: 1px solid #8aaae5;
  padding: 30px;
  margin: 100px auto;
  width: 50vw;
  display: flex;
  flex-direction: column;
`;

const TextInput = styled.input`
  width: 300px;
  height: 32px;
  font-size: 15px;
  border: 0;
  border-radius: 15px;
  outline: none;
  padding-left: 10px;
  background-color: #d9e3f5;
  margin: 10px auto;
`;

const TextInputBox = styled.div`
  width: 50vw;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const ButtonBox = styled.div`
margin: 0px auto;
width: 220px;
  display: flex;
  flex-direction: row;
`;




export default Plus;