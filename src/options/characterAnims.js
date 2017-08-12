let heroDescriptions = {
	ninja:{name:'Ninja',bonus:'visibility and mapping',extra:'see further for longer with ninja',mappedBonus:{14:1,18:2}},
	mage: {name:'Mage',bonus:'extra potions',extra:'potions offer strength, weapons or health',mappedBonus:{16:1,19:2}},
	ranger: {name:'Ranger',bonus:'map trail bonus',extra:'trail your route and see maps',mappedBonus:{12:1,15:2}},
	healer:{name:'Healer',bonus:'health pot & shield',extra:'live a lot longer with these',mappedBonus:{24:1,28:2}}
}

function characterAnims(props) {
	let canvas = document.getElementById('pm_'+props.hero)
	let ctx;
	let menuticker
	let frame=32
	let rotating = [0,72]
	if(canvas) {	
		let cancelTick=()=>{
			window.cancelAnimationFrame(menuticker)
			canvas.removeEventListener('mouseout',cancelTick)
		}
		canvas.addEventListener("mouseout", cancelTick.bind(this))
		ctx = canvas.getContext('2d');
		ctx.drawImage(props.loader.getImage(props.hero),frame,rotating[1],32,36,12,12,75,58)
		let start=0
		let frameCount = 0
		let name = props.hero.slice(0,props.hero.length-2)
		let animate=(delta)=> {
			frameCount++
			ctx.clearRect(0,0,canvas.width,canvas.height)
			ctx.drawImage(props.loader.getImage(props.hero),frame,rotating[1],32,36,12,12,75,58)
			ctx.fillStyle='#fef'
			ctx.font='46px Arial'
			ctx.fillText(heroDescriptions[name].name,95,55)
			ctx.font='20px Arial'
			ctx.fillText(heroDescriptions[name].bonus,20,90)
			ctx.font='14px Arial'
			ctx.fillText(heroDescriptions[name].extra,20,110)
			if(frameCount>8) {
				frame+=32
				frameCount=0;
			}

			if(frame>=96) {
				frame=0;
				rotating[0]+=1
			}
			if(rotating[0]>5) {
				rotating[1]+=36
				rotating[0]=0
			}
			if(rotating[1]>108) {
				rotating=[0,0]
			}
		}

		let tick=(timestamp)=>{
			if(!start)
				start = timestamp
			let progress = timestamp-start
			let delta = (timestamp-start) / 1000.0;
			delta = Math.min(delta, 0.25); 
			animate(delta)
			if(progress>13000)
				cancelTick()
			else menuticker = window.requestAnimationFrame(tick)
		}
		menuticker = window.requestAnimationFrame(tick)
	}
}
export default characterAnims