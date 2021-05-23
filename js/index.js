const render = function(data){
    const content = document.getElementById('content');
    
    for(let state of data.sessions){
        const div = document.createElement('div');
        div.innerText = state.name;
        content.appendChild(div);
    }
};

const parseJon = function(data) {
    return data.json();
}

const fetchDetails = function(){
    console.log("testing")
    const pincode = document.getElementById('pincode').value;
    const unformattedDate = document.getElementById('input_date').value;
    const date = unformattedDate.split('-').reverse().join('-');
    fetch(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pincode}&date=${date}`).then(parseJon).then(render);
};

const setup = function(){
    const search = document.getElementById('button');
    search.addEventListener('click', fetchDetails);
};

window.onload = setup;