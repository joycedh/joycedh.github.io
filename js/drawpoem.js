
// Inspiration from: P_2_3_3_01
// http://www.generative-gestaltung.de

'use strict';

var x = 0;
var y = 0;
var stepSize = 5.0;

var font = 'Joyce Regular';
var letters = 'Weet je nog? Weet je nog toen ik mijn lijn tekende? En toen ik alle andere lijnen die mijn leven hadden kunnen zijn of misschien nag gingen worden in de toekomst tekende? Ik weet het nog. Wat ik toen niet had kunnen weten was hoe een mega uitschieter alle lijnen van iedereen zouden maken ineens. Allemaal tegelijk. Ergens vind ik dat ook wel een fijne gedachte, dat ik niet alleen ben in mijn rare lijn-heid maar dat we allemaal een beetje raar zijn aangelijnd op het moment. Het brengt ons toch een beetje bij elkaar ook al kunnen onze lijnen elkaar niet meer passeren. Of nouja, ze kunnen het wel maar het mag niet echt meer. Om elkaar te beschermen tegen het eindigen van je lijn. Daar zou ik nu al helemaal niet aan moeten denken. Aan het niet-meer-zijn, , het verdwijn, het ont-zijn van mijn kleine, onvolbrachte lijn. Ik vind het maar wat zo. Het is saai, minder druk, heel alleen, een beetje leeg, maar toch soms ook wel weer goed, maar meestal goed geweest. Het is vooral heel anders. Heel anders dan ik ooit had verwacht aan te lijnen. Heel anders dan elk terrein wat ik ooit had bedacht op te stuiten. Anders dan de heetste, alleenste woestijn die ik had kunnen bedenken. Want als je je in de woestijn begeeft op reis, begeef je je daar vrijwillig. Maar dit is een onvrijwillige verpakt als semi-vrijwillige woestijn, en niemand weet waar het einde is waar we met zijn allen weer water mogen drinken. Want sociaal contact voelt wel een beetje als water. O zo cruciaal maar o zo onbereikbaar. Ik verlang naar het moment wanneer ik alle kleurige lijnen weer om mij heen mag zien dansen en ze allemaal mag aanraken zonder dat mijn lijn daarvan een beetje breekt.';
var fontSize = 50;
var angleDistortion = 0.0;

var counter = 0;
let value = 'white';

function drawArrow(base, vec, myColor) {
    push();
    stroke(myColor);
    strokeWeight(3);
    fill(myColor);
    translate(base.x, base.y);
    line(0, 0, vec.x, vec.y);
    rotate(vec.heading());
    let arrowSize = 7;
    translate(vec.mag() - arrowSize, 0);
    triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
    pop();
  }

function setup() {

    var canvas = createCanvas(displayWidth, displayHeight);
    canvas.parent('lijntje');
    canvas.position(0, 0)
    background(0);

    x = 0.5 * displayWidth;
    y = 1.3 * displayHeight;

    textFont(font);

    // arrows:
    let centerY = 0.95 * displayHeight;
    let centerX = 0.95 * displayWidth;
    
    strokeWeight(3);
    stroke(color(163, 234, 163));
    line(centerX, centerY-6, centerX, centerY-12);
    triangle(centerX-3, centerY-12, centerX, centerY-16, centerX+3, centerY-12);
    stroke(color(163, 198, 234));
    line(centerX, centerY+6, centerX, centerY+12);
    triangle(centerX-3, centerY+12, centerX, centerY+16, centerX+3, centerY+12);
    stroke(color(234, 163, 163));
    line(centerX-6, centerY, centerX-12, centerY);
    triangle(centerX-16, centerY, centerX-12, centerY-3, centerX-12, centerY+3);
    stroke(color(234, 234, 163));
    line(centerX+6, centerY, centerX+12, centerY);
    triangle(centerX+16, centerY, centerX+12, centerY-3, centerX+12, centerY+3);
  
    strokeWeight(1);
}

  
function draw() {
  fill(value);

  var d = dist(x, y, mouseX, mouseY);
  textSize(fontSize);
  var newLetter = letters.charAt(counter);
  stepSize = textWidth(newLetter);

  if (d > stepSize) {
    var angle = atan2(mouseY - y, mouseX - x);

    push();
    translate(x, y);
    rotate(angle + random(angleDistortion));
    text(newLetter, 0, 0);
    pop();

    counter++;
    if (counter >= letters.length) counter = 0;
        x = x + cos(angle) * stepSize;
        y = y + sin(angle) * stepSize;
  }
}

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        value = color(234, 163, 163);
    } else if (keyCode === RIGHT_ARROW) {
        value = color(234, 234, 163);
    } else if (keyCode === UP_ARROW) {
        value = color(163, 234, 163);
    } else if (keyCode === DOWN_ARROW) {
        value = color(163, 198, 234);
    } else if (keyCode === ENTER) {
        value = "white";
    }
}

