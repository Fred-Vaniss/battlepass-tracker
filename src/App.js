import React, {useState, useEffect, useRef} from 'react';
import ProgressBar from './components/ProgressBar';
import Modal from './components/Modal';
// import { arrayMove } from 'array-move'

const App = () => {
  const [dataIndex, setIndex] = useState(1)
  const [data,setData] = useState([]);
  const firstLoad = useRef(true);

  if (firstLoad.current) {
    
    const storage = JSON.parse(localStorage.getItem("BattlePassTracker"))

    if (storage !== null) {
      setIndex(storage.index)
      setData(storage.data)
    }
    
    firstLoad.current = false;
  }

  const [form,setForm] = useState({
    name: "",
    start: "",
    end: "",
    time: "",
    goal: 0,
    level: "0",
    increment: "1"
  });
  const [isEditing,setIsEditing] = useState(false);
  const [modal,setModal] = useState(false);
  const [lastChange, setLastChange] = useState([0,0])

  const handleForm = e => {
    const name = e.target.name;
    const value = e.target.value;

    setForm({ ...form, [name]: value })
    if (isEditing === false) {
      setForm((prevState) => ({
        ...prevState, id: dataIndex
      }))
    }
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
      setLastChange([key,"edit"])
    }
    setForm({
      name: "",
      start: "",
      end: "",
      time: "",
      goal: 0,
      level: "0",
      increment: 1
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
      time: editing.time,
      goal: editing.goal,
      level: editing.level,
      increment: editing.increment
    })

    setModal(true)
  }

  const handleLevel = (key, value) => {
    const modifiedData = data
    const index = modifiedData.findIndex(i => i.id === key);

    modifiedData[index].level = value

    setData(modifiedData)
    setLastChange([index,modifiedData])
  }

  const deleteEntry = (key) => {
    const modifiedData = data
    const index = modifiedData.findIndex(i => i.id === key)

    modifiedData.splice(index, 1)

    setData(modifiedData)
    setLastChange([index,"deletion"])
  }

  const moveEntry = (key, direction) => {
    const arrayMove = require('array-move')
    const modifiedData = data
    const index = modifiedData.findIndex(i => i.id === key)
    let newIndex = index 

    direction === "up" ? newIndex-- : newIndex++
    
    const movedData = arrayMove(modifiedData, index, newIndex)
    setData(movedData)
    setLastChange([index,"moved"])
  }

  const listProgresses = data.map((item, index = 0) => {
    let position = ""

    if (data.length === 1 ) {
      position = "alone"
    } else if (index === 0) {
      position = "first"
    } else if (index === data.length-1) {
      position = "last"
    }

    return(
      <ProgressBar  key={item.id} 
                    data={item} 
                    handleChange={handleLevel} 
                    editButton={startEdit} 
                    deleteButton={deleteEntry}
                    moveButton={moveEntry}
                    position={position}/>
    )
  })

  const closeModal = () => {
    setModal(false)
    setIsEditing(false)
    setForm({
      name: "",
      start: "",
      end: "",
      time: "",
      goal: 0,
      level: "0",
      increment: 1
    })
  }

  useEffect(() => {
    const storage = {
      data: data,
      index: dataIndex
    }
    localStorage.setItem("BattlePassTracker", JSON.stringify(storage))
  }, [data,dataIndex,lastChange])

  return (
      <div className="container">
        <h1>Battle Pass tracker</h1>
        {listProgresses}
        <div className="add-container">
         <button onClick={() => setModal(true)}>Add battlepass</button>
        </div>
        <Modal mode={isEditing} form={form} handleChange={handleForm} open={modal} onClose={closeModal} onSave={handleSave}/>
      </div>
  )
}

export default App;
