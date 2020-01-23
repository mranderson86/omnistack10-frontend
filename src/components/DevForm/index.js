import React, { useState, useEffect } from 'react';

function DevForm({ handleAddDev, handleUpdateDev, edit , data }) {

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

      // Salva dados
      async function handleSubmit(e){
            e.preventDefault();

            // Atualiza dados do desenvolvedor
            if( edit ) {

              await handleUpdateDev({
                github_username: data.github_username ,
                techs,
                latitude,
                longitude,
              });

            } else {
            // Inserir dados de um novo desenvolvedor
              await handleAddDev({
                github_username ,
                techs,
                latitude,
                longitude,
              });

            }

            setGithub_username('');
            setTechs('');

            edit = false;
      };

      console.log(techs);

    return( 
    <form onSubmit={handleSubmit}>
        <div className="input-block">
            <label htmlFor="username_github">Usuário do Github</label>
            
            {
              edit ? <label style={{ color: '#7d40e7' }}>{ data.github_username }</label> :
              <input 
                name="github_username" 
                id="username_github" 
                required 
                autoFocus
                value = {github_username}
                onChange = { e => setGithub_username( e.target.value ) }
              />
            }

        </div>
    
        <div className="input-block">
            <label htmlFor="techs">Tecnologias</label>
            <input 
                name="techs" 
                id="techs" 
                required 
                defaultValue = { edit ? data.techs.join(', ') : techs }
                onChange = { e => setTechs( e.target.value ) }
                autoFocus = { edit }
            />
        </div>
    
        <div className="input-group">

            <div className="input-block">
                <label htmlFor="latitude">Latitude</label>
                <input 
                    type="number" 
                    name="latitude" 
                    id="latitude"
                    defaultValue = { edit ? data.location.coordinates[1] : latitude }
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
                    defaultValue = { edit ? data.location.coordinates[0] : longitude }  
                    required
                    onChange = { e => setLongitude(e.target.value) }
                />
            </div>

        </div>

        <button type='submit'>Salvar</button>
    </form>
    )
}

export default DevForm;