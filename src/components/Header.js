


const openModal = () => {
    document.getElementById('modal').style.display = 'block'
  }

  const handleTopPlayers = (event) => {
    document.getElementById('topPlayers').classList.toggle('showhide');
  }



const Header = (props) => {

    return (
      <div className='header'>
          <img className='footballicon' src='https://icons.iconarchive.com/icons/thesquid.ink/free-flat-sample/1024/football-icon.png'></img>
          <h1>Draft Challenger</h1>
            <button onClick={handleTopPlayers}>Show Top Players</button>
            <button className='topaddteambutton' id='open-modal' onClick={() => {openModal()}}>Add Team</button>
      </div>
    )
  }

  export default Header
