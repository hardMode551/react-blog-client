import React from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import Footer from './components/Footer';
import Header from './components/Header';
import CreateBlog from './pages/CreateBlog';
import FullPost from './pages/FullPost';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Registration from './pages/Registration';
import { fetchAuthMe } from './redux/slices/Auth/asyncAction';

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Registration" element={<Registration />} />
        <Route path="/CreateBlog" element={<CreateBlog />} />
        <Route path="/FullPost/edit/:id" element={<CreateBlog />} />
        <Route path="/FullPost/:id" element={<FullPost />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
