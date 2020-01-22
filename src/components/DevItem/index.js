import React from 'react';
import './styles.css';

function DevItem ({ dev , handleEditItem, handleDeleteDev }) {
    return (
        <li className="dev-item">
          <header>
            <img src={dev.avatar_url} alt={dev.name} />
            <div className="user-info">
              <strong>{dev.name||dev.github_username}</strong>
              <span>{dev.techs.join(', ')}</span>
            </div>
          </header>
          <p>{dev.bio}</p>
          <a href={`https://github.com/${dev.github_username}`}>Acessar perfil no github</a>
          <div className="user-info-button">
            <button type="button" className="user-info-edit" onClick={ ()=> handleEditItem(dev) }>Editar</button>
            <button type="button" className="user-info-del" onClick={ ()=> handleDeleteDev(dev) } >Excluir</button>
          </div>
        </li>
      );
}

export default DevItem;