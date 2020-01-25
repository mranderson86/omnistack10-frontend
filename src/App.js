import React, { useEffect, useState } from 'react';

import api from './services/api';

import DevItem from './components/DevItem';
import DevForm from './components/DevForm';
import DevFormEdit from './components/DevFormEdit';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

function App() {

  // variáveis de estados
<<<<<<< HEAD
  const [devs, setDevs ] = useState([]);
=======
  const [devs , setDevs ] = useState([]);
>>>>>>> development
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

    // Removendo o usuário editado da lista
    const newDevs = devs.filter(dev => dev.github_username !== data.github_username);

    setData(data);
    setDevs(newDevs);
    setEdit(true);

  }

  // atualiza os dados do dev no banco de dados
  async function handleUpdateDev(data) {
    try {

      // devolve uma lista atualizada de devs
      await api.put('/devs', data);

<<<<<<< HEAD
      // consulta os dados atualiazados
=======
      setEdit(false);
      //setDevs(response.data);
>>>>>>> development
      const response = await api.get('/devs');
      setDevs(response.data);
      setEdit(false);
      

    }catch( err ) {
      console.log(err);
    }

  }

  // deleta o cadastro do dev no banco de dados
  async function handleDeleteDev( { github_username } ) {
    try {

<<<<<<< HEAD
      // devolve uma lista atualizada de devs.
=======
>>>>>>> development
      await api.delete('/devs',{
          params: {
            github_username
          }
      });

<<<<<<< HEAD

=======
      //setDevs(response.data);
      // devolve uma lista atualizada de devs.  
>>>>>>> development
      const response = await api.get('/devs');
      setDevs(response.data);

    }catch( err ) {
      console.log(err);
    }

  }

  return (
    <>
    <div id="app">
      <aside>
        <strong>{ edit ? 'Atualizar ' : 'Cadastrar '} Desenvolvedor</strong>
        {
          edit ? <DevFormEdit handleUpdateDev = { handleUpdateDev } data = { data } /> :
                 <DevForm handleAddDev = { handleAddDev } />
        }
      </aside>

      <main>
        <ul>
          { 
          
            devs.map( dev => <DevItem handleDeleteDev = { handleDeleteDev }  handleEditItem = { handleEditItem }  key={dev._id}  dev ={dev} />)

          }

        </ul>
      </main>

    </div>
    </>
  );
}

export default App;
