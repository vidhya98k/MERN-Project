import logo from './logo.svg';
import './App.css';
import { useState ,useEffect} from 'react';
import Axios from 'axios';    


function App() {
  const[foodName, setFoodName]=useState('');
  const[description,setDescription]=useState('');

 
  const[foodList,setFoodList]=useState([]);
 
  const[newFoodName, setNewFoodName]=useState('');

  useEffect(() => {
    Axios.get('http://localhost:3001/read')
    .then((response) => {         
      setFoodList(response.data);
    })

  }, [])

  const addFoodData = () =>{
    Axios.post("http://localhost:3001/insert",
    {
      foodName:foodName, 
      description:description
    });
  };

const UpdateFoodData = (id) =>{
    Axios.put("http://localhost:3001/update", {
      id:id, newFoodName:newFoodName})
  }

  const DeleteData = (id) =>{
    Axios.delete(`http://localhost:3001/delete/${id}`)
      
  };


  return (
    <div className="App">
      <h1>CRUD - MERN</h1>
      <input type="text" placeholder="Food name" required 
      onChange={(event) => {setFoodName(event.target.value)}}/>
      <br></br><br></br>
      <input type="text" placeholder="Description" required
     onChange={(event) => {setDescription(event.target.value)}}/>
      <br></br><br></br>
      <button onClick={addFoodData}>Submit</button>
      <br></br><br></br>
      <table>
        <h3>Get Data from Database</h3>
        <tr>
          <th>FoodName</th>
          <th>Food Description</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
       
          {foodList.map((val,key) => {
            return    <tr>
       <td>{val.foodName}</td>
       <td>{val.description}</td>  
       <td>
        <input type="text" placeholder="update foodname"
        onChange={(event) => {
          setNewFoodName(event.target.value);
        }}></input>
        <button onClick={()=> UpdateFoodData(val._id)}>Edit</button>
        </td>
        <td>
          <button onClick={()=> DeleteData(val._id)}>Delete</button>
          </td> 
        
  
        </tr>
          })}
      </table>
    </div>
  );
}

export default App;
