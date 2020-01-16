import React from 'react';

import './global.css';
import './App.css';
import './Sidebar.css';

import avatar from './logo192.png';

function App() {
  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <form>

          <div class="input-block">
            <label htmlFor="username_github">Usuário do Github</label>
            <input name="github_username" id="username_github" required></input>
          </div>
          
          <div class="input-block">
            <label htmlFor="techs">Tecnologias</label>
            <input name="techs" id="techs" required></input>
          </div>
          
          <div className="input-group">

            <div class="input-block">
              <label htmlFor="latitude">Latitude</label>
              <input name="latitude" id="latitude" required></input>
            </div>

            <div class="input-block">
              <label htmlFor="longitude">Longitude</label>
              <input name="longitude" id="longitude" required></input>
            </div>

          </div>

          <button type='submit'>Salvar</button>
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
          </li>
        </ul>
      </main>

    </div>
  );
}

export default App;
