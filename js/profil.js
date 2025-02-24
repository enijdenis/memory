const tableauCorrespondanceMemoryImage = [
    {nom:"legumes",nomAffiche:"Légumes",img:"./ressources/memory-legume/memory_detail.png",extension:"svg"},
    {nom:"animaux",nomAffiche:"Animaux",img:"./ressources/animaux/memory_detail_animaux.png",extension:"webp"},
    {nom:"animauxAnimes",nomAffiche:"Animaux animés",img:"./ressources/animauxAnimes/memory_detail_animaux_animes.png",extension:"webp"},
    {nom:"animauxDomestiques",nomAffiche:"Animaux Domestiques",img:"./ressources/animauxdomestiques/memory_detail_animaux_domestiques.png",extension:"jpg"},
    {nom:"chiens",nomAffiche:"Chiens",img:"./ressources/chiens/memory_details_chiens.png",extension:"webp"},
    {nom:"dinosaures",nomAffiche:"Dinosaures",img:"./ressources/dinosaures/memory_detail_dinosaures.png",extension:"jpg"},
    {nom:"dinosauresAvecNom",nomAffiche:"Dinosaures avec nom",img:"./ressources/dinosauresAvecNom/memory_details_dinosaures_avec_nom.png",extension:"jpg"},
    {nom:"alphabetScrabble",nomAffiche:"Lettre Scrablle",img:"./ressources/alphabet-scrabble/memory_detail_scrabble.png",extension:"png"}
];

function afficheMessageDepuisTableau(tableau,nom){
    if(tableau!=null && tableau.length>0 && nom!=null){
      for (const val of tableau)
      {
        if(val.nom==nom){
          return val.nomAffiche;
        }
      }
    }else{
      return nom;
    }
}
    
const form = document.querySelector("form");
form.addEventListener("submit", handleForm);
const nomInput = document.getElementById("user");
const mailInput = document.getElementById("email");
const tailleMemory = document.getElementById("tailleMemory");
let utilisateurTailleMemory = localStorage.getItem("utilisateurTailleMemory");
let utilisateurChoixMemory =  localStorage.getItem("utilisateurChoixMemory");
console.log("utilisateurChoixMemory="+utilisateurChoixMemory);


//Création de la liste déroulante choixMemory
creerChoixMemory(tableauCorrespondanceMemoryImage,utilisateurChoixMemory);

function creerChoixMemory(tableau,utilisateurChoixMemory){
    var select = document.createElement("select");
    select.name = "choixMemory";
    select.id = "choixMemory"
 
    for (const val of tableauCorrespondanceMemoryImage)
    {
        var option = document.createElement("option");
        option.value = val.nom;
        option.text = val.nomAffiche;
        if(utilisateurChoixMemory==val.nom){
            option.selected="selected";
        }
        select.appendChild(option);
    }
 
    document.getElementById("containerMemory").appendChild(select);
}
const choixMemory = document.getElementById("choixMemory");
choixMemory.addEventListener("change",afficherChoixMemory);

function afficherChoixMemory(){
    console.log("afficherChoixMemory");    
    let optionValue=choixMemory.options[choixMemory.selectedIndex].value;
    let optionTexte=choixMemory.options[choixMemory.selectedIndex].text;
    console.log(optionTexte);
    console.log(optionValue);

    let image=document.createElement("img");
    for (const val of tableauCorrespondanceMemoryImage)
    {
        if(val.nom==optionValue){
            image.src=val.img;
            break;
        }
    }
    
    image.alt=optionTexte;
    image.title=optionTexte;
    image.className="img-memory-presentation";
    
    //Suppression de l'image en cours si ell est présente
    if(document.querySelector('.img-memory-presentation')!=null){
        document.querySelector('.img-memory-presentation').remove();
    }
    document.getElementById("zoneImage").appendChild(image);
    

}



let utilisateurEmail=localStorage.getItem("utilisateurEmail");
let utilisateurNom=localStorage.getItem("utilisateurNom");
let userConnecte=localStorage.getItem("userConnecte");

afficherChoixMemory();
/*console.log(userConnecte);
console.log(utilisateurEmail);
console.log(utilisateurNom);
console.log(utilisateurTailleMemory);
console.log(utilisateurChoixMemory);*/

if(userConnecte){
    nomInput.value=utilisateurNom;
    mailInput.value=utilisateurEmail;
    tailleMemory.value=utilisateurTailleMemory;
    choixMemory.value=utilisateurChoixMemory;
}

function handleForm(e){
    e.preventDefault();
    enregistrerOptionLocalStorage(tailleMemory,choixMemory);
}

function enregistrerOptionLocalStorage(tailleMemory,choixMemory){
    localStorage.setItem("utilisateurTailleMemory",tailleMemory.value);
    localStorage.setItem("utilisateurChoixMemory",choixMemory.value);
    alert("Choix des options enregistré !");
}


let tableauUtilisateurConnecteLu = localStorage.getItem("tableauUtilisateurConnecte");
let tableauUtilisateurConnecte =JSON.parse(tableauUtilisateurConnecteLu)|| [];



let refTable = document.getElementById("tableScore");
let myrow = refTable.getElementsByTagName("tr")[1];
let chaineAVerif = "Pas encore de score enregistré";
//let totalNbLignesTableau = refTable.rows.length;
let index=1;


showTableauDernierScore(tableauUtilisateurConnecte,refTable);

function showTableauDernierScore(tableauUtilisateurConnecte,refTable){
    if(tableauUtilisateurConnecte!=null){
        console.log(tableauUtilisateurConnecte);
       
        let utilisateurEmailConnecte = localStorage.getItem("utilisateurConnecte");
        for (const utilisateur of tableauUtilisateurConnecte.sort((a,b)=>a.score-b.score)) {
            console.log(utilisateur);
            if(utilisateur!=null && utilisateur.nom==utilisateurEmail){

                if(index==1 && myrow.innerText==chaineAVerif){
                    //Suppression de la premiere lignes
                    refTable.deleteRow(1);
                }

                // Insère une ligne dans la table à l'indice de ligne 0
                let nouvelleLigne = refTable.insertRow(index);

                // Insère une cellule dans la ligne à l'indice 0
                let nouvelleCellulePseudo = nouvelleLigne.insertCell(0);

                let nouvelleCelluleScore = nouvelleLigne.insertCell(1);

                let nouvelleCelluleTaille = nouvelleLigne.insertCell(2);
                let nouvelleCelluleChoixMemory = nouvelleLigne.insertCell(3);
                let nouvelleCelluleDate = nouvelleLigne.insertCell(4);

                // Ajoute un nœud texte à la cellule
                let nouveauTexte = document.createTextNode(utilisateur.nom);
                nouvelleCellulePseudo.appendChild(nouveauTexte);
                nouveauTexte = document.createTextNode(utilisateur.score);
                nouvelleCelluleScore.appendChild((nouveauTexte));
                nouveauTexte = document.createTextNode(utilisateur.tailleMemory);
                nouvelleCelluleTaille.appendChild((nouveauTexte));
                nouveauTexte = document.createTextNode(afficheMessageDepuisTableau(tableauCorrespondanceMemoryImage,utilisateur.choixMemory));
                nouvelleCelluleChoixMemory.appendChild((nouveauTexte));
                nouveauTexte = document.createTextNode(utilisateur.dateScore);
                nouvelleCelluleDate.appendChild((nouveauTexte));
                index++;
            }
        }
    }

}