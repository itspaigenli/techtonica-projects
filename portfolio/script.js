function openmenu() {
  sidemenu.style.right = "0";
  sidemenu.setAttribute("aria-hidden", "false");
}

function closemenu() {
  sidemenu.style.right = "-200px";
  sidemenu.setAttribute("aria-hidden", "true");
}

function opentab(tabname) {
  for (tablink of tablinks) {
    tablink.classList.remove("active-link");
    tablink.setAttribute("aria-selected", "false");
  }
  for (tabcontent of tabcontents) {
    tabcontent.classList.remove("active-tab");
  }

  event.currentTarget.classList.add("active-link");
  event.currentTarget.setAttribute("aria-selected", "true");
  document.getElementById(tabname).classList.add("active-tab");
}
