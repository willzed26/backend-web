import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [item, setItem] = useState({
    title: "",
    description: "",
    date: "",
    file: File,
  });
  const [items, setItems] = useState([
    {
      title: "",
      description: "",
      date: "",
      file: File,
      _id: "",
    },
  ]);

  const [isPut, setIsPut] = useState(false);
  const [updatedItem, setUpdatedItem] = useState({
    title: "",
    description: "",
    date: "",
    file: File,
    id: "",
  });

  useEffect(() => {
    fetch("/items")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((jsonRes) => setItems(jsonRes))
      .catch((err) => console.log(err));
  }, [items]);

  function handleChange(event) {
    const { name, value } = event.target;
    setItem((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  }

  function addItem(event) {
    event.preventDefault();
    const newItem = {
      title: item.title,
      description: item.description,
      date: item.date,
      file: item.file,
    };

    axios.post("/newitem", newItem);
    console.log(newItem);
    alert("item added");

    setItem({
      title: "",
      description: "",
      date:"",
      file:File,
    });
  }

  function deleteItem(id) {
    axios.delete("/delete/" + id);
    alert("item deleted");
    console.log(`Deleted assignment with id ${id}`);
  }

  function openUpdate(id) {
    setIsPut(true);
    setUpdatedItem((prevInput) => {
      return {
        ...prevInput,
        id: id,
      };
    });
  }

  function updateItem(id) {
    axios.put("/put/" + id, updatedItem);
    alert("Assignment updated");
    console.log(`Assignment with id ${id} updated`);
  }

  function handleUpdate(event) {
    const { name, value } = event.target;
    setUpdatedItem((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
    console.log(updatedItem);
  }

  return (
    <div className="App">
      {!isPut ? (
        <div className="main">

          <div className="menuBar">
            <h5><b>Nama Kelas : Web Prog</b></h5>

            <a href ="classnotebook.html">
                <p> Back To Menu </p>
                <br></br>
            </a>

            <a href ="classnotebook.html">
                <p style={{fontWeight: "bold", color: "lime",fontSize:"22px"}}>Class Notebook</p>
            </a>
        
            <a href ="./views/assignment.html">
                <p>Assignments</p>
            </a>
        
            <a href ="grades.html">
                <p>Grades</p>
            </a>
            
            <hr />
            <p style={{fontWeight: "bold", color: "lime",fontSize:"22px"}}>Channels</p>
            <a href ="TampilanDalamKelas.html">
                <p>General</p>
            </a>
          </div>

     <div className="navbaratas">
        <ul>
            <li style={{color: "white", fontSize:"25px"}}><b>Assignments</b></li>
            <li style={{float:"left"}}><a href="#refresh" style={{color: "white"}}><i data-feather="refresh-cw"></i></a></li>
            </ul>
        <hr />
    </div>

        <div className="create">
        <h2>Create Assignment</h2>
        <form action="" method="post">
            <div class="form-part">
                <label style={{marginRight:"10%"}}>Assignment Title</label>
                <input class="form-input" name="title" type="text" placeholder="Please Fill Me" value={item.title} onChange={handleChange} autofocus required></input>
            </div>
            <div class="form-part">
                <label style={{marginRight:"6%"}}>Assignment Description</label><br></br><br></br>
                <textarea class="form-input" name="description" rows="6" cols="70" placeholder="Type Something For Your Student" value={item.description} onChange={handleChange}></textarea>
            </div>
            <div class="form-part">
                <label style={{marginRight:"19%"}}>Due Date</label>
                <input class="form-input" name="date" type="text" placeholder="DD/MM/YYYY" value={item.date} onChange={handleChange} required></input>
            </div>
            <div class="form-part">
                <label style={{marginRight:"17%"}}>Upload File</label>
                <input class="form-input" name="file" type="file" value={item.file} onChange={handleChange}></input>
            </div>
            <div class="form-part">
                <input class="btn btn-success" type="submit" value="Submit" onClick={addItem}></input>
                <input class="btn btn-danger" type="reset" value="Cancel"></input>
            </div>
        </form>
        </div>
        </div>
        ) : (
        <div className="update" >
          <input
            onChange={handleUpdate}
            name="title"
            value={updatedItem.title}
            placeholder="Assignment Title"
          ></input>
          <input
            onChange={handleUpdate}
            name="description"
            value={updatedItem.description}
            placeholder="Description"
          ></input>
          <input
            onChange={handleUpdate}
            name="date"
            value={updatedItem.date}
            placeholder="Date"
          ></input>
          <button onClick={() => updateItem(updatedItem.id)}>
            Update Assignment
          </button>
        </div>
      )}
      {items.map((item) => {
        return (
          <div
            key={item._id}
            style={{ backgroundColor: "gray", width: "90%", margin: "auto auto"}}
          >
            <a href =" "><p style={{fontWeight:"bolder",fontSize:"25px", marginLeft: "10px"}}>{item.title}</p></a>
            <p style={{fontWeight:"400", marginLeft: "10px"}}>{item.description}</p><br></br>
            <p style={{fontWeight:"700", marginLeft: "10px"}}>Due Date: {item.date}</p>
            <button onClick={() => deleteItem(item._id)} style={{backgroundColor:"red"}}>DELETE</button>
            <button onClick={() => openUpdate(item._id)} style={{backgroundColor:"yellow"}}>UPDATE</button>
          </div>
        );
      })}
    </div>
  );
}

export default App;