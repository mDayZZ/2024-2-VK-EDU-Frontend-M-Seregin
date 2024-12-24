
import './App.css'
import {Navigate, Route, Routes} from "react-router";
import AppRouter from "./components/AppRouter.jsx";
import Header from "./components/Header/Header.jsx";

function App() {

  return (
    <div id='app'>
        <Header/>
        <AppRouter />
    </div>
  )
}

export default App
