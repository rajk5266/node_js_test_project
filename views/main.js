window.addEventListener('DOMContentLoaded', async () => {
    try {
        let response = await axios.get('http://localhost:1010/endpoint')
        console.log(response.data)


        for (let i = 0; i < response.data.length; i++) {
            reloaddata(response.data[i])
        }

        let li = document.querySelectorAll('.newlist')
        let sellBtn = document.querySelectorAll('.sellbtn')
        let sellInput = document.querySelectorAll('.sellinput')

        for (let i = 0; i < li.length; i++) {
            sellBtn[i].onclick = () => {
                const productId = sellBtn[i].id
                console.log(productId)
                let inputvalue = sellInput[i].value

                if (response.data[i].quantity == 0) {
                    alert('The product is out of stock')
                    return;
                } else if (response.data[i].quantity < inputvalue) {
                    alert('Selling quantity should be less than available quantity')
                    return
                }
                else {
                    alert('confirm ?')
                }

                const updatedquantity = parseInt(response.data[i].quantity - inputvalue)
                
                li[i].textContent = '[ Product=' + response.data[i].product + '] [Description=' + response.data[i].description + '] [Price=' + response.data[i].price + '] [Quantity=' + updatedquantity + ']'


                updateProduct(productId, {
                    product: response.data[i].product,
                    description: response.data[i].description,
                    price: response.data[i].price,
                    quantity: updatedquantity
                })

            }
        }
    }
    catch (error) {
        alert('something went wrong');
    }
})

async function updateProduct(productId, updatedData) {
    try {
      const response = await axios.put(`http://localhost:1010/endpoint/${productId}`, updatedData);
    //   console.log(response.data);
    //   reloaddata(updatedData)
    // setTimeout(() => {
    //     location.reload();
    //   }, 0)
    } catch (error) {
      console.log(error);
    }
  }
  


function reloaddata(obj) {

    const parentelem = document.getElementById('lists')

    const childelem = document.createElement('li')
    childelem.className = 'newlist'
    childelem.textContent = '[ Product=' + obj.product + '] [Description=' + obj.description + '] [Price=' + obj.price + '] [Quantity=' + parseInt(obj.quantity) + ']'
    const sellbtn = document.createElement('input')
    const sellinput = document.createElement('input')
    sellbtn.className = 'sellbtn'
    sellinput.className = 'sellinput'
    sellbtn.type = 'button'
    sellinput.type = 'text'
    sellbtn.value = 'sell-item'
    sellbtn.id = obj.id
    sellinput.placeholder = 'Add-quantities to sell'
    childelem.appendChild(sellinput)
    childelem.appendChild(sellbtn)
    parentelem.appendChild(childelem)
}

function submitting(event) {
    event.preventDefault();
    const product = event.target.product.value;
    const description = event.target.description.value;
    const price = event.target.price.value;
    const quantity = parseInt(event.target.quantity.value);
    const obj = {
        product,
        description,
        price,
        quantity
    }
    console.log(obj)
    axios.post('http://localhost:1010/endpoint', obj)


}
