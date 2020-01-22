import React from 'react';
import './styles.css';

function DevItem ({ dev , handleEditItem, handleDeleteItem }) {

    // declara edit state
    //const [edit, setEdit] = useState(false);

    // excluir um cadastro do banco de dados
    //function handleDeleteItem (id) {}

    // editar um cadastro do desenvolvedor
    //function handleEditItem (data) {
    //    setEdit(true);
    //}

    // salvar dados alterados
    //function handleSaveItem (data) {}

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
            <button type="button" className="user-info-del" onClick={ ()=> handleDeleteItem(dev) } >Excluir</button>
          </div>
        </li>
      );
}

export default DevItem;