const presets={
    1:{
        level:'easy',
        grid:60,
        enemies: 5,
        bonuses: 30,
        width:8,
        height:14,
        rooms:17,
        preset:1
    },
    2: {
        level:'medium',
        grid:90,
        enemies: 10,
        bonuses: 20,
        width:7,
        height:14,
        rooms:30,
        preset:2        
    },
    3: {
        level:'hard',
        grid:150,
        enemies: 20,
        bonuses: 10,
        width:18,
        height:18,
        rooms:100,
        preset:3        
    },
    4: {
        level:'unfair',
        grid:200,
        enemies: 35,
        bonuses: 5,
        width:8,
        height:18,
        rooms:200,
        preset:4        
    }
}

export default presets