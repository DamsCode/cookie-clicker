(() => {
    let mydiv = document.getElementById("affichage");
    let mybtn = document.getElementById("click");
    let btnmulti = document.getElementById("multiplier");
    let btnautoclick = document.getElementById("autoclick");
    let btnbonus = document.getElementById("bonus");
    let multiplicateur = 1;
    let score = 0;
    let cout = 50;
    btnmulti.innerText = `Multiplicateur x${multiplicateur} prochain achat :${cout}`;

    function augmenterMultiplicateur(elem) {
        cout = cout * 2;
        multiplicateur++;
        elem.innerText = `Multiplicateur x${multiplicateur} prochain achat :${cout}`;
    }

    function increment() {
        let inc = parseInt(mydiv.innerText);
        score = inc + multiplicateur;
        mydiv.innerText = score;
        return score;
    }

    function decrementbonus(compteur, e) {
        if (compteur > 0) {
            compteur--;
            e.target.innerText = compteur;
            setTimeout(() => {
                decrementbonus(compteur, e);
            }, 1000);
        } else {
            multiplicateur = multiplicateur / 2;
            e.target.removeAttribute("disabled");
            e.target.innerText = "bonus";
        }
    }

    mybtn.addEventListener("click", () => {
        increment();
    });

    btnmulti.addEventListener("click", (e) => {
        if (score >= cout) {
            score = score - cout;
            augmenterMultiplicateur(e.target);
            mydiv.innerText = score;
        } else
            alert("la maison ne fait pas crédit !!");

    });

    btnautoclick.addEventListener("click", (e) => {
        if (score >= 500) {
            setInterval(() => {
                increment();
            }, 1000);
            score = score - 500;
            mydiv.innerText = score;
            e.target.setAttribute("disabled", "true");
        }
    });
    btnbonus.addEventListener("click", (e) => {
        e.target.setAttribute("disabled", "true");
        let compteur = 30;
        multiplicateur = multiplicateur * 2;
        decrementbonus(compteur, e);;
    });
})();