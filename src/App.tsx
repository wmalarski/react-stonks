import { Router } from "@/navigation/Router";
import { ThemeProvider } from "@/styles/ThemeProvider";
import i18next from "@/utils/i18next";
import { NhostReactProvider } from "@nhost/react";
import { I18nextProvider } from "react-i18next";
import { Home } from "./pages/Home/Home";
import { nhost } from "./services/nhost";

function App() {
  return (
    <NhostReactProvider nhost={nhost}>
      <I18nextProvider i18n={i18next}>
        <ThemeProvider>
          <Router>
            <Home />
          </Router>
        </ThemeProvider>
      </I18nextProvider>
    </NhostReactProvider>
  );
}

export default App;
