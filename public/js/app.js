console.log('Client side javascript file is loaded!');

const searchWeather = (location, callback)=>{
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
           callback(data.error);
        }else{
            callback(undefined,{
                location : data.location,
                forecast : data.forecast
            })
        }
    })
});
}

const weatherForm = document.querySelector('form');
const search =  document.querySelector('input');
const messageone = document.querySelector('#message-1');
const messagetwo = document.querySelector('#message-2');


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    messageone.textContent = "loading...";
    messagetwo.textContent = '';
    const location = search.value;
    searchWeather(location,(error,response)=>{
        if(error){
            // return console.log(error);
            messageone.textContent = error;
        }else{
            // console.log(response);
            messageone.textContent = response.forecast;
            messagetwo.textContent = response.location;
        }
    })
})
