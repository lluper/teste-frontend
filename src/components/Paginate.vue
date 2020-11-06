<template>
  <div class="paginate">
    <v-btn
      v-on:click="paginate('prev')"
      class="paginateButton paginateButtonPrev"
    >
      {{ "&lt;" }}
    </v-btn>
    <v-btn
      v-on:click="paginate('next')"
      class="paginateButton paginateButtonNext"
    >
      {{ "&gt; " }}
    </v-btn>
  </div>
</template>

<script>
export default {
  methods: {
    paginate: function(type) {
      this.$emit("click-paginate", { type: type });
    }
  }
};
</script>

<style>
.paginate {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
.paginateButton {
  width: 150px;
}
.paginateButtonPrev,
.paginateButtonNext {
  font-family: "Roboto";
}
.paginateButton.paginateButtonPrev {
  margin-right: 10px;
}
.paginateButton.paginateButtonNext {
  margin-left: 10px;
}
</style>
