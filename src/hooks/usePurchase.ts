import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { 
  PublicKey, 
  Transaction, 
  SystemProgram, 
  SYSVAR_RENT_PUBKEY, 
  TransactionInstruction 
} from "@solana/web3.js";
import { TOKEN_PROGRAM_ID, getAssociatedTokenAddress, createAssociatedTokenAccountInstruction } from "@solana/spl-token";
import { useCallback } from "react";

// Configurações do programa
const PROGRAM_ID = new PublicKey(
  "EiQYWvbnjdmoQjgeP19ULboDs1XNB5kP1bgXx7rGvgV9"
);
const TOKEN_MINT = new PublicKey(
  "FkrCkX4HfbRU1g5pbaU97nSZusQavmKwqNpEY1nBE9ti"
);

export function usePurchase() {
  const { connection } = useConnection();
  const wallet = useWallet();

  const purchase = useCallback(async (amount: number, itemId: string) => {
    if (!wallet.publicKey || !wallet.signTransaction) {
      throw new Error("Carteira não conectada ou não suporta assinatura");
    }

    try {
      console.log("Iniciando compra com:", {
        amount,
        itemId,
        buyerPubkey: wallet.publicKey.toString()
      });

      // Verificar se itemId é uma string válida
      if (!itemId || typeof itemId !== 'string') {
        throw new Error('ID do item inválido');
      }

      // Encontrar o PDA do pool
      const [poolPDA] = PublicKey.findProgramAddressSync(
        [Buffer.from("token-pool"), TOKEN_MINT.toBuffer()],
        PROGRAM_ID
      );
      console.log("Pool PDA:", poolPDA.toString());

      // Encontrar o PDA do token vault
      const [tokenVaultPDA] = PublicKey.findProgramAddressSync(
        [Buffer.from("token-vault"), poolPDA.toBuffer()],
        PROGRAM_ID
      );
      console.log("Token Vault PDA:", tokenVaultPDA.toString());

      // Encontrar o PDA do histórico de compras
      const [purchaseHistoryPDA] = PublicKey.findProgramAddressSync(
        [Buffer.from("purchase-history")],
        PROGRAM_ID
      );
      console.log("Purchase History PDA:", purchaseHistoryPDA.toString());

      // Encontrar o PDA de guarda contra reentrância
      const [reentrancyGuardPDA] = PublicKey.findProgramAddressSync(
        [Buffer.from("reentrancy-guard")],
        PROGRAM_ID
      );
      console.log("Reentrancy Guard PDA:", reentrancyGuardPDA.toString());

      // Obter o endereço da conta associada de token do usuário
      const buyerTokenAccount = await getAssociatedTokenAddress(
        TOKEN_MINT,
        wallet.publicKey,
        true // allowOwnerOffCurve
      );
      console.log("Buyer Token Account:", buyerTokenAccount.toString());

      // Verificar se a conta de token do comprador existe
      let transaction = new Transaction();
      try {
        const accountInfo = await connection.getAccountInfo(buyerTokenAccount);
        if (!accountInfo) {
          console.log("Conta de token não existe, criando...");
          // Se a conta não existir, criar instrução para criá-la
          const createATAIx = createAssociatedTokenAccountInstruction(
            wallet.publicKey,
            buyerTokenAccount,
            wallet.publicKey,
            TOKEN_MINT
          );
          transaction.add(createATAIx);
        }
      } catch (error) {
        console.log("Erro ao verificar conta, tentando criar:", error);
        // Em caso de erro, tentar criar a conta
        const createATAIx = createAssociatedTokenAccountInstruction(
          wallet.publicKey,
          buyerTokenAccount,
          wallet.publicKey,
          TOKEN_MINT
        );
        transaction.add(createATAIx);
      }

      console.log("Preparando instrução de compra simulada...");

      // Codificar o comando de compra manualmente
      const itemIdBuffer = Buffer.from(itemId);
      const amountBuffer = Buffer.alloc(8);
      
      // Escrever o valor como BigInt
      amountBuffer.writeBigUInt64LE(BigInt(amount), 0);
      
      // Combinando os buffers
      const dataBuffer = Buffer.concat([
        Buffer.from([1]), // Código da instrução (1 = purchase)
        amountBuffer,     // Valor da compra
        itemIdBuffer      // ID do item
      ]);
      
      console.log("Buffer de dados criado com sucesso:", {
        totalSize: dataBuffer.length,
        instruction: 1,
        amount: amount,
        itemId: itemId
      });
      
      // Criar a instrução de purchase
      const purchaseIx = new TransactionInstruction({
        programId: PROGRAM_ID,
        keys: [
          { pubkey: wallet.publicKey, isSigner: true, isWritable: true },
          { pubkey: buyerTokenAccount, isSigner: false, isWritable: true },
          { pubkey: poolPDA, isSigner: false, isWritable: true },
          { pubkey: tokenVaultPDA, isSigner: false, isWritable: true },
          { pubkey: purchaseHistoryPDA, isSigner: false, isWritable: true },
          { pubkey: reentrancyGuardPDA, isSigner: false, isWritable: true },
          { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
          { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
          { pubkey: SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false },
        ],
        data: dataBuffer
      });

      // Adicionar instrução de compra à transação
      transaction.add(purchaseIx);
      
      console.log("Enviando transação...");
      
      // Enviar e confirmar transação
      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = wallet.publicKey;
      
      // Assinar a transação
      const signedTx = await wallet.signTransaction(transaction);
      
      // Enviar a transação assinada
      const txid = await connection.sendRawTransaction(signedTx.serialize());
      console.log("Transação enviada:", txid);
      
      // Aguardar confirmação
      const confirmation = await connection.confirmTransaction(txid, "confirmed");
      console.log("Confirmação:", confirmation);

      console.log("Compra realizada com sucesso!");
      return txid;
    } catch (error: any) {
      console.error("Erro ao realizar compra:", error);
      // Melhoria das mensagens de erro
      if (error.message && error.message.includes("undefined (reading 'size')")) {
        throw new Error("Erro ao processar dados da transação. Formato inválido para o ID do item ou valor.");
      } else if (error.message && error.message.includes("custom program error")) {
        throw new Error(`Erro no contrato: ${error.message}`);
      } else {
        throw error;
      }
    }
  }, [connection, wallet]);

  return { purchase };
}
