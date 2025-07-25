import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EntryScreen from './components/EntryScreen';
import Home from './pages/Home.jsx';
import MutantIndex from './pages/MutantIndex';
import CharacterPage from './components/CharacterPage.jsx'
import NewMutantForm from './components/NewMutantForm';
import ErrorPage from './pages/ErrorPage';
import AppNavbar from './components/Navbar';
import { useLocation } from 'react-router-dom';

function App() {
  
  const location = useLocation();
  const showNavbar = location.pathname !== '/';

    return (
      <>
      {showNavbar && <AppNavbar />}
        <Routes>
          <Route path="/" element={<EntryScreen />} />
          <Route path="/home" element={<Home />} />
          <Route path="/mutants" element={<MutantIndex />} />
          <Route path="/mutants/:id" element={<CharacterPage />} /> 
          <Route path="/submit-mutant" element={<NewMutantForm />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </>
    );
}


export default App
