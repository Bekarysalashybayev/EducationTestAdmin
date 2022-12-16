<template>
  <div class="page">
    <div class="page-body">
      <div class="page-title">
        <div class="back" @click="$router.push(`/variants`)">
          <d-icon name="ComeBackIcon" :width="30" :height="30"/>
        </div>
        Создание варианта
      </div>
      <div class="add-form" @submit.prevent="checkForm">
        <form>
          <div class="row-group">
            <label for="name">Название <span>*</span></label>
            <input type="text" class="row-group-control" id="name"
                   v-model="form.name"
                   :class="{error: this.$v.form.name.$dirty && !this.$v.form.name.required}"
            >
          </div>
          <button class="c-btn">
            Добавить тест
          </button>
        </form>
      </div>

    </div>
  </div>
</template>

<script>
import {validationMixin} from 'vuelidate'
import {required} from 'vuelidate/lib/validators'
import DIcon from "~/components/core/icons/DIcon";

export default {
  name: "index",
  components: {DIcon},
  mixins: [validationMixin],
  data() {
    return {
      form: {
        name: '',
      },
      errorForm: false,
    }
  },
  validations: {
    form: {
      name: {required},
    },
  },
  created() {
  },
  methods: {

    checkForm() {
      this.$v.form.$touch()
      if (!this.$v.form.$error) {
        this.add()
      } else {
        this.errorForm = true
      }
    },
    async add() {
      try {
        const {data} = await this.$axios.post('/super-admin/create-variant/', this.form)
        if (data) {
          this.form = {
            name: '',
          }
          this.variants = []
          this.$toast.success('Вариант успешно создан!!!')
          await this.$router.push('/variants')
        }
      } catch (e) {
        alert(e)
      }
    },
  },
}
</script>

<style scoped>
@import "assets/css/form.css";
</style>
<style scoped lang="scss">
.page {
  color: #000823;

  &-title {
    margin-bottom: rem(40);
    display: flex;
    align-items: center;
    .back{
      margin-right: 15px;
      cursor: pointer;
      &:hover{
        opacity: .9;
      }
    }
  }
}

.c-btn {
  margin-top: 16px;
  border: 1px solid #005DAE;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  font-size: 15px;
  line-height: 18px;
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

  &.add {
    width: 150px;
    background-color: #005DAE;
    color: #FFFFFF;

    &::v-deep {
      svg path {
        fill: #FFFFFF !important;
      }
    }

    &:hover {
      background-color: #FFFFFF;
      color: #005DAE;

      &::v-deep {
        svg path {
          fill: #005DAE !important;
        }
      }
    }
  }
}
</style>

