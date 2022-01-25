import Mock from 'mockjs'
import { resultError, resultSuccess, getUrlParams } from '../util'

const analysisRoute = {
  id: 1,
  name: '系统总览',
  type: 1,
  path: '/main/analysis',
  children: [
    {
      id: 2,
      name: '关于项目',
      type: 2,
      path: '/main/analysis/dashboard'
    },
    {
      id: 3,
      name: '关于系统',
      type: 2,
      path: '/main/analysis/overview'
    }
  ]
}
const product = {
  id: 4,
  name: '商品中心',
  type: 1,
  path: '/main/product',
  children: [
    {
      id: 5,
      name: '商品分类',
      type: 2,
      path: '/main/product/category'
    },
    {
      id: 6,
      name: '商品列表',
      type: 2,
      path: '/main/product/goods'
    }
  ]
}
const story = {
  id: 7,
  name: '聊聊',
  type: 1,
  path: '/main/story',
  children: [
    {
      id: 8,
      name: '聊天室',
      type: 2,
      path: '/main/story/chat'
    },
    {
      id: 9,
      name: '列表',
      type: 2,
      path: '/main/story/list'
    }
  ]
}
const system = {
  id: 10,
  name: '系统管理',
  type: 1,
  path: '/main/system',
  children: [
    {
      id: 11,
      name: '部门管理',
      type: 2,
      path: '/main/system/department'
    },
    {
      id: 12,
      name: '用户管理',
      type: 2,
      path: '/main/system/user'
    },
    {
      id: 13,
      name: '权限管理',
      type: 2,
      path: '/main/system/role'
    },
    {
      id: 14,
      name: '菜单管理',
      type: 2,
      path: '/main/system/menu'
    }
  ]
}
function createUserMenu(id: number) {
  if (id === 1) {
    return [analysisRoute, system, product, story]
  } else {
    return [analysisRoute, product, story]
  }
}
function createUserList() {
  return [
    {
      id: 1,
      name: '阿弥',
      phoneNumber: '123456',
      username: 'root',
      password: 'root',
      token: 'fakeToken1',
      role: {
        roleId: 1,
        roleName: '超级管理员'
      }
    },
    {
      id: 2,
      name: '123456',
      phoneNumber: '3456',
      username: '123456',
      password: '123456',
      token: '123456Token',
      role: {
        roleId: 2,
        roleName: '普通用户'
      }
    }
  ]
}

Mock.mock('/api/login', 'post', function ({ body }) {
  const { username, password } = JSON.parse(body)
  const checkUser = createUserList().find(
    (item) => item.username == username && item.password == password
  )
  if (!checkUser) {
    return resultError('错误的账号或密码')
  }
  const { id, token, role } = checkUser
  return resultSuccess({
    id,
    token,
    role
  })
})
const infoURL = '/api/getUserInfo'
Mock.mock(RegExp(infoURL + '.*'), 'get', function ({ url }) {
  const params = getUrlParams(url)
  const checkUser = createUserList().find((item) => item.id == params.id)
  const { id, name, role, phoneNumber } = checkUser
  return resultSuccess({
    id,
    name,
    role,
    phoneNumber
  })
})
const menuURL = '/api/getUserMenus'
Mock.mock(RegExp(menuURL + '.*'), 'get', function ({ url }) {
  const params = getUrlParams(url)
  const menuList = createUserMenu(params.id)
  return resultSuccess(menuList)
})
