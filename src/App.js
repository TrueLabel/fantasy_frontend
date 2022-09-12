import './App.css';
import {useState, useEffect} from 'react'
import axios from 'axios'

import AddTeam from './components/AddTeam'

const App = () => {
  let [teams, setTeams] = useState([])

  const getTeams = () => {
    axios.get('http://localhost:8000/')
    .then((response) => {
      setTeams(response)
    })
  }

  // useEffect(() => {
  //   getTeams()
  // }, [])

  return (
    <>
      <h1>Fantasy Football App</h1>
      {teams.map((team) => {
        return (
          <div>
            {team}
          </div>
        )
      })}

      <AddTeam />

    </>
  )
}

export default App;
