<template>
  <v-app>
    <v-app-bar flat>
      <v-app-bar-title>DATE TIME TOOLS</v-app-bar-title>
      <v-btn icon="mdi-github" href="https://github.com/digiot-abc"></v-btn>
      <v-btn icon="mdi-twitter" href="https://twitter.com/digiot_abc"></v-btn>
    </v-app-bar>
    <v-main>
      <router-view/>
    </v-main>
    <v-footer app>
      <v-row class="ma-0">
<!--        <v-col cols="12">-->

<!--          <v-card color="grey" height="300" width="100%">-->
<!--            <v-card-title>お問い合わせ・要望</v-card-title>-->
<!--          </v-card>-->
<!--        </v-col>-->

        <v-col cols="12" class="pa-0 ma-0">
          <v-card align="center" elevation="0" width="100%">
            <v-card-text>2023 &copy; digiot</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',

  data () {
    return {
      //
    }
  },
})
</script>