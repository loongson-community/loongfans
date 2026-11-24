<template>
  <div class="decode-container">
    <!-- 输入区域 -->
    <div class="input-section">
      <div class="input-wrapper">
        <input
          v-model="text"
          class="code-input"
          :placeholder="t('loongarchOpcodesDecodeInput')"
          @keydown="submitEvent"
        >
        <button class="search-btn" @click="submit">解码</button>
      </div>
    </div>

    <!-- 错误提示 -->
    <div v-if="errorMsg" class="error-msg">
      {{ errorMsg }}
    </div>

    <!-- 结果显示 -->
    <div class="result-card" :class="moveClass">
      <!-- 汇编 -->
      <div class="result-row">
        <span class="result-label" v-text="t('loongarchOpcodesDecodeAsm')"></span>
        <span class="result-value assembly">
          <span class="mnemonic">{{ code?.mnemonic }}</span>
          <span style="">&nbsp;</span>
          <template v-for="(arg,index) in args" :key="index">
            <span v-if="index!==0" class="arg-separator" >,</span>
            <span
              :class="'arg-value color_'+index"
              @mouseenter="moveClass='index_'+index"
              @mouseleave="moveClass=null"
            >{{ arg.showValue }}</span>
          </template>
        </span>
      </div>

      <!-- 二进制可视化 -->
      <div class="result-row">
        <span class="result-label" v-text="t('loongarchOpcodesDecodeBinary')"></span>
        <span class="result-value">
          <div v-if="bitVisualization" class="bit-visualization">
            <div v-for="bytes in bitVisualization" :key="bytes">
              <div v-for="(byte) in bytes" :key="byte" class="byte-group" >
                <div
                  v-for="(bit, bitIdx) in byte"
                  :key="bitIdx"
                  :class="'color_' + bit.argIndex"
                  :title="bit.title"
                  class="bit-box"
                  @mouseenter="moveClass='index_' + bit.argIndex"
                  @mouseleave="moveClass=null"
                  v-text="bit.value"
                >
                </div>
              </div>
            </div>
          </div>
        </span>
      </div>

      <!-- 十六进制 -->
      <div class="result-row">
        <span class="result-label" v-text="t('loongarchOpcodesDecodeHex')"></span>
        <span class="result-value hex-value">{{ hexCode }}</span>
      </div>

      <!-- 类型/格式 -->
      <div class="result-row">
        <span class="result-label" v-text="t('loongarchOpcodesDecodeFmt')"></span>
        <span class="result-value format-value">
          <template v-if="code!=undefined">
          <template v-if="code.format.args.length > 0">
            <span
              v-for="(opt, index) in code.format.args"
              :key="index"
              :class="'format-arg color_'+index"
              @mouseenter="moveClass='index_'+index"
              @mouseleave="moveClass=null"
            >{{ opt.repr }}</span>
          </template>
          <template v-else>
            <span>{{ code.format.repr }}</span>
          </template>
            </template>
        </span>
      </div>

      <!-- 所属文件 -->
      <div class="result-row">
        <span class="result-label" v-text="t('loongarchOpcodesDecodeFile')"></span>
        <span class="result-value file-value">{{ code?.fileName || '-' }}</span>
      </div>

      <!-- 标记/Subset -->
      <div class="result-row">
        <span class="result-label" v-text="t('loongarchOpcodesDecodeSubset')"></span>
        <span class="result-value tags-value">
          <template v-if="subsetTags">
          <template v-if="code?.others && code?.others.length > 0">
            <span
              v-for="(tag, index) in subsetTags"
              :key="index"
              class="subset-tag"
              :class="'subset-' + tag.key"
            >
              {{ tag.label }}
            </span>
          </template>
          <template v-else>
            <span class="no-tags" v-text="t('loongarchOpcodesDecodeSubsetNull')"></span>
          </template>
            </template>
        </span>
      </div>

      <!-- 操作按钮 -->
      <div v-if="code!==null" class="result-row actions">
        <button class="action-btn" @click="copyAssembly"  v-text="t('loongarchOpcodesDecodeCopyAsm')"></button>
        <button class="action-btn" @click="copyHex" v-text="t('loongarchOpcodesDecodeCopyHex')"></button>
      </div>
    </div>
  </div>
</template>
<script>
import {decodeArgs, matchCode, init} from '../../opcodes/Opcodes.ts'
import { useI18n } from "vue-i18n"

