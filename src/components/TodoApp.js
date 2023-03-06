import React, { useEffect, useRef, useState } from 'react'

function TodoApp() {
    // getting the todo list from localstorage if any 
    const localTodo = localStorage.getItem('todolist') ? JSON.parse(localStorage.getItem('todolist')) : [];
    
    const [list,setList]=useState(localTodo);
    const [input,setInput] = useState('');
    const inputRef  = useRef(null)
    // setting up the input
    const changeHandler=(event)=>{
        event.preventDefault();
        setInput(event.target.value)
    }
    // storing the value in an array
    const storeValue=(event)=>{
        event.preventDefault()
        setList([...list,{id:Math.random(),value:input,status:false}])
        setInput("")
    }
    // storing the value in localstorage everytime when there is a change in list
    useEffect(()=>{
        localStorage.setItem('todolist',JSON.stringify(list))
    },[list])
    // auto focus input field when page render
    useEffect(()=>{
        inputRef.current.focus();
    })
    // marking the completed todo item
    const checkList=(index)=>{
        setList(list.filter((ele)=>{
            if(ele.id===index){
                ele.status=true;
            }
            return ele;
        }))
    }
    // deleting a particular todo item
    const deleteList=(index)=>{
        setList(list.filter((ele)=>{
            return ele.id!==index?ele:'';
        }))
    }

  return (
    <div className='todo-container'>
        <div className="d-flex mt-5 w-75 p-3 d-flex flex-column">
            <h1 className='text-white w-100 fw-bold fs-1' style={{letterSpacing:'0.6rem'}}>TODO</h1>
            <form className='w-100' onSubmit={storeValue}>
            <input type="text" placeholder='Create a new task' className='w-100 py-2 px-3 my-3 border-0 text-white' style={{backgroundColor:'#25273C',outline:'none'}} ref={inputRef} value={input} onChange={changeHandler}/>
            </form>
            {list.length===0 ? 
                 <div className="items-container py-1 my-1 d-flex flex-column align-items-center justify-content-center" style={{backgroundColor:'#25273C'}}>
                   <lottie-player src="https://assets5.lottiefiles.com/packages/lf20_vwyNcK.json"  background="transparent"  speed="1"  style={{width: '300px',height: '300px'}} loop autoplay>
                   </lottie-player>
                   <p className='text-white fw-bold' style={{letterSpacing:"2px"}}>Add New <span style={{fontStyle:'italic'}}>TODO</span> Item</p>
                 </div>
                :
                <div className="items-container" style={{backgroundColor:'#25273C'}}>
                <ul className='p-0 m-0'>
                    {
                        list.map((li,index)=>(
                            <div className="d-flex align-items-center justify-content-center py-2 px-3" style={{borderBottom:'1px solid gray',color:'#d2d4d2'}} key={li.id}>
                                <i className={li.status===false?'fa-regular text-white fa-circle':'fa-regular text-white fa-circle-check text-muted'} style={{cursor:"pointer"}} onClick={()=>checkList(li.id)}></i>
                                 <li className={li.status===false?'w-100 fs-6 my-2 list-unstyled d-flex align-items-center px-2':'w-100 fs-6 my-2 list-unstyled d-flex align-items-center px-2 text-muted strike'} >{li.value}</li>
                                 <i className={"fa-regular fa-trash-can px-3"}  onClick={()=>{deleteList(li.id)}} style={{cursor:'pointer'}}></i>
                            </div>
                        ))
                     }
                </ul>
                </div>
            }
            
        </div>
    </div>
  )
}

export default TodoApp