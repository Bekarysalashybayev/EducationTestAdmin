<template>
  <div class="page">
    <div class="page-body">
      <div class="page-title font-size-24">
        <div class="back" @click="$router.push(`/variants/${variant_id}`)">
          <d-icon name="ComeBackIcon" :width="30" :height="30"/>
        </div>
        Импорт
      </div>
      <div class="page-content">
        <div class="input">
          <svg width="142" height="123" viewBox="0 0 142 123" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M29.9846 0.589849C26.3225 1.55665 23.0998 4.13477 21.2541 7.6211L20.2873 9.43751H70.9709C111.342 9.43751 121.684 9.34962 121.684 9.05665C121.684 8.29493 119.838 5.57032 118.315 4.07618C116.557 2.34766 113.862 0.882818 111.489 0.384771C110.405 0.150396 98.2463 0.0625054 70.9123 0.0918019C35.1701 0.0918019 31.7424 0.150396 29.9846 0.589849Z"
              fill="#005DAE"/>
            <path
              d="M11.967 19.1641C7.01585 20.1016 2.62132 24.2617 1.24436 29.3008C0.717019 31.1465 0.687722 33.168 0.687722 70.3164C0.687722 113.148 0.629128 111.654 2.41624 114.76C4.23264 117.895 6.66428 119.975 10.2092 121.381L11.967 122.084L70.2092 122.172C121.684 122.23 128.656 122.201 130.385 121.791C135.805 120.531 140.024 116.283 141.166 110.893C141.811 107.934 141.811 33.1094 141.166 30.1504C140.141 25.3164 136.742 21.4199 131.967 19.5742L130.326 18.959L71.8791 18.9297C35.6096 18.9004 12.8752 18.9883 11.967 19.1641ZM73.1682 38.1484C73.842 38.4707 74.633 39.1152 74.9553 39.5547C75.5412 40.3164 75.5412 40.873 75.6291 63.6953C75.6584 76.5566 75.8049 87.0742 75.9221 87.0742C76.0393 87.0742 78.6467 84.5547 81.6936 81.4785C84.7698 78.4023 87.6115 75.707 88.051 75.4726C88.4905 75.2383 89.4865 75.0625 90.2483 75.0625C92.885 75.0625 94.7307 76.9082 94.7307 79.5449C94.7307 80.3066 94.5549 81.3027 94.3205 81.7422C93.7932 82.7383 74.0471 102.396 73.0803 102.895C72.1135 103.393 70.1213 103.363 69.0959 102.807C68.5979 102.572 63.6467 97.7676 58.051 92.1426C49.1155 83.1777 47.885 81.8008 47.6799 80.834C47.0647 77.4062 50.3166 74.3887 53.5686 75.3555C54.5061 75.6484 55.883 76.8496 60.5119 81.4492L66.3127 87.1914L66.3713 64.0469L66.4592 40.9316L67.133 39.8476C67.8655 38.6758 69.799 37.5625 71.1174 37.5625C71.5862 37.5625 72.5237 37.8262 73.1682 38.1484Z"
              fill="#005DAE"/>
          </svg>
          <input type="file" accept=".txt" id="file" ref="file" v-on:change="handleFileUpload()">
        </div>
      </div>
      <div class="file-name">
        {{ file ? file.name : "" }}
      </div>
      <button class="c-btn add" @click="importQuestion">
        Импортировать
      </button>
    </div>
  </div>
</template>

<script>
import DIcon from "~/components/core/icons/DIcon";
import {mapMutations} from "vuex";

export default {
  name: "import",
  components: {DIcon},
  data() {
    return {
      variant_id: this.$route.params.id,
      lesson_id: this.$route.params.lesson,
      file: null,
    }
  },
  head: {
    title: "Импорт",
  },
  methods: {
    ...mapMutations({
      SET_LOADER: 'test/SET_LOADER'
    }),
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    async importQuestion() {
      if (!this.file) {
        this.$toast.error("Выберите файл")
        return;
      }
      let formData = new FormData();
      formData.append('file', this.file);
      this.SET_LOADER(true)
      try {
        await this.$axios.post(`super-admin/add-question/${this.lesson_id}/`, formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
        this.$toast.success("Success")
        await this.$router.push({path: `/variants/${this.variant_id}/${this.lesson_id}/questions`})
      } catch (e) {
        alert(e)
      }finally {
        this.SET_LOADER(false)
      }
    },
  },

}
</script>
<style scoped lang="scss">
.page {
  color: #000823;

  .file-name{
    text-align: center;
    margin-bottom: rem(20);
  }

  &-title {
    margin-bottom: rem(40);
    display: flex;
    align-items: center;

    .back {
      margin-right: 20px;
      cursor: pointer;

      &:hover {
        opacity: .9;
      }
    }
  }

  &-content {
    padding: rem(50) 0;
    display: flex;
    align-items: center;
    justify-content: center;

    .input {
      position: relative;
      width: 142px;
      height: 123px;

      svg, input {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
        cursor: pointer;
      }

      input {
        z-index: 2;
        opacity: 0;
      }


    }
  }
}

.c-btn {
  margin: 0 auto;
  border: 1px solid #005DAE;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  font-size: 13px;
  line-height: 16px;
  color: #005DAE;
  padding: 10px 15px;
  cursor: pointer;
  transition: all linear .3s;

  span {
    margin-right: 20px;
  }

  &::v-deep svg path {
    transition: all linear .3s;
  }

  &:hover {
    background-color: #005DAE;
    color: #FFFFFF;

    &::v-deep {
      svg path {
        fill: #FFFFFF !important;
      }
    }
  }
}
</style>
