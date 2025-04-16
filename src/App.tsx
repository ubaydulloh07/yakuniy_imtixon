import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import LibraryList from './pages/LibraryList';
import LibraryDetail from './pages/LibraryDetail';
import AddBook from './pages/AddBooks';
import LibraryProfile from './pages/LibraryProfile';
import BooksPage from './pages/Books';
import BookDetail from './pages/BooksDetail';
import './styles/global.css';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <div className="app">
        <Header isLoggedIn={isLoggedIn} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/librarian/register" element={<Register />} />
            <Route path="/libraries" element={<LibraryList />} />
            <Route path="/library/:id" element={<LibraryDetail />} />
            <Route path="/books" element={<BooksPage />} />
            <Route path="/books/:id" element={<BookDetail />} />
            <Route path="/librarian/add-book" element={<AddBook />} />
            {isLoggedIn && (
              <Route path="/profile" element={<LibraryProfile />} />
            )}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
