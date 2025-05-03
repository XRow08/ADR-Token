import { Connection, PublicKey } from "@solana/web3.js";
import {
  getAssociatedTokenAddress,
  getOrCreateAssociatedTokenAccount,
  transfer,
} from "@solana/spl-token";

const PROGRAM_ID = "EiQYWvbnjdmoQjgeP19ULboDs1XNB5kP1bgXx7rGvgV9";
const TOKEN_MINT = "FkrCkX4HfbRU1g5pbaU97nSZusQavmKwqNpEY1nBE9ti";
const PURCHASE_AMOUNT = 1000000;

export interface PurchaseRecord {
  buyer: string;
  tokenMint: string;
  amount: number;
  itemId: string;
  txSignature: string;
  timestamp: string;
  method: string;
}

export async function buyBox(
  wallet: any,
  itemId: string = "mystery-box-01",
  amount: number = PURCHASE_AMOUNT
) {
  if (!wallet || !wallet.publicKey) throw new Error("Wallet not connected");

  try {
    console.log("\n🔍 Box purchase via direct transfer to pool");
    console.log(`Token: ${TOKEN_MINT}`);
    console.log(`Amount: ${amount / 1e9} tokens`);
    console.log(`Item ID: ${itemId}`);
    console.log(`Buyer: ${wallet.publicKey.toString()}`);
    const connection = new Connection(
      "https://api.testnet.solana.com",
      "confirmed"
    );
    const solBalance = await connection.getBalance(wallet.publicKey);
    console.log(`SOL Balance: ${solBalance / 1e9} SOL`);
    const tokenMint = new PublicKey(TOKEN_MINT);
    console.log("\nVerifying buyer's token account...");

    const buyerTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      wallet,
      tokenMint,
      wallet.publicKey
    );

    const tokenBalance = await connection.getTokenAccountBalance(
      buyerTokenAccount.address
    );
    console.log(`Token balance: ${tokenBalance.value.uiAmount}`);

    if (
      tokenBalance.value.uiAmount &&
      tokenBalance.value.uiAmount < amount / 1e9
    ) {
      throw new Error(
        `Insufficient balance: required ${amount / 1e9}, available ${
          tokenBalance.value.uiAmount
        }`
      );
    }
    const programId = new PublicKey(PROGRAM_ID);

    const [poolPDA] = PublicKey.findProgramAddressSync(
      [Buffer.from("token-pool"), tokenMint.toBuffer()],
      programId
    );

    const [tokenVaultPDA] = PublicKey.findProgramAddressSync(
      [Buffer.from("token-vault"), poolPDA.toBuffer()],
      programId
    );

    console.log("PDAs found:");
    console.log(`- Pool: ${poolPDA.toString()}`);
    console.log(`- Token Vault: ${tokenVaultPDA.toString()}`);

    try {
      const poolBalance = await connection.getTokenAccountBalance(
        tokenVaultPDA
      );
      console.log(`Current pool balance: ${poolBalance.value.uiAmount} tokens`);
    } catch (error) {
      console.log("⚠️ Could not verify pool balance");
    }
    console.log("\nTransferring tokens to the pool...");

    const tx = await transfer(
      connection,
      wallet,
      buyerTokenAccount.address,
      tokenVaultPDA,
      wallet.publicKey,
      amount
    );

    console.log("\n✅ Direct transfer completed successfully!");
    console.log(`Transaction: ${tx}`);
    console.log(`Link: https://explorer.solana.com/tx/${tx}?cluster=testnet`);

    const newBalance = await connection.getTokenAccountBalance(
      buyerTokenAccount.address
    );
    console.log(`\nBalance before: ${tokenBalance.value.uiAmount}`);
    console.log(`Balance after: ${newBalance.value.uiAmount}`);
    if (tokenBalance.value.uiAmount && newBalance.value.uiAmount) {
      console.log(
        `Tokens sent: ${
          tokenBalance.value.uiAmount - newBalance.value.uiAmount
        }`
      );
    }

    const purchaseRecord: PurchaseRecord = {
      buyer: wallet.publicKey.toString(),
      tokenMint: TOKEN_MINT,
      amount: amount,
      itemId: itemId,
      txSignature: tx,
      timestamp: new Date().toISOString(),
      method: "direct-transfer",
    };
    console.log("\n📝 Purchase recorded:", purchaseRecord);

    return {
      success: true,
      transaction: tx,
      purchaseRecord,
    };
  } catch (error: any) {
    console.error("\n❌ Error in transfer:");
    console.error(error);

    if (error.message?.includes("insufficient funds")) {
      console.log(
        "\nTip: You may not have enough SOL to pay the transaction fee."
      );
    }

    throw error;
  }
}

export async function getTokenBalance(
  connection: Connection,
  walletAddress: string
) {
  try {
    const walletPublicKey = new PublicKey(walletAddress);
    const tokenAccount = await getAssociatedTokenAddress(
      new PublicKey(TOKEN_MINT),
      walletPublicKey,
      true
    );

    const balance = await connection.getTokenAccountBalance(tokenAccount);
    return balance.value.uiAmount;
  } catch (error) {
    console.error("Erro ao obter saldo de tokens:", error);
    return 0;
  }
}
