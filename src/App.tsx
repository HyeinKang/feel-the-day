import { CoordinatesProvider } from "@/context/Coordinates";
import Main from "@/pages/Main";

function App() {
  return (
    <CoordinatesProvider>
      <Main />
    </CoordinatesProvider>
  );
}

export default App;
