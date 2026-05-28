import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav/Nav'
import Home from './components/Home/Home'
import Widgets from './components/Widgets/Widgets'
import Portfolio from './components/Portfolio/Portfolio'
import About from './components/About/About'
import Blog from './components/Blog/Blog'
import BlogPost from './components/Blog/BlogPost'
import Contact from './components/Contact/Contact'

const App = () => {
  return (
    <>
      <Nav />
      <main className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/widgets" element={<Widgets />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </>
  )
}

export default App
