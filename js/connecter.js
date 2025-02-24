const form = document.querySelector("form");
form.addEventListener("submit", handleForm);
const mailInput = document.getElementById("email");
const pswInput = document.getElementById("password");

function handleForm(e){
    e.preventDefault();
    let email = mailInput.value;
    let motDePasse = pswInput.value;
    verifUtilisateurLocalStorage(email,motDePasse);
}


function verifUtilisateurLocalStorage(email,motDePasse){
    //Récupération du localStorage
    let utilisateurs=localStorage.getItem("utilisateurs");
    localStorage.setItem("userConnecte",false);
    utilisateurs = JSON.parse(utilisateurs)|| [];
    console.log(utilisateurs);
    let error=true;
    if(utilisateurs!=null && utilisateurs.length>0){
      for (const utilisateur of utilisateurs) {
      /*  console.log(utilisateur);
        console.log(utilisateur.email);
        console.log("email="+email);
        console.log("motDePasse="+motDePasse);*/
        if(email===utilisateur.email && motDePasse === utilisateur.motDePasse){
          alert("L'email "+ email +" est connecté");
          localStorage.setItem("utilisateurEmail",utilisateur.email);
          localStorage.setItem("utilisateurNom",utilisateur.nom);
          localStorage.setItem("userConnecte",true);
          document.location.href="./profil.html";
          error=false;
          break;
        }else{
            error=true;
        }
      }
    }
    if(error){
        alert("Erreur, veuillez saisir les informations correctement");
    }

  }
