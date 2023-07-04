import React, { useState, useEffect } from "react";
import Header from "./sections/Header";
import Footer from "./sections/Footer";
import Confetti from "react-confetti";

function App() {
  // State for storing the numbers
  const [numbers, setNumbers] = useState([
    { data: "", isSelect: false, id: 1 },
    { data: "", isSelect: false, id: 2 },
    { data: "", isSelect: false, id: 3 },
    { data: "", isSelect: false, id: 4 },
    { data: "", isSelect: false, id: 5 },
    { data: "", isSelect: false, id: 6 },
    { data: "", isSelect: false, id: 7 },
    { data: "", isSelect: false, id: 8 },
    { data: "", isSelect: false, id: 9 },
    { data: "", isSelect: false, id: 10 },
  ]);

  // State for game timer
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  // State for game results
  const [gameResults, setGameResults] = useState([]);

  // Function to start the game timer
  function startTimer() {
    setStartTime(Date.now());
    setTimerRunning(true);
  }

  // Function to stop the game timer and save the result
  const stopTimer = () => {
    if (timerRunning) {
      const currentTime = Date.now();
      const elapsedTimeInMilliseconds = currentTime - startTime;
      setElapsedTime(elapsedTimeInMilliseconds);
      setTimerRunning(false);

      const updatedResults = [...gameResults, elapsedTimeInMilliseconds];
      // Sort the game results from smallest to highest
      updatedResults.sort((a, b) => a - b);

      setGameResults(updatedResults);
      localStorage.setItem("gameResults", JSON.stringify(updatedResults));
    }
  };

  // Update the timer every millisecond when the timer is running
  useEffect(() => {
    if (timerRunning) {
      const timerInterval = setInterval(() => {
        const currentTime = Date.now();
        const elapsedTimeInMilliseconds = currentTime - startTime;
        setElapsedTime(elapsedTimeInMilliseconds);
      }, 1);

      return () => {
        clearInterval(timerInterval);
      };
    }
  }, [timerRunning, startTime]);

  // Load game results from local storage
  useEffect(() => {
    const storedResults = localStorage.getItem("gameResults");
    if (storedResults) {
      setGameResults(JSON.parse(storedResults));
    }
  }, []);

  // Function to generate a random number
  function randomNumber() {
    return Math.floor(Math.random() * 9) + 1;
  }

  // Function to toggle the selection of a number
  function toggleSelect(id) {
    setNumbers((prevNumbers) =>
      prevNumbers.map((number) =>
        number.id === id && !allDataEmpty && !hasWon
          ? { ...number, isSelect: !number.isSelect }
          : number
      )
    );
  }

  // Function to roll the numbers
  function rollNumbers() {
    if (allDataEmpty) {
      startTimer();
      setNumbers((prevNumbers) =>
        prevNumbers.map((number) =>
          number.isSelect ? number : { ...number, data: randomNumber() }
        )
      );
    } else if (hasWon) {
			stopTimer();
      setNumbers((prevNumbers) =>
        prevNumbers.map((number) => ({
          ...number,
          data: "",
          isSelect: !number.isSelect,
        }))
      );
    } else {
      setNumbers((prevNumbers) =>
        prevNumbers.map((number) =>
          number.isSelect ? number : { ...number, data: randomNumber() }
        )
      );
    }
  }

  // Check if all data in numbers array is empty
  const allDataEmpty = numbers.every((item) => !item.data);

  // Check if the player has won the game
  function winNumbers() {
    const firstData = numbers[0].data;
    const allDataSame = numbers.every((item) => item.data === firstData);
    const allSelectTrue = numbers.every((item) => item.isSelect === true);

    return allDataSame && allSelectTrue;
  }
	// Saves result in const
	const hasWon = winNumbers();

	if (hasWon) {
		stopTimer()
	}

  // Format the elapsed time into a string representation
  const formatElapsedTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}.${milliseconds.toString().padStart(2, "0")}`;
  };

  // Function to clear game results and local storage
  function clearResults() {
    setGameResults([]);
    localStorage.removeItem("gameResults");
  }

	  // Map numbers to game buttons
		const numbersToGame = numbers.map((number) => (
			<button
				key={number.id}
				className={
					number.isSelect ? "game__item game__item_active" : "game__item"
				}
				onClick={() => toggleSelect(number.id)}
			>
				{number.data}
			</button>
		));

  // Render the game results list
  const gameResultsList = gameResults.map((result, index) => (
    <li key={index}>
      Place {index + 1}: {formatElapsedTime(result)}
    </li>
  ));

  return (
    <>
      <Header />
      <main className="page">
        {hasWon && <Confetti />}
        <section className="page__main main">
          <div className="main__container">
            <div className="main__border">
              <div className="main__body">
                <h2 className="main__title">Tenzies</h2>
                <p className="main__text">
                  Roll until all dice are the same. Click each die to freeze it
                  at its current value between rolls.
                </p>
                <div className="main__timer">
                  {formatElapsedTime(elapsedTime)}
                </div>
                <div className="main__game game">{numbersToGame}</div>
                <button onClick={rollNumbers} className="main__button">
                  {hasWon ? "Finish" : allDataEmpty ? "Start" : "Roll"}
                </button>
                <ul className="main__result">{gameResultsList}</ul>
                <button onClick={clearResults} className="main__reset">
                  Reset
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default App;
