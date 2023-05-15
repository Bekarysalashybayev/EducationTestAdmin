<template>
  <div class="login">
    <div class="form">
      <div class="header">
        <div class="title active">
          {{ $t('login.title') }}
        </div>
      </div>
      <form class="form__group" @submit.prevent="checkForm">
        <div
          :class="['form__group-control', {error: error.has && !form.iin }]">
          <div class="input">
            <input
              type="text" id="email"
              ref="username"
              v-model="form.iin"
              placeholder="Email"
              required>
            <div class="icon">
              <d-icon name="formUserIcon"/>
            </div>
          </div>
        </div>
        <div class="form__group-control password" :class="{error: error.has && !form.password}">
          <div class="input">
            <div class="icon">
              <d-icon name="formPassIcon"/>
            </div>
            <input type="password" id="pass"
                   v-model="form.password"
                   ref="password"
                   autocomplete="off"
                   :placeholder="$t('login.pass')"
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
            username: this.form.iin,
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
  background: linear-gradient(90deg, rgba(97, 169, 237, 1) 25%, rgba(29, 138, 231, 1) 35%, rgba(24, 100, 171, 1) 100%);

  .form {
    background-color: $white;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 400px;
    width: calc(100% - 30px);
    padding: rem(30);
    border-radius: 10px;
    -webkit-box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
    -moz-box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
    box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);


    &-logo {
      max-width: 230px;
      max-height: 230px;
      min-height: 150px;
      height: calc(100vh / 4);
    }

    .header {
      margin: 20px 0 rem(60);
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

        .icon {
          position: absolute;
          top: 50%;
          left: 15px;
          width: 20px;
          height: auto;
          transform: translateY(-50%);
        }

        .input {
          position: relative;

          &:deep(svg) {
            path {
              fill: #1864ab;
            }
          }

          input {
            color: $midnight;
            font-size: 16px;
            line-height: 1.2;
            border: 1px solid #1864ab;
            border-radius: 10px;
            width: 100%;
            padding: 15px 15px 15px 45px;

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

        &.error {
          input {
            border-color: $red !important;

            &::placeholder {
              color: $red !important;
            }
          }
        }

        &.password {
          input {
            padding-right: 45px;
          }

          .eyes {
            position: absolute;
            top: 50%;
            right: 15px;
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
    width: 100%;
    border-radius: 10px;

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
