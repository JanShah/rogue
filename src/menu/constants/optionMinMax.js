const optionMinMax={
    grid:{
        min:30,
        max:200,
        default:60,
        name:'grid',
        label:'cells Width/Height'},
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
        min:6,
        max:18,
        default:8,
        name:'width',
        label:'Max Width of each room'},
    height:{
        min:6,
        max:18,
        default:9,
        name:'height',
        label:'Max height of each room'},
    rooms:{
        min:10,
        max:200,
        default:40,
        name:'rooms',
        label:'Maximum Number of rooms'}
}

export default optionMinMax