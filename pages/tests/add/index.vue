<template>
  <div class="page">
    <div class="page-body">
      <div class="page-title font-size-24">
        <div class="back" @click="$router.push(`/tests`)">
          <d-icon name="ComeBackIcon" :width="30" :height="30"/>
        </div>
        Тест
      </div>
      <div class="add-form" @submit.prevent="checkForm">
        <form>
          <div class="row-group-multi">
            <div class="form-group">
              <label for="name">Название <span>*</span></label>
              <input type="text" class="row-group-control" id="name"
                     placeholder="Введите название"
                     v-model="form.name"
                     :class="{error: this.$v.form.name.$dirty && !this.$v.form.name.required}"
              >
            </div>
          </div>
          <div class="row-group-multi">
            <div class="form-group">
              <label for="start_time">Начало <span>*</span></label>
              <input type="datetime-local" class="row-group-control" id="start_time"
                     v-model="form.start_time"
                     :class="{error: this.$v.form.start_time.$dirty && !this.$v.form.start_time.required}"
              >
            </div>
            <div class="form-group">
              <label for="end_time">Окончание <span>*</span></label>
              <input type="datetime-local" class="row-group-control" id="end_time"
                     v-model="form.end_time"
                     :class="{error: this.$v.form.end_time.$dirty && !this.$v.form.end_time.required}"
              >
            </div>
          </div>
          <div class="row-group-multi">
            <div class="form-group">
              <label for="school">Организация <span>*</span></label>
              <select  class="row-group-control" id="school"
                       v-model="form.school"
                      :class="{error: this.$v.form.school.$dirty && !this.$v.form.school.required}"
              >
                <option :value="null" disabled>Выберите школу</option>
                <option :value="s.id" v-for="(s, i) in schools" :key="i">
                  {{ s.name }}
                </option>
              </select>
            </div>
          </div>
          <div class="row-group-multi">
            <div class="form-group">
              <label for="school">Организация <span>*</span></label>
              <multiselect v-model="form.variants"
                           :options="variants"
                           :multiple="true"
                           track-by="id"
                           label="name"
              ></multiselect>
            </div>
          </div>
          <button class="c-btn" @click.prevent="checkForm">
            Добавить тест
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import DIcon from "@/components/core/icons/DIcon";
import {validationMixin} from 'vuelidate'
import {required} from 'vuelidate/lib/validators'
import {mapMutations} from "vuex";
import Multiselect from 'vue-multiselect'
import Vue from "vue";
Vue.component('multiselect', Multiselect)
export default {
  name: "index",
  components: {DIcon},
  mixins: [validationMixin],
  data(){
    return{
      schools: [],
      variants: [],
      form: {
        name: null,
        start_time: null,
        end_time: null,
        school: null,
        variants: [],
      }
    }
  },
  validations: {
    form: {
      name: {required},
      start_time: {required},
      end_time: {required},
      school: {required},
    },
  },
  mounted() {
    this.getSchools()
    this.getVariants()
  },
  methods: {
    async checkForm() {
      this.$v.form.$touch()
      if (!this.$v.form.$error) {
        this.form.variants = this.form.variants.map((e) => {
          return {
            variant: e.id
          }
        })
        await this.add()
      }
    },
    async add() {
      this.SET_LOADER(true)
      try {
        await this.$axios.post('/super-admin/create-test/', this.form)
        this.$toast.success('Тест успешно создан!!!')
        await this.$router.push('/tests')
      } catch (e) {
        alert(e)
      }finally {
        this.SET_LOADER(false)
      }
    },
    async getVariants() {
      this.SET_LOADER(true)
      try {
        const {data} = await this.$axios.get("/super-admin/variant-list/?page_size=1000")
        if (data) {
          this.variants = data.data
        }
      } catch (e) {
        alert(e)
      } finally {
        this.SET_LOADER(false)
      }
    },
    async getSchools() {
      this.SET_LOADER(true)
      try {
        const {data} = await this.$axios.get("/quizzes/school/all/")
        if (data) {
          this.schools = data
        }
      } catch (e) {
        alert(e)
      } finally {
        this.SET_LOADER(false)
      }
    },
    ...mapMutations({
      SET_LOADER: 'test/SET_LOADER'
    }),
  },

}
</script>

<style scoped lang="scss">
.page {
  color: #000823;

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
}
.c-btn {
  border: 1px solid #005DAE;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  color: #005DAE;
  padding: 5px 10px;
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
<style scoped src="../../../assets/css/form.css"></style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
