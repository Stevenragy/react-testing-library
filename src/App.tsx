import "./App.css";
import Cards from "./components/Cards/Cards";
import cats from "./mocks/cats.json";

function App() {
    return (
        <div className="container">
            <Cards cats={cats} />
        </div>
    );
}

export default App;
