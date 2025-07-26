import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeForm from './HomeForm';
import SigninForm from './SigninForm';
import SignupForm from './SignupForm';
import Post from './Post';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/lastdance" element={<HomeForm isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/lastdance/login" element={<SigninForm setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/lastdance/signup" element={<SignupForm />} />
        <Route path="/post/:id" element={<Post isLoggedIn={isLoggedIn} />} />
      </Routes>
    </BrowserRouter>
  );
}