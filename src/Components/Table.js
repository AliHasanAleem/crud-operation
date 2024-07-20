import React, { useEffect } from 'react'
import EmployeeData from './userData';
import  {useState} from  'react';



function DataTable()
{

  const  [data,setData]=useState([]);


  const [id,setId]= useState ('');
  const [name,setName]= useState('');
  const [age,setAge]= useState('');
  const [isUpdate,setIsUpdate]= useState(false);



  useEffect(()=>{
    setData(EmployeeData);
},[]);



const handleEdit=(id)=>
{


  const dt=data.filter(item=> item.id===id);
  if(dt)
  {
   setIsUpdate(true);
   setId(Number(dt[0].id));
   setName(dt[0].Name);
   setAge(dt[0].Age);
  }
}
const handleSave = () => {
  const newData = {
    srNo: data.length + 1,
    id: Number(id),
    Name: name,
    Age: age,
  };
  setData([...data, newData]);
  clear();
};

// const handleUpdate=()=>{
 
//   const index=data.map((item)=>{
//       return item.id;
//   }).indexOf(id);


//   const  dt=[...data];
//   dt[index].id=id;
//   dt[index].Name=name;
//   dt[index].Age=age;

//   setData(dt);
//   clear();
// }



const handleUpdate = () => {
  const index = data.findIndex((item) => Number(item.id) === Number(id));

  if (index !== -1) {
    const dt = [...data];
    dt[index].id = Number(id);
    dt[index].Name = name;
    dt[index].Age = age;

    setData(dt);
    clear();
  } else {
    alert('Item not found');
  }
};




const clear=()=>{
  setId('');
  setName('');
  setAge('');
  setIsUpdate(false);
}

const handleDelete=(id)=>{
   if(id>0){
    if(window.confirm("Are you sure you want to delete this "))
    {
      const dt=data.filter(item=>item.id!==id);
      setData(dt);
    }
   }
  }

  return (
    <div className='DataTable'>
    <div style={{display:"flex",justifyContent:'center',paddingRight:'50vh'}} >
      <label >Id:
        <input type='text' placeholder='Enter the Id' onChange={(e)=>setId(e.target.value)}  value={Number(id)} />
      </label>
      <label > Name:
        <input type='text' placeholder='Enter the first name' onChange={(e)=>setName(e.target.value)}  value={name}/>
      </label>
      <label >Age:
        <input type='text' placeholder='Enter Age'   onChange={(e)=>setAge(e.target.value)} value={age}/>
      </label>   s
      
      <div>
        {
          !isUpdate ?
          <button className='btn btn-primary' onClick={()=>handleSave()} > Save</button>
          :
          <button className='btn btn-primary' onClick={()=>handleUpdate()} > Update</button>

        }
      
      <button className='btn btn-danger' onClick={()=>clear()}>Clear</button>
      </div>

    </div>


        <table className='table table-striped'>
            <thead>
                <tr>
                    <th>Sr.No</th>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Age</th>
                </tr>
            </thead>

            <tbody>  
             
            {
              data.map((item, index) => (
              <tr key={index}>
                  <>
                  <td>{item.srNo}</td>
                  <td>{item.id}</td>
                  <td>{item.Name}</td>
                  <td>{item.Age}</td>

                  <td>
                    <button className='btn btn-primary' onClick={()=>handleEdit(item.id)} style={{marginRight:'10px'}}> Edit</button>
                    <button className='btn btn-danger' onClick={()=>handleDelete(item.id)} style={{marginLeft:'10px'}}>Delete</button>
                  </td> 

                  </>
               </tr>
             
          ))}  
            </tbody>
        </table>
    </div>
  )
}

export default DataTable;
