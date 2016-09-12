# Blockade
Blockade is a minimal grid-based puzzle game I created that is inspired by the ice puzzles in The Legend of Zelda: Twilight Princess.

While making this game, I had lots of help in the forms of levels, ideas, bug reports, suggestions, or just plain feedback. There were many different people helping with the game, mostly friends from school, but [Grady Shoemaker](https://github.com/grady404) definitely contributed the most.

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

### Hollow Block `WIP`
The `hollow block` is a type of `block` that, like the [`standard block`](#standard-block), will move until it hits a wall or another solid object. However, when this `block` lands on a [`plate`](#plates) or `switch`, it will be unable to power the [`plate`](#plates) or `switch` due to its hollow interior.

### Lightweight Block `WIP`
The `lightweight block` is a type of `block` that functions somewhat similarly to the [`hollow block`](#hollow-block-wip), in that it is unable to activate [`plates`](#plates) and `switches`. But unlike the [`standard block`](#standard-block) and [`hollow block`](#hollow-block-wip), which will stay put when another `block` impacts them, the `lightweight block` will be pushed in the same direction as the intervening `block` until the pair of `blocks` hits a wall or other solid object.

## Plates
`Plates` act as the goals or objectives of the level.
### Standard Plate
The `standard plate` is the most basic type of `plate`, and will become powered if a certain type of [`block`](#blocks) comes to rest on top of it. A plate can be powered by a [`standard block`](#standard-block) of its same color, or a [`wildcard block`](#wildcard-block-wip). When all `plates` in a level are powered, the level is completed.

### Wildcard Plate `WIP`
The `wildcard plate` is a type of plate that, like the [`standard plate`](#standard-plate), must be powered by a [`standard block`](#standard-block) or [`wildcard block`](#wildcard-block-wip) for the level to be completed. However, this type of `plate` is able to be powered by any color of [`standard block`](#standard-block), as opposed to only one. `Wildcard plates` cannot be powered by [`hollow blocks`](#hollow-block-wip).

## Wires
`Wires` are the components that make electrical circuits function behind the scenes.
### Standard Wire `WIP`
The `standard wire` is the most basic type of `wire` tile, and will automatically connect to other `wire` tiles immediately adjacent to itself or the `inputs` and `outputs` of [`appliances`](#appliances) and [`logic gates`](#logic-gates).

### Intersection Wire `WIP`
The `intersection wire` behaves similarly to the [`standard wire`](#standard-wire-wip), automatically connecting to adjacent `wire` tiles and functional objects. However, this `wire` tile is used to pass two completely separate circuits through each other, and only allows current to pass from the top side to the bottom side, and the left to the right side.

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
The `T flip-flop` is a `memory circuit` with one `input` and one `output`. Whenever the `T flip-flop` receives a signal through its `input`, it will invert its `output`. When creating a level, the initial state of the `output` can be toggled.

## Appliances
`Appliances` are the inputs and outputs of [`wiring`](#wires) systems and allow electrical circuits to interface with the main game.
### Switch `WIP`
The `switch` is an `appliance` that has one `output`. A `switch` will activate if a [`standard block`](#standard-block) of its respective color or a [`wildcard block`](#wildcard-block-wip) comes to rest on top of it, at which point the `output` of the `switch` will become powered until the [`block`](#blocks) is moved elsewhere.