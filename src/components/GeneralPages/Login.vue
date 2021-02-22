<template>
  <div class="container">
    <!-- Button to Open the Modal -->
    <img src="../../../public/Universite_Evry.png" class="logo">
    <h1>Serveur de voeux </h1>
    <h2>Département informatique - Université d'Evry</h2>
    <h3>2020 - 2021</h3>   
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal"> Connexion </button> <!-- The Modal -->
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal2"> Inscription </button> <!-- The Modal -->
    <div class="modal fade" id="myModal">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <div class="modal-title"><h4 style="color: white">Serveur de voeux</h4></div>
          </div> <!-- Modal body -->
          <div class="modal-body">
            <p class="title"> Connexion </p>
            <!-- ALERTS -->
            <transition name="slide-fade">
            </transition>
            <transition>
              <div class="alert alert-danger alert-dismissible" v-if="connexion.error">
                {{ errorMessage }}
              </div>
            </transition>
            <form>
              <div class="input-group"> <input class="input--style-3" type="text" placeholder="Login*" name="email" v-model.lazy="connexion.email"> </div>
              <div class="input-group"> <input class="input--style-3" type="password" placeholder="Password*" name="password" v-model.lazy="connexion.password"> </div>
              <div class="extra"> <a data-toggle="modal" data-target="#myModal3" ><u>Mot de passe oublié</u></a> </div>
              <div class="p-t-10"><button class="btn btn--pill btn--signin" @click.stop.prevent="Login()">CONNEXION</button></div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="myModal2">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <div class="modal-title"><h4 style="color: white">Serveur de voeux</h4></div>
          </div> <!-- Modal body -->
          <div class="modal-body">
            <p class="title"> Inscription </p>
            <!-- ALERTS -->
            <transition name="slide-fade">
              <div class="alert alert-success" v-if="inscription.submitted && !inscription.error">
                Votre inscription a été prise en compte avec succès !
              </div>
            </transition>
            <transition>
              <div class="alert alert-danger alert-dismissible" v-if="inscription.error">
                {{ errorMessage }}
              </div>
            </transition>
            <form>
              <div class="input-group"> <input class="input--style-3" type="text" placeholder="Email*" name="email" v-model.lazy="inscription.emailInscription"> </div>
              <div class="input-group"> <input class="input--style-3" type="password" placeholder="Mot de passe*" name="password" v-model.lazy="inscription.passwordInscription"> </div>
              <div class="input-group"> <input class="input--style-3" type="password" placeholder="Confirmer mot de passe*" name="passwordConfirmed" v-model.lazy="inscription.passwordConfirmed"> </div>
              <div class="p-t-10"><button class="btn btn--pill btn--signin" @click.stop.prevent="Register()">S'INSCRIRE</button></div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="myModal3">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <div class="modal-title"><h4 style="color: white">Serveur de voeux</h4></div>
          </div> <!-- Modal body -->
          <div class="modal-body">
            <p class="title"> Changement de mot de passe </p>
            <!-- ALERTS -->
            <transition name="slide-fade">
              <div class="alert alert-success" v-if="changePassword.submitted && !changePassword.error">
                Nouveau mot de passe envoyé
                Veuillez le changer à votre prochaine connexion
              </div>
            </transition>
            <transition>
              <div class="alert alert-danger alert-dismissible" v-if="changePassword.error">
                {{ errorMessage }}
              </div>
            </transition>
            <form>
              <div class="input-group"> <input class="input--style-3" type="text" placeholder="Email*" name="email" v-model.lazy="changePassword.emailChangement"> </div>
              <!--<div class="input-group"> <input class="input--style-3" type="password" placeholder="Nouveau Mot de passe*" name="password" v-model.lazy="changePassword.newPassword"> </div>
              <div class="input-group"> <input class="input--style-3" type="password" placeholder="Confirmer nouveau mot de passe*" name="passwordConfirmed" v-model.lazy="changePassword.newPasswordConfirmed"> </div>-->
              <div class="p-t-10"><button class="btn btn--pill btn--signin" @click.stop.prevent="passwordChange()" type="submit">CHANGER MOT DE PASSE</button></div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
    import axios from "axios"
    import $ from 'jquery'
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
          connexion:{
            page: [],
            email: "",
            password: "",
            wrong: "",
            submitted: "",
            error: false
          },
          inscription:{
            emailInscription: "",
            passwordInscription: "",
            passwordConfirmed: "",
            profile: "",
            error: false,
            submitted: false,
          },
          changePassword:{
            emailChangement: "",
            newPassword: "",
            newPasswordConfirmed: "",
            error: false,
            submitted: false
          }
          ,
          errorMessage: ""
        };
      },
        methods: {
          Login() {
            this.connexion.submitted = true;
            if (this.connexion.email && this.connexion.password !== "") {
            axios
                .get(
                    "https://back-serverdevoeux.herokuapp.com/api/login/" +
                    this.connexion.email +
                    "/" +
                    this.connexion.password
                )
                .then((user) => {
                  axios
                      .get("https://back-serverdevoeux.herokuapp.com/api/professors")
                      .then((response) => {
                        for (let prof of response.data) {
                          console.log(prof);
                          console.log(user.data.userLogin)
                          if (prof.email === user.data.userLogin.email) {
                            console.log(user.data.userLogin);
                            this.$cookies.set("emailProfessor", prof.email);
                            this.$cookies.set("FnameProfessor", prof.firstName);
                            this.$cookies.set("LnameProfessor", prof.lastName);
                            this.$cookies.set("idUser", user.data.userLogin._id);
                            this.$cookies.set("profile", user.data.userLogin.profile);
                            console.log(this.$cookies.get("emailProfessor"));
                            console.log(this.$cookies.get("profile"));
                          }
                        }
                        if (user.data.userLogin.profile === "professeur") {
                          this.$router.push("/professors");
                          $('#myModal').modal('hide')
                          this.$refs['myModal'].hide();
                        } else {
                          this.$router.push("/admin");
                          $('#myModal').modal('hide')
                          this.$refs['myModal'].hide();
                        }
                      });
                })
                .catch((error) => {
                  console.log(error.response);
                  this.connexion.error = true
                  this.connexion.email = ""
                  this.connexion.password =""
                  this.connexion.submitted = false
                  switch(error.response.status) {
                    case 401:
                      this.errorMessage = "Utilisateur ou mot de passe incorrect"
                      break;
                    default:
                      this.errorMessage = "Une erreur est survenue lors de votre inscription.. Réessayez !"
                      break;
                  }
                });
          }
        },
          Register(){
            this.inscription.submitted = true;
            if(this.inscription.emailInscription && this.inscription.passwordInscription && this.inscription.passwordConfirmed !== "") {
              let userRegistered = {
                email: this.inscription.emailInscription,
                password: this.inscription.passwordInscription,
              }
              if (this.inscription.passwordInscription !== this.inscription.passwordConfirmed) {
                this.inscription.error = true
                this.errorMessage = "Les mots de passe saisis sont différents, assurez vous de mettre le même mot de passe dans les deux champs."
              } else {
                axios.post("https://back-serverdevoeux.herokuapp.com/api/user", userRegistered).then(
                    response => {
                      this.inscription.error = false
                      console.log(response)
                      this.inscription.emailInscription = ""
                      this.inscription.passwordConfirmed = ""
                      this.inscription.passwordInscription = ""
                    }
                ).catch(error => {
                  console.log(error)
                  this.inscription.error = true
                  this.inscription.submitted = false
                  switch (error.response.status) {
                    case 401:
                      this.errorMessage = "Utilisateur déjà existant ! Connectez-vous !"
                      break;
                    case 403:
                      this.errorMessage = "Votre email professeur n'existe pas dans notre base. Contactez l'administrateur !"
                      break;
                    default:
                      this.errorMessage = "Une erreur est survenue lors de votre inscription.. Réessayez !"
                      break;
                  }
                })
              }
            }else
            {
              this.inscription.submitted = false
              this.inscription.error = true
              this.errorMessage = "Remplissez tous les champs"
            }
          },
          passwordChange(){
            this.changePassword.submitted = true;
            let userReset = {
              email: this.changePassword.emailChangement,
            }
            if(this.changePassword.emailChangement === ""){
              this.changePassword.error = true
              this.errorMessage = "Remplissez le champ email"
            }
            else {
              axios.post("https://back-serverdevoeux.herokuapp.com/api/reset", userReset)
                  .then(
                  response => {
                    this.changePassword.submitted = true
                    this.changePassword.error = false
                    console.log(response)
                    this.changePassword.emailChangement = ""
                  }
              ).catch(error => {
                  console.log(error)
                  this.changePassword.error = true
                  this.changePassword.submitted = false
                  console.log(error)
                  switch(error.response.status) {
                    case 404:
                      this.errorMessage = "Utilisateur inexistant"
                      break;
                    default:
                      this.errorMessage = "Une erreur est survenue... Réessayez !"
                      break;
                  }
              })
            }
          }
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

.input--style-3{
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
  /*padding: 0 33px;*/
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
  margin: 5% 3%;
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
  color: black;
}

.visiteur{
  border: 2px solid transparent;
  padding-bottom: 1.5%;
}

.logo{
  width: 40%;
}


</style>
