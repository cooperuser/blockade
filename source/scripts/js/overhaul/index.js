const {Blockade, Vector2, tiles, blocks, plates} = require("blockade");

let b = new Blockade();
let tile = b.addTile(tiles.Standard.type);
let block = b.addBlock(blocks.Standard.type);
b.addTile(tiles.Sticky.type, new Vector2(1, 0));
b.addTile(tiles.Standard.type, new Vector2(1, 1));
b.addTile(tiles.Standard.type, new Vector2(2, 0));
let plate = b.addPlate(plates.Standard.type, new Vector2(2, 0));
b.addTile(tiles.Standard.type, new Vector2(2, 1));
b.addTile(tiles.Standard.type, new Vector2(3, 0));
let block2 = b.addBlock(blocks.Standard.type, new Vector2(3, 0));
b.render();