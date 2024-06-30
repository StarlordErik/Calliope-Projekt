let sprite = game.createSprite(2, 2)
let Magnetgrenzwert = 400
basic.forever(function () {
    basic.pause(500)
    if (Math.abs(input.magneticForce(Dimension.X)) > Magnetgrenzwert || Math.abs(input.magneticForce(Dimension.Y)) > Magnetgrenzwert) {
        if (Math.abs(input.magneticForce(Dimension.X)) > Math.abs(input.magneticForce(Dimension.Y))) {
            if (input.magneticForce(Dimension.X) > 0) {
                sprite.change(LedSpriteProperty.X, 1)
            } else {
                sprite.change(LedSpriteProperty.X, -1)
            }
        } else {
            if (input.magneticForce(Dimension.Y) > 0) {
                sprite.change(LedSpriteProperty.Y, 1)
            } else {
                sprite.change(LedSpriteProperty.Y, -1)
            }
        }
    } else {
    	
    }
})
