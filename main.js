let engine = Matter.Engine.create()

let rederer = Matter.Render.create({
    element: document.body,
    engine: engine,
    options: {
        
        height: 900,
        width: 1800,
        wireframes: false
    
    }
})

let ground1 = Matter.Bodies.rectangle(790, 450, 250, 30, {
    isStatic: true,
    render: {
        sprite: {
            texture: './pics/platformrock.png'
        }
    }
})

let ground2 = Matter.Bodies.rectangle(1300, 650, 250, 30, {
    isStatic: true,
    render: {
        sprite: {
            texture: './pics/platformrock.png'
        }
    }
})

let ground3 = Matter.Bodies.rectangle(1500, 250, 250, 30, {
    isStatic: true,
    render: {
            sprite: {
                texture: './pics/platformrock.png'
            }
        }
})
/*Zdi na 1. platforme*/
let  roof = Matter.Bodies.rectangle(790, 200, 300, 15,{
    render: {
            sprite: {
                texture: './pics/woodplat.png'
            }
        }
})
/*PRVNI PLATFORMA*/ 

let box1 = Matter.Bodies.rectangle(700, 249, 47, 47,{
    render: {
            sprite: {
                texture: './pics/woodenbox.png'
            }
        }
})
let box2 = Matter.Bodies.rectangle(700, 249, 47, 47,{
    render: {
            sprite: {
                texture: './pics/woodenbox.png'
            }
        }
})



let box3 = Matter.Bodies.rectangle(890, 249, 47, 47,{
    render: {
            sprite: {
                texture: './pics/woodenbox.png'
            }
        }
})
let box4 = Matter.Bodies.rectangle(890, 249, 47, 47,{
    render: {
            sprite: {
                texture: './pics/woodenbox.png'
            }
        }
})

/*PRVNI PLATFORMA*/ 



/*TRETI PLATFORMA*/ 

let box5 = Matter.Bodies.rectangle(1445, 149, 47, 47,{
    render: {
            sprite: {
                texture: './pics/woodenbox.png'
            }
        }
})
let box6 = Matter.Bodies.rectangle(1445, 149, 47, 47,{
    render: {
            sprite: {
                texture: './pics/woodenbox.png'
            }
        }
})
/*TRETI PLATFORMA*/ 



/*DRUHA PLATFORMA*/ 
let box7 = Matter.Bodies.rectangle(1225, 249, 47, 47,{
    render: {
            sprite: {
                texture: './pics/woodenbox.png'
            }
        }
})
let box8 = Matter.Bodies.rectangle(1225, 349, 47, 47,{
    render: {
            sprite: {
                texture: './pics/woodenbox.png'
            }
        }
})
let box9 = Matter.Bodies.rectangle(1225, 349, 47, 47,{
    render: {
            sprite: {
                texture: './pics/woodenbox.png'
            }
        }
})
let box10 = Matter.Bodies.rectangle(1272, 349, 47, 47,{
    render: {
            sprite: {
                texture: './pics/woodenbox.png'
            }
        }
})
let box11 = Matter.Bodies.rectangle(1272, 349, 47, 47,{
    render: {
            sprite: {
                texture: './pics/woodenbox.png'
            }
        }
})
let box12 = Matter.Bodies.rectangle(1319, 349, 47, 47,{
    render: {
            sprite: {
                texture: './pics/woodenbox.png'
            }
        }
})
let wall = Matter.Bodies.rectangle(1400, 149, 27, 117,{
    render: {
            sprite: {
                texture: './pics/wall.png'
            }
        }
})



/*Prasata na 1. platforme*/ 
let composite = Matter.Composites.pyramid(730, 250, 3, 3, 5, 5, function(x, y){
    return Matter.Bodies.rectangle(x, y, 40, 40, {
        render: {
            sprite: {
                texture: './pics/prase40.png'
                
            }
        }
    })
})


let kingpig = Matter.Bodies.rectangle(1535, 49, 67, 67,{
    render: {
            sprite: {
                texture: './pics/pigkingg.png'
            }
        }
})

let pig1 = Matter.Bodies.rectangle(1272, 289, 47, 47,{
    render: {
            sprite: {
                texture: './pics/prase40.png'
            }
        }
})
let pig2 = Matter.Bodies.rectangle(1319, 299, 47, 47,{
    render: {
            sprite: {
                texture: './pics/prase40.png'
            }
        }
})
let pig3 = Matter.Bodies.rectangle(1559, 209, 47, 47,{
    render: {
            sprite: {
                texture: './pics/prase40.png'
            }
        }
})
let pig4 = Matter.Bodies.rectangle(1519, 209, 47, 47,{
    render: {
            sprite: {
                texture: './pics/prase40.png'
            }
        }
})


let ball_pos = {
    x: 200,
    y: 400
}

let ball = Matter.Bodies.circle(ball_pos.x, ball_pos.y, 20, {
    render: {
        sprite: {
            texture: './assets/bird1.svg'
        }
    }
})
let sling = Matter.Constraint.create({
    pointA: {
        x: ball_pos.x,
        y: ball_pos.y
    },
    bodyB: ball,
    stiffness: 0.05
})

let mouseConstraint = Matter.MouseConstraint.create(engine, {
    mouse: Matter.Mouse.create(rederer.canvas)
})
rederer.mouse = mouseConstraint

Matter.World.add(engine.world, [ground1, ground2,ground3,box1,box2,roof,box3,box4,box5,box6,box7,box8,box9,box10,box11,box12,wall,pig1,pig2,pig3,pig4, composite,kingpig, ball, sling, mouseConstraint])

let isFired = true

Matter.Events.on(mouseConstraint, 'enddrag', function(event){
    if(event.body === ball){
        isFired = true
    }
})

Matter.Events.on(engine, 'afterUpdate', function(event){
    let dist_x = Math.abs(ball.position.x - ball_pos.x)
    let dist_y = Math.abs(ball.position.y - ball_pos.y)
    if(isFired && dist_x < 20 && dist_y < 20){
       ball = Matter.Bodies.circle(ball_pos.x, ball_pos.y, 20, {
        render: {
            sprite: {
                texture: './assets/bird1.svg'
            }
        }
       })
       sling.bodyB = ball
       Matter.World.add(engine.world, ball)
       isFired = false
    }
})


Matter.Render.run(rederer)
Matter.Runner.run(engine)