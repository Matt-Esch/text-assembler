var uuid = require('node-uuid'),
    base64 = require('safe64');


module.exports = {
    assemble: assemble,
    disassemble: disassemble
};

var uuidSize = base64.encode(uuid()).length;

function assemble(parts) {
    var partsLength = parts.length,
        sanitisedParts = parts.slice(0),
        result = "",
        lastPart = sanitisedParts[partsLength - 1],
        i;

    if (lastPart.slice(-1) === '-') {
        sanitisedParts[partsLength - 1] = lastPart.slice(0, -1);
    }

    for (i = 0; i < partsLength; i += 1) {
        result += sanitisedParts[i].slice(uuidSize);
    }

    return base64.decode(result);
}

function disassemble(text, payloadSize) {
    var safeText = Base64.encode(text) + '-',
        safeGuid = Base64.encode(uuid()),
        textLength = safeText.length,
        dataSize = payloadSize - safeGuid.length,
        result = [],
        i;

    if(dataSize <= 0) {
        throw new Error('GUID exceeds payload size');
    }

    for (i = 0; i < textLength; i += dataSize) {
        result.push(safeGuid + safeText.slice(i, i + dataSize))
    }

    return result;
}


