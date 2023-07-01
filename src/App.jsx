import Header from "./sections/Header";
import Footer from "./sections/Footer";

function App() {
  return (
		<>
			<Header />
			<main class="page">
			<section className="page__main main">
				<div className="main__container">
					<div className="main__border">
						<div className="main__body">
							<h2 className="main__title">
								Tenzies
							</h2>
							<p className="main__text">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
							<div className="main__game game">
								<button className="game__item">1</button>
								<button className="game__item">1</button>
								<button className="game__item">1</button>
								<button className="game__item">1</button>
								<button className="game__item">1</button>
								<button className="game__item">1</button>
								<button className="game__item">1</button>
								<button className="game__item">1</button>
								<button className="game__item">1</button>
								<button className="game__item game__item_active">1</button>
							</div>
							<button className="main__button">Roll</button>
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