const {Blockade, Vector2, Tiles, Blocks, Plates} = require("blockade");

let b = new Blockade();
let tile = b.addTile(Tiles.standard);
let block = b.addBlock(Blocks.standard);
b.addTile(Tiles.standard, new Vector2(1, 0));
b.addTile(Tiles.standard, new Vector2(1, 1));
b.addTile(Tiles.standard, new Vector2(2, 0));
let plate = b.addPlate(Plates.standard, new Vector2(2, 0));
b.addTile(Tiles.standard, new Vector2(2, 1));
b.addTile(Tiles.standard, new Vector2(3, 0));
//let block2 = b.addBlock(Blocks.standard, new Vector2(3, 0));
b.render();