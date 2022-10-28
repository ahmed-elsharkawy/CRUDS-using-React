import './App.css';
import Controls from './components/Controls';
import MyFooter from './components/MyFooter';
import MyNav from './components/MyNav';
import MyTable from './components/MyTable';
import UsersContextProvider from './context/UsersContextProvider';

function App() {
  return (
    <div className="App">
      <MyNav></MyNav>
      <UsersContextProvider>
      <Controls></Controls>
      <MyTable></MyTable>
      </UsersContextProvider>
      <MyFooter></MyFooter>
    </div>
  );
}

export default App;
