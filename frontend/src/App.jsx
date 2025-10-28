import { useState } from 'react'
import RefreshHandler from './components/RefreshHAndler'
import Home from './components/Home'
import Login from './components/Login'
import SignUp from './components/SignUp'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import './App.css'
import MealsPage from './components/MealsPage'
import RecipeForm from './components/RecipeForm'
import RecipeDetails from './components/RecipeDetails'
import RecipeCards from './components/RecipeCards'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AdminDashboard from './components/AdminDashboard'


function App() {
 const [isAuthenticated, setIsAuthenticated] = useState(null);
  const PrivateRoute = ({ element, allowedRoles }) => {  // it can only work for authenticated user only
    if (isAuthenticated == null) return null;
    if (allowedRoles && !allowedRoles.includes(isAuthenticated.role)) return <Navigate to="/" replace />;
    return element;
  };
  return (
    <>
    <Router>
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>
      <Routes>
<<<<<<< Updated upstream
        <Route path='/' element={<Home/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/meals' element={<MealsPage/>} />
        <Route path='/recipe' element={<RecipeForm/>} />
        <Route path='/details' element={<RecipeDetails/>} />
        <Route path='/cards' element={<RecipeCards/>} />
=======
        <Route path="/" element={<Home isAuthenticated={isAuthenticated} />} />
         <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <Login setIsAuthenticated={setIsAuthenticated} />
            ) : (
              <Navigate to="/" replace /> // replace means that i have now navigated to "/" and if i now try to go back button in my webpage it will restrict me to go back i.e i can't navigate to "/login" again
            )
          }
        />
        <Route
          path="/signup"
          element={
            !isAuthenticated ? (
              <SignUp setIsAuthenticated={setIsAuthenticated} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route path='/recipe' element={<PrivateRoute element={<RecipeForm/>}/>} />
        <Route path="/disease/:category" element={<PrivateRoute element={<RecipeCards />}/>} />
        <Route path="/disease/:category/:dishName" element={<PrivateRoute element={<RecipeDetails />}/>} />
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute
              element={<AdminDashboard />}
              allowedRoles={["admin"]}
            />
          }
        />
>>>>>>> Stashed changes
      </Routes>
      <Footer/>
    </Router>
      
    </>
  )
}

export default App
