import '../App.css';
import {useState, useEffect, useDebugValue} from 'react'
import axios from 'axios'

const TopPlayers = (props) => {
    let [topPlayersAPI, setTopPlayersAPI] = useState([]);
    let [topPlayers, setTopPlayers] = useState([]);
    let [year, setYear] = useState(2021);
    let [week, setWeek] = useState(10);
  
const getTopPlayersAPI = () => {
    axios.get('https://api.sportsdata.io/v3/nfl/stats/json/PlayerGameStatsByWeek/' + year + 'REG/' + week + '?key=c2d4f67c78294cd4a5ef2cdf2a957a31')
    .then((response) => {
        let sliceplayers = setTopPlayers(response.data.sort((a, b) => Number(b.FantasyPointsDraftKings) - Number(a.FantasyPointsDraftKings))
        .slice(0, 15));
    })
  };


  const handleTopPlayers = (event) => {
    document.getElementById('topPlayers').classList.toggle('showhide');
  };
  

  useEffect(() => {
    getTopPlayersAPI()
  }, []);

  return (

    <div className='showhide' id='topPlayers'>

      <h4>Top Players</h4>
      <button onClick={handleTopPlayers}>Hide</button>
      <table>
        <thead>
          <tr>
            <td></td>
            <td>Name</td>
            <td>Score</td>
            <td>Team</td>
          </tr>
        </thead>
        <tbody>
        {topPlayers.map((player,index) => {
          return (
            <tr key={player.PlayerID}>
              <td>{index + 1}</td>
              <td>{player.Name}</td>
              <td>{player.FantasyPointsDraftKings}</td>
              <td>{player.Team}</td>
            </tr>
          )
        })}
        </tbody>
      </table>

    </div>
  )
};

export default TopPlayers