import React, { useEffect, useState } from 'react'
import db, {storage} from './firebase'

export const App = () => {
  const [file, setFile] = useState(null)
  const [name, setName] = useState('')
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    db.collection('userData')
    .onSnapshot((snap) => {
      setData(snap.docs.map((doc) => {
        return (doc.data())
      }))
    })
  }, [])
  const onChange = (e) => {
    setFile(e.target.files[0])
  }
  const onSubmit = async(e) => {
    e.preventDefault()
    if(file === null || name === '') {
      alert('All fields are required')
      return
    }
    const storageRef = storage.ref()
    const fileRef = storageRef.child(file.name)
    setLoading(true)
    await fileRef.put(file)
    setLoading(false)
    const fileUrl = await fileRef.getDownloadURL()
    const getType = () => {
      let type
      if(file.type.includes('image')){
        type = "image"
      }
      else if(file.type.includes('pdf')){
        type = "pdf"
      }
      else if(file.type.includes('officedocument')){
        type = "word"
      }
      else if(file.type.includes('msword')){
        type = "word"
      }
      else if(file.type.includes('video')){
        type = 'video'
      }
      else if(file.type.includes('audio')){
        type = 'audio'
      }
      return type
    }
    db.collection('userData').add({
      text: name,
      link: fileUrl,
      type: getType()
    })
    setName('')
    setFile(null)
    // console.log(file.type)
  }
  const styles = {
    image: {
      height: "250px",
      width: "500px"
    },
    container: {
      padding: "25px"
    },
    form: {
      textAlign: "center",
      width: "25%",
      flexDirection: "column",
      display: "flex",
      margin: "0 auto",
      input: {
        padding: "10px",
        fontSize: "16px",
      }
    }, 
    card: {
      border: "2px solid black",
      padding: "10px",
      margin: "25px",
      width: "500px",
      borderRadius: "5px"
    },
    user: {
      textAlign: "center",
      fontSize: "18px",
    }
  }
  const mainData = 
  <div style={styles.container}>
  <form style={styles.form}>
    <input style={styles.form.input} type="file" onChange={onChange} />
    <input
      style={styles.form.input}
      placeholder="Enter Username"
      type="text" 
      value={name} 
      onChange={(e) => setName(e.target.value)}  
    />
    <input type="submit" onClick={onSubmit}/>
  </form>
  <div>
    {data.map((i) => {
      let uploads
      if(i.type === "image"){
        uploads = <img style={styles.image} src={i.link} alt="" />
      }
      else if(i.type === 'pdf'){
        uploads = <a href={i.link}>Open PDF</a>
      }
      else if(i.type === 'word'){
        uploads = <a href={i.link}>Download word file</a>
      }
      else if(i.type === 'audio'){
        uploads = <audio controls src={i.link}></audio>
      }
      else if(i.type === 'video'){
        uploads = <video controls height="250px" width="500px" src={i.link}></video>
      }
      return (
        <div style={styles.card} key={i.link}>
          {uploads}
          <p style={styles.user}>{i.text}</p>
        </div>
      )
    })}
  </div>
</div>
  return (
    <div>
      {loading?<p>uploading in progress, please wait</p>:mainData}
    </div>
  )
}


export default App;