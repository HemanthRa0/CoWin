const render = function(data){
    
    const content = document.getElementById('content');

    document.getElementById("content").innerHTML="";
    
    if(!data.sessions.length){
        const div = document.createElement('div');
        div.className = 'notava';
        var emoji = String.fromCodePoint(0x1F622)
        div.innerText = "Not Available"+emoji;
        content.appendChild(div);
    }

    for(let center of data.sessions){

        const br_begin_div = document.createElement('br');

        const div = document.createElement('div');
        div.className = 'colourchange';
        div.innerText = center.name;
        
        const state_div = document.createElement('div');
        state_div.className = 'statename';
        state_div.innerText = center.state_name;
        
        const district_div = document.createElement('div');
        district_div.className = 'districtname';
        district_div.innerText = center.district_name;
        
        const address_div = document.createElement('div');
        address_div.className = 'address';
        address_div.innerText = center.address;

        const vaccine_text = document.createElement('div');
        vaccine_text.className = 'vaccinetext';
        vaccine_text.innerText = 'Vaccine Availability';

        const vaccine_div = document.createElement('div');
        vaccine_div.className = 'vaccine';
        vaccine_div.innerText = center.vaccine;

        const dose1_div = document.createElement('div');
        dose1_div.className = 'dose1';
        dose1_div.innerText = 'Dose1: '+center.available_capacity_dose1;

        const dose2_div = document.createElement('div');
        dose2_div.className = 'dose2';
        dose2_div.innerText = 'Dose2: '+center.available_capacity_dose2;

        const age_text = document.createElement('div');
        age_text.className = 'agetext';
        age_text.innerText = 'Age';

        const age_div = document.createElement('div');
        age_div.className = 'age';
        age_div.innerText = center.min_age_limit+'+';

        const fee_text = document.createElement('div');
        fee_text.className = 'feetext';
        fee_text.innerText = 'Fee';

        const fee_div = document.createElement('div');
        fee_div.className = 'fee';
        fee_div.innerText = center.fee;

        const from_div = document.createElement('div');
        from_div.className = 'from';
        from_div.innerText = 'from_'+center.from;

        const to_div = document.createElement('div');
        to_div.className = 'to';
        to_div.innerText = 'to_'+center.to;
        
        const br_end = document.createElement('br');

        const hr_div = document.createElement('hr');

        div.appendChild(address_div);
        div.appendChild(district_div);
        div.appendChild(state_div);
        div.appendChild(vaccine_text);
        div.appendChild(vaccine_div);
        div.appendChild(dose1_div);
        div.appendChild(dose2_div);
        div.appendChild(age_text);
        div.appendChild(age_div);
        div.appendChild(fee_text);
        div.appendChild(fee_div);
        div.appendChild(from_div);
        div.appendChild(to_div);
        div.appendChild(br_end);
        div.appendChild(hr_div);
        div.appendChild(br_begin_div);


        content.appendChild(div);
    }
};

const parseJson = function(data) {
    return data.json();
}

const fetchDetails = function(){
    console.log("testing")
    const pincode = document.getElementById('pincode').value;
    const unformattedDate = document.getElementById('input_date').value;
    const date = unformattedDate.split('-').reverse().join('-');
    fetch(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pincode}&date=${date}`).then(parseJson).then(render);

    fetch(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pincode}&date=${date}`)
    .then(function(response){
        console.log(response.status);
        if(response.status !== 200){
            console.log("Something went wrong!");
            const content = document.getElementById('content');

            const div = document.createElement('div');
            div.className = 'incorrect';
            var emoji = String.fromCodePoint(0x1F637)
            div.innerText = "Please check your inputs and try agian"+emoji;
            content.appendChild(div);
        }
    });
};

const setup = function(){
    const search = document.getElementById('button');
    search.addEventListener('click', fetchDetails);
};

window.onload = setup;
window.addEventListener("orientationchange", function(event) {
    console.log("the orientation of the device is now " + event.target.screen.orientation.angle);
    if(event.target.screen.orientation.angle === 0){
        this.alert("Please rotate your device");
    }
  });