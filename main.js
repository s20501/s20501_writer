init();

/**
 * Uruchamianie na starcie
 *
 */
function init() {
  load();
  setEvents();
}

/**
 * Ustawia wszystkie eventy
 *
 */
function setEvents() {
  $("#textarea").on("input", () => addHtmlToView());
  $("#textarea").on("click", () => addHTMLToTextarea());
  $("#save-button").on("click", () => save());
}

/**
 * Dodaje html do wyświetlenia
 *
 */
function addHtmlToView() {
  $("#displayarea").html($("#textarea").val());
}

/**
 * Dodaje html do textarea
 *
 */
function addHTMLToTextarea() {
  const index = $("#textarea").prop("selectionStart");

  const generatedSpan = `<span class="bold"></span>`;
  $("#textarea").val((_, val) => {
    return val.substr(0, index) + generatedSpan + val.substr(index);
  });

  const cursorPosition = index + generatedSpan.length - 7;

  $("#textarea").prop("selectionEnd", cursorPosition);
}

/**
 * Zapisuje dane do localStorage
 *
 */
function save() {
  // Store
  localStorage.setItem("savedText", $("#textarea").val());
}

/**
 * Odczytuje dane z localstorage
 *
 */
function load() {
  $("#textarea").val(localStorage.getItem("savedText"));
  $("#displayarea").html(localStorage.getItem("savedText"));
}
