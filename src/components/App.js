import React from "react";
import Signup from "./Signup";
import { Container } from 'react-bootstrap'
import { Routes, Route, Navigate} from 'react-router-dom'
import { useAuth } from "../context/AuthContext";
import Loading from "./LoadingPage/Loading";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import Dashboard from "./Dashboard";
import UpdateProfile from "./UpdateProfile";
import ErrorPage from "./ErrorPage";


function App() {

  const { currentUser, authLoading } = useAuth();
  return (
    <Container className="d-flex align-items-center justify-content-center"
    style={{ minHeight: "100vh" }}
    >
      <div className="w-100 " style={{ maxWidth: "400px" }}>
       {
        authLoading?(
          <Loading/>
        ):(
          // if there no current user, we display non-protected routes
          <>
            {
              !currentUser?(
                <Routes>
                  <Route exact path="/" element={<Login/>}/>
                  <Route path="/signup" element={<Signup/>}/>
                  <Route path="/login" element={<Login/>}/>
                  <Route path="/forgot-password" element={<ForgotPassword/>}/>
                  <Route path="*" element={<ErrorPage/>}/>
                  
                </Routes>
    
              ):(
                <Routes>
                  <Route exact path="/" element={<Dashboard/>}/>
                  <Route path="/signup" element={<Navigate to="/"/>}/>
                  <Route path="/login" element={<Navigate to="/"/>}/>
                  <Route path="/update-profile" element={<UpdateProfile/>}/>  
                  <Route path="*" element={<ErrorPage/>}/>  
                </Routes>
              )

            }
          </>
          
        )
        
       }
      </div>
      
    </Container>
    
  );
}

export default App;
