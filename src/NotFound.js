import React from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";

const NotFound = (props) => {
  const history = useHistory();

  return (
    <>
      <h1>주소가 올바르지 않습니다!</h1>
      <Button
        onClick={() => {
          history.goBack();
        }}
        variant="outlined"
      >
        뒤로가기
      </Button>
    </>
  );
};

export default NotFound;
