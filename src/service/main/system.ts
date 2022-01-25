import hyRequest from '@/utils/axios'

import { DataType } from '../login/types'

export function getPageListData(url: string, queryInfo: any) {
  return hyRequest.post<DataType>({
    url: url,
    data: queryInfo
  })
}
