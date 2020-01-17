import React, { useEffect, useState } from 'react';

import api from './services/api';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import avatar from './logo192.png';

function App() {

  // variável de estado
  const [devs , setDevs ] = useState([]);

  const [ latitude , setLatitude ] = useState('');
  const [ longitude, setLongitude ] = useState('');

  const [ github_username , setGithub_username ] = useState('');
  const [ techs , setTechs ] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
      
        const { latitude , longitude } = position.coords;

        setLatitude(latitude);
        setLongitude(longitude);

      }, 
      (err) => {
        console.log(err);
      },
      {
        timeout: 30000,
      }
      
    );
  }, []);

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

  },[]);

  async function handleAddDev (e) {
      e.preventDefault();

      try {

        const response = await api.post('/devs', {
          github_username, techs, latitude , longitude

        });

        console.log(response.data);

        setGithub_username('');
        setTechs('');
        

      } catch(err) {
        console.log(err);
      }
  }


  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <form>

          <div className="input-block">
            <label htmlFor="username_github">Usuário do Github</label>
            <input 
                name="github_username" 
                id="username_github" 
                required 
                value = {github_username}
                onChange = { e => setGithub_username( e.target.value ) }
            />
          </div>
          
          <div className="input-block">
            <label htmlFor="techs">Tecnologias</label>
            <input 
                name="techs" 
                id="techs" 
                required 
                value={techs}
                onChange = { e => setTechs( e.target.value ) }
            />
          </div>
          
          <div className="input-group">

            <div className="input-block">
              <label htmlFor="latitude">Latitude</label>
              <input 
                  type="number" 
                  name="latitude" 
                  id="latitude" 
                  defaultValue={ latitude } 
                  required 
                  onChange = { e => setLatitude(e.target.value) }
              />
            </div>

            <div className="input-block">
              <label htmlFor="longitude">Longitude</label>
              <input 
                  type="number" 
                  name="longitude" 
                  id="longitude" 
                  defaultValue={ longitude }  
                  required
                  onChange = { e => setLongitude(e.target.value) }
              />
            </div>

          </div>

          <button type='submit' onClick={handleAddDev} >Salvar</button>
        </form>
      </aside>

      <main>
        <ul>

          <li className="dev-item">
            <header>
              <img src={avatar} alt="" />
              <div className="user-info">
                <strong>Anderson Gomes</strong>
                <span>ReactJS, React Native , Node.JS</span>
              </div>
            </header>
            <p>Desenvolvedor / Programador de Software , Geek , Gamer , Gosta de tecnologia , cultura pop e outras modinhas.</p>
            <a href="https://github.com/mranderson86">Acessar perfil no github</a>
          </li>

          <li className="dev-item">
            <header>
              <img src={avatar} alt="" />
              <div className="user-info">
                <strong>Anderson Gomes</strong>
                <span>ReactJS, React Native , Node.JS</span>
              </div>
            </header>
            <p>Desenvolvedor / Programador de Software , Geek , Gamer , Gosta de tecnologia , cultura pop e outras modinhas.</p>
            <a href="https://github.com/mranderson86">Acessar perfil no github</a>
          </li>

          <li className="dev-item">
            <header>
              <img src={avatar} alt="" />
              <div className="user-info">
                <strong>Anderson Gomes</strong>
                <span>ReactJS, React Native , Node.JS</span>
              </div>
            </header>
            <p>Desenvolvedor / Programador de Software , Geek , Gamer , Gosta de tecnologia , cultura pop e outras modinhas.</p>
            <a href="https://github.com/mranderson86">Acessar perfil no github</a>
          </li>

          <li className="dev-item">
            <header>
              <img src={avatar} alt="" />
              <div className="user-info">
                <strong>Anderson Gomes</strong>
                <span>ReactJS, React Native , Node.JS</span>
              </div>
            </header>
            <p>Desenvolvedor / Programador de Software , Geek , Gamer , Gosta de tecnologia , cultura pop e outras modinhas.</p>
            <a href="https://github.com/mranderson86">Acessar perfil no github</a>
          </li>

        </ul>
      </main>

    </div>
  );
}

export default App;
