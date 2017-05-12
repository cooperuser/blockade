# Blockade
Blockade is a minimal but challenging puzzle game, inspired by the ice puzzles in The Legend of Zelda: Twilight Princess.

### Programming
- Cooper Anderson
- Grady Shoemaker

### Level Design
- Grady Shoemaker
- Cooper Anderson
- Jack Warner

### Special Thanks
- Antony Suarez
- Fernando Morales

# Documentation

## Board
The `board` is the foundation of the level and is comprised of [`board tiles`](#board-tile).

### Board Tile
`Board tiles` are square objects that comprise the `board` and can be arranged in any fashion on the grid, each allowing any type of [`block`](#blocks) to slide over them. Any spaces on the board that are not occupied by a `board tile` are considered walls.

## Blocks
`Blocks` are the most fundamental game pieces of the game.

### Standard Block
The `standard block` is the most basic type of `block`. When moved, a `standard block` will slide across the [`board`](#board) and continue moving until it hits a wall, a `gate`, or another `block`. If a block comes to rest on top of a [`plate`](#plates) or `switch`, that [`plate`](#plates) or `switch` will be powered. A `standard block` can only power a [`plate`](#plates) or `switch` of its respective color, unless the receiving object is a [`wildcard plate`](#wildcard-plate-wip) or `wildcard switch`.

### Wildcard Block `WIP`
The `wildcard block` moves in the exact same fashion as the [`standard block`](#standard-block), sliding across the [`board`](#board) until it comes into contact with a wall or other solid object. However, this type of `block` differs from the [`standard block`](#standard-block) in that it is able to power any color of `plate` or `switch`.

### Hollow Block
The `hollow block` is a type of `block` that, like the [`standard block`](#standard-block), will move until it hits a wall or another solid object. However, when this `block` lands on a [`plate`](#plates) or `switch`, it will be unable to power the [`plate`](#plates) or `switch` due to its hollow interior.

### Lightweight Block `WIP`
The `lightweight block` is a type of `block` that functions somewhat similarly to the [`hollow block`](#hollow-block), in that it is unable to activate [`plates`](#plates) and `switches`. But unlike the [`standard block`](#standard-block) and [`hollow block`](#hollow-block), which will stay put when another `block` impacts them, the `lightweight block` will be pushed in the same direction as the intervening `block` until the pair of `blocks` hits a wall or other solid object.

### Block Cluster `WIP`
Any number of `blocks` immediately adjacent to each other, horizontally or vertically, can be grouped together to form a `block cluster`. When moved, a `block cluster` will slide until any of the `blocks` comprising it come into contact with a wall. `Block clusters` must not necessarily consist entirely of one type of block; they may contain any combination of [`standard blocks`](#standard-block), [`wildcard blocks`](#wildcard-block-wip), [`hollow blocks`](#hollow-block), or [`lightweight blocks`](#lightweight-block-wip). However, if a [`lightweight block`](#lightweight-block-wip) is in the same `block cluster` as any other `block` type, the group will behave as normal weight and therefore stay put regardless of any other `blocks` impacting it.

## Plates
`Plates` act as the goals or objectives of the level.

### Standard Plate
The `standard plate` is the most basic type of `plate`, and will become powered if a certain type of [`block`](#blocks) comes to rest on top of it. A plate can be powered by a [`standard block`](#standard-block) of its same color, or a [`wildcard block`](#wildcard-block-wip). When all `plates` and [`victory blocks`](#victory-block-wip) in a level are powered, the level is completed.

### Wildcard Plate `WIP`
The `wildcard plate` is a type of plate that, like the [`standard plate`](#standard-plate), must be powered by a [`standard block`](#standard-block) or [`wildcard block`](#wildcard-block-wip) for the level to be completed. However, this type of `plate` is able to be powered by any color of [`standard block`](#standard-block), as opposed to only one. `Wildcard plates` cannot be powered by [`hollow blocks`](#hollow-block).

## Wires
`Wires` are the components that make electrical circuits function behind the scenes.

### Standard Wire `WIP`
The `standard wire` is used to transmit electrical signals between the `inputs` and `outputs` of [`appliances`](#appliances), [`logic gates`](#logic-gates) and [`memory circuits`](#memory-circuits). Rather than function as a singular tile on the board, the `standard wire` serves as a connector between an `input` and an `output` of two distinct objects. Multiple `standard wires` can be attached to each `input` or `output`.

## Logic Gates
`Logic gates` perform logical operations on electrical signals.

### NOT Gate `WIP`
The `NOT gate` is the most basic type of `logic gate`, with one `input` and one `output`. If the `input` is unpowered, the the `output` will be powered, and vice versa. The `NOT gate` essentially functions as an inverter.

### OR Gate `WIP`
The `OR gate` is a `logic gate` that has two `inputs` and one `output`. The `output` will be powered if and only if at least one of the `inputs` are powered.

### AND Gate `WIP`
The `AND gate` is a `logic gate` that has two `inputs` and one `output`. The `output` will be powered if and only if both of the `inputs` are powered.

### XOR Gate `WIP`
The `XOR gate` is a `logic gate` that has two `inputs` and one `output`. The `output` will be powered if and only if exactly one of the `inputs` are powered. Unlike the [`OR gate`](#or-gate-wip), the `output` of the `XOR gate` will not be powered if both `inputs` are on.

## Memory Circuits
`Memory circuits` allow electrical circuits to store and manipulate data.

### T Flip-Flop `WIP`
The `T flip-flop` is a `memory circuit` with one `input` and one `output`. Whenever the `T flip-flop` receives a signal through its `input`, it will invert its `output`. When creating a level, the `initial state` of the `output` can be toggled.

### SR Latch `WIP`
The `SR latch` is a `memory circuit` with two `inputs`, labeled S and R, and one `output`. When a signal is received through S the `output` will activate, and when a signal is received through R the `output` will deactivate. When creating a level, the `initial state` of the `output` can be toggled.

## Appliances
`Appliances` are the inputs and outputs of [`wiring`](#wires) systems and allow electrical circuits to interface with the main game.

### Switch `WIP`
The `switch` is an `appliance` that has one `output`. A `switch` will activate if a [`standard block`](#standard-block) of its respective color or a [`wildcard block`](#wildcard-block-wip) comes to rest on top of it, at which point the `output` of the `switch` will become powered until the [`block`](#blocks) is moved elsewhere.

### Door `WIP`
The `door` is an `appliance` with one single `input`. When powered, [`blocks`](#blocks) will be able to pass over the tile occupied by a `door`, but if the `door` is unpowered that tile will behave as a wall. If the power to a `door` is cut while a block is occupying its space, the `door` will remain open until that block is moved elsewhere.

### Victory Block `WIP`
The `victory block` is an `appliance` with one `input`, and is similar to [`plates`](#plates) in that it must be powered for the current level to be completed. However, unlike [`plates`](#plates) which can only be powered by blocks, `victory blocks` are powered in the same manner as any other electrical `appliance`. Once all [`plates`](#plates) and `victory blocks` in a level become powered, the player will have completed the level.

### Countdown Clock `WIP`
The `countdown clock` is an `appliance` with one `input` and one `output`. Every `countdown clock` has an `initial value`, which is a positive integer set by the level creator in the editor, and a `current value`, which defaults to zero at the start of the level. When the `input` is triggered, the `output` is activated and the `current value` is set to the `initial value`. From then on, the `current value` is decremented by one each time any [`block`](#blocks) or [`block cluster`](#block-cluster-wip) finishes moving. When the `current value` of the `countdown clock` reaches zero, the `output` is deactivated and the clock is reset, thus no longer allowing the `current value` to be decremented until the clock is activated again.

### Oscillator `WIP`
The `oscillator` is an `appliance` similar to the [`countdown clock`](#countdown-clock-wip), with one single `output`. Every `oscillator` has an `on period` and an `off period`, which are positive integers, as well as an `initial state`, all of which are set by the level creator in the editor. Each `oscillator` also has a `current value` and a `current state`, which change throughout the course of the level. At the start of the level, the `current value` of the `oscillator` is set to the value of either the `on period` or the `off period`, depending on its `initial state`. Every time any [`block`](#blocks) or [`block cluster`](#block-cluster-wip) finishes moving, the `current value` is decremented by one, similar to a [`countdown clock`](#countdown-clock-wip). When the `current value` reaches zero the state of the oscillator is toggled, and again the `current value` of the clock is set to the value of either the `on period` or `off period` based on its new state. Unlike [`countdown clocks`](#countdown-clock-wip), `oscillators` will always continue to record the movements of [`blocks`](#blocks) and can never be completely deactivated.