function copy() {
  let copyText = document.querySelector(".lang-javascript");
  copyText.focus();
  document.execCommand("copy");
  console.log(copyText.textContent);
}

document.querySelector(".fa-copy").addEventListener("click", copy);