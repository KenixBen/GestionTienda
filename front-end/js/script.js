$(document).ready(function () {
  // llenar la tabla de contenidos con el api de la maquina virtual para obtener items en la tabla
  $("#tablaItems").DataTable({
    ajax: {
      url: "http://0.tcp.ngrok.io:16590/get_product_detail",
    },
    error: function (xhr, status, error) {
      console.log("Error al obtener los datos del API:", error);
    },
    columns: [
      { data: "UPC" },
      { data: "category_Product" },
      { data: "brand" },
      { data: "batch" },
    ],
  });
// llenar la tabla de contenidos con el api de la maquina virtual para obtener proveedores en la tabla
  $("#tablaProviders").DataTable({
    ajax: {
      url: "http://0.tcp.ngrok.io:16590/get_providers",
    },
    error: function (xhr, status, error) {
      console.log("Error al obtener los datos del API:", error);
    },
    columns: [
      { data: "id_Provider" },
      { data: "name_Provider" },
      { data: "contact" },
    ],
  });
})