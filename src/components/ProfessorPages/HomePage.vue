<template>
  <div>
    <Navbar />

    <div class="container">
      <div class="row pt-3">
        <div class="card">
          <div id="server-card" >
            <div id="div-professor-icon" style="margin-top:10px">
              <font-awesome-icon
                id="professor-icon"
                icon="users"
                size="4x"
                style="color: #c9893c"
              />
            </div>
            <!--<a href="/enseignant">
              <h4 class="mt-3 mb-0 text-uppercase">- Enseignants</h4>
            </a>-->
            <h4 class="mt-3 mb-0 text-uppercase">
              <router-link class="nav-link" :to="{ name: 'enseignant'}">- Enseignant</router-link>
            </h4>
            <!--<a href="/branch">
              <h4 class="mt-3 mb-0 text-uppercase">- Enseignements</h4>
            </a>-->
            <h4 class="mt-3 mb-0 text-uppercase">
              <router-link class="nav-link" :to="{ name: 'branch'}">- Enseignements</router-link>
            </h4>
          </div>
        </div>

        <div class="card">
          <div id="studings-card" >
            <div id="div-studings-icon" style="margin-top:10px">
              <font-awesome-icon
                id="studings-icon"
                icon="book"
                size="4x"
                style="color: #c9893c;"
              />
            </div>
            <a href="#" @click="setCookie()">
              <h4 class="mt-3 mb-0 text-uppercase">- Mon Service</h4></a
            >
            <!--<a href="/demandes">
              <h4 class="mt-3 mb-0 text-uppercase">- Mes Demandes</h4></a
            >-->
            <h4 class="mt-3 mb-0 text-uppercase">
              <router-link class="nav-link" :to="{ name: 'demandes'}">- Mes Demandes</router-link>
            </h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "./Navbar_Prof";
import axios from "axios";

export default {
  name: "Homepage",
  components: { Navbar },
  data() {
    return {
      professors: [],
    };
  },
  mounted() {
     axios
      .get("http://146.59.195.214:8006/api/v1/teachers/all")
      .then((response) => {
        response.data.forEach((prof) => {
          if (prof.email === this.$cookies.get("emailProfessor")) {
            this.professors.push({
              firstName: prof.firstName,
              lastName: prof.lastName,
              origin: prof.department,
              email: prof.email,
              status: prof.status,
              serviceStatutaire: prof.service,
            });

          }
          console.log(this.professors)
          
        });
      });
  },
  methods: {
    setCookie() {
       this.$cookies.set("prof", this.professors[0]);
       this.$router.push("/professorService");
      
    },
  },
};
</script>

<style scoped>
.container {
  padding-top: 3em;
}

#server-card,
#studings-card {
  background-color: #d5d5d5;
  height: 300px;
  width: 400px;
}
.card{
    margin-left: 10%;
}
a {
  text-decoration: none;
  color: #55608f;
}
a:hover{
    text-decoration: none;
  color: #55608f;
}
#div-server-icon,
#div-professor-icon,
#div-studings-icon {
  border: 1px solid #b5b9d1;
  border-radius: 50%;
  background-color: #b5b9d1;
  padding: 15px;
  width: 50%;
  margin: 0 auto;
}

h4 {
  font-weight: bold;
  margin-top: 40px;
}

#professor-card {
  background-color: #344c80;
  height: 400px;
  color: aliceblue;
}

@media all and (max-width: 992px) and (min-width: 769px) {
  .col-md-8 {
    margin: 5px auto;
  }

  #server-icon,
  #professor-icon,
  #studings-icon {
    width: 0.7em;
  }
  .card{
      width: 50%;
      background-color: #b5b9d1;
      margin-top: 20px;
  }
}

@media all and (max-width: 768px) {
  .col-md-8 {
    margin: 5px auto;
  }

  #server-card,
  #professor-card,
  #studings-card {
    width: 100%;
  }

  #div-server-icon,
  #div-professor-icon,
  #div-studings-icon {
    border: 1px solid #b5b9d1;
    border-radius: 50%;
    background-color: #b5b9d1;
    padding: 10px;
    width: 50%;
    margin: 0 auto;
  }
  #server-icon,
  #professor-icon,
  #studings-icon {
    width: 0.6em;
  }
}

@media all and (max-width: 576px) {
  #server-card,
  #professor-card,
  #studings-card {
    width: 60%;
    margin: 0 auto 5px;
  }

  #div-server-icon,
  #div-professor-icon,
  #div-studings-icon {
    border: 1px solid #b5b9d1;
    border-radius: 50%;
    background-color: #b5b9d1;
    padding: 10px;
    width: 45%;
    margin-top: 50px;
  }
  #server-icon,
  #professor-icon,
  #studings-icon {
    width: 0.7em;
  }
}

@media all and (max-width: 390px) {
  .container {
    padding-top: 1em;
  }

  #server-card,
  #professor-card,
  #studings-card {
    width: 80%;
    margin: 0 auto 5px;
  }

  #div-server-icon,
  #div-professor-icon,
  #div-studings-icon {
    border: 1px solid #b5b9d1;
    border-radius: 50%;
    background-color: #b5b9d1;
    padding: 10px;
    width: 45%;
    margin-top: 50px;
  }
  #server-icon,
  #professor-icon,
  #studings-icon {
    width: 0.7em;
  }
}
</style>
