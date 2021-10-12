import axios from 'axios'
import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [images, setImages] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3104/images/')
         .then((response) => {
           setImages(response.data.files)
         })
  }, [])

  console.log("Images", images)

  return (
    <div className="App">
      <h2>Upload an image</h2>
      <form action="http://localhost:3104/images/"
            method='POST' 
            encType="multipart/form-data">

        File: <input type='file' name='imageFile'/>
        <input type='submit'/>
      </form>



      <h2>List of images</h2>
      <ul>
        {images.map((i) => (<li key={i}><img src={`http://localhost:3104${i}`} width='100'/></li>))}
      </ul>
    </div>
  );
}

export default App;
