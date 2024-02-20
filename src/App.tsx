import "./App.css";
import Card from "./components/Card/Card";

function App() {
    const cardProps = {
        name: "Sydney",
        phone: "11-111-1111",
        email: "steven@gmail.com",
        image: {
            url: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2F0fGVufDB8fDB8fHww",
            alt: "Boss Cat",
        },
        favoured: false,
    };
    return (
        <div className="container">
            <Card {...cardProps} />
        </div>
    );
}

export default App;
