export default function getAll(delta) {
    //get the sprite
    this.getSprite(this.hero)
   //render the sprite and everything around it
    this.render(this.sprite)
    //things that happen when moving
    this.hero.moving(this.enemies)  
    //update the screen
    this.heroMove(delta)
    this.gameNotes(this)
    //auto reduce map bonuses once gained, makes it harder to play?
    this.reduceBonuses()
    //match circle range to hero visibility range
    this.visibility();   
    this.veil()

}