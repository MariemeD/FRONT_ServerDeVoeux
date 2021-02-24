
import HomeProf from "@/components/ProfessorPages/HomePage";

//professor
import ProfessorService from "@/components/ProfessorPages/professor/Prof_Service";
import Profil from "@/components/ProfessorPages/Profile";
//modules

import Demandes from "./components/ProfessorPages/Modules/Demandes";

//Filiere
import Branch from "@/components/ProfessorPages/Filieres/Branch";
import DetailsBranch from "@/components/ProfessorPages/Filieres/Details_Branch";
import NCours from "@/components/ProfessorPages/Filieres/NC_Cours";
import Homepage from "@/components/AdminPages/Homepage";
import Profile from "@/components/AdminPages/Profile";
import Professors from "@/components/AdminPages/Professors/Professors/Professors";
import HoursMade from "@/components/AdminPages/Professors/Hours/HoursMade";
import Disclaimers from "@/components/AdminPages/Professors/Disclaimers/Disclaimers";
import ModifyDisclaimer from "@/components/AdminPages/Professors/Disclaimers/ModifyDisclaimer";
import Courses from "@/components/AdminPages/Studings/Courses/Courses";
import AddCourse from "@/components/AdminPages/Studings/Courses/AddCourse";
import ModifyCourse from "@/components/AdminPages/Studings/Courses/ModifyCourse";
import Pathways from "@/components/AdminPages/Studings/Pathways/Pathways";
import ListeRespoF from "@/components/AdminPages/Studings/Pathways/ListeRespo";
import AddPathway from "@/components/AdminPages/Studings/Pathways/AddPathway";
import ProfPathway from "@/components/AdminPages/Studings/Pathways/ListeProf";
import ListeMatiere from "@/components/AdminPages/Studings/Pathways/ListeMatiere";
import Origins from "@/components/AdminPages/Studings/Origins/Origins";
import AddOrigin from "@/components/AdminPages/Studings/Origins/AddOrigin";
import ModifyOrigin from "@/components/AdminPages/Studings/Origins/ModifyOrigin";
import Wishes from "@/components/AdminPages/Wishes/Wishes";
import AddDisclaimer from "@/components/AdminPages/Professors/Disclaimers/AddDisclaimer";
import ListOrigineProf from "@/components/AdminPages/Studings/Origins/ListeProf";
//General
import Login from "@/components/GeneralPages/Login"
import HoursMadeDetails from "@/components/AdminPages/Professors/Hours/HoursMadeDetails";
import enseignant from "@/components/ProfessorPages/professor/enseignant";

export default [

    // Login route
    {path: '/', component: Login },
    {path: '/login/', name:"login", component: Login },

    // Register route

    // Admin routes
    {path: '/admin/', name: 'homepage', component: Homepage },
    {path: '/admin/profil', name: 'admin-profil', component: Profile },
    {path: '/admin/voeux/', name: 'wishes', component: Wishes },
    {path: '/admin/voeux/:conflicts', name: 'conflict-wishes', component: Wishes },

    {path: '/admin/enseignants/', name: 'professors', component: Professors },
    {path: '/admin/heures-effectuees', name: 'hoursMade', component: HoursMade },
    {path: '/admin/heures-effectuees/:emailProf', name: 'hoursMade-details', component: HoursMadeDetails },
    {path: '/admin/decharges/', name: 'disclaimers', component: Disclaimers },
    {path: '/admin/decharges/ajouter-une-decharge', name: 'disclaimers-add', component: AddDisclaimer },
    {path: '/admin/decharges/modifier-une-decharge/:idDisclaimer', name: 'disclaimers-edit', component: ModifyDisclaimer },

    {path: '/admin/cursus/', component: Courses },
    {path: '/admin/cursus/ajouter-un-cursus', component: AddCourse },
    {path: '/admin/cursus/modifier-un-cursus', component: ModifyCourse },
    {path: '/admin/filieres/', component: Pathways },
    {path: '/admin/filieres/ajouter-une-filiere', component: AddPathway },
    {path: '/admin/filieres/Professeur', component: ProfPathway },
    {path: '/admin/filieres/RespoFil', component: ListeRespoF },
    {path: '/admin/filieres/Matieres', component: ListeMatiere},
    {path: '/admin/origines/', component: Origins },
    {path: '/admin/origines/ajouter', component: AddOrigin },
    {path: '/admin/origines/prof', component: ListOrigineProf },
    {path: '/admin/origines/modifier', component: ModifyOrigin },

    {path: '/home', name:"home",component: HomeProf},
    {path: '/profil', name:"profil",component: Profil},

    // Professor routes
    {path: '/enseignant', name:"enseignant",component: enseignant },
    {path: '/professorService', name:"professorService",component: ProfessorService},
    {path: '/professorService/:emailProf', name:"professorService",component: ProfessorService},

    //Modules
    {path: '/demandes', name:"demandes",component: Demandes},

    //Branch
    {path: '/branch', name:"branch",component: Branch},
    {path: '/detailsBranch', name:"detailsBranch", component: DetailsBranch},
    {path: '/ncours', name:"ncours",component: NCours}


]
