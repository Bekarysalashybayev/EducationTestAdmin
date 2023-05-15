<template>
  <div class="page">
    <div class="page-body">
      <div class="page-title font-size-24">
        Список студентов
      </div>
      <div class="page-form">
        <div class="page-form-row">
          <div class="input">
            <div class="icon">
              <d-icon name="SearchIcon" :width="12" :height="13"/>
            </div>
            <input type="text" v-model="form.username" placeholder="Email" @input="getStudents">
          </div>
          <div class="input">
            <div class="icon">
              <d-icon name="SearchIcon" :width="12" :height="13"/>
            </div>
            <input type="number" v-model="form.user_id" placeholder="ID студента" @input="getStudents">
          </div>
        </div>
      </div>
      <div class="page-list">
        <table class="table">
          <thead>
          <tr>
            <th>ID</th>
            <th>ФИО ученика</th>
            <th>Email</th>
            <th>#</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(student, i) in students.data" :key="i">
            <td>{{ student.user_id }}</td>
            <td>{{ `${student['last_name']} ${student['first_name']}` }}</td>
            <td>{{ student.username }}</td>
            <td>
              <nuxt-link :to="`/students/${student.id}`" class="td-link">Профиль</nuxt-link>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="page-pagination">
        <client-only>
          <vs-pagination :total-pages="students.total_pages" @change="changePage"></vs-pagination>
        </client-only>
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
      form: {
        username: "",
        user_id: "",
        page: 1,
        page_size: 10,
      },
      students: {
        count: 0,
        current_page: 1,
        data: [],
        links: {
          previous: null,
          next: null,
        },
        total_pages: 0,
      },
    }
  },
  mounted() {
    this.getStudents()
  },
  methods: {
    async changePage(page){
      this.form.page = page
      await this.getStudents()
    },
    async getStudents(){
      // this.SET_LOADER(true)
      // try {
      //   const {data} = await this.$axios.get("/super-admin/get-all-students/", {params: this.form})
      //   if (data && data.data){
      //     this.students = data
      //   }
      // }catch (e) {
      //   alert(e)
      // }finally {
      //   this.SET_LOADER(false)
      // }
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
    justify-content: space-between;
  }

  &-form {

    &-row {
      display: flex;
      flex-wrap: wrap;
      align-items: center;

      .input {
        position: relative;
        flex-grow: 1;
        min-width: 200px;
        margin-bottom: rem(40);

        @media screen and (min-width: 480px) {
          &:first-child {
            margin-right: 40px;
          }
        }

        .icon {
          position: absolute;
          top: 50%;
          left: 15px;
          transform: translateY(-50%);
        }

        input {
          padding: 10px rem(15) 10px 37px;
          background: #FFFFFF;
          border: 1px solid #A5A5A5;
          border-radius: 5px;
          width: 100%;
          height: 100%;
          font-size: clamp(12px, rem(15), 15px)!important;

          &:focus{
            outline: none;
          }

          &::placeholder {
            font-size: clamp(12px, rem(15), 15px);
            color: #686868;
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

    .table {
      width: 100%;
      border-collapse: collapse;

      //tr:nth-child(even) {
      //  background-color: #f2f2f2;
      //}

      tbody tr:hover {
        background-color: #ddd;
      }

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
      td .td-link{
        color: #1864AB;

        &:hover{
          text-decoration: underline!important;
        }
      }

      th {
        font-weight: 550;
        color: #1864AB;
      }
    }

    @media screen and (max-width: 768px) {
      overflow-y: auto;
    }
  }

  &-pagination{
    margin-top: rem(30);
  }
}
</style>
