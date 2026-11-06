import {Format,_Format} from "./OpcodeType.ts";

const files = [
    "la-atomics-32",
    "la-atomics-64",
    "la-base-32",
    "la-base-64",
    "la-bitops-32",
    "la-bitops-64",
    "la-bound",
    "la-bound-64",
    "la-bound-fp-d",
    "la-bound-fp-s",
    "la-fp",
    "la-fp-d",
    "la-fp-s",
    "la-mul-32",
    "la-mul-64",
    "la-privileged-32",
    "la-privileged-64",
    "lasx",
    "lbt",
    "lsx",
    "lvz"
];

export interface Subset {
    la32:boolean|undefined
    la64:boolean|undefined
    lbt:boolean|undefined
    lvz:boolean|undefined
    primary:boolean|undefined
    lsx:boolean|undefined
    lasx:boolean|undefined
    provisional:boolean|undefined
}
export interface Opcode {
    codeMask:number
    fileName:string|null
    mnemonic:string
    format:_Format
    others:string[]|null
    subsets:Subset|null|undefined
    mark:number|null
}

/**
 * https://github.com/loongson/la-abi-specs/blob/release/lapcs.adoc
 */
export const VCPURegister = [
  { alias: 'zero', constant: true },
  { alias: 'ra' },
  { alias: 'tp' },
  { alias: 'sp' },
  { alias: 'a0' },
  { alias: 'a1' },
  { alias: 'a2' },
  { alias: 'a3' },
  { alias: 'a4' },
  { alias: 'a5' },
  { alias: 'a6' },
  { alias: 'a7' },
  { alias: 't0' },
  { alias: 't1' },
  { alias: 't2' },
  { alias: 't3' },
  { alias: 't4' },
  { alias: 't5' },
  { alias: 't6' },
  { alias: 't7' },
  { alias: 't8' },
  { alias: 'u0' },
  { alias: 's9' },
  { alias: 's0' },
  { alias: 's1' },
  { alias: 's2' },
  { alias: 's3' },
  { alias: 's4' },
  { alias: 's5' },
  { alias: 's6' },
  { alias: 's7' },
  { alias: 's8' },
]
export const VCPUFRegister = [
  { alias: 'fa0' },
  { alias: 'fa1' },
  { alias: 'fa2' },
  { alias: 'fa3' },
  { alias: 'fa4' },
  { alias: 'fa5' },
  { alias: 'fa6' },
  { alias: 'fa7' },
  { alias: 'ft0' },
  { alias: 'ft1' },
  { alias: 'ft2' },
  { alias: 'ft3' },
  { alias: 'ft4' },
  { alias: 'ft5' },
  { alias: 'ft6' },
  { alias: 'ft7' },
  { alias: 'ft8' },
  { alias: 'ft9' },
  { alias: 'ft10' },
  { alias: 'ft11' },
  { alias: 'ft12' },
  { alias: 'ft13' },
  { alias: 'ft14' },
  { alias: 'ft15' },
  { alias: 'fs0' },
  { alias: 'fs1' },
  { alias: 'fs2' },
  { alias: 'fs3' },
  { alias: 'fs4' },
  { alias: 'fs5' },
  { alias: 'fs6' },
  { alias: 'fs7' },
]

export const opcodeList:Opcode[] = [];
export const opcodeMap:Map<number, Map<_Format, Map<number, Opcode>>> = new Map();
let inited=false;
export async function init() {
  if (inited) {
    return;
  }
  inited = true;
  const values = await Promise.all(files.map(v => fetch(`/assets/loongarch-opcodes/${v}.txt`)))
  for (let i = 0; i < files.length; i++) {
      const response = values[i]
      const fileName = files[i]
      const str = (await response.text())
      const lines = str.split("\n")

      for (const line of lines) {
          if (!line.match(/^[0-9a-f]{8} .* .*$/)) {
              continue
          }
          const params = line.split(/ +/)
          const fmt=params[2]
          const orig_fmt = params.filter(v => v.startsWith('@orig_fmt='))
          let ofmt=null;
          if(orig_fmt.length > 0){
              ofmt = orig_fmt[0].substring("@orig_fmt=".length);
          }
          const opcodeType = Format.valueOf(fmt,ofmt)
          const op:Opcode = {
              codeMask: Number.parseInt(params[0], 16),
              fileName: fileName,
              mnemonic: params[1],
              format:opcodeType,
              others: params.length > 3 ? params.slice(3) : [],
              mark: opcodeType.opcodeMask,
              subsets:null
          }
          // 对opcode进行验证 参数位不要有定义
          if (((~opcodeType.opcodeMask) & op.codeMask) !== 0) {
              throw new Error()
          }
          opcodeList.push(op)
      }
  }
  const allMask=Format.allUnMask();
  for (const opcode of opcodeList) {
      const top = opcode.codeMask & allMask
      if (!opcodeMap.has(top)) {
          opcodeMap.set(top, new Map())
      }
      if (!opcodeMap.get(top).has(opcode.format)) {
          opcodeMap.get(top).set(opcode.format, new Map())
      }
      if (opcodeMap.get(top).get(opcode.format).get(opcode.codeMask) != null) {
          throw new Error()
      }
      opcodeMap.get(top).get(opcode.format).set(opcode.codeMask, opcode)
  }
}

