<template>
  <div class="page">
    <div class="page-body">
      <div class="page-title">
        <div class="back" @click="$router.push(`/students`)">
          <d-icon name="ComeBackIcon" :width="30" :height="30"/>
        </div>
        Страница профиля
      </div>
      <div class="page-user" v-if="student">
        <div class="page-user-icon">
          <d-icon name="UserProfileIcon" :width="100" :height="100"/>
        </div>
        <div class="page-user-data">
          <div class="page-user-data-name font-size-24">
            {{ student['last_name'] }} {{ student['middle_name'] }} {{ student['first_name'] }}
          </div>
          <div class="page-user-data-description font-size-15">
            <div class="label">ID:</div>
            <div class="value">{{ student.user_id }}</div>
          </div>
          <div class="page-user-data-description font-size-15">
            <div class="label">Телефон:</div>
            <div class="value">{{ student.phone }}</div>
          </div>
          <div class="page-user-data-description font-size-15">
            <div class="label">Текущий баланс:</div>
            <div class="value">{{ student.balance }} ₸</div>
          </div>
          <div class="page-user-data-description font-size-15">
            <div class="label">Баланс:</div>
            <div class="add-form">
              <input type="number" placeholder="Введите баланс" v-model="balance">
              <button @click="addBalance">Добавить</button>
            </div>
          </div>
        </div>
      </div>
      <div class="page-list">
        <table class="table">
          <thead>
          <tr>
            <th>Дата покупки</th>
            <th>Цена</th>
            <th>Статус</th>
            <th>#</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(history, i) in histories" :key="i">
            <td>{{ $moment(history.created).format("DD.MM.YYYY HH:MM") }}</td>
            <td>{{ history.balance }}</td>
            <td class="td-status">Пройден</td>
            <td></td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import DIcon from "@/components/core/icons/DIcon";
import {mapMutations} from "vuex";

export default {
  name: "index",
  components: {DIcon},
  data() {
    return {
      id: this.$route.params.id,
      student: null,
      histories: [],
      balance: null,
    }
  },
  mounted() {
    this.getStudent()
    this.getHistory()
  },
  methods: {
    async addBalance(){
      if (!this.id) return;
      if (!this.balance){
        this.$toast.error("Напишите сумму")
        return;
      }
      this.SET_LOADER(true)
      try {
        await this.$axios.post(`/user/add-balance/`, {
          student: this.id,
          balance: parseInt(this.balance),
        })
        this.balance = null
        await this.getHistory()
      }catch (e) {
        alert(e)
      }finally {
        this.SET_LOADER(false)
      }
    },
    async getStudent() {
      this.SET_LOADER(true)
      try {
        const {data} = await this.$axios.get(`/super-admin/student/${this.id}/`)
        if (data) {
          this.student = data
        }
      } catch (e) {
        if (e.response && e.response.data && e.response.data.detail) {
          this.$toast.error(e.response.data.detail)
        }
        await this.$router.push('/students')
      } finally {
        this.SET_LOADER(false)
      }
    },
    async getHistory() {
      this.SET_LOADER(true)
      try {
        const {data} = await this.$axios.get(`/user/balance-history/?student=${this.id}`)
        if (data) {
          this.histories = data
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

  &-user {
    display: flex;

    &-icon {
      margin-right: 30px;
    }

    &-data {

      &-name {

      }

      &-description {
        display: flex;
        margin-top: 12px;

        .label {
          width: 150px;
        }

        .add-form {
          input {
            background: #FFFFFF;
            border: 1px solid #A5A5A5;
            border-radius: 5px;
            padding: 5px 10px;
            font-size: 12px !important;
            line-height: 14px !important;
            margin-right: 10px;

            &:focus {
              outline: none;
            }

            &::placeholder {
              color: #686868;
            }
          }

          button {
            background: #005DAE;
            border-radius: 5px;
            padding: 5px 10px;
            color: #FFFFFF;
            font-weight: 500;
            font-size: 15px;
            line-height: 18px;
          }
        }
      }
    }
  }

  &-list {
    background: #FFFFFF;
    border: 1px solid #A5A5A5;
    border-radius: 10px;
    padding: rem(20);
    margin-top: rem(40);

    .table {
      width: 100%;
      border-collapse: collapse;

      th, td {
        font-size: 13px;
        line-height: 16px;
        color: #000823;
        text-align: left;
        padding: rem(16) 5px;
        border-bottom: 0.5px solid #A5A5A5;
      }
      tbody tr:last-child td{
        border-bottom: 0;
      }
      td.td-status{
        color: #009B22;
        font-weight: 550;
      }
      td .td-link{
        color: #005DAE;

        &:hover{
          text-decoration: underline!important;
        }
      }

      th {
        font-weight: 550;
        color: #005DAE;
      }
    }

    @media screen and (max-width: 768px) {
      overflow-y: auto;
    }
  }
}
</style>
