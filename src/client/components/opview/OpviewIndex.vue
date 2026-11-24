<template>
  <div class="opcode-reference">
    <!-- 搜索和筛选栏 -->
    <div class="toolbar">
      <div class="search-box">
        <input
          v-model="searchQuery"
          class="search-input"
          :placeholder="t('loongarchOpcodesViewQueryInput')"
          @input="onSearchInput"
        />
        <span class="search-count">{{ filteredOpcodes.length }} / {{ opcodes.length }}</span>
      </div>
    </div>

    <div ref="scrollContainer" class="virtual-scroll-container" @scroll="onScroll">
      <div class="virtual-scroll-content" :style="{ height: totalHeight + 'px' }">
        <div
          v-for="item of visibleItems"
          :key="item.op.mnemonic + item.op.codeMask"
          class="opcode-card"
          :class="'opcode-'+item.op.codeMask"
          :style="{ transform: `translateY(${item.offsetY}px)` }"
        >
          <div class="card-header">
            <span class="opcode-hex">{{ toHex(item.op.codeMask) }}</span>
            <span class="opcode-name">{{ item.op.mnemonic }}</span>
            <span class="opcode-format">{{ item.op.format.repr }}</span>
            <span class="opcode-file" :title="item.op.fileName">{{ item.op.fileName }}</span>
          </div>

          <div class="opcode-bits">
            <div
              v-for="(byte, byteIdx) in item.bitVisualizationReversed"
              :key="byteIdx"
              class="byte-row"
            >
              <div
                v-for="(bit, bitIdx) in byte"
                :key="bitIdx"
                class="bit-cell"
                :class="'arg-' + bit.argIndex"
                :title="bit.title"
              >
                {{ bit.value }}
              </div>
            </div>
          </div>
          <div class="card-desc">
           <div class="card-subheader">
             <span
               v-for="tag in item.subsetTags"
               :key="tag.key"
               class="subset-tag"
               :class="'subset-' + tag.key"
             >
               {{ tag.label }}
             </span>
           </div>
           <div class="arg-legend">
             <span
               v-for="(arg, idx) in item.op.format.args"
               :key="idx"
               class="arg-tag"
               :class="'arg-' + idx"

             >
               {{ arg.repr }}
             </span>
           </div>

          </div>

        </div>
      </div>
    </div>
  </div>

</template>
<script>
import {opcodeList, init} from '../../opcodes/Opcodes.ts'
import { useI18n } from "vue-i18n"

// 预计算二进制可视化数据，避免重复计算
const bitVisualizationCache = new WeakMap();

