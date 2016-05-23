'use strict';

var StructArrayType = require('../util/struct_array');
var util = require('../util/util');
var Point = require('point-geometry');

// notes from ansis on slack:
// it would be best if they are added to a buffer in advance so that they are only created once. There would be a separate buffer with all the individual collision boxes and then SymbolInstance would store the beginning and end indexes of a feature's collisionboxes. CollisionFeature wouldn't really exist as a standalone thing, it would just be a range of boxes in the big collision box buffer

/*
* 
* A StructArray implementation of symbolInstances from data/bucket/symbol_bucket.js
* this will allow symbolInstances to be transferred between the worker and main threads
*
* @class SymbolInstanceArray
* @private
*/

var SymbolInstanceArray = new StructArrayType({
    members: [
        // the indices of the glyph quads applicable to this particular symbol instance
        { type: 'Int16', name: 'glyphQuadsStart' },
        { type: 'Int16', name: 'glyphQuadsEnd' },

        // each symbolInstance is centered around the anchor point
        { type: 'Int16', name: 'anchorPointX' },
        { type: 'Int16', name: 'anchorPointY' },

        // booleans -- 0: false, 1: true
        {type:'Int8', name:'hasText'},
        {type:'Int8', name:'hasIcon'}
    ]
});

util.extendAll(GlyphQuadsArray.prototype.StructType.prototype, {
    get anchorPoint() {
        return new Point(this.anchorPointX, this.anchorPointY);
    }
});