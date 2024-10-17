
import wixData from 'wix-data';
import wixLocation from 'wix-location';

let currentRow;

$w.onReady(() => {
	$w('#addButton').onClick((event) => {
        $w('#editSub').hide();
        $w('#deleteSub').hide();
		if($w('#addSub').hidden){
			$w('#addSub').show();
		}
	})
});


$w('#submitButton').onClick(() => {
	const name = $w("#userText").text;
    const sub = $w('#subInput').value;
    const price = $w('#priceInput').value;
	const isActive = $w('#activeCheck').checked;
    if (sub && price && isActive) {
        const newSub = {
			"name": name,
            "subName": sub,
            "price": price,
			"isActive": isActive
        };
        wixData.insert("Subs", newSub)
        .then((result) => {
            console.log("Subscription Added:", result);
            wixLocation.to(wixLocation.url);
        })
        .catch((err) => {
            console.log("Error during sub addition:", err);
        });
    }
});

$w('#table1').onRowSelect((event) => {
    let rowData = event.rowData;
    $w('#addSub').hide();
    $w('#deleteSub').show();
    if($w("#editSub").hidden){
        $w("#subNameChange").value = rowData.subName;
        $w("#priceChange").value = rowData.price;
        $w("#isActiveChange").checked = rowData.isActive;
        currentRow = rowData;
		$w('#editSub').show();
    } else {
        $w("#subNameChange").value = rowData.subName;
        $w("#priceChange").value = rowData.price;
        $w("#isActiveChange").checked = rowData.isActive;
        currentRow = rowData;
    }
})

$w('#submitButtonChange').onClick((event) => {
    const name = $w('#userText').text;
    const sub = $w('#subNameChange').value;
    const price = $w('#priceChange').value;
	const isActive = $w('#isActiveChange').checked;
    const updatedSub = {
        "name": name,
        "subName": sub,
        "price": price,
        "isActive": isActive
    };
    wixData.query("Subs")
    .eq("name", currentRow.name)
    .eq("price", currentRow.price)
    .eq("isActive", currentRow.isActive)
    .find()
    .then((results) => {
        currentRow.subName = updatedSub.subName;
        currentRow.price = updatedSub.price;
        currentRow.isActive = updatedSub.isActive;
        wixData.update("Subs", currentRow);
        wixLocation.to(wixLocation.url);
    })
    .catch((err) =>{
        console.log(err);
    })
})

$w('#deleteSub').onClick((event) => {
    let currentSet = $w('#dataset1').getCurrentItem()._id
    wixData.remove("Subs", currentSet)
    .then((results) => {
        console.log(results);
        wixLocation.to(wixLocation.url);
    })
    .catch((err) => {
        console.log(err);
    })
})
