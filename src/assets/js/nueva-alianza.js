const modal = document.querySelector('.contenedorModal');
const closeModal = document.getElementById('spanModal');


window.addEventListener("load", function(e) {
    e.preventDefault();
    modal.classList.add('modal--show');
    
    closeModal.addEventListener('click', () => {
        modal.classList.remove('modal--show');
    })

})
