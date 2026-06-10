let inventory =
JSON.parse(localStorage.getItem("inventory")) || [];

function saveData(){
    localStorage.setItem(
        "inventory",
        JSON.stringify(inventory)
    );
}

function addItem(){

    let name =
    document.getElementById("name").value.trim();

    let qty =
    parseInt(document.getElementById("qty").value);

    let price =
    parseFloat(document.getElementById("price").value);

    if(!name || isNaN(qty) || isNaN(price)){
        alert("Please fill all fields.");
        return;
    }

    inventory.push({
        name,
        qty,
        price
    });

    document.getElementById("name").value="";
    document.getElementById("qty").value="";
    document.getElementById("price").value="";

    saveData();
    renderTable();
}

function getStatus(qty){

    if(qty===0)
        return "Out";

    if(qty<=5)
        return "Low";

    return "Good";
}

function increaseQty(index){

    inventory[index].qty++;

    saveData();
    renderTable();
}

function decreaseQty(index){

    if(inventory[index].qty>0){
        inventory[index].qty--;
    }

    saveData();
    renderTable();
}

function updateQty(index,value){

    inventory[index].qty =
    parseInt(value) || 0;

    saveData();
    renderTable();
}

function deleteItem(index){

    if(confirm("Delete item?")){

        inventory.splice(index,1);

        saveData();
        renderTable();
    }
}

function renderTable(){

    let search =
    document.getElementById("search")
    .value
    .toLowerCase();

    let table =
    document.getElementById("inventoryTable");

    table.innerHTML="";

    let low=0;
    let out=0;
    let totalValue=0;

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

            <td>

                <div class="qty-controls">

                    <button
                    class="qty-btn"
                    onclick="decreaseQty(${index})">
                    -
                    </button>

                    <input
                    class="qty-input"
                    type="number"
                    value="${item.qty}"
                    onchange="updateQty(${index},this.value)">

                    <button
                    class="qty-btn"
                    onclick="increaseQty(${index})">
                    +
                    </button>

                </div>

            </td>

            <td>
                OMR ${item.price.toFixed(2)}
            </td>

            <td>
                <span class="status ${status.toLowerCase()}">
                ${status}
                </span>
            </td>

            <td>

                <button
                class="delete-btn"
                onclick="deleteItem(${index})">
                Delete
                </button>

            </td>

        </tr>
        `;
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

renderTable();
