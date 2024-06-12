import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import TokenSend from './components/TokenSend.js'
import Faucet from './components/Faucet.js'
import ERC20Token from './artifacts/contracts/ERC20.sol/ERC20Token.json'

import { Container, Row, Col, Card } from 'react-bootstrap'
import { createWeb3Modal } from '@web3modal/wagmi/react'
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'

import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// garnet chain config
const garnet = {
	id: 17069,
	name: 'Garnet',
	nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
	rpcUrls: {
		default: { http: ['https://rpc.garnetchain.com'] },
		public: { http: ['https://rpc.garnetchain.com'] },
	},
};

// 0. Setup queryClient
const queryClient = new QueryClient();

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = '30b9081364c991aa396822377425dd95';

// 2. Create wagmiConfig
const metadata = {
    name: 'bitly.exchange',
    description: 'Multi-chain onchain-orderbook DEX',
    url: 'https://bitly.exchange', // origin must match your domain & subdomain
    icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const chains = [garnet];
const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
})

// 3. Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true // Optional - false as default
})

function ConnectButton() {
  return (
    <div style={{backgroundColor: "violet", margin: "1rem"}}>
      <w3m-button />
    </div>
  );
}

function App() {

  const Token = ERC20Token;

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
    <div className="App">
    <div>
    Receive $USDT token on Garnet testnet
    { ConnectButton() }
    <Card.Body>
    <Container>
    <Row className="justify-content-md-center">
      <Col>
      <Faucet  tokenContract={Token}/>
      </Col>
      <Col>
      <TokenSend tokenContract={Token}/>
      </Col>
    </Row>
    </Container>
    </Card.Body>
    </div>

    </div>
    </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
