import {React} from 'react'
import styles from './Modal.module.css'

function Modal({colors, notesGroup, setNotesGroup, handleCreate, colorPicker}) {
    
    
  return (
    <div className={styles.modalBackground}>
        <div className={styles.modalContainer}>
            <h1>Create New group</h1>
            <div className={styles.group}>
                <label htmlFor='groupname' className={styles.nameLabel}>Group Name</label>
                <input id='groupname' type="text" value={notesGroup.groupName}
                 placeholder='Enter Group Name' className={styles.nameInput}
                 onChange={(e) => setNotesGroup({...notesGroup, groupName: e.target.value})} />
            </div>
            <div className={styles.colorPicker}>
                <h1 className={styles.nameLabel}>Choose Color</h1>
                <div className={styles.colorList}>
                    {colors.map((color, index) => {
                        return(
                            <div key={index} className={styles.color} style={{backgroundColor: color}}
                            onClick={() => colorPicker(index)}></div>
                        )
                    })}
                </div>
            </div>
            <div>
                <button onClick={handleCreate} className={styles.createButton}>Create</button>
            </div>
        </div>
    </div>
  )
}

export default Modal