<template>
  <v-card flat class="pa-5">
    <v-card-title>Date → UNIX Time</v-card-title>
    <v-card-subtitle>Enter the date and time to convert to UNIX timestamp</v-card-subtitle>

    <v-card-actions>
      <v-text-field label="Date" type="date" v-model="inputDate"></v-text-field>
      <!-- 時間入力フィールドに秒を含むように変更 -->
      <v-text-field label="Time" type="time" v-model="inputTime" step="1"></v-text-field>
      <!-- オプショナルなミリ秒入力フィールドを追加 -->
      <v-text-field label="Milliseconds (optional)" type="number" v-model="inputMilliseconds" :rules="millisecondsRules"></v-text-field>
    </v-card-actions>

    <v-card flat align="right" class="pb-2">
      <v-btn class="ml-2" @click="clearForm">CLEAR</v-btn>
      <v-btn class="ml-2" color="primary" @click="convertDateToUnix">CONVERT</v-btn>

      <div class="mt-2" v-if="convertedUnix">
        UNIX Time: {{ convertedUnix }} <!-- ここでミリ秒を含める -->
        <v-icon @click="ClipBoardUtils.copyToClipboard(convertedUnix)">
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

// 現在の日付を取得する関数
function getCurrentFormattedDate() {
  const now = new Date();
  return now.toISOString().split('T')[0]; // YYYY-MM-DD形式で日付を取得
}

// 現在の時間を取得する関数
function getCurrentFormattedTime() {
  const now = new Date();
  return now.toISOString().split('T')[1].slice(0, 8); // HH:MM:SS形式で時間を取得
}

// ミリ秒入力用のバリデーションルール
const millisecondsRules = [
  v => (!v || (v >= 0 && v <= 999)) || 'Must be between 0 and 999',
];

let inputDate = ref(getCurrentFormattedDate());
let inputTime = ref(getCurrentFormattedTime());
let inputMilliseconds = ref(''); // ミリ秒入力の初期値は空文字列

let convertedUnix = ref('');

// 日付と時間をUNIXタイムスタンプに変換する関数
function convertDateToUnix() {
  if (inputDate.value && inputTime.value) {
    // 日付と時間を組み合わせて新しいDateオブジェクトを作成
    const fullDate = new Date(`${inputDate.value}T${inputTime.value}`);
    // オプショナルなミリ秒を加える
    const unixTimeWithMilliseconds = DateTimeConverter.dateToUnixTimestamp(fullDate) * 1000 + (inputMilliseconds.value ? Number(inputMilliseconds.value) : 0);
    convertedUnix.value = unixTimeWithMilliseconds.toString();
  }
}

// フォームをクリアする関数
function clearForm() {
  inputDate.value = getCurrentFormattedDate();
  inputTime.value = getCurrentFormattedTime();
  inputMilliseconds.value = '';
  convertedUnix.value = '';
}
</script>
