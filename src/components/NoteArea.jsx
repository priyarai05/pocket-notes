import {React, useState, useEffect, useRef} from 'react'
import { IoSend } from "react-icons/io5";
import { BsDot } from "react-icons/bs";
import { IoArrowBack } from "react-icons/io5";
import styles from './NoteArea.module.css';

function NoteArea({selectedNote, colors, closePage}) {

    const getNotesHist = () =>{
        if(localStorage.getItem("noteBody")){
            return JSON.parse(localStorage.getItem("noteBody"))
        }
        else{
            return {}
        }
    }
    const [noteBody, setNoteBody] = useState(getNotesHist())
    const [notesDesc, setNotesDesc] = useState({text:'', date:'', time:''})
    
    const handleSend = () => {
        if(notesDesc){
            const newData = { text: notesDesc.text, date:formatDate(), time: formatTime() };
            setNoteBody((prevNotes) => ({
                ...prevNotes,
                [selectedNote.groupName]: [...(prevNotes[selectedNote.groupName] || []), newData],
            }));
            console.log(noteBody)
            setNotesDesc({text:'', date:'', time:''})
        }  
    }
    useEffect(() => {
        if(localStorage.getItem('noteBody'))
        {
            setNoteBody(JSON.parse(localStorage.getItem('noteBody')))
        }
    },[])

    useEffect(() => {
        if(noteBody){
            localStorage.setItem('noteBody', JSON.stringify(noteBody))
        }
    },[noteBody])

    const notesContainerRef = useRef(null);
    useEffect(() => {
        if (notesContainerRef.current) {
          notesContainerRef.current.scrollTop = notesContainerRef.current.scrollHeight;
        }
      }, [noteBody]);

    const handleChange = (e) => {
        setNotesDesc({...notesDesc, text: e.target.value, date:formatDate(), time:formatTime()})
    }

    const formatDate = () => {
        const formattedDate =  new Date().toLocaleString('en-IN',{
            day:'numeric',
            month: 'long',
            year: 'numeric'
        })
        return formattedDate
    }

    const formatTime = () => {
        const formattedTime = new Date().toLocaleString('en-IN',{
            hour:'numeric',
            minute: 'numeric',
            hour12: true
        })
        return formattedTime
    }
  return (
    <div className={styles.notesPage}>
        <div className={styles.header}>
            <div className={styles.notesPageHeader}>
                <div className={styles.notesPageHeaderLeft}>
                    <IoArrowBack onClick={closePage} className={styles.backArrow} />
                </div>
                <div className={styles.shortName} style={{backgroundColor: colors[selectedNote.colorIndex]}}>
                {
                    selectedNote.groupName.split(' ')[0].charAt(0).toUpperCase() + selectedNote.groupName.split(' ')[selectedNote.groupName.split(' ').length - 1].charAt(0).toUpperCase()
                }
                </div>
                <div>{selectedNote.groupName}</div>
            </div>
        </div>
        <div className={styles.notebody} ref={notesContainerRef}>
            { noteBody[selectedNote.groupName]?.map((note, index) => {
                return(
                    <div key={index} className={styles.noteTiles}>
                        <div className={styles.noteTilesText}>{note.text}</div>
                        <div className={styles.noteTilesFooter}>
                            <div>{note.date}</div>
                            <BsDot />
                            <div>{note.time}</div>
                        </div>
                    </div>
                )
            })
            }
        </div>
        <div className={styles.footer}>
            <textarea className={styles.input} name="desc" value={notesDesc.text} cols="30" rows="10"
             placeholder='Enter your text here......' onChange={handleChange}></textarea>
            <IoSend className={styles.send} onClick={handleSend} style={{color: notesDesc.text ? '#16008B': '#ABABAB' }}/>
        </div>
    </div>
  )
}

export default NoteArea