let inventory =
JSON.parse(localStorage.getItem("inventory")) || [];

function saveData(){
    localStorage.setItem(
        "inventory",
        JSON.stringify(inventory)
    );
}

function addItem(){

    const name =
    document.getElementById("name").value;

    const qty =
    parseInt(document.getElementById("qty").value);

    const price =
    parseFloat(document.getElementById("price").value);

    if(!name || isNaN(qty) || isNaN(price)){
        alert("Fill all fields");
        return;
    }

    inventory.push({
        name,
        qty,
        price
    });

    saveData();
    renderTable();
}

function getStatus(qty){

    if(qty === 0)
        return "Out";

    if(qty <= 5)
        return "Low";

    return "Good";
}

function renderTable(){

    let search =
    document.getElementById("search")
    .value
    .toLowerCase();

    let table =
    document.getElementById("inventoryTable");

    table.innerHTML = "";

    let totalValue = 0;
    let low = 0;
    let out = 0;

    inventory
    .filter(item =>
        item.name.toLowerCase()
        .includes(search)
    )
    .forEach((item,index)=>{

        let status =
        getStatus(item.qty);

        if(status==="Low") low++;
        if(status==="Out") out++;

        totalValue +=
        item.qty * item.price;

        table.innerHTML += `
        <tr>
            <td>${item.name}</td>
            <td>${item.qty}</td>
            <td>${item.price}</td>
            <td class="${status.toLowerCase()}">
                ${status}
            </td>
            <td>
                <button onclick="deleteItem(${index})">
                    Delete
                </button>
            </td>
        </tr>`;
    });

    document.getElementById("totalProducts")
    .innerText = inventory.length;

    document.getElementById("lowStock")
    .innerText = low;

    document.getElementById("outStock")
    .innerText = out;

    document.getElementById("inventoryValue")
    .innerText =
    "OMR " + totalValue.toFixed(2);
}

function deleteItem(index){

    inventory.splice(index,1);

    saveData();
    renderTable();
}

renderTable();
