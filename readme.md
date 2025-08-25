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
    ~/WebstormProjects/Maia    master ?1  tree -L 5 -I 'node_modules'                                                                                                                                                    ✔ 
.
├── astro.config.mjs
├── backend
│   ├── db.js
│   └── models
│       └── User.js
├── dist
│   ├── client
│   │   ├── ai480.svg
│   │   ├── alpha.0.vector.stroke.svg
│   │   ├── _astro
│   │   │   ├── about.C2CyhA_m.css
│   │   │   ├── client.BpDjmh7x.js
│   │   │   ├── DeviceDetector.xYUhRA8G.js
│   │   │   ├── DispalyStudioFooter.CmGcql_A.js
│   │   │   ├── DispalyStudioFooterInEnglish.CBQJ3odT.js
│   │   │   ├── DispalyStudioFooterInZHTW.B6506_m5.js
│   │   │   ├── DisplayStudioBreathHeader.BGx8LWkP.js
│   │   │   ├── DisplayStudioBreathHeaderInEnglish.DpItZoWw.js
│   │   │   ├── DisplayStudioBreathHeaderInZHTW.BAd_Pf7P.js
│   │   │   ├── DisplayStudioDepartmentsIntro.B6YyF-Fs.js
│   │   │   ├── DisplayStudioDepartmentsIntroInEnglish.El-tNC-U.js
│   │   │   ├── DisplayStudioDepartmentsIntroInZHTW.CLGbeHJO.js
│   │   │   ├── DisplayStudioTimeline.BI6PAgDz.js
│   │   │   ├── DisplayStudioTimelineInEnglish.CSuINPiZ.js
│   │   │   ├── DisplayStudioTimelineInZHTW.DZkimEAZ.js
│   │   │   ├── eventBus.G3ZlhegR.js
│   │   │   ├── FullScreenPhoto.BvNxGqfi.js
│   │   │   ├── FullScreenPhotoInEnglish.CmS_NT0k.js
│   │   │   ├── FullScreenPhotoInZHTW.BcIox7jv.js
│   │   │   ├── fullScreenPhotoMap.DRcBCWCs.js
│   │   │   ├── index.DKtf60Sy.js
│   │   │   ├── login.B17RB_vF.css
│   │   │   ├── login.CctxAlrR.css
│   │   │   ├── login.CSxf_ANb.css
│   │   │   ├── LoginWithPasswordIsland.DNIM2aPl.js
│   │   │   ├── LoginWithQrcodeIsland.gFTLrGMk.js
│   │   │   ├── main.Dltamtgu.css
│   │   │   ├── main.DsfmxbWz.css
│   │   │   ├── main.Dt-caurR.png
│   │   │   ├── MainHeader.BwBR0eIQ.js
│   │   │   ├── officeApp.Z0eQOEzQ.js
│   │   │   ├── office.tn0RQdqM.css
│   │   │   ├── PageAnimator.BAgPqZyP.js
│   │   │   ├── password.BXPSOJw6.js
│   │   │   ├── PlasticThemeToggleIsland.CINpW97K.js
│   │   │   ├── _plugin-vue_export-helper.DlAUqK2U.js
│   │   │   ├── register.CC5blvqR.css
│   │   │   ├── register.Cn5FE87D.css
│   │   │   ├── RegisterForTOTPIsland.Dz4W9761.js
│   │   │   ├── RegisterForUidUndPwdIsland.BESipvV5.js
│   │   │   ├── repair.CHCCmCWe.css
│   │   │   ├── runtime-core.esm-bundler.C8-5otuY.js
│   │   │   ├── runtime-dom.esm-bundler.Z9t0CkHO.js
│   │   │   ├── SnapObserver.CPg1LJjn.js
│   │   │   ├── studio.B_-BRP2u.css
│   │   │   ├── studio.CdlSiv5r.css
│   │   │   ├── studio.CjTcmTLC.css
│   │   │   ├── studio.CWKdeAJR.css
│   │   │   ├── studio.D9ZOyAIC.css
│   │   │   ├── studioInEnglish.BtGoB-ic.css
│   │   │   ├── studioInEnglish.DVZvqRzx.css
│   │   │   ├── studioInZHTW.cmqp9A_h.css
│   │   │   ├── studioInZHTW.Cw8u8uDC.css
│   │   │   ├── ThemeToggleIsland.BjSbEK4_.js
│   │   │   ├── TimelineVertical.Cl-nPdYB.js
│   │   │   ├── umbrellaAssetMap.BAcculVc.js
│   │   │   ├── useFloatingBlocks.CYvHLhuX.js
│   │   │   ├── useMediaQuery.cm77PDyN.js
│   │   │   ├── useThemeObserver.CWJfd_Cw.js
│   │   │   └── video.C-AaLTaD.css
│   │   ├── displayOffice
│   │   │   ├── banner.jpg
│   │   │   ├── bg3.jpg
│   │   │   ├── bg4.jpg
│   │   │   ├── bg.jpg
│   │   │   ├── footer.jpg
│   │   │   ├── logo.svg
│   │   │   └── number.jpg
│   │   ├── displayRepair
│   │   │   ├── logo.svg
│   │   │   ├── main.png
│   │   │   ├── qq-group-qr.jpg
│   │   │   └── services
│   │   │       ├── fault-diagnosis.jpeg
│   │   │       ├── hardware-repair.jpeg
│   │   │       ├── performance-optimization.png
│   │   │       ├── skill-training.png
│   │   │       ├── system-reinstall.jpeg
│   │   │       └── virus-cleanup.png
│   │   ├── displayStudio
│   │   │   ├── compressed
│   │   │   │   ├── 241106-dark.webp
│   │   │   │   └── 250420-light.webp
│   │   │   └── umbrella
│   │   │       ├── closed-black-umbrella.svg
│   │   │       ├── closed-white-umbrella.svg
│   │   │       ├── open-black-umbrella.svg
│   │   │       └── open-white-umbrella.svg
│   │   ├── Henan_University_logo.png
│   │   ├── id480.svg
│   │   ├── lr480.svg
│   │   ├── medal.webp
│   │   ├── multiply.svg
│   │   ├── photo.py
│   │   ├── plastic-black-trans-wswd.svg
│   │   ├── plastic-blue-trans-wswd.svg
│   │   ├── plastic-white-trans-wswd.svg
│   │   ├── ps480.svg
│   │   └── subset_font.woff2
│   └── server
│       ├── _@astrojs-ssr-adapter.mjs
│       ├── chunks
│       │   ├── astro
│       │   │   └── server_D674c40x.mjs
│       │   ├── astro-designed-error-pages_DEU1uT92.mjs
│       │   ├── _@astrojs-ssr-adapter_C_ZYu14p.mjs
│       │   ├── DesignDepartmentIsland_CBhNga4G.mjs
│       │   ├── fs-lite_COtHaKzy.mjs
│       │   ├── IsDarkOrNotLayout_Cgez3aTD.mjs
│       │   ├── logoMap_CZ0KtLqS.mjs
│       │   ├── management.8647311b_l0sNRNKZ.mjs
│       │   ├── node_CHtUtOBJ.mjs
│       │   ├── PageAnimator_AibTLNE7.mjs
│       │   ├── password_CYJ0Z0IM.mjs
│       │   ├── path_hV-dQId8.mjs
│       │   ├── PlasticThemeToggleIsland_CRpscixs.mjs
│       │   ├── _plugin-vue_export-helper_pcqpp-6-.mjs
│       │   ├── sharp_DO4Oomsf.mjs
│       │   └── User_CB5toi1y.mjs
│       ├── entry.mjs
│       ├── manifest_DXWaH09M.mjs
│       ├── _noop-actions.mjs
│       ├── _noop-middleware.mjs
│       ├── pages
│       │   ├── about.astro.mjs
│       │   ├── admin
│       │   │   ├── login.astro.mjs
│       │   │   ├── management.astro.mjs
│       │   │   └── register.astro.mjs
│       │   ├── api
│       │   │   ├── totp
│       │   │   └── uidundpwd
│       │   ├── auth
│       │   │   ├── login.astro.mjs
│       │   │   └── register.astro.mjs
│       │   ├── display
│       │   │   ├── main.astro.mjs
│       │   │   ├── mainislands
│       │   │   ├── newmedia.astro.mjs
│       │   │   ├── office.astro.mjs
│       │   │   ├── repair.astro.mjs
│       │   │   ├── studio.astro.mjs
│       │   │   ├── studioinenglish.astro.mjs
│       │   │   ├── studioinzhtw.astro.mjs
│       │   │   ├── video.astro.mjs
│       │   │   └── web.astro.mjs
│       │   ├── _image.astro.mjs
│       │   ├── index.astro.mjs
│       │   ├── nihilum.astro.mjs
│       │   └── search.astro.mjs
│       └── renderers.mjs
├── env.d.ts
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── postcss.config.cjs
├── private
│   ├── super-admin.key
│   └── totp-secrets.json
├── public
│   ├── ai480.svg
│   ├── alpha.0.vector.stroke.svg
│   ├── displayOffice
│   │   ├── banner.jpg
│   │   ├── bg3.jpg
│   │   ├── bg4.jpg
│   │   ├── bg.jpg
│   │   ├── footer.jpg
│   │   ├── logo.svg
│   │   └── number.jpg
│   ├── displayRepair
│   │   ├── logo.svg
│   │   ├── main.png
│   │   ├── qq-group-qr.jpg
│   │   └── services
│   │       ├── fault-diagnosis.jpeg
│   │       ├── hardware-repair.jpeg
│   │       ├── performance-optimization.png
│   │       ├── skill-training.png
│   │       ├── system-reinstall.jpeg
│   │       └── virus-cleanup.png
│   ├── displayStudio
│   │   ├── compressed
│   │   │   ├── 241106-dark.webp
│   │   │   └── 250420-light.webp
│   │   └── umbrella
│   │       ├── closed-black-umbrella.svg
│   │       ├── closed-white-umbrella.svg
│   │       ├── open-black-umbrella.svg
│   │       └── open-white-umbrella.svg
│   ├── Henan_University_logo.png
│   ├── id480.svg
│   ├── lr480.svg
│   ├── medal.webp
│   ├── multiply.svg
│   ├── photo.py
│   ├── plastic-black-trans-wswd.svg
│   ├── plastic-blue-trans-wswd.svg
│   ├── plastic-white-trans-wswd.svg
│   ├── ps480.svg
│   └── subset_font.woff2
├── readme.md
├── src
│   ├── components
│   │   ├── adminAndAuth
│   │   │   ├── LoginWithPasswordIsland.vue
│   │   │   ├── LoginWithQrcodeIsland.vue
│   │   │   ├── RegisterForTOTPIsland.vue
│   │   │   └── RegisterForUidUndPwdIsland.vue
│   │   ├── display
│   │   │   ├── newMediaContents
│   │   │   │   └── scripts
│   │   │   ├── officeContents
│   │   │   │   ├── BaseButton.vue
│   │   │   │   ├── BaseCard.vue
│   │   │   │   ├── JoinModal.vue
│   │   │   │   ├── officeApp.vue
│   │   │   │   ├── scripts
│   │   │   │   └── ThemeToggle.vue
│   │   │   ├── repairContents
│   │   │   │   └── scripts
│   │   │   └── studioContents
│   │   │       ├── BlankPage.vue
│   │   │       ├── DeviceDetector.vue
│   │   │       ├── DispalyStudioFooterInEnglish.vue
│   │   │       ├── DispalyStudioFooterInZHTW.vue
│   │   │       ├── DispalyStudioFooter.vue
│   │   │       ├── DisplayStudioBreathBarHeader.vue
│   │   │       ├── DisplayStudioBreathHeaderInEnglish.vue
│   │   │       ├── DisplayStudioBreathHeaderInZHTW.vue
│   │   │       ├── DisplayStudioBreathHeader.vue
│   │   │       ├── DisplayStudioBreathLightHeader.vue
│   │   │       ├── DisplayStudioDepartmentsIntroInEnglish.vue
│   │   │       ├── DisplayStudioDepartmentsIntroInZHTW.vue
│   │   │       ├── DisplayStudioDepartmentsIntro.vue
│   │   │       ├── DisplayStudioTimelineInEnglish.vue
│   │   │       ├── DisplayStudioTimelineInZHTW.vue
│   │   │       ├── DisplayStudioTimeline.vue
│   │   │       ├── FullScreenPhotoInEnglish.vue
│   │   │       ├── FullScreenPhotoInZHTW.vue
│   │   │       ├── FullScreenPhoto.vue
│   │   │       ├── scripts
│   │   │       ├── SideNav.vue
│   │   │       ├── SnapObserver.vue
│   │   │       ├── TimelineSnake.vue
│   │   │       ├── TimelineVertical.vue
│   │   │       ├── UmbrellaMenuInEnglish.vue
│   │   │       ├── UmbrellaMenuInZHTW.vue
│   │   │       └── UmbrellaMenu.vue
│   │   ├── PageAnimator.vue
│   │   ├── PlasticThemeToggleIslandInEnglish.vue
│   │   ├── PlasticThemeToggleIslandInZHTW.vue
│   │   ├── PlasticThemeToggleIsland.vue
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
│   │   ├── display
│   │   │   └── displayOfficeLayout.astro
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
│   │   │   │   └── DesignDepartmentIsland.astro
│   │   │   ├── newMedia.html
│   │   │   ├── office.astro
│   │   │   ├── repair.astro
│   │   │   ├── studio.astro
│   │   │   ├── studioInEnglish.astro
│   │   │   ├── studioInZHTW.astro
│   │   │   ├── video.astro
│   │   │   └── web.html
│   │   ├── index.astro
│   │   ├── nihilum.astro
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
│   │   │   ├── newMedia.css
│   │   │   ├── office.css
│   │   │   ├── repairComponents.css
│   │   │   ├── repairMain.css
│   │   │   ├── repairTheme.css
│   │   │   ├── studio.css
│   │   │   ├── videoVerticalScroll.css
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
│       ├── useMediaQuery.ts
│       └── useThemeObserver.ts
├── tailwind.config.cjs
├── tsconfig.json
├── venv
│   ├── 1.txt
│   ├── bin
│   │   ├── activate
│   │   ├── activate.csh
│   │   ├── activate.fish
│   │   ├── Activate.ps1
│   │   ├── fonttools
│   │   ├── pip
│   │   ├── pip3
│   │   ├── pip3.13
│   │   ├── pyftmerge
│   │   ├── pyftsubset
│   │   ├── python -> /usr/bin/python
│   │   ├── python3 -> python
│   │   ├── python3.13 -> python
│   │   └── ttx
│   ├── include
│   │   └── python3.13
│   ├── lib
│   │   └── python3.13
│   │       └── site-packages
│   │           ├── Brotli-1.1.0.dist-info
│   │           ├── _brotli.cpython-313-x86_64-linux-gnu.so
│   │           ├── brotli.py
│   │           ├── fontTools
│   │           ├── fonttools-4.59.1.dist-info
│   │           ├── pip
│   │           ├── pip-25.1.1.dist-info
│   │           └── __pycache__
│   ├── lib64 -> lib
│   ├── pyvenv.cfg
│   ├── share
│   │   └── man
│   │       └── man1
│   │           └── ttx.1
│   ├── taiwan.ttf
│   └── ⁄.txt
└── vite-env.d.ts

```
