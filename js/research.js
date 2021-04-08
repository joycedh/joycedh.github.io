let maxX2, maxY2;

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function placeImg2() {
    const x = getRandomArbitrary(0, maxX2) 
    const y = getRandomArbitrary(minY2, maxY2) 
    const q = Math.floor(Math.random() * Math.floor(58));

    var imgSrc =`gan1images/AI-${q}.png`;

    var random_image = 
        `<div data-depth="1.0" id="gan-images">
            <img class="gan-image2" style="left: ${x}px; top: ${y}px; bottom: " src="${imgSrc}" />
            </div>`;

    var div = document.getElementById("gan-research");
    var divHtml = div.innerHTML; 
    div.innerHTML = divHtml + random_image;
    }


onload = function() {
    maxX2 = innerWidth - 300;
    maxY2 = innerHeight - 350;
    minY2 = 0.05 * innerHeight;
    setInterval(placeImg2, 500);
    var div = document.getElementById("gan-research");
    div.innerHTML += `<div data-depth="0.0" class="text2">
    <h1>GAN research</h1></div>`
}
