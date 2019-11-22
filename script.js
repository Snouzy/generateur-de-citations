$(document).ready(function(){
    //All the variables
    const allPhrases = {
        "philosophie": {
            "start" : [
                "« La seule façon",
                "« La meilleure des façons",
                "« Le meilleur moyen",
                "« La meilleure des manières",
                "« L'hacharnement",
                "« La pire des façon",
                "« Le pire moyen",
                "« La pire des manières",
                "« L'unique méthode",
                "« L'unique moyen"
            ],
            "middle" : [
                " pour réussir,",
                " d'être heureux,",
                " de vivre,",
                " d'y arriver,",
                " d'aller au bout de ses rêves,"
            ],
            "end" : [
                " c'est d'aimer ce que vous faites. »",
                " ne dépend que de vous. »",
                " c'est de s'obstiner. »",
                " c'est simple, il n'y en a pas. »",
                " n'apporte rien. »"
            ]
        },
        "kaamelot" : {
            "start" : [
                "Au printemps,",
                "Dans le Languedoc, ils m'appellent Provençal ",
                "Dans la vie, j'avais deux ennemis : ",
                "J'voudrais pas faire ma raclette, ",
                "Si on faisait le coup du bouclier humain... ",
                "Si Joseph d'Arimathie a pas été trop con, ",
                "Putain, ",
                "C’est pour ça ",
                "Faut arrêter ces conneries de nord et de sud, ",
                "Une fois, à une exécution, "
            ],
            "middle" : [
                "j’aime bien pisser du haut des remparts au lever du soleil..., ",
                "le vocabulaire et les épinards, ",
                "par exemple, Sire, Léodagan et moi on fait semblant de vous prendre en otage ", "vous pouvez être sûr que le Graal, ",
                "c’est un vrai piège à cons c’t’histoire-là, ",
                "une fois pour toute, le nord, suivant comment on est tourné, "
            ],
            "end" : [
                "c'est pas faux !",
                "y’a une belle vue !",
                "mais c'est moi qui m'suis gouré en disant mon nom.",
                "enfin tous les chiffres impairs jusqu'à 22.",
                "on vous met une dague sous le cou et on traverse le camp adverse en gueulant : Bougez pas, bougez pas ou on bute le roi!",
                "c'est un bocal à anchois.",
                "en plein dans sa mouille !",
                "j’lis jamais rien.",
                "en plus j’sais pas lire.",
                "je m'approche d'une fille. Pour rigoler, je lui fais : « Vous êtes de la famille du pendu ? »"
            ]
        }
    }
    const nbSelectElmt = $('#FormControlSelect1');
    const typeSelectElmt = $('#FormControlSelect2');
    let nbOfQuotesDesired = parseInt($('#FormControlSelect1').val());
    const SwalFire = () => { //Swalfire base
        Swal.fire({
            title: 'Citation chargée !',
            type: 'success',
            html:' ',
            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText:
            'Recommencer',
            confirmButtonAriaLabel: 'Recommencer',
            cancelButtonText:
            'Quitter',
            cancelButtonAriaLabel: "Quitter"
        });
    }


    /* 
    =============== 
    Generate the list of type
    =============== */
    function listCreation() {
        //get the list of types
        const keysTab = Object.keys(allPhrases); 

        //pushing type in the html list
        keysTab.forEach(element => {
            const optionElmt = document.createElement('option');
            $(optionElmt).html("Citation de " + element);
            
            //giving a value, so we can use this attribute to know what kind of quote the user want
            $(optionElmt).attr('value', element); 
            $(typeSelectElmt).append(optionElmt); 
        });
    }

    /* 
    =============== 
    Design of the button
    =============== */
    $(".btn-quote-generator").hover(function() {
        $(this).html("C'est parti !");
    }, //onmouseleave
    function(){ 
        $(this).html("Générer une citation...")
    });


    /* 
    ===============  
    Get the number of quotes wanted by the user
    =============== */
     $(nbSelectElmt).change(function() { 
        nbOfQuotesDesired = parseInt(nbSelectElmt.val());
    });

    //pick a random quote 
    function pickRandomNew(tabStart, tabMiddle, tabEnd) {
        let start = "";
        let middle = "";
        let end = "";
        let tabPhrase = [];

        for(i=0; i < nbOfQuotesDesired; i++) {
            //random phrases pickup
            start = tabStart[Math.floor(Math.random()*tabStart.length)];
            middle = tabMiddle[Math.floor(Math.random()*tabMiddle.length)];
            end = tabEnd[Math.floor(Math.random()*tabEnd.length)];

            //pushing each random quote into a tab
            tabPhrase.push(start+middle+end);
        };
        SwalFire(); //display the alert
        $('#swal2-content').html(tabPhrase.join("<br/><br/>")); //push all the quotes present in tabPhrase into the swal content
    } 

    /* 
    =============== 
    When a user want a quote
    =============== */ 
    $('.btn-quote-generator').click(function(){
        const textToPut = isNaN(nbOfQuotesDesired) ? 'Merci de renseigner un nombre de citiations !' : 'Le nombre doit être compris entre 1 et 5 !';
        
        //first we do the verifications
        if(isNaN(nbOfQuotesDesired) || nbOfQuotesDesired < 1 || nbOfQuotesDesired > 5){
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: textToPut,
                footer: '<a href="">Recommencer</a>'
            });
            nbSelectElmt.val(1); //put back the number to default
        }
        else { //if it's ok, we can give him the quotes

            
            //give a new set of quotes
            pickRandomNew(allPhrases[`${typeSelectElmt.val()}`]['start'],allPhrases[`${typeSelectElmt.val()}`]['middle'],allPhrases[`${typeSelectElmt.val()}`]['end']);
            
            //if he want to restart the quote generator
            $('.swal2-confirm').click(function(){
                $('.btn-quote-generator').click();
            });
            
        }
    });


    listCreation(); //Generate the list of the multiple type of quotes avaliable
});

