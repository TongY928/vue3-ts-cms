<template>
  <div class="nav-header">
    <component
      :is="iconEl"
      class="fold-menu"
      @click="handleFoldClick"
    ></component>
    <div class="content">
      <hy-breadcrumb :breadcrumbs="breadcrumbs"></hy-breadcrumb>
      <user-info />
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  DefineComponent,
  defineComponent,
  ref,
  shallowRef
} from 'vue'
import { useGetters } from '@/hook/useVuex'
import { Fold, Expand } from '@element-plus/icons-vue'
import UserInfo from './user-info.vue'
import HyBreadcrumb from '@/components/breadcrumb'
import { useRoute } from 'vue-router'
import { pathMapBreadcrumbs } from '@/utils/map-menus'
export default defineComponent({
  components: {
    Fold,
    Expand,
    UserInfo,
    HyBreadcrumb
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

    const breadcrumbs: any = computed(() => {
      const { menus: userMenu } = useGetters('login', ['menus'])
      const route = useRoute()
      const currentPath = route.path
      return pathMapBreadcrumbs(userMenu.value, currentPath)
    })
    console.log(breadcrumbs)
    return {
      isFold,
      iconEl,
      handleFoldClick,
      breadcrumbs
    }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;
  .fold-menu {
    font-size: 30px;
    cursor: pointer;
    width: 1em;
    height: 1em;
  }
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
  }
}
</style>
