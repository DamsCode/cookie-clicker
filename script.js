(() => {
    let mydiv = document.getElementById("affichage");
    let mybtn = document.getElementById("click");

    mybtn.addEventListener("click", () => {
        let inc = parseInt(mydiv.innerText);
        inc++;
        mydiv.innerText = inc;
    });
})();