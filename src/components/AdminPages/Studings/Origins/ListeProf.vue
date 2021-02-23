<template>
<div>
        <Header />
        <font-awesome-icon />
        <h1 class="pt-5">Liste des Profs du {{ListeOrigine}}</h1>
     <div class="container">
        <div class="row justify-content-between">
        <router-link to="/admin/origines/">
                   <button id="bt1" class="btn btn-outline-secondary mb-2" >Retour aux origines</button>
        </router-link>
        </div>
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
            <tr v-for="prof in traitementTable" :key="prof.email">
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
            nbrePage: 5,
            currentPage: 1,
            Origines:["Département Informatique","Indéfinies","Département Bio","Département de Math","Université","UFR ST","Privé"]
        }

    },
    mounted (){
       // axios
     // .get("http://146.59.195.214:8006/api/v1/teachers/all")
     // .then((response) => {
        // response.data.forEach((branch) => {
            //Liste des profs d'une origine
         // if (branch.origine === this.$ori) 
        //  {
        //     this.tableProf.push(branch)
        //  }
   // });
      // } )

    axios
            .get('http://146.59.195.214:8006/api/v1/teachers/all')
            .then(response => (this.tableProf = response.data));
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
            if ((this.currentPage * this.nbrePage) < this.tableProf.length) {
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
        },

        traitementTable:function(){
            return this.tableProf.filter((row, index) => {
                let start = (this.currentPage - 1) * this.nbrePage;
                let end = this.currentPage* this.nbrePage;
                if (index >= start && index < end) return true
        });
    },
        }
}
</script>

<style scoped>

#bt1 {
    width:200px;
}

</style>
