export const game=()=>'something'

export const boxGrid=()=>{
	return {
		grid: ['grid',0,0,0,0,'white'],
		enemies:['enemies',0,0,0,0,'white'],
		bonuses:['bonuses',0,0,0,0,'white'],
		width:['width',0,0,0,0,'white'],
		height:['height',0,0,0,0,'white'],
		rooms: ['rooms',0,0,0,0,'white'],
		player:['player',3,1,1,5,'#d2d1db']
	};
};

export const presetData=()=>{
	return {
		1:{
			level:'easy',
			grid:50,
			enemies: 5,
			bonuses: 30,
			width:8,
			height:8,
			rooms:5,
			hero:'ninja_m',
			preset:1
		},
		2: {
			level:'medium',
			grid:70,
			enemies: 10,
			bonuses: 20,
			width:12,
			height:14,
			rooms:10,
			hero:'ninja_m',
			preset:2        
		},
		3: {
			level:'hard',
			grid:80,
			enemies: 20,
			bonuses: 10,
			width:12,
			height:15,
			rooms:15,
			hero:'ninja_m',
			preset:3        
		},
		4: {
			level:'unfair',
			grid:100,
			enemies: 35,
			bonuses: 5,
			width:8,
			height:18,
			rooms:25,
			hero:'ninja_m',
			preset:4        
		}
	}
}

export const optionMinMax=()=>{
	return {
		grid:{
			min:50,
			max:100,
			default:60,
			name:'grid',
			label:'Dungeon Width/Height'},
		enemies:{
			min:5,
			max:30,
			default:14,
			name:'enemies',
			label:'Chance of enemies'},
		bonuses:{
			min:5,
			max:30,
			default:12,
			name:'bonuses',
			label:'Chance of bonuses'},
		width:{
			min:7,
			max:14,
			default:8,
			name:'width',
			label:'Max Width of each room'},
		height:{
			min:7,
			max:14,
			default:9,
			name:'height',
			label:'Max height of each room'},
		rooms:{
			min:5,
			max:20,
			default:7,
			name:'rooms',
			label:'Maximum Number of rooms'}
	}
}

export const grid =()=>{
	return [
		`"grid" "enemies" "bonuses" "width" "height" "rooms" "player"`,
		`"grid enemies" "bonuses width" "height rooms" "player player"`,
		`"grid enemies bonuses" "width height rooms" "player player player"`,
		`"grid enemies bonuses width height rooms " "player player player player player player"`
	]
}

export const players=sex=>{
	return {
		name:['mage_'+sex,'healer_'+sex,'ninja_'+sex,'ranger_'+sex]
	}

}

export const wallList=()=> {
		return {
			't':['tl','tr'],
    	'r':['tr','br'],
    	'b':['bl','br'],
			'l':['tl','bl']
		}
}