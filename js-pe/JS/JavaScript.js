function validateForm() {
    let foutenArray = [];

    let voorNaam = document.getElementById('voornaam').value;
    let achterNaam = document.getElementById('achternaam').value;
    let email = document.getElementById('email').value;
    let gebruikersnaam = document.getElementById('gebruikersnaam').value;
    let wachtWoord = document.getElementById('passwoord').value;
    let wachtWoord2 = document.getElementById('passwoord2').value;
    let adres = document.getElementById('adres').value;
    let land = document.getElementById('land').value;
    let provincie = document.getElementById('provincie').value;
    let postCode = document.getElementById('postcode').value;
    let voorWaarde = document.getElementById('voorwaarden');
    let betaling = document.getElementsByName('betaling');

    let alertBox = document.getElementById("alertBox");
    let alertBox2 = document.getElementById("alertBox2");

    let typeBetaling = "Je betalingswijze is ";

    //Voornaam
    if (voorNaam == "") {
        foutenArray.push("Het veld 'Voornaam' moet ingevuld zijn. <br/>");
    }
    //Familienaam
    if (achterNaam == "") {
        foutenArray.push("Het veld 'Achternaam' moet ingevuld zijn. <br/>");
    }
    //Gebruikersnaam
    if (gebruikersnaam == "") {
        foutenArray.push("Het veld 'Gebruikersnaam' moet ingevuld zijn. <br/>");
    }
    //email, zowel leeg veld als correcte email, deze meldinging kunnen niet samen voorkomen 
    if (email != "") {
        if (validateEmail(email) == false) {
            foutenArray.push("E-mailadres is niet correct. <br/>");
        }
    } else {
        foutenArray.push("Het veld 'E-mailadres' moet ingevuld zijn. <br/>");
    }
    //wachtwoord ingevuld en lengte, hier heb ik 2 functies gebruik, die ik overneem voor controlewachtwoord
    if (controleLeegWachtwoord(wachtWoord) == "nee") {
        foutenArray.push("Het veld 'Wachtwoord' moet ingevuld zijn. <br/>");
    }
    if (valideerWachtwoordLengte(wachtWoord) == "kort") {
        foutenArray.push("Het wachtwoord moet minstens 8 karakters bevatten. <br/>");
    }
    //control leeg veld wachtwoord en lengte wachtwoord
    if (controleLeegWachtwoord(wachtWoord2) == "nee") {
        foutenArray.push("Het veld 'Herhaal Wachtwoord' moet ingevuld zijn. <br/>");
    }
    if (valideerWachtwoordLengte(wachtWoord2) == "kort") {
        foutenArray.push("Het controlewachtwoord moet minstens 8 karakters bevatten. <br/>");
    }
    //vergelijking wachtwoorden
    if (wachtWoord != wachtWoord2) {
        foutenArray.push("De wachtwoorden moeten gelijk zijn. <br/>");
    }
    //adres leeg of niet
    if (adres == "") {
        foutenArray.push("Het veld 'Adres' moet ingevuld zijn. <br/>");
    }
    //controle op selectie land
    if (land == "placeholder") {
        foutenArray.push("Er moet een land geselecteerd worden. <br/> ");
    }
    //controle op selectie provincie
    if (provincie == "placeholder") {
        foutenArray.push("Er moet een provincie geselecteerd worden. <br/> ");
    }
    //controle postocde op leeg veld en waarde
    foutenArray.push(checkPC(postCode));
    //controle voorwaarden
    if (!voorWaarde.checked) {
        foutenArray.push("Er moet akkoord gegaan worden met de Algemene voorwaarden. <br/>")
    }
    //controle betalingswijze
    if (checkBetalingsWijze(betaling) == null) {
        foutenArray.push("Selecteer een betalingswijze.");
    } else if (checkBetalingsWijze(betaling) == 0) {
        typeBetaling += "Banking App";
    } else if (checkBetalingsWijze(betaling) == 1) {
        typeBetaling += "Overschrijving";
    } else if (checkBetalingsWijze(betaling) == 2) {
        typeBetaling += "Visa Card";
    } else if (checkBetalingsWijze(betaling) == 3) {
        typeBetaling += "PayPal";
    }

    //de alertbox krijgt nu een display, die eerst werd afgezet door middel van css
    alertBox.style.display = "block";

    //als array lengte van 0 heeft alert succes en betalingswijze, anders foutenmeldingen
    if (foutenArray.length > 1) {
        document.getElementById("alertBox").className = 'alert alert-danger';
        document.getElementById("h4").innerHTML = "Yikes, Errors...";
        document.getElementById("para").innerHTML = foutenArray.toString().replaceAll(",", " ");
        document.getElementById("h4b").innerHTML = "";
        document.getElementById("parab").innerHTML = "";
    } else {
        alertBox2.style.display = "block";
        document.getElementById("alertBox").className = 'alert alert-success';
        document.getElementById("h4").innerHTML = "Goed gedaan!";
        document.getElementById("para").innerHTML = "Aww yeah, je werd geregistreerd";
        document.getElementById("alertBox2").className = 'alert alert-info';
        document.getElementById("h4b").innerHTML = "Betalingswijze";
        document.getElementById("parab").innerHTML = typeBetaling;
    }
}

function validateEmail(email) {
    let regel =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regel.test(String(email).toLowerCase());
}

function controleLeegWachtwoord(wachtWoord) {
    if (wachtWoord.value == "") {
        return "nee";
    } else {
        return "ja";
    }
}

function valideerWachtwoordLengte(wachtWoord) {
    if (wachtWoord.length < 7) {
        return "kort";
    } else {
        return "goed";
    }
}

function checkPC(veld) {
    //Ik heb hier niet ParseInt gedaan omdat je met een input type="number" zit.
    if (veld == "") {
        return "Het veld 'Postcode' moet (correct) ingevuld zijn <br/>";
    } else {
        if (veld < 1000 || veld > 9999) {
            return "De waarde van de postcode moet tussen 1000 en 9999 liggen <br/>";
        }
    }
}
//Orginieel ging ik geen loop gebruiken, maar de functie met een loop heb ik gevonden (https://www.thoughtco.com/how-to-validate-radio-buttons-on-a-web-page-4072520)
// en deze zou handiger zijn als er meerdere radio's waren
function checkBetalingsWijze(veld) {
    let teller = -1;
    for (let i = veld.length - 1; i > -1; i--) {
        if (veld[i].checked) {
            teller = i;
            i = -1;
        }
    }
    if (teller > -1) return teller;
    else return null;
}