import '../App.css';
import {useState, useEffect} from 'react'
import axios from 'axios'

const AddTeam = (props) => {
  let [playersAPI, setPlayersAPI] = useState([])
  let [newTeam, setNewTeam] = useState({name: '', players: ''})
  let [pickedPlayersString, setPickedPlayersString] = useState('')


  const getPlayersAPI = () => {
    axios.get('https://api.sportsdata.io/v3/nfl/stats/json/FantasyPlayers?key=c2d4f67c78294cd4a5ef2cdf2a957a31')
    .then((response) => {
      console.log(response.data.slice(0,49))
      setPlayersAPI(response.data.slice(0,49))
    })
  }

  // const handleChangeNewTeam = (event) => {
  //   setNewTeam({ ...newTeam, [event.target.name]: event.target.value })
  // }

  const addPlayerString = (event) => {
    console.log(event.target.value);
    pickedPlayersString.length > 1 ?
      setPickedPlayersString(pickedPlayersString + ', ' + event.target.value)
        :
      setPickedPlayersString(event.target.value)
    console.log(pickedPlayersString);
  }

  const handleSubmitNewTeam = (event) => {
    event.preventDefault()
    let teamName = props.teams.length + 1
    setNewTeam({name: 'Team ' + teamName, players: pickedPlayersString})
    props.handleCreateTeam(newTeam)
    setNewTeam({name: '', players: ''})
  }

  useEffect(() => {
    getPlayersAPI()
  }, [])

  return (
    <>
      <h4>Add Team Component</h4>
      Current players on team:

      <button onClick={handleSubmitNewTeam}>Submit Team</button>
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
            <>
            <tr>
              <td>{index + 1}</td>
              <td>{player.Name}</td>
              <td>{player.PlayerID}</td>
              <td>{player.Team}</td>

            </tr>
            <button onClick={addPlayerString} value={player.PlayerID}>Add
            </button>
            </>
          )
        })}
        </tbody>
      </table>

    </>
  )
}

export default AddTeam
