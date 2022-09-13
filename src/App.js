import './App.css';
import {useState, useEffect} from 'react'
import axios from 'axios'

import AddTeam from './components/AddTeam'
import Teams from './components/Teams'


const showAddTeam = () => {
  document.getElementById('addteam').classList.toggle('showhide');
}

const App = () => {
  let [teams, setTeams] = useState([])
  //let [newTeam, setNewTeam] = useState({name: '', players: ''})

  const getTeams = () => {
    axios.get('https://fierce-ocean-36761.herokuapp.com/api/team')
    .then((response) => {
      setTeams(response.data)
    })
  }

  // const handleChangeNewTeam = (event) => {
  //   setNewTeam({ ...newTeam, [event.target.name]: event.target.value })
  // }
  //
  // const handleSubmitNewTeam = (event) => {
  //   event.preventDefault()
  //   handleCreateTeam(newTeam)
  // }


  const handleCreateTeam = (addedTeam) => {
    axios.post('https://fierce-ocean-36761.herokuapp.com/api/team', addedTeam)
    .then((response) => {
      console.log(response);
      getTeams()
    })
  }

  const handleDeleteTeam = (event) => {
    axios
    .delete('https://fierce-ocean-36761.herokuapp.com/api/team/' + event.target.value)
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
      <br />
      <button className='divbutton' id='topaddteambutton' onClick={() => {showAddTeam()}}>Add Team</button>
      <Teams teams={teams} handleDeleteTeam={handleDeleteTeam}/>
      <button className='divbutton' onClick={() => {showAddTeam()}}>Add Team</button>
      <AddTeam handleCreateTeam={handleCreateTeam} teams={teams}/>
    </>
  )
}

export default App;

