<template>
  <div :class="['side-bar', {open: isOpen}]">
    <div class="side-bar__inner">
      <div class="block">
        <div class="links">
          <div class="links__user">
            <div class="links__user-icon">
              <d-icon name="UserIcon" :width="`100%`" :height="`100%`"/>
            </div>
            <div class="links__user-data closed">
              <div class="links__user-data-name">
                {{ currentUser.first_name + " " + currentUser.last_name + " " + currentUser.middle_name }}
              </div>
              <div class="links__user-data-iin">
                {{ currentUser.iin }}
              </div>
            </div>
          </div>
          <div class="links__page">
            <nuxt-link :to="localePath({path: `/${link.url}`})" class="links__page-link"
                       v-for="(link, i) in links" :key="i">
              <div class="links__page-link-icon">
                <d-icon :name="link.icon" :width="16" :height="20"/>
              </div>
              <div class="links__page-link-name closed">
                {{ $t(`side_bar.${link.name}`) }}
              </div>
            </nuxt-link>
          </div>
          <div class="links__logout links__page">
            <div class="links__page-link" @click="logOut">
              <div class="links__page-link-icon">
                <d-icon name="LogoutIcon" />
              </div>
              <div class="links__page-link-name closed">
                {{ $t('side_bar.logout') }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DIcon from "@/components/core/icons/DIcon";

export default {
  name: "SideBar",
  components: {DIcon},
  props: {
    isOpen: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      links: [
        {
          name: "pass",
          icon: "PastTestIcon",
          url: "ent/",
        },
        {
          name: "rule",
          icon: "RulesIcon",
          url: "rules/",
        }
      ],
      currentUser: {
        gmail: '',
        avatar: '',
        first_name: '',
        last_name: '',
        middle_name: '',
        iin: '',
      }
    }
  },
  created() {
    this.authMe()
  },
  methods: {
    close() {
      this.$emit('close')
    },
    async logOut() {
      await this.$auth.logout()
    },
    async authMe(){
      try {
        const {data} = (await this.$axios.get('user/me/'))
        if (data){
          this.currentUser = data
          await this.$store.dispatch('user/authUser', this.currentUser)
        }
      }
      catch (e) {
        this.$toast.error(this.$t('login,auth_error').toString())
        await this.logOut()
      }
    },
  },
}
</script>

<style scoped lang="scss">
.nuxt-link-exact-active, .nuxt-link-active{
  color: $white!important;
  background-color: $main_color!important;
  font-weight: bold;

  &::v-deep svg path{
    fill: $white;
  }
}
.side-bar {
  position: fixed;
  left: 0;
  top: 5rem;
  width: 100px;
  height: calc(100vh - 5rem);
  @include default_shadow;
  overflow: hidden;
  transition: width linear .1s;

  &__inner {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .closed{
    visibility: hidden;
    opacity: 0;
    height: 0;
    transition: all ease-in-out .05s;
  }

  &.open {
    width: 300px;

    .closed{
      visibility: visible;
      opacity: 1;
      height: auto;
    }
  }


  .block {
    width: 100%;
    height: 100%;
    background-color: $default_sb_bg_color;
    overflow: hidden;

    &:hover {
      overflow-y: auto;
    }

    .links {
      padding-bottom: 60px;

      &__user {
        display: flex;
        align-items: center;
        padding: rem(20);
        border-bottom: 1px solid #A5A5A5;

        &-icon {
          width: rem(50);
          height: rem(50);
          min-width: 40px;
          min-height: 40px;
          overflow: hidden;
        }

        &-data {
          margin-left: 15px;

          &-name {
            font-weight: 500;
            font-size: clamp(14px, 4vw, 18px);
            line-height: 1.2;
            color: $main_color;
            margin-bottom: rem(15);
          }

          &-iin {
            font-weight: 400;
            font-size: clamp(10px, 4vw, 13px);
            line-height: 1.2;
            letter-spacing: 0.05em;
            color: $midnight;
          }
        }
      }

      &__page {
        &-link {
          display: flex;
          align-items: center;
          padding: 20px 40px;
          background-color: $white;
          cursor: pointer;
          color: $midnight;

          &-icon {
          }

          &-name {
            margin-left: 15px;
            font-weight: 400;
            font-size: 17px;
            line-height: 20px;
          }

          &:hover {
            background: rgba(91, 158, 217, .6);
          }
        }
      }

      &__logout{
        height: 60px;
        width: 100%;
        position: absolute;
        left: 0;
        bottom: 0;
        border-top: 1px solid #A5A5A5;
        background-color: $white;
      }
      &__logout .links__page-link{
        color: $red!important;

        &::v-deep svg path{
          fill: $red!important;;
        }
      }
    }
  }


  @media screen and (max-width: $desktop_min_size) {
    width: 100px;

    &.open {
      width: 100vw;

      .side-bar__inner {
        background-color: rgba(12, 12, 12, 0.5);
      }

      .block {
        width: 300px;
      }
    }
  }
  @media screen and (max-width: $laptop_size) {
    width: 0;

    &.open {
      .block {
        width: 300px;
      }
    }
  }
}
</style>
