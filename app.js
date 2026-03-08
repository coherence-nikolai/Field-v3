
const canvas = document.getElementById("field")
const ctx = canvas.getContext("2d")

const subtitle = document.getElementById("subtitle")
const meter = document.getElementById("meter")
const voiceText = document.getElementById("voiceText")
const aiText = document.getElementById("aiText")

const gear = document.getElementById("gear")
const settingsPanel = document.getElementById("settingsPanel")
const saveKey = document.getElementById("saveKey")
const clearKey = document.getElementById("clearKey")
const apiKeyInput = document.getElementById("apiKeyInput")

gear.onclick = () => settingsPanel.classList.toggle("hidden")

saveKey.onclick = () => {
localStorage.setItem("field_ai_key", apiKeyInput.value)
settingsPanel.classList.add("hidden")
}

clearKey.onclick = () => {
localStorage.removeItem("field_ai_key")
apiKeyInput.value = ""
}

let width, height

function resize(){
width = canvas.width = window.innerWidth
height = canvas.height = window.innerHeight
}

window.addEventListener("resize", resize)
resize()

class Particle{
constructor(){
this.x=Math.random()*width
this.y=Math.random()*height
this.vx=(Math.random()-0.5)*0.2
this.vy=(Math.random()-0.5)*0.2
this.size=Math.random()*1.6+0.3
}

update(){
this.x+=this.vx
this.y+=this.vy
this.vx*=0.99
this.vy*=0.99

if(this.x<0)this.x=width
if(this.x>width)this.x=0
if(this.y<0)this.y=height
if(this.y>height)this.y=0
}

draw(){
ctx.beginPath()
ctx.fillStyle="rgba(240,204,136,0.6)"
ctx.arc(this.x,this.y,this.size,0,Math.PI*2)
ctx.fill()
}
}

const particles=[]
for(let i=0;i<70;i++) particles.push(new Particle())

let state="field"
let coherence=0
const target=10

function startObserve(){

state="observe"
subtitle.textContent="observe"
meter.innerHTML=""
voiceText.textContent=""
aiText.textContent=""
coherence=0

for(let i=0;i<target;i++){
let d=document.createElement("div")
d.className="dot"
meter.appendChild(d)
}

let timer=setInterval(()=>{

if(state!=="observe"){clearInterval(timer);return}

coherence++
meter.children[coherence-1].classList.add("on")

if(coherence>=target){

state="collapse"
subtitle.textContent="reflect"

voiceText.textContent="tap to reflect"

clearInterval(timer)

}

},1000)
}

async function runAIReflection(transcript){

let key=localStorage.getItem("field_ai_key")
if(!key) return

aiText.textContent="reflecting..."

try{

let response=await fetch("https://api.openai.com/v1/chat/completions",{
method:"POST",
headers:{
"Content-Type":"application/json",
"Authorization":"Bearer "+key
},
body:JSON.stringify({
model:"gpt-4.1-mini",
messages:[
{role:"system",content:"You are a contemplative guide. Respond with one calm reflective sentence."},
{role:"user",content: transcript}
],
max_tokens:40
})
})

let data=await response.json()

aiText.textContent=data.choices?.[0]?.message?.content || ""

}catch(e){

aiText.textContent="AI unavailable"

}

}

function handleInput(){

if(state==="field"){
startObserve()
return
}

if(state==="collapse"){

state="reflecting"

let transcript="I feel calmer and more open."

voiceText.textContent=transcript

runAIReflection(transcript)

return
}

if(state==="reflecting"){

state="field"

subtitle.textContent="enter the field"
meter.innerHTML=""
voiceText.textContent=""
aiText.textContent=""

}

}

document.addEventListener("touchstart", handleInput)
document.addEventListener("mousedown", handleInput)

function animate(){

requestAnimationFrame(animate)

ctx.fillStyle="rgba(10,8,5,0.35)"
ctx.fillRect(0,0,width,height)

for(let p of particles){
p.update()
p.draw()
}

}

animate()
