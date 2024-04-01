
/**
 * 
 * @param {string} email 
 * @param {string} password 
 */
function validate(email,password) {
    const result = { isValid:false, msg:"" };

    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
    const passwordRegex = /^(?=[^\\/`]*[0-9])(?=[^\\/`]*[a-z])(?=[^\\/`]*[A-Z])(?=[^\\/`]*[a-zA-Z])[^\\/`]{8,}$/g

    const emailMatch = email.match(emailRegex);
    if (!emailMatch) {
        result.msg = "Email Format Invalid!";
        return result;
    }
    
    const passwordMatch = password.match(passwordRegex);
    if (!passwordMatch) {
        result.msg = "Password should atleast contain 1 Uppercase, 1 Lowercase letter, 1 digit and should be of atleast length 8";
        return result;
    }

    result.isValid = true;
    return result;
}

export { validate };