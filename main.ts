function schattenFolgtSnake () {
    basic.pause(100)
    Schatten.set(LedSpriteProperty.X, SnakeMini.get(LedSpriteProperty.X))
    Schatten.set(LedSpriteProperty.Y, SnakeMini.get(LedSpriteProperty.Y))
}
input.onButtonEvent(Button.A, input.buttonEventClick(), function () {
    initialisiereSpiel()
    while (übrigeSpieldauer > 0) {
        brichDasSpielAbWenn(input.buttonIsPressed(Button.B))
        SnakeFrisstWenn(SnakeMini.get(LedSpriteProperty.X) == Snack.get(LedSpriteProperty.X) && SnakeMini.get(LedSpriteProperty.Y) == Snack.get(LedSpriteProperty.Y))
        snakeBewegtSich()
        basic.pause(400)
        übrigeSpieldauer += -0.5
    }
    beendeSpiel()
})
function SnakeFrisstWenn (snakeIstAufSnack: boolean) {
    if (snakeIstAufSnack) {
        Snack.set(LedSpriteProperty.X, randint(0, 4))
        Snack.set(LedSpriteProperty.Y, randint(0, 4))
        Punkte += 1
    }
}
function snakeWirdVomMagnetenBewegt () {
    if (Math.abs(input.magneticForce(Dimension.X)) > Math.abs(input.magneticForce(Dimension.Y))) {
        if (input.magneticForce(Dimension.X) > 0) {
            snakeBewegtSichNachRechts()
        } else {
            snakeBewegtSichNachLinks()
        }
    } else {
        if (input.magneticForce(Dimension.Y) > 0) {
            snakeBewegtSichNachOben()
        } else {
            snakeBewegtSichNachUnten()
        }
    }
}
function beendeSpiel () {
    SnakeMini.delete()
    Schatten.delete()
    Snack.delete()
    game.addScore(1)
    basic.pause(500)
    for (let index = 0; index < 3; index++) {
        basic.showNumber(Punkte)
    }
    game.addScore(1)
}
function snakeMerktSichDieRichtung () {
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
}
function snakeBewegtSichInDieGemerkteRichtung () {
    if (Richtung == 0) {
        snakeBewegtSichNachOben()
    } else if (Richtung == 1) {
        snakeBewegtSichNachRechts()
    } else if (Richtung == 2) {
        snakeBewegtSichNachUnten()
    } else {
        snakeBewegtSichNachLinks()
    }
}
function snakeBewegtSich () {
    if (Math.abs(input.magneticForce(Dimension.X)) > Magnetgrenzwert || Math.abs(input.magneticForce(Dimension.Y)) > Magnetgrenzwert) {
        snakeWirdVomMagnetenBewegt()
        snakeMerktSichDieRichtung()
        schattenFolgtSnake()
    } else {
        snakeBewegtSichInDieGemerkteRichtung()
        schattenFolgtSnake()
    }
}
function snakeBewegtSichNachUnten () {
    SnakeMini.change(LedSpriteProperty.Y, -1)
}
function brichDasSpielAbWenn (knopfGedrückt: boolean) {
    if (knopfGedrückt) {
        übrigeSpieldauer += übrigeSpieldauer * -1
    }
}
function snakeBewegtSichNachOben () {
    SnakeMini.change(LedSpriteProperty.Y, 1)
}
function initialisiereSpiel () {
    basic.showNumber(3)
    basic.showNumber(2)
    basic.showNumber(1)
    game.setScore(0)
    Punkte = 0
    SnakeMini = game.createSprite(2, 2)
    Schatten = game.createSprite(2, 2)
    Snack = game.createSprite(randint(0, 4), randint(0, 4))
    Richtung = randint(0, 3)
    übrigeSpieldauer = 30
}
function snakeBewegtSichNachLinks () {
    SnakeMini.change(LedSpriteProperty.X, -1)
}
function snakeBewegtSichNachRechts () {
    SnakeMini.change(LedSpriteProperty.X, 1)
}
let Richtung = 0
let yDifferenz = 0
let xDifferenz = 0
let Punkte = 0
let Snack: game.LedSprite = null
let übrigeSpieldauer = 0
let SnakeMini: game.LedSprite = null
let Schatten: game.LedSprite = null
let Magnetgrenzwert = 0
Magnetgrenzwert = 400
