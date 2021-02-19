<template>
    <div>
        <Navbar />
         
    <div class="card mt-4">
      <div>
        <div class="card-header">
          <p class="card-title" id="subtitle">
           Profil
          </p>
         
        </div>
        <div class="card-body text-left">
          <form>
            <div class="form-group">
              <label for="lastname">Nom:</label>
              <input
                id="lastname"
                class="form-control"
                type="text"
                :placeholder="lastName"
                disabled
              />
            </div>

            <div class="form-group">
              <label for="firstname">Prénom:</label>
              <input
                id="firstname"
                class="form-control"
                type="text"
                :placeholder="firstName"
                disabled
              />
            </div>


            <div class="form-group">
              <label for="email">Email:</label>
              <input
                id="email"
                class="form-control"
                type="text"
                :placeholder="email"
                disabled
              />
            </div>
            <transition name="slide-fade">
              <div class="alert alert-danger alert-dismissible" v-if="wrong">
                Mauvais Code ! Veuillez réessayer
              </div>
            </transition>
            <div class="form-group">
              <label for="password">Mot de passe:</label>
              <input id="password" class="form-control" type="password" />
            </div>

            <div class="form-group">
              <label for="passwordconf">Confirmation du Mot de passe:</label>
              <input id="passwordconf" class="form-control" type="password" />
            </div>

            <div class="form-group">
              <button
                class="form-control"
                type="password"
              
              >
                Modifier
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
</template>
<style scoped>


#subtitle {
  font-family: Georgia, serif;
  font-size: 19px;
  font-weight: bold;
  color: #C9893C;
}
.card {
  margin-left: 10%;
  width: 80%;
  margin-top: 80%;
}
button{
  background-color: #55608f;
  width: 40%;
  color: aliceblue;
  margin-left: 30%;
}
</style>
<script>
import Navbar from "./Navbar_Prof";
export default {
    name: "Homepage",
    components: {Navbar},
    data() {
    return {
      firstName: this.$cookies.get("FnameProfessor"),
      lastName:this.$cookies.get("LnameProfessor"),
      email: this.$cookies.get("emailProfessor"),
    }
    },
    mounted(){
    
    }
  
}
</script>