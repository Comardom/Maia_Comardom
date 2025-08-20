```bash
#首次运行
npm config set registry https://registry.npmmirror.com
npm cache clean --force
#vue环境与后端数据库等
npm install @astrojs/vue vue --verbose
npm install @astrojs/node node --verbose
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
├── astro.config.mjs
├── backend
│   ├── db.js
│   └── models
│       └── User.js
├── package.json
├── package-lock.json
├── private
│   ├── super-admin.key
│   └── totp-secrets.json
├── public
│   ├── ai480.svg
│   ├── alpha.0.vector.stroke.svg
│   └──displayStudio
│   │   ── compressed
│   │   │   ├── 241106-dark.webp
│   │   │   └── 250420-light.webp
│   ├── id480.svg
│   ├── lr480.svg
│   ├── path1.png
│   ├── photo.py
│   ├── plastic-black-trans-wswd.svg
│   ├── plastic-blue-trans-wswd.svg
│   ├── plastic-white-trans-wswd.svg
│   └── ps480.svg
├── readme.md
├── src
│   ├── components
│   │   ├── adminAndAuth
│   │   │   ├── LoginWithPasswordIsland.vue
│   │   │   ├── LoginWithQrcodeIsland.vue
│   │   │   ├── RegisterForTOTPIsland.vue
│   │   │   └── RegisterForUidUndPwdIsland.vue
│   │   ├── display
│   │   │   ├── InteractiveInitializer.astro
│   │   │   └── studioContents
│   │   │       ├── Demo.vue
│   │   │       ├── DeviceDetector.vue
│   │   │       ├── DisplayStudioBreathBarHeader.vue
│   │   │       ├── DisplayStudioBreathHeader.vue
│   │   │       ├── DisplayStudioBreathLightHeader.vue
│   │   │       ├── fullScreenPhotoMap.ts
│   │   │       ├── FullScreenPhoto.vue
│   │   │       ├── snapObserver.ts
│   │   │       ├── SnapObserver.vue
│   │   │       └── useBreathingMode.ts
│   │   ├── PageAnimator.vue
│   │   ├── PlasticThemeToggleIsland.vue
│   │   ├── SideNav.vue
│   │   └── ThemeToggleIsland.vue
│   ├── data
│   │   ├── comments.json
│   │   └── posts.json
│   ├── layouts
│   │   ├── bar
│   │   │   ├── MainFooter.astro
│   │   │   └── MainHeader.vue
│   │   ├── BaseLayout.astro
│   │   ├── DarkOrNotWithHorizontalScrollLayout.astro
│   │   ├── IsDarkOrNotLayout.astro
│   │   └── IsDarkOrNotWithVerticalScrollLayout.astro
│   ├── pages
│   │   ├── about.astro
│   │   ├── admin
│   │   │   ├── login.astro
│   │   │   ├── management.astro
│   │   │   └── register.astro
│   │   ├── api
│   │   │   ├── totp
│   │   │   │   ├── adminAuthorize.js
│   │   │   │   ├── adminVerify.js
│   │   │   │   └── generate.js
│   │   │   └── uidUndPwd
│   │   │       ├── login.js
│   │   │       └── register.js
│   │   ├── auth
│   │   │   ├── login.astro
│   │   │   └── register.astro
│   │   ├── display
│   │   │   ├── main.astro
│   │   │   ├── mainIslands
│   │   │   │   ├── DesignDepartmentIsland.astro
│   │   │   │   ├── NewMediaCentreIsland.astro
│   │   │   │   └── Studio.astro
│   │   │   └── studio.astro
│   │   ├── index.astro
│   │   └── search.astro
│   ├── styles
│   │   ├── adminAndAuth
│   │   │   ├── adminPanelUniversalBackground.css
│   │   │   ├── login.css
│   │   │   ├── loginIsland.css
│   │   │   ├── management.css
│   │   │   ├── register.css
│   │   │   └── registerIsland.css
│   │   ├── display
│   │   │   ├── newMediaIsland.css
│   │   │   ├── studio.css
│   │   │   └── withDisplayStudioHeader.css
│   │   ├── global.css
│   │   └── horizontalScroll.css
│   └── utils
│       ├── adminCheckIfLogin.js
│       ├── detectDevice.ts
│       ├── eventBus.ts
│       ├── horizontalScroll.js
│       ├── logoMap.ts
│       ├── password.js
│       ├── theme-init.js
│       └── useThemeObserver.ts
└── tsconfig.json

```
