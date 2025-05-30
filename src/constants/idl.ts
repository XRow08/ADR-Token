export const idl = {
  "accounts": [
    {
      "discriminator": [
        189,
        255,
        97,
        70,
        186,
        189,
        24,
        102
      ],
      "name": "ConfigAccount"
    },
    {
      "discriminator": [
        149,
        0,
        165,
        163,
        182,
        162,
        192,
        134
      ],
      "name": "NFTMetadata"
    },
    {
      "discriminator": [
        214,
        107,
        73,
        138,
        146,
        104,
        208,
        57
      ],
      "name": "NftCounter"
    },
    {
      "discriminator": [
        80,
        158,
        67,
        124,
        50,
        189,
        192,
        255
      ],
      "name": "StakeAccount"
    }
  ],
  "address": "9cDdb8o8hnfZjvKffc9pzGhvcEG7dVjg9yXHMDuL975v",
  "errors": [
    {
      "code": 6000,
      "msg": "Você não está autorizado a realizar esta ação",
      "name": "Unauthorized"
    },
    {
      "code": 6001,
      "msg": "Token de pagamento inválido",
      "name": "InvalidPaymentToken"
    },
    {
      "code": 6002,
      "msg": "Valor de pagamento inválido",
      "name": "InvalidPaymentAmount"
    },
    {
      "code": 6003,
      "msg": "Token de pagamento não configurado",
      "name": "PaymentTokenNotConfigured"
    },
    {
      "code": 6004,
      "msg": "Staking não está habilitado",
      "name": "StakingNotEnabled"
    },
    {
      "code": 6005,
      "msg": "Valor de stake inválido",
      "name": "InvalidStakeAmount"
    },
    {
      "code": 6006,
      "msg": "Fundos insuficientes",
      "name": "InsufficientFunds"
    },
    {
      "code": 6007,
      "msg": "Período de staking não completado",
      "name": "StakingPeriodNotCompleted"
    },
    {
      "code": 6008,
      "msg": "Recompensas já foram reivindicadas",
      "name": "RewardsAlreadyClaimed"
    },
    {
      "code": 6009,
      "msg": "Pagamento não aprovado. Use approve_delegate primeiro",
      "name": "PaymentNotApproved"
    },
    {
      "code": 6010,
      "msg": "O sistema está pausado para emergência",
      "name": "SystemPaused"
    },
    {
      "code": 6011,
      "msg": "Valor de entrada inválido",
      "name": "InvalidInput"
    },
    {
      "code": 6012,
      "msg": "Erro de overflow matemático",
      "name": "MathOverflow"
    },
    {
      "code": 6013,
      "msg": "Valor de stake excede o limite máximo permitido",
      "name": "StakeAmountTooLarge"
    },
    {
      "code": 6014,
      "msg": "Este stake já foi reivindicado",
      "name": "StakeAlreadyClaimed"
    },
    {
      "code": 6015,
      "msg": "Reserva de recompensas insuficiente",
      "name": "InsufficientRewardReserve"
    },
    {
      "code": 6016,
      "msg": "Conta de reserva de recompensas inválida",
      "name": "InvalidRewardReserve"
    }
  ],
  "events": [
    {
      "discriminator": [
        158,
        144,
        170,
        167,
        15,
        184,
        45,
        12
      ],
      "name": "ConfigUpdateEvent"
    },
    {
      "discriminator": [
        159,
        241,
        192,
        232,
        29,
        208,
        51,
        21
      ],
      "name": "EmergencyPauseEvent"
    },
    {
      "discriminator": [
        169,
        109,
        164,
        175,
        240,
        130,
        209,
        25
      ],
      "name": "StakeAddedEvent"
    },
    {
      "discriminator": [
        134,
        138,
        97,
        88,
        73,
        6,
        150,
        64
      ],
      "name": "StakeUpdatedEvent"
    },
    {
      "discriminator": [
        214,
        146,
        230,
        38,
        71,
        208,
        207,
        86
      ],
      "name": "StakingEvent"
    },
    {
      "discriminator": [
        51,
        27,
        242,
        215,
        185,
        35,
        71,
        20
      ],
      "name": "TokenBurnEvent"
    },
    {
      "discriminator": [
        249,
        22,
        125,
        15,
        215,
        161,
        9,
        170
      ],
      "name": "UnstakingEvent"
    }
  ],
  "instructions": [
    {
      "accounts": [
        {
          "name": "owner",
          "signer": true,
          "writable": true
        },
        {
          "name": "token_account",
          "writable": true
        },
        {
          "name": "delegate"
        },
        {
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
          "name": "token_program"
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ],
      "discriminator": [
        68,
        6,
        248,
        64,
        195,
        222,
        182,
        223
      ],
      "name": "approve_delegate"
    },
    {
      "accounts": [
        {
          "name": "admin",
          "signer": true,
          "writable": true
        },
        {
          "name": "config",
          "writable": true
        }
      ],
      "args": [
        {
          "name": "enabled",
          "type": "bool"
        },
        {
          "name": "reward_rate",
          "type": "u64"
        }
      ],
      "discriminator": [
        74,
        230,
        119,
        25,
        252,
        188,
        254,
        177
      ],
      "name": "configure_staking"
    },
    {
      "accounts": [
        {
          "name": "admin",
          "signer": true,
          "writable": true
        },
        {
          "name": "admin_token_account",
          "pda": {
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            },
            "seeds": [
              {
                "kind": "account",
                "path": "admin"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "token_mint"
              }
            ]
          },
          "writable": true
        },
        {
          "name": "reward_reserve_account",
          "pda": {
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            },
            "seeds": [
              {
                "kind": "account",
                "path": "stake_authority"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "token_mint"
              }
            ]
          },
          "writable": true
        },
        {
          "name": "token_mint"
        },
        {
          "name": "stake_authority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  97,
                  107,
                  101,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "config"
        },
        {
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
          "name": "token_program"
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ],
      "discriminator": [
        178,
        233,
        187,
        124,
        117,
        171,
        0,
        41
      ],
      "name": "deposit_reward_reserve"
    },
    {
      "accounts": [
        {
          "name": "user",
          "signer": true
        },
        {
          "name": "stake_account"
        }
      ],
      "args": [],
      "discriminator": [
        35,
        230,
        56,
        50,
        109,
        117,
        171,
        177
      ],
      "name": "get_current_stake",
      "returns": {
        "defined": {
          "name": "StakeInfo"
        }
      }
    },
    {
      "accounts": [
        {
          "name": "user",
          "signer": true
        },
        {
          "name": "config"
        }
      ],
      "args": [],
      "discriminator": [
        94,
        242,
        214,
        203,
        78,
        134,
        74,
        210
      ],
      "name": "get_user_stakes",
      "returns": {
        "vec": {
          "defined": {
            "name": "StakeInfo"
          }
        }
      }
    },
    {
      "accounts": [
        {
          "name": "payer",
          "signer": true,
          "writable": true
        },
        {
          "name": "collection_mint",
          "signer": true,
          "writable": true
        },
        {
          "name": "collection_metadata",
          "signer": true,
          "writable": true
        },
        {
          "name": "collection_token_account",
          "pda": {
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            },
            "seeds": [
              {
                "kind": "account",
                "path": "payer"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "collection_mint"
              }
            ]
          },
          "writable": true
        },
        {
          "name": "config",
          "signer": true,
          "writable": true
        },
        {
          "name": "nft_counter",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  110,
                  102,
                  116,
                  95,
                  99,
                  111,
                  117,
                  110,
                  116,
                  101,
                  114
                ]
              }
            ]
          },
          "writable": true
        },
        {
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
          "name": "token_program"
        },
        {
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
          "name": "associated_token_program"
        },
        {
          "address": "11111111111111111111111111111111",
          "name": "system_program"
        },
        {
          "address": "SysvarRent111111111111111111111111111111111",
          "name": "rent"
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "symbol",
          "type": "string"
        },
        {
          "name": "uri",
          "type": "string"
        }
      ],
      "discriminator": [
        112,
        62,
        53,
        139,
        173,
        152,
        98,
        93
      ],
      "name": "initialize_collection"
    },
    {
      "accounts": [
        {
          "name": "admin",
          "signer": true,
          "writable": true
        },
        {
          "name": "reward_reserve_account",
          "pda": {
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            },
            "seeds": [
              {
                "kind": "account",
                "path": "stake_authority"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "token_mint"
              }
            ]
          },
          "writable": true
        },
        {
          "name": "token_mint"
        },
        {
          "name": "stake_authority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  97,
                  107,
                  101,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "config",
          "writable": true
        },
        {
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
          "name": "token_program"
        },
        {
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
          "name": "associated_token_program"
        },
        {
          "address": "11111111111111111111111111111111",
          "name": "system_program"
        },
        {
          "address": "SysvarRent111111111111111111111111111111111",
          "name": "rent"
        }
      ],
      "args": [],
      "discriminator": [
        104,
        13,
        114,
        108,
        128,
        174,
        131,
        57
      ],
      "name": "initialize_reward_reserve"
    },
    {
      "accounts": [
        {
          "name": "payer",
          "signer": true,
          "writable": true
        },
        {
          "name": "nft_counter",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  110,
                  102,
                  116,
                  95,
                  99,
                  111,
                  117,
                  110,
                  116,
                  101,
                  114
                ]
              }
            ]
          },
          "writable": true
        },
        {
          "name": "nft_mint",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  110,
                  102,
                  116,
                  95,
                  109,
                  105,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "collection_metadata"
              },
              {
                "account": "NftCounter",
                "kind": "account",
                "path": "nft_counter.count"
              }
            ]
          },
          "writable": true
        },
        {
          "name": "nft_metadata",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  110,
                  102,
                  116,
                  95,
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97
                ]
              },
              {
                "kind": "account",
                "path": "nft_mint"
              }
            ]
          },
          "writable": true
        },
        {
          "name": "nft_token_account",
          "pda": {
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            },
            "seeds": [
              {
                "kind": "account",
                "path": "payer"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "nft_mint"
              }
            ]
          },
          "writable": true
        },
        {
          "name": "collection_metadata"
        },
        {
          "name": "payment_token_mint",
          "writable": true
        },
        {
          "name": "payer_payment_token_account",
          "pda": {
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            },
            "seeds": [
              {
                "kind": "account",
                "path": "payer"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "payment_token_mint"
              }
            ]
          },
          "writable": true
        },
        {
          "name": "config",
          "writable": true
        },
        {
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
          "name": "token_program"
        },
        {
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
          "name": "associated_token_program"
        },
        {
          "address": "11111111111111111111111111111111",
          "name": "system_program"
        },
        {
          "address": "SysvarRent111111111111111111111111111111111",
          "name": "rent"
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "symbol",
          "type": "string"
        },
        {
          "name": "uri",
          "type": "string"
        },
        {
          "name": "amount",
          "type": "u64"
        }
      ],
      "discriminator": [
        58,
        176,
        6,
        207,
        250,
        176,
        194,
        85
      ],
      "name": "mint_nft_with_payment"
    },
    {
      "accounts": [
        {
          "name": "admin",
          "signer": true,
          "writable": true
        },
        {
          "name": "config",
          "writable": true
        }
      ],
      "args": [
        {
          "name": "paused",
          "type": "bool"
        },
        {
          "name": "reason",
          "type": "string"
        }
      ],
      "discriminator": [
        216,
        204,
        65,
        234,
        19,
        243,
        233,
        25
      ],
      "name": "set_emergency_pause"
    },
    {
      "accounts": [
        {
          "name": "admin",
          "signer": true,
          "writable": true
        },
        {
          "name": "config",
          "writable": true
        }
      ],
      "args": [
        {
          "name": "payment_token_mint",
          "type": "pubkey"
        }
      ],
      "discriminator": [
        155,
        213,
        140,
        249,
        53,
        59,
        20,
        5
      ],
      "name": "set_payment_token"
    },
    {
      "accounts": [
        {
          "name": "admin",
          "signer": true,
          "writable": true
        },
        {
          "name": "config",
          "writable": true
        }
      ],
      "args": [
        {
          "name": "reward_reserve",
          "type": "pubkey"
        }
      ],
      "discriminator": [
        139,
        50,
        20,
        12,
        50,
        224,
        16,
        67
      ],
      "name": "set_reward_reserve"
    },
    {
      "accounts": [
        {
          "name": "staker",
          "signer": true,
          "writable": true
        },
        {
          "name": "token_mint"
        },
        {
          "name": "staker_token_account",
          "pda": {
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            },
            "seeds": [
              {
                "kind": "account",
                "path": "staker"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "token_mint"
              }
            ]
          },
          "writable": true
        },
        {
          "name": "stake_account",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  97,
                  107,
                  101,
                  95,
                  97,
                  99,
                  99,
                  111,
                  117,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "staker"
              },
              {
                "kind": "account",
                "path": "token_mint"
              }
            ]
          },
          "writable": true
        },
        {
          "name": "stake_token_account",
          "pda": {
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            },
            "seeds": [
              {
                "kind": "account",
                "path": "stake_authority"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "token_mint"
              }
            ]
          },
          "writable": true
        },
        {
          "name": "stake_authority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  97,
                  107,
                  101,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "config"
        },
        {
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
          "name": "token_program"
        },
        {
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
          "name": "associated_token_program"
        },
        {
          "address": "11111111111111111111111111111111",
          "name": "system_program"
        },
        {
          "address": "SysvarRent111111111111111111111111111111111",
          "name": "rent"
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "period",
          "type": {
            "defined": {
              "name": "StakingPeriod"
            }
          }
        }
      ],
      "discriminator": [
        136,
        126,
        91,
        162,
        40,
        131,
        13,
        127
      ],
      "name": "stake_tokens"
    },
    {
      "accounts": [
        {
          "name": "staker",
          "signer": true,
          "writable": true
        },
        {
          "name": "token_mint"
        },
        {
          "name": "staker_token_account",
          "pda": {
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            },
            "seeds": [
              {
                "kind": "account",
                "path": "staker"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "token_mint"
              }
            ]
          },
          "writable": true
        },
        {
          "name": "stake_token_account",
          "pda": {
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            },
            "seeds": [
              {
                "kind": "account",
                "path": "stake_authority"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "token_mint"
              }
            ]
          },
          "writable": true
        },
        {
          "name": "reward_reserve_account",
          "pda": {
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            },
            "seeds": [
              {
                "kind": "account",
                "path": "stake_authority"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "token_mint"
              }
            ]
          },
          "writable": true
        },
        {
          "name": "stake_authority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  116,
                  97,
                  107,
                  101,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "stake_account",
          "writable": true
        },
        {
          "name": "config"
        },
        {
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
          "name": "token_program"
        },
        {
          "address": "11111111111111111111111111111111",
          "name": "system_program"
        }
      ],
      "args": [],
      "discriminator": [
        58,
        119,
        215,
        143,
        203,
        223,
        32,
        86
      ],
      "name": "unstake_tokens"
    },
    {
      "accounts": [
        {
          "name": "current_admin",
          "signer": true,
          "writable": true
        },
        {
          "name": "config",
          "writable": true
        }
      ],
      "args": [
        {
          "name": "new_admin",
          "type": "pubkey"
        }
      ],
      "discriminator": [
        161,
        176,
        40,
        213,
        60,
        184,
        179,
        228
      ],
      "name": "update_admin"
    },
    {
      "accounts": [
        {
          "name": "admin",
          "signer": true,
          "writable": true
        },
        {
          "name": "config",
          "writable": true
        }
      ],
      "args": [
        {
          "name": "max_amount",
          "type": "u64"
        }
      ],
      "discriminator": [
        83,
        37,
        160,
        55,
        64,
        14,
        23,
        60
      ],
      "name": "update_max_stake_amount"
    }
  ],
  "metadata": {
    "description": "Created with Anchor",
    "name": "adr_token_mint",
    "spec": "0.1.0",
    "version": "0.1.0"
  },
  "types": [
    {
      "name": "ConfigAccount",
      "type": {
        "fields": [
          {
            "name": "payment_token_mint",
            "type": "pubkey"
          },
          {
            "name": "admin",
            "type": "pubkey"
          },
          {
            "name": "staking_enabled",
            "type": "bool"
          },
          {
            "name": "staking_reward_rate",
            "type": "u64"
          },
          {
            "name": "max_stake_amount",
            "type": "u64"
          },
          {
            "name": "emergency_paused",
            "type": "bool"
          },
          {
            "name": "reward_reserve",
            "type": "pubkey"
          }
        ],
        "kind": "struct"
      }
    },
    {
      "name": "ConfigUpdateEvent",
      "type": {
        "fields": [
          {
            "name": "admin",
            "type": "pubkey"
          },
          {
            "name": "field",
            "type": "string"
          },
          {
            "name": "old_value",
            "type": "string"
          },
          {
            "name": "new_value",
            "type": "string"
          },
          {
            "name": "timestamp",
            "type": "i64"
          }
        ],
        "kind": "struct"
      }
    },
    {
      "name": "EmergencyPauseEvent",
      "type": {
        "fields": [
          {
            "name": "admin",
            "type": "pubkey"
          },
          {
            "name": "paused",
            "type": "bool"
          },
          {
            "name": "reason",
            "type": "string"
          },
          {
            "name": "timestamp",
            "type": "i64"
          }
        ],
        "kind": "struct"
      }
    },
    {
      "name": "NFTMetadata",
      "type": {
        "fields": [
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "symbol",
            "type": "string"
          },
          {
            "name": "uri",
            "type": "string"
          },
          {
            "name": "collection",
            "type": {
              "option": "pubkey"
            }
          }
        ],
        "kind": "struct"
      }
    },
    {
      "name": "NftCounter",
      "type": {
        "fields": [
          {
            "name": "count",
            "type": "u64"
          }
        ],
        "kind": "struct"
      }
    },
    {
      "name": "StakeAccount",
      "type": {
        "fields": [
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "start_time",
            "type": "i64"
          },
          {
            "name": "unlock_time",
            "type": "i64"
          },
          {
            "name": "period",
            "type": {
              "defined": {
                "name": "StakingPeriod"
              }
            }
          },
          {
            "name": "claimed",
            "type": "bool"
          }
        ],
        "kind": "struct"
      }
    },
    {
      "name": "StakeAddedEvent",
      "type": {
        "fields": [
          {
            "name": "staker",
            "type": "pubkey"
          },
          {
            "name": "additional_amount",
            "type": "u64"
          },
          {
            "name": "total_amount",
            "type": "u64"
          },
          {
            "name": "new_unlock_time",
            "type": "i64"
          },
          {
            "name": "timestamp",
            "type": "i64"
          }
        ],
        "kind": "struct"
      }
    },
    {
      "name": "StakeInfo",
      "type": {
        "fields": [
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "start_time",
            "type": "i64"
          },
          {
            "name": "unlock_time",
            "type": "i64"
          },
          {
            "name": "period",
            "type": {
              "defined": {
                "name": "StakingPeriod"
              }
            }
          },
          {
            "name": "claimed",
            "type": "bool"
          }
        ],
        "kind": "struct"
      }
    },
    {
      "name": "StakeUpdatedEvent",
      "type": {
        "fields": [
          {
            "name": "staker",
            "type": "pubkey"
          },
          {
            "name": "old_amount",
            "type": "u64"
          },
          {
            "name": "new_amount",
            "type": "u64"
          },
          {
            "name": "old_period",
            "type": {
              "defined": {
                "name": "StakingPeriod"
              }
            }
          },
          {
            "name": "new_period",
            "type": {
              "defined": {
                "name": "StakingPeriod"
              }
            }
          },
          {
            "name": "start_time",
            "type": "i64"
          },
          {
            "name": "unlock_time",
            "type": "i64"
          },
          {
            "name": "timestamp",
            "type": "i64"
          }
        ],
        "kind": "struct"
      }
    },
    {
      "name": "StakingEvent",
      "type": {
        "fields": [
          {
            "name": "staker",
            "type": "pubkey"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "period",
            "type": {
              "defined": {
                "name": "StakingPeriod"
              }
            }
          },
          {
            "name": "start_time",
            "type": "i64"
          },
          {
            "name": "unlock_time",
            "type": "i64"
          },
          {
            "name": "stake_account",
            "type": "pubkey"
          }
        ],
        "kind": "struct"
      }
    },
    {
      "name": "StakingPeriod",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Minutes1"
          },
          {
            "name": "Minutes2"
          },
          {
            "name": "Minutes5"
          },
          {
            "name": "Minutes10"
          },
          {
            "name": "Minutes30"
          }
        ]
      }
    },
    {
      "name": "TokenBurnEvent",
      "type": {
        "fields": [
          {
            "name": "payer",
            "type": "pubkey"
          },
          {
            "name": "token_mint",
            "type": "pubkey"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "nft_mint",
            "type": "pubkey"
          },
          {
            "name": "timestamp",
            "type": "i64"
          }
        ],
        "kind": "struct"
      }
    },
    {
      "name": "UnstakingEvent",
      "type": {
        "fields": [
          {
            "name": "staker",
            "type": "pubkey"
          },
          {
            "name": "stake_account",
            "type": "pubkey"
          },
          {
            "name": "original_amount",
            "type": "u64"
          },
          {
            "name": "reward_amount",
            "type": "u64"
          },
          {
            "name": "total_amount",
            "type": "u64"
          },
          {
            "name": "timestamp",
            "type": "i64"
          }
        ],
        "kind": "struct"
      }
    }
  ]
}