export default {
  setup() {
    const {t} = useI18n()
    return {t}
  },
  data() {
    return {
      opcodes: [],
      moveClassTarget:[],
      moveClass:"",
      searchQuery: '',
      searchDebounceTimer: null,

      // 虚拟滚动相关
      scrollTop: 0,
      containerHeight: 600,
      itemHeight: 116,
      overscan: 5, // 上下多渲染的项数
    }
  },
  computed: {
    // 过滤后的指令列表
    filteredOpcodes() {
      let result = this.opcodes;

      // 搜索筛选
      if (this.searchQuery.trim()) {
        const query = this.searchQuery.toLowerCase();
        result = result.filter(op => {
          return op.mnemonic.toLowerCase().includes(query) ||
                 op.codeMask.toString(16).includes(query) ||
                 op.format.repr.toLowerCase().includes(query);
        });
      }

      return result;
    },

    // 总高度
    totalHeight() {
      return this.filteredOpcodes.length * this.itemHeight;
    },

    // 可视区域起始索引
    startIndex() {
      return Math.max(0, Math.floor(this.scrollTop / this.itemHeight) - this.overscan);
    },

    // 可视区域结束索引
    endIndex() {
      return Math.min(
        this.filteredOpcodes.length,
        Math.ceil((this.scrollTop + this.containerHeight) / this.itemHeight) + this.overscan
      );
    },

    // 可视区域项目
    visibleItems() {
      const items = [];
      for (let i = this.startIndex; i < this.endIndex; i++) {
        const op = this.filteredOpcodes[i];
        if (op) {
          const bitVis = this.getBitVisualization(op);
          items.push({
            op,
            offsetY: i * this.itemHeight,
            bitVisualization: bitVis,
            bitVisualizationReversed: [...bitVis].reverse(),
            subsetTags: this.getSubsetTags(op)
          });
        }
      }
      return items;
    }
  },

  mounted() {
    // 初始化容器高度
    this.updateContainerHeight();
    window.addEventListener('resize', this.updateContainerHeight);

    // 加载指令数据
    init().then(() => {
      // 预处理所有指令
      this.opcodes = opcodeList.map(op => {
        // 预计算二进制可视化
        this.precomputeBitVisualization(op);
        return op;
      });
    });
  },

  beforeUnmount() {
    window.removeEventListener('resize', this.updateContainerHeight);
    clearTimeout(this.searchDebounceTimer);
  },

  methods: {
    toHex(num) {
      return '0x' + (num >>> 0).toString(16).padStart(8, '0');
    },

    onSearchInput() {
      clearTimeout(this.searchDebounceTimer);
      this.searchDebounceTimer = setTimeout(() => {
        // 搜索时滚动到顶部
        this.$refs.scrollContainer.scrollTop = 0;
        this.scrollTop = 0;
      }, 200);
    },

    onScroll(e) {
      this.scrollTop = e.target.scrollTop;
    },

    updateContainerHeight() {
      const container = this.$refs.scrollContainer;
      if (container) {
        this.containerHeight = container.clientHeight;
      }
    },

    // 预计算二进制可视化数据
    precomputeBitVisualization(op) {
      if (bitVisualizationCache.has(op)) return;

      const visualization = [];
      const code = op.codeMask >>> 0;

      // 为每个参数分配颜色索引
      const argMap = new Map();
      op.format.args.forEach((arg, idx) => {
        argMap.set(arg.mask, idx);
      });

      // 按字节处理（小端序显示）
      for (let byteIdx = 0; byteIdx < 4; byteIdx++) {
        const byte = [];
        // 每个字节从高位到低位显示
        for (let bitIdx = 7; bitIdx >= 0; bitIdx--) {
          const bitPos = byteIdx * 8 + bitIdx;
          const bitMask = 1 << bitPos;
          const bitValue = (code & bitMask) ? 1 : 0;

          // 确定这个位属于哪个参数
          let argIndex = -1;
          let title = 'opcode';

          for (const [mask, idx] of argMap) {
            if (mask & bitMask) {
              argIndex = idx;
              title = op.format.args[idx].repr;
              break;
            }
          }

          byte.push({
            value: bitValue,
            argIndex,
            title
          });
        }
        visualization.push(byte);
      }

      bitVisualizationCache.set(op, visualization);
    },

    // 获取二进制可视化数据（使用缓存）
    getBitVisualization(op) {
      if (!bitVisualizationCache.has(op)) {
        this.precomputeBitVisualization(op);
      }
      return bitVisualizationCache.get(op);
    },

    // 获取指令的 Subset 标签
    getSubsetTags(op) {
      const tags = [];
      if (!op.others) return tags;

      const subsetMap = {
        'la32': { label: 'LA32', key: 'la32' },
        'la64': { label: 'LA64', key: 'la64' },
        'primary': { label: 'primary', key: 'primary' },
        'lbt': { label: 'LBT', key: 'lbt' },
        'lsx': { label: 'LSX', key: 'lsx' },
        'lasx': { label: 'LASX', key: 'lasx' },
        'lvz': { label: 'LVZ', key: 'lvz' },
        'qemu': { label: 'QEMU', key: 'qemu' },
      };

      for (const tag of op.others) {
        if (tag.startsWith('@')) {
          const key = tag.substring(1);
          if (subsetMap[key]) {
            tags.push(subsetMap[key]);
          }
        }
      }

      return tags;
    }
  }
}
</script>

