<template>
  <div class="login">
    <div class="form">
      <img src="../../assets/img/login-main.png" alt="" class="form-logo">
      <div class="title">
        {{ $t('login.title') }}
      </div>
      <form class="form__group" @submit.prevent="checkForm">
        <div class="form__group-control">
          <input :class="{error: (error.has && !form.iin) || (error.has && form.iin.length !== 12) }"
                 type="number" id="iin"
                 v-model="form.iin"
                 required>
          <label class="form__group-control-label" for="iin">{{ $t('login.iin') }}</label>
        </div>
        <div class="form__group-control password">
          <input :class="{error: error.has && !form.password}"
                 type="password" id="pass"
                 v-model="form.password"
                 ref="password"
                 required>
          <img src="../../assets/img/eyes.png" alt="" class="eyes" @click="togglePass">
          <label class="form__group-control-label" for="pass">{{ $t('login.pass') }}</label>
        </div>
        <div class="forgot">
          <div>
            {{ $t('login.forgot') }}
          </div>
        </div>
        <div class="privacy">
          <input type="checkbox" v-model="isPrivacy">
          <div class="text">
            {{ $t('login.privacy.text1') }}
            <nuxt-link to="/" class="d-link">{{ $t('login.privacy.text2') }}</nuxt-link>
            {{ $t('login.privacy.and') }}
            <nuxt-link to="/" class="d-link">{{ $t('login.privacy.text3') }}</nuxt-link>
            .
          </div>
        </div>
        <div class="verification-btn">
          <button @click.prevent="checkForm"
                  :disabled="!isPrivacy">{{ $t('login.btn_text') }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'

export default {
  name: "index",
  layout: 'blank',
  data() {
    return {
      isPrivacy: true,
      form: {
        iin: null,
        password: null,
      },
      error: {
        name: "",
        has: false,
      }
    }
  },
  methods: {
    ...mapMutations({
      SET_LOADER: 'test/SET_LOADER'
    }),
    togglePass(){
      if (this.$refs.password.type === "text"){
        this.$refs.password.type = "password"
      }else{
        this.$refs.password.type = "text"
      }
    },
    checkForm() {
      this.error.has = false
      if (!this.form.iin || this.form.iin.length !== 12) {
        this.error.has = true
        return;
      }
      if (!this.form.password) {
        this.error.has = true
        return;
      }
      if (!this.error.has) {
        this.login()
      }
    },
    async login() {
      this.SET_LOADER(true)
      try {
        await this.$auth.loginWith('local', {
          data: {
            iin: this.form.iin,
            password: this.form.password
          }
        })
        this.$toast.success(this.$t('login.success').toString())
      } catch (er) {
        if (er.response && er.response.data && er.response.data.detail) {
          this.$toast.error(er.response.data.detail)
        } else {
          this.$toast.error(this.$t('default.server_error').toString())
        }
      }finally {
        this.SET_LOADER(false)
      }
    },
  }
}
</script>

<style scoped lang="scss">
.login {
  display: flex;
  flex-direction: column;
  align-items: center;

  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 700px;
    min-height: 100vh;
    width: calc(100% - 30px);
    padding: rem(30) 0;

    &-logo {
      max-width: 230px;
      max-height: 230px;
      min-height: 150px;
      height: calc(100vh / 4);
    }

    .title {
      font-weight: 600;
      font-size: clamp(18px, 4vw, 35px);
      line-height: 1.2;
      color: $main_color;
      margin-top: rem(30);
      margin-bottom: rem(60);
    }

    &__group {
      width: 100%;
      max-width: 600px;

      &-control {
        position: relative;
        width: 100%;
        margin-top: rem(50);

        &:first-child {
          margin-top: 0;
        }

        label {
          font-weight: 400;
          font-size: 14px;
          line-height: 16px;
          color: #686868;
          position: absolute;
          top: 50%;
          left: 5px;
          transform: translateY(-50%);
          transition: all linear .15s;
        }

        input {
          color: $midnight;
          font-size: 16px;
          line-height: 1.2;
          border: 0;
          border-bottom: 1px solid #686868;
          width: 100%;
          padding: 5px;

          &:focus {
            outline: none;
            border-bottom-color: $main_color;
            border-bottom-width: 2px;
          }

          &:focus ~ label, &:not(:focus):valid ~ label {
            top: -10px;
            left: 0;
            color: $main_color;
          }

          &:not(:focus):valid ~ label {
            color: #686868;
          }

          &.error {
            border-bottom-color: $red !important;
          }

          &.error ~ label {
            color: $red !important;
          }
        }

        &.password{
          input{
            padding-right: 35px;
          }
          .eyes{
            position: absolute;
            top: 50%;
            right: 5px;
            transform: translateY(-50%);
            width: 25px;
            height: auto;
            cursor: pointer;
          }
        }
      }
    }

  }
}

.privacy {
  display: flex;
  align-items: center;
  margin-bottom: rem(50);
  margin-top: rem(50);

  input {
    width: 25px;
    height: 25px;
    accent-color: $midnight;
  }

  .text {
    font-weight: 400;
    font-size: 14px;
    line-height: 25px;
    color: $midnight;
    margin-left: 10px;
  }

  .d-link {
    color: $main_color;
    font-weight: 500;

    &:hover {
      text-decoration: underline !important;
    }
  }
}

.verification-btn {
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    font-weight: 600;
    font-size: clamp(15px, 4vw, 20px);
    line-height: 1.2;
    padding: rem(15) rem(50);
    background: $main_color;
    color: $white;
    border: 0;

    &:disabled {
      border: 1px solid #999999;
      background-color: #cccccc;
      color: #666666;
    }
  }
}

.forgot {
  margin-top: rem(20);
  font-weight: 400;
  font-size: 17px;
  line-height: 20px;
  color: $midnight;
  display: flex;
  justify-content: flex-end;

  div {
    cursor: pointer;
  }
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>
