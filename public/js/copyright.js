const currentYear = new Date().getFullYear()

document.querySelector(".copyright-text").append(
  document.createTextNode(`SunValue © ${currentYear} All Rights Reserved.`)
);
