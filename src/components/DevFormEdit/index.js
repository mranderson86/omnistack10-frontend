import React, { useState } from 'react';

function DevFormEdit({ handleUpdateDev, data }) {

    const [ latitude , setLatitude ] = useState(data.location.coordinates[1]);
    const [ longitude, setLongitude ] = useState(data.location.coordinates[0]);

    const [ github_username,setGithub_username ] = useState(data.github_username);
    const [ techs , setTechs ] = useState(data.techs);

      // Salva dados
      async function handleSubmit(e){
            e.preventDefault();

            // Atualiza dados do desenvolvedor
            await handleUpdateDev({
                 github_username ,
                 techs,
                 latitude,
                 longitude
            });

            setTechs('');
            setGithub_username('');
                
      };

    return( 
    <form onSubmit={handleSubmit}>
        <div className="input-block">
            <label htmlFor="username_github">Usuário do Github</label>
            <label style={{ color: '#7d40e7', height: '32px' }}>{ data.github_username }</label>
        </div>
    
        <div className="input-block">
            <label htmlFor="techs">Tecnologias</label>
            <input 
                name="techs" 
                id="techs" 
                required 
                defaultValue = { data.techs.join(', ') }
                onChange = { e => setTechs( e.target.value ) }
                autoFocus
            />
        </div>
    
        <div className="input-group">

            <div className="input-block">
                <label htmlFor="latitude">Latitude</label>
                <input 
                    type="number" 
                    name="latitude" 
                    id="latitude"
                    defaultValue = { data.location.coordinates[1] }
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
                    defaultValue = { data.location.coordinates[0] }  
                    required
                    onChange = { e => setLongitude(e.target.value) }
                />
            </div>

        </div>

        <button type='submit'>Salvar</button>
    </form>
    )
}

export default DevFormEdit;