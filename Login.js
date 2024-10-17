

import wixData from 'wix-data';
import wixLocation from 'wix-location';

$w('#loginButton').onClick(() => {
	const name = $w('#nameInput2').value;
    const email = $w('#emailInput2').value;
    const password = $w('#passwordInput2').value;
    if (email && password && name) {
        wixData.query("Users")
        .eq("email", email)
        .eq("password", password)
		    .eq("name", name)
        .find()
        .then((results) => {
            if (results.items.length > 0) {
                wixLocation.to(`/users/${results.items[0].name}`);
            } else {
                console.log("Error");
            }
        })
        .catch((err) => {
            console.log(err);
        });
    }
});
