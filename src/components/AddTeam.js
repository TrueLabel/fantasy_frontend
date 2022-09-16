import '../App.css';
import {useState, useEffect} from 'react'
import axios from 'axios'



const AddTeam = (props) => {
  let [playersAPI, setPlayersAPI] = useState([])
  let [newTeam, setNewTeam] = useState({name: '', players: ''})
  let [pickedPlayersString, setPickedPlayersString] = useState('')
  let [teamName, setTeamName] = useState('Test')

  const getPlayersAPI = () => {
    axios.get('https://api.sportsdata.io/v3/nfl/stats/json/FantasyPlayers?key=c2d4f67c78294cd4a5ef2cdf2a957a31')
    .then((response) => {
      // console.log(response.data.slice(0,49))
      setPlayersAPI(response.data.slice(0,49))
    })
  }

  // const handleChangeNewTeam = (event) => {
  //   setNewTeam({ ...newTeam, [event.target.name]: event.target.value })
  // }

  const addPlayerString = (event) => {
    // console.log(event.target.value);
    // console.log(newTeam.players);
    newTeam.players.length > 1 ?
      setNewTeam({name: teamName, players: newTeam.players + ',' + event.target.value})
      //setPickedPlayersString(pickedPlayersString + ', ' + event.target.value)
        :
      setNewTeam({name: teamName, players: event.target.value})
      //setPickedPlayersString(event.target.value)
    //updateString()
  }

  const updateString = () => {
    setNewTeam({name: teamName, players: pickedPlayersString})
    // console.log(newTeam);
  }

  const handleSubmitNewTeam = (event) => {
    event.preventDefault()
    props.handleCreateTeam(newTeam)
    setNewTeam({name: '', players: ''})
    document.getElementById('addteam').classList.toggle('showhide');
  }

  const handleCancelNewTeam = (event) => {
    event.preventDefault()
    setNewTeam({name: '', players: ''})
    document.getElementById('addteam').classList.toggle('showhide');
  }

  useEffect(() => {
    getPlayersAPI()
  }, [])

  return (
    <div className='showhide' id='addteam'>

      <h4>Add Team Component</h4>
      Current players on team:
      {newTeam.players}
      <button onClick={handleSubmitNewTeam}>Submit Team</button>
      <button onClick={handleCancelNewTeam}>Cancel</button>
      <table>
        <thead>
          <tr>
            <td></td>
            <td>Name</td>
            <td>ID</td>
            <td>Team</td>
          </tr>
        </thead>
        <tbody>
        {playersAPI.map((player,index) => {
          return (
            <tr key={player.PlayerID}>
              <td>{index + 1}</td>
              <td>{player.Name}</td>
              <td>{player.PlayerID}</td>
              <td>{player.Team}</td>
              <td>
                <button onClick={addPlayerString} value={player.PlayerID}>Add
                </button>
              </td>
            </tr>
          )
        })}
        </tbody>
      </table>

    </div>
  )
}

export default AddTeam