import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { ethers } from 'ethers';
import styles from "./style.module.scss";
import globalStore from "../../stores/global";
import { UserBalanceDataService } from "../../services/userBalanceDataProvider";

interface BalanceData {
  eth: string;
  usdc: string;
}

const IsLogin: React.FC = () => {
  const account = useAccount();
  const { inputAddress } = globalStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [balances, setBalances] = useState<BalanceData>({
    eth: '0',
    usdc: '0'
  });

  // 从合约侧获取用户钱包余额
  const getBalance = async () => {
    setLoading(true);
    setError(null);
    try {
      // 根据是否连接钱包选择 provider
      let provider: ethers.providers.Provider;
      if (account.address) {
        provider = new ethers.providers.Web3Provider(window.ethereum);
      } else {
        provider = new ethers.providers.JsonRpcProvider('https://eth.llamarpc.com');
      }
      
      const service = new UserBalanceDataService(provider, '0xC7be5307ba715ce89b152f3Df0658295b3dbA8E2');
      const userAddress = account.address || inputAddress;
      
      // 查询ETH和USDC余额
      const balanceResults = await service.getBatchBalanceOf(
        [userAddress], 
        [
          '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',  // ETH
          '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'   // USDC
        ]
      );

      // 更新状态 - USDC精度为6，ETH精度为18
      setBalances({
        eth: ethers.utils.formatEther(balanceResults[0] || '0'),
        usdc: ethers.utils.formatUnits(balanceResults[1] || '0', 6)
      });
    } catch (err) {
      console.error('获取余额失败:', err);
      setError(err instanceof Error ? err.message : '获取余额失败');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (account.address || (inputAddress && ethers.utils.isAddress(inputAddress))) {
      getBalance();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account.address, inputAddress]);

  return (
    <div className={styles.isLogin}>
      <div className={styles.balanceContainer}>
        <h2>钱包余额</h2>
        {loading ? (
          <div className={styles.loading}>加载中...</div>
        ) : error ? (
          <div className={styles.error}>{error}</div>
        ) : (
          <div className={styles.balanceInfo}>
            <div className={styles.balanceItem}>
              <span className={styles.label}>ETH:</span>
              <span className={styles.value}>{Number(balances.eth).toFixed(4)}</span>
            </div>
            <div className={styles.balanceItem}>
              <span className={styles.label}>USDC:</span>
              <span className={styles.value}>{Number(balances.usdc).toFixed(2)}</span>
            </div>
          </div>
        )}
        <div className={styles.address}>
          当前地址: {account.address || inputAddress || '未连接'}
        </div>
      </div>
    </div>
  );
};

export default IsLogin;
