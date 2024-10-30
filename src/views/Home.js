import React from "react";
import { Container } from "reactstrap";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";
export const Home = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  let history = useHistory();

  const redirectToBot = () => {
    history.push("/bot");
  };

  return (
    <Container className="text-center hero my-5">
      <h1 className="mb-4">Tic Tac Toe Game</h1>
      {!isAuthenticated && (
        <img
          src="https://plus.unsplash.com/premium_photo-1689245691969-995fea0c4061?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="LogoGameTictactoe"
          style={{ maxWidth: "450px" }}
          className="mb-3 mb-md-0"
        />
      )}

      {!isAuthenticated && (
        <button
          color="primary"
          className="btn-margin loginbtn"
          onClick={() => loginWithRedirect()}
        >
          Log In
        </button>
      )}

      {isAuthenticated && (
        <img
          src="https://plus.unsplash.com/premium_photo-1689245691969-995fea0c4061?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="LogoGameTictactoe"
          style={{ maxWidth: "450px" }}
          className="mb-3 mb-md-0"
        />
      )}

      {isAuthenticated && (
        <button
          color="primary"
          className="btn-margin loginbtn"
          onClick={() => redirectToBot()}
        >
          Let start with Bot
        </button>
      )}
      {/* {isAuthenticated && (
        <button
          color="primary"
          className="btn-margin loginbtn"
          onClick={() => redirectToAI()}
        >
          Start with AI
        </button>
      )} */}
    </Container>
  );
};

export default Home;
