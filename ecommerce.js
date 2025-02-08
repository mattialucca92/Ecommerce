// [    RISPOSTA DI (DATA)  http://localhost:8080/api/articoli
// 	{
// 		"id": "1",
// 		"nome": "Maglietta",
// 		"categoria": "T-shirt",
// 		"descrizione": "Maglietta termica",
// 		"prezzo": 19.99,
// 		"immagineUrl": "./img/t-shirt.png"
// 	},
// 	{
// 		"id": "2",
// 		"nome": "Jeans",
// 		"categoria": "Pantaloni",
// 		"descrizione": "Pantalone termico",
// 		"prezzo": 49.99,
// 		"immagineUrl": "./img/jeans.png"
// 	},
// 	{
// 		"id": "3",
// 		"nome": "Scarpe da ginnastica",
// 		"categoria": "Scarpe",
// 		"descrizione": "Scarpe adatte alla corsa",
// 		"prezzo": 89.99,
// 		"immagineUrl": "./img/scarpe.png"
// 	},
// 	{
// 		"id": "4",
// 		"nome": "Felpa",
// 		"categoria": "Maglione",
// 		"descrizione": "Felpa con cappuccio",
// 		"prezzo": 39.99,
// 		"immagineUrl": "./img/felpa.png"
// 	}
// ]

$(document).ready(function () {
  // Effettua la richiesta GET all'API
  $.ajax({
    url: "http://localhost:8080/api/articoli", // Endpoint Spring Boot
    method: "GET",
    success: function (data) {
      // console.log(data);
      generateCard(data);
    },
    error: function (error) {
      console.error("Errore durante la richiesta:", error);
      document.getElementById("lista-articoli").innerText =
        "Servizio non disponibile, riprova piu tardi";
    },
  });
  $.ajax({
    url: "https://run.mocky.io/v3/77342455-97f0-4153-a4bd-0cf7bd59e30e",
    method: "GET",
    dataType: "json",
    success: function (data) {
      console.log("Dati ricevuti:", data);

      // Esempio: stampare i nomi dei prodotti in una lista
    },
    error: function (xhr, status, error) {
      console.error("Errore nella richiesta:", error);
    },
  });
});

function generateCard(data) {
  data.forEach(function (art) {
    // document.getElementById("lista-articoli") vedi riga 39!!
    $("#lista-articoli").append(
      `
    <div class="card" style="width: 18rem;">
            <img src="${art.immagineUrl}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${art.nome}</h5>
            <p class="card-text">${art.categoria}</p>
            <p class="card-text">${art.descrizione}</p>
            <p class="card-text">${art.prezzo}</p>
            <a href="./dettaglioArticolo.html?id=${art.id}&cat=${art.categoria}" class="btn btn-primary">Vedi dettaglio</a>        
        </div>
    </div>
            `
    );
  });
}
