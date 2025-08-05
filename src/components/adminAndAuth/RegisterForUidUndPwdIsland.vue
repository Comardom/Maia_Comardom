<template>
	<div id="main-login">
		<h1>{{ h1DyTxt }}</h1>
		<div class="placeholder"></div>
		<form @submit.prevent="handleSubmit" id="verify-form">
			<label for="uid">用户名：</label>
			<input type="text" id="uid" v-model="uid" required />
			<div class="placeholder"></div>
			
			<label for="email">邮箱：</label>
			<input type="email" id="email" v-model="email" required />
			<div class="placeholder"></div>
			
			<label for="password">密码：</label>
			<input type="password" id="password" v-model="password" required />
			<div class="placeholder"></div>
			
			<label for="confirmPassword">重复密码：</label>
			<input
				type="password"
				id="confirmPassword"
				v-model="confirmPassword"
				@keydown.enter="triggerSubmit"
				required
			/>
		</form>
		
		<div class="placeholder"></div>
		<button @click="triggerSubmit" id="external-submit">注册</button>
		<p id="result" v-if="result" class="show">{{ result }}</p>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { hashPassword } from '../../utils/password.js'; // ✅ 路径按需调整，确保是 async

const uid = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const result = ref('');

const triggerSubmit = () => {
	handleSubmit();
};

const handleSubmit = async () => {
	if (password.value !== confirmPassword.value) {
		result.value = '❌ 两次输入的密码不一致';
		return;
	}
	
	try {
		const hashed = await hashPassword(password.value); // ✅ 确保是 await
		
		const res = await fetch('/api/uidUndPwd/register', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				uid: uid.value,
				email: email.value,
				passwordHash: hashed
			})
		});
		
		const data = await res.json();
		result.value = data.success
			? '✅ 注册成功，请登录'
			: '❌ 注册失败：' + data.error;
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
