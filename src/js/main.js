jQuery.getJSON('users', function (users) {
    console.log('users', users);
});

//check user
function checkUser(user) {
    if (user.role > 4) {
        return true;
    } else {
        return false;
    }
};
