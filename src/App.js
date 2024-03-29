import NewsFeed from "./components/NewsFeed";
import CurrencyConverter from "./components/CurrencyConverter";

const App = () => {
  return (
    <div className="app">
      <div className="body flex">
        <CurrencyConverter />
        <NewsFeed />

      </div>
    </div>
  );
}

export default App;
