import "./App.css";
import { Button, Alert } from "reactstrap";
import { useState, useEffect } from "react";
import provideHints from "./ProvideHints.js";
import getRandomWord from "./getWords.js";

function App() {
  const [fetchedData, setData] = useState({});
  const [success, setSuccess] = useState(false);
  const [needFeedback, setFeedback] = useState(false);

  useEffect(() => {
    async function getStuff() {
      try {
        const data = await getRandomWord();

        // Set state
        setData(data);
      } catch (err) {
        console.log(err);
      }
    }
    getStuff();
  }, []);

  console.log("fetched data: ", fetchedData);

  function evaluateAnswer(e) {
    if (fetchedData.article === e.target.id) {
      setSuccess(true);
    } else {
      setSuccess(false);
    }
    setFeedback(true);
  }

  function displayFeedback() {
    if (success === true && needFeedback === true) {
      return <Alert>Gut gemacht!</Alert>;
    }
    if (success === false && needFeedback === true) {
      return (
        <Alert color="danger">
          Leider nicht richtig. Versuch es noch einmal!&nbsp;
          {provideHints(fetchedData.word, fetchedData.article)}
        </Alert>
      );
    }
  }

  return (
    <div className="App">
      <h1 className="heading">Guess the Article!</h1>
      <div id="game-container">
        <div id="question">{fetchedData.word}</div>
      </div>
      <div id="button-bar">
        <Button
          className="article-button"
          id="der"
          color="info"
          onClick={evaluateAnswer}
        >
          der
        </Button>
        <Button
          className="article-button"
          id="die"
          color="warning"
          onClick={evaluateAnswer}
        >
          die
        </Button>
        <Button
          className="article-button"
          id="das"
          color="danger"
          onClick={evaluateAnswer}
        >
          das
        </Button>
      </div>
      <div>{displayFeedback()}</div>
      <div id="navigation">
        <Button
          onClick={() => {
            setFeedback(false);
            getRandomWord().then((obj) => setData(obj));
          }}
        >
          Next Word
        </Button>
      </div>
    </div>
  );
}

export default App;
