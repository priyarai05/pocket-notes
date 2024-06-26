import {React, useState, useEffect} from 'react'
import styles from './Homepage.module.css'
import home_image from '../assets/image1.png'
import { IoMdAddCircle } from "react-icons/io";
import Modal from './Modal';
import NoteArea from './NoteArea';

function Homepage() {
    
    const localItems = () => {
        if(localStorage.getItem('notes')){
            return JSON.parse(localStorage.getItem('notes'))
        }else{
            return []
        }
    }
    const [notes, setNotes] = useState(localItems())
    const [notesGroup, setNotesGroup] = useState({groupName:'',colorIndex:''})
    const [showModal, setShowModal] = useState(false)
    const [selectedNote, setSelectedNote] = useState('')
    const [isActive, setIsActive] = useState(false)
    const [isLeftVisible, setIsLeftVisible] = useState(true)

    const colors = [
        "#B38BFA",
        "#FF79F2",
        "#43E6FC",
        "#F19576",
        "#0047FF",
        "#6691FF"
    ]

    useEffect(() => {
        if(notes){
            localStorage.setItem("notes", JSON.stringify(notes))
        }
    }, [notes])

    const handleCreate = () => {
        if(notesGroup.groupName !== '' && notesGroup.colorIndex !== ''){
            setNotes([...notes, notesGroup])
            setNotesGroup({groupName:'', colorIndex: ''})
            setShowModal(false)
        }
    }

    const colorPicker = (index) => {
        setNotesGroup({...notesGroup, colorIndex: index})
    }
    
    const openNote = (index) => {
        setSelectedNote(notes[index])
        if (window.innerWidth <= 568) {
            setIsLeftVisible(false);
        }
        setIsActive(true)
    }
    useEffect(() => {
        function handleResize() {
            if (window.innerWidth <= 568) {
                setIsLeftVisible(true);
                // setIsActive(false);
            }
        }

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const closePage = () => {
        setIsLeftVisible(true);
        // setIsActive(false)
    }

  return (
    <div className={styles.page}>
        <div className={isLeftVisible ? styles.left : `${styles.left} ${styles.hide}`}>
            <h2 className={styles.heading}>Pocket Notes</h2>
            <div>
                {
                    notes?.map((note, index) =>{
                        return (
                            <div key={index} className={styles.notes} onClick={() => openNote(index)}>
                                <div className={styles.shortName} style={{backgroundColor: colors[note.colorIndex]}}>
                                {
                                    note.groupName.split(' ')[0].charAt(0).toUpperCase() + note.groupName.split(' ')[note.groupName.split(' ').length - 1].charAt(0).toUpperCase()
                                }
                                </div>
                                <div>{note.groupName}</div>
                            </div>
                        )
                    })
                }
            </div>
            <IoMdAddCircle size={70} className={styles.addnotes} onClick={() => setShowModal(true)}/>
        </div>
        {selectedNote && (
                <div className={isActive ? styles.right : styles.hide}>
                    <NoteArea selectedNote={selectedNote} colors={colors} closePage={closePage} />
                </div>
            )}
            {!selectedNote && (
                <div className={styles.centerPage}>
                    <div className={styles.Homepage}>
                        <img src={home_image} alt="" />
                        <h1>Pocket Notes</h1>
                        <p>
                            Send and receive messages without keeping your phone online. <br /> Use
                            Pocket Notes on up to 4 linked devices and 1 mobile phone
                        </p>
                    </div>
                </div>
                
            )}
        {showModal && <Modal colors={colors} notesGroup={notesGroup} setNotesGroup={setNotesGroup} colorPicker={colorPicker} handleCreate={handleCreate} setShowModal={setShowModal} />}
    </div>
  )
}

export default Homepage