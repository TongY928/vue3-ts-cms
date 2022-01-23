import { computed } from 'vue'
import { Mapper, mapState, createNamespacedHelpers, mapGetters } from 'vuex'
import { useStore } from '@/store'
export function useMapper(mapper: string[], mapFn: Mapper<() => any>) {
  const store = useStore()
  const storeStateFns = mapFn(mapper)

  const storeState: Record<string, any> = {}
  Object.keys(storeStateFns).forEach((fnKey) => {
    const fn = storeStateFns[fnKey].bind({ $store: store })
    storeState[fnKey] = computed(fn)
  })
  return storeState
}

export function useState(moduleName: string, mapper: string[]) {
  let mapperFn = mapState
  if (moduleName.length > 0) {
    mapperFn = createNamespacedHelpers(moduleName).mapState
  }
  return useMapper(mapper, mapperFn)
}

export function useGetters(moduleName: string, mapper: string[]) {
  let mapperFn = mapGetters
  if (moduleName.length > 0) {
    mapperFn = createNamespacedHelpers(moduleName).mapGetters
  }
  return useMapper(mapper, mapperFn)
}
