import './App.css';
import { getDataBase } from './application/api';
import { useState, useEffect, useRef } from 'react';
import SearchSelect from './components/SearchSelect';


function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (users.length === 0) {
      getData();
    }
  }, [users])

  const getData = async () => {
    const resul = await getDataBase();
    setUsers(resul.docs);
  }

  //--------------------------------------------------------------
  const myRef = useRef(null)
  const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);
  const executeScroll = () => scrollToRef(myRef)


  // https://firebase.google.com/docs/firestore/query-data/get-data?hl=es-419
  // https://console.firebase.google.com/u/1/project/my-first-project-9cde2/firestore/data/~2Fusers~2Fs570dXEBHQxJCeb63xgF

  return (
    <div className="App" ref={myRef}>
      <div className="App-header">
        <h1>Nano producciones!</h1>
        <div>
          <button onClick={getData}>Recargar</button>
          <p></p>
        </div>
        <SearchSelect users={users} getData={getData} />
        <div>
          <button onClick={executeScroll}> Volver al inicio </button>
        </div>
      </div>
    </div>
  );
}

export default App;
