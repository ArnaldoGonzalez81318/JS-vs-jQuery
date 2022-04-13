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
    let dropdown = $('.dropdown-menu ul'); // dropdown menu.
    let li = $('<li class="nav-item"><a class="nav-link" href="#' + $this.text().replace(/ /g, '') + '">' + text + '</a></li>'); // create li.
    let dropdownItem = $('<li class="nav-item"><a class="nav-link" href="#' + $this.text().replace(/ /g, '') + '">' + text + '</a></li>'); // create dropdown li.

    console.log(text);

    // add li to sidebar.
    sidebar.append(li);
    // add li to dropdown.
    dropdown.append(dropdownItem);
  });

  //Stop scroll when dropdown is open.
  $('.dropdown-btn').on('click', function (e) {
    $('.dropdown-menu').slideToggle(300);

    if ($('.dropdown-menu').is(':visible')) {
      e.preventDefault();
      e.stopPropagation();
      $('body').css('overflow', 'hidden');
    }
  });

  $('section').each(function () {
    let $this = $(this); // current section.
    let text = $this.find('h3').text(); // text of h2.

    $(this).attr('id', text.replace(/ /g, '')); // add id to h3.
  })

  $('.nav-link').click(function () {
    let $this = $(this); // current section.
    let scrollAnchor = $(this).attr('id');
    let scrollPoint = $('section[id="' + scrollAnchor + '"]').offset().top - 50;
    // scroll to section.
    $('.document').animate({
      scrollTop: scrollPoint
    }, 1000);

    // add active class to anchor.
    $('.nav-link').removeClass('active-link');
    $this.addClass('active-link');

    return false;
  });
});