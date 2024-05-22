'use strict'
const canvas = document.createElement("canvas")
const context = canvas.getContext("2d")
document.body.append(canvas)
canvas.width = 1920
canvas.height = 960
const roomWidth = 1600
const roomHeight = 700
let roomImage = null

context.fillStyle = 'lime'
context.fillRect(0,0,canvas.width,canvas.height)

const View={

    width: innerWidth,
    height:innerHeight,
    offsetX:0,
    offsetY:0,
    rate:0.5
}
onresize=updateView
function updateView(){
    if (innerWidth<innerHeight) return showTurnDeviceIcon()

    const Width = (innerWidth * View.rate > innerHeight) ? innerHeight / View.rate : innerWidth
    const Height = Width * View.rate
    View.width = Width 
    View.height = Height
    View.offsetX = (innerWidth - Width) * 0.5
    View.offsetY = (innerHeight - Height) * 0.5
    canvas.style.width = Width + 'px'
    canvas.style.height = Height + 'px'

}

function showTurnDeviceIcon(){
    alert("Поверните телефон")

}

updateView()

///////////////////////////////////////////////////////////
const IMAGES_PATH='./src/images/'
const SOUNDS_PATH='./src/sounds/'
const IMAGES_TO_UPLOAD=[
    'key.png','cat.png','eat.png','note.png','computer.png','broom.png','pomade.png','pillows.png','strawberry.png','toy.png','room1.webp'
]
const SOUNDS_TO_UPLOAD=['win.mp3','error.mp3']
const IMG={}
const SE={}
let uploadSize=IMAGES_TO_UPLOAD.length+SOUNDS_TO_UPLOAD.length
let uploadStep=0
IMAGES_TO_UPLOAD.forEach(data => uploadImages(data))
SOUNDS_TO_UPLOAD.forEach(data => uploadSounds(data))
function uploadImages(imageName){
    IMG[imageName]=new Image()
    IMG[imageName].src=IMAGES_PATH+imageName
    IMG[imageName].onload=()=>updateLoadingProgress()
}
function uploadSounds(SoundName){
    SE[SoundName]=new Audio()
    SE[SoundName].src=SOUNDS_PATH+SoundName
    SE[SoundName].oncanplaythrough=(e)=>{
        e.target.oncanplaythrough=null
        updateLoadingProgress()
    
    }
}
function updateLoadingProgress(){
    uploadStep++
    if (uploadStep===uploadSize) loadingDone()

}
function loadingDone(){
    generateBackground(IMG['room1.webp'])
    animation()
}
function animation(){
    context.clearRect(0,0,canvas.width,canvas.height)
    context.fillStyle='#00000077'
    context.fillRect(0,0,canvas.width,canvas.height)
    context.drawImage(roomImage,0,0)

    requestAnimationFrame(animation)
}
function generateBackground(img){
    roomImage=document.createElement('canvas')
    room.width=roomWidth
    room.height=roomHeight
    const roomContext = room.getContext ('2d')
    let scaleX=img.width/roomWidth //1200/1600=0.75  1800/1600=1.125
    let scaleY=img.height/roomHeight //600/700=0.86  900/700=1.29
    if(scaleX>0 && scaleY>0){
        if(scaleX>scaleY){
            scaleX=scaleY
        } else {
            scaleY=scaleX
        }
    } else{
        if(scaleX<scaleY){
            scaleX=scaleY
        } else {
            scaleY=scaleX
        }
    }
  let offsetX=(img.width/scaleX-roomWidth)/2
  let offsetY=(img.height/scaleY-roomHeight)/2
  roomContext.drawImage(img,offsetX,offsetY,img.width/scaleX,img.height/scaleY)
}

