import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from './main';
import Search from './searchpage'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
					<Route path="/" element={<MainPage />} />
					<Route path="/search" element={<Search />} />
				</Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
