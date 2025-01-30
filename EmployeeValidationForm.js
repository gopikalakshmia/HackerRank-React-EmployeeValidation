import React, { useState } from "react";

function EmployeeValidationForm() {
  const[data,setData]=useState({});
  const [errror,setError]=useState({nameError:true,emailError:true,empIDError:true,dateError:true});
  const handleValues=(event,identifier)=>{
    const val=event.target.value;
    if(identifier==='name'){
      let regex=/^[A-Za-z]+$/
      if(val.length>4 && regex.test(val) ){
        setData(prevVal=>{ return {...prevVal,name:val}})
        setError(prevVal=>{return {...prevVal,nameError:false}})
      }
      else
      {
        setError(prevVal=>{return {...prevVal,nameError:true}})
      }
    }
    if(identifier==='email'){
      let regex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(regex.test(val)){
        setData(prevVal=>{ return {...prevVal,email:val}})
        setError(prevVal=>{return {...prevVal,emailError:false}})
      }
      else
      {
        setError(prevVal=>{return {...prevVal,emailError:true}})
      }
    }
    if(identifier==='empID'){
      if(val.length===6){
        setData(prevVal=>{ return {...prevVal,empID:val}})
        setError(prevVal=>{return {...prevVal,empIDError:false}})
      }
      else
      {
        setError(prevVal=>{return {...prevVal,empIDError:true}})
      }
    }
    if(identifier==='date'){
      if(new Date(val)<=Date.now()){
        setData(prevVal=>{ return {...prevVal,date:val}})
        setError(prevVal=>{return {...prevVal,dateError:false}})
      }
      else
      {
        setError(prevVal=>{return {...prevVal,dateError:true}})
      }
    }
  }
  return (
    <div className="layout-column align-items-center mt-20 ">
      <div className="layout-column align-items-start mb-10 w-50" data-testid="input-name">
        <input
          className="w-100"
          type="text"
          name="name"
          value={data.name}
          placeholder="Name"
          data-testid="input-name-test"
          onChange={()=>{handleValues(event,'name')}}
        />
        
        {errror.nameError &&<p className="error mt-2">
          Name must be at least 4 characters long and only contain letters and spaces
        </p>}
      </div>
      <div className="layout-column align-items-start mb-10 w-50" data-testid="input-email">
        <input
          className="w-100"
          type="text"
          name="email"
          value={data.email}
          placeholder="Email"
          onChange={()=>{handleValues(event,'email')}}
        />
        {errror.emailError &&<p className="error mt-2">Email must be a valid email address</p>}
      </div>
      <div className="layout-column align-items-start mb-10 w-50" data-testid="input-employee-id">
        <input
          className="w-100"
          type="text"
          name="employeeId"
          value={data.empID}
          placeholder="Employee ID"
          onChange={()=>{handleValues(event,'empID')}}
        />
      {errror.empIDError &&  <p className="error mt-2">Employee ID must be exactly 6 digits</p>}
      </div>
      <div className="layout-column align-items-start mb-10 w-50" data-testid="input-joining-date">
        <input
          className="w-100"
          type="date"
          name="joiningDate"
          value={data.date}
          placeholder="Joining Date"
          onChange={()=>{handleValues(event,'date')}}
        />
       { errror.dateError && <p className="error mt-2">Joining Date cannot be in the future</p>}
      </div>
      <button data-testid="submit-btn" type="submit" disabled={errror.nameError||errror.emailError||errror.empIDError ||errror.dateError||!data.name||!data.email||!data.empID||!data.date}>
        Submit
      </button>
    </div>
  );
}

export default EmployeeValidationForm;
