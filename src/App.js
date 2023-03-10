import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
} from "react-router-dom";
import { Register } from "./pages/Register";
import { Single } from "./pages/Single";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Write } from "./pages/Write";
import {Navbars} from "./components/Navbar"
import {Footer} from "./components/Footer";
import { RecoilRoot, useRecoilState } from "recoil";
import {Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./stylesheet/App.scss"
import { useEffect } from "react";
import { Auth } from "./Atom/Atom";

var t=window.innerWidth;
const Layout=()=>{
  return(<>
  <Navbars/>
  <Outlet/>
  <Footer/>
  </>);
}

const router=createBrowserRouter([
  {
    path:"/",
    element:<Layout />,
    children:[
      {
        path:"",
        element:<Home />
      },
      {
        path:"/single",
        element:<Single />
      },
      {
        path:"/write",
        element:<Write />
      }
    ]
  },
  {
    path:"/Login",
    element:<Login/>
  },
  {
    path:"/register",
    element:<Register/>
  }
])

function App() {
  return (
    <div className="app">
      
      <div className="container">
        <RecoilRoot>
      <RouterProvider router={router}/>
      </RecoilRoot>
      </div>
    </div>
  );
}

export default App;
