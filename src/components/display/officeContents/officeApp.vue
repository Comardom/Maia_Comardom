<template>
  <div id="app">
    <header
      class="fixed top-0 left-0 right-0 z-50 bg-primary text-white dark:bg-gray-800 dark:text-gray-100">
      <!-- 滚动进度条 -->
      <div 
        class="absolute bottom-0 left-0 h-0.5 transition-all duration-300 ease-out progress-gradient"
      ></div>
      
      <nav class="mx-auto max-w-7xl px-4 md:px-6 transition-all duration-500" :class="scrolled ? 'py-2' : 'py-4'">
        <div class="flex items-center justify-between">
          <!-- Logo with icon -->
          <div class="group cursor-pointer flex items-center space-x-3" @click="scrollToSection('home')">
            <img src="/displayOffice/logo.svg" alt="Logo" class="h-8 w-auto transition-transform duration-300 group-hover:scale-110" />
            <div class="transition-all duration-300">
              <div 
                class="text-lg font-bold tracking-tight text-white dark:text-gray-100 drop-shadow-lg"
              >
                河南大学网站工作室
              </div>
              <div 
                class="text-xs font-medium tracking-wider opacity-90 text-white/90 dark:text-gray-300"
              >
                OFFICE DEPARTMENT
              </div>
            </div>
          </div>

          <!-- Desktop Navigation with enhanced design -->
          <div class="hidden md:flex items-center space-x-1 desktop-nav">
            <a
              v-for="item in sections"
              :key="item.id"
              class="nav-link-enhanced relative px-4 py-2.5 text-sm font-medium transition-all duration-300 rounded-xl group"
              :class="[
                activeId === item.id 
                  ? 'text-white bg-white/15 backdrop-blur-sm shadow-lg shadow-white/10 dark:text-gray-100 dark:bg-gray-700/30'
                  : 'text-white/90 hover:text-white hover:bg-white/10 dark:text-gray-300 dark:hover:text-gray-100 dark:hover:bg-gray-700/20',
                'hover:scale-105 hover:-translate-y-0.5'
              ]"
              :href="item.href"
            >
              {{ item.label }}
              <!-- 底部指示器 -->
              <div 
                class="absolute bottom-0 left-1/2 w-0 h-0.5 transition-all duration-300 group-hover:w-3/4 transform -translate-x-1/2"
                :class="activeId === item.id ? 'gradient-primary' : 'gradient-primary-reverse'"
              ></div>
            </a>
            
            <!-- Theme Toggle -->
            <ThemeToggle class="ml-4" />
            
            <!-- Enhanced CTA Button -->
            <button 
              @click="showJoinModal = true"
              class="ml-4 px-6 py-2.5 text-sm font-semibold text-white dark:text-gray-100 relative overflow-hidden group rounded-xl transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 hover:shadow-2xl btn-primary-gradient dark:bg-gray-700"
            >
              <span class="relative z-10">加入我们</span>
              <!-- 悬停光效 -->
              <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>
          </div>

          <!-- Enhanced Mobile Menu Button -->
          <button
            @click="toggleMobileMenu"
            class="md:hidden p-3 transition-all duration-300 rounded-xl hover:scale-110 hover:bg-white/10 text-white"
            
          >
            <div class="w-6 h-6 flex flex-col justify-center space-y-1.5">
              <span
                class="block w-full h-0.5 rounded-full transition-all duration-500"
                :class="[
                  'bg-white',
                  { 'rotate-45 translate-y-2': isMobileMenuOpen }
                ]"
              ></span>
              <span
                class="block w-full h-0.5 rounded-full transition-all duration-300"
                :class="[
                  'bg-white',
                  { 'opacity-0': isMobileMenuOpen }
                ]"
              ></span>
              <span
                class="block w-full h-0.5 rounded-full transition-all duration-500"
                :class="[
                  'bg-white',
                  { '-rotate-45 -translate-y-2': isMobileMenuOpen }
                ]"
              ></span>
            </div>
          </button>
        </div>
      </nav>

      <!-- Mobile Navigation Menu -->
      <div class="mobile-menu md:hidden" :class="{ active: isMobileMenuOpen }">
        <div class="px-4 py-4 bg-white/95 backdrop-blur-md border-t border-gray-100 dark:bg-gray-800/95 dark:border-gray-700">
          <ul class="space-y-1">
            <li v-for="item in sections" :key="item.id" class="mobile-menu-item">
              <a
                class="block py-3 px-4 text-gray-700 hover:text-primary hover:bg-primary-soft transition-all duration-200 rounded-lg font-medium dark:text-gray-200 dark:hover:text-primary dark:hover:bg-gray-700"
                :class="activeId === item.id ? 'text-primary bg-primary-soft dark:text-primary dark:bg-gray-700' : ''"
                :href="item.href"
              >
                {{ item.label }}
              </a>
            </li>
            <li class="mobile-menu-item">
              <div class="py-3 px-4">
                <ThemeToggle />
              </div>
            </li>
            <li class="mobile-menu-item pt-2">
              <button 
                @click="showJoinModal = true"
                class="w-full py-3 px-4 text-sm font-medium text-white dark:text-gray-100 rounded-lg transition-all duration-200 bg-primary dark:bg-gray-700"
              >
                加入我们
              </button>
            </li>
          </ul>
        </div>
      </div>
   

    </header>
      <!-- 加入我们二维码弹窗（组件化） -->
      <JoinModal v-if="showJoinModal" @close="showJoinModal = false" />

    <!-- 主视觉区域 -->
    <main id="home" class="pt-16">
      <section class="min-h-[90vh] w-full text-white flex items-center relative overflow-hidden">
        <!-- 背景图片层 -->
        <div class="absolute inset-0 bg-hero">
          <!-- 深色渐变遮罩 -->
          <div class="absolute inset-0 overlay-hero"></div>
        </div>
        
        <div class="relative z-10 mx-auto max-w-7xl px-4 md:px-6 py-20">
          <div class="relative">
            <!-- 背景细线网格 -->
            <div class="absolute inset-0 -z-10 pointer-events-none" aria-hidden>
              <div class="grid grid-cols-12 h-full opacity-[0.15]">
                <div v-for="n in 12" :key="n" class="border-l border-white"></div>
              </div>
            </div>

            <div class="text-sm md:text-base text-gray-100 space-y-1 mb-6">
              <div>Henan University Website Studio</div>
              <div>河南大学网站工作室</div>
            </div>
            <h1
              class="leading-[0.9] font-extrabold tracking-tight text-white display-title"
            >
              <span class="block">办公室</span>
              <span id="office-department" class="block">Office Department</span>
            </h1>
          </div>
        </div>
      </section>

      <!-- 介绍 -->
      <section id="about" class="relative py-24 overflow-hidden">
        <!-- 背景图片层 -->
        <div class="absolute inset-0 bg-about">
          <!-- 蓝色渐变遮罩 -->
          <div class="absolute inset-0 overlay-about"></div>
        </div>
        
        <!-- 内容层 -->
        <div class="relative z-10 mx-auto max-w-7xl px-4 md:px-6">
          <div class="text-center mb-16">
            <h2 class="text-3xl font-bold mb-6 text-white drop-shadow-lg">关于办公室</h2>
            <p class="text-xl text-white/90 max-w-3xl mx-auto drop-shadow-md">
              办公室是一个温暖和谐的大家庭，主要负责活动策划、值班安排、场地申请等工作，
              能极大锻炼个人沟通交流能力与组织协调能力。
            </p>
          </div>



          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-stretch mb-16">
            <div class="border-2 border-white/40 bg-white/5 p-10 hover:bg-white/10 transition-all duration-300">
              <h3 class="text-2xl font-semibold mb-8 text-white drop-shadow-lg">我们的特色</h3>
              <div class="space-y-6">
                <div class="flex items-start">
                  <div class="w-7 h-7 flex items-center justify-center mr-5 mt-0.5 bg-primary">
                    <span class="text-white text-sm font-bold">01</span>
                  </div>
                  <p class="text-white/95 drop-shadow-sm leading-relaxed">
                    这里有帅气开朗的学长，也有美丽大方的学姐，没有部长与部员的距离感，大家都是彼此的好朋友
                  </p>
                </div>
                <div class="flex items-start">
                  <div class="w-7 h-7 flex items-center justify-center mr-5 mt-0.5 bg-primary">
                    <span class="text-white text-sm font-bold">02</span>
                  </div>
                  <p class="text-white/95 drop-shadow-sm leading-relaxed">
                    可以自由自在地做想做的事情，创造属于自己的精彩
                  </p>
                </div>
                <div class="flex items-start">
                  <div class="w-7 h-7 flex items-center justify-center mr-5 mt-0.5 bg-primary">
                    <span class="text-white text-sm font-bold">03</span>
                  </div>
                  <p class="text-white/95 drop-shadow-sm leading-relaxed">如果你是社恐星人，我们致力于将社恐锻炼为社牛</p>
                </div>
                <div class="flex items-start">
                  <div class="w-7 h-7 flex items-center justify-center mr-5 mt-0.5 bg-primary">
                    <span class="text-white text-sm font-bold">04</span>
                  </div>
                  <p class="text-white/95 drop-shadow-sm leading-relaxed">如果你是社牛星人，我们也是社牛星球的常驻民</p>
                </div>
              </div>
            </div>

            <div class="border-2 border-white/40 bg-white/5 p-10 hover:bg-white/10 transition-all duration-300">
              <h3 class="text-2xl font-semibold mb-8 text-white drop-shadow-lg">主要工作职责</h3>
              <div class="space-y-6">
                <div class="flex items-start">
                  <div class="w-7 h-7 flex items-center justify-center mr-5 mt-0.5 bg-primary">
                    <span class="text-white text-sm font-bold">01</span>
                  </div>
                  <p class="text-white/95 drop-shadow-sm leading-relaxed">负责工作室各类活动的策划与组织实施</p>
                </div>
                <div class="flex items-start">
                  <div class="w-7 h-7 flex items-center justify-center mr-5 mt-0.5 bg-primary">
                    <span class="text-white text-sm font-bold">02</span>
                  </div>
                  <p class="text-white/95 drop-shadow-sm leading-relaxed">安排和协调各部门的值班工作</p>
                </div>
                <div class="flex items-start">
                  <div class="w-7 h-7 flex items-center justify-center mr-5 mt-0.5 bg-primary">
                    <span class="text-white text-sm font-bold">03</span>
                  </div>
                  <p class="text-white/95 drop-shadow-sm leading-relaxed">处理场地申请和使用协调工作</p>
                </div>
                <div class="flex items-start">
                  <div class="w-7 h-7 flex items-center justify-center mr-5 mt-0.5 bg-primary">
                    <span class="text-white text-sm font-bold">04</span>
                  </div>
                  <p class="text-white/95 drop-shadow-sm leading-relaxed">负责内部沟通协调和团队建设工作</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 活动与发展历史 -->
      <section id="activities" class="relative py-20 overflow-hidden">
        <!-- 背景图片层 -->
        <div class="absolute inset-0 bg-activities">
          <!-- 蓝色渐变遮罩，调整颜色以贴合主题 -->
          <div class="absolute inset-0 overlay-activities"></div>
        </div>
        
        <!-- 内容层 -->
        <div class="relative z-10 mx-auto max-w-7xl px-4 md:px-6">
          <div class="text-center mb-16">
            <h2 class="text-3xl font-bold mb-6 text-white drop-shadow-lg">近期活动与发展历程</h2>
            <p class="text-xl text-white/90 max-w-3xl mx-auto drop-shadow-md">
              记录我们的精彩活动与成长足迹，见证每一次突破与进步
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <!-- 左列：近期活动时间线 -->
            <div class="relative">
              <h3 class="text-2xl font-bold mb-8 text-white drop-shadow-lg text-center">近期活动</h3>
              <div class="relative border-l-2 border-white/40 pl-8 space-y-8">
                <div class="relative">
                  <span class="absolute -left-4 top-1 w-6 h-6 rounded-full border-2 border-white/80 bg-white flex items-center justify-center">
                    <div class="w-2 h-2 rounded-full bg-primary"></div>
                  </span>
                  <div class="bg-white/5 border-2 border-white/40 p-6 hover:bg-white/8 transition-all duration-300">
                    <div class="text-sm text-white/80 mb-2 font-medium">2025-03-15</div>
                    <h4 class="text-xl font-semibold mb-3 text-white drop-shadow-sm">网络文化节</h4>
                    <p class="text-white/90 drop-shadow-sm leading-relaxed">申请场地并策划文化节活动内容。</p>
                  </div>
                </div>
                <div class="relative">
                  <span class="absolute -left-4 top-1 w-6 h-6 rounded-full border-2 border-white/80 bg-white flex items-center justify-center">
                    <div class="w-2 h-2 rounded-full bg-primary"></div>
                  </span>
                  <div class="bg-white/5 border-2 border-white/40 p-6 hover:bg-white/8 transition-all duration-300">
                    <div class="text-sm text-white/80 mb-2 font-medium">2025-04-02</div>
                    <h4 class="text-xl font-semibold mb-3 text-white drop-shadow-sm">活动策划模拟</h4>
                    <p class="text-white/90 drop-shadow-sm leading-relaxed">面向新成员，想象并实现心中的文化节策划。</p>
                  </div>
                </div>
                <div class="relative">
                  <span class="absolute -left-4 top-1 w-6 h-6 rounded-full border-2 border-white/80 bg-white flex items-center justify-center">
                    <div class="w-2 h-2 rounded-full bg-primary"></div>
                  </span>
                  <div class="bg-white/5 border-2 border-white/40 p-6 hover:bg-white/8 transition-all duration-300">
                    <div class="text-sm text-white/80 mb-2 font-medium">2025-05-20</div>
                    <h4 class="text-xl font-semibold mb-3 text-white drop-shadow-sm">换届选举</h4>
                    <p class="text-white/90 drop-shadow-sm leading-relaxed">公平透明的换届流程，选出新一届核心成员。</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- 右列：发展历史时间线 -->
            <div class="relative">
              <h3 class="text-2xl font-bold mb-8 text-white drop-shadow-lg text-center">发展历程</h3>
              <div class="relative border-l-2 border-white/40 pl-8 space-y-8">
                <div class="relative">
                  <span class="absolute -left-4 top-1 w-6 h-6 rounded-full border-2 border-white/80 bg-white flex items-center justify-center">
                    <div class="w-2 h-2 rounded-full bg-primary"></div>
                  </span>
                  <div class="bg-white/5 border-2 border-white/40 p-6 hover:bg-white/8 transition-all duration-300">
                    <h4 class="text-xl font-semibold mb-3 text-white drop-shadow-sm">2022 年</h4>
                    <p class="text-white/90 drop-shadow-sm leading-relaxed">完善活动流程与制度，建立跨部门协作规范。</p>
                  </div>
                </div>
                <div class="relative">
                  <span class="absolute -left-4 top-1 w-6 h-6 rounded-full border-2 border-white/80 bg-white flex items-center justify-center">
                    <div class="w-2 h-2 rounded-full bg-primary"></div>
                  </span>
                  <div class="bg-white/5 border-2 border-white/40 p-6 hover:bg-white/8 transition-all duration-300">
                    <h4 class="text-xl font-semibold mb-3 text-white drop-shadow-sm">2023 年</h4>
                    <p class="text-white/90 drop-shadow-sm leading-relaxed">推出品牌化活动，成员规模与影响力显著提升。</p>
                  </div>
                </div>
                <div class="relative">
                  <span class="absolute -left-4 top-1 w-6 h-6 rounded-full border-2 border-white/80 bg-white flex items-center justify-center">
                    <div class="w-2 h-2 rounded-full bg-primary"></div>
                  </span>
                  <div class="bg-white/5 border-2 border-white/40 p-6 hover:bg-white/8 transition-all duration-300">
                    <h4 class="text-xl font-semibold mb-3 text-white drop-shadow-sm">2024 年</h4>
                    <p class="text-white/90 drop-shadow-sm leading-relaxed">完善培训体系，建立活动知识库与复盘体系。</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 成员介绍 -->
      <section id="members" class="relative py-20 overflow-hidden">
        <!-- 背景图片层 -->
        <div class="absolute inset-0 bg-members">
          <!-- 蓝色渐变遮罩，调整颜色以贴合主题 -->
          <div class="absolute inset-0 overlay-members"></div>
        </div>
        
        <!-- 内容层 -->
        <div class="relative z-10 mx-auto max-w-7xl px-4 md:px-6">
          <div class="text-center mb-16">
            <h2 class="text-3xl font-bold mb-6 text-white drop-shadow-lg">部长介绍</h2>
            <p class="text-xl text-white/90 max-w-3xl mx-auto drop-shadow-md">
              认识两位部长，了解他们的职责与寄语
            </p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div class="border-2 border-white/40 bg-white/5 p-8 text-center hover:bg-white/10 transition-all duration-300">

              <div class="font-semibold text-xl mb-2 text-white drop-shadow-lg">陈昊喆 · 新区部长</div>
              <div class="text-white/80 text-base md:text-lg drop-shadow-sm leading-relaxed">一个积极向上、充满热情且富有responsibility的人。在工作中，尊重团队成员的个性和特长，能够充分发挥自己的优势，在沟通能力方面，也能较好地理解他人的需求和意见。</div>
            </div>
            <div class="border-2 border-white/40 bg-white/5 p-8 text-center hover:bg-white/10 transition-all duration-300">

              <div class="font-semibold text-xl mb-2 text-white drop-shadow-lg">毛誉涵 · 老区部长</div>
              <div class="text-white/80 text-base md:text-lg drop-shadow-sm leading-relaxed">我的工作很简单：做好服务，保障大家。我会管好物资、理顺流程，做团队最可靠的后盾。需要任何支持，随时找我。together with the studio.</div>
            </div>

          </div>
        </div>
      </section>

      <!-- 能力与收获展示区（白 + #4456a7 主题） -->
      <section class="py-20 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 relative overflow-hidden">
        <!-- 背景装饰网格（蓝色线条） -->
        <div class="absolute inset-0 opacity-[0.15] dark:opacity-[0.05]">
          <div class="grid grid-cols-8 h-full">
            <div v-for="n in 8" :key="n" class="border-r-2 border-primary dark:border-gray-400"></div>
          </div>
          <div class="absolute inset-0">
            <div class="grid grid-rows-6 h-full">
              <div v-for="n in 6" :key="n" class="border-b-2 border-primary dark:border-gray-400"></div>
            </div>
          </div>
        </div>
        
        <div class="mx-auto max-w-7xl px-4 md:px-6 relative z-10">
          <!-- 主标题区 -->
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-primary-dark">JOIN US</h2>
            <div class="w-20 h-1 mx-auto mb-8 bg-primary"></div>
            <p class="text-lg text-gray-600 max-w-2xl mx-auto">
              在这里，你将获得全方位的成长体验，与志同道合的伙伴一起创造精彩。
            </p>
          </div>

          <!-- 核心内容区 -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <!-- 能力提升板块 -->
            <div class="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 p-8 relative group hover:shadow-lg transition-all duration-300">
              <div class="absolute top-0 left-0 w-2 h-16 bg-primary"></div>
              <div class="mb-6">
                <h3 class="text-2xl font-bold mb-2 text-primary-dark dark:text-gray-100">能力提升</h3>
                <p class="text-sm text-primary dark:text-primary-400">SKILL DEVELOPMENT</p>
              </div>
              <ul class="space-y-4">
                <li class="flex items-start">
                  <div class="w-2 h-2 mt-2 mr-4 flex-shrink-0 bg-primary"></div>
                  <span class="dark:text-gray-200">沟通协调能力的全面锻炼</span>
                </li>
                <li class="flex items-start">
                  <div class="w-2 h-2 mt-2 mr-4 flex-shrink-0 bg-primary"></div>
                  <span class="dark:text-gray-200">活动策划与执行经验积累</span>
                </li>
                <li class="flex items-start">
                  <div class="w-2 h-2 mt-2 mr-4 flex-shrink-0 bg-primary"></div>
                  <span class="dark:text-gray-200">团队协作与领导力培养</span>
                </li>
                <li class="flex items-start">
                  <div class="w-2 h-2 mt-2 mr-4 flex-shrink-0 bg-primary"></div>
                  <span class="dark:text-gray-200">问题解决与应变能力</span>
                </li>
              </ul>
            </div>

            <!-- 收获体验板块 -->
            <div class="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 p-8 relative group hover:shadow-lg transition-all duration-300">
              <div class="absolute top-0 left-0 w-2 h-16 bg-primary"></div>
              <div class="mb-6">
                <h3 class="text-2xl font-bold mb-2 text-primary-dark dark:text-gray-100">收获体验</h3>
                <p class="text-sm text-primary dark:text-primary-400">EXPERIENCE GAINED</p>
              </div>
              <ul class="space-y-4">
                <li class="flex items-start">
                  <div class="w-2 h-2 mt-2 mr-4 flex-shrink-0 bg-primary"></div>
                  <span class="dark:text-gray-200">丰富的实践项目经验</span>
                </li>
                <li class="flex items-start">
                  <div class="w-2 h-2 mt-2 mr-4 flex-shrink-0 bg-primary"></div>
                  <span class="dark:text-gray-200">珍贵的团队友谊建立</span>
                </li>
                <li class="flex items-start">
                  <div class="w-2 h-2 mt-2 mr-4 flex-shrink-0 bg-primary"></div>
                  <span class="dark:text-gray-200">综合素质的显著提升</span>
                </li>
                <li class="flex items-start">
                  <div class="w-2 h-2 mt-2 mr-4 flex-shrink-0 bg-primary"></div>
                  <span class="dark:text-gray-200">职业规划的清晰认知</span>
                </li>
              </ul>
            </div>

            <!-- 团队文化板块 -->
            <div class="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 p-8 relative group hover:shadow-lg transition-all duration-300">
              <div class="absolute top-0 left-0 w-2 h-16 bg-primary"></div>
              <div class="mb-6">
                <h3 class="text-2xl font-bold mb-2 text-primary-dark dark:text-gray-100">团队文化</h3>
                <p class="text-sm text-primary dark:text-primary-400">TEAM CULTURE</p>
              </div>
              <ul class="space-y-4">
                <li class="flex items-start">
                  <div class="w-2 h-2 mt-2 mr-4 flex-shrink-0 bg-primary"></div>
                  <span class="dark:text-gray-200">开放包容的工作氛围</span>
                </li>
                <li class="flex items-start">
                  <div class="w-2 h-2 mt-2 mr-4 flex-shrink-0 bg-primary"></div>
                  <span class="dark:text-gray-200">学长学姐的悉心指导</span>
                </li>
                <li class="flex items-start">
                  <div class="w-2 h-2 mt-2 mr-4 flex-shrink-0 bg-primary"></div>
                  <span class="dark:text-gray-200">创新思维的鼓励支持</span>
                </li>
                <li class="flex items-start">
                  <div class="w-2 h-2 mt-2 mr-4 flex-shrink-0 bg-primary"></div>
                  <span class="dark:text-gray-200">个人成长的全力助力</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- 底部行动召唤 -->
          <div class="text-center mt-16">
          <button @click="showJoinModal = true" type="button" class="inline-block px-8 py-4 font-bold text-lg border-2 btn-outline-primary dark:border-gray-400 dark:text-gray-100 dark:hover:bg-gray-700 transition-colors duration-300">
            加入我们，开启你的精彩旅程
          </button>
        </div>
        </div>
      </section>
    </main>

    <!-- 页脚（白 + #4456a7 主题） -->
    <footer class="relative border-t overflow-hidden footer-border">
      <!-- 背景图片层 -->
      <div 
        class="absolute inset-0 bg-footer"
      >
        <!-- 白色渐变遮罩 -->
        <div 
          class="absolute inset-0 overlay-footer"
        ></div>
      </div>
       <div class="relative z-10 mx-auto max-w-7xl px-4 md:px-6 py-10 text-sm">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div class="font-bold mb-2 text-primary-dark dark:text-gray-100">河南大学网站工作室</div>
            <p class="text-gray-600 dark:text-gray-300">Office Department — 办公室部门</p>
          </div>
          <div>
            <div class="font-semibold mb-2 text-primary-dark dark:text-gray-100">快速导航</div>
            <ul class="space-y-2 text-gray-700 dark:text-gray-300">
              <li><a href="#" class="hover:underline dark:hover:text-gray-100">首页</a></li>
              <li><a href="#about" class="hover:underline dark:hover:text-gray-100">关于我们</a></li>
            </ul>
          </div>
          <div>
            <div class="font-semibold mb-2 text-primary-dark dark:text-gray-100">联系我们</div>
            <ul class="space-y-2 text-gray-700 dark:text-gray-300">
              <li>QQ 群：814040015</li>
              <li>地址：河南大学</li>
            </ul>
          </div>
        </div>
        <div class="mt-8 pt-6 border-t text-gray-500 dark:text-gray-400 footer-border">
          © {{ new Date().getFullYear() }} Henan University Website Studio. All rights reserved.
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import JoinModal from './JoinModal.vue'
import ThemeToggle from './ThemeToggle.vue'

