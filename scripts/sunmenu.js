document.addEventListener('DOMContentLoaded', () => {
    const menuCircle = document.getElementById('menuCircle');

    menuCircle.addEventListener('click', () => {
        menuCircle.classList.toggle('open');
    });
});


function makeSpiral(pathId, centreX, centreY, startRadius, endRadius, quarterTurns)
{
  var pointsPerQuarter = 90;
  var radiusStep = (endRadius - startRadius) / 4 / pointsPerQuarter;
  var points = [];

  for (var i=0; i < quarterTurns * pointsPerQuarter; i++)
  {
    var radius = startRadius + radiusStep * i;
    var angle = i * Math.PI / 2 / pointsPerQuarter;
    points.push(centreX + radius * Math.cos(angle));
    points.push(centreY + radius * Math.sin(angle));
  }
  document.getElementById(pathId).setAttribute("points", points.join(','));
}


document.addEventListener('DOMContentLoaded', () => {
    makeSpiral("spiral", 10, 10, 0, 1.2, 8.5);

    const menuCircle = document.getElementById('menuCircle');
    const spiraltext = document.getElementById('spiraltext');

    menuCircle.addEventListener('mouseenter', () => {
        spiraltext.setAttribute('startOffset', '0%');
        spiraltext.innerHTML = "";
        spiraltext.innerHTML = `
            JOISUJOISU  ☆  ジョイスジョイス
            <animate attributeName="startOffset" from="100%" to="-85%" begin="0s" dur="7s" repeatCount="indefinite"/>
        `;
    });

    menuCircle.addEventListener('mouseleave', () => {
        spiraltext.innerHTML = "";
    });
});