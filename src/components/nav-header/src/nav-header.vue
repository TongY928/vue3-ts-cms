<template>
  <div class="nav-header">
    <component
      :is="iconEl"
      class="fold-menu"
      @click="handleFoldClick"
    ></component>
    <i
      class="fold-menu"
      :class="isFold ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
      @click="handleFoldClick"
    ></i>
  </div>
</template>

<script lang="ts">
import { Fold, Expand } from '@element-plus/icons-vue'
import { DefineComponent, defineComponent, ref, shallowRef } from 'vue'

export default defineComponent({
  components: {
    Fold,
    Expand
  },
  emits: ['foldChange'],
  setup(props, { emit }) {
    const isFold = ref(false)
    const iconEl = shallowRef<DefineComponent<{}, {}, any>>(Fold)
    const handleFoldClick = () => {
      if (iconEl.value.name == 'Fold') {
        iconEl.value = Expand
      } else {
        iconEl.value = Fold
      }
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }

    return {
      isFold,
      iconEl,
      handleFoldClick
    }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  .fold-menu {
    font-size: 30px;
    cursor: pointer;
    width: 1em;
    height: 1em;
  }
}
</style>
