const copyButtonLabel = "fa-solid fa-copy";

// you can use a class selector instead if you, or the syntax highlighting library adds one to the 'pre'.
let blocks = document.querySelectorAll(".copy-to-clipboard");

blocks.forEach((block) => {
  // only add button if browser supports Clipboard API.
  if (navigator.clipboard) {
    let button = document.createElement("icon");
    button.className = copyButtonLabel;
    button.addEventListener("click", copyCode);
    block.prepend(button);
  }
});

// copy code to clipboard function.
async function copyCode(event) {
  const button = event.srcElement;
  const pre = button.parentElement.parentElement;
  let code = pre.querySelector("code");
  let text = code.innerText;
  await navigator.clipboard.writeText(text);

  button.className = "fa-solid fa-circle-check";

  // reset button after 1 seconds.
  setTimeout(() => {
    button.className = copyButtonLabel;
  }, 1000);
}

$(function () {
  $('.documentation-body h3').each(function () {
    let $this = $(this); // current h3.
    let text = $this.text(); // text of h3.
    let sidebar = $('.sidebar-nav ul'); // sidebar ul.
    let li = $('<li class="nav-item"><a class="nav-link" href="#' + $this.text().replace(/ /g, '') + '" data-scroll="' + text.replace(/ /g, '') + '">' + text + '</a></li>'); // create li.

    $('section').attr('data-anchor', text.replace(/ /g, ''));

    console.log(text);

    // add li to sidebar.
    sidebar.append(li);

    $('.nav-link').click(function () {
      let scrollAnchor = $(this).attr('data-scroll');
      let scrollPoint = $('section[data-anchor="' + scrollAnchor + '"]').offset().top - 125;

      // scroll to section.
      $('.document').animate({
        scrollTop: scrollPoint
      }, 500);

      return false;
    });
  });
});