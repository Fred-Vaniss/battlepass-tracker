import React, {useState, useEffect, useRef} from 'react';
import ProgressBar from './components/ProgressBar';
import Modal from './components/Modal';

const App = () => {
  const [data,setData] = useState([]);
  const [form,setForm] = useState({
    name: "",
    start: "",
    end: "",
  });
  const [modal,setModal] = useState(false);

  const firstLoad = useRef(true);

  if (firstLoad.current) {
    
    // if (!queryLevel) {
     
    // } else {
      
    // }
    firstLoad.current = false;
  }

  const handleForm = e => {
    const name = e.target.name;
    const value = e.target.value;

    console.log(value)

    setForm({ ...form, [name]: value })
  }

  const listProgresses = data.map((item, index = 0) => {
    index++
    return(
      <ProgressBar/>
    )
  })

  useEffect(() => {
    
  }, [data])

  return (
      <div class="container">
        <h1>Battlepass tracker</h1>
        {listProgresses}
        <div className="add-container">
         <button onClick={() => setModal(true)}>Add battlepass</button>
        </div>
        <Modal form={form} handleChange={handleForm} open={modal} onClose={() => setModal(false)}/>
      </div>
  )
}

export default App;
