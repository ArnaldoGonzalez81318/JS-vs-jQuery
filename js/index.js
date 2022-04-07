const copyButtonLabel = "fa-solid fa-copy";

// you can use a class selector instead if you, or the syntax highlighting library adds one to the 'pre'.
let blocks = document.querySelectorAll(".copy-to-clipboard");

blocks.forEach((block) => {
  // only add button if browser supports Clipboard API
  if (navigator.clipboard) {
    let button = document.createElement("icon");
    button.className = copyButtonLabel;
    button.addEventListener("click", copyCode);
    block.prepend(button);
  }
});

async function copyCode(event) {
  const button = event.srcElement;
  const pre = button.parentElement.parentElement;
  let code = pre.querySelector("code");
  let text = code.innerText;
  await navigator.clipboard.writeText(text);

  button.className = "fa-solid fa-circle-check";

  setTimeout(() => {
    button.className = copyButtonLabel;
  }, 1000);
}

$(function () {
  $('.documentation-body h3').each(function () {
    let $this = $(this);
    let text = $this.text();
    let sidebar = $('.sidebar-nav ul');
    let li = $('<li class="nav-item"><a class="nav-link" href="#' + $this.text().toLowerCase().replace(/ /g, '-') + '">' + text + '</a></li>');

    console.log(text);

    sidebar.append(li);
  });
});