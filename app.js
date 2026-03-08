
const canvas = document.getElementById("field")
const ctx = canvas.getContext("2d")

const subtitle = document.getElementById("subtitle")
const meter = document.getElementById("meter")
const voiceText = document.getElementById("voiceText")

let width, height
let deviceScale = window.devicePixelRatio || 1

function resize(){
width = canvas.width = window.innerWidth * deviceScale
height = canvas.height = window.innerHeight * deviceScale
canvas.style.width = window.innerWidth + "px"
canvas.style.height = window.innerHeight + "px"
ctx.scale(deviceScale, deviceScale)
}

window.addEventListener("resize", resize)
window.addEventListener("orientationchange", resize)
resize()

let observations = parseInt(localStorage.getItem("field_observations") || "0")

function saveObservation(){
observations++
localStorage.setItem("field_observations", observations)
}

const STATES = {
FIELD:"field",
OBSERVE:"observe",
COLLAPSE_SELECT:"collapse_select",
VOICE:"voice"
}

let currentState = STATES.FIELD

# adaptive particle count based on device performance
let baseParticles = 90
if(window.innerWidth < 500) baseParticles = 60
if(navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) baseParticles = 50

class Particle{
constructor(){ this.reset() }

reset(){
this.x = Math.random()*window.innerWidth
this.y = Math.random()*window.innerHeight
this.vx = (Math.random()-0.5)*0.2
this.vy = (Math.random()-0.5)*0.2
this.size = Math.random()*1.6 + 0.3
this.alpha = Math.random()*0.4 + 0.15
}

update(){
this.x += this.vx
this.y += this.vy
this.vx *= 0.99
this.vy *= 0.99

if(this.x < -50) this.x = window.innerWidth + 50
if(this.x > window.innerWidth + 50) this.x = -50
if(this.y < -50) this.y = window.innerHeight + 50
if(this.y > window.innerHeight + 50) this.y = -50
}

draw(){
let glowBoost = Math.min(observations * 0.002, 0.25)
let alpha = this.alpha + glowBoost

ctx.beginPath()
ctx.fillStyle = `rgba(240,204,136,${alpha})`
ctx.shadowColor = "rgba(240,204,136,.9)"
ctx.shadowBlur = 12 + observations*0.1
ctx.arc(this.x,this.y,this.size,0,Math.PI*2)
ctx.fill()
}
}

const particles=[]
for(let i=0;i<baseParticles;i++) particles.push(new Particle())

let focusParticle={x:0,y:0,r:9}
let coherence=0
const COHERENCE_TARGET=12

function startObserve(){
currentState = STATES.OBSERVE
subtitle.textContent="observe"
voiceText.textContent=""
coherence=0
meter.innerHTML=""

focusParticle.x=window.innerWidth/2
focusParticle.y=window.innerHeight/2

for(let i=0;i<COHERENCE_TARGET;i++){
const d=document.createElement("div")
d.className="dot"
meter.appendChild(d)
}

startCoherence()
}

function startCoherence(){
let interval=setInterval(()=>{

if(currentState!==STATES.OBSERVE){
clearInterval(interval)
return
}

coherence++

if(coherence<=COHERENCE_TARGET){
meter.children[coherence-1].classList.add("on")
}

if(coherence===COHERENCE_TARGET){
subtitle.textContent="choose a state"
currentState = STATES.COLLAPSE_SELECT
spawnStateParticles()
saveObservation()
}

},1000)
}

let stateParticles=[]
const STATES_LIST=["Calm","Clear","Open","Radiant","Grounded"]

function spawnStateParticles(){
stateParticles=[]
for(let i=0;i<STATES_LIST.length;i++){
let angle=(Math.PI*2/STATES_LIST.length)*i
let r=130
stateParticles.push({
name:STATES_LIST[i],
x:window.innerWidth/2+Math.cos(angle)*r,
y:window.innerHeight/2+Math.sin(angle)*r,
size:7
})
}
}

function detectStateClick(x,y){
for(let s of stateParticles){
let dx=x-s.x
let dy=y-s.y
if(Math.sqrt(dx*dx+dy*dy)<22){
collapseState(s.name)
}
}
}

function collapseState(name){
subtitle.textContent=name
currentState=STATES.VOICE
startVoiceInput()
}

function startVoiceInput(){
voiceText.textContent="tap to speak"
}

function handleInput(e){

let x = e.clientX || (e.touches && e.touches[0].clientX)
let y = e.clientY || (e.touches && e.touches[0].clientY)

if(currentState===STATES.FIELD){
startObserve()
}
else if(currentState===STATES.COLLAPSE_SELECT){
detectStateClick(x,y)
}
else if(currentState===STATES.VOICE){
currentState=STATES.FIELD
subtitle.textContent="enter the field"
meter.innerHTML=""
stateParticles=[]
voiceText.textContent=""
}

}

canvas.addEventListener("mousedown", handleInput)
canvas.addEventListener("touchstart", handleInput)

let fieldBreath=0
let lastFrame=0
const targetFPS = 60
const frameInterval = 1000/targetFPS

function animate(timestamp){

requestAnimationFrame(animate)

if(timestamp - lastFrame < frameInterval) return
lastFrame = timestamp

fieldBreath += 0.01
let pulse = (Math.sin(fieldBreath)+1)/2

ctx.fillStyle=`rgba(10,8,5,${0.32 + pulse*0.05})`
ctx.fillRect(0,0,window.innerWidth,window.innerHeight)

for(let p of particles){
p.update()
p.draw()
}

if(currentState===STATES.OBSERVE){

let r = focusParticle.r + Math.sin(fieldBreath*2)*2

ctx.beginPath()
ctx.fillStyle="#f0cc88"
ctx.shadowColor="#f0cc88"
ctx.shadowBlur=28
ctx.arc(focusParticle.x,focusParticle.y,r,0,Math.PI*2)
ctx.fill()
}

if(currentState===STATES.COLLAPSE_SELECT){
for(let s of stateParticles){

ctx.beginPath()
ctx.fillStyle="#f0cc88"
ctx.shadowColor="#f0cc88"
ctx.shadowBlur=22
ctx.arc(s.x,s.y,s.size,0,Math.PI*2)
ctx.fill()

ctx.shadowBlur=0
ctx.fillStyle="#f0cc88"
ctx.font="12px Plus Jakarta Sans"
ctx.textAlign="center"
ctx.fillText(s.name,s.x,s.y+18)
}
}

}

animate(0)
