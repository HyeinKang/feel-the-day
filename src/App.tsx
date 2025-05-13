import { CoordinatesProvider } from "@/context/Coordinates";
import { UnitProvider } from "@/context/Unit";
import { ThemeProvider } from "@/context/Theme";
import Main from "@/pages/Main";

function App() {
  return (
    <UnitProvider>
      <CoordinatesProvider>
        <ThemeProvider>
          <Main />
        </ThemeProvider>
      </CoordinatesProvider>
    </UnitProvider>
  );
}

export default App;
