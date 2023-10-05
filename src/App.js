import './App.css';
import NewOrderPage from './pages/NewOrderPage';
import AuthPage from './pages/AuthPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import NavBar from './components/NavBar';
import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { getUser } from './utilities/users-service';

function App() {

  const [user, setUser] = useState(getUser());

  return (
    <main className="App">
      
      {user ?
        <>
          <Routes>
            <Route path='/orders/new' element={<NewOrderPage user={user} />} />
            <Route path='/orders/' element={<OrderHistoryPage user={user} />} />
            <Route path="/*" element={<Navigate to="/orders/new" />} />
          </Routes>
        </>
        : <AuthPage setUser={setUser} />}

    </main>
  );
}

export default App;
