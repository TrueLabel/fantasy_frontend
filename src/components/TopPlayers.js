import '../App.css';
import {useState, useEffect, useDebugValue} from 'react'
import axios from 'axios'

const TopPlayers = (props) => {
    let [topPlayersAPI, setTopPlayersAPI] = useState([]);
    let [topPlayers, setTopPlayers] = useState([]);
    let [year, setYear] = useState(2022);
    let [week, setWeek] = useState(1);

const getTopPlayersAPI = (year, week) => {
  console.log(year);
    axios.get('https://api.sportsdata.io/v3/nfl/stats/json/PlayerGameStatsByWeek/' + String(year) + 'REG/' + String(week) + '?key=458e4d8b7fd847348de5b8891eedc940')
    .then((response) => {
        let sliceplayers = setTopPlayers(response.data.sort((a, b) => Number(b.FantasyPointsDraftKings) - Number(a.FantasyPointsDraftKings))
        .slice(0, 15));
    })
  };


  const handleTopPlayers = (event) => {
    event.preventDefault()
    document.getElementById('topPlayers').classList.toggle('showhide');
  };


  useEffect(() => {
    getTopPlayersAPI(year, week)
  }, []);

  const handleChangeYear = (event) => {
    setYear(event.target.value)
  }

  const handleChangeWeek = (event) => {
    setWeek(event.target.value)

  }


  const handleSubmitTop = (e) => {
    e.preventDefault()
    getTopPlayersAPI(year, week)
    console.log(year)
    console.log(week)
    }

  return (

    <div>

      <h4>Top Players</h4>
      <form>
      {/* <button onClick={handleTopPlayers}>Hide</button> */}
      <button onClick={handleSubmitTop}>Submit</button>
      <table>
        <tr>
            <td><label htmlFor="year">Season: </label></td>
            
            <td><label htmlFor="week">Week: </label></td>
        </tr>
        <tr>
            <td>
        <select value={year} onChange={e=>setYear(e.target.value)}>
            <option>2021</option>
            <option>2022</option>
        </select>
        {/* <input type="text" name="year" onChange={handleChangeYear} /> */}
        </td>
        <td>
        <select value={week} onChange={e=>setWeek(e.target.value)}>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
            <option>10</option>
            <option>11</option>
            <option>12</option>
            <option>13</option>
            <option>14</option>
            <option>15</option>
            <option>16</option>
            <option>17</option>

        </select>
        </td>
        </tr>
        </table>
        {/* <input type="text" name="week" onChange={handleChangeWeek}/> */}
        </form>
      <table>
        <thead>
          <tr>
            <td></td>
            <td><h2>Name</h2></td>
            <td><h2>Score</h2></td>
            <td><h2>Team</h2></td>
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
