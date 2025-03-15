    $(document).on("click", ".btn-categorie", function () {   //EVENTO PER TUTTI I BOTTONI CON DATA-CAT
    let categoria = $(this).data("cat"); // Prende il valore dell'attributo data-cat

    $.ajax({
        url: `http://localhost:8080/api/articoli/categoria/${categoria}`, // URL dinamico
        method: "GET",
        success: function (data) {
        console.log(`Dati per la categoria ${categoria}:`, data);
        },
        error: function (error) {
        console.error(`Errore nel recupero della categoria ${categoria}:`, error);
        },
    });
    });
