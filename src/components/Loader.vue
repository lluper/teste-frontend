<template>
  <transition name="fade">
    <div class="loader" v-if="show">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    show: Boolean
  }
};
</script>

<style>
.loader {
  z-index: 1000;
  background: #fff;
  position: absolute;
  width: 100%;
  height: -webkit-fill-available;
  display: flex;
  justify-content: center;
  align-items: center;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
