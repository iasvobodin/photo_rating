<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from './components/HelloWorld.vue'

Neutralino.events.on('ready', () => {
  Neutralino.os.showMessageBox('Welcome', 'Hello Neutralinojs');
});
async function chooseFolder() {
  const entry = await Neutralino.os.showFolderDialog('Choose a folder');
  console.log('You have selected:', entry);
  const entries = await Neutralino.filesystem.readDirectory(entry);
  console.log('Content: ', entries.filter(e => e.type === 'FILE'))
}
async function readDirectory() {
  const entries = await Neutralino.filesystem.readDirectory('C:/Users/isvobodin/Desktop/n');
  console.log('Content: ', entries.filter(e => e.type === 'FILE'))
}
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite + Neutralino" /><br>
  <button @click="chooseFolder">chooseFolder</button><br>
  <button @click="readDirectory">readDirectory</button><br>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
