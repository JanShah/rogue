import colors from './colors'
export default function getHP(who) 
{
	let hpBar = {
		coords:[
			who.x-22.5,
			who.y-45,
			who.hp/3, 12
		],
		//xp bar is coloured based on color map, green to red
		fill: colors(who.hp),
		stroke: [
			who.x-22.5,
			who.y-45,
			(!who.maxHP)?Math.floor(who.hp/3):who.maxHP/3,
			12
		],
			text:{
				xp:who.xp?'xp: '+who.xp:'', 
				coords:[
					who.x-20.5,
					who.y-36
				]
	}

	}
return hpBar
}