这个是旧的
```bash
#首次运行
npm config set registry https://registry.npmmirror.com
npm install -g pnpm
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
#tailwindcss
npm install tailwindcss autoprefixer
npm install -D tailwindcss
npm install -D @tailwindcss/postcss
npm install tailwindcss@latest --save-dev
npx tailwindcss init
npm install @vitejs/plugin-vue@latest
#
systemctl status mongodb 
astro preferences disable devToolbar
#后续测试
npx astro dev
```
以下为新
-----

### 项目指南

本项目使用 **pnpm** 作为包管理器，以确保高效的依赖管理和更快的安装速度。

#### 一、首次运行

请按照以下步骤初次设置你的项目环境：

1.  **安装 pnpm**: 如果你尚未安装 pnpm，请使用 npm 进行全局安装。

    ```bash
    npm install -g pnpm
    ```

2.  **安装依赖**: 进入项目根目录，使用 `pnpm` 一次性安装所有必要的依赖。

    ```bash
    pnpm install
    ```

    `pnpm` 会自动处理所有生产和开发依赖，包括 Tailwind CSS、Vue、Astro 等。

-----

#### 二、开发与部署

| 任务 | 命令 |
| :--- | :--- |
| **启动开发服务器** | `pnpm run dev` |
| **构建生产版本** | `pnpm run build` |
| **预览生产版本** | `pnpm run preview` |
| **启动后端服务** | `pnpm run start:backend` |

-----

#### 三、重要配置

* **Tailwind CSS**: 如果需要重新初始化 Tailwind CSS 配置文件，请运行：

  ```bash
  pnpm exec tailwindcss init
  ```

  *通常情况下，此步骤在项目初始化时已完成。*

* **数据库服务**: 确保你的 MongoDB 服务正在运行。

  ```bash
  systemctl status mongodb
  ```

  *此命令是 Linux 系统服务管理命令，请根据你的操作系统进行调整。*

* **Astro 开发工具栏**: 如果你想禁用 Astro 的开发者工具栏：

  ```bash
  pnpm exec astro preferences disable devToolbar
  ```

  或者

  ```bash
  astro preferences disable devToolbar
  ```

-----

#### 四、命令速查表

以下是常用 `npm` 和 `pnpm` 命令的对照，方便你快速查阅：

| npm/npx 命令             | pnpm 命令               | 说明                     |
|:-----------------------|:----------------------|:-----------------------|
| `npm install <pkg>`    | `pnpm add <pkg>`      | 安装单个依赖                 |
| `npm install -D <pkg>` | `pnpm add -D <pkg>`   | 安装单个开发依赖               |
| `npm uninstall <pkg>`  | `pnpm remove <pkg>`   | 卸载依赖                   |
| `npm run <script>`     | `pnpm run <script>`   | 运行 `package.json` 中的脚本 |
| `npx <command>`        | `pnpm exec <command>` | 执行包里的可执行文件             |
| `npm install`          | `pnpm install`        | 安装所有依赖                 |
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
