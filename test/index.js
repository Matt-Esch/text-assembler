var text = require('../index.js'),
    assert = require('assert'),
    uuid = require('node-uuid'),
    base64 = require('safe64');

var longText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet, quam in fringilla aliquam, lectus ante ullamcorper odio, id interdum ligula elit non ligula. Etiam hendrerit magna a nibh dignissim sed semper ipsum laoreet. Pellentesque auctor quam quis magna cursus eget semper risus vestibulum. Vestibulum non dolor nisi. Vestibulum in nulla lorem. Duis risus turpis, consectetur sit amet interdum eu, consectetur ac libero. Aliquam erat volutpat. Suspendisse varius leo a libero aliquet eu adipiscing nibh facilisis. In nec enim augue. In sodales, turpis vel semper euismod, est augue vulputate lorem, ac lobortis tortor libero ac nibh. Mauris aliquam augue at ante feugiat rhoncus."

    + "\n Nam dapibus diam ut neque placerat et ornare justo mattis. Donec aliquam imperdiet justo, ut suscipit lectus rhoncus sit amet. Curabitur sit amet lectus nisi, eget ullamcorper ante. Aenean vel dictum diam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Suspendisse imperdiet pretium sem in lobortis. Donec vulputate nisl ac velit fermentum sit amet congue arcu elementum. Proin rhoncus purus condimentum nunc iaculis pulvinar. Aenean ac faucibus nisl. Integer vitae enim eget sapien porta aliquam. Phasellus vulputate dapibus ipsum, sit amet vehicula nibh faucibus ac. Maecenas rutrum nulla magna."




var textParts = [];

var size = 2 *longText.length;

var disassembled, assembled, test, i, j;

var minBlockSize = base64.encode(uuid()).length + 1;


for (i = 0; i < longText.length; i += 7) {
    textParts.push(longText.slice(0, i));
}

// For each block size from 1 to twice the string length
for (i = 0; i < size; i += 1) {

    // For each substring in longtext
    for (j = 0; j < textParts.length; j += 1) {

        console.log((i + 1) + '/' + size, (j + 1) +'/' + textParts.length);

        test = textParts[j];

        if (i < minBlockSize) {
            assert.throws(function () {
                disassembled = text.disassemble(test, i);
            }, Error);
        } else {
            disassembled = text.disassemble(test, i);
            assembled = text.assemble(disassembled);
            assert.equal(assembled, test);
        }
    }
}