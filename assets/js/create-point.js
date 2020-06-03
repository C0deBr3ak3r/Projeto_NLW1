function script () {
   

    function populateState () {
        const selectState = document.querySelector('select[name=companyState]');

        fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
        .then( (res) => { return res.json() })
        .then( states => {
            for( const state of states){
                selectState.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
            }
        })
    }

    function getCities(event) {
        const selectCity = document.querySelector('[name=companyCity]');
        const stateValue = event.target.value;
        const stateInput = document.querySelector('[name=state]');
        
        const indexOfSelectedState = event.target.selectedIndex;
        stateInput.value = event.target.options[indexOfSelectedState].text;

        const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateValue}/municipios`;
        
        selectCity.innerHTML = '<option value> Selecione a Cidade </option>';
        selectCity.disabled = true;

        fetch(url)
        .then( (res) => { return res.json() })
        .then( cities => {
            for( const city of cities){
                selectCity.innerHTML += `<option value="${city.nome}"> ${city.nome} </option>`;
            }
                selectCity.disabled = false;
        })
    }

    populateState();

    document
        .querySelector('select[name=companyState]')
        .addEventListener("change", getCities)


    const itemsToCollect = document.querySelectorAll('.items-grid li');

    for (const item of itemsToCollect) {
        item.addEventListener('click', handleSelectedItem);
    }

    const collectedItems = document.querySelector('input[name=items]');

    let selectedItems = [];

    function handleSelectedItem (event) {
        const item = event.target;
        const itemId = item.dataset.id;
        const alreadySelected = selectedItems.findIndex( (item) => {
            return item === itemId
        })

        item.classList.toggle('selected');

        alreadySelected !== -1 ?  selectedItems = selectedItems.filter( item => {return item !== itemId}) : selectedItems.  push(itemId);

        collectedItems.value = selectedItems;

    }
}
script();
