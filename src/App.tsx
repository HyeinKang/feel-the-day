import { CoordinatesProvider } from "@/context/Coordinates";
import { UnitProvider } from "@/context/Unit";
import Main from "@/pages/Main";

function App() {
  return (
    <UnitProvider>
      <CoordinatesProvider>
        <Main />
      </CoordinatesProvider>
    </UnitProvider>
  );
}

export default App;
