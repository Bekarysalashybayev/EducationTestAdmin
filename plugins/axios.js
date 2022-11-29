export default function ({ $axios,$toast, redirect }) {
  $axios.onError(error => {
    if (error.response.request.responseURL.includes("/user/login/")) return;

    if (error.response.status == 401){
      $toast.error("Время вашего токена истек!")
      // return redirect('login')
    }
    // else if (error.response.status === 500) {
    //   $toast.error("Ошибкв сервера!")
    //   return redirect('/sorry')
    // }
  })
}
