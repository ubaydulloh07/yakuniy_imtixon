import React from 'react';
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
import './styles/global.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/librarian/register" element={<Register />} />
            <Route path="/libraries" element={<LibraryList />} />
            <Route path="/library/:id" element={<LibraryDetail />} />
            <Route path="/librarian/add-book" element={<AddBook />} />
          </Routes>
        </main>
        <Footer /> 
      </div>
    </Router>
  );
};

export default App;
