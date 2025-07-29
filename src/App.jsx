import { BrowserRouter, Routes, Route } from "react-router-dom";
import Weather from "./components/weather";

function App() {


  return (
  
     <div>
    
    <BrowserRouter>
   <Routes>
      
      <Route path='/'  element={<Weather/>}> </Route>  
    

    </Routes>
    </BrowserRouter>
   </div>
  )
}

export default App
