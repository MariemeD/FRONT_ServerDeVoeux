<template>
  <div class="container">
    <Navbar />
    <div class="titke">
      <h2>Liste des Enseignements</h2>
    </div>
    <div class="modules">
      <div class="card">
        <h4>Doctorat</h4>
        <hr />
        <table>
          <tr>
            <td>
              <a href="/detailsBranch"> Branch 1 </a>
            </td>
          </tr>
          <tr>
            <td>Branche2</td>
          </tr>
        </table>
      </div>
      <div class="card">
        <h4>M2</h4>
        <hr />
       
      <table>
          <tr>
            <td>
              <a href="/detailsBranch"> Branch 1 </a>
            </td>
          </tr>
          <tr>
            <td>Branche2</td>
          </tr>
        </table>
      </div>
      <div class="card"> <h4> M1</h4>
      <hr />
      <table>
          <tr>
            <td>
              <a href="/detailsBranch"> Branch 1 </a>
            </td>
          </tr>
          <tr>
            <td>Branche2</td>
          </tr>
        </table> </div>
      <div class="card"> <h4> L3 </h4>
         <hr />
      <table>
          <tr>
            <td>
              <a href="/detailsBranch"> Branch 1 </a>
            </td>
          </tr>
          <tr>
            <td>Branche2</td>
          </tr>
        </table>
      </div>
      <div class="card"> <h4> L2 </h4> 
         <hr />
      <table>
          <tr>
            <td>
              <a href="/detailsBranch"> Branch 1 </a>
            </td>
          </tr>
          <tr>
            <td>Branche2</td>
          </tr>
        </table>
      </div>
      <div class="card"> <h4> L1 </h4>
       <hr />
      <table>
          <tr>
            <td>
              <a href="/detailsBranch"> Branch 1 </a>
            </td>
          </tr>
          <tr>
            <td>Branche2</td>
          </tr>
        </table>
        </div>
    </div>
  </div>
</template>
<style scoped>
nav {
  background: linear-gradient(45deg, #49a09d, #5f2c82);
}
.navbar-brand {
  font-family: "Lato", "Lucida Grande", "Lucida Sans Unicode", Tahoma,
    Sans-Serif;
  color: #fff;
  font-size: 20px;
}
.card {
  width: 700px;
  margin-left: 10px;
  margin-top: 5%;
  background-color: #69bab8;
  height: 400px;
}
.modules {
  display: flex;
}
td {
  margin-top: 5%;
}
h2 {
  margin-top: 30px;
  font-family: Georgia, serif;
  font-size: 40px;
  font-weight: bold;
}
h4 {
  margin-top: 10px;
}
a{
  text-decoration: none;
  color: black;
}
.title {
  margin-top: 30px;
}
hr {
  display: block;
  border: none;
  height: 3px;
  background-color: #5f2c82;
  margin-top: 15px;

  -webkit-animation-name: line-show; /* Safari 4.0 - 8.0 */
  -webkit-animation-duration: 0.3s; /* Safari 4.0 - 8.0 */
  animation-name: line-show;
  animation-duration: 0.3s;
  -webkit-transition-timing-function: cubic-bezier(0.795, 0, 0.165, 1);
  -o-transition-timing-function: cubic-bezier(0.795, 0, 0.165, 1);
  transition-timing-function: cubic-bezier(0.795, 0, 0.165, 1); /* custom */
}
</style>
<script>
import Navbar from "../Navbar";

export default {
  name: "Branche",
  components: {
    Navbar,
  },
};
</script>