<!--此文件已废弃-->

<template>
	<div class="big-flex">
		<component
			:is="currentComponent"
			:h1DyTxt="h1DyTxt"
		/>
		<div class="placeholder"></div>
		<div class="btn-div">
			<button @click="usePassword = true">使用密码登录</button>
			<button @click="usePassword = false">用验证码登录</button>
		</div>
	</div>
</template>

<script setup>
import { ref, computed } from 'vue'
import LoginWithQrcodeIsland from '../adminAndAuth/LoginWithQrcodeIsland.vue'
import LoginWithPasswordIsland from '../adminAndAuth/LoginWithPasswordIsland.vue'

const usePassword = ref(false)

const props = defineProps({
	h1DyTxt: {
		type: String,
		required: true
	},
	isAdmin: {
		type: Boolean,
		default: false
	}
})

// 🧠 组件判断逻辑
const currentComponent = computed(() => {
	if (props.isAdmin) return LoginWithQrcodeIsland
	return usePassword.value ? LoginWithPasswordIsland : LoginWithQrcodeIsland
})
</script>
<style scoped>
@import "/src/components/.trashbin/loginSwitcherIsland.css";
</style>
