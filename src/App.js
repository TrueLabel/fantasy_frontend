// import './App.scss';
import './App.css';
import {useState, useEffect} from 'react'
import axios from 'axios'

import AddTeam from './components/AddTeam'
import Teams from './components/Teams'
import Header from './components/Header'
import TopPlayers from './components/TopPlayers'
import Footer from './components/Footer'



const App = () => {
  let [teams, setTeams] = useState([])

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


  // const openModal = () => {
  //   document.getElementById('modal').style.display = 'block'
  // }

  const handleTopPlayers = (event) => {
    document.getElementById('topPlayers').classList.toggle('showhide');
  }

  const showAddTeam = () => {
    document.getElementById('addteam').classList.toggle('showhide');
    document.getElementById('modal').style.display = 'block'
  }

  // const handleSubmitModalForm = (teamData) => {
  //   setNewTeamForm(teamData)
  //   showAddTeam()
  // }


  useEffect(() => {
    getTeams()
  }, [])

  return (
    <>

    <div><Header /></div>
    <div id='spacer'></div>
    <div id='topplayers'> <TopPlayers /></div>
    <div id= 'teamInfo'>
      <button className='divbutton topaddteambutton' onClick={() => {showAddTeam()}}>Add Team</button>
      <Teams teams={teams} handleDeleteTeam={handleDeleteTeam}/>

      <button className='divbutton bottomaddteambutton' onClick={() => {showAddTeam()}}>Add Team</button>
      <AddTeam handleCreateTeam={handleCreateTeam} teams={teams} />
      <AddTeam handleCreateTeam={handleCreateTeam} teams={teams}/>
      </div>
      <Footer />

    </>
  )
}

export default App;
