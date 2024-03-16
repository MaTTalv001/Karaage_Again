import { RoutesComponent } from "components/RoutesComponent";
import "./App.css";
import Header from "components/Header";

function App() {
  return (
    <div className="flex flex-col w-screen h-screen ">
      <header className="fixed top-0 h-14 w-full z-10">
        <Header />
      </header>
      <main className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-200">
        <RoutesComponent />
      </main>
      <footer className="w-full"></footer>
    </div>
  );
}

export default App;
