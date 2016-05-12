'use strict';

var StructArrayType = require('../util/struct_array');
var util = require('../util/util');
var Point = require('point-geometry');

/*
* 
* A StructArray implementation of glyphQuad from symbol/quads
* this will allow glyph quads to be transferred between the worker and main threads along with the rest of 
* the symbol_bucket
*
* @class GlyphQuadsArray
* @private
*/

var GlyphQuadsArray = new StructArrayType({
    members: [
        // the quad is centered around the anchor point
        { type: 'Int16', name: 'anchorPointX' },
        { type: 'Int16', name: 'anchorPointY' },

        // the offsets of the tl (top-left), tr, bl, br corners from the anchor point
        // do these need to be floats? 
        { type: 'Int16', name: 'tlX' },
        { type: 'Int16', name: 'tlY' },
        { type: 'Int16', name: 'trX' },
        { type: 'Int16', name: 'trY' },
        { type: 'Int16', name: 'blX' },
        { type: 'Int16', name: 'blY' },
        { type: 'Int16', name: 'brX' },
        { type: 'Int16', name: 'brY' },

        // texture coordinates (height, width, x, and y)
        { type: 'Int16', name: 'texH' },
        { type: 'Int16', name: 'texW' },
        { type: 'Int16', name: 'texX' },
        { type: 'Int16', name: 'texY' },

        //the angle of the label at it's center, not the angle of this quad.
        { type: 'Float32', name: 'angle' },

        // quad is only valid for scales < maxScale && scale > minScale.
        { type: 'Float32', name: 'maxScale' },
        { type: 'Float32', name: 'minScale' },


    ]
});

util.extendAll(GlyphQuadsArray.prototype.StructType.prototype, {
    get anchorPoint() {
        return new Point(this.anchorPointX, this.anchorPointY);
    }
});