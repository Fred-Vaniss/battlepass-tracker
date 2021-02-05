import React, {useState, useEffect, useRef} from 'react';
import ProgressBar from './components/ProgressBar';
import Modal from './components/Modal';

const App = () => {
  const [dataIndex, setIndex] = useState(1)
  const [data,setData] = useState([]);
  const [form,setForm] = useState({
    id: dataIndex,
    name: "",
    start: "",
    end: "",
    goal: 0,
    level: "0"
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

    setForm({ ...form, [name]: value })
  }

  const handleSave = () => {
    setData(data.concat(form))
    setIndex(dataIndex+1)
    setForm({
      id: dataIndex,
      name: "",
      start: "",
      end: "",
      goal: 0,
      level: "0"
    })
    setModal(false)
  }

  const handleLevel = (key, value) => {
    console.log(key,value)
    const modifiedData = data
    const index = modifiedData.findIndex(i => i.id === key);

    modifiedData[index].level = value

    console.log(modifiedData)

    setData(modifiedData)
  }

  const listProgresses = data.map((item, index = 0) => {
    return(
      <ProgressBar key={item.id} data={item} handleChange={handleLevel}/>
    )
  })

  useEffect(() => {
    console.log(data) 
  }, [data])

  return (
      <div class="container">
        <h1>Battlepass tracker</h1>
        {listProgresses}
        <div className="add-container">
         <button onClick={() => setModal(true)}>Add battlepass</button>
        </div>
        <Modal form={form} handleChange={handleForm} open={modal} onClose={() => setModal(false)} onSave={handleSave}/>
      </div>
  )
}

export default App;
