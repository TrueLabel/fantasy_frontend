import {useState, useEffect} from 'react'
import axios from 'axios'

const PlayerInfo = (props) => {
  let [playerInfo, setPlayerInfo] = useState([])
  let [defenseInfo, setDefenseInfo] =useState([])

  const getPlayerInfo = () => {
    //console.log(props.playerId.length, 'key');
    props.playerId.length > 4 ?
      axios.get('https://api.sportsdata.io/v3/nfl/projections/json/PlayerSeasonProjectionStatsByPlayerID/2022REG/' + props.playerId + '?key=458e4d8b7fd847348de5b8891eedc940')
      .then((response) => {
        //console.log(response.data);
        setPlayerInfo(response.data)
      })
        :
      axios.get('https://api.sportsdata.io/v3/nfl/stats/json/FantasyDefenseBySeason/2022REG?key=458e4d8b7fd847348de5b8891eedc940')
      .then((response) => {
        setDefenseInfo(response.data)
        defenseInfo.forEach((team) => {
          console.log(team.PlayerID, props.playerId, 'defense')
          if (team.PlayerID === Number(props.playerId)) {
            setPlayerInfo(team)
          }
        })
      })
  }
  getPlayerInfo()

  // useEffect(() => {
  //   getPlayerInfo()
  // }, [])

  return (
    <div>
      {props.playerId.length > 4 ?
        <tr key={playerInfo.playerID}>
          <td>{playerInfo.Name}</td>
          <td>{playerInfo.Position}</td>
          <td>{playerInfo.Team}</td>
          <td>{playerInfo.FantasyPoints}</td>
        </tr>
          :
        <tr key={playerInfo.playerID}>
          <td>{playerInfo.Team}</td>
          <td>Defense</td>
          <td>{playerInfo.Team}</td>
          <td>{playerInfo.FantasyPoints}</td>
        </tr>
      }
    </div>



  )
}

export default PlayerInfo
