let randNumImg1 = Math.floor(Math.random() * 6) + 1;
let randNumImg2 = Math.floor(Math.random() * 6) + 1;

let radomImgOne = "images/dice" + randNumImg1 + ".png";
let randImgTwo  = "images/dice" + randNumImg2 + ".png";

let imgOne = document.querySelectorAll('img')[0];
imgOne.setAttribute("src", radomImgOne);

document.querySelectorAll('img')[1].setAttribute("src", randImgTwo);

if(randNumImg1 < randNumImg2){
  document.querySelector("h1").innerHTML = "Player 2 Wins ";
}
else if(randNumImg1 > randNumImg2){
  document.querySelector("h1").innerHTML = "Player 1 Wins";
}
else{
  document.querySelector("h1").innerHTML = "Tie !";
}
