import Mock from 'mockjs'
import {
  resultError,
  resultSuccess,
  getRequestToken,
  requestParams
} from '../util'
function createUserList() {
  return [
    {
      id: '1',
      name: '阿弥',
      username: 'root',
      password: 'root',
      token: 'fakeToken1',
      roles: [
        {
          roleId: '1',
          roleName: '超级管理员'
        }
      ]
    },
    {
      id: '2',
      name: '123456',
      username: '123456',
      password: '123456',
      token: '123456Token',
      roles: [
        {
          roleId: '2',
          roleName: '普通用户'
        }
      ]
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
  const { id, token } = checkUser
  return resultSuccess({
    id,
    token
  })
})
Mock.mock('/api/getUserInfo', 'get', function (cc: requestParams) {
  const token = getRequestToken(cc)
  console.log(token)
})
