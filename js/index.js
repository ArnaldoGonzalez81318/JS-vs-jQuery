document.addEventListener("DOMContentLoaded", function () {
  const copyButtonLabel = "fa-solid fa-copy";

  // Add copy to clipboard button to code blocks.
  let blocks = document.querySelectorAll(".copy-to-clipboard");

  blocks.forEach((block) => {
    // Check if navigator.clipboard is supported. If so, add copy button.
    if (navigator.clipboard) {
      let button = document.createElement("icon");
      button.className = copyButtonLabel;
      button.addEventListener("click", copyCode);
      block.prepend(button);
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
      let dropdown = $('.dropdown-menu ul'); // dropdown menu.
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
    $('.dropdown-btn').click(function (e) {
      // Prevent default action.
      e.preventDefault();
      e.stopPropagation();
      // Toggle dropdown menu.
      $('.dropdown-menu').slideToggle(300);
    });

    //Stop scroll when dropdown is open.
    if ($('.dropdown-menu').is(':visible')) {
      $('body').css('overflow', 'hidden');
    } else {
      $('body').css('overflow', 'auto');
    }

    // Hide dropdown menu on click anchor.
    $('.nav-link').click(function () {
      $('.dropdown-menu').slideUp(300);
      $('body').css('overflow', 'auto');
    });

    // Hide dropdown menu on click outside.
    $(document).click(function () {
      $('.dropdown-menu').slideUp(300);
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
          }, 5000);
        } else {
          let scrollPoint = section.offset().top - 30;
          console.log(scrollPoint);
          // scroll to section.
          $('html, body').animate({
            scrollTop: scrollPoint
          }, 5000);
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

  window.onscroll = function () {
    progressIndicator();
  };

  // Progress indicator function.
  function progressIndicator() {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop; // Get scroll position.
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight; // Get height of page.
    let scrolled = (winScroll / height) * 100; // Calculate scrolled percentage.
    document.getElementById("progressBar").style.width = scrolled + "%"; // Set width of progress bar.
  }
});