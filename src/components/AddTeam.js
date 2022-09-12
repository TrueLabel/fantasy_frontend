import '../App.css';
import {useState, useEffect} from 'react'
import axios from 'axios'

const AddTeam = (props) => {
  let [players, setPlayers] = useState([])
  let [playersString, setPlayerString] = useState([])

  const getPlayers = () => {
    axios.get('https://api.sportsdata.io/v3/nfl/stats/json/FantasyPlayers?key=c2d4f67c78294cd4a5ef2cdf2a957a31')
    .then((response) => {
      console.log(response.data.slice(0,49))
      setPlayers(response.data.slice(0,49))
    })
  }

  useEffect(() => {
    getPlayers()
  }, [])



  return (
    <>
      <h4>Add Team Component</h4>
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
        {players.map((player,index) => {
          return (
            <tr>
              <td>{index}</td>
              <td>{player.Name}</td>
              <td>{player.PlayerID}</td>
              <td>{player.Team}</td>
            </tr>
          )
        })}
        </tbody>
      </table>

    </>
  )
}

export default AddTeam
