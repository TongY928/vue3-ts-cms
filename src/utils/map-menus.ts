import { RouteRecordRaw } from 'vue-router'
import router from '@/router/index'
type Route = RouteRecordRaw | undefined
import { Menu } from '@/service/login/types'
import { IBreadcrumb } from '@/components/breadcrumb/types'
export function registerMenus(userMenus: Menu[]) {
  const routes = mapMenusToRoutes(userMenus)
  routes.forEach((route) => {
    router.addRoute('main', route)
  })
}

export function mapMenusToRoutes(userMenus: Menu[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  const allRoutes: RouteRecordRaw[] = []
  // 目标文件夹，递归遍历，匹配文件名称
  const routeFiles = require.context('../router/main', true, /\.ts/)
  routeFiles.keys().forEach((key) => {
    const route = require('../router/main' + key.split('.')[1])
    allRoutes.push(route.default)
  })

  const recurseGetRoute = (menus: Menu[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route: Route = allRoutes.find((m) => m.path === menu.path)
        if (route) {
          routes.push(route)
        }
      } else {
        recurseGetRoute(menu.children)
      }
    }
  }
  recurseGetRoute(userMenus)
  return routes
}

export function pathMapToMenu(
  userMenus: any[],
  currentPath: string,
  breadcrumbs?: IBreadcrumb[]
): any {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
      if (findMenu) {
        breadcrumbs?.push({ name: menu.name, path: menu.path })
        breadcrumbs?.push({ name: findMenu.name, path: findMenu.path })
        return findMenu
      }
    } else if (menu.type === 2 && menu.path === currentPath) {
      return menu
    }
  }
  return {
    id: -1
  }
}
export function pathMapBreadcrumbs(userMenus: any[], currentPath: string) {
  const breadcrumbs: IBreadcrumb[] = []
  pathMapToMenu(userMenus, currentPath, breadcrumbs)
  return breadcrumbs
}
