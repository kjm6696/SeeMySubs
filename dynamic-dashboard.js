// Wix data library to manage data set operations.
import wixData from 'wix-data';
// Wix location library to travel throughout pages.
import wixLocation from 'wix-location';

//variable to store current row tabl
let currentRow;

//action listener for add button to unhide elements
$w.onReady(() => {
	$w('#addButton').onClick((event) => {
        // hides other elements that might interfere
        $w('#editSub').hide();
        $w('#deleteSub').hide();

        // check if add elements are hidden
		if($w('#addSub').hidden){
            // if is hidden .. show
			$w('#addSub').show();
		}
	})
});


// action listener for submit button (Add New Subscription)
$w('#submitButton').onClick(() => {

    // saved variables from input fields
	const name = $w("#userText").text;
    const sub = $w('#subInput').value;
    const price = $w('#priceInput').value;
	const isActive = $w('#activeCheck').checked;
    const date = $w('#dateField').value;

    // if all fields are filled out
    if (sub && price && isActive) {
        //save new subscription as a table
        const newSub = {
			"name": name,
            "subName": sub,
            "price": price,
			"isActive": isActive,
            "date": date
        };
        //insert new subscription from newSub table
        wixData.insert("Subs", newSub).then((result) => {
            // print in console success
            console.log("Subscription Added:", result);
            // Refresh page to show updated data
            wixLocation.to(wixLocation.url);
        // error catch if anything happens durring the process
        }).catch((err) => {
            console.log("Error during sub addition:", err);
        });
    }
});

// Action listener to show update and delete data options
$w('#table1').onRowSelect((event) => {
    // gets row data from selected row in table
    let rowData = event.rowData;

    //hides add new sub and shows delete
    $w('#addSub').hide();
    $w('#deleteSub').show();

    //if edit sub insert fields are hidden
    if($w("#editSub").hidden){
        // saves initial  state of pre-existing data
        $w("#subNameChange").value = rowData.subName;
        $w("#priceChange").value = rowData.price;
        $w("#isActiveChange").checked = rowData.isActive;
        // saves it to global variable if deletion is desired
        currentRow = rowData;
		$w('#editSub').show();
    } else {
        // saves initial  state of pre-existing data
        $w("#subNameChange").value = rowData.subName;
        $w("#priceChange").value = rowData.price;
        $w("#isActiveChange").checked = rowData.isActive;
        // saves it to global variable if deletion is desired
        currentRow = rowData;
    }
})

// Action listener for submit button for update subscription
$w('#submitButtonChange').onClick((event) => {
    //Variables for new updated information
    const name = $w('#userText').text;
    const sub = $w('#subNameChange').value;
    const price = $w('#priceChange').value;
	const isActive = $w('#isActiveChange').checked;

    // **If statement for empty fields

    //saves variables as a table
    const updatedSub = {
        "name": name,
        "subName": sub,
        "price": price,
        "isActive": isActive
    };

    //Wix data Query/Update 
    // Searches Subs Collection
    wixData.query("Subs")
    .eq("name", currentRow.name)
    .eq("price", currentRow.price)
    .eq("isActive", currentRow.isActive)
    .find().then((results) => {
        //update pre-existing data with new data
        currentRow.subName = updatedSub.subName;
        currentRow.price = updatedSub.price;
        currentRow.isActive = updatedSub.isActive;
        wixData.update("Subs", currentRow);
        //refresh page to show new dataset
        wixLocation.to(wixLocation.url);
    })
    // if any errors, print in console
    .catch((err) =>{
        console.log(err);
    })
})

// Action Listener for deletion of sub
$w('#deleteSub').onClick((event) => {
    //gets current collection data from clicked row
    //variable for desired subscription
    let currentSet = $w('#dataset1').getCurrentItem()._id
    //Wix data remove to remove the selected set from collection "Subs"
    wixData.remove("Subs", currentSet).then((results) => {
        console.log(results);
        //refresh page to show new data set
        wixLocation.to(wixLocation.url);
    })
    // if any errors print in console
    .catch((err) => {
        console.log(err);
    })
})

$w('#calcButton').onClick((event) => {
    if ($w('#calcWidget').hidden)  {
        $w('#calcWidget').show();
    }
})

// action listener for the calculate now button
$w('#costButton').onClick((event) => {
    // vairables to init.
    let curPrice = 0;
    let curItem;
    // query subs collection for assigned user subs
    wixData.query("Subs")
    .eq("name", $w('#userText').text)

    .find().then((results) => {
        // loop through the items
        for (let i = 0; i < results.length; i++ ){
            // make string to int to show value
            curItem = parseInt(results.items[i].price);
            //add items together
            curPrice = curPrice + curItem;
        }
        //update the "$" to the 
        $w('#costPriceText').text = "$" + curPrice.toString();
    })    
})
