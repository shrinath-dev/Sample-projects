import React from "react";
import { useThemeContext } from "./context";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Header } from "./components";
import { HomePage, ProductsPage } from "./pages";

function App() {
  const { theme } = useThemeContext();


  return (
    <BrowserRouter>
      <header data-theme={theme}>
        <Header />
      </header>
      <Routes>
        <Route index={true} element={<HomePage />} />
        <Route path='/products' element={<ProductsPage />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App;