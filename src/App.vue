<template>
  <div id="app" class="container">
    <div class="header">
      <div>
        <label for="model" :style="{ 'margin-right': '5px' ,'padding-top': '5px',color: '#aafff'}">选择模型:</label>
        <select v-model="selectedModel" :style="{ backgroundColor: modelColor, color: '#fff' }">
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
        <button @click="getSubscription()" :style="{ backgroundColor: '#708090','margin-right': '5px'}">获取余额</button>
        <div v-if="subscription">
          <div>余额：{{ subscription.soft_limit_usd }}</div>
        </div>

        <button @click="getUsage()" :style="{ backgroundColor: '#708090','margin-right': '5px'}">获取消费</button>
        <div v-if="usage">
          <div>消费：{{ usage.total_usage }}</div>
        </div>
      </div>
    </div>

    <div class="chat-area">
      <ul>
        <li v-for="(message, index) in messages" :key="index">
          {{ message.content }}
        </li>
      </ul>
    </div>

    <div class="input-area">
      <input type="text" v-model="chatContent">
      <button @click="sendMessage()">发送消息</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      selectedModel: 'gpt-3.5-turbo',
      chatContent: '',
      messages: [],
      subscription: null,
      usage: null,
    }
  },
  computed: {
    modelColor() {
      if (this.selectedModel === 'gpt-3.5-turbo') {
        return '#4CAF50';
      } else if (this.selectedModel.startsWith('gpt-3.5')) {
        return '#FF8C00';
      } else if (this.selectedModel.startsWith('gpt-4')) {
        return '#8A2BE2';
      } else {
        return '#FFFFFF'; // default color
      }
    }
  },
  methods: {
    async sendMessage() {
      const { data } = await axios.post('/api/chat', {
      model: this.selectedModel,
      message: this.chatContent,
    });
	this.messages.push(data.choices[0].message);

      this.chatContent = '';
    },
    async getSubscription() {
      const { data } = await axios.get('/api/subscription');
      this.subscription = data;
    },
    async getUsage() {
      const { data } = await axios.get('/api/usage');
      this.usage = data;
    }
  }
};
</script>

<style scoped>
body {
  background-color: #292b2f;
  color: #fff;
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #2d323e;
  border-radius: 10px;
  padding: 20px;
  width: 700px;
  height: 95%;
}

.header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.header select {
  border-radius: 5px;
  padding: 5px;
  border: none;
}

.chat-area {
  flex-grow: 1;
  overflow: auto;
}

.input-area {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #555;
  padding-top: 10px;
}

input[type="text"] {
  flex-grow: 1;
  margin-right: 10px;
  padding: 10px;
  background-color: #454d5f;
  color: #fff;
  border: none;
  border-radius: 5px;
}

button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
button:active {
  transform: scale(0.95);
}
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

li {
  border-bottom: 1px solid #555;
  padding: 10px 0;
}
</style>
