# Blockade
In short, this is a game I made that is inspired by the ice block puzzles in The Legend of Zelda: Twilight Princess.

# Documentation
## Blocks
`Blocks` are the game pieces of the game.
### The Standard Block
The [`standard block`](#the-standard-block) is a type of [`block`](#blocks) that when moved, slides over [`tiles`](#tiles), and continues to move until it hits a wall, or another [`block`](#blocks). When the [`block`](#blocks) moves over a [`plate`](#plates), it will power the [`plate`](#plates).
If the [`block`](#blocks) has a `color`, it will only be able to power [`plates`](#plates) of the same `color`. If the [`block`](#blocks) is white, it will be able to power all [`plates`](#plates).

### The Hollow Block `WIP`
The [`hollow block`](#the-hollow-block-wip) is a type of [`block`](#blocks) that, like the [`standard block`](#the-standard-block),  when moved, will move until it hits a wall or another [`block`](#blocks). However, when this [`block`](#blocks) lands on a [`plate`](#plates), it will not power the [`plate`](#plates) because of its empty interior.

## Plates
`Plates` are the goals or objectives of the game.
### The Standard Plate
The [`standard plate`](#the-standard-plate) is a type of [`plate`](#plates) that when a [`block`](#blocks) finishes moving on top of it, the [`plate`](#plates) will be powered.

## Tiles
`Tiles` are the foundation of level, that makes up the grid.
### The Standard Tile
The [`standard tile`](#the-standard-tile) is a type of [`tile`](#tiles) that allows any type of [`block`](#blocks) to slide over it.

## Wiring
`Wires` are the components that make a level function behind the scenes.
### The Standard Wire `WIP`
The [`standard wire`](#the-standard-wire-wip) is a type of [`wire`](#wiring) that connects to `functional objects` or other [`wires`](#wiring). [`Wires`](#wiring) can be `colored`. `Colored` [`Wires`](#wiring) can only connect to [`wires`](#wiring) of the same `color`.
### The AND Gate `WIP`
The [`AND gate`](#the-and-gate-wip) is a type of `logic gate` that has two `inputs` and one `output`. If both of the `inputs` are being powered, then the `output` will be on.
### The OR Gate `WIP`
the [`OR gate`](#the-or-gate-wip) is a type of `logic gate` that has two `inputs` and one `output`. If at least one of the `inputs` are being powered, that the `output` will be on.
### The NOT Gate `WIP`
The [`NOT gate`](#the-not-gate-wip) is a type of `logic gate` that has one `input` and one `output`. If the `input` is powered, the the `output` will be unpowered, and if the `input` is unpowered, the `output` will be powered. The [`NOT gate`](#the-not-gate-wip) essentially works as an inverter.