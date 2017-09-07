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

export const bonusNames = () =>{
	return {
				//shortname//name //type //description //value
    6 : ['B Gem'			,'Blue Gem'									,1,'increase max health',10],
    7 : ['G Gem'			,'Green Gem'								,1,'restore some HP',20],
    8 : ['R Gem'			,'Red Gem'									,1,'increase XP',5],
    9 : ['Scroll'			,'Scroll'										,2,'view Mini Map. Time limited',600],
    10: ['Letter'			,'Letter'										,2,'Increased Visibility Range. Time ',900],
    11: ['Map'				,'Map'											,2,'Make a trail of your travelled route.',900],
    12: ['Tome'				,'Tome'											,2,'increases knowledge, map bonuses last longer',1200],
    13: ['Coin'				,'Coin'											,3,'Pay your passage out of the dungeon',1],
    14: ['Backpack'		,'Backpack'									,7,'each increases storage capacity by 10',10],
    15: ['"Dagger'		,'Dagger'										,4,'small bladed weapon',3],
    16: ['"G" Dagger'	,'Golden Dagger'						,4,'finer quality than the small bladed weapon',5],
    17: ['"W" Sword'	,'Wooden Sword'							,4,'basic attack weapon',3],
    18: ['"M" Sword'	,'Metal Sword'							,4,'tougher materials make this more durable',8],
    19: ['"A" Sword'	,'Alloy Sword'							,4,'the finest craftsmanship',10],
    20: ['Hammer'			,'Hammer'										,4,'what, it\'s just a hammer..',3],
    21: ['R Hammer'		,'Reinforced Hammer'				,4,'reinforced for extra strength',6],
    22: ['S Shield'		,'Small Shield'							,5,'small, relatively feeble defense',2],
    23: ['RS Shield'	,'Reinforced Small Shield'	,5,'a better shield, still too small for some..',5],
    24: ['L Shield'		,'large Shield'							,5,'offers more protection against attack',6],
    25: ['RL Shield'	,'Reinforced Large Shield'	,5,'high defensive capabilities',8],
    26: ['H Pot'			,'Health Potion(blue)'			,6,'will restore your health when needed.',35],
    27: ['Prot Pot'		,'Protection Potion(green)'	,6,'offers some protection against attack',7],
    28: ['A Pot'			,'Attack Potion(red)'				,6,'increases your attack strength for some hits',12],
    29: ['Helmet'			,'Helmet'										,5,'defensive helmet, looks good too :)',3],
    30: ['X Helmet'		,'Reinforced Helmet'				,5,'a stronger helmet defends better',4],
    31: ['B Armour'		,'Body Armour'							,5,'provides good defensive capabilities',6],
    32: ['RB Armour'	,'Reinforced Body Armour'		,5,'excel at defense with this upgraded armour',8],
    33: ['Axe'				,'Axe'											,4,'good for chopping down tress, and the enemy...',3],
    34: ['R Axe'			,'Refined Axe'							,4,'a finer tipped axe for better chopping',5],
    35: ['L3 Axe'			,'Level 3 Axe'							,4,'when only the best will do',7],
    36: ['TB Axe'			,'Twin Blade Axe'						,4,'Twin Bladed for double the action',7],
    37: ['RTB Axe'		,'Refined Twin Blade Axe'		,4,'another stronger twin bladed axe',8],
    38: ['L3 TB Axe'	,'Level 3 Twin Blade Axe'		,4,'the pinnacle of axe technology',10]
    }
}

export const presetData=()=>{
	return {
		1:{
			level:'easy',
			grid:70,
			enemies: 5,
			bonuses: 30,
			width:8,
			height:8,
			rooms:6,
			hero:'ninja_m',
			preset:1
		},
		2: {
			level:'medium',
			grid:80,
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
			grid:120,
			enemies: 20,
			bonuses: 10,
			width:20,
			height:20,
			rooms:15,
			hero:'ninja_m',
			preset:3        
		},
		4: {
			level:'unfair',
			grid:150,
			enemies: 35,
			bonuses: 5,
			width:25,
			height:20,
			rooms:25,
			hero:'ninja_m',
			preset:4        
		}
	}
}

export const optionMinMax=()=>{
	return {
		grid:{
			min:60,
			max:200,
			default:70,
			name:'grid',
			label:'Dungeon Size'},
		enemies:{
			min:5,
			max:30,
			default:8,
			name:'enemies',
			label:'% enemies'},
		bonuses:{
			min:1,
			max:15,
			default:8,
			name:'bonuses',
			label:'% bonuses'},
		width:{
			min:5,
			max:26,
			default:10,
			name:'width',
			label:'Room Max Width'},
		height:{
			min:5,
			max:26,
			default:10,
			name:'height',
			label:'Room max Height'},
		rooms:{
			min:3,
			max:50,
			default:10,
			name:'rooms',
			label:'Max Rooms'}
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