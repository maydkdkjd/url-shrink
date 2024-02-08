import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login, Signup, Dashboard } from './pages'
import Layout from './components/Layout';
import ProtectedComponent from './components/ProtectedComponent';
import { UserProvider } from './contexts/user';

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Layout>
          <Routes>
            <Route path='/' element={<ProtectedComponent><Dashboard /></ProtectedComponent>} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
          </Routes>
        </Layout>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
