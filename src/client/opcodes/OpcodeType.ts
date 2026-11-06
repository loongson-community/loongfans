import {WeakBuffer} from "./WeakBuffer.ts";

/**
 * loongarch-opcodes
 * The bit index specifiers are as follows:
 *
 * |Character|Starting bit index|
 * |---------|------------------|
 * |`d`|0|
 * |`j`|5|
 * |`k`|10|
 * |`a`|15|
 * |`m`|16|
 * |`n`|18|
 */
class _CharacterStarting {

  name:string
  offset:number

  /**
   * @param name {string}
   * @param offset {number}
   */
  constructor(name:string, offset:number) {
    this.name = name;
    this.offset = offset;
  }
}
export const CharacterStarting = {
    values: new Array<_CharacterStarting>(),
    valueMap: new Map<string,_CharacterStarting>(),

    valueOf(name:string) {
        if (!CharacterStarting.valueMap.has(name)) {
            throw new TypeError()
        }
        return CharacterStarting.valueMap.get(name)
    },
}
CharacterStarting.values = [
    new _CharacterStarting("d", 0),
    new _CharacterStarting("j", 5),
    new _CharacterStarting("k", 10),
    new _CharacterStarting("a", 15),
    new _CharacterStarting("m", 16),
    new _CharacterStarting("n", 18)
]
CharacterStarting.values.forEach(v => CharacterStarting.valueMap.set(v.name, v))
/**
 *
 * |Register slot|Starting bit index|Field size in bits|Bank|
 * |-------------|------------------|------------------|----|
 * |`D`|0|5|Integer|
 * |`J`|5|5|Integer|
 * |`K`|10|5|Integer|
 * |`A`|15|5|Integer|
 * |`C`|Specified by the index character|3|FP condition code|
 * |`F`|Specified by the index character|5|FP|
 * |`T`|Specified by the index character|2|LBT scratch|
 * |`V`|Specified by the index character|5|LSX / 128-bit SIMD|
 * |`X`|Specified by the index character|5|LASX / 256-bit SIMD|
 *
 * signedness   = "S" / "U"
 */
class _RegisterSlot {
  name:string
  offset:number
  width:number
  constructor(name:string, offset:number, width:number) {
    this.name = name;
    this.offset = offset;
    this.width = width;
  }
}
export const RegisterSlot = {
    values: new Array<_RegisterSlot>(),
    valueMap: new Map<string, _RegisterSlot>(),
    enumValueOf(name:string):_RegisterSlot|undefined {
        return RegisterSlot.valueMap.get(name)
    }
}
RegisterSlot.values = [
    new _RegisterSlot("D", 0, 5),
    new _RegisterSlot("J", 5, 5),
    new _RegisterSlot("K", 10, 5),
    new _RegisterSlot("A", 15, 5),
    new _RegisterSlot("C", -1, 3),
    new _RegisterSlot("F", -1, 5),
    new _RegisterSlot("T", -1, 2),
    new _RegisterSlot("V", -1, 5),
    new _RegisterSlot("X", -1, 5),
    new _RegisterSlot("S", -1, -1),
    new _RegisterSlot("U", -1, -1)
]
RegisterSlot.values.forEach(v => RegisterSlot.valueMap.set(v.name, v))

export class Slot {
    offset:number|null
    width:number|null
    mask:number
    repr:string|null

    constructor(offset:number|null, width:number|null, mask:number, repr:string|null) {
        this.offset = offset;
        this.width = width;
        this.mask = mask;
        this.repr = repr;
    }
}

export interface Arg {
    offset:number|null
    width:number|null
    mask:number
    repr:string|null
    slots:Slot[]|null
    ps:number
}
export class _Format {
  repr:string
  opcodeMask:number

  args:Arg[]

