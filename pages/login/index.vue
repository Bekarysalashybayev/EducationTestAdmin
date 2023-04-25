<template>
  <div class="login">
    <div class="form">
      <img src="../../assets/img/login-main.png" alt="" class="form-logo">
      <div class="header">
        <div class="title active">
          {{ $t('login.title') }}
        </div>
      </div>
      <form class="form__group" @submit.prevent="checkForm">
        <div
          :class="['form__group-control', {error: error.has && !form.iin }]">
          <label class="form__group-control-label" for="email">Email</label>
          <div class="input">
            <input
              type="text" id="email"
              ref="username"
              v-model="form.iin"
              placeholder="example@gmail.com"
              required>
            <div class="icon">
              <d-icon name="formUserIcon"/>
            </div>
          </div>
        </div>
        <div class="form__group-control password" :class="{error: error.has && !form.password}">
          <label class="form__group-control-label" for="pass">{{ $t('login.pass') }}</label>
          <div class="input">
            <div class="icon">
              <d-icon name="formPassIcon"/>
            </div>
            <input type="password" id="pass"
                   v-model="form.password"
                   ref="password"
                   autocomplete="off"
                   :placeholder="$t('registration.pass')"
                   required>
            <img src="../../assets/img/eyes.png" alt="" class="eyes" @click="togglePass('password')">
          </div>
        </div>
        <div class="verification-btn">
          <button @click.prevent="checkForm">{{ $t('login.btn_text') }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
import DIcon from "@/components/core/icons/DIcon";

export default {
  name: "index",
  components: {DIcon},
  layout: 'blank',
  auth: false,
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
      },
      isModal: false
    }
  },

  methods: {
    ...mapMutations({
      SET_LOADER: 'test/SET_LOADER'
    }),
    togglePass() {
      if (this.$refs.password.type === "text") {
        this.$refs.password.type = "password"
      } else {
        this.$refs.password.type = "text"
      }
    },
    checkForm() {
      this.error.has = false
      if (!this.form.iin) {
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
            username:  this.form.iin,
            password: this.form.password
          }
        })
        this.$toast.success(this.$t('login.success').toString())
        await this.$router.push(this.localePath('/students'))
      } catch (er) {
        if (er.response && er.response.data && er.response.data.detail) {
          this.$toast.error(er.response.data.detail)
        } else {
          this.$toast.error(this.$t('default.server_error').toString())
        }
      } finally {
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
  min-height: 100vh;
  justify-content: center;

  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 700px;
    width: calc(100% - 30px);
    padding: rem(30) 0;

    &-logo {
      max-width: 230px;
      max-height: 230px;
      min-height: 150px;
      height: calc(100vh / 4);
    }

    .header {
      margin: rem(66) 0 rem(60);
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;

      .title {
        flex: 0 0 rem(250);
        text-align: center;
        font-size: clamp(18px, 4vw, 25px);
        line-height: 1.2;
        color: #000823;
        padding-bottom: rem(20);
        border-bottom: 3px solid #E2E2E2;

        &.active {
          color: $main_color;
          border-bottom-color: $main_color;
          font-weight: 600;
        }
      }
    }


    &__group {
      width: 100%;
      max-width: 600px;

      &-control {
        position: relative;
        width: 100%;
        margin-top: rem(35);

        &:first-child {
          margin-top: 0;
        }

        label {
          font-weight: 400;
          font-size: 12px;
          line-height: 1.2;
          color: #686868;
          margin-bottom: 5px;
          display: block;
        }

        .icon {
          position: absolute;
          top: 50%;
          left: 0;
          width: 20px;
          height: auto;
          transform: translateY(-50%);
        }

        .input {
          position: relative;

          input {
            color: $midnight;
            font-size: 16px;
            line-height: 1.2;
            border: 0;
            border-bottom: 1px solid #686868;
            width: 100%;
            padding: 5px 5px 5px 25px;

            &::placeholder {
              font-size: 14px;
              line-height: 1.2;
              color: #929292;
            }

            &:focus {
              outline: none;
              border-bottom-color: $main_color;
              border-bottom-width: 1px;
            }

            &:-webkit-autofill {
              background-color: $white;
            }
          }
        }

        &.phone {
          .number {
            position: absolute;
            bottom: 6px;
            left: 25px;
            font-size: 16px;
            line-height: 1.2;
          }

          input {
            padding-left: 48px;
          }
        }

        &.error {
          input {
            border-bottom-color: $red !important;
          }

          label {
            color: $red !important;
          }
        }

        &.password {
          input {
            padding-right: 35px;
          }

          .eyes {
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

  @media screen and (max-width: 1120px) {
    .form {
      padding: 30px 0;

      .header {
        margin: 30px 0 50px;

        .title {
          flex: 0 0 35%;
        }
      }

      &__group {
        &-control {
          margin-top: 30px;

          label {
            font-size: 13px;
            line-height: 1.2;
          }

          input {
            font-size: 14px;
          }

          &.password {
            input {
              padding-right: 35px;
            }

            .eyes {
              width: 20px;
            }
          }
        }
      }
    }
  }
  @media screen and (max-width: 600px) {
    .form {
      padding: 10px 0;

      .header {
        margin: 30px 0 50px;

        .title {
          flex: 0 0 50%;
        }
      }
    }
  }
}

.verification-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: rem(50);

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
