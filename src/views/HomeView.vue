<template>
  <v-card flat class="pa-5" align="right">
    {{ now }} <br/>UNIX Time: {{now.getTime()}}
  </v-card>
  <v-card flat align="center">
    <v-card flat max-width="1200">
      <unix-to-date-form align="left"/>
      <date-to-unix-form align="left"/>
    </v-card>
  </v-card>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import DateTimeConverter from "@/domains/datetime/dateTimeConverter";
import UnixToDateForm from "@/domains/datetime/DateToUnixForm.vue";
import DateToUnixForm from "@/domains/datetime/UnixToDateForm.vue";

// 初期値を設定する関数
function setInitialValues() {
  now.value = new Date();
}

// 現在の時刻と初期値をリアクティブなデータとして定義
const now = ref(new Date());
const nowUnixTime = ref(DateTimeConverter.dateToUnixTimestamp(now.value));


// 現在時刻のリアルタイム更新関数
function updateCurrentTime() {
  now.value = new Date();
  nowUnixTime.value = DateTimeConverter.dateToUnixTimestamp(now.value);
}

onMounted(() => {
  const interval = setInterval(updateCurrentTime, 1000);
  onUnmounted(() => {
    clearInterval(interval);
  });
});

// コンポーネントがマウントされたときに初期値を設定
setInitialValues();
</script>
