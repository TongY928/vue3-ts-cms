import type { DefineComponent } from 'vue'
export const usePageSearch = (contentRef: DefineComponent<{}, {}, any>) => {
  const handleQueryClick = (queryInfo: any) => {
    contentRef.value?.getPageData(queryInfo)
  }
  const handleResetClick = () => {
    contentRef.value?.getPageData()
  }

  return [handleQueryClick, handleResetClick]
}
