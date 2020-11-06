<template>
  <div id="Details" class="details">
    <v-toolbar dense>
      <v-btn icon class="hidden-xs-only" @click="() => this.$router.back()">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </v-toolbar>
    <Error :hasError="hasError" />

    <div class="videoContainer" v-if="videoSelectedData.snippet">
      <iframe
        v-if="videoId"
        id="ytplayer"
        type="text/html"
        class="videoPlayer"
        :src="geturl(videoId)"
        frameborder="0"
        allowfullscreen
      />
      <div class="videosData">
        <p class="videoTitle">
          {{ videoSelectedData.snippet.title }}
        </p>
        <p class="videoNumberViews">
          {{ formatNumebalView(videoSelectedData.statistics.viewCount) }}
          visualizações
        </p>
        <div class="videoDescription" v-if="showDescription">
          <pre
            class="videoDescriptionText"
            v-html="textToUrl(videoSelectedData.snippet.description)"
          ></pre>
        </div>
        <v-btn
          text
          v-on:click="showDescription = !showDescription"
          class="buttonShowMore"
        >
          mostrar {{ !showDescription ? "mais" : "menos" }}
        </v-btn>
      </div>
    </div>
  </div>
</template>
<style>
.details {
  background: #f9f9f9;
}
.videoContainer {
  margin: 20px 100px;
}
.videoPlayer {
  width: 100%;
  height: 400px;
}
.videosData {
}
.videosData > .videoTitle {
  margin: 10px 0;
}
.videosData > .videoNumberViews {
  color: #606060;
}
.videosData > .videoDescription {
  margin: 15px 0;
  color: #030303;
  border-top: solid #60606067 calc(1px / 2);
  padding-top: 10px;
}

.videoDescription > .videoDescriptionText {
  font-family: "Roboto";
  word-wrap: break-word;
}
.buttonShowMore {
  margin: 15px 0;
  font-family: "Roboto";
}
@media (max-width: 768px) {
}
@media (max-width: 425px) {
  .videoContainer {
    margin: 20px 0px;
  }
  .videoPlayer {
    width: 100%;
    height: 400px;
  }
  .videosData {
    padding: 5px 10px;
  }
}
@media (max-width: 375px) {
}
</style>

<script>
import numeral from "numeral";
import axios from "axios";
import Error from "../components/Error";
export default {
  components: {
    Error
  },
  data: function() {
    return {
      videoSelectedData: false,
      showDescription: false,
      videoId: "",
      hasError: false
    };
  },
  methods: {
    textToUrl: function(text) {
      var urlRegex = /(https?:\/\/[^\s]+)/g;
      return text.replace(urlRegex, function(url) {
        return `<a href="${url}" target="target">${url} </a>`;
      });
    },

    formatNumebalView: function(value) {
      return numeral(value)
        .format("0,0")
        .replaceAll(",", ".");
    },
    geturl: function(videoId) {
      return `http://www.youtube.com/embed/${videoId}`;
    }
  },
  mounted: async function() {
    this.videoId = this.$route.query.videoId;

    try {
      let response;
      if (this.search !== "") {
        response = await axios.get(
          "https://youtube.googleapis.com/youtube/v3/videos",
          {
            params: {
              part: "statistics,snippet",

              key: this.$API_KEY,
              id: this.$route.query.videoId
            }
          }
        );
      } else {
        return;
      }

      this.videoSelectedData = response.data.items[0];
      document.title = response.data.items[0].snippet.title;
    } catch (error) {
      this.hasError = true;
    }
  }
};
</script>
