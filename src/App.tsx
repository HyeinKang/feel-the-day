import { CoordinatesProvider } from "@/context/Coordinates/CoordinatesProvider";
import Main from "@/pages/Main";

function App() {
  return (
    <CoordinatesProvider>
      <Main />
    </CoordinatesProvider>
  );
}

export default App;
