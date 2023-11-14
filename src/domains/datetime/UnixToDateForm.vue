<template>
  <v-card flat class="pa-5">
    <v-card-title>Date → UNIX Time</v-card-title>
    <v-card-subtitle>Example: </v-card-subtitle>

    <v-card-actions>
      <v-text-field label="Date" type="date" v-model="inputDate"></v-text-field>
      <v-text-field label="Time" type="time" v-model="inputTime"></v-text-field>
    </v-card-actions>

    <v-card flat align="right" class="pb-2">
      <v-btn class="ml-2" @click="clearForm">CLEAR</v-btn>
      <v-btn class="ml-2" color="primary" @click="convertDateToUnix">CONVERT</v-btn>

      <div class="mt-2" v-if="convertedUnix">
        UNIX Time: {{ convertedUnix }}000
        <v-icon @click="ClipBoardUtils.copyToClipboard(`${convertedUnix}000`)">
          mdi-content-copy
        </v-icon>
      </div>
    </v-card>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DateTimeConverter from "@/domains/datetime/dateTimeConverter";
import ClipBoardUtils from "@/infras/clipBoardUtils";

function getCurrentFormattedDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = `${now.getMonth() + 1}`.padStart(2, '0');
  const day = `${now.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getCurrentFormattedTime() {
  const now = new Date();
  const hours = `${now.getHours()}`.padStart(2, '0');
  const minutes = `${now.getMinutes()}`.padStart(2, '0');
  return `${hours}:${minutes}`;
}

let inputDate = ref(getCurrentFormattedDate());
let inputTime = ref(getCurrentFormattedTime());

let convertedUnix = ref<number | null>(null);

function convertDateToUnix() {
  if (inputDate.value && inputTime.value) {
    // 日付と時間を組み合わせて新しいDateオブジェクトを作成
    const fullDate = new Date(`${inputDate.value}T${inputTime.value}`);
    convertedUnix.value = DateTimeConverter.dateToUnixTimestamp(fullDate);
  }
}

function clearForm() {
  inputDate.value = getCurrentFormattedDate();
  inputTime.value = getCurrentFormattedTime();
  convertedUnix.value = null;
}
</script>



<style scoped>

</style>