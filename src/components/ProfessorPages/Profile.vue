<template>
  <div v-if="this.$cookies.get('emailProfessor') !== null">
    <Navbar />

    <div class="card">
      <div class="card-header">
        <p class="card-title" id="subtitle">Profile</p>
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
            <input
              id="password"
              class="form-control"
              v-model.lazy="password"
              type="password"
              required
            />
          </div>

          <div class="form-group">
            <label for="passwordconf">Confirmation du Mot de passe:</label>
            <input
              id="passwordconf"
              class="form-control"
              v-model.lazy="npassword"
              type="password"
              required
            />
          </div>

          <div class="form-group">
            <button
              class="form-control"
              type="password"
              @click="updatePassword()"
            >
              Modifier
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <div
    class="card alert alert-danger alert-dismissible"
    style="height: 200px; width: 500px; margin-left: 30%; margin-top: 50px"
    v-else
  >
    <div style="margin-top: 50px">
      Veuillez vous connecter pour accéder aux données. <br />
      <router-link :to="{ name: 'login'}">Se connecter</router-link>
    </div>
  </div>
</template>
<style scoped>
#subtitle {
  font-family: Georgia, serif;
  font-size: 19px;
  font-weight: bold;
  color: #c9893c;
}
.card {
  margin-left: 10%;
  width: 80%;
  margin-top: 7%;
}
button {
  background-color: #55608f;
  width: 40%;
  color: aliceblue;
  margin-left: 30%;
}
</style>
<script>
import Navbar from "./Navbar_Prof";
import axios from "axios";

export default {
  name: "Homepage",
  components: { Navbar },
  data() {
    return {
      firstName: this.$cookies.get("FnameProfessor"),
      lastName: this.$cookies.get("LnameProfessor"),
      email: this.$cookies.get("emailProfessor"),
      wrong: false,
      password: "",
      npassword: "",
    };
  },
  mounted() {
    console.log(
      "https://back-serverdevoeux.herokuapp.com/api/user/" +
        this.$cookies.get("emailProfessor")
    );
  },
  methods: {
    updatePassword() {
      if (this.password === this.npassword) {
        axios
          .put(
            "https://back-serverdevoeux.herokuapp.com/api/user/" +
              this.$cookies.get("emailProfessor")+"/password",
            {
              password: this.password,
            }
          )
          .then((response) => {
            console.log(response);
            console.log("done");
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.wrong = true;
      }
    },
  },
};
</script>