export function matchCode(code:number):Opcode {
    let match:Opcode|null = null
    const allUnMask = Format.allUnMask();
    opcodeMap.get(allUnMask & code).forEach((value, key) => {
        const opcode = key.opcodeMask & code
        if (value.has(opcode)) {
            match = value.get(opcode)
        }
    })
    if (match == null) {
        match = {
          codeMask:code,
          fileName:null,
          mnemonic:'unknown.word',
          format:Format.valueOf("EMPTY"),
          others:null,
          subsets:null,
          mark:null
        }
    }
    return match
}
export const ArgType = {
    INT_REG: 0,
    FP_REG: 1,
    FCC_REG: 2,
    SCRATCH_REG: 3,
    LSX_REG: 4,
    LASX_REG: 5,
    SIGNEDNESS: 6
};

export function argTypeToString(arg:number): string|undefined{
    switch (arg) {
        case ArgType.INT_REG :
            return 'r'
        case ArgType.FP_REG :
            return 'f'
        case ArgType.FCC_REG :
            return 'fcc'
        case ArgType.SCRATCH_REG :
            return 'scr'
        case ArgType.LSX_REG :
            return 'vr'
        case ArgType.LASX_REG :
            return 'xr'
        case ArgType.SIGNEDNESS :
            return ''
    }
}
export const argTypeMap:Map<string, number> = new Map(
    [
        ['S', ArgType.SIGNEDNESS],
        ['U', ArgType.SIGNEDNESS],
        ['D', ArgType.INT_REG],
        ['J', ArgType.INT_REG],
        ['K', ArgType.INT_REG],
        ['A', ArgType.INT_REG],
        ['F', ArgType.FP_REG],
        ['C', ArgType.FCC_REG],
        ['T', ArgType.SCRATCH_REG],
        ['V', ArgType.LSX_REG],
        ['X', ArgType.LASX_REG],
    ]
);

export interface Arg {
    argType:number;
    value:number;
    showValue:string
}

export interface Code {
    opcode:Opcode;
    args:Arg[];
    pc:number;
}
export function decodeArgs(opcode:Opcode, code:number):Arg[] {
    const args:Arg[] = [];
    opcode.format.args.forEach(it => {
        let p:number = 0
        if (it.slots == null) {
            p = ((code & it.mask) >>> it.offset)
        } else {
            let i = 0
            let mask = 0
            const pl = it.slots;
            for (let j = 0; j < pl.length; j++) {
                const pp = pl[pl.length - j - 1];
                mask |= pp.mask >>> pp.offset
                const v = ((code & pp.mask) >>> pp.offset) << i;
                i += pp.width
                p |= v
            }
            if (it.repr.startsWith('S') && (p >> (i - 1)) !== 0) {
                // sign_ext
                p = ((~mask) | p)
            }
            if (it.ps !== 0) {
                p <<= it.ps
            }
        }
        const type = argTypeMap.get(it.repr[0])
        let showValue = "";
        switch (type){
            case ArgType.INT_REG:
                showValue = "$" + VCPURegister[p].alias;
                break;
            case ArgType.SIGNEDNESS:
                showValue = p + "";
                break;
            default:
                showValue = "$" + argTypeToString(type) + p;
                break
        }
        args.push({
          argType:type,
          value:p,
          showValue:showValue
        })
    })
    return args
}
