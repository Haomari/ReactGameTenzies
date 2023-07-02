import React, { useState } from "react";

import Header from "./sections/Header";
import Footer from "./sections/Footer";
import Confetti from "react-confetti"

function App() {
  const [numbers, setNumbers] = useState([
    { data: randomNumber(), isSelect: false, id: 1 },
    { data: randomNumber(), isSelect: false, id: 2 },
    { data: randomNumber(), isSelect: false, id: 3 },
    { data: randomNumber(), isSelect: false, id: 4 },
    { data: randomNumber(), isSelect: false, id: 5 },
    { data: randomNumber(), isSelect: false, id: 6 },
    { data: randomNumber(), isSelect: false, id: 7 },
    { data: randomNumber(), isSelect: false, id: 8 },
    { data: randomNumber(), isSelect: false, id: 9 },
    { data: randomNumber(), isSelect: false, id: 10 },
  ]);

  function randomNumber() {
    return Math.floor(Math.random() * 10) + 1;
  }

  function togleSelect(id) {
    setNumbers((prevNumbers) =>
      prevNumbers.map((number) => {
        return number.id === id
          ? { ...number, isSelect: !number.isSelect }
          : number;
      })
    );
  }

  function rollNumbers() {
    if (winNumbers()) {
      setNumbers((prevNumbers) =>
        prevNumbers.map((number) => {
          return {
            ...number,
            data: randomNumber(),
            isSelect: !number.isSelect,
          };
        })
      );
    }
    setNumbers((prevNumbers) =>
      prevNumbers.map((number) => {
        return number.isSelect ? number : { ...number, data: randomNumber() };
      })
    );
  }

  function winNumbers() {
    const firstData = numbers[0].data;
    const allDataSame = numbers.every((item) => item.data === firstData);

    const allSelectTrue = numbers.every((item) => item.isSelect === true);

    return allDataSame && allSelectTrue;
  }

  const numbersToGame = numbers.map((number) => {
    return (
      <button
        key={number.id}
        className={
          number.isSelect ? "game__item game__item_active" : "game__item"
        }
        onClick={() => togleSelect(number.id)}
      >
        {number.data}
      </button>
    );
  });
  console.log(numbersToGame);
  return (
    <>
      <Header />
      <main className="page">
        {winNumbers() &&<Confetti />}
        <section className="page__main main">
          <div className="main__container">
            <div className="main__border">
              <div className="main__body">
                <h2 className="main__title">Tenzies</h2>
                <p className="main__text">
                  Roll until all dice are the same. Click each die to freeze it
                  at its current value between rolls.
                </p>
                <div className="main__game game">{numbersToGame}</div>
                <button onClick={rollNumbers} className="main__button">
                  {winNumbers() ? "Roll again" : "Roll"}
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
