<template>
<div>
        <Header />
        <font-awesome-icon />
        <h1 class="pt-5">Liste des Profs de {{ListeOrigine}}</h1>
        <div class="panel panel-primary">
        <div class="panel-heading"></div>     
        <table class="table table-bordered table-striped">
          <thead>
            <tr> 
             <th >Nom</th>
             <th >PreNom</th>
             <th >Email</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="prof in tableProf" :key="prof.email">
              <td>{{prof.lastName}} </td>
              <td>{{prof.firstName}}</td>
              <td>{{prof.email}}</td>
            </tr> 
          </tbody>
        </table>

        <nav aria-label="Page navigation example">
                    <ul class="pagination justify-content-center">
                        <li class="page-item"><a class="page-link"  @click="prevPage">Précédent</a></li>
                        <li class="page-item"><a class="page-link"  @click="nextPage">Suivant</a></li>
                    </ul>
        </nav>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import Header from "@/components/AdminPages/Header";

export default {
    name: "ListOrigineProf",
    components: {Header},

    data () {
        return {
            success:true,
            tableProf:[],
            nbrePage: 10,
            currentPage: 1,
            Origines:["Département Informatique","Indéfinies","Département Bio","Département de Math","Université","UFR ST","Privé"]
        }

    },
    mounted (){
        axios
      .get("http://146.59.195.214:8006/api/v1/teachers/all")
      .then((response) => {
        response.data.forEach((branch) => {
            //Liste des profs d'une origine
         // if (branch.origine === this.$ori) 
        //  {
        //     this.tableProf.push(branch)
        //  }
          
          if (branch.lastName === "Petit") 
          {
             this.tableProf.push(branch)
          }

          if (branch.lastName === "Balbali") 
          {
             this.tableProf.push(branch)
          }

          if (branch.lastName === "Regnault") 
          {
             this.tableProf.push(branch)
          }
        });
    });
    },
    methods:{
        RetourOri() {
            this.success=true
        },

        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        nextPage() {
            if ((this.currentPage * this.nbrePage) < this.filieres.length) {
                this.currentPage++;
            }
        },
         setElementsnbrePage(nbrePage) {
            this.nbrePage = nbrePage
        },

        VoirListeProf() {
            this.success=false
        },
    },

    computed:{
        ListeOrigine:function(){
            return this.$ori
        }
    }
}
</script>

<style scoped>

</style>
