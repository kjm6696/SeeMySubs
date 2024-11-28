// Wix data library to manage data set operations.
import wixData from 'wix-data';
// Wix location library to travel throughout pages.
import wixLocation from 'wix-location';

// Action listener for submit button
$w('#signupButton').onClick(() => {
    // values from fields as variables
	const name = $w('#nameField').value;
    const lastName = $w('#lastNameField').value;
    const email = $w('#emailField').value;
    const password = $w('#passwordField').value;

    //check for empty fields
    if (email.includes("@") && password && name && lastName) {

        //create table to create new user
        const newUser = {
			"name": name,
            "email": email,
            "password": password,
            "lastName": lastName
        };
        // wix data insert to insert new user information into database "User"
        wixData.insert("Users", newUser).then((result) => {
            // Navigate to login page upon new user creation success 
			wixLocation.to(`/login`);
        })
        //print errors if any occur durring signup process
        .catch((err) => {
            console.log(err);
        });
    }
});