// 响应式数据：当前激活区块ID、移动端菜单是否展开、是否滚动过首屏、滚动进度条、加入我们弹窗显示状态
const activeId = ref('home')
const isMobileMenuOpen = ref(false)
const scrolled = ref(false)
const scrollProgress = ref(0)
const showJoinModal = ref(false)

// 导航菜单项（用于桌面与移动端）
const sections = [
  { id: 'home', label: '首页', href: '#home' },
  { id: 'about', label: '关于我们', href: '#about' },
  { id: 'activities', label: '活动与历程', href: '#activities' },
  { id: 'members', label: '部长介绍', href: '#members' }
]

// 切换移动端菜单展开/收起
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}



// 平滑滚动到指定区域，考虑固定头部高度
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    const headerHeight = 80
    const elementPosition = element.offsetTop
    const offsetPosition = elementPosition - headerHeight

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
}

// 计算滚动进度与当前激活区块
const handleScroll = () => {
  const scrollPosition = window.scrollY + 100
  const doc = document.documentElement
  const total = (doc.scrollHeight - doc.clientHeight)
  const progress = total > 0 ? (window.scrollY / total) * 100 : 0
  scrollProgress.value = Math.min(100, Math.max(0, progress))
  document.documentElement.style.setProperty('--scroll-progress', scrollProgress.value + '%')
  scrolled.value = window.scrollY > 10

  for (const section of sections) {
    const element = document.getElementById(section.id)
    if (element) {
      const offsetTop = element.offsetTop
      const offsetHeight = element.offsetHeight

      if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
        activeId.value = section.id
        break
      }
    }
  }
}

// 使用 requestAnimationFrame 节流滚动事件
let ticking = false
const onScroll = () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      handleScroll()
      ticking = false
    })
    ticking = true
  }
}

// 生命周期：挂载/卸载事件监听，并初始化状态
onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll as EventListener)
})
</script>

