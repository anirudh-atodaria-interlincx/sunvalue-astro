class FlipDown{constructor(uts,el="flipdown",opt={}){if("number"!=typeof uts)throw new Error(`FlipDown: Constructor expected unix timestamp, got ${typeof uts} instead.`);"object"==typeof el&&(opt=el,el="flipdown"),this.version="0.3.2",this.initialised=!1,this.now=this._getTime(),this.epoch=uts,this.countdownEnded=!1,this.hasEndedCallback=null,this.element=document.getElementById(el),this.rotors=[],this.rotorLeafFront=[],this.rotorLeafRear=[],this.rotorTops=[],this.rotorBottoms=[],this.countdown=null,this.daysRemaining=0,this.clockValues={},this.clockStrings={},this.clockValuesAsString=[],this.prevClockValuesAsString=[],this.opts=this._parseOptions(opt),this._setOptions(),console.log(`FlipDown ${this.version} (Theme: ${this.opts.theme})`)}start(){return this.initialised||this._init(),this.countdown=setInterval(this._tick.bind(this),1e3),this}ifEnded(cb){return this.hasEndedCallback=function(){cb(),this.hasEndedCallback=null},this}_getTime(){return(new Date).getTime()/1e3}_hasCountdownEnded(){return this.epoch-this.now<0?(this.countdownEnded=!0,null!=this.hasEndedCallback&&(this.hasEndedCallback(),this.hasEndedCallback=null),!0):this.countdownEnded=!1}_parseOptions(opt){let headings=["Days","Hours","Minutes","Seconds"];return opt.headings&&4===opt.headings.length&&(headings=opt.headings),{theme:opt.hasOwnProperty("theme")?opt.theme:"dark",headings:headings}}_setOptions(){this.element.classList.add("flipdown__theme-"+this.opts.theme)}_init(){this.initialised=!0,this._hasCountdownEnded()?this.daysremaining=0:this.daysremaining=Math.floor((this.epoch-this.now)/86400).toString().length;for(var dayRotorCount=this.daysremaining<=2?2:this.daysremaining,i=0;i<dayRotorCount+6;i++)this.rotors.push(this._createRotor(0));for(var dayRotors=[],i=0;i<dayRotorCount;i++)dayRotors.push(this.rotors[i]);this.element.appendChild(this._createRotorGroup(dayRotors,0));for(var count=dayRotorCount,i=0;i<3;i++){for(var otherRotors=[],j=0;j<2;j++)otherRotors.push(this.rotors[count]),count++;this.element.appendChild(this._createRotorGroup(otherRotors,i+1))}return this.rotorLeafFront=Array.prototype.slice.call(this.element.getElementsByClassName("rotor-leaf-front")),this.rotorLeafRear=Array.prototype.slice.call(this.element.getElementsByClassName("rotor-leaf-rear")),this.rotorTop=Array.prototype.slice.call(this.element.getElementsByClassName("rotor-top")),this.rotorBottom=Array.prototype.slice.call(this.element.getElementsByClassName("rotor-bottom")),this._tick(),this._updateClockValues(!0),this}_createRotorGroup(rotors,rotorIndex){var rotorGroup=document.createElement("div"),dayRotorGroupHeading=(rotorGroup.className="rotor-group",document.createElement("div"));return dayRotorGroupHeading.className="rotor-group-heading",dayRotorGroupHeading.setAttribute("data-before",this.opts.headings[rotorIndex]),rotorGroup.appendChild(dayRotorGroupHeading),appendChildren(rotorGroup,rotors),rotorGroup}_createRotor(v=0){var rotor=document.createElement("div"),rotorLeaf=document.createElement("div"),rotorLeafRear=document.createElement("figure"),rotorLeafFront=document.createElement("figure"),rotorTop=document.createElement("div"),rotorBottom=document.createElement("div");return rotor.className="rotor",rotorLeaf.className="rotor-leaf",rotorLeafRear.className="rotor-leaf-rear",rotorLeafFront.className="rotor-leaf-front",rotorTop.className="rotor-top",rotorBottom.className="rotor-bottom",rotorLeafRear.textContent=v,rotorTop.textContent=v,rotorBottom.textContent=v,appendChildren(rotor,[rotorLeaf,rotorTop,rotorBottom]),appendChildren(rotorLeaf,[rotorLeafRear,rotorLeafFront]),rotor}_tick(){this.now=this._getTime();var diff=this.epoch-this.now<=0?0:this.epoch-this.now;this.clockValues.d=Math.floor(diff/86400),diff-=86400*this.clockValues.d,this.clockValues.h=Math.floor(diff/3600),diff-=3600*this.clockValues.h,this.clockValues.m=Math.floor(diff/60),diff-=60*this.clockValues.m,this.clockValues.s=Math.floor(diff),this._updateClockValues(),this._hasCountdownEnded()}_updateClockValues(init=!1){function rotorTopFlip(){this.rotorTop.forEach((el,i)=>{el.textContent!=this.clockValuesAsString[i]&&(el.textContent=this.clockValuesAsString[i])})}function rotorLeafRearFlip(){this.rotorLeafRear.forEach((el,i)=>{var flip;el.textContent!=this.clockValuesAsString[i]&&(el.textContent=this.clockValuesAsString[i],el.parentElement.classList.add("flipped"),flip=setInterval((function(){el.parentElement.classList.remove("flipped"),clearInterval(flip)}).bind(this),500))})}this.clockStrings.d=pad(this.clockValues.d,2),this.clockStrings.h=pad(this.clockValues.h,2),this.clockStrings.m=pad(this.clockValues.m,2),this.clockStrings.s=pad(this.clockValues.s,2),this.clockValuesAsString=(this.clockStrings.d+this.clockStrings.h+this.clockStrings.m+this.clockStrings.s).split(""),this.rotorLeafFront.forEach((el,i)=>{el.textContent=this.prevClockValuesAsString[i]}),this.rotorBottom.forEach((el,i)=>{el.textContent=this.prevClockValuesAsString[i]}),init?(rotorTopFlip.call(this),rotorLeafRearFlip.call(this)):(setTimeout(rotorTopFlip.bind(this),500),setTimeout(rotorLeafRearFlip.bind(this),500)),this.prevClockValuesAsString=this.clockValuesAsString}}function pad(n,len){return(n=n.toString()).length<len?pad("0"+n,len):n}function appendChildren(parent,children){children.forEach(el=>{parent.appendChild(el)})}