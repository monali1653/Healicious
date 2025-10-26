import { useState } from 'react'
import Home from './components/Home'
import Login from './components/Login'
import SignUp from './components/SignUp'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import './App.css'
import MealsPage from './components/MealsPage'
import RecipeForm from './components/RecipeForm'
import RecipeDetails from './components/RecipeDetails'
import RecipeCards from './components/RecipeCards'
import Navbar from './components/Navbar'
import Footer from './components/Footer'


function App() {
 

  return (
    <>
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/recipe' element={<RecipeForm/>} />
         <Route path="/disease/:category" element={<RecipeCards />} />
         <Route path="/disease/:category/:dishName" element={<RecipeDetails />} />
      </Routes>
      <Footer/>
    </Router>
      
    </>
  )
}

export default App
