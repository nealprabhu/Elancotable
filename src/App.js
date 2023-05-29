import React, { useEffect, useState } from 'react';
import { MDBDataTable, } from 'mdbreact';
import './App.css';


const DATA_URL = "https://engineering-task.elancoapps.com/api"

function App() {
  const [val, setVal] = useState([]);
  const [app, setApp] =  useState([]);
  const [resource, setResource] =  useState([]);

  const onApplicationChangeHandler = (event) => {
    console.log("User Selected Value  Application- ", event.target.value)
    fetch(`${DATA_URL}/applications/${event.target.value}`)
    .then((response)=> response.json())
    .then((result)=> setVal(result))
    .catch(error => console.log("Test",error));
}

const onResourceChangeHandler = (event) => {
  fetch(`${DATA_URL}/resources/${event.target.value}`)
  .then((response)=> response.json())
  .then((result)=> {
    setVal(result)
  })
  .catch(error => console.log(error))
}

  useEffect(()=>{
    const getTableData = ()=>{
    fetch(`${DATA_URL}/raw`)
    .then((response)=> response.json())
    .then((result)=> setVal(result))
    .catch(error => console.log(error))
    }

    const getAppData = ()=>{
      fetch(`${DATA_URL}/applications`)
      .then((response)=> response.json())
      .then((result)=> setApp(result))
      .catch(error => console.log(error))
    }

    const getResData = ()=>{
      fetch(`${DATA_URL}/resources`)
      .then((response)=> response.json())
      .then((result)=> setResource(result))
      .catch(error => console.log("Prabhus",error))
    }

    getTableData();
    getAppData();
    getResData();
  },[])
    const data = {
      columns: [
        {
          label: 'ConsumedQuantity',
          field: 'ConsumedQuantity',
          sort: 'asc',
          width: 150
        },
        {
          label: 'Cost',
          field: 'Cost',
          sort: 'asc',
          width: 270
        },
        {
          label: 'Date',
          field: 'Date',
          sort: 'asc',
          width: 200
        },
        {
          label: 'MeterCategory',
          field: 'MeterCategory',
          sort: 'asc',
          width: 100
        },
        {
          label: 'ResourceGroup',
          field: 'ResourceGroup',
          sort: 'asc',
          width: 150
        },
        {
          label: 'ResourceLocation',
          field: 'ResourceLocation',
          sort: 'asc',
          width: 100
        }
      ],
      rows: val
    };
  return (
    <div>
    <div class="box">
        <select onChange={onApplicationChangeHandler}>
          <option>Choose Application</option>
          {app.map((option, index) => {
            return <option key={index} >
              {option}
            </option>
          })}
        </select>
        <select onChange={onResourceChangeHandler}>
          <option>Choose Resource</option>
          {resource.map((option, index) => {
            return <option key={index} >
              {option}
            </option>
          })}
        </select>
    </div>
    <MDBDataTable
      striped
      bordered
      small
      data={data}
    />
    </div>
  );
}

export default App;
