import React from 'react'
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
    8 : ['R Gem'			,'Red Gem'									,1,'increase XP',3],
    9 : ['Scroll'			,'Scroll'										,2,'view Mini Map. Time limited',900],
    10: ['Letter'			,'Letter'										,2,'Increased Visibility Range. Time ',1100],
    11: ['Map'				,'Map'											,2,'Make a trail of your travelled route.',600],
    12: ['Tome'				,'Tome'											,2,'Map bonuses last longer',1000],
    13: ['Coin'				,'Coin'											,3,'Pay your passage out of the dungeon',1],
    14: ['Backpack'		,'Backpack'									,7,'each increases storage capacity by 10',10],
    15: ['"Dagger'		,'Dagger'										,4,'small bladed weapon',5],
    16: ['"G" Dagger'	,'Golden Dagger'						,4,'finer quality than the small bladed weapon',7],
    17: ['"W" Sword'	,'Wooden Sword'							,4,'basic attack weapon',4],
    18: ['"M" Sword'	,'Metal Sword'							,4,'tougher materials make this more durable',9],
    19: ['"A" Sword'	,'Alloy Sword'							,4,'the finest craftsmanship',11],
    20: ['Hammer'			,'Hammer'										,4,'just a hammer, will knock a nail..',2],
    21: ['R Hammer'		,'Reinforced Hammer'				,4,'reinforced for extra strength',7],
    22: ['S Shield'		,'Small Shield'							,5,'small, relatively feeble defense',4],
    23: ['RS Shield'	,'Reinforced Small Shield'	,5,'a better shield, still too small for some..',6],
    24: ['L Shield'		,'large Shield'							,5,'offers more protection against attack',9],
    25: ['RL Shield'	,'Reinforced Large Shield'	,5,'high defensive capabilities',11],
    26: ['H Pot'			,'Health Potion(blue)'			,6,'will restore your health when needed.',35],
    27: ['Prot Pot'		,'Protection Potion(green)'	,6,'offers some protection against attack',7],
    28: ['A Pot'			,'Attack Potion(red)'				,6,'increases your attack strength for some hits',8],
    29: ['Helmet'			,'Helmet'										,5,'defensive helmet, looks good too :)',3],
    30: ['X Helmet'		,'Reinforced Helmet'				,5,'a stronger helmet defends better',4],
    31: ['B Armour'		,'Body Armour'							,5,'provides good defensive capabilities',6],
    32: ['RB Armour'	,'Reinforced Body Armour'		,5,'excel at defense with this upgraded armour',8],
    33: ['Axe'				,'Axe'											,4,'good for chopping down tress, and the enemy...',5],
    34: ['R Axe'			,'Refined Axe'							,4,'a finer tipped axe for better chopping',7],
    35: ['L3 Axe'			,'Level 3 Axe'							,4,'when only the best will do',9],
    36: ['TB Axe'			,'Twin Blade Axe'						,4,'Twin Bladed for double the action',11],
    37: ['RTB Axe'		,'Refined Twin Blade Axe'		,4,'another stronger twin bladed axe',12],
    38: ['L3 TB Axe'	,'Level 3 Twin Blade Axe'		,4,'the pinnacle of axe technology',14]
    }
}

export const instructions=()=>{
	return <div>
		<p>
			Use Up, Down, Left, Right  or W,A,S,D keys to move.  
		</p>
		<p>
			Collect the coins to open the exit and find the now open exit to win. simples :)
		</p>
		<p>
			To start, press the start button on the top menu.  
			You can also adjust the dungeon by clicking on any one of the buttons in the second row and adjusting the slider accordingly. 
			Feel free to experiment :)
		</p>
		<p>
			in game, you will be presented with various bonuses, collect these to power up, gain hp and xp. 
			</p>
		<p>
			Your hero will always use the most powerful bonuses to hand when fighting, simply walk towards your enemy to fight
		</p>
		<p>
			Map bonuses are time limited, other bonuses are limited in use apart from the backpack and coins
		</p>
		<p>
			You will need to collect a certain number of coins to open the exit, the tally is in the bottom left of your game screen
		</p>
		</div>
}
export const startBonus=hero=>{
	// console.log('hero',hero)
	let startingBonus =  {
		mage:{14:2,27:2,26:2,34:1,22:1},
		healer:{14:2,26:2,24:2,16:1,22:1},
		ninja:{9:3,10:3,14:2,18:1,22:1},
		ranger:{11:2,10:2,9:2,14:2,33:1,22:1}
	}
	return startingBonus[hero]
}

export const presetData=()=>{
	return {
		1:{
			level:'easy',
			grid:50,
			enemies: 6,
			bonuses: 10,
			width:6,
			height:6,
			rooms:12,
			hero:'ninja_m',
			preset:1
		},
		2: {
			level:'medium',
			grid:80,
			enemies: 8,
			bonuses: 10,
			width:10,
			height:12,
			rooms:15,
			hero:'ranger_m',
			preset:2        
		},
		3: {
			level:'hard',
			grid:100,
			enemies: 13,
			bonuses: 9,
			width:18,
			height:16,
			rooms:30,
			hero:'ninja_m',
			preset:3        
		},
		4: {
			level:'you will not survive',
			grid:150,
			enemies: 25,
			bonuses: 10,
			width:25,
			height:20,
			rooms:60,
			hero:'ninja_m',
			preset:4        
		}
	}
}

export const optionMinMax=()=>{
	return {
		grid:{
			min:50,
			max:150,
			default:60,
			name:'grid',
			label:'Dungeon Size'},
		enemies:{
			min:7,
			max:25,
			default:8,
			name:'enemies',
			label:'% enemies'},
		bonuses:{
			min:7,
			max:20,
			default:8,
			name:'bonuses',
			label:'% bonuses'},
		width:{
			min:6,
			max:26,
			default:10,
			name:'width',
			label:'Room Max Width'},
		height:{
			min:6,
			max:26,
			default:10,
			name:'height',
			label:'Room max Height'},
		rooms:{
			min:6,
			max:80,
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