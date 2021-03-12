

const test_me_config = {
    TIMEOUT: 20,
    COUNT_EXAMPLES: 20,
    CIPHER: 2
}

function show_configuration() {    
    var modal = document.getElementById("config-modal");
    var timeout_slider = document.getElementById("timeout-slider");
    var timeout_selection = document.getElementById("timeout-selection")
    timeout_slider.value = test_me_config.TIMEOUT
    timeout_selection.innerHTML = "Jak dlouho trvá jeden příklad: <b>" + test_me_config.TIMEOUT + "s</b>"

    var count_slider = document.getElementById("count-slider");
    var count_selection = document.getElementById("count-selection")
    count_slider.value = test_me_config.COUNT_EXAMPLES
    count_selection.innerHTML = "Počet příkladů v jednom cvičení: <b>" + test_me_config.COUNT_EXAMPLES + "</b>"

    modal.style.display = "block";
}

function update_timeout() {
    var timeout_slider = document.getElementById("timeout-slider");
    var timeout_selection = document.getElementById("timeout-selection")
    test_me_config.TIMEOUT = timeout_slider.value
    timeout_selection.innerHTML = "Jak dlouho trvá jeden příklad: <b>" + test_me_config.TIMEOUT + "s</b>"
}

function update_count() {
    var count_slider = document.getElementById("count-slider");
    var count_selection = document.getElementById("count-selection")
    test_me_config.COUNT_EXAMPLES = count_slider.value
    count_selection.innerHTML = "Počet příkladů v jednom cvičení: <b>" + test_me_config.COUNT_EXAMPLES + "</b>"
}

function close_configuration() {
    var modal = document.getElementById("config-modal");
    modal.style.display = "none";
}

var CHEERS = {
    '1': {
        image: 'cup.png',
        threshold: 0.1,
        texts: [
            'Tak to bylo hustý!',
            'Nejsi ty brácha od Ajnštajna',
            'Bravo, bravissimo!',
            'To šlo jak po másle!',
            'Výborná práce!']
    },
    '2': {
        image: 'thumb_up.png',
        threshold: 0.2,
        texts: [
            'To vůbec nebylo špatné!',
            'Těch pár mušek snadno odchytíme!',
            'Dobrá práce, jen tak dál!',
            'I mistr tesař se utne.',
            'Moc pěkné, ale zkusme to ještě vyladit!'
        ]
    },
    '3': {
        image: 'fingers_crossed.png',
        threshold: 0.5,
        texts: [
            'Žádný učený z nebe nespadl.',
            'Nevzdávej se, jde to a půjde ještě líp.',
            'Není každý den posvícení, příště to bude lepší.',
            'Chybama se člověk učí. Uvidíš příště.',
            'Jsi na dobré cestě, vydrž!'
        ]
    },
    '4': {
        image: 'cloud_sun.png',
        threshold: 1.0,
        texts: [
            'Někdy se prostě nedaří. Netrap se, zítra to zkus znova.',
            'Jsou to jen čísla, neboj se jich!',
            'Sluničko taky nesvítí každý den.',
            'Přidáme v tréninku a příště to bude lepší!',
            'Hip, hip nevzdávej se!'
        ]
    }
}
