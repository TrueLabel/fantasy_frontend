import {useState, useEffect} from 'react'
import axios from 'axios'

const PlayerInfo = (props) => {
  let [playerInfo, setPlayerInfo] = useState([])

  const getPlayerInfo = (id) => {
    axios.get('https://api.sportsdata.io/v3/nfl/projections/json/PlayerSeasonProjectionStatsByPlayerID/2022REG/' + props.playerId + '?key=c2d4f67c78294cd4a5ef2cdf2a957a31')
    .then((response) => {
      //console.log(response.data);
      setPlayerInfo(response.data)
    })
  }

  useEffect(() => {
    getPlayerInfo()
  }, [])

  return (
    <tr>
      <td>{playerInfo.Name}</td>
      <td>{playerInfo.Position}</td>
      <td>{playerInfo.Team}</td>
      <td>{playerInfo.FantasyPoints}</td>
    </tr>
  )
}

export default PlayerInfo
