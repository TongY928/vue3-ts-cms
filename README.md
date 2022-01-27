# 简介

该项目是一个 `vue3 + ts + element-plus` 练手项目，从 0 搭建出一个后台管理模板，最基本的功能已写好，并且封装了一些在后台管理中常用的组件。
使用 mockjs 模拟了最基本的登录和动态加载菜单数据。

# 脚本

配置了 npm run prettier 来格式化代码
配置了 npm run commit 来规范提交操作
配置了 npm run prepare 来通过 husky 来注入一些 git 钩子

# 关于 vuex

个人认为 vuex4 没有跟上 vue3 的脚步，在尤其是一些 mapper 方法极其难以使用，为此封装了一个 useVuex，来使用常见的 mapper 需求。而且 vuex4 的类型支持不好，在 vue3 + ts 项目中体验不好。后面学习过 Pinia 考虑迁入。

# 最后

该项目仅为个人练手项目，适合初学 vue3 的小伙伴，可以参考做一次练习。
