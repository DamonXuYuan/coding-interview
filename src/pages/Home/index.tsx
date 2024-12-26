import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import styles from "./style.module.scss";
import Header from "../Header";
import NoLogin from "../NoLogin";
import IsLogin from "../IsLogin";
import globalStore from "../../stores/global";

const Home: React.FC = () => {
  const account = useAccount();
  const [isLogin, setIsLogin] = useState(false);
  const { inputAddress } = globalStore();

  // 判断是否输入地址
  useEffect(() => {
    if (inputAddress) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [inputAddress]);

  // 判断是否连接钱包
  useEffect(() => {
    if (account.address) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [account]);

  return (
    <div className={styles.home}>
      <Header />
      {!isLogin ? <NoLogin /> : <IsLogin />}
    </div>
  );
};

export default Home;
