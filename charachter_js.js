
try{
  let body = document.querySelector('body');
let btn_mode = document.querySelector('#btn_mode');
let textarea=document.querySelector('#textarea');
let total=document.querySelector('.total');
let word=document.querySelector('.word');
let sentence=document.querySelector('.sentence');
let charachterlimit=document.querySelector('#a');
let seeMore=document.querySelector('#see');
let  visible = 4;
let seeMoreExpanded = false;

btn_mode.addEventListener('click', function () {
  if (body.classList.contains('light')) {
    body.classList.remove('light');
    body.classList.add('dark');
    btn_mode.classList.remove('light');
    btn_mode.classList.add('dark')
    btn_mode.textContent = '☀';
    textarea.style.backgroundColor="rgb(66, 64, 64)";
  } else {
    body.classList.remove('dark');
    body.classList.add('light');
    btn_mode.classList.remove('dark');
    btn_mode.classList.add('light');
    btn_mode.textContent = '🌙';
    textarea.style.backgroundColor="var(--background-color)";
  }
});
let letters="abcdefghijklmnopqrstuvwxyz";
let texte = textarea.value;
let divlettbig = document.querySelector('#divlettbig');

let charLimit = document.querySelector('#charlimit');

charachterlimit.addEventListener('change', () => {
  if (charachterlimit.checked) {
    charLimit.style.display = 'inline';
       // Affiche l'input
  } else {
    charLimit.style.display = 'none';    // Cache l'input
    charLimit.value = '';                // Vide la valeur
  }

  

});



function fct_letters(Exclude_Spaces=false,texte = textarea.value) {
   // Vide le contenu précédent

  
  let totalChars = texte.length;

  if (totalChars === 0) {
    let span = document.createElement("span");
    span.id = "spansee";
    span.textContent = "No characters found. Start typing to see letter density.";
    divlettbig.append(span);
    return [] ;
  }

  let deja = [];
  let rows = [];
  for (let i = 0; i < texte.length; i++) {
    let lettre = texte[i];

    if (!deja.includes(lettre)) {
      deja.push(lettre);

      let p = document.createElement('p');
      p.classList.add('letterP');
      p.textContent = lettre === " " ? "␣" : lettre.toUpperCase();


     // divlettbig.append(p);

      let count = texte.split(lettre).length - 1;
      let pourcent = ((count / totalChars) * 100).toFixed(2);

      let divlett = document.createElement('div');
      divlett.classList.add('divlett');

      let pourcentDiv = document.createElement('div');
      pourcentDiv.classList.add('pourcent');
      pourcentDiv.style.width = `${pourcent}%`;

      divlett.append(pourcentDiv);
     // divlettbig.append(divlett);

      let statistique = document.createElement('span');
      statistique.classList.add('statistique');
      statistique.textContent = `${count} (${pourcent}%)`;
    //  divlettbig.append(statistique);
      let row = document.createElement('div');
      row.classList.add('row');  
      row.append(p, divlett, statistique);
      rows.push(row);
    }
  }
  return rows;
 


}


seeMore.addEventListener('click', () => {
  if (seeMoreExpanded) {
    divlettbig.innerHTML = "";
    seeMore.allRows.slice(0,visible).forEach(row => divlettbig.append(row));
    seeMore.textContent = "See more";
    seeMoreExpanded = false;
  } else {
    divlettbig.innerHTML = "";
    seeMore.allRows.forEach(row => divlettbig.append(row));
    seeMore.textContent = "See less";
    seeMoreExpanded = true;
  }
});



textarea.addEventListener('input',()=>{

let Exclude_Spaces = document.querySelector('#check').checked;
/*
 let allRows = fct_letters(Exclude_Spaces, texte);
seeMore.allRows = allRows;
  divlettbig.innerHTML = "";
  allRows.slice(0, visible).forEach(row => divlettbig.append(row));
  if (allRows.length > visible) {
  seeMore.style.display = "inline-block";
  seeMore.textContent = "See more";
} else {
  seeMore.style.display = "none";
}
*/

  divlettbig.style.display="block";
   textarea.value=textarea.value.replace(/[^a-zA-Z.,\s]/g, "");

   if (charachterlimit.checked && charLimit.value) {
  let limit = parseInt(charLimit.value);
  if (texte.length > limit) {
    texte = texte.slice(0, limit); // Couper le texte
    textarea.value = texte;        // Forcer la valeur corrigée
  }
}

   if(Exclude_Spaces){
    texte=texte.replace(/\s/g,'');
   }

   total.textContent=texte.length;
   let mots=textarea.value.trim().split(/\s+/).filter(Boolean);
   word.textContent=mots.length;
   let phrases = textarea.value.split(/[.,]+/).filter(Boolean);
   sentence.textContent = phrases.length;
   let span=document.querySelector('#spansee');
   if (span) span.remove();
   fct_letters(Exclude_Spaces,texte)

   
   
})

//let divlett=document.querySelector('.')
  }
catch(error){
  console.log(error);
}