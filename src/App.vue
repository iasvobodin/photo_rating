<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { ref } from 'vue';
import type { Ref } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
const objectsURL = ref<Array<string>>([])
Neutralino.events.on('ready', () => {
  Neutralino.os.showMessageBox('Welcome', 'Hello Neutralinojs');
});
async function chooseFolder() {
  const entry = await Neutralino.os.showFolderDialog('Choose a folder');
  console.log('You have selected:', entry);
  const entries = await Neutralino.filesystem.readDirectory(entry);
  const imageEntr = entries.filter(e => e.type === 'FILE' && e.entry.endsWith('jpg'))
  console.log('ImageContent:', imageEntr)

  imageEntr.forEach(async (e) => {
    let data = await Neutralino.filesystem.readBinaryFile(`${entry}/${e.entry}`);
    const blobb = new Blob([data]);
    objectsURL.value.push(URL.createObjectURL(blobb))

  })

  // let data = await Neutralino.filesystem.readBinaryFile(`${entry}/${imageEntr[0].entry}`);
  // let view = new Uint8Array(data);
  // const blobb = new Blob([data]);
  // console.log('Binary content: ', view, blobb);
  // objectURL.value = URL.createObjectURL(blobb);


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
  <img v-for="src in objectsURL" style="width: 200px; height: auto; " :src="src" alt="">
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
