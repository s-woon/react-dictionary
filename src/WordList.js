import "./App.css";
import React from "react";
import styled from "styled-components";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";
import { useHistory } from "react-router-dom";

import {
  deleteWordFB,
  checkFB,
  checkedFB,
  loadWordFB,
} from "./redux/modules/word";

const WordList = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const my_lists = useSelector((state) => state.word.list);
  const is_loaded = useSelector((state) => state.word.is_loaded);
  
  const removeWord = (list) => {
    dispatch(deleteWordFB(list.id));
    window.location.replace("/");
  };

  const checked = (list) => {
    if (list.completed == false) {
      dispatch(checkFB(list.id));
    } else {
      dispatch(checkedFB(list.id));
    }
  };

  React.useEffect(() => {
 
  }, [is_loaded]);

  return (
    <>
      {my_lists.map((list, index) => {
        return (
          <ListStyle key={index} completed={list.completed}>
            <Card
              style={{ margin: "10px", border: "1px solid #8AAAE5" }}
              sx={{ minWidth: 275 }}
            >
              <CardContent>
                <Typography variant="h5" component="div">
                  {list.word}
                  <span
                    onClick={() => {
                      checked(list);
                    }}
                    className="material-symbols-outlined"
                    style={{
                      float: "right",
                      width: "100px",
                      textAlign: "center",
                      border: "1px solid #8AAAE5",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    done
                  </span>
                </Typography>
                <Typography sx={{ mb: 1.5 }}>
                  <br />
                  {list.mean}
                </Typography>
                <Typography variant="body2" style={{ color: "#8AAAE5" }}>
                  <br />
                  {list.example}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  onClick={() => {
                    history.push("/edit/" + list.id);
                  }}
                  variant="outlined"
                  size="small"
                  color="primary"
                >
                  수정하기
                  <span className="material-symbols-outlined">edit_note</span>
                </Button>
                <Button
                  onClick={() => removeWord(list)}
                  variant="outlined"
                  size="small"
                  color="secondary"
                  endIcon={<DeleteIcon />}
                >
                  삭제하기
                </Button>
              </CardActions>
            </Card>
          </ListStyle>
        );
      })}
    </>
  );
};

const ListStyle = styled.div`
  margin: 0px auto;
  width: 50vw;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => (props.completed ? "#8aaae5" : "white")};
`;

const CheckBox = styled.div``;

export default WordList;
