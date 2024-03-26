// import * as React from 'react';

import TextField from '@mui/material/TextField';
import { Container, Paper,Button} from '@mui/material';
import React,{useEffect, useState} from 'react';

export default function Student() {
    const paperStyle={padding:'50px 20px', width:600,margin:"20px auto"}
    const [name,setName]=useState('')
    const [address,setAddress]=useState('')
    const [students,setStudents]=useState([])


    const handleClick=(e)=>{
        e.preventDefault()
        const student={name,address}
        console.log(student)
        fetch("http://localhost:8081/student/add",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(student)
     } ).then(()=>{
        console.log("New Student Added...")
     })
    }
    useEffect(()=>{
        fetch("http://localhost:8081/student/getAll")
        .then(res=>res.json())
        .then((result)=>{
            setStudents(result);
        }
    )},[])
  return (
  <Container>
    <Paper elevation={3} style={paperStyle}>
        <h1 style={{color:"blue"}}><u>Add Student</u> </h1>
    <form
      component="form"
      sx={{
        '& > :not(style)': { m: 3, width: '30ch' },
      }}
      noValidate
      autoComplete="off">
      <TextField id="standard-basic" label="Student Name" variant="standard"  fullWidth
      value={name}
      onChange={(e)=>setName(e.target.value)}
      />
      <TextField id="standard-basic" label="Student Address" variant="standard"  fullWidth
      value ={address}
      onChange={(e)=>setAddress(e.target.value)}
      />
   <Button variant="contained" color="success" style={{ margin: '30px' }} onClick={handleClick}>
      Submit
    </Button>
    </form>
   
    </Paper>
    <h1>Students</h1>

    <Paper elevation={3} style={paperStyle}>

      {students.map(student=>(
        <Paper elevation={6} style={{margin:"10px",padding:"15px", textAlign:"left"}} key={student.id}>
         Id:{student.id}<br/>
         Name:{student.name}<br/>
         Address:{student.address}

        </Paper>
      ))
}


    </Paper>


    </Container>
  );
}
