import "./App.css";
import Modal from "react-modal";
import { Calendar } from "./components/Calendar";
Modal.setAppElement("#root");

function App() {
  return (
    <div>
      <Calendar />
    </div>
  );
}

export default App;
