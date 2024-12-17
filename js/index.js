document.addEventListener("DOMContentLoaded", function () {
  const copyButtonLabel = "fa-solid fa-copy";

  let consoleMessage = "Vanilla JS vs jQuery";
  let consoleMessageStyle = `
    background: rgb(239,219,80);
    background: -moz-linear-gradient(90deg, rgba(239,219,80,1) 0%, rgba(126,161,128,1) 50%, rgba(17,105,174,1) 100%);
    background: -webkit-linear-gradient(90deg, rgba(239,219,80,1) 0%, rgba(126,161,128,1) 50%, rgba(17,105,174,1) 100%);
    background: linear-gradient(90deg, rgba(239,219,80,1) 0%, rgba(126,161,128,1) 50%, rgba(17,105,174,1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#efdb50",endColorstr="#1169ae",GradientType=1);
    color: #fff;
    font-size: 24px;
    padding: 10px;
    border-radius: 5px;
    font-family: 'Roboto', sans-serif;
    font-weight: 700;
    text-transform: uppercase;
    text-shadow: 1px 1px 1px #000;
  `;
  let currentYear = new Date().getFullYear();
  let footer = document.querySelector("footer");
  let footerText = footer.querySelector(".footer-disclaimer");

  footerText.innerHTML = `© 2020 - ${currentYear} ${footerText.innerHTML}`;

  // Add copy to clipboard button to code blocks.
  let blocks = document.querySelectorAll(".copy-to-clipboard");

  blocks.forEach((block) => {
    // Check if navigator.clipboard is supported. If so, add copy button.
    if (navigator.clipboard) {
      let button = document.createElement("icon");
      button.className = copyButtonLabel;
      button.setAttribute("tabindex", "0");
      button.addEventListener("click", copyCode);
      block.prepend(button);
    } else {
      // If not, add message.
      let message = document.createElement("p");
      message.className = "copy-to-clipboard-message";
      message.innerHTML = "Copy to clipboard is not supported by your browser.";
      block.prepend(message);
    }
  });

  // Copy code to clipboard function.
  async function copyCode(event) {
    const button = event.srcElement;
    const pre = button.parentElement.parentElement;
    let code = pre.querySelector("code");
    let text = code.innerText;

    await navigator.clipboard.writeText(text);

    button.className = "fa-solid fa-circle-check";
    // Add fade in animation to button without adding a class.
    button.animate(
      [{
        opacity: 0,
      },
      {
        opacity: 1,
      },
      ], {
      duration: 500,
    }
    );

    // Reset button after 1 seconds.
    setTimeout(() => {
      button.className = copyButtonLabel;

      // Add fade in animation to button without adding a class.
      button.animate(
        [{
          opacity: 0,
        },
        {
          opacity: 1,
        },
        ], {
        duration: 500,
      }
      );
    }, 500);
  }

  $(function () {
    $('.documentation-body h3').each(function () {
      let $this = $(this); // current h3.
      let text = $this.text(); // text of h3.
      let sidebar = $('.sidebar-nav ul'); // sidebar ul.
      let dropdown = $('.navigation-bar-header-menu-items ul'); // dropdown menu.
      let li = $('<li class="nav-item"><a class="nav-link" id="' + $this.text().replace(/ /g, '') + '" href="#' + $this.text().replace(/ /g, '') + '">' + text + '</a></li>'); // create li.
      let dropdownItem = $('<li class="nav-item"><a class="nav-link" id="' + $this.text().replace(/ /g, '') + '" href="#' + $this.text()
        .replace(/ /g, '') + '">' + text + '</a></li>'); // create dropdown li.

      // console.log(text); // log text.

      // Add li to sidebar.
      sidebar.append(li);
      // Add li to dropdown.
      dropdown.append(dropdownItem);
    });

    // Show dropdown menu on click.
    let visible = false;
    $('.dropdown-btn').click(function (e) {
      // Prevent default action.
      e.preventDefault();
      e.stopPropagation();
      // Toggle dropdown menu.
      $('.navigation-bar-header-menu-items').slideToggle(300);

      if (visible === false) {
        $('body').css('overflow', 'hidden');
        visible = true;
      } else {
        $('body').css('overflow', 'auto');
        visible = false;
      }
    });

    // Hide dropdown menu on click anchor.
    $('.nav-link').click(function () {
      $('.navigation-bar-header-menu-items').slideUp(300);
      $('body').css('overflow', 'auto');
    });

    // Hide dropdown menu on click outside.
    $(document).click(function () {
      $('.navigation-bar-header-menu-items').slideUp(300);
      $('body').css('overflow', 'auto');
    });

    $('section').each(function () {
      let $this = $(this); // current section.
      let text = $this.find('h3').text(); // text of h3.

      $(this).attr('id', text.replace(/ /g, '')); // add id to section.
    })

    $('.nav-link').click(function () {
      let $this = $(this); // current section.
      let scrollAnchor = $(this).attr('id'); // get id of h3.
      let section = $('section[id="' + scrollAnchor + '"]'); // get section with id.

      // Check if the section exists.
      if (section.length) {
        // Check window width to scroll to the right place.
        if ($(window).width() <= 770) {
          $('html, body').animate({
            scrollTop: section.offset().top - 100
          }, 3000);
        } else {
          let scrollPoint = section.offset().top - 90;
          console.log(scrollPoint);
          // scroll to section.
          $('html, body').animate({
            scrollTop: scrollPoint
          }, 3000);
        }
      }

      // Add active class to anchor.
      $('.nav-link').removeClass('active-link');
      $this.addClass('active-link');
      // Add emoji to clicked anchor.
      $('.nav-link').html(function () {
        return $(this).text().replace('👉 ', '');
      });
      $this.html(function () {
        return $(this).text().replace('', '👉 ');
      });

      return false;
    });
  });

  // Scroll to top button.
  let scrollToTopButton = document.getElementById("scrollToTopButton");

  // Run functions on scroll.
  window.onscroll = function () {
    progressIndicator();
  };

  // Check if window is scrolled down 500px. If so, fade in button. If not, fade out button.
  $(window).scroll(function () {
    if ($(this).scrollTop() >= 500) {
      $(scrollToTopButton).fadeIn();
    } else {
      $(scrollToTopButton).fadeOut();
    }
  });

  // Scroll to top when button is clicked.
  scrollToTopButton.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  // Progress indicator function.
  function progressIndicator() {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop; // Get scroll position.
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight; // Get height of page.
    let scrolled = (winScroll / height) * 100; // Calculate scrolled percentage.
    document.getElementById("progressBar").style.width = scrolled + "%"; // Set width of progress bar.
  }

  console.log("%c" + consoleMessage, consoleMessageStyle);
});