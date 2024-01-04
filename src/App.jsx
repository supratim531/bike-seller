import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';
import AddBike from './components/main/AddBike';
import AdminLogin from './components/main/AdminLogin';
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
      <Navbar />
      {/* <AdminLogin />
      <AddBike /> */}
      <Outlet />
      <Footer />
    </RootContext.Provider>
  );
}

export default App;
