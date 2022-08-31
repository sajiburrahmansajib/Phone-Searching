const loadPhone = async (phoneName, phoneLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${phoneName}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, phoneLimit)

}

const displayPhones = (phones, phoneLimit) => {
    console.log(phones);

    const showPhpneAll = document.getElementById('showAllDiv');
    if (phoneLimit && phones.length > 9) {
        phones = phones.slice(0, 9);
        showPhpneAll.classList.remove('d-none');
    }
    else {
        showPhpneAll.classList.add('d-none');
    }


    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerHTML = '';
    loadingDisplay(false);
    if (phones.length == 0) {
        document.getElementById('display-notfound').classList.remove('d-none');
    }
    else {
        document.getElementById('display-notfound').classList.add('d-none');
    }

    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
                    <div class="card p-5 ">
                        <img src="${phone.image}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${phone.phone_name}</h5>
                            <p class="card-text">This is a longer card with supporting text below as a natural
                                lead-in to additional content. This content is a little bit longer.</p>
                            <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetaisModal">Details</button>
                        </div>
                    </div>
        
        `;
        phoneContainer.appendChild(phoneDiv);
    });

}

const showPhone = (phoneLimit) => {
    loadingDisplay(true);
    const inputFieldElement = document.getElementById('inputField');
    const phoneName = inputFieldElement.value;
    loadPhone(phoneName, phoneLimit);
    // inputFieldElement.value = '';

}

function loadingDisplay(value) {
    const loadingDiv = document.getElementById('loading-display');
    if (value) {
        loadingDiv.classList.remove('d-none');
    }
    else {
        loadingDiv.classList.add('d-none');
    }
}


document.getElementById('btn-search').addEventListener('click', function () {
    showPhone(10);
});

document.getElementById("inputField").addEventListener("keypress", function (event) {
    console.log(event.key)
    if (event.key === "Enter") {
        showPhone(10);
    }
});
document.getElementById('btn-showAll').addEventListener('click', function () {
    showPhone();
});

const loadPhoneDetails = id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then(Response => Response.json())
        .then(data => showPhoneDetailsModal(data.data))

}

const showPhoneDetailsModal = phone => {
    console.log(phone);
    const modalTitle = document.getElementById('phoneDetaisModalLabel');
    modalTitle.innerText = phone.name;
    const modalBodyDetais = document.getElementById('modalBody');
    modalBodyDetais.innerHTML = `
    <p>Brand : ${phone.brand ? phone.brand : 'No Brand Name'}</p>
    <p>ReleaseDate : ${phone.releaseDate ? phone.releaseDate : 'No date found'}</p>
    <p>Chipset : ${phone.mainFeatures.chipSet}</p>
    <p>Memory : ${phone.mainFeatures.memory}</p>
    `;
}
