import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { toActualBalance, toPlainBalance } from '../bitlyBignumber';

const tokenAddress = "0x199E550f7218042c7FF5368878ead820DF78b14C";

const TokenSend = (props) => {

  const [userAccount, setUserAccount] = useState()
  const [amount, setAmount] = useState()
  const { writeContract } = useWriteContract();

  // request access to the user's MetaMask account
//   async function requestAccount() {
//     await window.ethereum.request({ method: 'eth_requestAccounts' });
//   }

  async function sendCoins() {
    // if (typeof window.ethereum !== 'undefined') {
    //     await requestAccount()
    //     const provider = new ethers.providers.Web3Provider(window.ethereum);
    //     const signer = provider.getSigner();
    //     const contract = new ethers.Contract(tokenAddress, props.tokenContract.abi, signer);
    //     const transation = await contract.transfer(userAccount, amount);
    //     await transation.wait();
    //     console.log(`${amount} Coins successfully sent to ${userAccount}`);
    // }
    await writeContract({ 
      abi: props.tokenContract,
      address: tokenAddress,
      functionName: 'transfer',
      args: [
        userAccount,
        toPlainBalance(amount, 18).toString()
      ],
    });
  };
    return (
        <Card style={{background: "rgba(227, 104, 222, 0.71)"}}>
        <Card.Body>
        <Card.Subtitle> send faucet to an address
        </Card.Subtitle>
        <br></br>
        <div className="d-grid gap-2">
        <input onChange={e => setUserAccount(e.target.value)} placeholder="Payee 0x address" />
        <input onChange={e => setAmount(e.target.value)} placeholder="Amount" />
        <Button onClick={sendCoins} variant="success">send </Button>
        </div>
        </Card.Body>
        </Card>
    )
}

export default TokenSend
