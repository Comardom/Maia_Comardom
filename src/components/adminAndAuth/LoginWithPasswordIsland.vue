<template>
	<div id="main-login">
		<h1>{{ h1DyTxt }}</h1>
		<div class="placeholder"></div>
		<form @submit.prevent="handleSubmit" id="verify-form">
			<label for="identifier">UID / 邮箱：</label>
			<input type="text" id="identifier" v-model="identifier" required />
			<div class="placeholder"></div>
			
			<label for="password">密码：</label>
			<input
				type="password"
				id="password"
				v-model="password"
				@keydown.enter="triggerSubmit"
				required
			/>
		</form>
		
		<div class="placeholder"></div>
		<button @click="triggerSubmit" id="external-submit">登录</button>
		<p id="result" v-if="result" class="show">{{ result }}</p>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { hashPassword } from '../../utils/password.js'; // 注意路径按你项目结构调整

const identifier = ref('');
const password = ref('');
const result = ref('');

const triggerSubmit = () => {
	handleSubmit();
};

const handleSubmit = async () => {
	try {
		const res = await fetch('/api/uidUndPwd/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				identifier: identifier.value,
				passwordHash: await hashPassword(password.value) // ✅ 加上 await
			})
		});
		
		const data = await res.json();
		result.value = data.success
			? '✅ 登录成功！'
			: '❌ 登录失败：' + data.error;
	} catch {
		result.value = '⚠️ 网络错误，请稍后再试';
	}
	
	setTimeout(() => (result.value = ''), 3000);
};

defineProps({
	h1DyTxt: {
		type: String,
		required: true
	}
});
</script>

<style scoped>
@import "/src/styles/adminAndAuth/loginIsland.css";
</style>
