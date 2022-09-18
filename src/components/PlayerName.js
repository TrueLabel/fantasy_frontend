import {useState, useEffect} from 'react'
import axios from 'axios'

const PlayerName = (props) => {
  let [playerInfo, setPlayerInfo] = useState({Name: 'Name', Position: 'Position', Team: 'Team'})
  // Name: 'Name', Position: 'Position', Team: 'Team'
  // let [defenseInfo, setDefenseInfo] = useState([])

  const getPlayerInfo = () => {
    //console.log(props.playerId);
    props.playerId.length > 4 ?
      axios.get('https://api.sportsdata.io/v3/nfl/projections/json/PlayerSeasonProjectionStatsByPlayerID/2022REG/' + props.playerId + '?key=458e4d8b7fd847348de5b8891eedc940')
      .then((response) => {
        console.log(response.data);
        setPlayerInfo(response.data)
      })
        :
      axios.get('https://api.sportsdata.io/v3/nfl/stats/json/FantasyDefenseBySeason/2022REG?key=458e4d8b7fd847348de5b8891eedc940')
      .then((response) => {
        response.data.forEach((team) => {
          if (team.PlayerID === Number(props.playerId)) {
            //console.log(team, 'defense team');
            setPlayerInfo(team)
          }
        })
      })
  }
  //getPlayerInfo()

  useEffect(() => {
    getPlayerInfo()
  }, [])

  // function isEmpty(obj) {
  //   return Object.keys(obj).length !== 0
  // }

  return (
    <div key={props.playerId}>
      {props.playerId.length > 4 ?
        <div>{playerInfo.Name}, {playerInfo.Position}, {playerInfo.Team}</div>
          :
        <div>{playerInfo.Team}, Defense, {playerInfo.Team}</div>
      }
    </div>

  )
}

export default PlayerName

// <div>
//     <li>{playerInfo.Name}, {playerInfo.Position}, {playerInfo.Team}</li>
// </div>
