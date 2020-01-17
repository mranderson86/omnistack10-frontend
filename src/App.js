import React, { useEffect, useState } from 'react';

import api from './services/api';

import DevItem from './components/DevItem';
import DevForm from './components/DevForm';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

//import avatar from './logo192.png';

function App() {

  // variável de estado
  const [devs , setDevs ] = useState([]);

  useEffect(() => {
    // consulta todos os devs cadastrados
    async function loadDevs () {
        try{

          const response = await api.get('/devs');
          setDevs(response.data);

        }catch(err){
          console.log(err);
        }
    }

    loadDevs();

  },[]);

  async function handleAddDev (data) {

    try {

      const response = await api.post('/devs', data);

      setDevs([ ...devs , response.data ]);

    } catch(err) {
      console.log(err);
    }
}

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm handleAddDev={handleAddDev} />
      </aside>

      <main>
        <ul>

          { devs.map( dev => <DevItem key={dev._id}  dev ={dev} />) }

        </ul>
      </main>

    </div>
  );
}

export default App;
