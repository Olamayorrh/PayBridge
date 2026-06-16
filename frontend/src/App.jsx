import { Route, Routes } from 'react-router-dom';
import './index.css';
import Landing from './pages/landing';


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
    </>
  );
}

export default App;
