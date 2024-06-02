import React, { useState } from 'react';
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import { ethers } from 'ethers';
import EcommerceAbi from './abi/Ecommerce.json';

const CONTRACT_ADDRESS = 'YOUR_DEPLOYED_CONTRACT_ADDRESS';

const PurchaseProduct: React.FC = () => {
  const [productId, setProductId] = useState<number | null>(null);
  const [secretHash, setSecretHash] = useState<string>('');

  const { config } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    abi: EcommerceAbi,
    functionName: 'purchaseProduct',
    args: [productId, ethers.utils.keccak256(ethers.utils.toUtf8Bytes(secretHash))],
    overrides: {
      value: ethers.utils.parseEther('0.1'), // Replace with the actual product price
    },
  });

  const { write, data } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  const handlePurchase = () => {
    if (write) write();
  };

  return (
    <div>
      <input
        type="number"
        placeholder="Product ID"
        value={productId ?? ''}
        onChange={(e) => setProductId(Number(e.target.value))}
      />
      <input
        type="text"
        placeholder="Secret"
        value={secretHash}
        onChange={(e) => setSecretHash(e.target.value)}
      />
      <button onClick={handlePurchase} disabled={isLoading || !write}>
        Purchase
      </button>
      {isLoading && <p>Transaction in progress...</p>}
      {isSuccess && <p>Transaction successful!</p>}
    </div>
  );
};

export default PurchaseProduct;

