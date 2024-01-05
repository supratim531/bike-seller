import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';
import Footer from './components/main/Footer';
import Navbar from './components/main/Navbar';
import RootContext from './context/RootContext';

function App() {
  const [isLogin, setIsLogin] = useState(false);

  const contextData = {
    isLogin, setIsLogin
  }

  const authSetup = () => {
    const token = localStorage.getItem("token");

    if (token !== null) {
      setIsLogin(true);
    }
  }

  useEffect(() => {
    authSetup();
  }, []);

  return (
    <RootContext.Provider value={contextData}>
      <div><Toaster /></div>
      <Navbar />
      <Outlet />
      <Footer />
    </RootContext.Provider>
  );
}

export default App;
