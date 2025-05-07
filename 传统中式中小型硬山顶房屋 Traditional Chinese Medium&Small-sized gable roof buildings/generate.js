//数值
let 网格宽 = 6 //建议不小于4   Width of the grid, recommended to not less than 4
let 列数 = 6 //x，不小于1   Number of columns, not less than 1
let 排数 = 3 //z，不小于1，(排数 - 1)乘以网格宽的积必须是奇数   Number of rows , not less than 1, product of (排数 - 1) and 网格宽 must be odd
let 高度 = 7 //柱高，建议不低于6   Height of pillars, recommended to not less than 6
let 单侧屋顶楼梯层数 = 4 //影响屋顶的斜率，不为负数   Change of this value effects the slope of the roof, non-negative

//方块
let 台基 = "minecraft:polished_diorite" //完整方块   stylobate, solid block
let 台基楼梯 = "minecraft:polished_diorite_stairs" //楼梯   stylobate, stairs
let 柱 = "create:deepslate_pillar" //原木或柱等等有朝向的方块   pillars, solid block with axis(logs, pillars, etc.)
let 地板 = "minecraft:crimson_planks" //完整方块   floor, solid block
let 地板楼梯 = "minecraft:crimson_stairs" //楼梯   floor, stairs
let 地板半砖 = "minecraft:crimson_slab"  //半砖   floor, slab
let 前后墙 = "supplementaries:ash_bricks"  //完整方块   walls at the front and back, solid block
let 前后墙楼梯 = "supplementaries:ash_bricks_stairs"  //楼梯   walls at the front and back, stairs
let 前后墙半砖 = "supplementaries:ash_bricks_slab"  //半砖   walls at the front and back, slab
let 侧墙 = "minecraft:bricks"  //完整方块   walls at the two sides, solid block
let 窗 = "minecraft:warped_trapdoor" //活板门   window, trapdoor
let 梁 = "create:deepslate_pillar" //原木或柱等等有朝向的方块   beam, solid block with axis(logs, pillars, etc.)
let 槫 = "create:deepslate_pillar" //原木或柱等等有朝向的方块   horizontal pillar support to the roof, solid block with axis(logs, pillars, etc.)
let 椽方块 = "create:cut_ochrum_bricks" //完整方块   planar support to the roof, solid block
let 椽半砖 = "create:cut_ochrum_brick_slab" //半砖   planar support to the roof, slab
let 屋顶 = "create:small_scorchia_bricks" //完整方块   roof, solid block
let 屋顶楼梯 = "create:small_scorchia_brick_stairs" //楼梯   roof, stairs
let 屋顶半砖 = "create:small_scorchia_brick_slab" //半砖   roof, slab
let 屋脊 = "create:cut_crimsite_bricks" //完整方块   roof ridge, solid block
let 屋脊楼梯 = "create:cut_crimsite_brick_stairs" //楼梯   roof ridge, stairs
let 屋脊半砖 = "create:cut_crimsite_brick_slab" //半砖   roof ridge, slab
let 屋檐半砖 = "create:cut_asurine_brick_slab" //半砖   eave, slab

