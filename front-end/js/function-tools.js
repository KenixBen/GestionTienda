// formData is a JSON Object with all values from the REST API
function fillForm(formData) {
  Object.keys(formData).forEach(function(key) {
    var element = document.querySelector('[name="' + key + '"]');
    if (element) {
      if (element.type === 'checkbox' || element.type === 'radio') {
        element.checked = element.value === formData[key].toString();
      } else if (element.tagName.toLowerCase() === 'select') {
        element.value = formData[key];
      } else {
        element.value = formData[key];
      }
    }
  });
}

function setDataElementsReadOnly(formData, isReadOnly) {
  Object.keys(formData).forEach(function(key) {
    var element = document.querySelector('[name="' + key + '"]');
    if (element) {
      if (isReadOnly) {
        element.setAttribute('readonly', 'readonly');
      } else {
        element.removeAttribute('readonly');
      }
    }
  });
}
