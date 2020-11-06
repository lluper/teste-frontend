<template>
  <div>
    <v-toolbar class="topBarSearchVideo" height="70">
      <div class="searchInput">
        <v-text-field
          label="Solo"
          placeholder="Buscar videos"
          solo
          hide-details="auto"
          v-model="search"
          v-on:keyup.enter="getData()"
          :class="{ inputSearch: true, inputSearchError: inputSearchError }"
        ></v-text-field>

        <v-btn icon @click="getData()">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </div>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  components: {},
  data: function() {
    return {
      inputSearchError: false,
      search: "",
      videos: []
    };
  },
  methods: {
    getData() {
      if (this.search !== "") {
        this.inputSearchError = false;
        this.$emit("getNameVideo", { nameVideo: this.search });
      } else {
        this.inputSearchError = true;
        return;
      }
    }
  },
  mounted() {
    if (localStorage.q) {
      this.search = localStorage.q;
      this.getData();
    }
  }
};
</script>

<style>
.topBarSearchVideo > .v-toolbar__content {
  justify-content: center;
}
.inputSearch {
  font-family: "Roboto";
}
.inputSearchError {
  border: 1px solid #ee0101;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
}
.searchInput {
  display: flex;
  width: 80%;
}
.flex {
  display: flex;
  flex-wrap: wrap;
}
.calc {
  width: calc(100% / 3);
}
.testando {
  width: "90px";
  height: "90px";
}
.padding {
  padding-left: 40px !important;
}
</style>
