import './App.css';
import { Provider } from 'react-redux';
import { store } from './store/store';
import InventoryDashboard from './components/InventoryDashboard';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Provider store={store}>
      <InventoryDashboard />
    </Provider>
  );
}

export default App;
