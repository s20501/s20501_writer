init();

let styles = "";

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
  $("#save-button").on("click", () => {
    save();
    alert("Zapisano");
  });
  $("#bold-button").on("click", () => changeStyle($("#bold-button"), "bold"));
  $("#italic-button").on("click", () =>
    changeStyle($("#italic-button"), "italic")
  );
  $("#yellow-button").on("click", () =>
    changeStyle($("#yellow-button"), "yellow")
  );
  $("#print-button").on("click", () => print());
}

/**
 * Dodaje html do wyświetlenia
 *
 */
function addHtmlToView() {
  $("#textarea").val((_, val) => val.replace(/\r\n|\r|\n/g, "<br />"));
  $("#displayarea").html($("#textarea").val());
}

/**
 * Dodaje html do textarea
 *
 */
function addHTMLToTextarea() {
  if (!styles) {
    return;
  }

  index = $("#textarea").prop("selectionStart");

  const generatedSpan = `<span class="${styles}"></span>`;
  $("#textarea").val(
    (_, val) => val.substr(0, index) + generatedSpan + val.substr(index)
  );

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

/**
 * Zmiena styl do podmiany przycisku
 *
 * @param {*} button
 * @param {*} className
 */
function changeStyle(button, className) {
  const classes = button.attr("class").split(/\s+/);

  if (classes.includes("btn-primary")) {
    styles = styles.replace(className, "");
    styles = styles.trim();
    button.removeClass("btn-primary");
  } else {
    styles += ` ${className}`;
    styles = styles.trim();
    button.addClass("btn-primary");
  }
}

/**
 * Drukuje
 *
 */
function print() {
  save();
  window.open(window.location.href + "print.html");
}
