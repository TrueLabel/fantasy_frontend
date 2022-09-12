import {useState, useEffect} from 'react'
import axios from 'axios'

const AddTeam = (props) => {
  let [players, setPlayers] = useState([])
  let [newTeam, setNewTeam] = useState([])

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
      {players.map((player) => {
        return (
          <div>
            {player.Name}, {player.Team}, {player.Position}, {player.ProjectedFantasyPoints}
            <br />
            <br />
          </div>
        )
      })}
    </>
  )
}

export default AddTeam
