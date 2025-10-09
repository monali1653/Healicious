import { useState } from 'react'
import Home from './components/Home'
import SignUp from './components/SignUp'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import './App.css'
import MealsPage from './components/MealsPage'
import RecipeForm from './components/RecipeForm'
import RecipeDetails from './components/RecipeDetails'
import RecipeCards from './components/RecipeCards'


function App() {
 

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/meals' element={<MealsPage/>} />
        <Route path='/recipe' element={<RecipeForm/>} />
        <Route path='/details' element={<RecipeDetails/>} />
        <Route path='/cards' element={<RecipeCards/>} />
      </Routes>
    </Router>
      
    </>
  )
}

export default App
