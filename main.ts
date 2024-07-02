function snakeOrientiertSichNachMagnetWenn (magnetIstNahGenug: boolean) {
    if (magnetIstNahGenug) {
        if (Math.abs(input.magneticForce(Dimension.X)) > Math.abs(input.magneticForce(Dimension.Y))) {
            if (input.magneticForce(Dimension.X) > 0) {
                Richtung = rechts
            } else {
                Richtung = links
            }
        } else {
            if (input.magneticForce(Dimension.Y) > 0) {
                Richtung = oben
            } else {
                Richtung = unten
            }
        }
    }
}
function schattenFolgtSnake () {
    basic.pause(150)
    Schatten.set(LedSpriteProperty.X, Snake.get(LedSpriteProperty.X))
    Schatten.set(LedSpriteProperty.Y, Snake.get(LedSpriteProperty.Y))
}
input.onButtonEvent(Button.A, input.buttonEventClick(), function () {
    starteSpiel()
    while (übrigeSpieldauer > 0) {
        brichSpielAbWenn(input.buttonIsPressed(Button.B))
        snakeFrisstWenn(Snake.isTouching(Snack))
        snakeBewegtSich()
        basic.pause(350)
        übrigeSpieldauer += -0.5
    }
    beendeSpiel()
})
function beendeSpiel () {
    Snake.delete()
    Schatten.delete()
    Snack.delete()
    game.addScore(1)
    basic.pause(500)
    for (let index = 0; index < 3; index++) {
        basic.showNumber(Punkte)
    }
    game.addScore(1)
}
function brichSpielAbWenn (knopfGedrückt: boolean) {
    if (knopfGedrückt) {
        übrigeSpieldauer += übrigeSpieldauer * -1
    }
}
function snakeFrisstWenn (snakeIstAufSnack: boolean) {
    if (snakeIstAufSnack) {
        Snack.set(LedSpriteProperty.X, randint(0, 4))
        Snack.set(LedSpriteProperty.Y, randint(0, 4))
        Punkte += 1
    }
}
function snakeBewegtSich () {
    snakeOrientiertSichNachMagnetWenn(Math.abs(input.magneticForce(Dimension.X)) > Magnetgrenzwert || Math.abs(input.magneticForce(Dimension.Y)) > Magnetgrenzwert)
    snakeBewegtSichGeraudeaus()
    schattenFolgtSnake()
}
function snakeBewegtSichGeraudeaus () {
    if (Richtung == rechts) {
        Snake.change(LedSpriteProperty.X, 1)
    } else if (Richtung == oben) {
        Snake.change(LedSpriteProperty.Y, 1)
    } else if (Richtung == links) {
        Snake.change(LedSpriteProperty.X, -1)
    } else {
        Snake.change(LedSpriteProperty.Y, -1)
    }
}
function starteSpiel () {
    basic.showNumber(3)
    basic.showNumber(2)
    basic.showNumber(1)
    game.setScore(0)
    Punkte = 0
    Snake = game.createSprite(2, 2)
    Schatten = game.createSprite(2, 2)
    Snack = game.createSprite(randint(0, 4), randint(0, 4))
    Richtung = randint(0, 3)
    übrigeSpieldauer = 30
}
// Das hier kann größtenteils ignoriert werden.
let Punkte = 0
let Snack: game.LedSprite = null
let übrigeSpieldauer = 0
let Snake: game.LedSprite = null
let Schatten: game.LedSprite = null
let Richtung = 0
let unten = 0
let links = 0
let oben = 0
let rechts = 0
let Magnetgrenzwert = 0
Magnetgrenzwert = 400
rechts = 0
oben = 1
links = 2
unten = 3
