import React from 'react'
import ReactDom from 'react-dom'

const Modal = ({mode, form, handleChange, open, onClose, onSave, children}) => {
	if (!open) return null
	return ReactDom.createPortal(
		<>
			<div className="modal-overlay">
				<div className="modal">
					<h2>{mode === false ? "New Battle Pass tracking" : "Edit Battle Pass Tracking"}</h2>

					<div className="form-table">
						<label htmlFor="name">Tracker name</label>
						<input type="text" name="name" value={form.name} onChange={handleChange}></input>

						<label htmlFor="start">Start date</label>
						<input type="date" name="start" value={form.start} onChange={handleChange}/>

						<label htmlFor="end">End date</label>
						<input type="date" name="end" value={form.end} onChange={handleChange}/>

						<label htmlFor="time">Time</label>
						<input type="time" name="time" value={form.time} onChange={handleChange}/>
						
						<label htmlFor="goal">Level goal</label>
						<input type="number" name="goal" value={form.goal} onChange={handleChange}/>

						<label htmlFor="increment">Increment amount</label>
						<input type="number" name="increment" value={form.increment} onChange={handleChange}/>
					</div>

					<div className="modal-buttons-container">	
						<button onClick={onSave}>Save</button>
						<button onClick={onClose}>Cancel</button>
					</div>
				</div>
			</div>
		</>,
		document.getElementById('portal')
	)
}

export default Modal
 