// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IPeanutVault {
    function depositToVault(address token, uint256 amount, bytes32 secretHash) external returns (address);
    function withdrawFromVault(bytes32 secret) external;
}

interface IXMPT {
    function sendMessage(address recipient, string memory message) external;
}

interface IOlas {
    function rewardCustomer(address customer, uint256 amount) external;
}

contract Ecommerce {
    struct Product {
        uint id;
        string name;
        uint price;
        address payable owner;
    }

    uint public productCount = 0;
    mapping(uint => Product) public products;
    address public peanutVaultAddress;
    address public xmptAddress;
    address public olasAddress;

    event ProductCreated(uint id, string name, uint price, address owner);
    event ProductPurchased(uint id, string name, uint price, address owner, address buyer, address vault);
    event MessageSent(address indexed recipient, string message);
    event CustomerRewarded(address indexed customer, uint256 amount);

    constructor(address _peanutVaultAddress, address _xmptAddress, address _olasAddress) {
        peanutVaultAddress = _peanutVaultAddress;
        xmptAddress = _xmptAddress;
        olasAddress = _olasAddress;
    }

    function createProduct(string memory _name, uint _price) public {
        require(bytes(_name).length > 0, "Product name is required");
        require(_price > 0, "Product price must be greater than zero");
        productCount++;
        products[productCount] = Product(productCount, _name, _price, payable(msg.sender));
        emit ProductCreated(productCount, _name, _price, msg.sender);
    }

    function purchaseProduct(uint _id, bytes32 _secretHash) public payable {
        Product memory _product = products[_id];
        require(_product.id > 0 && _product.id <= productCount, "Invalid product ID");
        require(msg.value >= _product.price, "Not enough Ether sent");
        require(_product.owner != msg.sender, "Owner cannot buy their own product");

        // Deposit to Peanut Vault
        IPeanutVault peanutVault = IPeanutVault(peanutVaultAddress);
        address vault = peanutVault.depositToVault(address(0), msg.value, _secretHash); // Assuming Ether, use token address for ERC20

        // Reward customer using Olas
        IOlas olas = IOlas(olasAddress);
        olas.rewardCustomer(msg.sender, msg.value);

        emit ProductPurchased(_id, _product.name, _product.price, _product.owner, msg.sender, vault);
        emit CustomerRewarded(msg.sender, msg.value);
    }

    function withdrawFromVault(bytes32 _secret) public {
        IPeanutVault peanutVault = IPeanutVault(peanutVaultAddress);
        peanutVault.withdrawFromVault(_secret);
    }

    function sendMessage(address _recipient, string memory _message) public {
        IXMPT xmpt = IXMPT(xmptAddress);
        xmpt.sendMessage(_recipient, _message);
        emit MessageSent(_recipient, _message);
    }
}