<style scoped>
.opcode-reference {
  padding: 16px;
  max-width: 1400px;
  margin: 0 auto;
}

/* 说明区域 */
.info-section {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 12px 16px;
  margin-bottom: 16px;
  font-size: 14px;
}

.info-section p {
  margin: 4px 0;
}

.endian-info {
  margin-top: 8px;
}

.endian-info pre {
  background: #fff;
  padding: 8px;
  border-radius: 4px;
  font-size: 12px;
  overflow-x: auto;
}

/* 工具栏 */
.toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
  margin-bottom: 16px;
  padding: 12px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.search-box {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  min-width: 250px;
}

.search-input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  font-family: inherit;
}

.search-input:focus {
  outline: none;
  border-color: #4CAF50;
}

.search-count {
  font-size: 12px;
  color: #666;
  white-space: nowrap;
}

.filters {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.filter-label {
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  font-size: 14px;
}

.filter-label input[type="radio"] {
  cursor: pointer;
}

/* 虚拟滚动容器 */
.virtual-scroll-container {
  height: calc(100vh - 250px);
  min-height: 400px;
  overflow-y: auto;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: #fafafa;
}

.virtual-scroll-content {
  position: relative;
}

/* 指令卡片 */
.opcode-card {
  position: absolute;
  left: 0;
  right: 0;
  height: 116px;
  padding: 12px 16px;
  background: #fff;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  box-sizing: border-box;
}

.opcode-card:hover {
  background: #f5f5f5;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: 'Consolas', 'Monaco', monospace;
}

.opcode-hex {
  font-size: 13px;
  color: #666;
  min-width: 90px;
}

.opcode-name {
  font-size: 15px;
  font-weight: 600;
  color: #333;
  min-width: 120px;
}

.opcode-format {
  font-size: 13px;
  color: #888;
  flex: 1;
}

.opcode-file {
  font-size: 11px;
  color: #aaa;
  background: #f5f5f5;
  padding: 2px 8px;
  border-radius: 12px;
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.card-subheader {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  align-items: center;
}

.subset-tag {
  font-size: 10px;
  padding: 2px 6px;
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

/* 二进制位可视化 */
.opcode-bits {
  display: flex;
  gap: 8px;
}

.byte-row {
  display: flex;
  gap: 1px;
  background: #e0e0e0;
  padding: 2px;
  border-radius: 4px;
}

.bit-cell {
  width: 18px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-family: 'Consolas', monospace;
  background: #fff;
  border-radius: 2px;
  cursor: help;
  transition: transform 0.1s;
}

.bit-cell:hover {
  transform: scale(1.2);
  z-index: 1;
}

/* 参数颜色 */
.arg--1 { background: #e3f2fd; color: #1976d2; } /* opcode 位 */
.arg-0 { background: #e8f5e9; color: #388e3c; }
.arg-1 { background: #fce4ec; color: #c2185b; }
.arg-2 { background: #fff3e0; color: #f57c00; }
.arg-3 { background: #f3e5f5; color: #7b1fa2; }
.arg-4 { background: #e0f2f1; color: #00796b; }

/* 参数图例 */
.arg-legend {
  display: flex;
  gap: 8px;
  font-size: 12px;
}

.arg-tag {
  padding: 2px 8px;
  border-radius: 12px;
  font-family: 'Consolas', monospace;
}

/* 响应式 */
@media (max-width: 768px) {
  .toolbar {
    flex-direction: column;
    align-items: stretch;
  }

  .search-box {
    min-width: auto;
  }

  .filters {
    justify-content: center;
  }

  .opcode-card {
    height: 160px;
  }

  .bit-cell {
    width: 14px;
    height: 18px;
    font-size: 9px;
  }

  .virtual-scroll-container {
    height: calc(100vh - 300px);
  }
}
.card-desc{
  display: flex;
  justify-content: space-between;
  width: 84%;
}
</style>