  constructor(repr:string, opcodeMask:number, args:Arg[]) {
    this.repr = repr;
    this.opcodeMask = opcodeMask;
    this.args = args;
  }
}
export const Format = {
    values: new Array<_Format>(),
    valueMap: new Map<string, _Format>(),

    valueOf(name:string, ofmt:string|null=null) {
        let oname = name;
        if (ofmt != null) {
            oname += "." + ofmt
        }
        if (!Format.valueMap.has(oname)) {
            const op = Format.parserOpcodeType(name, ofmt)
            Format.values.push(op)
            Format.valueMap.set(oname, op)
        }
        return Format.valueMap.get(oname)
    },

    allUnMask() {
        return Format.values.map(v => v.opcodeMask).reduce((last, it) => last & it, ~0);
    },
    /**
     *
     * @param str {string}
     * @returns {boolean}
     */
    isLowerCase(str:string):boolean {
        return str.match(/^[a-z]$/) !== null
    },
    /**
     *
     * @param str {string}
     * @returns {boolean}
     */
    isDigit(str:string):boolean {
        return str.match(/^[0-9]$/) !== null
    },
    /**
     *
     * @param start {number}
     * @param size {number}
     * @returns {number}
     */
    genMask(start: number, size: number): number {
        let a = 0;
        for (let i = start; i < start + size; i++) {
            a |= 1 << i
        }
        return a
    },
    splitOpcodeTypeName(name:string):string[] {
        /**
         *
         * @type {string[]}
         */
        const types = [];
        if (name !== "EMPTY") {
            const cb = new WeakBuffer(name.split(""))
            while (cb.hasRemaining()) {
                let tmp = "" + cb.get()
                while (cb.hasRemaining()) {
                    const tmpNew = cb.get()

                    if (this.isLowerCase(tmpNew) || this.isDigit(tmpNew)) {
                        tmp += tmpNew
                    } else {
                        cb.position(cb.position() - 1)
                        break
                    }
                }
                types.push(tmp)
            }
        }
        return types
    },
    /**
     *
     * @param name
     * @param ofmt {string}
     * @returns {Format.Format}
     */
    parserOpcodeType(name:string, ofmt:string|null) {
        // parser
        // parser types
        const types = Format.splitOpcodeTypeName(name)
        let otypes = null;
        if (ofmt != null) {
            otypes = Format.splitOpcodeTypeName(ofmt);
        }
        // genMask;
        // uint
        let mask = 0
        const l = new Array<Arg>(0)
        for (let i = 0; i < types.length; i++) {
            const type = types[i]
            const slot = RegisterSlot.enumValueOf(type.split("")[0])
            let smask = 0
            if (slot.width === -1) {

                /**
                 *
                 * @type {Slot[]}
                 */
                    // It is signedness
                const p = []
                /**
                 *
                 * @type {WeakBuffer<string>}
                 */
                const cb = new WeakBuffer(type.split(""))
                cb.position(1)
                while (cb.hasRemaining()) {
                    const start = cb.get().toString()
                    let tmp = ""
                    while (cb.hasRemaining()) {
                        const tmpNew = cb.get()
                        if (this.isDigit(tmpNew)) {
                            tmp += tmpNew
                        } else {
                            cb.position(cb.position() - 1)
                            break
                        }
                    }
                    const staring = CharacterStarting.valueOf(start)
                    const width = Number.parseInt(tmp)
                    const spmask = Format.genMask(staring.offset, width)
                    p.push(new Slot(staring.offset, width, spmask, [start, tmp].join('')))
                }
                for (const it of p) {
                    if ((smask & it.mask) !== 0) {
                        // 超出范围
                        throw new Error()
                    }
                    smask |= it.mask
                }
                let ps = 0;
                if (otypes !== null) {
                    const cType = otypes.filter(lt => lt !== type && lt.startsWith(type))
                    if (cType.length != 0) {
                        const subs = cType[0].substr(type.length);
                        if (subs.startsWith("ps")) {
                            ps = Number.parseInt(subs.substr(2));
                        }
                    }
                }
                l.push({
                  offset:null,
                  width:null,
                  mask:smask,
                  repr:type,
                  slots:p,
                  ps:ps,
                })
            } else {
                // It is reg
                let offset = slot.offset
                if (offset === -1) {
                    // search start
                    offset = CharacterStarting.valueOf(type[1]).offset
                }
                smask = Format.genMask(offset, slot.width)
                l.push({
                  offset:offset,
                  width:slot.width,
                  mask:smask,
                  repr:type,
                  slots:[
                    new Slot(offset, slot.width, smask, type)
                  ],
                  ps:0,
                })
            }
            if ((mask & smask) !== 0) {
                // 超出范围
                throw new Error()
            }
            mask |= smask
        }
        return new _Format(name, (~mask), l)
    },
}
