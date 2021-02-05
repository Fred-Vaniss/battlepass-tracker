import React, {useState, useEffect, useRef} from 'react';
import { BrowserRouter as Router, Route, useLocation } from 'react-router-dom'
import ProgressBar from './components/ProgressBar';

function App() {
  return (
    <Router>
      <Route path="/">
        <QueryApp/>
      </Route>
    </Router>
  );
}



const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

const QueryApp = () => {
  const [level,setLevel] = useState(0)

  const setQueryString = (level) => {
    const newUrl =  window.location.protocol + "//" +
                    window.location.host +
                    window.location.pathname +
                    '?lvl='+level;

    window.history.pushState({ path: newUrl }, "", newUrl);
  }

  let query = useQuery();

  const firstLoad = useRef(true);

  if (firstLoad.current) {
    const queryLevel = query.get('lvl')
    if (!queryLevel) {
      setQueryString(level)
    } else {
      setLevel(query.get("lvl"))
    }
    firstLoad.current = false;
  }

  const handleLevelChange = e => {
    setLevel(e.target.value)
    setQueryString(level)
  }

  useEffect(() => {
    setQueryString(level)
  }, [level])

  return (
    <>
      <div class="container">
        <h1>Battlepass tracker</h1>
        <div className="level-form">
          <label htmlFor="level">Battlepass level: </label>
          <input  type="number"
                  name="level"
                  value={level}
                  onChange={handleLevelChange}/>
        </div>
        <ProgressBar level={level}/>
      </div>
    </>
  )
}

export default App;
