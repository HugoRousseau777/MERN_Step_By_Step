import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

const Login = () => {
  const [email, setEmail]=useState("");
  const [password, setPassword]=useState("");
  const navigate = useNavigate();

  useEffect(()=> { // Si le local storage est déjà occupé, l'utilisateur est renvoyé sur l'onglet products
    const auth = localStorage.getItem('user');
    if(auth){
        navigate('/');
    }
}, [])

  const handleLogin = async () => {
  // Test des champs : console.warn(email,password);
  let result = await fetch("http://localhost:5000/login", {
        method:'post',
        body: JSON.stringify({email,password}),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    result = await result.json();
    // Vérifie que l'API est connectée console.warn(result);
    // Changes jwt token !!
    if(result.auth){
      localStorage.setItem('user', JSON.stringify(result.user));
      localStorage.setItem('token', JSON.stringify(result.auth));
      navigate("/");
    } else {
      alert("Please enter connect details");
    }
  };
  return (
    <div className="login">
      <h1>Login</h1>
      <input
        type="text"
        className="inputBox"
        placeholder="Enter Email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
      />
      <input
        type="text"
        className="inputBox"
        placeholder="Enter Password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
      />
      <button onClick={handleLogin} type="button" className="appButton">Login</button>
    </div>
  );
};

export default Login;