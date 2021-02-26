import './App.css';
import React, { useEffect, useState } from "react";
import Axios from 'axios';


function App() {

  const [projectName, setProjectName] = useState('');
  const [tasks, setTasks] = useState(0);

  // to grap anything that is being added to update
  const [updateProjectName, setUpdateProjectName] = useState('');

  const [projectList, setProjectList] = useState([]);

  useEffect(() => {

    // getting the information
    Axios.get('http://localhost:8000/read').then((response) => {
      setProjectList(response.data);
    })
  }, []) // empty array means that we are going to call it only once

  const addToList = () => {
    //sending the information
    Axios.post('http://localhost:8000/insert', {
      projectName: projectName,
      tasks: tasks
    }) //in here we pass the routes that we have created
  }

  const updateProject = (id) => {
    // put is used for updating
    Axios.put('http://localhost:8000/update', {
      id: id,
      updateProjectName: updateProjectName,
      // countUpdate: countUpdate + 1
    })

  }

  const deleteProject = (id) => {
    Axios.delete(`http://localhost:8000/delete/${id}`, {
      id: id,
      updateProjectName: updateProjectName,
    })
  }

  // const completeProject = (id) => {
  //   Axios.put(`http://localhost:8000/complete/${id}`,{
  //     id: id,
  //     countComplete: countComplete + 1
  //   })
  // }

  return (
    <div className="App">
      <div className="container">
        <img src="https://d2slcw3kip6qmk.cloudfront.net/marketing/blog/2016Q4/8-steps-to-build-a-project-management-timeline@2x.png" alt="project" />
      </div>
      <h1 className="centered">
        PROJECT ALLOTMENNT
      </h1>
      <div className="goto">
        <a href="#new" type="button" class="btn btn-outline-dark">NEW PROJECTS</a> {" "}
        <a href="#old" type="button" class="btn btn-outline-dark">OLD PROJECTS</a>
      </div>


      <h1 id="new">
        NEW PROJECT
      </h1>


      <div className="allotment-div">
        <label>Project Name : </label>
        <input type="text" onChange={(event) => {
          setProjectName(event.target.value) // it is the value of the current input
        }} />

        <label>Tasks : </label>
        <input type="text" onChange={(event) => {
          setTasks(event.target.value) // it is the value of the current input
        }} />

      <button type="button" class="btn btn-success" onClick={addToList}>Add Project Task</button>
      <hr/>
      <div>
        <h4>On Going Projects : {projectList.length} </h4>
        {/* <h4>Total Complete projects: {countComplete} </h4> */}
      </div>
      </div>
      <hr/>

      <h1 id="old">Project List</h1>

      {/* mapping throw the projects */}
      <div className="project-div">
        {projectList.map((val, key) => {
          return (
            <div key={key} className="project">
              <div className="card">
                <div className="card-header">
                {val.projectName}
                </div>
                <div className="card-body">
                  <h5 className="card-title">  </h5>
                  <h5 className="card-title">Project tasks : </h5> <p>{val.tasks}</p>
                  <input
                    type="text"
                    placeholder="Update?"
                    onChange={(event) => {
                      setUpdateProjectName(event.target.value) // constantly changing the value also
                    }}
                  />
                  <h6>No. of times updated: {val.update} </h6>
                </div>
                
              </div>
              <button type="button" class="btn btn-warning" onClick={() => updateProject(val._id)} >Update</button> 
              <button type="button" class="btn btn-danger" onClick={() => deleteProject(val._id)}> Delete </button>
              {/* <button type="button" class="btn btn-success" onClick={() => completeProject(val._id)}> Complete </button> */}
            </div>
          );
        })}
      </div>

    </div>
  );
}

export default App;
