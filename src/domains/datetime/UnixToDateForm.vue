<template>
  <v-card flat class="pa-5">
    <v-card-title>UNIX Time → Date</v-card-title>
    <v-card-subtitle>Example: </v-card-subtitle>

    <v-card-actions>
      <v-text-field label="UNIX Time" v-model="unixTime"></v-text-field>
      <v-text-field label="UTC Offset (hours)" v-model.number="utcOffset" placeholder="e.g., 2 or -5"></v-text-field>
    </v-card-actions>

    <v-card flat align="right" class="pb-2">
      <v-btn class="ml-2" @click="clearForm">CLEAR</v-btn>
      <v-btn class="ml-2" color="primary" @click="convertUnixToDate">CONVERT</v-btn>
      <div class="mt-2" v-if="convertedDate">
        Date: {{DateTimeConverter.dateToDisplayString(convertedDate)}}
        <v-icon @click="ClipBoardUtils.copyToClipboard(DateTimeConverter.dateToDisplayString(convertedDate))">
          mdi-content-copy
        </v-icon>
      </div>
    </v-card>

  </v-card>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import DateTimeConverter from "@/domains/datetime/dateTimeConverter";
import ClipBoardUtils from "@/infras/clipBoardUtils";

function setInitialValues() {
  now.value = new Date();
  // UTCとの時差を考慮したUnixタイムスタンプを取得
  const utcOffsetHours = -now.value.getTimezoneOffset() / 60;
  unixTime.value = DateTimeConverter.dateToUnixTimestamp(new Date(now.value.getTime() + utcOffsetHours * 3600000));
  utcOffset.value = utcOffsetHours;
  convertedDate.value = null;
}


const now = ref(new Date());
let unixTime = ref(DateTimeConverter.dateToUnixTimestamp(now.value));
let utcOffset = ref(-now.value.getTimezoneOffset() / 60);
let convertedDate = ref<Date | null>(null);

function convertUnixToDate() {
  convertedDate.value = DateTimeConverter.unixTimestampToDate(unixTime.value, utcOffset.value);
}

function clearForm() {
  setInitialValues();
}

setInitialValues();
</script>




<style scoped>

</style>