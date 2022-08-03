import './App.css';
import { getDataBase } from './application/api';
import { useState, useEffect, useRef } from 'react';
import SearchSelect from './components/SearchSelect';


function App() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    // console.log('se ejaecuta este useEffect')
    if (companies.length === 0) {
      getData();
    }
  }, [companies])

  const getData = async () => { // Hay que ver este bug cuando la bd esta vacia
    const resul = await getDataBase();
    // console.log(resul.docs)
    if (resul.docs.length > 0) {
      setCompanies(resul.docs);
    }
  }

  // https://console.firebase.google.com/u/1/project/fir-challenge-a3e50/firestore/data/~2Fcompanies~2FPADhrixbkG8OnoUTD9F2
  // https://firebase.google.com/docs/firestore/query-data/get-data?hl=es-419


  return (
    <div className="App" >
      <div className="App-header" >
        <h4>Proyecto React-Firebase</h4>
        <div>
          <button onClick={getData}>Recargar</button>
          <p></p>
        </div>
        <SearchSelect companies={companies} getData={getData} />      
      </div>
    </div>
  );
}

export default App;
