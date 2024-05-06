function CheckPermission(userID, isAdmin, admin = false) {
    console.log(userID, isAdmin, admin);

    if(userID === undefined || userID === null)
        return false;

    if(admin && (isAdmin === undefined || isAdmin === null || isAdmin == 0))
        return false;

    return true;
}

export default CheckPermission;