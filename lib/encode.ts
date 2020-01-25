type U16 = number;

const u8 /* */ = [0, 0, 0, 0]; // byte;
const u16 /**/ = [0, 0, 0, 0 /*|*/, 0, 0, 0, 0];

class Encode {
    public covertoToU8(value: U16): Uint8Array {
        if (value < 0 && value > 65_535 && value < 0)
        throw new TypeError("Value no is assigned to `u16`");

        if (value <= 255) return new Uint8Array([0, value]);

        let binResult = (value >>> 0).toString(2);

        binResult =
        16 - binResult.length !== 0
            ? "0".repeat(16 - binResult.length) + binResult
            : binResult;

        const a = binResult
        .split("")
        .slice(0, 8)
        .join("");

        const b = binResult
        .split("")
        .slice(8, 16)
        .join("");

        return new Uint8Array([parseInt(a, 2), parseInt(b, 2)]);
    }
}
// 00 0000_0000

export default new Encode();