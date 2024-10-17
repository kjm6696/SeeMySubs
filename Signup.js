import wixData from 'wix-data';
import wixLocation from 'wix-location';


$w('#signupButton').onClick(() => {
	const name = $w('#nameField').value;
    	const email = $w('#emailField').value;
   	 const password = $w('#passwordField').value;
    	if (email && password && name) {
      	  const newUser = {
		"name": name,
        	"email": email,
            	"password": password  
       	 };
      	  wixData.insert("Users", newUser).then((result) => {
		wixLocation.to(`/login`);
        })
        .catch((err) => {
            	console.log(err);
        });
    }
});
