import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import styles from "./style.module.scss";

// 未连接钱包或未输入钱包地址且无返回值时
const NoLogin: React.FC = () => {
  return (
    <div className={styles.noLoginSection}>
      <div className={styles.title}>Please, connect your wallet</div>
      <div className={styles.subTitle}>
        Please connect your wallet to see your supplies, borrowings, and open
        positions.
      </div>
      <ConnectButton />
    </div>
  );
};

export default NoLogin;
