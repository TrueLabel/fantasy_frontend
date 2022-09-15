import '../App.css';
import {useState, useEffect} from 'react'
import axios from 'axios'

const TopPlayers = (props) => {
    let [topPlayersAPI, setTopPlayersAPI] = useState([])


const getTopPlayersAPI = () => {
    axios.get('https://api.sportsdata.io/v3/nfl/stats/json/PlayerGameStatsByWeek/2021REG/7?key=c2d4f67c78294cd4a5ef2cdf2a957a31')
    .then((response) => {
        
      console.log(response.data.slice(0,15))
      setTopPlayersAPI(response.data.slice(0,15))
    })
  }


  
      setShows(response.data.sort((a, b) => {
        let aDate = a.updatedAt.toUpperCase();
        let bDate = b.updatedAt.toUpperCase();

        if (aDate < bDate) {
          return 1;
        }
        if (aDate > bDate) {
            return -1;
        }
        return 0;
      }));
    })
  }





  const handleTopPlayers = (event) => {
    document.getElementById('topPlayers').classList.toggle('showhide');
  }
  

  useEffect(() => {
    getTopPlayersAPI()
  }, [])

  return (

    <div className='showhide' id='topPlayers'>

      <h4>Top Players</h4>
      <button onClick={handleTopPlayers}>Hide</button>
      <table>
        <thead>
          <tr>
            <td></td>
            <td>Element 1</td>
            <td>Element 2</td>
            <td>Element 3</td>
          </tr>
        </thead>
        <tbody>
        {topPlayersAPI.map((player,index) => {
          return (
            <tr key={player.PlayerID}>
              <td>{index + 1}</td>
              <td>{player.Name}</td>
              <td>{player.PlayerID}</td>
              <td>{player.Team}</td>
            </tr>
          )
        })}
        </tbody>
      </table>

    </div>
  )
}

export default TopPlayers