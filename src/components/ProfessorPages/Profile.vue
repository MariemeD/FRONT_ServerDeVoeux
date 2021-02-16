<template>
    <div>
        <Navbar />
         <p id="title">Profil</p>
    <div class="card mt-4">
      <div >
        <div class="card-header">
          <p class="card-title" id="subtitle">
           test
          </p>
          <p class="card-subtitle text-muted">name</p>
        </div>
        <div class="card-body text-left">
          <form>
            <div class="form-group">
              <label for="lastname">Nom:</label>
              <input
                id="lastname"
                class="form-control"
                type="text"
                
                disabled
              />
            </div>

            <div class="form-group">
              <label for="firstname">Prénom:</label>
              <input
                id="firstname"
                class="form-control"
                type="text"
               
                disabled
              />
            </div>

            <div class="form-group">
              <label for="studentNumber">Numéro Etudiant:</label>
              <input
                id="studentNumber"
                class="form-control"
                type="text"
               
                disabled
              />
            </div>

            <div class="form-group">
              <label for="group">Groupe:</label>
              <input
                id="group"
                class="form-control"
                type="text"
               
                disabled
              />
            </div>

            <div class="form-group">
              <label for="email">Email:</label>
              <input
                id="email"
                class="form-control"
                type="text"
                :placeholder="test"
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
<script>
import Navbar from "./Navbar_Prof";
export default {
    name: "Homepage",
    components: {Navbar}
}
</script>