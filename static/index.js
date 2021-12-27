const myForm = document.querySelector('#myForm')

myForm.addEventListener('submit', () => {
    fetch('localhost:5000/courses')
    .then(res => response.json())
    .then(data => {
        console.log(data)
    })
})