// szövegek nagybetűssé alakítása
//@param, str, string
function toUpper(str, callBack) {

    if(!callBack){
        console.error("No callback");
        return;
    }
    try {
        str = str.toUpperCase();
        callBack(false, str);
    } catch (err) {
        callBack(err, str);
    }
}


//Publikus elemek
module.exports = {
    tu: toUpper
};
