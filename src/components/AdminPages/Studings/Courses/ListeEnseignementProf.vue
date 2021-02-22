<template>
<div>
        <Header />
        <font-awesome-icon />
        <h1 class="pt-5">Liste des matières de la filière {{ $filNameMat}}</h1>
     <div class="container">

             <div class="row justify-content-start">
                
            </div>
        <div class="row justify-content-between">
        <router-link to="/admin/filieres/">
                   <button id="bt1" class="btn btn-outline-secondary mb-2" >Retour à la liste des filières</button>
        </router-link>

        <p id="eltPerPage" class="mb-2">
                    Afficher
                    <a class="pageSizeElt" @click="setElementsPerPage(5)">5</a>
                    | <a class="pageSizeElt" @click="setElementsPerPage(10)">10</a>
                    | <a class="pageSizeElt" @click="setElementsPerPage(20)">20</a>
                    éléments
        </p>
        </div>
        <div class="panel panel-primary">
        <div class="panel-heading"></div>     
        <table class="table table-bordered table-striped">
          <thead>
            <tr> 
             <th >Matière </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td> </td>
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
import Header from "@/components/AdminPages/Header";

export default {
    name: "EnseignementProf",
    components: {Header}
}
</script>

<style scoped>

</style>
