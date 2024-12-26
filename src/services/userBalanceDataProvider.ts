import { ethers } from 'ethers';
import { UserBalance } from '../types/contracts/UserBalance';
import UserBalanceABI from '../abis/UserBalance.json';

export class UserBalanceDataService {
  private provider: ethers.providers.Provider;
  private userBalanceContract: UserBalance;

  constructor(
    provider: ethers.providers.Provider,
    userBalanceAddress: string
  ) {
    this.provider = provider;
    this.userBalanceContract = new ethers.Contract(
      userBalanceAddress,
      UserBalanceABI,
      provider
    ) as UserBalance;
  }

  /**
   * 获取用户特定代币的余额
   * @param user 用户地址
   * @param token 代币地址
   */
  async getBalanceOf(
    user: string,
    token: string,
  ): Promise<ethers.BigNumber> {
    try {
      return await this.userBalanceContract.balanceOf(user, token);
    } catch (error) {
      console.error('Error fetching balance:', error);
      throw error;
    }
  }

  /**
   * 批量获取多个用户多个代币的余额
   * @param users 用户地址数组
   * @param tokens 代币地址数组
   */
  async getBatchBalanceOf(
    users: string[],
    tokens: string[],
  ): Promise<ethers.BigNumber[]> {
    try {
      return await this.userBalanceContract.batchBalanceOf(users, tokens);
    } catch (error) {
      console.error('Error fetching batch balances:', error);
      throw error;
    }
  }

  /**
   * 获取用户在特定提供者下的钱包余额
   * @param provider 提供者地址
   * @param user 用户地址
   * @returns [tokens: string[], balances: BigNumber[]]
   */
  async getUserWalletBalances(
    provider: string,
    user: string,
    overrides?: ethers.CallOverrides
  ): Promise<{
    tokens: string[];
    balances: ethers.BigNumber[];
  }> {
    try {
      const [tokens, balances] = await this.userBalanceContract.getUserWalletBalances(
        provider,
        user,
        overrides
      );
      return {
        tokens,
        balances
      };
    } catch (error) {
      console.error('Error fetching user wallet balances:', error);
      throw error;
    }
  }

  /**
   * 获取合约实例
   */
  getContractInstance(): UserBalance {
    return this.userBalanceContract;
  }
}
