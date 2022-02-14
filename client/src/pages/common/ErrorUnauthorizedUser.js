import React from "react";
import StyledPage from "../../components/reusable/styled-page/StyledPage";

function ErrorUnauthorizedUser() {
  return (
    <StyledPage>
      <h1>403 - You Shall Not Pass</h1>
      <p>
        Uh oh, Gandalf is blocking the way!
        <br />
        Maybe you have a typo in the url? Or you meant to go to a different
        location? Like...Hobbiton?
      </p>
    </StyledPage>
  );
}

export default ErrorUnauthorizedUser;
