import { baseURL,selectCountry } from "../utils/EndPoint";
const apifetch = (call)=>{
    fetch(baseURL)
    .then(res=>res.json())
    .then(jsonresponse=>{
        if(jsonresponse){
            call(jsonresponse)
        }
        else{
            call(false);
        }
    })
    .catch((e)=>{
        call(false)
    })
}
const getSelectedCountry = (contry,mnth)=>{
   return fetch(selectCountry+`${contry ? `&country=${contry}&month=${mnth}&year=2021`:mnth ? `&country=${contry}&month=${mnth}&year=2021`:"&year=2021" }`)
   
}

export{
    apifetch,
    getSelectedCountry
}