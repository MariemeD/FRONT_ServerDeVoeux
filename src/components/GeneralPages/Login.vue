<template>
  <div class="container">
    <!-- Button to Open the Modal -->
    <h1>Serveur de voeux </h1>
    <h2>Département informatique - Université d'Evry</h2>
    <h3>2020 - 2021</h3>
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal"> Connexion </button> <!-- The Modal -->
    <div class="visiteur"> <a href="/professors" class="linkVisiteur">Liste des professeurs</a> </div>
    <div class="visiteur"> <a href="/branch" class="linkVisiteur">Liste des enseignements</a> </div>
    <div class="visiteur"> <a href="#" class="linkVisiteur">Liste des enseignements non couverts</a> </div>
    <div class="modal fade" id="myModal">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <div class="modal-title"><p>Serveur de voeux</p></div>
          </div> <!-- Modal body -->
          <div class="modal-body">
            <p class="title"> Connexion </p>
            <form>
              <div class="input-group"> <input class="input--style-3" type="text" placeholder="Login*" name="email" v-model="email"> </div>
              <div class="input-group"> <input class="input--style-3" type="password" placeholder="Password*" name="password" v-model="password"> </div>
              <div class="extra"> <a href="#"><u>I forgot my password</u></a> </div>
              <div class="p-t-10"><button class="btn btn--pill btn--signin" @click.stop.prevent="Login()" @click="hideModal">CONNEXION</button></div>
              <!--<div class="p-t-10"><input type="submit" class="btn btn--pill btn--signin" value="Login" /></div>-->
              <!--<p class="title">or sign in using apps you love:</p>-->
              <!--<div class="row">
                <div class="col">
                  <div class="p-t-10"> <button class="btn btn--pill btn--green" type="submit">SIGN IN WITH GOOGLE <img src="https://img.icons8.com/color/48/000000/google-logo.png" /> </button> </div>
                </div>
                <div class="col">
                  <div class="p-t-10"> <button class="btn btn--pill btn--green" type="submit">SIGN IN WITH PODIO <img src="https://img.icons8.com/color/48/000000/podio.png" /> </button> </div>
                </div>
              </div>
              <p class="extra new">New to teamdeck? <a href="#"><u>Sign up</u></a></p>-->
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
    import axios from "axios"
    export default {
        name: "Login"
        ,mounted() {
            let externalScript = document.createElement('script')
            externalScript.setAttribute('src', 'https://code.jquery.com/jquery-3.2.1.slim.min.js')
            externalScript.setAttribute('src', 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js')
            document.head.appendChild(externalScript)
        },
        data() {
        return {
          page: [],
          email: "",
          password: "",
          wrong: ""
        };
      },
        methods: {
          hideModal() {
            this.$refs['myModal'].hide()
          },
          Login() {
          if (this.email && this.password !== "") {
            axios
                .get(
                    "http://localhost:3000/api/login/" +
                    this.email +
                    "/" +
                    this.password
                )
                .then((user) => {
                  axios
                      .get("http://localhost:3000/api/professors/")
                      .then((response) => {
                        for (let prof of response.data) {
                          console.log(prof);
                          if (prof.email === user.data.userLogin.email) {
                            console.log(user.data.userLogin);
                            this.$cookies.set("idProfessor", prof._id);
                            this.$cookies.set("idUser", user.data.userLogin._id);
                            this.$cookies.set("profile", user.data.userLogin.profile);
                            console.log(this.$cookies.get("idProfessor"));
                            console.log(this.$cookies.get("profile"));
                          }
                        }
                        if (user.data.userLogin.profile === "professeur") {
                          console.log("OK");
                          this.$router.push("/professors");
                        } else {
                          this.$router.push("/admin");
                        }
                      });
                })
                .catch((error) => {
                  console.log(error.response);
                  this.wrongPr= error.response.data.error
                });
          }
        },
      }
    }

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Poppins&display=swap');

body {
  background-color: rgb(58, 177, 2);
  font-family: Poppins,serif
}

@media(width:1024px) {
  .modal-dialog {
    max-width: 70%
  }
}

.modal-content {
  border-radius: 0.7rem
}

.modal-header img {
  width: 100px
}

.modal-title {
  margin-left: auto;
  margin-right: auto
}

.modal-header {
  border-bottom: none;
  padding-bottom: 0;
  padding-top: 4vh;
  background-color: #C9893C;
  font-size: 2vw;

}

.modal-footer {
  border-top: none
}

.modal-body{
}

button:active {
  outline: none
}

button:focus {
  outline: none
}

.modal-body {
  text-align: center
}

.title {
  font-size: 17px;
  color: grey
}

@media(min-height:768px)and(min-width:411px) {
  .title {
    font-size: 20px;
    color: grey
  }
}

form {
  padding: 3vh
}

input {
  outline: none;
  margin: 0;
  border: none;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  width: 100%;
  font-size: 14px;
  font-family: inherit
}

.input-group {
  position: relative;
  margin-bottom: 6vh;
  border-bottom: 1px solid rgba(204, 204, 204, 0.459)
}

.input--style-3 {
  font-size: 14px;
  color: rgb(143, 141, 141);
  background: transparent
}

.input--style-3::-webkit-input-placeholder {
  color: rgb(143, 141, 141)
}

.input--style-3:-moz-placeholder {
  color: #ccc;
  opacity: 1
}

.input--style-3::-moz-placeholder {
  color: #ccc;
  opacity: 1
}

.input--style-3:-ms-input-placeholder {
  color: #ccc
}

.btn {
  display: inline-block;
  line-height: 42px;
  padding: 0 33px;
  font-family: Poppins,serif;
  cursor: pointer;
  color: #fff;
  -webkit-transition: all 0.4s ease;
  -o-transition: all 0.4s ease;
  -moz-transition: all 0.4s ease;
  transition: all 0.4s ease;
  font-size: 18px;
  width: 100%;
}

.btn--pill {
  -webkit-border-radius: 20px;
  -moz-border-radius: 20px;
  border-radius: 30px;
  border: 2px solid
}

.btn--green {
  background: transparent;
  border-color: #65d849;
  color: #65d849;
  font-size: 12px;
  padding: 0
}

@media(max-width:768px) {
  .btn--green {
    font-size: 8px
  }
}

.btn--green img {
  height: 15px;
  width: 15px
}

.btn--signin {
  background: #ccc;
  color: rgb(109, 107, 107);
  font-size: 13px;
  border-color: #ccc;
  margin-bottom: 3vh
}

.extra {
  padding-bottom: 4vh;
  color: rgb(143, 141, 141);
  font-size: 13px
}

.extra a {
  color: rgb(143, 141, 141);
  font-size: 13px
}

.col {
  padding: 2vh 10px 4vh
}

.new {
  padding-bottom: 0
}

.btn-primary {
  width: 40%;
  margin: 10% 30% 5% 30%;
  background-color: #C9893C;
}

.btn-primary:hover, .btn-primary:visited{
  background-color: #344C80;
}

.btn:focus {
  box-shadow: none;
  outline: none
}

.container{
  background-color: #55608f;
  padding-top: 10%;
  padding-bottom: 10%;
  border-radius: 20px;
  box-shadow: 3px 3px 10px 5px #000;
}

h1,h2,h3{
  color: white;
  /*border: 2px solid red;*/
}


a:link, a:visited, a:hover, a:active{
  text-decoration: none;
  color: white;
}

.visiteur{
  border: 2px solid transparent;
  padding-bottom: 1.5%;
}

</style>
