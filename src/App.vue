<template>
  <div>
    <div>
      <label for="model">选择模型:</label>
      <select v-model="selectedModel">
        <option disabled value="">请选择模型</option>
        <option>gpt-3.5-turbo</option>
        <option>gpt-3.5-turbo-16k</option>
        <option>gpt-3.5-turbo-0301</option>
        <option>gpt-3.5-turbo-0613</option>
        <option>gpt-3.5-turbo-16k-0613</option>
        <option>gpt-4</option>
        <option>gpt-4-0613</option>
      </select>
    </div>
    <div>
      <textarea v-model="chatContent"></textarea>
      <button @click="sendMessage()">发送消息</button>
    </div>
    <div>
      <button @click="getSubscription()">获取余额</button>
      <button @click="getUsage()">获取消费</button>
    </div>
    <div>
      <ul>
        <li v-for="message in messages" :key="message.id">
          {{ message.content }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      selectedModel: '',
      chatContent: '',
      messages: [],
    }
  },
  methods: {
    async sendMessage() {
      const { data } = await axios.post('/api/chat', {
        model: this.selectedModel,
        message: this.chatContent,
      });
      this.messages.push(data.message);
      this.chatContent = '';
    },
    async getSubscription() {
      const { data } = await axios.get('/api/subscription');
      // 显示或处理返回的余额数据
    },
    async getUsage() {
      const { data } = await axios.get('/api/usage');
      // 显示或处理返回的消费数据
    }
  }
};
</script>
