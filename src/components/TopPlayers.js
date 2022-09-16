import '../App.css';
import {useState, useEffect} from 'react'
import axios from 'axios'

const TopPlayers = (props) => {
    let [topPlayersAPI, setTopPlayersAPI] = useState([])
    // let [topSort, setTopSort] = useState([])



const getTopPlayersAPI = () => {
    axios.get('https://api.sportsdata.io/v3/nfl/stats/json/PlayerGameStatsByWeek/2021REG/7?key=c2d4f67c78294cd4a5ef2cdf2a957a31')
    .then((response) => {
        var topSort = Object.keys(dict).map((FantasyPointsDraftKings) => {
            return [FantasyPointsDraftKings, dict[FantasyPointsDraftKings]];
        });

        topSort.sort((first, second) => {
            return second[1] - first[1];
        });
            

        //setTopSort(response.data.sort((a, b) => {
        //     let aFantasyPointsDraftKings = a.updatedAt;
        //     let bFantasyPointsDraftKings = b.updatedAt;
            
        //         if (aFantasyPointsDraftKings < bFantasyPointsDraftKings) {
        //             return 1;
        //             }
        //         if (aFantasyPointsDraftKings > bFantasyPointsDraftKings) {
        //             return -1;
        //             }
        //             return 0;
        //         }));


//         x = {1: 2, 3: 4, 4: 3, 2: 1, 0: 0}
// dict(sorted(x.items(), key=lambda item: item[1]))


      console.log(response.data.slice(0,15))
      setTopPlayersAPI(response.data.slice(0,15))
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
            <td>Name</td>
            <td>Score</td>
            <td>Team</td>
          </tr>
        </thead>
        <tbody>
        {topPlayersAPI.map((player,index) => {
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
}

export default TopPlayers