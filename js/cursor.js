var playground = document.getElementsByTagName("BODY")[0];

var cursorArray = [
    "url('images/star1_1.png'), auto",
    "url('images/star2_1.png'), auto",
    "url('images/star3_1.png'), auto",
    "url('images/star4_1.png'), auto",
];

i = 0;

(function cursor(){
  playground.style.cursor = cursorArray[i];
  i++;
  if(i == cursorArray.length ){
    i = 0; 
  }
   setTimeout(cursor, 50);
})();