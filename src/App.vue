<template>
  <Notification />
  <router-view/>
</template>

<script lang="ts" setup>
import Notification from "@/components/ui/Notification.vue"

</script>

<style lang="scss">
$darkGrey: #343434;

body,html {
  margin: 0;
  padding: 0;
}

body{
  padding-top: 20px;
}
* {
  box-sizing: border-box;
  font-family: sans-serif;

  ::selection{
    background-color: grey;
  }
}

::-webkit-scrollbar {
  height: 10px;
  width: 10px;
}

::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: grey;
  border-radius: 10px;

  &:hover{
    background-color: $darkGrey;
  }
}
</style>
