let envio = document.getElementById("envio")
let nombre = document.getElementById("nombre")

envio.addEventListener("click", (event) => {
  event.preventDefault()
  if (nombre.value === "") {
    alert("ingresa algo")
  } else {
    alert(`ok todo ok: ${nombre.value.trim()}`)
  }
})
