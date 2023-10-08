import React from 'react'
import Login from './Pages/Login'
import Signup from './Pages/Singup'
import Home from './Pages/Home'
import QuestionPaper from './Pages/QuestionPaper'
import Result from './Pages/Result'
import { Route, Routes } from 'react-router-dom'
import Mbti from './Pages/Mbti'
import Disc from './Pages/Disc'
const App = () => {
  return (
<>
<Routes>
  <Route path='/' element={<Login/>}></Route>
  <Route path='/Signup' element={<Signup/>}></Route>
  <Route path='/Home' element={<Home/>}></Route>
  <Route path='/Test' element={<QuestionPaper/>}></Route>
  <Route path='/Result' element={<Result/>}></Route>
  <Route path='/Mbti' element={<Mbti/>}></Route>
  <Route path='/Disc' element={<Disc/>}></Route>
</Routes>

</>
  )
}

export default App