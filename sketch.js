const canvasWidth = window.innerWidth
const canvasHeight = window.innerHeight

let carouselImages = []
let effect1Images = []
let counter = 0


const rightArrowHeight = 100, rightArrowWidth = 100
const rightArrowPosition = {
    x: canvasWidth - canvasWidth/5,
    y: canvasHeight/2 - 50,
}
const controlCircleSize = 50
let circlePositions
let randomImagePositions

function preload(){
    

    for(let i = 1; i < 11; i++){
        console.log(`${i}.0.jpg`) 
        carouselImages.push(loadImage(`assets/img/${i}.0.jpg`))
    }

    for(let i = 0; i < 10; i++){
        effect1Images.push(loadImage(`assets/1/1.${i}.jpg`))
    }
}

function setup (){
    createCanvas(canvasWidth, canvasHeight)

    circlePositions = Array.from({length: carouselImages.length}, (el, i) => {
        const x = canvasWidth/4 + i * controlCircleSize
        const y = canvasHeight - canvasHeight/6
        return {
            x,y
        }
    })

    randomImagePositions = Array.from({length: effect1Images.length}, () => {
        const x = random(canvasWidth/4, canvasWidth - canvasWidth/4 - 100)
        const y = random(canvasHeight/4, canvasHeight - canvasHeight/4 - 100)
        return {
            x, y
        }
    })
}

function draw(){
    background(200)
    if(!checkHover()){
        drawRightArrow()
        console.log(circlePositions)
        circlePositions.forEach((position, idx) => {
            stroke(0)
            if(idx === counter % carouselImages.length){
                fill(0)
            }else{
                noFill()
            }
            
            ellipse(position.x, position.y, 30)
        })
    }
    

    //instead of this if then
    // we will create a function called imageEffect and pass in the counter value

    if(counter % carouselImages.length === 0){
        if(checkHover()){
            image(carouselImages[counter % carouselImages.length], canvasWidth/4, canvasHeight/4, canvasWidth/2, canvasHeight/2)
           effect1()
        }else{
            image(carouselImages[counter % carouselImages.length], canvasWidth/4, canvasHeight/4, canvasWidth/2, canvasHeight/2)
        }

    }else {
        image(carouselImages[counter % carouselImages.length], canvasWidth/4, canvasHeight/4, canvasWidth/2, canvasHeight/2)
    }
   


    //CAROUSEL
    // depending on which item there will be a different effect
}

function mousePressed(){
    checkCircles(mouseX, mouseY)
    if(mouseX > rightArrowPosition.x &&
        mouseX < rightArrowPosition.x + rightArrowWidth &&
        mouseY > rightArrowPosition.y &&
        mouseY < rightArrowPosition.y + rightArrowHeight){
            counter++
        }
}

const checkCircles = (mX, mY) => {
    circlePositions.forEach((circlePosition, idx) => {
        if(mouseX > circlePosition.x - controlCircleSize/2 &&
            mouseX < circlePosition.x + controlCircleSize/2 &&
            mouseY > circlePosition.y - controlCircleSize/2 &&
            mouseY < circlePosition.y + controlCircleSize/2){
                counter = idx
            }
    })
}


const drawRightArrow = () => {

    fill(130)
    rect(rightArrowPosition.x, rightArrowPosition.y, rightArrowHeight, rightArrowWidth)
    fill(30)
    textSize(60)
    text('->', rightArrowPosition.x + 20, rightArrowPosition.y + 65)
}

const imageEffect = (counter) => {
    // decide which effect to use
    switch(counter){
        case '0' : //do one thing
        case '1' : // do another thing
    }
}


const checkHover = () => {
    if(mouseX > canvasWidth/4 && 
        mouseX < canvasWidth/4 + canvasWidth/2 &&
        mouseY > canvasHeight/4 && 
        mouseY < canvasHeight/4 + canvasHeight/2){
            return true
        }else{
            return false
        }

}

const effect1  = () => {
    effect1Images.forEach((img, i) => {
        image(img, randomImagePositions[i].x, randomImagePositions[i].y, 100, 100)
    })
}