export default {
  setup() {
    const {t} = useI18n()
    return {t}
  },
  data() {
    return {
      text: '',
      mode: '',
      code: null,
      args: [],
      binaryCode: null,
      hexCode: null,
      bitVisualization: null,
      moveClass: null,
      errorMsg: null
    }
  },

  computed: {
    // 解析 Subset 标签
    subsetTags() {
      if (!this.code || !this.code.others) return []

      const tags = []
      const subsetMap = {
        'la32': { label: 'LA32', key: 'la32' },
        'la64': { label: 'LA64', key: 'la64' },
        'primary': { label: 'primary', key: 'primary' },
        'lbt': { label: 'LBT', key: 'lbt' },
        'lsx': { label: 'LSX', key: 'lsx' },
        'lasx': { label: 'LASX', key: 'lasx' },
        'lvz': { label: 'LVZ', key: 'lvz' },
        'qemu': { label: 'QEMU', key: 'qemu' },
        'provisional': { label: 'provisional', key: 'provisional' },
      }

      for (const tag of this.code.others) {
        if (tag.startsWith('@')) {
          const key = tag.substring(1)
          if (subsetMap[key]) {
            tags.push(subsetMap[key])
          }
        }
      }

      return tags
    }
  },
  watch: {
    text() {
      this.errorMsg = null
      this.search(this.text)
    }
  },
  async mounted() {
    await init()
  },
  methods: {
    submitEvent(evt) {
      if (evt.key === 'Enter') {
        this.search(this.text)
      }
    },
    submit() {
      this.search(this.text)
    },

    /**
     * @param code {string}
     */
    search(code) {
      code = code.trim()
      this.errorMsg = null

      if (!code) {
        this.code = null
        return
      }

      var c = null
      var inputMode = null

      // 检测输入格式
      if (code.length === 8 && /^[0-9a-fA-F]{8}$/.test(code)) {
        inputMode = 'hex'
        c = code
      } else if (code.length === 10 && /^0x[0-9a-fA-F]{8}$/.test(code)) {
        inputMode = 'hex'
        c = code.substring(2)
      } else if (/^[01\s]*$/.test(code)) {
        let ncode = code.replaceAll(/\s/g, "")
        if (ncode.length === 32) {
          inputMode = 'binary'
          c = ncode
        }
      }

      if (inputMode === 'binary') {
        c = Number.parseInt(c, 2)
      } else if (inputMode === 'hex') {
        c = Number.parseInt(c, 16)
      }

      if (c !== null && !isNaN(c)) {
        this.binaryCode = this.toBinary(c)
        this.hexCode = this.toHex(c)
        this.code = matchCode(c)
        this.bitVisualization = this.renderBitVisualization(this.code, c)
        this.args = decodeArgs(this.code, c)

      } else if (code) {
        this.errorMsg = this.t('loongarchOpcodesDecodeError')
        this.code = null
      }
    },

    toHex(num) {
      return '0x' + (num >>> 0).toString(16).padStart(8, '0')
    },

    toBinary(num) {
      return (num >>> 0).toString(2).padStart(32, '0')
    },

    // 渲染位可视化（大端序显示）
    renderBitVisualization(op, c) {
      const visualization = []
      const code = c >>> 0

      // 为每个参数分配颜色索引
      const argMap = new Map()
      op.format.args.forEach((arg, idx) => {
        argMap.set(arg.mask, idx)
      })

      // 按字节处理（大端序显示：byte 3 -> byte 0）
      for (let byteIdx = 3; byteIdx >= 0; byteIdx--) {
        const byte = []
        // 每个字节从高位到低位显示
        for (let bitIdx = 7; bitIdx >= 0; bitIdx--) {
          const bitPos = byteIdx * 8 + bitIdx
          const bitMask = 1 << bitPos
          const bitValue = (code & bitMask) ? 1 : 0

          // 确定这个位属于哪个参数
          let argIndex = -1
          let title = 'opcode'

          for (const [mask, idx] of argMap) {
            if (mask & bitMask) {
              argIndex = idx
              title = op.format.args[idx].repr
              break
            }
          }

          byte.push({
            value: bitValue,
            argIndex,
            title
          })
        }
        visualization.push(byte)
      }

      return [[visualization[0],visualization[1]], [visualization[2],visualization[3]]]
    },

    copyAssembly() {
      if (!this.code) return
      const assembly = this.code.mnemonic + ' ' + this.args.map(a => a.showValue).join(', ')
      navigator.clipboard.writeText(assembly)
    },

    copyHex() {
      if (!this.hexCode) return
      navigator.clipboard.writeText(this.hexCode)
    }
  }
}
</script>
<style scoped>

.decode-container {
  padding: 20px;
  max-width: 900px;
  margin: 0 auto;
}

