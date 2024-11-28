// Wix data library to manage data set operations.
import wixData from 'wix-data';
// Wix location library to travel throughout pages.
import wixLocation from 'wix-location';

//Action listener for the login button
$w('#loginButton').onClick(() => {
    // variables of fields
	// const name = $w('#nameField').value;
    const email = $w('#emailField').value;
    const password = $w('#passwordField').value;

    // if no email, no password, or no name DONT PASS
    if (email.includes("@") && password ) {

        //Wix data query to search for desired account
        wixData.query("Users")
        .eq("email", email)
        .eq("password", password)
        // .eq("name", name)
        //Will return linked account as results
        .find().then((results) => {
            // if there is an account linked
            if (results.items.length > 0) {
                // navigate to user dashboard of linked account
                wixLocation.to(`/users/${results.items[0].name}`);
            }
        })
        //if any errors occur
        .catch((err) => {
            // prints error to console
            console.log(err);
        });
    }
});
