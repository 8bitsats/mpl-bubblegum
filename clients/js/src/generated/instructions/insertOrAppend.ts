/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  AccountMeta,
  Context,
  PublicKey,
  Serializer,
  Signer,
  TransactionBuilder,
  mapSerializer,
  transactionBuilder,
} from '@metaplex-foundation/umi';
import { addObjectProperty, isWritable } from '../shared';

// Accounts.
export type InsertOrAppendInstructionAccounts = {
  merkleTree: PublicKey;
  authority?: Signer;
  noop: PublicKey;
};

// Data.
export type InsertOrAppendInstructionData = {
  discriminator: Array<number>;
  root: Uint8Array;
  leaf: Uint8Array;
  index: number;
};

export type InsertOrAppendInstructionDataArgs = {
  root: Uint8Array;
  leaf: Uint8Array;
  index: number;
};

export function getInsertOrAppendInstructionDataSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<
  InsertOrAppendInstructionDataArgs,
  InsertOrAppendInstructionData
> {
  const s = context.serializer;
  return mapSerializer<
    InsertOrAppendInstructionDataArgs,
    any,
    InsertOrAppendInstructionData
  >(
    s.struct<InsertOrAppendInstructionData>(
      [
        ['discriminator', s.array(s.u8(), { size: 8 })],
        ['root', s.bytes({ size: 32 })],
        ['leaf', s.bytes({ size: 32 })],
        ['index', s.u32()],
      ],
      { description: 'InsertOrAppendInstructionData' }
    ),
    (value) => ({
      ...value,
      discriminator: [6, 42, 50, 190, 51, 109, 178, 168],
    })
  ) as Serializer<
    InsertOrAppendInstructionDataArgs,
    InsertOrAppendInstructionData
  >;
}

// Args.
export type InsertOrAppendInstructionArgs = InsertOrAppendInstructionDataArgs;

// Instruction.
export function insertOrAppend(
  context: Pick<Context, 'serializer' | 'programs' | 'identity'>,
  input: InsertOrAppendInstructionAccounts & InsertOrAppendInstructionArgs
): TransactionBuilder {
  const signers: Signer[] = [];
  const keys: AccountMeta[] = [];

  // Program ID.
  const programId = {
    ...context.programs.getPublicKey(
      'splAccountCompression',
      'cmtDvXumGCrqC1Age74AVPhSRVXJMd8PJS91L8KbNCK'
    ),
    isWritable: false,
  };

  // Resolved inputs.
  const resolvingAccounts = {};
  const resolvingArgs = {};
  addObjectProperty(
    resolvingAccounts,
    'authority',
    input.authority ?? context.identity
  );
  const resolvedAccounts = { ...input, ...resolvingAccounts };
  const resolvedArgs = { ...input, ...resolvingArgs };

  // Merkle Tree.
  keys.push({
    pubkey: resolvedAccounts.merkleTree,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.merkleTree, true),
  });

  // Authority.
  signers.push(resolvedAccounts.authority);
  keys.push({
    pubkey: resolvedAccounts.authority.publicKey,
    isSigner: true,
    isWritable: isWritable(resolvedAccounts.authority, false),
  });

  // Noop.
  keys.push({
    pubkey: resolvedAccounts.noop,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.noop, false),
  });

  // Data.
  const data =
    getInsertOrAppendInstructionDataSerializer(context).serialize(resolvedArgs);

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}