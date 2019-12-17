import * as PIXI from 'pixi.js'
import * as TWEEN from 'tween.js'

const centerX = Math.round(window.innerWidth / 2)
const centerY = Math.round(window.innerHeight / 2)

const markI = 700
const markII = 1200

let app

function setupAnimation() {
  
  blackrect()
  gameLoop()
}

function gameLoop(time) {
  requestAnimationFrame(gameLoop)
  TWEEN.update(time)
}

function cleanup() {
  gameLoop = () => {}
  app.view.remove()
}

function startPlayers() {
  //p1()
  //p2()
  //pvp()
  //animStop()
}

function p1() {
  const p1 = new PIXI.Sprite.from('battle-stance/leftfacing/bowser.png')
  p1.x = window.innerWidth
  p1.y = 0
  app.stage.addChild(p1)

  const player = new PIXI.Text('Baran', { fontSize: '100px', font: 'Montserrat', fill: '#ffffff', align: 'left' })
  player.x = centerX - 400
  player.y = centerY + 200
  player.alpha = 0
  app.stage.addChild(player)

  const ass = new PIXI.Text('som', { fontSize: '30px', font: 'Montserrat', fill: '#ffffff', align: 'left' })
  ass.x = centerX - 420
  ass.y = centerY + 304
  ass.alpha = 0
  app.stage.addChild(ass)

  const char = new PIXI.Text('Bowser', { fontStyle: 'italic', fontSize: '60px', font: 'Montserrat', fill: '#ff0000', align: 'left' })
  char.x = centerX - 400
  char.y = centerY + 340
  char.alpha = 0
  app.stage.addChild(char)

  new TWEEN.Tween(p1)
    .to({ x: centerX - 750 }, 700)
    .easing(TWEEN.Easing.Elastic.Out)
    .start()
    .onComplete(pvp)

  const playerAnim = new TWEEN.Tween(player)
    .to({ alpha: 1 }, 300)
    .delay(500)
    .start()

  const assAnim = new TWEEN.Tween(ass)
    .to({ alpha: 1 }, 300)
    .delay(500)
    .start()

  const charAnim = new TWEEN.Tween(char)
    .to({ alpha: 1 }, 300)
    .delay(500)
    .start()
}

function p2() {
  const p2 = new PIXI.Sprite.from('battle-stance/rightfacing/ridly.png')
  p2.x = -850
  p2.y = 0
  app.stage.addChild(p2)

  new TWEEN.Tween(p2)
    .to({ x: centerX }, 500)
    .easing(TWEEN.Easing.Elastic.Out)
    .start()
    .onComplete(delayThree)
}

function pvp() {
  const pvp = new PIXI.Sprite.from('player-versus-player.png')
  pvp.x = centerX
  pvp.y = centerY + 250
  pvp.anchor.set(0.5, 0.5)
  pvp.width = 0
  pvp.height = 0
  app.stage.addChild(pvp)

  new TWEEN.Tween(pvp)
    .to({ width: 82, height: 82 }, 300)
    .easing(TWEEN.Easing.Bounce.Out)
    .start()
    .onComplete(p2) 
}

function blackrect() {
  const white = new PIXI.Graphics()
  white.alpha = 0
  white.beginFill(0xFFFFFF)
  white.drawRect(0, 0, window.innerWidth, window.innerHeight)
  app.stage.addChild(white)

  const black = new PIXI.Graphics()
  black.alpha = 0
  black.beginFill(0x000000)
  black.drawRect(0, 0, window.innerWidth, window.innerHeight)
  app.stage.addChild(black)

  const fadeToBlack = new TWEEN.Tween(black)
    .to({ alpha: 1 }, 200)
    .onComplete(p1)

  const fadeToWhite = new TWEEN.Tween(white)
    .to({ alpha: 1 }, 200)
    .start()
    .chain(fadeToBlack)
}

function delayThree() {
  new TWEEN.Tween(0)
    .to(1, 3000)
    .start()
    .onComplete(cleanup)
}

export default function startAnimation() {

  const config = {
    width: window.innerWidth + 20,
    height: window.innerHeight + 20,
    transparent: true
  }
  app = new PIXI.Application(config)
  app.view.style = "position: absolute; top: -10px; left: -10px;"

  app.stage.x = 10
  app.stage.y = 10
  
  document.body.appendChild(app.view)

  app.loader
    .add('battle-stance/leftfacing/bowser.png')
    .add('battle-stance/rightfacing/yoshi.png')
    .add('player-versus-player.png')
    .load(setupAnimation)  
}
