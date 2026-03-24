import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import RemoveDuplicates from './pages/RemoveDuplicates.jsx';
import ReverseString from './pages/ReverseString.jsx';
import EvenOdd from './pages/EvenOdd.jsx';
import LargestNumber from './pages/LargestNumber.jsx';
import CountVowels from './pages/CountVowels.jsx';
import CapitalizeFirst from './pages/CapitalizeFirst.jsx';
import RemoveFalsy from './pages/RemoveFalsy.jsx';
import ArraySum from './pages/ArraySum.jsx';
import MissingNumber from './pages/MissingNumber.jsx';
import TaskManager from './pages/TaskManager.jsx';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/remove-duplicates" element={<RemoveDuplicates />} />
          <Route path="/reverse-string" element={<ReverseString />} />
          <Route path="/even-odd" element={<EvenOdd />} />
          <Route path="/largest-number" element={<LargestNumber />} />
          <Route path="/count-vowels" element={<CountVowels />} />
          <Route path="/capitalize-first" element={<CapitalizeFirst />} />
          <Route path="/remove-falsy" element={<RemoveFalsy />} />
          <Route path="/array-sum" element={<ArraySum />} />
          <Route path="/missing-number" element={<MissingNumber />} />
          <Route path="/task-manager" element={<TaskManager />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
