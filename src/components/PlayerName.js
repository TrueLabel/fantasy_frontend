import {useState, useEffect} from 'react'
import axios from 'axios'

const PlayerName = (props) => {
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
    <li>
      {playerInfo.Name}, {playerInfo.Position}, {playerInfo.Team}
    </li>
  )
}

export default PlayerName
