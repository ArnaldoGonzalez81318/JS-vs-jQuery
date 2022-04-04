function copy() {
  let copyText = document.querySelector(".lang-javascript");
  copyText.select();
  document.execCommand("copy");

  console.log("Copied the text: " + copyText.value);
}

document.querySelector(".fa-copy").addEventListener("click", copy);