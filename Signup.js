import wixData from 'wix-data';
import wixLocation from 'wix-location';


$w('#signupButton').onClick(() => {
	const name = $w('#nameInput').value;
    const email = $w('#emailInput').value;
    const password = $w('#passwordInput').value;
    if (email && password && name) {
        const newUser = {
			      "name": name,
            "email": email,
            "password": password  
        };
        wixData.insert("Users", newUser)
        .then((result) => {
            console.log("User created:", result);
    			  wixLocation.to(`/login`);
        })
        .catch((err) => {
            console.log("Error during registration:", err);
        });
    }
});
