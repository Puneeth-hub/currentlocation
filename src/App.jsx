import { useState } from 'react'
import axios from 'axios'


import './App.css'

function App() { 
  
  const [place, setPlace] = useState('')
  const [formData, setFormData] = useState({
    username: '', 
    email: '', 
    gender: '',
    place: '',
  }) 

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          

          
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            );
            const data = await response.json(); 
            const placeName = data.display_name || 'Unknown Location';
            setPlace(placeName);
            console.log('Location:', placeName);
          } catch (error) {
            console.error('Error fetching place location:', error);
            setPlace('Failed to fetch location');
          }
        },
        (error) => {
          console.error('Error fetching location:', error.message);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  const handleChnageForm = (e) => {
     const {name, value} = e.target
     setFormData((prevData)=>({
      ...prevData, 
      [name]: value,
     }))
     
  }
  
  const handleSubmit= async(e) =>{
    e.preventDefault(); 
    try{
     await axios.post('http://localhost:6500/api/new',{...formData, place: place || 'Unknown'}) 
     alert('Data successfully submitted') 
     
    }catch(error){
      console.error('Error submitting data:', error);
    }
    setFormData({
      username: '', 
      email: '',
      gender: ''
    })
    setPlace('')
  }
  return (
    <div className='parent-container'>
      <h1>User Location</h1> 
      <div className='child-container'>
      <form onSubmit={handleSubmit} className='for-section'>
        <label htmlfor='username'>UserName</label> 
        <input type='text' placeholder='Enter UserName' id='username' name='username' onChange={handleChnageForm} value={formData.username}/> 
        <label htmlfor='email'>Email</label> 
        <input type='email' placeholder='Enter Email' id='email' name='email' onChange={handleChnageForm} value={formData.email}/>
        <label htmlfor='gender'>Gender</label> 
        <input type='text' placeholder='Enter Gernder' id='gender' name='gender' onChange={handleChnageForm} value={formData.gender}/>
        
        <label htmlFor="place">Place</label>
        <input type="text" value={place} placeholder='Current Location' readOnly />
        <button type='button' onClick={getLocation}>Get Location</button>
        <button type='submit'>submit</button>
      </form>
      </div>
    </div>
  )
}


export default App
