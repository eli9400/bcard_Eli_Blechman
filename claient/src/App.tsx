import React from "react";
import "./App.css";
import Layout from "./layout/Layout";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes/Router";
import ThemeProvider from "./providers/ThemeProvider";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider>
          <Layout>
            <Router />
          </Layout>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
