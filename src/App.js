// import logo from './logo.svg';
import './App.css';
import { useState,useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { apifetch,getSelectedCountry } from './services/UserServices';
import 'react-big-calendar/lib/css/react-big-calendar.css';
const localizer = momentLocalizer(moment)
function App() {
 
  const [list,setList] = useState([])
  const [selectCnt,setSelctCnt] = useState("");
  const [mnth,setMnth] = useState(moment(Date.now()).format("MM"))
  const [hol,setHold] = useState([])
  const ApiCall=()=>{
      apifetch((res)=>{
        
        let arr = []
        res?.response?.countries?.forEach(element => {
          let obj = {}
          Object.keys(element).forEach((key)=>{
            if(key == 'iso-3166'){
              obj = {
                ...element,
                short:element[key]
              }
            }
           
          })
          arr.push(obj)
         
          
        });
        setList(arr)
      
      })
  }
  useEffect(()=>{
    ApiCall()
  },[])
  
const selectMnth = ()=>{
  getSelectedCountry(selectCnt,mnth).then((res)=>res.json())
  .then(({response:{holidays}})=>{
   
    let arr =[]
    if(holidays && holidays?.length > 0 ){
      holidays?.forEach((res,inx)=>{
        console.log("res",res)
        let obj = {
          id:inx,
          title:res?.name,
          start:new Date(res?.date?.datetime?.year,res?.date?.datetime?.month,res?.date?.datetime?.day),
          end:new Date(res?.date?.datetime?.year,res?.date?.datetime?.month,res?.date?.datetime?.day +1)
        }
        arr.push(obj)
      })
    }
    setHold(arr)
   
  })
}
console.log(hol)
 
  return (
    <div className="App">
      <select  className="select" onClick={(e)=>{setSelctCnt(e.target.value)
      
      selectMnth()
      }}>
       
        {list && list.length>0 ? list.map((res,inx)=>{
        
          return <option value={res.short} key={inx}  >
          {res.country_name}
          </option>
          
        }):<option >
         Country Not Found!
        </option>}
      
      
      </select>
      <Calendar
      events={hol}
      // Event={(e)=>{setMnth((e).culture("hl"))}}
      allDayAccessor={(e)=>{console.log('e',e)}}
      localizer={localizer}
      onNavigate={(e)=>{setMnth(moment(e).format("MM"))}}
      startAccessor="start"
      endAccessor="end"
      defaultDate={new Date(2021, 3, 1)}

      style={{ height: 500 }}
      
    />
    </div>
  );
}

export default App;
