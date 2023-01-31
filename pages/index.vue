<template>
  <!--templateタグは1つのdivタグしか認識できないので、全体をメインdivタグで囲う-->
  <div class="index_main">
    <!--v-onでmethods内の各関数を発火させる-->
    <div class="tab_button">
      <button v-on:click="input_tab_on">input</button>
      <button v-on:click="family_tab_on">family</button>


    </div>
    <!-- htmlタグで各コンポーネントを呼び出す。v-ifでdata内に用意した各コンポーネントの名前の変数が
    tureになったときに表示する -->
    <div class="component">
      <input_forum v-if="input_tab"></input_forum>
      <family_budget v-if="family_tab"></family_budget>
    </div>

  </div>
</template>

<script>
import input_forum from '~/components/input_forum.vue';
import family_budget from '~/components/family_budget.vue';

export default {
  components: {
    input_forum,
    family_budget,
  },

  data() {
    return {
      // デフォルトでinput_tabを表示させておきたいので、input_tabをtrueにしておく
      input_tab: true,
      family_tab: false
    }
  },

  methods: {
    // それぞれ対象となる変数をtrueにし、それ以外の変数をfalseにする
    input_tab_on() {
      this.input_tab = true
      this.family_tab = false
    },
    family_tab_on() {
      this.family_tab = true
      this.input_tab = false
    }
  }
}




</script>
