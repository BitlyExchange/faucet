import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Message from './Message';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { toActualBalance, toPlainBalance } from '../bitlyBignumber';

const tokenAddress = "0x199E550f7218042c7FF5368878ead820DF78b14C";

const Faucet = (props) => {

  const [balance, setBalance] = useState();
  const [showBalance, setShowBalance] = useState(false);
  const account = useAccount();
  const balanceRet = useReadContract({
    abi: props.tokenContract,
    address: tokenAddress,
    functionName: 'balanceOf',
    args: [account.address]
  });
  const { writeContract } = useWriteContract();

  async function getBalance() {
    // if (typeof window.ethereum !== 'undefined') {
    //   const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
    //   const provider = new ethers.providers.Web3Provider(window.ethereum);
    //   const contract = new ethers.Contract(tokenAddress, props.tokenContract.abi, provider)
    //   const balance = await contract.balanceOf(account);
    //   console.log("Balance: ", balance.toString());
    //   setBalance(balance.toString());
    //   setShowBalance(true);
    // }
    await balanceRet.refetch();
    setBalance(toActualBalance(balanceRet.data.toString(), 18).toString());
    setShowBalance(true);
  }

  async function faucet() {
    // if (typeof window.ethereum !== 'undefined') {
    //   const account = await window.ethereum.request({ method: 'eth_requestAccounts' });
    //   const provider = new ethers.providers.Web3Provider(window.ethereum);
    //   const signer = provider.getSigner();
    //   const contract = new ethers.Contract(tokenAddress, props.tokenContract.abi, signer);
    //   contract.faucet(account[0], 100);
    // }
    const config = { 
      abi: props.tokenContract,
      address: tokenAddress,
      functionName: 'mint',
      args: [
        account.address,
        toPlainBalance("100", 18).toString()
      ],
    };
    await writeContract(config);
  }
    return (
        <div>
        <Card style={{background: "rgba(227, 104, 222, 0.71)"}}>
        <Card.Body>
        <Card.Subtitle>recieve faucet ERC20 to your wallet
        </Card.Subtitle><br></br>
        <div className="d-grid gap-2">
        <Button onClick={faucet}>get faucet token!</Button>
        <Button onClick={getBalance} variant="warning">check my balance</Button>
        { showBalance ? <Message balance={balance}/> : null }
        </div>
        </Card.Body>
        </Card>
        </div>
    )
}

export default Faucet
