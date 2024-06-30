input.onButtonEvent(Button.A, input.buttonEventClick(), function () {
    game.setScore(0)
    Snackanzahl = 0
    SnakeMini = game.createSprite(2, 2)
    Schatten = game.createSprite(2, 2)
    Snack = game.createSprite(randint(0, 4), randint(0, 4))
    Richtung = randint(0, 3)
    for (let index = 0; index < 60; index++) {
        if (input.buttonIsPressed(Button.B)) {
            break;
        }
        if (SnakeMini.get(LedSpriteProperty.X) == Snack.get(LedSpriteProperty.X) && SnakeMini.get(LedSpriteProperty.Y) == Snack.get(LedSpriteProperty.Y)) {
            Snack.set(LedSpriteProperty.X, randint(0, 4))
            Snack.set(LedSpriteProperty.Y, randint(0, 4))
            Snackanzahl += 1
        }
        basic.pause(400)
        if (Math.abs(input.magneticForce(Dimension.X)) > Magnetgrenzwert || Math.abs(input.magneticForce(Dimension.Y)) > Magnetgrenzwert) {
            if (Math.abs(input.magneticForce(Dimension.X)) > Math.abs(input.magneticForce(Dimension.Y))) {
                if (input.magneticForce(Dimension.X) > 0) {
                    SnakeMini.change(LedSpriteProperty.X, 1)
                } else {
                    SnakeMini.change(LedSpriteProperty.X, -1)
                }
            } else {
                if (input.magneticForce(Dimension.Y) > 0) {
                    SnakeMini.change(LedSpriteProperty.Y, 1)
                } else {
                    SnakeMini.change(LedSpriteProperty.Y, -1)
                }
            }
            xDifferenz = SnakeMini.get(LedSpriteProperty.X) - Schatten.get(LedSpriteProperty.X)
            yDifferenz = SnakeMini.get(LedSpriteProperty.Y) - Schatten.get(LedSpriteProperty.Y)
            if (yDifferenz == 1) {
                Richtung = 0
            } else if (xDifferenz == 1) {
                Richtung = 1
            } else if (yDifferenz == -1) {
                Richtung = 2
            } else {
                Richtung = 3
            }
            basic.pause(100)
            Schatten.set(LedSpriteProperty.X, SnakeMini.get(LedSpriteProperty.X))
            Schatten.set(LedSpriteProperty.Y, SnakeMini.get(LedSpriteProperty.Y))
        } else {
            if (Richtung == 0) {
                SnakeMini.change(LedSpriteProperty.Y, 1)
            } else if (Richtung == 1) {
                SnakeMini.change(LedSpriteProperty.X, 1)
            } else if (Richtung == 2) {
                SnakeMini.change(LedSpriteProperty.Y, -1)
            } else {
                SnakeMini.change(LedSpriteProperty.X, -1)
            }
            basic.pause(100)
            Schatten.set(LedSpriteProperty.X, SnakeMini.get(LedSpriteProperty.X))
            Schatten.set(LedSpriteProperty.Y, SnakeMini.get(LedSpriteProperty.Y))
        }
    }
    SnakeMini.delete()
    Schatten.delete()
    Snack.delete()
    game.addScore(1)
    basic.pause(500)
    for (let index = 0; index < 3; index++) {
        if (input.buttonIsPressed(Button.B)) {
            break;
        }
        basic.showNumber(Snackanzahl)
    }
    game.addScore(1)
})
let yDifferenz = 0
let xDifferenz = 0
let Richtung = 0
let Snack: game.LedSprite = null
let Schatten: game.LedSprite = null
let SnakeMini: game.LedSprite = null
let Snackanzahl = 0
let Magnetgrenzwert = 0
Magnetgrenzwert = 400
let Richtungsmapping = [
"oben",
"rechts",
"unten",
"links"
]
