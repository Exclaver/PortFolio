import "./App.scss";

import "bootstrap/dist/css/bootstrap.min.css";
import { Banner } from "./Components/Banner";
import { Skills } from "./Components/Skills";
import { Projects } from "./Components/Projects";
import { Contact } from "./Components/Contact";
import { Footer } from "./Components/Footer";
import { NavBar } from "./Components/Navbar";
import Background from "./Components/Background";
// import TentacleAnimation from "./Components/Electromonsterjs";
function App() {
  return (
    <div className="App">
      <NavBar />
      <Banner />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
      <Background />
    </div>
  );
}

export default App;
