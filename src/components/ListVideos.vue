<template>
  <transition name="slide-fade">
    <div class="listVideos" v-if="showVideos">
      <div
        class="listItem"
        v-for="(video, index) in videos"
        :key="index"
        v-on:click="routeTo(video.id.videoId)"
      >
        <div class="listImage">
          <img :src="video.snippet.thumbnails.high.url" alt="" />
        </div>
        <div class="listItemContent">
          <p class="listItemContentTitle">
            {{ video.snippet.title.substring(0, 100) }}
          </p>
          <p class="listItemContentSubTitle">
            {{ video.snippet.description.substring(0, 200) }}
          </p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: ["videos", "showVideos"],
  methods: {
    routeTo: function(videoId) {
      this.$router.push({
        name: "Details",
        query: { videoId: videoId }
      });
    }
  }
};
</script>

<style>
.listVideos {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.listItem {
  display: flex;
  margin: 5px 0;
  transition: linear 0.2s;
  padding: 5px 0;
}
.listItem:hover {
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
}
.listImage {
}
.listImage > img {
  max-width: 200px;
  max-height: 250px;
  height: 200px;
  width: 250px;
}
.listItemContent {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-left: 30px;
}
.listItemContentTitle {
  font-size: 1.17rem;
  max-height: 4rem;
  color: #030303;
  font-weight: 400;
  margin-bottom: 10px;
}
.listItemContentSubTitle {
  color: #606060;
}

.listItemContentTitle,
.listItemContentSubTitle,
.listButtonAction {
  font-family: "Roboto";
}
.listButtonAction {
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  background-color: #f5f5f5;
  height: 26px;
  min-width: 64px;
  max-width: 150px;
  padding: 0 16px;
  color: rgba(0, 0, 0, 0.87);
  align-items: center;
  border-radius: 4px;
  display: inline-flex;
  flex: 0 0 auto;
  font-weight: 500;
  letter-spacing: 0.0892857143em;
  justify-content: center;
  outline: 0;
  position: relative;
  text-decoration: none;
  text-indent: 0.0892857143em;
  text-transform: uppercase;
  transition: 0.2s cubic-bezier(0.4, 0, 0.6, 1);
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  vertical-align: middle;
  white-space: nowrap;
}
.listButtonAction:hover {
  transition: 0.2s cubic-bezier(0.4, 0, 0.6, 1);
  background-color: #d6d6d6;
}
@media (max-width: 768px) {
}
@media (max-width: 425px) {
  .container {
    padding: 0;
  }
  .listItem {
    display: flex;
    flex-direction: column;
    margin: 5px 0;
    margin-bottom: 15px;
    transition: linear 0.2s;
    padding: 5px 0;
    border-bottom: solid #60606067 calc(1px / 2);
  }

  .listImage > img {
    max-width: 100%;
    max-height: 100%;
    height: 210px;
    width: 100%;
  }
  .listItemContent {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin: 0 5px;
  }
  .listItemContentTitle {
    font-size: 1rem;
    max-height: 4rem;
    color: #030303;
    font-weight: 400;
  }
  .listItemContentSubTitle {
    color: #606060;
    font-size: 0.8rem;
    margin-bottom: 5px;
  }

  .listItemContentTitle,
  .listItemContentSubTitle,
  .listButtonAction {
    font-family: "Roboto";
  }
}
@media (max-width: 375px) {
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active em versões anteriores a 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
