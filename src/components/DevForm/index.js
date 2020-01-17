import React, { useState, useEffect } from 'react';

function DevForm({ handleAddDev }) {

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

      async function handleSubmit(e){
            e.preventDefault();

            await handleAddDev({
              github_username,
              techs,
              latitude,
              longitude,
            });

            setGithub_username('');
            setTechs('');
      }

    return( 
    <form onSubmit={handleSubmit}>
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

        <button type='submit'>Salvar</button>
    </form>
    )
}

export default DevForm;