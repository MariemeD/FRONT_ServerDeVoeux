<template>
     <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">Serveur des Voeux</a>
   <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div class="navbar-nav">
      <a class="nav-item nav-link active" href="/professors">Enseignant<span class="sr-only">(current)</span></a>
      <a class="nav-item nav-link" href="/branch">Enseignements</a>
      <a class="nav-item nav-link" href="#">Enseignement non couvert</a>
 
    </div>
  </div>
    </nav>
</template>
<style scoped>
nav{
  background: linear-gradient(45deg, #8ea3d1, #344C80);
}
.navbar-brand{
  font-family: "Lato", "Lucida Grande", "Lucida Sans Unicode", Tahoma,
    Sans-Serif ;
  color: #fff;
  font-size: 20px;
}
</style>