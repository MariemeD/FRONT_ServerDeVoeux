<template>
    <div>
        <Header />

        <h1 class="pt-5">Responsabes des filières</h1>

        

<div class="container">
      <div class="row justify-content-between">
        <router-link to="/admin/filieres/">
                   <button id="bt1" class="btn btn-outline-secondary mb-2" >Retour à la liste des filières</button>
        </router-link>
    </div>
        <div class="panel-heading"></div>     
        <table class="table table-bordered table-striped">
          <thead>
            <tr> 
             <th >Nom</th>
             <th >Prénom</th>
             <th >Email</th>
             <th >Filière</th>
            
            </tr>
          </thead>
          <tbody>
             <tr v-for="professeur in prof" :key="professeur" > 
             <td >{{professeur.nom}}</td>
             <td >{{professeur.prenom}}</td>
             <td >{{professeur.email}}</td>
             <td >{{professeur.Filière}}</td>
            
            </tr>
          </tbody>
        </table>

</div>

    </div>
</template>

<script>
import Header from "@/components/AdminPages/Header";
import axios from 'axios';

export default {
    name: "ListeRespoF",
    components: {Header},

    data(){
        return {

            prof:[]

        }
    },

    mounted(){
      
      axios
        
        .get("https://back-serverdevoeux.herokuapp.com/api/responsibles")
        .then((response) => {
                response.data.forEach((branch)=> {
                    if((branch.firstname === "Pascal") && (branch.lastname === "Petit") ) 
                {
                    branch.group= "L3MIAI";
                }

                    if(branch.group ==="L3MIAI" ) 
                {
                    branch.group= "Licence 3 MIAGE Initial";
                    this.prof.push({"nom": branch.lastname,
                                "prenom": branch.firstname,
                                "Filière": branch.group,
                                "email": branch.email })
                }
                
                  if(branch.group ==="L3MIAA" ) 
                {
                    branch.group= "Licence 3 MIAGE Apprentissage";
                    this.prof.push({"nom": branch.lastname,
                                "prenom": branch.firstname,
                                "Filière": branch.group,
                                 "email": branch.email })
                }


                  if(branch.group ==="M1MIAI" ) 
                {
                    branch.group= "Master 1 MIAGE Initial";
                    this.prof.push({"nom": branch.lastname,
                                "prenom": branch.firstname,
                                "Filière": branch.group,
                                "email": branch.email })
                }

                  if(branch.group ==="M2MIAI" ) 
                {
                    branch.group= "Master 2 MIAGE Initial";
                    this.prof.push({"nom": branch.lastname,
                                "prenom": branch.firstname,
                                "Filière": branch.group,
                                "email": branch.email })
                }

                  if(branch.group ==="M1MIAA" ) 
                {
                    branch.group= "Master 1 MIAGE Apprentissage";
                    this.prof.push({"nom": branch.lastname,
                                "prenom": branch.firstname,
                                "Filière": branch.group,
                                "email": branch.email })
                }

                  if(branch.group ==="M2MIAA" ) 
                {
                    branch.group= "Master 2 MIAGE Apprentissage";
                    this.prof.push({"nom": branch.lastname,
                                "prenom": branch.firstname,
                                "Filière": branch.group,
                                "email": branch.email })
                }


                });
        });

    },
}
</script>

<style scoped>

</style>
