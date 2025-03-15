$(document).ready(function () {
  loadDetails();
  $("#btn-articoli-simili").click(function () {
    let urlParams = new URLSearchParams(window.location.search);
    let categoria = urlParams.get("cat");
    // console.log(categoria);
    $.ajax({
      url: `http://localhost:8080/api/articoli/categoria/${categoria}`, // Endpoint Spring Boot
      method: "GET",
      success: function (data) {
        let urlParams = new URLSearchParams(window.location.search);
        let id = urlParams.get("id");
        $("#" + id).hide();

        $("#btn-articoli-simili").hide(); // BOTTONE CHE SI NASCONDE QUANDO TROVA/NON TROVA ARTICOLI SIMILI

        //SE LA LUNGHEZZA DELL'OGGETTO è 1, VUOL DIRE CHE NON CI SONO ARTICOLI SIMILI
        if (data.length == 1) {
          $("#modale").modal("show"); // VISUALIZZAZIONE MODALE
          $("#dettaglio-articolo-simili").text("Non ci sono articoli simili");
        } else {
          generateArticoliSimili(data);
        }
        $("#dettaglio-articolo-simili").prepend(
          "<div class='col-12' style='border: none;'><a href='./ecommerce.html' class='home-link'>Torna alla home</a></div>"
        );
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

  // console.log(articoloId);

  $.ajax({
    url: `http://localhost:8080/api/articoli/details/${articoloId}`, // Endpoint Spring Boot
    method: "GET",
    success: function (data) {
      // console.log(data);
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
    <div class="row" >
    <div id="${data.id}" class="card col-3" style="width: 18rem;">
            <img src="${data.immagineUrl}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${data.nome}</h5>
            <p class="card-text">${data.categoria}</p>
            <p class="card-text">${data.descrizione}</p>
            <p class="card-text">${data.prezzo}€</p>
        </div>
    </div>
    </div>
            `
  );
}

function generateArticoliSimili(data) {
  let urlParams = new URLSearchParams(window.location.search);
  let id = urlParams.get("id");

  data.forEach(function (art) {
    if (art.id !== id) {
      $("#dettaglio-articolo-simili").append(`
          <div class="card" style="width: 18rem;">
                <img src="${art.immagineUrl}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${art.nome}</h5>
                <p class="card-text">${art.categoria}</p>
                <p class="card-text">${art.descrizione}</p>
                <p class="card-text">${art.prezzo}€</p>
                <a href="./dettaglioArticolo.html?id=${art.id}&cat=${art.categoria}" 
                  class="btn btn-primary btn-dettaglio">
                  Vedi Dettaglio
                </a>
            </div>
        </div>
          `);
    }
  });
}
