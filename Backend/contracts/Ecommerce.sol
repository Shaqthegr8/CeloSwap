// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Ecommerce {
    struct Product {
        uint id;
        string name;
        uint price;
        address payable owner;
    }

    uint public productCount = 0;
    mapping(uint => Product) public products;

    event ProductCreated(uint id, string name, uint price, address owner);
    event ProductPurchased(uint id, string name, uint price, address owner, address buyer);

    function createProduct(string memory _name, uint _price) public {
        require(bytes(_name).length > 0, "Product name is required");
        require(_price > 0, "Product price must be greater than zero");
        productCount++;
        products[productCount] = Product(productCount, _name, _price, payable(msg.sender));
        emit ProductCreated(productCount, _name, _price, msg.sender);
    }

    function purchaseProduct(uint _id) public payable {
        Product memory _product = products[_id];
        require(_product.id > 0 && _product.id <= productCount, "Invalid product ID");
        require(msg.value >= _product.price, "Not enough Celo sent");
        require(_product.owner != msg.sender, "Owner cannot buy their own product");

        address payable _seller = _product.owner;
        _product.owner = payable(msg.sender);
        products[_id] = _product;
        _seller.transfer(msg.value);

        emit ProductPurchased(_id, _product.name, _product.price, _seller, msg.sender);
    }
}
