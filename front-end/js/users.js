$(document).ready(function () {
  let crudAction = "edit";

  var table = $("#tablaDetail").DataTable({
    ajax: {
      url: "http://0.tcp.ngrok.io:16590/get_items", // Change this to your API URL
    },
    columns: [
      { data: "UPC" },
      { data: "name_Product" },
      { data: "price_Product" },
      { data: "quantity_Product" },
      {
        data: null,
        defaultContent:
          "<div class='text-center'>" +
          "<button type='button' class='btn btn-info btn-sm btnEdit'><i class='bi bi-pencil'></i></button>&nbsp;" +
          "<button type='button' class='btn btn-danger btn-sm btnDelete'><i class='bi bi-trash3'></i></button>" +
          "</div>",
      },
    ],
  });

  $("#btn-add-new").click(function () {
    crudAction = "new";
    $("form").get(0).reset();

    $("#UPC").prop("readonly", false);
    $("#name_Product").prop("readonly", false);
    $("#price_Product").prop("readonly", false);
    $("#quantity_Product").prop("readonly", false);

    updateModal("Add Item");
  });

  $("#tablaDetail tbody").on("click", ".btnEdit", function () {
    var data = table.row($(this).parents("tr")).data(); // Get ROW DATA in TABLE

    setDataElementsReadOnly(data, false);
    fillForm(data);
    crudAction = "edit";

    updateModal("Edit Item");
  });

  $("#tablaDetail tbody").on("click", ".btnDelete", function () {
    var data = table.row($(this).parents("tr")).data(); // Get ROW DATA in TABLE

    setDataElementsReadOnly(data, true);
    fillForm(data);
    crudAction = "delete";

    $("#modalTitle").text("Delete Item");
    $("#modalMessages").html(
      '<div class="alert alert-danger" role="alert">' +
        'Are you sure you want to delete the item <strong>' + data.UPC + '</strong>?' +
        "</div>"
    );

    $("#btn-modal-crud-action").addClass("btn-danger");
    $("#btn-modal-crud-action").removeClass("btn-primary");
    $("#btn-modal-crud-action").text("Delete");

    $("#actionModal").modal("show");
  });

  $("#btn-modal-crud-action").click(function () {
    let url, method, data;
    if (crudAction === "new") {
      url = "http://0.tcp.ngrok.io:16590/insert_item";
      method = "POST";
      data = {
        UPC: $("#UPC").val(),
        name_Product: $("#name_Product").val(),
        price_Product: $("#price_Product").val(),
        quantity_Product: $("#quantity_Product").val(),
      };
      // Execute REST API to INSERT
    } else if (crudAction === "edit") {
      url = "http://0.tcp.ngrok.io:16590/update_item";
      method = "POST";
      data = {
        UPC: $("#UPC").val(),
        name_Product: $("#name_Product").val(),
        price_Product: $("#price_Product").val(),
        quantity_Product: $("#quantity_Product").val(),
      };
      // Execute REST API to UPDATE
      $.ajax({
        url: url,
        method: method,
        data: JSON.stringify(data),
        contentType: "application/json",
        success: function (response) {
          table.ajax.reload();
          $("#actionModal").modal("hide");
        },
        error: function (error) {
          console.error("Error updating item:", error);
        },
      });
    } else {
      var UPC = $("#UPC").val(); // Get the UPC from the form

      $.ajax({
        url: `http://0.tcp.ngrok.io:16590/delete_item/${UPC}`, // Adjust the URL as needed
        method: "DELETE",
        success: function (response) {
          table.ajax.reload();
          $("#actionModal").modal("hide");
        },
        error: function (error) {
          console.error("Error deleting item:", error);
        },
      });
    }
  });

  function updateModal(title) {
    $("#modalTitle").text(title);

    $("#btn-modal-crud-action").addClass("btn-primary");
    $("#btn-modal-crud-action").removeClass("btn-danger");
    $("#btn-modal-crud-action").text("Save");

    $("#actionModal").modal("show");
  }

  function setDataElementsReadOnly(data, isReadOnly) {
    $("#UPC").prop("readonly", isReadOnly);
    $("#name_Product").prop("readonly", isReadOnly);
    $("#price_Product").prop("readonly", isReadOnly);
    $("#quantity_Product").prop("readonly", isReadOnly);
  }

  function fillForm(data) {
    $("#UPC").val(data.UPC);
    $("#name_Product").val(data.name_Product);
    $("#price_Product").val(data.price_Product);
    $("#quantity_Product").val(data.quantity_Product);
  }
});
