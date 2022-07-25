import { useState, useEffect } from 'react';
import TableContent from './tableContent.component';

import './styles.css';


const App = () => {
  const [field, setField] = useState([]);
  const [username, setusername] = useState('');
  const [newError, setnewError] = useState(false);
  const [checkbox, setcheckbox] = useState(false);


  const userchange = (event) => {
    const userstring = event.target.value.toLocaleLowerCase();
    setusername(userstring);
  }


  const buttonClick = () => {

    fetch(`https://api.github.com/users/${username}/repos`)
      .then((response) => {
        if (!response.ok) throw new Error(response.status);
        else
          return response.json()

            .then((users) => {
              users.sort(function (a, b) {
                return b.size - a.size;
              });

              setField(users);
              setnewError(false);
            }

            )
      })
      .catch((error) => {

        setnewError(true);
        setField([]);
        console.log(error)
      });

  }

  const checkBoxChange = (event) => {
    setcheckbox(event.target.checked);
  }



  return (

    <div className="App">

      <div className="input">
        <label htmlFor="username" >Github username: </label>
        <input id="username" type="text" onChange={userchange} />
        <label htmlFor="fork">Include forks: </label>
        <input id="fork" type="checkbox" onChange={checkBoxChange} />
        <button onClick={buttonClick} disabled={!username}  >Submit</button>
      </div>
      <section>
        <header>
          <div className="col">Name</div>
          <div className="col">Language</div>
          <div className="col">Description</div>
          <div className="col">Size</div>
        </header>

        {field.map(user => (

          <TableContent key={user.id} user={user}
            checkbox={checkbox}
          />

        ))
        }

      </section>
      {
        newError == true &&
        <div className='error'> Not Found</div>

      }
     
    
    </div>
  );
}

export default App;

