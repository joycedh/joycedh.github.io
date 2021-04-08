let maxX, maxY;

 function placeImg(x) {
     var div = document.getElementById("gan-scene");

     for (counter=1;counter<=x;counter++){
         imgSrc=`ganimages/AI-${counter}.JPG`
         const {random: r} = Math;
         const x = r() * maxX;
         const y = r() * maxY;
         const d = Math.floor(Math.random() * 3) + 0.2;
         var random_image = 
             `<div data-depth="${d}" id="gan-images">
                 <img class="gan-image" style="left: ${x}px; top: ${y}px;" src="${imgSrc}" />
                 </div>`;
         var divHtml = div.innerHTML; 
         div.innerHTML = divHtml + random_image;
     }
 }




 onload = function() {
     maxX = innerWidth - 300;
     maxY = innerHeight - 300;
     placeImg(16);
     var scene = document.getElementById("gan-scene");
     var parallaxInstance = new Parallax(scene);
     var div = document.getElementById("gan-scene");
     div.innerHTML += `<div data-depth="0.0" class="art_text">
     GAN art</div>`


 }