ItemEvents.rightClicked(event => {
    if (event.player.mainHandItem.id === `minecraft:diamond_axe`) {
    let bbb = Math.ceil((网格宽 * (排数 - 1)) / 2) - ((网格宽 * (排数 - 1)) / 2)
        if (列数 < 1 || 排数 < 1 || 单侧屋顶楼梯层数 < 1 || bbb == 0.5) {event.server.runCommandSilent(`say 存在不合适的数值！请修改数值后再尝试！There is unsuitable data! Please try after edit your values!`)}
    event.player.addItemCooldown(`kubejs:generate`,10);
    event.server.runCommandSilent(`kill @e[type=bat]`)
    event.server.runCommandSilent(`fill -3 -3 -3 41 12 41 air`)
    event.server.runCommandSilent(`fill -3 13 -3 41 27 41 air`)
    let 横向长度 = 网格宽 * (列数 - 1) + 1
    let 纵向长度 = 网格宽 * (排数 - 1) + 1
    let 横向中点 = ((横向长度 - 1) / 2)
    let 纵向中点 = ((纵向长度 - 1) / 2)
    let 最高高度 = Math.ceil(高度 + (纵向长度 / 4) + (单侧屋顶楼梯层数 / 2) + 3)
    let sizeX = 横向长度 + 2
    let sizeY = 最高高度 + 1 - 1
    let sizeZ = 纵向长度 + 4
    event.server.runCommandSilent(`setblock -2 -1 -3 minecraft:structure_block{ignoreEntities:1b,powered:0b,seed:0L,posX:1,mode:"SAVE",posY:2,posZ:1,sizeX:${sizeX},sizeY:${sizeY},sizeZ:${sizeZ},integrity:1.0f,showair:0b,name:"kubejs:111",id:"minecraft:structure_block",showboundingbox:1b}`)
//台基
    {
    let a = 横向长度 + 1
    let b = 纵向长度 + 1
    for (let i = -2; i <= a; i++){
    for (let j = -2; j <= b; j++){
    for (let k = -1; k <= 0; k++){
    event.server.runCommandSilent(`setblock ${i} ${k} ${j} ${台基}`)
    }}}
    }
//主柱
    for (let i = 0; i < 列数; i++){
    for (let j = 0; j < 排数; j++){
    for (let k = 0; k < 高度; k++){
    let x = i * 网格宽
    let z = j * 网格宽
    event.server.runCommandSilent(`setblock ${x} ${k} ${z} ${柱}`)
    }}}
//横梁
    let y = 高度
    for (let i = 0; i < 横向长度 ; i++){
    for (let j = 0; j < 排数 ; j++){
    let x = i
    let z = j * 网格宽
    event.server.runCommandSilent(`setblock ${x} ${y} ${z} ${梁}[axis=x]`)
    }}
//纵梁
    for (let i = 0; i < 列数 ; i++){
    for (let j = 0; j < 纵向长度 ; j++){
    let x = i * 网格宽
    let z = j
    event.server.runCommandSilent(`setblock ${x} ${y} ${z} ${梁}[axis=z]`)
    }}
//椽子
    {
    let z1 = -2
    let z2 = 纵向长度 - z1 -1
    let z3 = z1 + 1
    let z4 = z2 - 1
    let y1 = 高度
    do {
    for (let i = -1; i < (横向长度 / 2) ; i+=2){
    let y2 = y1 + 1
    let x2 = i
    let x1 = i + 1
    let x4 = 横向长度 - i - 1
    let x3 = x4 - 1
    event
    event.server.runCommandSilent(`setblock ${x1} ${y1} ${z1} ${椽半砖}[type=bottom]`)
    event.server.runCommandSilent(`setblock ${x1} ${y1} ${z2} ${椽半砖}[type=bottom]`)
    event.server.runCommandSilent(`setblock ${x1} ${y1} ${z3} ${椽半砖}[type=top]`)
    event.server.runCommandSilent(`setblock ${x1} ${y1} ${z4} ${椽半砖}[type=top]`)
    event.server.runCommandSilent(`setblock ${x3} ${y1} ${z1} ${椽半砖}[type=bottom]`)
    event.server.runCommandSilent(`setblock ${x3} ${y1} ${z2} ${椽半砖}[type=bottom]`)
    event.server.runCommandSilent(`setblock ${x3} ${y1} ${z3} ${椽半砖}[type=top]`)
    event.server.runCommandSilent(`setblock ${x3} ${y1} ${z4} ${椽半砖}[type=top]`)
    if (i === (((横向长度 / 2) + 1))) {break}
    event.server.runCommandSilent(`setblock ${x2} ${y1} ${z1} ${椽半砖}[type=top]`)
    event.server.runCommandSilent(`setblock ${x2} ${y1} ${z2} ${椽半砖}[type=top]`)
    event.server.runCommandSilent(`setblock ${x2} ${y2} ${z3} ${椽半砖}[type=bottom]`)
    event.server.runCommandSilent(`setblock ${x2} ${y2} ${z4} ${椽半砖}[type=bottom]`)
    event.server.runCommandSilent(`setblock ${x4} ${y1} ${z1} ${椽半砖}[type=top]`)
    event.server.runCommandSilent(`setblock ${x4} ${y1} ${z2} ${椽半砖}[type=top]`)
    event.server.runCommandSilent(`setblock ${x4} ${y2} ${z3} ${椽半砖}[type=bottom]`)
    event.server.runCommandSilent(`setblock ${x4} ${y2} ${z4} ${椽半砖}[type=bottom]`)
    }
    z1 = z1 + 2
    z2 = z2 - 2
    z3 = z3 + 2
    z4 = z4 - 2
    y1 = y1 + 1
    } while (z3 <= z4)
    let a = z3 - z4
    if (a === 2){
    for (let i = -1; i <= 横向长度 ; i++){
    let x = i
    event.server.runCommandSilent(`setblock ${x} ${y1} ${z1} ${椽方块}`)
    }}
    event.server.runCommandSilent(`fill -1 ${高度} -2 ${横向长度} ${高度} -2 minecraft:air`)
    event.server.runCommandSilent(`fill -1 ${高度} -1 ${横向长度} ${高度} -1 ${椽半砖}[type=bottom] replace minecraft:air`)
    event.server.runCommandSilent(`fill -1 ${高度} -1 ${横向长度} ${高度} -1 ${椽半砖}[type=double] replace ${椽半砖}[type=top]`)
    let b = 纵向长度 + 1
    event.server.runCommandSilent(`fill -1 ${高度} ${b} ${横向长度} ${高度} ${b} minecraft:air`)
    event.server.runCommandSilent(`fill -1 ${高度} ${纵向长度} ${横向长度} ${高度} ${纵向长度} ${椽半砖}[type=bottom] replace minecraft:air`)
    event.server.runCommandSilent(`fill -1 ${高度} ${纵向长度} ${横向长度} ${高度} ${纵向长度} ${椽半砖}[type=double] replace ${椽半砖}[type=top]`)
    }
//屋顶
    {
    let z1 = -2
    let z2 = 纵向长度 - z1 -1
    let z3 = z1 + 1
    let z4 = z2 - 1
    let y0 = 高度 + 1
    let y1 = 高度 + 1
    let var1 = 2
    do {
    for (let i = -1; i < (横向长度 / 2) ; i+=2){
    let y2 = y1 + 1
    let y3 = y2 + 1
    let x2 = i
    let x1 = i + 1
    let x4 = 横向长度 - i - 1
    let x3 = x4 - 1
    if(var1 === 2) {
    event.server.runCommandSilent(`setblock ${x1} ${y1} ${z1} ${屋顶半砖}[type=bottom]`)
    event.server.runCommandSilent(`setblock ${x1} ${y1} ${z2} ${屋顶半砖}[type=bottom]`)
    event.server.runCommandSilent(`setblock ${x1} ${y1} ${z3} ${屋顶半砖}[type=top]`)
    event.server.runCommandSilent(`setblock ${x1} ${y1} ${z4} ${屋顶半砖}[type=top]`)
    event.server.runCommandSilent(`setblock ${x3} ${y1} ${z1} ${屋顶半砖}[type=bottom]`)
    event.server.runCommandSilent(`setblock ${x3} ${y1} ${z2} ${屋顶半砖}[type=bottom]`)
    event.server.runCommandSilent(`setblock ${x3} ${y1} ${z3} ${屋顶半砖}[type=top]`)
    event.server.runCommandSilent(`setblock ${x3} ${y1} ${z4} ${屋顶半砖}[type=top]`)
    if (x1 === 0) {
    event.server.runCommandSilent(`setblock ${x1} ${y2} ${z1} ${屋脊半砖}[type=bottom]`)
    event.server.runCommandSilent(`setblock ${x1} ${y2} ${z2} ${屋脊半砖}[type=bottom]`)
    event.server.runCommandSilent(`setblock ${x1} ${y2} ${z3} ${屋脊半砖}[type=top]`)
    event.server.runCommandSilent(`setblock ${x1} ${y2} ${z4} ${屋脊半砖}[type=top]`)
    event.server.runCommandSilent(`setblock ${x3} ${y2} ${z1} ${屋脊半砖}[type=bottom]`)
    event.server.runCommandSilent(`setblock ${x3} ${y2} ${z2} ${屋脊半砖}[type=bottom]`)
    event.server.runCommandSilent(`setblock ${x3} ${y2} ${z3} ${屋脊半砖}[type=top]`)
    event.server.runCommandSilent(`setblock ${x3} ${y2} ${z4} ${屋脊半砖}[type=top]`)
    }
    if (i === ((横向长度 / 2) + 1)) {break}
    event.server.runCommandSilent(`setblock ${x2} ${y1} ${z1} ${屋顶半砖}[type=top]`)
    event.server.runCommandSilent(`setblock ${x2} ${y1} ${z2} ${屋顶半砖}[type=top]`)
    event.server.runCommandSilent(`setblock ${x2} ${y2} ${z3} ${屋顶半砖}[type=bottom]`)
    event.server.runCommandSilent(`setblock ${x2} ${y2} ${z4} ${屋顶半砖}[type=bottom]`)
    event.server.runCommandSilent(`setblock ${x4} ${y1} ${z1} ${屋顶半砖}[type=top]`)
    event.server.runCommandSilent(`setblock ${x4} ${y1} ${z2} ${屋顶半砖}[type=top]`)
    event.server.runCommandSilent(`setblock ${x4} ${y2} ${z3} ${屋顶半砖}[type=bottom]`)
    event.server.runCommandSilent(`setblock ${x4} ${y2} ${z4} ${屋顶半砖}[type=bottom]`)
    if (y1 === y0) {
    event.server.runCommandSilent(`setblock ${x1} ${y1} ${z1} ${屋檐半砖}[type=bottom]`)
    event.server.runCommandSilent(`setblock ${x1} ${y1} ${z2} ${屋檐半砖}[type=bottom]`)
    event.server.runCommandSilent(`setblock ${x3} ${y1} ${z1} ${屋檐半砖}[type=bottom]`)
    event.server.runCommandSilent(`setblock ${x3} ${y1} ${z2} ${屋檐半砖}[type=bottom]`)
    event.server.runCommandSilent(`setblock ${x2} ${y1} ${z1} ${屋檐半砖}[type=top]`)
    event.server.runCommandSilent(`setblock ${x2} ${y1} ${z2} ${屋檐半砖}[type=top]`)
    event.server.runCommandSilent(`setblock ${x4} ${y1} ${z1} ${屋檐半砖}[type=top]`)
    event.server.runCommandSilent(`setblock ${x4} ${y1} ${z2} ${屋檐半砖}[type=top]`)
    
    }
    let var2 = (((网格宽 * (排数 - 1)) / 2) - 单侧屋顶楼梯层数)
    if (z3 >= var2) {
    event.server.runCommandSilent(`setblock ${x2} ${y2} ${z3} ${屋顶楼梯}[facing=south]`)
    event.server.runCommandSilent(`setblock ${x2} ${y2} ${z4} ${屋顶楼梯}[facing=north]`)
    event.server.runCommandSilent(`setblock ${x4} ${y2} ${z3} ${屋顶楼梯}[facing=south]`)
    event.server.runCommandSilent(`setblock ${x4} ${y2} ${z4} ${屋顶楼梯}[facing=north]`)
    if (x1 === 0) {
    event.server.runCommandSilent(`setblock ${x1} ${y3} ${z3} ${屋脊楼梯}[facing=south]`)
    event.server.runCommandSilent(`setblock ${x1} ${y3} ${z4} ${屋脊楼梯}[facing=north]`)
    event.server.runCommandSilent(`setblock ${x3} ${y3} ${z3} ${屋脊楼梯}[facing=south]`)
    event.server.runCommandSilent(`setblock ${x3} ${y3} ${z4} ${屋脊楼梯}[facing=north]`)
    let z5 = z3 - 1 ; let z6 = z4 + 1
    event.server.runCommandSilent(`setblock ${x1} ${y2} ${z5} ${屋脊楼梯}[facing=south]`)
    event.server.runCommandSilent(`setblock ${x1} ${y2} ${z6} ${屋脊楼梯}[facing=north]`)
    event.server.runCommandSilent(`setblock ${x3} ${y2} ${z5} ${屋脊楼梯}[facing=south]`)
    event.server.runCommandSilent(`setblock ${x3} ${y2} ${z6} ${屋脊楼梯}[facing=north]`)
    }
    }
    }
    if (var1 === 1) {
    event.server.runCommandSilent(`setblock ${x3} ${y1} ${z1} ${屋顶楼梯}[facing=south]`)
    event.server.runCommandSilent(`setblock ${x3} ${y1} ${z2} ${屋顶楼梯}[facing=north]`)
    event.server.runCommandSilent(`setblock ${x1} ${y1} ${z1} ${屋顶楼梯}[facing=south]`)
    event.server.runCommandSilent(`setblock ${x1} ${y1} ${z2} ${屋顶楼梯}[facing=north]`)
    event.server.runCommandSilent(`setblock ${x4} ${y2} ${z1} ${屋顶楼梯}[facing=south]`)
    event.server.runCommandSilent(`setblock ${x4} ${y2} ${z2} ${屋顶楼梯}[facing=north]`)
    event.server.runCommandSilent(`setblock ${x2} ${y2} ${z1} ${屋顶楼梯}[facing=south]`)
    event.server.runCommandSilent(`setblock ${x2} ${y2} ${z2} ${屋顶楼梯}[facing=north]`)
    if (x2 != -1) {
    event.server.runCommandSilent(`setblock ${x4} ${y1} ${z1} ${屋顶}`)
    event.server.runCommandSilent(`setblock ${x4} ${y1} ${z2} ${屋顶}`)
    event.server.runCommandSilent(`setblock ${x2} ${y1} ${z1} ${屋顶}`)
    event.server.runCommandSilent(`setblock ${x2} ${y1} ${z2} ${屋顶}`)
    }
    if (x1 === 0) {
    event.server.runCommandSilent(`setblock ${x1} ${y3} ${z1} ${屋脊楼梯}[facing=south]`)
    event.server.runCommandSilent(`setblock ${x1} ${y3} ${z2} ${屋脊楼梯}[facing=north]`)
    event.server.runCommandSilent(`setblock ${x3} ${y3} ${z1} ${屋脊楼梯}[facing=south]`)
    event.server.runCommandSilent(`setblock ${x3} ${y3} ${z2} ${屋脊楼梯}[facing=north]`)
    event.server.runCommandSilent(`setblock ${x1} ${y2} ${z1} ${屋脊}`)
    event.server.runCommandSilent(`setblock ${x1} ${y2} ${z2} ${屋脊}`)
    event.server.runCommandSilent(`setblock ${x3} ${y2} ${z1} ${屋脊}`)
    event.server.runCommandSilent(`setblock ${x3} ${y2} ${z2} ${屋脊}`)
    }
    }
    }
    let var2 = (((网格宽 * (排数 - 1)) / 2) - 单侧屋顶楼梯层数)
    if (z3 >= var2 && var1 == 2) {var1 = 1 ; y1 = y1 - 1}
    z1 = z1 + var1
    z2 = z2 - var1
    z3 = z3 + var1
    z4 = z4 - var1
    y1 = y1 + 1
    } while (z3 <= z4)
    let y2 = y1 + 1
    let y4 = y1 - 1
    let y3 = y1 + 2
    let var3 = 0
    for (let i = -1; i <= 横向长度 ; i++){
    let x = i
    event.server.runCommandSilent(`setblock ${x} ${y4} ${纵向中点} ${椽方块}`)
    event.server.runCommandSilent(`setblock ${x} ${y1} ${纵向中点} ${屋顶}`)
    if(var3 === 1) {event.server.runCommandSilent(`setblock ${x} ${y2} ${纵向中点} ${屋檐半砖}[type=double]`)}
    if(var3 === 0) {event.server.runCommandSilent(`setblock ${x} ${y2} ${纵向中点} ${屋檐半砖}[type=bottom]`)}
    var3 = 1 - var3
    let var4 = 横向中点 - 0.5
    if(x === var4) {var3 = 1 - var3}
    event.player.runCommandSilent(`setblock ${x} ${y3} ${纵向中点} ${屋脊半砖}[type=bottom]`)
    }
    let x222 = 横向长度 - 1
    let x111 = 横向长度
    event.server.runCommandSilent(`setblock ${x222} ${y3} ${纵向中点} ${屋檐半砖}[type=bottom]`)
    event.server.runCommandSilent(`setblock 0 ${y3} ${纵向中点} ${屋檐半砖}[type=bottom]`)
    event.server.runCommandSilent(`setblock ${x111} ${y3} ${纵向中点} ${屋檐半砖}[type=top]`)
    event.server.runCommandSilent(`setblock -1 ${y3} ${纵向中点} ${屋檐半砖}[type=top]`)
    event.server.runCommandSilent(`setblock ${x111} ${y2} ${纵向中点} ${屋脊楼梯}[facing=west,half=top]`)
    event.server.runCommandSilent(`setblock -1 ${y2} ${纵向中点} ${屋脊楼梯}[facing=east,half=top]`)
    }
//槫和梁
    {
    for (let i = 0; i < 列数 ; i++){
    for (let j = 0; j < 排数 ; j++){
    let x = i * 网格宽
    let z = j * 网格宽
    for (let y = 0; y < 最高高度 ; y++){
    let 方块 = event.player.level.getBlock(x, y, z)
    if (方块.id == "minecraft:air") {event.server.runCommandSilent(`setblock ${x} ${y} ${z} ${梁}`)}
    if ((方块.id == 椽半砖 || 方块.id == 椽方块) && 方块.id != 屋顶) {
        event.server.runCommandSilent(`setblock ${x} ${y} ${z} ${椽方块}`)
        let y0 = y - 1
        if (x === 0) {
            for (let a = 0; a < 横向长度; a++) {
                event.server.runCommandSilent(`setblock ${a} ${y0} ${z} ${槫}[axis=x]`)
                let 方块块 = event.player.level.getBlock(a, y, z)
                if (方块块.id !== "minecraft:air" && 方块块.id !== 屋顶) {event.server.runCommandSilent(`setblock ${a} ${y} ${z} ${椽方块}`)}
            }
        }
        if (z <= 纵向中点) {
            let z0 = 纵向长度 - 1 - z
            for (let b = z; b < z0; b++) {
                event.server.runCommandSilent(`setblock ${x} ${y0} ${b} ${梁}[axis=z] keep`)
            }
        }
    }
    if (方块.id == 屋顶 || 方块.id == 屋顶楼梯 || 方块.id == 屋顶半砖) {break}
    }
    }}
    }
//侧墙
    {
    const aaa = [-1 , 横向长度]
    for (const num of aaa) {
    for (let j = -1; j <= 纵向长度; j++) {
    let z = j
    for (let y = 1; y <= 最高高度; y++) {
    let 方块 = event.player.level.getBlock(num, y, z)
    if(方块.id == "minecraft:air" || 方块.id == 椽半砖 || 方块.id == 椽方块) {event.server.runCommandSilent(`setblock ${num} ${y} ${z} ${侧墙}`)}
    if(方块.id == 屋顶半砖 || 方块.id == 屋顶楼梯 || 方块.id == 屋顶) {event.server.runCommandSilent(`fill ${num} ${y} ${z} ${num} ${y} ${z} ${屋顶半砖}[type=double] replace ${屋顶半砖}[type=top]`);break}
    }}
    }
    }
//正墙
    {
    let a = 列数 - 1
    let y0 = 高度 - 1
    let z0 = 纵向长度 - 1
    for (let i = 0; i < a; i++){
    let x = i * 网格宽
    for (let ii = 1; ii < 网格宽; ii++){
    let x1 = ii + x
    event.server.runCommandSilent(`setblock ${x1} 1 0 ${前后墙}`)
    event.server.runCommandSilent(`setblock ${x1} 2 0 ${前后墙}`)
    event.server.runCommandSilent(`setblock ${x1} 1 -1 ${前后墙半砖}[type=bottom]`)
    event.server.runCommandSilent(`setblock ${x1} 2 -1 ${前后墙半砖}[type=top]`)
    event.server.runCommandSilent(`setblock ${x1} ${y0} -1 ${地板半砖}[type=bottom]`)
    event.server.runCommandSilent(`setblock ${x1} 1 ${z0} ${前后墙}`)
    event.server.runCommandSilent(`setblock ${x1} 2 ${z0} ${前后墙}`)
    event.server.runCommandSilent(`setblock ${x1} 1 ${纵向长度} ${前后墙半砖}[type=bottom]`)
    event.server.runCommandSilent(`setblock ${x1} 2 ${纵向长度} ${前后墙半砖}[type=top]`)
    event.server.runCommandSilent(`setblock ${x1} ${y0} ${纵向长度} ${地板半砖}[type=bottom]`)
    }
    for (let k = 1; k < 高度; k++){
    let x2 = x + 网格宽
    event.server.runCommandSilent(`setblock ${x} ${k} -1 ${前后墙}`)
    event.server.runCommandSilent(`setblock ${x2} ${k} -1 ${前后墙}`)
    event.server.runCommandSilent(`setblock ${x} ${k} ${纵向长度} ${前后墙}`)
    event.server.runCommandSilent(`setblock ${x2} ${k} ${纵向长度} ${前后墙}`)
    if (k == y0) {
    event.server.runCommandSilent(`setblock ${x} ${k} -1 ${前后墙楼梯}[facing=south]`)
    event.server.runCommandSilent(`setblock ${x2} ${k} -1 ${前后墙楼梯}[facing=south]`)
    event.server.runCommandSilent(`setblock ${x} ${k} ${纵向长度} ${前后墙楼梯}[facing=north]`)
    event.server.runCommandSilent(`setblock ${x2} ${k} ${纵向长度} ${前后墙楼梯}[facing=north]`)
    }
    let x3 = x + 1
    let x4 = x2 - 1
    event.server.runCommandSilent(`setblock ${x3} 2 -1 ${前后墙楼梯}[facing=west,half=top]`)
    event.server.runCommandSilent(`setblock ${x4} 2 -1 ${前后墙楼梯}[facing=east,half=top]`)
    event.server.runCommandSilent(`setblock ${x3} ${k} 0 ${前后墙} keep`)
    event.server.runCommandSilent(`setblock ${x4} ${k} 0 ${前后墙} keep`)
    event.server.runCommandSilent(`setblock ${x3} 2 ${纵向长度} ${前后墙楼梯}[facing=west,half=top]`)
    event.server.runCommandSilent(`setblock ${x4} 2 ${纵向长度} ${前后墙楼梯}[facing=east,half=top]`)
    event.server.runCommandSilent(`setblock ${x3} ${k} ${z0} ${前后墙} keep`)
    event.server.runCommandSilent(`setblock ${x4} ${k} ${z0} ${前后墙} keep`)
    for (let ii = 1; ii < 网格宽; ii++){
    let x1 = ii + x
    event.server.runCommandSilent(`setblock ${x1} ${k} 0 ${窗}[facing=south,open=true] keep`)
    event.server.runCommandSilent(`setblock ${x1} ${k} ${z0} ${窗}[facing=north,open=true] keep`)
    if (k == y0) {
    event.server.runCommandSilent(`setblock ${x1} ${k} 0 ${前后墙}`)
    event.server.runCommandSilent(`setblock ${x1} ${k} ${z0} ${前后墙}`)
    }
    }
    }
    }
    }
//地板
    for (let i = 0; i < 横向长度; i++){
    for (let j = 0; j < 纵向长度; j++){
    let x = i
    let z = j
    event.server.runCommandSilent(`setblock ${x} 1 ${z} ${地板} keep`)
    }}

}})