import './App.css';
import {useState, useEffect} from 'react'
import axios from 'axios'

import AddTeam from './components/AddTeam'

const App = () => {
  let [teams, setTeams] = useState([])
  let [newTeam, setNewTeam] = useState({name: '', players: ''})

  const getTeams = () => {
    axios.get('http://localhost:8000/api/team')
    .then((response) => {
      setTeams(response.data)
    })
  }

  const handleChangeNewTeam = (event) => {
    setNewTeam({ ...newTeam, [event.target.name]: event.target.value })
  }

  const handleSubmitNewTeam = (event) => {
    event.preventDefault()
    handleCreateTeam(newTeam)
  }


  const handleCreateTeam = (newTeam) => {
    axios.post('http://localhost:8000/api/team', newTeam)
    .then((response) => {
      getTeams()
    })
  }

  const handleDeleteTeam = (event) => {
    axios
    .delete('http://localhost:8000/api/team/' + event.target.value)
    .then((response) => {
      getTeams()
    })
  }

  useEffect(() => {
    getTeams()
  }, [])

  return (
    <>
      <h1>Fantasy Football App</h1>

      <form onSubmit={handleSubmitNewTeam}>
        <label htmlFor="name">Name: </label>
        <input type="text" name="name" onChange={handleChangeNewTeam}/>
        <br />
        <br />
        <label htmlFor="players">Player IDs: </label>
        <input type="text" name="players" onChange={handleChangeNewTeam}/>
        <input type="submit" />
      </form>
      <br />
      <h2>Teams: </h2>
      {teams.map((team) => {
        return (
          <div>
            Name: {team.name}, Players: {team.players}
            <button onClick={handleDeleteTeam} value={team.id}>Delete Team</button>

          </div>
        )
      })}
      <AddTeam />

    </>
  )
}

export default App;
