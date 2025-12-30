import React from "react";
import './App.css';
import { useThemeContext } from "./context";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header, Footer } from "./components";
import { HomePage, ProductsPage, LoginPage } from "./pages";

function App() {
  const { theme } = useThemeContext();

  return (
    <BrowserRouter>
      <header data-theme={theme}>
        <Header />
      </header>
      <main>
        <Routes>
          <Route index={true} element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/products" element={<ProductsPage />} />
        </Routes>
      </main>
      <footer data-theme={theme}>
        <Footer />
      </footer>
    </BrowserRouter>
  );
}

export default App;
