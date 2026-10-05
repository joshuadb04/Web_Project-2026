const bobal = document.getElementById("boba-left");
const bobar = document.getElementById("boba-right");
const bobag = document.getElementById("boba-grid");
bobal.addEventListener("click", (event) => {
  bobag.scrollBy({ left: -500 });
});

bobar.addEventListener("click", (event) => {
  bobag.scrollBy({ left: 500 });
});

const pastriesl = document.getElementById("pastries-left");
const pastriesr = document.getElementById("pastries-right");
const pastriesg = document.getElementById("pastries-grid");
pastriesl.addEventListener("click", (event) => {
  pastriesg.scrollBy({ left: -500 });
});

pastriesr.addEventListener("click", (event) => {
  pastriesg.scrollBy({ left: 500 });
});

const sweettreatsl = document.getElementById("sweet-treats-left");
const sweettreatsr = document.getElementById("sweet-treats-right");
const sweettreatsg = document.getElementById("sweet-treats-grid");
sweettreatsl.addEventListener("click", (event) => {
  sweettreatsg.scrollBy({ left: -500 });
});

sweettreatsr.addEventListener("click", (event) => {
  sweettreatsg.scrollBy({ left: 500 });
});
