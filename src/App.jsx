import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './components/Login/AuthContext'
import Nav from './components/Nav/Nav'
import Home from './components/Home/Home'
import Widgets from './components/Widgets/Widgets'
import Portfolio from './components/Portfolio/Portfolio'
import About from './components/About/About'
import CountryDetail from './components/About/CountryDetail'
import PlayerDetail from './components/About/PlayerDetail'
import Blog from './components/Blog/Blog'
import BlogPost from './components/Blog/BlogPost'
import Contact from './components/Contact/Contact'
import Login from './components/Login/Login'

const App = () => {
  return (
    <AuthProvider>
      <Nav />
      <main className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/widgets" element={<Widgets />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/about" element={<About />} />
          <Route path="/about/country/:name" element={<CountryDetail />} />
          <Route path="/about/country/:name/player/:playerId" element={<PlayerDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </AuthProvider>
  )
}

export default App
