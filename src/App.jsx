import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GlobalStyles } from './styles/GlobalStyles';
import Home from './pages/Home';
import AddBook from './pages/AddBook';
import EditBook from './pages/EditBook';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <Router>
      <GlobalStyles />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddBook />} />
        <Route path="/edit/:id" element={<EditBook />} />
      </Routes>
    </Router>
  );
}
