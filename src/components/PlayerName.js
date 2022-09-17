import {useState, useEffect} from 'react'
import axios from 'axios'

const PlayerName = (props) => {
  let [playerInfo, setPlayerInfo] = useState({Name: 'Name', Position: 'Position', Team: 'Team'})
  // Name: 'Name', Position: 'Position', Team: 'Team'
  let [defenseInfo, setDefenseInfo] = useState([])

  const getPlayerInfo = () => {
    //console.log(props.playerId.length);
    props.playerId.length > 4 ?
      axios.get('https://api.sportsdata.io/v3/nfl/projections/json/PlayerSeasonProjectionStatsByPlayerID/2022REG/' + props.playerId + '?key=c2d4f67c78294cd4a5ef2cdf2a957a31')
      .then((response) => {
        //console.log(response.data);
        setPlayerInfo(response.data)
      })
        :
      axios.get('https://api.sportsdata.io/v3/nfl/stats/json/FantasyDefenseBySeason/2022REG?key=c2d4f67c78294cd4a5ef2cdf2a957a31')
      .then((response) => {
        setDefenseInfo(response.data)
        defenseInfo.forEach((team) => {
          console.log(team.PlayerID, Number(props.playerId), 'defense2')
          if (team.PlayerID === Number(props.playerId)) {
            console.log(team, 'defense team');
            setPlayerInfo(team)
          }
        })
      })
  }
  //getPlayerInfo()

  useEffect(() => {
    getPlayerInfo()
  })

  // function isEmpty(obj) {
  //   return Object.keys(obj).length !== 0
  // }

  return (
    <div key={props.playerId}>
      {props.playerId.length > 4 ?
        <li>{playerInfo.Name}, {playerInfo.Position}, {playerInfo.Team}</li>
          :
        <li>{playerInfo.Team}, Defense, {playerInfo.Team}</li>
      }
    </div>

  )
}

export default PlayerName

// <div>
//     <li>{playerInfo.Name}, {playerInfo.Position}, {playerInfo.Team}</li>
// </div>
