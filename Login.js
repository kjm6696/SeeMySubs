import wixData from 'wix-data';
import wixLocation from 'wix-location';

$w('#loginButton').onClick(() => {
	const name = $w('#nameField').value;
    const email = $w('#emailField').value;
    const password = $w('#passwordField').value;
    if (email && password && name) {
        wixData.query("Users").eq("email", email).eq("password", password).eq("name", name).find().then((results) => {
            if (results.items.length > 0) {
                wixLocation.to(`/users/${results.items[0].name}`);
            }
        })
        .catch((err) => {
            console.log(err);
        });
    }
});
