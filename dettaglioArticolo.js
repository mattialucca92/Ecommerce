$(document).ready(function () {
  loadDetails();
  $("#btn-articoli-simili").click(function () {
    let urlParams = new URLSearchParams(window.location.search);
    let categoria = urlParams.get("cat");
    console.log(categoria);
    $.ajax({
      url: `http://localhost:8080/api/articoli/categoria/${categoria}`, // Endpoint Spring Boot
      method: "GET",
      success: function (data) {
        console.log(data);
      },
      error: function (error) {
        console.error("Errore durante la richiesta:", error);
        document.getElementById("dettaglio-articolo-simili").innerText =
          "Non ci sono articoli simili";
      },
    });
  });
});

//prova commit Mattia
function loadDetails() {
  let urlParams = new URLSearchParams(window.location.search);
  let articoloId = urlParams.get("id");

  console.log(articoloId);

  $.ajax({
    url: `http://localhost:8080/api/articoli/details/${articoloId}`, // Endpoint Spring Boot
    method: "GET",
    success: function (data) {
      console.log(data);
      generateDetails(data);
    },
    error: function (error) {
      console.error("Errore durante la richiesta:", error);
      document.getElementById("dettaglio-articolo").innerText =
        "Dettaglio non disponibile, riprova piu tardi";
    },
  });
}

function generateDetails(data) {
  // document.getElementById("lista-articoli") vedi riga 39!!

  $("#dettaglio-articolo").append(
    `
    <div class="card" style="width: 18rem;">
            <img src="${data.immagineUrl}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${data.nome}</h5>
            <p class="card-text">${data.categoria}</p>
            <p class="card-text">${data.descrizione}</p>
            <p class="card-text">${data.prezzo}</p>
        </div>
    </div>
            `
  );
}
