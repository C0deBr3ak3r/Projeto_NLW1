function script () {
   

    function populateState () {
        const selectState = document.querySelector("select[name=companyState]");

        fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
        .then( (res) => { return res.json() })
        .then( states => {
            for( const state of states){
                selectState.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
            }
        })
    }

    function getCities(event) {
        const selectCity = document.querySelector("[name=companyCity]");
        const stateValue = event.target.value;
        const stateInput = document.querySelector("[name=state]");
        const indexOfSelectedState = event.target.selectedIndex;

        stateInput.value = event.target.options[indexOfSelectedState].text;

        const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateValue}/municipios`;


        fetch(url)
        .then( (res) => { return res.json() })
        .then( cities => {
            for( const city of cities){
                selectCity.innerHTML += `<option value="${city.id}">${city.nome}</option>`;
            }
            selectCity.disabled = false;
        })
    }

    populateState();

    document
        .querySelector("select[name=companyState]")
        .addEventListener('change', getCities)
}


script();