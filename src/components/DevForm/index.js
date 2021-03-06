import React, { useState, useEffect } from 'react';
import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import "./styles.css";

function DevForm({ handleAddDev, 
    handleUpdateDev, 
    edit = false , 
    data
  }) {

    const [ github_username , setGithub_username ] = useState(edit ? data.github_username : '');
    const [ techs , setTechs ] = useState(edit ? data.techs : '');

    const [ latitude , setLatitude ] = useState(edit ? data.location.coordinates[1] : '');
    const [ longitude, setLongitude ] = useState(edit ? data.location.coordinates[0] : '');

    const [ show , setShow ] = useState(false);

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

            setShow(true);

            if(edit) {
              // Atualiza dados de desenvolvedor
              handleUpdateDev({
                github_username : data.github_username ,
                techs,
                latitude,
                longitude,
              })

            }else{
              // Inserir dados de um novo desenvolvedor
              await handleAddDev({
                github_username ,
                techs,
                latitude,
                longitude,
              });
            }

            data.techs = '';
            edit = false;

            setGithub_username('');
            setTechs('');
            
            setShow(false);

      };

    return( 
    <form onSubmit={handleSubmit}>
        
        <div className="input-block">
            <label htmlFor="username_github">Usuário do Github</label>
            { edit ? <label style={ { color: "#7d40e7", fontWeight: 'bold' } }>{data.github_username}</label> :
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
                defaultValue = { edit ? data.techs :  techs }
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
                    defaultValue = { edit ? data.location.coordinates[0] :  longitude }  
                    required
                    onChange = { e => setLongitude(e.target.value) }
                />
            </div>

        </div>

        <button type='submit'>Salvar</button>

        <div className="spinner">
          { show ?
            <Loader 
              type="Oval"
              color="#7d40e7"
              width={50}
              height={50}
            /> : ''
          }
        </div>
        
    </form>
    )
}

export default DevForm;