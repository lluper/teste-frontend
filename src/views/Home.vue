<template>
  <div class="home">
    <TopBarSearchVideo v-on:getNameVideo="getNameVideo" />
    <Loader :show="loaderShow" />
    <Error :hasError="hasError" />

    <div class="container">
      <ListVideos :videos="videos" :showVideos="showVideos" />
      <div v-if="videos">
        <Paginate v-on:click-paginate="clickPaginate" />
      </div>
    </div>
  </div>
</template>

<style>
.home {
  height: -webkit-fill-available;
}

@media (max-width: 425px) {
  .container {
    padding: 0;
  }
}
</style>
<script>
import axios from "axios";
import TopBarSearchVideo from "../components/TopBarSearchVideo";
import Loader from "../components/Loader";
import ListVideos from "../components/ListVideos";
import Paginate from "../components/Paginate";
import Error from "../components/Error";

export default {
  name: "Home",
  components: {
    TopBarSearchVideo,
    Loader,
    ListVideos,
    Paginate,
    Error
  },
  data: function() {
    return {
      prev: null,
      next: null,
      page: 1,
      showVideos: false,
      loaderShow: false,
      hasError: false,
      videos: "",
      name: ""
    };
  },
  methods: {
    clickPaginate: function({ type }) {
      if (type === "prev" && this.prev !== null) {
        this.getListVideo({
          q: this.name,
          order: "date",
          pageToken: this.prev
        });
      }
      if (type === "next" && this.next !== null) {
        this.getListVideo({
          q: this.name,
          order: "date",
          pageToken: this.next
        });
      }
    },

    getNameVideo: function(name) {
      this.getListVideo({ q: name.nameVideo, order: "date" });
    },
    async getListVideo(param) {
      this.loaderShow = true;
      this.showVideos = false;

      this.name = param.q;
      try {
        let response;
        if (this.search !== "") {
          response = await axios.get(
            "https://www.googleapis.com/youtube/v3/search",
            {
              params: {
                part: "id,snippet",
                maxResults: 20,
                order: "date",
                key: this.$API_KEY,
                ...param
              }
            }
          );
        } else {
          return;
        }

        this.prev = response.data.prevPageToken || null;

        this.next = response.data.nextPageToken || null;

        this.videos = [
          ...response.data.items.filter(function(item) {
            return item.id.videoId !== undefined;
          })
        ];
        this.showVideos = true;
        this.loaderShow = false;
        localStorage.setItem("q", param.q);
        localStorage.setItem("nextPage", response.data.nextPageToken);
      } catch (error) {
        this.hasError = true;
        this.loaderShow = false;
      }
    }
  },
  mounted() {
    document.title = this.$appName;

    if (localStorage.nextPage) {
      this.next = localStorage.nextPage;
    }
  }
};
</script>
