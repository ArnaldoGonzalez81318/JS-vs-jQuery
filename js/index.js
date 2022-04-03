$(function () {
  $(".fa-copy").click(function () {
    $(this).closest(".lang-javascript").text();
    document.execCommand("Copy");
    console.log("Copied");
  });
});