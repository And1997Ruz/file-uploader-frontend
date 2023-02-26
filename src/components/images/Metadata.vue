<template>
  <div class="metadata-card" v-for="(metadata, idx) in props.metadata" :key="idx">
    <div v-for="(value, key) in metadata" :key="key">
      <span class="key">{{key}}: </span><span class="value">{{value}}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Metadata } from "@/types";

interface Props {
  metadata: Metadata[];
}

const props = defineProps<Props>();

</script>

<style lang="scss" scoped>
.metadata-card {
  margin: 10px 0;
  box-shadow: 0 0 5px grey;
  padding: 10px;
}

.key{
  font-weight: 700;
}
</style>