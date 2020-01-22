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

  // variáveis de estados
  const [devs , setDevs ] = useState([]);

  const [data, setData] = useState({});

  const [edit,setEdit] = useState(false);

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

  // Adiciona um novo dev no banco de dados
  async function handleAddDev (data) {
    try {

      const response = await api.post('/devs', data);

      setDevs([ ...devs , response.data ]);

    } catch(err) {
      console.log(err);
    }
  }

  function handleEditItem(data) {

    console.log('Alterar cadastro', data);
    setEdit(true);
    setData(data);

  }

  // atualiza os dados do dev no banco de dados
  async function handleUpdateDev(data) {
    try {
      const response = await api.put('/devs', data);
    }catch( err ) {
      console.log(err);
    }

    setEdit(false);
  }

  // deleta o cadastro do dev no banco de dados
  async function handleDeleteDev( data ) {
    try {

       const response = await api.delete('/dev',data);

    }catch( err ) {
      console.log(err);
    }

  }

  return (
    <div id="app">
      <aside>
        <strong>{ edit ? 'Atualizar ' : 'Cadastrar '} Desenvolvedor</strong>
        <DevForm handleAddDev = { handleAddDev } handleUpdateDev = { handleUpdateDev } edit = { edit } data = { data } />
      </aside>

      <main>
        <ul>
          { 
            devs.map( dev => <DevItem handleDeleteDev = { handleDeleteDev }  handleEditItem = { handleEditItem }  key={dev._id}  dev ={dev} />) 
          }

        </ul>
      </main>

    </div>
  );
}

export default App;
