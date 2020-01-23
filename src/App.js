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

    const newDevs = devs.filter(dev => dev.github_username !== data.github_username);

    setDevs(newDevs);
    setEdit(true);
    setData(data);

  }

  // atualiza os dados do dev no banco de dados
  async function handleUpdateDev(data) {
    try {

      // devolve uma lista atualizada de devs
      const response = await api.put('/devs', data);

      setEdit(false);
      setDevs(response.data);

    }catch( err ) {
      console.log(err);
    }

  }

  // deleta o cadastro do dev no banco de dados
  async function handleDeleteDev( { github_username } ) {
    try {

      // devolve uma lista atualizada de devs.
      const response = await api.delete('/devs',{
          params: {
            github_username
          }
      });

      setDevs(response.data);

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
