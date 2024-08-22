const modal = document.getElementById('logoutModal');
const logoutBtn = document.querySelector('.btn');
const closeBtn = document.querySelector('.close');
const confirmLogout = document.getElementById('confirmLogout');
const cancelLogout = document.getElementById('cancelLogout');

logoutBtn.addEventListener('click', function() {
    modal.style.display = "block";
})
closeBtn.addEventListener('click', function() {
    modal.style.display = "none";
})
cancelLogout.addEventListener('click', function() {
    modal.style.display = "none";
})
confirmLogout.addEventListener('click', function() {
    modal.style.display = "none";
})

window.onclick = function(event){
    if (event.target == modal) {
        modal.style.display = "none";
    }
}