<template>
  <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light">
    <router-link :to="{ name: 'home'}">
      <img alt="Vue logo" src="../../assets/Logo_Universite_Evry.png" width="160"  class="img-fluid">
    </router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNavAltMarkup"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <router-link class="nav-item nav-link active" to="/enseignant">Enseignant</router-link>
        <div class="dropdown">
          <a class="nav-item nav-link active" href="#" data-toggle="dropdown">Enseignements</a>
          <ul class="dropdown-menu">
            <li>
              <!--<a class="nav-item nav-link active" href="/branch">Enseignements</a>-->
              <router-link class="nav-item nav-link active" :to="{ name: 'branch'}">Enseignements</router-link>
            </li>
            <li>
              <!--<a class="nav-item nav-link active" href="/ncours">Enseignement non couvert</a>-->
              <router-link class="nav-item nav-link active" :to="{ name: 'ncours'}">Enseignement non couvert</router-link>

            </li>
            <li>
              <!--<a class="nav-item nav-link active" href="/demandes"
                >Demande d'enseignement</a
              >-->
              <router-link class="nav-item nav-link active" :to="{ name: 'demandes'}">Demande d'enseignement</router-link>
            </li>
          </ul>
        </div>
        <!--<a class="nav-item nav-link active" href="/profil">Profile</a>-->
        <router-link class="nav-item nav-link active" :to="{ name: 'profil'}">Profile</router-link>
        <a class="nav-item nav-link active" @click="logout()">Deconnexion</a>
      </div>
    </div>
  </nav>
</template>

<style scoped>
nav {
  background: linear-gradient(45deg, #8ea3d1, #344c80);
  
}
.navbar-brand {
  font-family: "Lato", "Lucida Grande", "Lucida Sans Unicode", Tahoma,
    Sans-Serif;
  color: #fff;
  font-size: 20px;
}
.navbar-nav{
  margin-top: 7px;
}
a{
  cursor: pointer;
}

</style>
<script>
export default {
  name: "Navbar_Prof",
  methods:{
     logout() {
            this.$cookies.remove("emailProfessor")
            this.$cookies.remove("FnameProfessor")
            this.$cookies.remove("LnameProfessor")
            this.$cookies.remove("idUser")
            this.$cookies.remove("profile")
            this.$cookies.remove("groupProfessor")
            this.$router.push("/login")
        }
  }
}
</script>