/* 输入区域 */
.input-section {
  margin-bottom: 20px;
}

.input-wrapper {
  display: flex;
  gap: 12px;
  margin-bottom: 8px;
}

.code-input {
  flex: 1;
  padding: 12px 16px;
  font-size: 16px;
  font-family: 'Consolas', 'Monaco', monospace;
  border: 2px solid #ddd;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.2s;
}

.code-input:focus {
  border-color: #4CAF50;
}

.search-btn {
  padding: 12px 24px;
  font-size: 16px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
}

.search-btn:hover {
  background: #45a049;
}

.input-hint {
  font-size: 12px;
  color: #888;
}

/* 错误提示 */
.error-msg {
  padding: 12px 16px;
  background: #ffebee;
  color: #c62828;
  border-radius: 8px;
  margin-bottom: 20px;
}

/* 结果卡片 */
.result-card {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  margin-bottom: 20px;
}

.result-row {
  display: flex;
  align-items: flex-start;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
}

.result-row:last-of-type {
  border-bottom: none;
}

.result-label {
  width: 100px;
  font-weight: 600;
  color: #555;
  flex-shrink: 0;
}

.result-value {
  flex: 1;
  font-family: 'Consolas', 'Monaco', monospace;
}

/* 汇编显示 */
.assembly {
  font-size: 18px;
}

.mnemonic {
  font-weight: 600;
  color: #333;
}

.arg-separator {
  margin: 0 4px;
  color: #888;
}

.arg-value {
  padding: 2px 6px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
}

/* 二进制可视化 */
.bit-visualization {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.byte-group {
  display: flex;
  gap: 2px;
  background: #f5f5f5;
  padding: 4px;
  border-radius: 6px;
}

.bit-box {
  width: 24px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  background: #fff;
  border-radius: 4px;
  cursor: pointer;
  transition: transform 0.1s;
}

.bit-box:hover {
  transform: scale(1.1);
  z-index: 1;
}

/* 参数颜色 */
.color_0 { background: #e8f5e9; color: #388e3c; }
.color_1 { background: #fce4ec; color: #c2185b; }
.color_2 { background: #fff3e0; color: #f57c00; }
.color_3 { background: #f3e5f5; color: #7b1fa2; }
.color_4 { background: #e0f2f1; color: #00796b; }

/* 高亮效果 */
.result-card.index_0 .color_0,
.result-card.index_1 .color_1,
.result-card.index_2 .color_2,
.result-card.index_3 .color_3,
.result-card.index_4 .color_4 {
  box-shadow: 0 0 0 2px #333;
}

/* 格式显示 */
.format-value {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.format-arg {
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 14px;
  cursor: pointer;
}

/* 十六进制 */
.hex-value {
  font-size: 16px;
  color: #666;
}

/* 文件 */
.file-value {
  color: #888;
  font-size: 14px;
}

/* 标签 */
.tags-value {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.subset-tag {
  font-size: 11px;
  padding: 3px 8px;
  border-radius: 10px;
  font-weight: 500;
}

.subset-la32 { background: #e3f2fd; color: #1976d2; }
.subset-la64 { background: #f3e5f5; color: #7b1fa2; }
.subset-primary { background: #e8f5e9; color: #388e3c; }
.subset-lbt { background: #fff3e0; color: #f57c00; }
.subset-lsx { background: #fce4ec; color: #c2185b; }
.subset-lasx { background: #e0f2f1; color: #00796b; }
.subset-lvz { background: #f5f5f5; color: #616161; }
.subset-qemu { background: #e8eaf6; color: #3f51b5; }
.subset-provisional { background: #ffebee; color: #c62828; }

.no-tags {
  color: #aaa;
  font-style: italic;
}

/* 操作按钮 */
.actions {
  padding-top: 16px;
  gap: 12px;
}

.action-btn {
  padding: 8px 16px;
  font-size: 14px;
  background: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.action-btn:hover {
  background: #e0e0e0;
}

/* 页脚 */
.footer-info {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #e0e0e0;
  font-size: 12px;
  color: #888;
}

.footer-info a {
  color: #4CAF50;
}

.footer-info p {
  margin: 4px 0;
}

/* 响应式 */
@media (max-width: 600px) {
  .input-wrapper {
    flex-direction: column;
  }

  .search-btn {
    width: 100%;
  }

  .result-row {
    flex-direction: column;
    gap: 8px;
  }

  .result-label {
    width: auto;
  }

  .bit-box {
    width: 20px;
    height: 24px;
    font-size: 10px;
  }
}
</style>
