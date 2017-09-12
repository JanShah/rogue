export default function()
{
	let touchCoords
	let addEvents = ()=>{
		window.addEventListener('touchstart', (e)=>{
				// console.log('touchstart',e.changedTouches[0])
				console.log('touch events: ')
				let x = e.changedTouches[0].screenX
				let y = e.changedTouches[0].screenY
				touchCoords = {x:x,y:y}
				return touchCoords					
		});

		window.addEventListener('touchmove', (e)=>{
				let x = e.changedTouches[0].screenX
				let y = e.changedTouches[0].screenY
				touchCoords = {x:x,y:y}
		});
		window.addEventListener('touchend', (e)=>{
				let x = e.changedTouches[0].screenX
				let y = e.changedTouches[0].screenY
				touchCoords = {x:x,y:y}
				return touchCoords
			 // console.log('touchstart',e.changedTouches[0])
		});
	}
	
}