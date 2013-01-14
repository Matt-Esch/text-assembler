# text-assembly

Splits a string into multiple parts, identified by a guid.

## Example

```js
var text = require('text-assembler');

// An array of uri-safe base64 encoded strings no longer than 60 characters long
var payloads = text.disassemble('Some really long string that needs to be split into bits.', 60);

// The original string
var reassemble = text.assemble(payloads);
```

## Installation

`npm install text-assembly`

## Contributors

 - Matt-Esch

## MIT Licenced
