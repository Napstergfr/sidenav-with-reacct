import './App.css';
import Sidebar from "./components/common/sidebar/sidebar";
import { initializeIcons } from '@fluentui/font-icons-mdl2';

initializeIcons();

function App() {
  return (
    <div className="container">
      <Sidebar/>
    </div>
  );
}

export default App;
