import { CoordinatesProvider } from "@/contexts/Coordinates";
import { UnitProvider } from "@/contexts/Unit";
import { ThemeProvider } from "@/contexts/Theme";
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
