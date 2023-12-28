import { Outlet } from 'react-router-dom';
import './App.css';
import AddBike from './components/main/AddBike';
import AdminLogin from './components/main/AdminLogin';
import Footer from './components/main/Footer';
import Navbar from './components/main/Navbar';

function App() {
  return (
    <>
      <Navbar />
      {/* <AdminLogin />
      <AddBike /> */}
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
