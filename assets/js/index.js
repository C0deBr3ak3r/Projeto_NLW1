function script () {
    const buttonSearch = document.querySelector('#page-home main a');
    const modal = document.querySelector('#modal');
    const closeSearch = document.querySelector('#modal .header a');

    buttonSearch.addEventListener('click', () => {
        modal.classList.remove('hide');
    })

    closeSearch.addEventListener('click', () => {
        modal.classList.add('hide');
    })
}
script();
