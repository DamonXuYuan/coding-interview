import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { http, WagmiProvider } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, base } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

function App() {
  const config = getDefaultConfig({
    appName: "test Pro",
    projectId: "734798448c471d6d73535535765d58cc",
    chains: [mainnet, polygon, optimism, arbitrum, base],
    ssr: true,
    // transports: {
    //   [mainnet.id]: http('https://eth-mainnet.g.alchemy.com/v2/YOUR_ALCHEMY_KEY'),
    //   [polygon.id]: http('https://polygon-mainnet.g.alchemy.com/v2/YOUR_ALCHEMY_KEY'),
    //   [optimism.id]: http('https://opt-mainnet.g.alchemy.com/v2/YOUR_ALCHEMY_KEY'),
    //   [arbitrum.id]: http('https://arb-mainnet.g.alchemy.com/v2/YOUR_ALCHEMY_KEY'),
    //   [base.id]: http('https://base-mainnet.g.alchemy.com/v2/YOUR_ALCHEMY_KEY'),
    // }
  });
  const queryClient = new QueryClient();

  return (
    <BrowserRouter>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </BrowserRouter>
  );
}

export default App;
