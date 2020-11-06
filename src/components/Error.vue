<template>
  <div v-if="hasError" class="hasError">
    <p class="hasErrorTitle">Ops. tivemos um problema</p>
    <button class="hasErrorLink" v-on:click.prevent="reloadPage">
      Tentar novamente
    </button>
  </div>
</template>

<script>
export default {
  props: ["hasError"],
  methods: {
    reloadPage: function() {
      this.$router.go(this.$router.currentRoute);
    }
  }
};
</script>

<style>
.hasError {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 70vw;
}
.hasErrorTitle {
  font-size: 18px;
  margin-bottom: 20px;
}
.hasErrorLink {
  font-family: "Roboto";
  color: #0066ff;
}
</style>
