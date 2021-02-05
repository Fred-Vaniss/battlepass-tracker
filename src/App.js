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
  const [isEditing,setIsEditing] = useState(false);
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
    if (isEditing === false) {
      setData(data.concat(form))
      const newIndex = dataIndex + 1
      setIndex(newIndex)
    } else {
      const modifiedData = data
      const key = form.id
      const index = modifiedData.findIndex(i => i.id === key);

      modifiedData[index] = form

      setData(modifiedData)
      setIsEditing(false)
    }
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

  const startEdit = key => {
    const index = data.findIndex(i => i.id === key);
    const editing = data[index]
    setIsEditing(true)

    setForm({
      id: editing.id,
      name: editing.name,
      start: editing.start,
      end: editing.end,
      goal: editing.goal,
      level: editing.level
    })

    setModal(true)
  }

  const handleLevel = (key, value) => {
    console.log(key,value)
    const modifiedData = data
    const index = modifiedData.findIndex(i => i.id === key);

    modifiedData[index].level = value

    console.log(modifiedData)

    setData(modifiedData)
  }

  const deleteEntry = (key) => {
    const modifiedData = data
    const index = modifiedData.findIndex(i => i.id === key)

    modifiedData.splice(index, 1)

    setData(modifiedData)
  }

  const listProgresses = data.map((item, index = 0) => {
    return(
      <ProgressBar key={item.id} data={item} handleChange={handleLevel} editButton={startEdit} deleteButton={deleteEntry}/>
    )
  })

  const closeModal = () => {
    setModal(false)
    setIsEditing(false)
    setForm({
      id: dataIndex,
      name: "",
      start: "",
      end: "",
      goal: 0,
      level: "0"
    })
  }

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
        <Modal form={form} handleChange={handleForm} open={modal} onClose={closeModal} onSave={handleSave}/>
      </div>
  )
}

export default App;
