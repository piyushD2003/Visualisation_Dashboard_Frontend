import './App.css'
import { BrowserRouter as Router, Routes, Route,useLocation } from "react-router-dom";
import Navbar from './component/Navbar';
import Footer from './component/Footer';
import Dashboard from './component/Dashboard';
import Navtab from './component/Navtab';
import Intensity from './component/Intensity';
import TopicDistribution from './component/TopicDistribution';
import TrendsOverYears from './component/TrendsOverYears';
import Heatmap from './component/Heatmap';
import BubbleChartPage from './component/BubbleChart';
import Authentication from './component/Authentication';

function App() {
    // const [showLayout, setShowLayout] = useState(true); // Initialize to true
  
  return (
    <>
    <Router>
            <Navbar />
            <Routes>
              <Route exact path='/' element={<Dashboard />} />
              <Route exact path='intensity/' element={<Intensity />} />
              <Route exact path='topicdistribution/' element={<TopicDistribution />} />
              <Route exact path='trendsoveryears/' element={<TrendsOverYears />} />
              <Route exact path='heatmap/' element={<Heatmap />} />
              <Route exact path='bubblechart/' element={<BubbleChartPage />} />
              <Route exact path='auth/' element={<Authentication />} />
            </Routes>
            <Footer />
          </Router>
    </>
  )
}

export default App
