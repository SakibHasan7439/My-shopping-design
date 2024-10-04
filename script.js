const loadProducts = async(searchText="") =>{
    try {
        const res = await fetch(`https://fakestoreapi.com/products?title=${searchText}`);
        const data = await res.json(); 
        displayProduct(data);

    }catch(err){

        console.log("ERROR", err);
    }
}

const displayProduct = (products) =>{
    const productContainer = document.getElementById("product-container");
    productContainer.innerHTML = "";
    products.map((item)=>{
        const card = document.createElement("div");
        card.innerHTML = `
        <div class="card h-[350px] card-compact shadow-md">
            <figure class="h-[200px]">
            <img class="h-full object-cover"
            src="${item.image}"
            alt="Shoes" />
        </figure>
        <div class="card-body">
            <h2 class="card-title">${item.title}</h2>
            <p>${item.price}</p>
            <div class="card-actions justify-end">
            <button onclick="loadDetails(${item?.id})" class="btn text-white bg-orange-500">MORE INFO</button>
            </div>
        </div>
        </div>
        `;

        productContainer.appendChild(card);
    })

}

const loadDetails = async(productId) =>{
    const res = await fetch(`https://fakestoreapi.com/products/${productId}`);
    const data = await res.json();

    showDetails(data);
}

const showDetails = (details) =>{
    const modalContent = document.getElementById("modal-content");

    modalContent.innerHTML = `
        <img class="mb-3 h-[300px] object-cover" src="${details?.image}" alt="image"/>
        <p>${details?.description}</p>
    `
    document.getElementById("customModal").showModal();
    
}

const loadCategories = async() =>{
    const res = await fetch('https://fakestoreapi.com/products/categories');
    const data = await res.json();
    displayCategory(data);
}

const loadCategoryVideos = async(category) =>{
    const res = await fetch(`https://fakestoreapi.com/products/category/${category}`);
    const data = await res.json();
    displayProduct(data);
}

const displayCategory = (categories) =>{
    categories.forEach(category => {
        const btn = document.createElement("button");
        btn.classList.add("bg-orange-500", "active:bg-orange-700", "py-2", "px-4", "rounded-md", "text-white");
        btn.innerHTML = `${category}`;

        btn.addEventListener("click", ()=>{
            loadCategoryVideos(category);
            hideClass("showSpinner");
            showClass("product-container");
            document.getElementById("product-container").classList.remove("grid");

            setTimeout(()=>{
                showClass("showSpinner");
                hideClass("product-container");
                document.getElementById("product-container").classList.add("grid");

            }, 2000);
            
        });

        const categories = document.getElementById("categories");
        categories.appendChild(btn);
    });
}

document.getElementById("reload-btn").addEventListener("click", ()=>{
    location.reload();
});

// document.getElementById("search").addEventListener("keyup", (event)=>{
//     loadProducts(event.target.value);
// })

const showClass = (id) =>{
    document.getElementById(id).classList.add("hidden");
}

const hideClass = (id) =>{
    document.getElementById(id).classList.remove("hidden");
}

loadCategories();
loadProducts();