import "./App.css";
import React from "react";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AddCircle from "@material-ui/icons/AddCircle";

import WordList from "./WordList";
import NotFound from "./NotFound";
import { isLoaded, loadWordFB } from "./redux/modules/word";
import Spinner from "./Spinner";
import Plus from "./Plus";
import Edit from "./Edit";

function App() {
  const history = useHistory();
  const dispatch = useDispatch();
  const is_loaded = useSelector((state) => state.word.is_loaded);

  React.useEffect(() => {
    dispatch(loadWordFB());
  });
  
  return (
    <div className="App">
      <Container>
        <Title
          style={{ cursor: "pointer" }}
          onClick={() => {
            history.push("/");
          }}
        >
          영어 단어장
        </Title>
      </Container>
      <Switch>
        <Route path="/" exact>
          <WordList />
          <span onClick={() => {history.push("/plus");}} className="material-symbols-outlined" style={{fontSize:"100px", color:"#8aaae5", cursor:"pointer", position:"fixed", top:"80vh", left:"80vw"}}>
            add_circle
          </span>
        </Route>
        <Route path="/plus">
          <Plus></Plus>
        </Route>
        <Route path="/edit/:id">
          <Edit></Edit>
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
      {!is_loaded && <Spinner />}
    </div>
  );
}

const Container = styled.div`
  max-width: 100vw;
  min-height: 10vh;
  background-color: #fff;
  margin: 0px auto;
  border-bottom: 2px solid #8aaae5;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  color: #8aaae5;
  text-align: center;
`;


export default App;
