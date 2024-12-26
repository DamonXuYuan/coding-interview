import React, { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import styles from "./style.module.scss";
import globalStore from "../../stores/global";
import { formatAddress } from "../../utils";

const Header: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { inputAddress } = globalStore();
  const account = useAccount();

  // 输入框弹窗
  const Modal = () => {
    return (
      <div className={styles.modal}>
        <div className={styles.mask} onClick={() => setShowModal(false)} />
        <div className={styles.modalContent}>
          <div className={styles.tips}>
            Track wallet balance in read-only mode
          </div>
          <input
            value={inputValue}
            className={styles.inputs}
            placeholder="Enter ethereum address or ENS name"
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            className={styles.submit}
            onClick={() => {
              globalStore.setState({
                inputAddress: inputValue,
              });
              setShowModal(false);
            }}
          >
            Track wallet
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.header}>
      <span>Header</span>
      {!inputAddress ? (
        <div className={styles.connectWallet}>
          <ConnectButton />
          {!account.address && (
            <button
              className={styles.button}
              onClick={() => setShowModal(true)}
            >
              输入钱包地址
            </button>
          )}
        </div>
      ) : (
        <div>{formatAddress(inputAddress)}</div>
      )}
      {showModal && <Modal />}
    </div>
  );
};

export default Header;
