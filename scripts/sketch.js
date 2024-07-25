let engine, world, ground, leftWall, rightWall, canvas, mouse, mouseConstraint, noPortfolioItems;
let blocks = [];
let blockSize;
let hoveredBlock = null;
let clickedBlock = null;
let portfolio;
let bI = 0;

function preload() {
    loadJSON('portfolio_info.json', importJSON, jsonLoadError);
}

function importJSON(jsondata) {
    portfolio = jsondata;
}

function jsonLoadError() {
    console.error("Failed to load portfolio_info.json");
}

// SETUP: P5js canvas + Matterjs for falling blocks + blockinfo.
function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('sketch-container');

    engine = Matter.Engine.create();
    world = engine.world;
    Matter.Runner.run(engine);

    ground = Matter.Bodies.rectangle(width / 2, height + 23, width, 50, { isStatic: true });
    Matter.World.add(world, ground);

    leftWall = Matter.Bodies.rectangle(0, height / 2, 50, height, { isStatic: true });
    rightWall = Matter.Bodies.rectangle(width, height / 2, 50, height, { isStatic: true });
    Matter.World.add(world, [leftWall, rightWall]);

    blockSize = (width+height) * 0.07;

    for (let i = 1; i < portfolio.works + 1; i++) {
        let x = random(0.1 * width, width - 0.1 * width);
        let y = random(0, 0.3 * height);

        let block = Matter.Bodies.rectangle(x, y, blockSize, blockSize);

        let work = portfolio[String(i)];
        block.title = work.title;
        block.info = work.description;
        block.exhibited = work.exhibited;
        block.links = work.extra_links;
        block.sliderImages = work.images.map(file => `imgs/${work.imagefolder}/${file}`);
        block.tags = work.tags;

        block.img = null; 
        // block.img = loadImage("imgs/${work.imagefolder}/${work.main_img}");
        blocks.push(block);
        Matter.World.add(world, block);
    }

    mouse = Matter.Mouse.create(canvas.elt);
    mouse.pixelRatio = pixelDensity();  
    mouseConstraint = Matter.MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: {
                visible: false
            }
        }
    });
    Matter.World.add(world, mouseConstraint);

    mouseConstraint.mouse.element.removeEventListener("mousewheel", mouseConstraint.mouse.mousewheel);
    mouseConstraint.mouse.element.removeEventListener("DOMMouseScroll", mouseConstraint.mouse.mousewheel);

    Matter.Events.on(mouseConstraint, "mouseup", function(event) {
        let selectedBlock = Matter.Query.point(blocks, event.mouse.position);
        if (selectedBlock.length > 0) {
            clickedBlock = selectedBlock[0];

            displayInfo(clickedBlock);
            scrollCanvas('down');
        } else {
            clickedBlock = null;
            clearInfo();
            scrollCanvas('up');
        }
    });

    Matter.Events.on(mouseConstraint, "mousemove", function(event) {
        let isHover = Matter.Query.point(blocks, event.mouse.position);
        if (isHover.length > 0) {
            hoveredBlock = isHover[0];
        } else {
            hoveredBlock = null;
        }
    });
}

// P5js draw func xoxo
function draw() {
    background(0);
    fill(255);
    rect(0, height - 2, width, 2);
    cursor(ARROW);

    fill(255);
    for (let block of blocks) {
        if (block.position.y > -blockSize && block.position.y < height + blockSize) {
            push();
            translate(block.position.x, block.position.y);
            rotate(block.angle);
            rectMode(CENTER);
            imageMode(CENTER);

            if (block.img) {
                image(block.img, 0, 0, blockSize, blockSize);
            } else {
                fill(100); 
                rect(0, 0, blockSize, blockSize);
            }

            if (block === hoveredBlock) {
                fill(0, 0, 255);
                textAlign(LEFT);
                textStyle(BOLD);
                textFont("Space Grotesk");
                textWrap(CHAR);
                let len = block.title.length;
                if (len < 10) {
                    textSize(blockSize/3);
                } else {
                    textSize(blockSize/4)
                }
                stroke(255);
                strokeWeight(4);
                text(block.title.toUpperCase(), 0, 0, 0.9*blockSize, 0.9*blockSize);
                cursor(HAND);
            }

            pop();
        }
    }

    if (bI < portfolio.works) {
        let work = portfolio[String(bI + 1)];
        blocks[bI].img = loadImage(`imgs/${work.imagefolder}/${work.main_img}`);
        bI++;
    }
}


function displayInfo(block) {
    $('#info-container').html(`<h1><mark>${block.title}</mark></h1><p>${block.info}</p>`);
    let sliderContainer = $('.slider');

    if (sliderContainer.hasClass('slick-initialized')) {
        sliderContainer.slick('unslick');
    }
    sliderContainer.html('');

    block.sliderImages.forEach(img => {
        sliderContainer.append(`<div><img src="${img}" /></div>`);
    });
    sliderContainer.show();

    sliderContainer.slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 2,
        slidesToScroll: 1,
        centerMode: false,
        variableWidth: true,
        adaptiveHeight: true,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: false, 
                    variableWidth: true,
                    infinite: true 
                }
            }
        ]
    });

    // add links
    let linksContainer = $('#links');
    linksContainer.html(''); 
    if (block.links && block.links.length > 0) {
        linksContainer.append("<div><h4>Links:</h4><ul>");
        block.links.forEach(link => {
            linksContainer.append(`<li><a href="${link.link}" target="_blank">${link.title}</a></li>`);
        });
        linksContainer.append('</ul></div>');
    }

    let exhibitedContainer = $('#exhibited');
    exhibitedContainer.html(''); 
    if (block.exhibited && block.exhibited.length > 0) {
        exhibitedContainer.append("<div><h4>Exhibited at:</h4><ul>");
        block.exhibited.forEach(link => {
            exhibitedContainer.append(`<li><a href="${link.link}" target="_blank">${link.title}</a></li>`);
        });
        exhibitedContainer.append('</ul></div>');
    }
}

function clearInfo() {
    $('#info-container').html('');
    $('#links').html('');
    $('#exhibited').html('');

    let sliderContainer = $('.slider');
    if (sliderContainer.hasClass('slick-initialized')) {
        sliderContainer.slick('unslick'); 
    }
    sliderContainer.hide(); 
}



function scrollCanvas(where) {
    if (where === 'down') {
        window.scrollTo({
            top: height / 2,
            behavior: "smooth"
        });
    } else if (where === 'up') {
        window.scrollTo({
            top: height / 2,
            behavior: "smooth"
        });
    }
}
