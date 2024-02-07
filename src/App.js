import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
function App() {
  const [student, setStudent] = useState({ fullName: "", email: '', contactNo: '', address: '', age: '', hobby: [], gender: '' });
  const [isEdit, setISEdit] = useState(-1)
  const [records2, setReecords] = useState(JSON.parse(localStorage.getItem('localdata')) || []);
  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value })
  }
  const handleSubmit = () => {
    if (isEdit !== -1) {
      axios.put(`https://jsonplaceholder.typicode.com/posts/${isEdit}`, student)
        .then((res) => console.log(res))
        .catch((e) => console.log(e))
    }
    else {
      setReecords([...records2, student]);
      axios.post("https://jsonplaceholder.typicode.com/posts", student)
        .then((res) => console.log(res))
        .catch((e) => console.log(e))
    }
    localStorage.setItem('localdata', JSON.stringify([...records2, student]))
  }
  console.log(student);
  console.log(records2);
  const handleDelete = (index) => {
    axios.delete(`https://jsonplaceholder.typicode.com/posts/${index}`)
      .then((res) => console.log(res))
      .catch((e) => console.log(e))
  }
  useEffect(() => {
    // get data from server
    axios.get("https://jsonplaceholder.typicode.com/users")
      .then((res) => console.log(res.data))
      .catch((e) => console.log(e))
  }, [])
  const handleEdit = (index, item) => {
    setISEdit(index);
    setStudent(item)
  }
  return (
    <div className="App">
      <div>
        Fullname:<input type="text" id="Fullname" name="fullName" placeholder="Enter your Fullname" value={student.fullName} onChange={(e) => handleChange(e)} />
      </div>
      <div>
        Email:<input type="text" id="Email" name="email" placeholder="Enter your Email" value={student.email} onChange={(e) => handleChange(e)} />
      </div>
      <div>
        ContactNo:<input type="tel" id="ContactNo" name="contactNo" placeholder="Enter your Contact No" onChange={(e) => handleChange(e)} value={student.contactNo} />
      </div>
      <div>
        Address:<input id="Address" name="address" placeholder="Enter your Address" onChange={(e) => handleChange(e)} value={student.address} />
        <input type="submit" value="Submit" onClick={handleSubmit} />
        <table>
          <thead>
            <tr>
              <th>Full name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Age</th>
              <th>Gender</th>
            </tr>
          </thead>
          <tbody>
            {records2.map((item, index) => {
              return (
                <tr>
                  <td>{item.fullName}</td>
                  <td>{item.email}</td>
                  <td>{item.address}</td>
                  <td>{item.age}</td>
                  <td>{item.gender}</td>
                  <td><button onClick={(e) => handleDelete(index)}>Delete</button></td>
                  <td><button onClick={(e) => handleEdit(index, item)}>Edit</button></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <img src={logo} className="App-logo" alt="logo" />
    </div>
  );
}

export default App;
