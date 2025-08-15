```bash
#首次运行
npm config set registry https://registry.npmmirror.com
npm cache clean --force
#vue环境与后端数据库等
npm install @astrojs/vue vue --verbose
npm install @astrojs/node  --verbose
npm install @types/node type --verbose
npm install express mongoose --verbose
#totp使用
npm install otplib qrcode crypto-browserify --verbose
#模块等
npm install axios cookie-parser --verbose
#非线性动画/事件总线(联系不同vue用)
npm install gsap mitt --verbose
#
systemctl status mongodb 
astro preferences disable devToolbar
#后续测试
npx astro dev
```

```plaintext
.
├── adminReadme.md
├── astro.config.mjs
├── old.astro.config.mjs
├── package.json
├── package-lock.json
├── private
│   ├── super-admin.key
│   └── totp-secrets.json
├── src
│   ├── components
│   │   ├── adminAndAuth
│   │   │   ├── LoginWithPasswordIsland.vue
│   │   │   ├── LoginWithQrcodeIsland.vue
│   │   │   ├── RegisterForTOTPIsland.vue
│   │   │   └── RegisterForUidUndPwdIsland.vue
│   │   └── ThemeToggleIsland.vue
│   ├── data
│   │   ├── comments.json
│   │   └── posts.json
│   ├── layouts
│   │   ├── BaseLayout.astro
│   │   └── IsDarkOrNotLayout.astro
│   ├── pages
│   │   ├── about.astro
│   │   ├── admin
│   │   │   ├── login.astro
│   │   │   └── register.astro
│   │   ├── api
│   │   │   ├── totp
│   │   │   │   ├── adminAuthorize.js
│   │   │   │   ├── adminVerify.js
│   │   │   │   └── generate.js
│   │   │   └── uidUndPwd
│   │   ├── auth
│   │   │   ├── login.astro
│   │   │   └── register.astro
│   │   └── index.astro
│   ├── styles
│   │   ├── adminAndAuth
│   │   │   ├── adminAndAuthGlobal.css
│   │   │   ├── login.css
│   │   │   ├── loginIsland.css
│   │   │   ├── register.css
│   │   │   └── registerIsland.css
│   │   └── global.css
│   └── utils
│       └── theme-init.js
└── tsconfig.json
```
