export const idl = {
  "address": "9cDdb8o8hnfZjvKffc9pzGhvcEG7dVjg9yXHMDuL975v",
  "metadata": {
    "name": "adr_token_mint",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "approve_delegate",
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
      "accounts": [
        {
          "name": "owner",
          "writable": true,
          "signer": true
        },
        {
          "name": "token_account",
          "writable": true
        },
        {
          "name": "delegate"
        },
        {
          "name": "token_program",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "configure_staking",
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
      "accounts": [
        {
          "name": "admin",
          "writable": true,
          "signer": true
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
      ]
    },
    {
      "name": "get_current_stake",
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
      "returns": {
        "defined": {
          "name": "StakeInfo"
        }
      }
    },
    {
      "name": "get_user_stakes",
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
      "returns": {
        "vec": {
          "defined": {
            "name": "StakeInfo"
          }
        }
      }
    },
    {
      "name": "initialize_collection",
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
      "accounts": [
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "collection_mint",
          "writable": true,
          "signer": true
        },
        {
          "name": "collection_metadata",
          "writable": true,
          "signer": true
        },
        {
          "name": "collection_token_account",
          "writable": true,
          "pda": {
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
            ],
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
            }
          }
        },
        {
          "name": "config",
          "writable": true,
          "signer": true
        },
        {
          "name": "nft_counter",
          "writable": true,
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
          }
        },
        {
          "name": "token_program",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associated_token_program",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "system_program",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "rent",
          "address": "SysvarRent111111111111111111111111111111111"
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
      ]
    },
    {
      "name": "mint_nft_with_payment",
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
      "accounts": [
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "nft_counter",
          "writable": true,
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
          }
        },
        {
          "name": "nft_mint",
          "writable": true,
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
                "kind": "account",
                "path": "nft_counter.count",
                "account": "NftCounter"
              }
            ]
          }
        },
        {
          "name": "nft_metadata",
          "writable": true,
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
          }
        },
        {
          "name": "nft_token_account",
          "writable": true,
          "pda": {
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
            ],
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
            }
          }
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
          "writable": true,
          "pda": {
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
            ],
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
            }
          }
        },
        {
          "name": "config",
          "writable": true
        },
        {
          "name": "token_program",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associated_token_program",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "system_program",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "rent",
          "address": "SysvarRent111111111111111111111111111111111"
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
      ]
    },
    {
      "name": "set_emergency_pause",
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
      "accounts": [
        {
          "name": "admin",
          "writable": true,
          "signer": true
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
      ]
    },
    {
      "name": "set_payment_token",
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
      "accounts": [
        {
          "name": "admin",
          "writable": true,
          "signer": true
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
      ]
    },
    {
      "name": "stake_tokens",
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
      "accounts": [
        {
          "name": "staker",
          "writable": true,
          "signer": true
        },
        {
          "name": "token_mint"
        },
        {
          "name": "staker_token_account",
          "writable": true,
          "pda": {
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
            ],
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
            }
          }
        },
        {
          "name": "stake_account",
          "writable": true,
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
          }
        },
        {
          "name": "stake_token_account",
          "writable": true,
          "pda": {
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
            ],
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
            }
          }
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
          "name": "token_program",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "associated_token_program",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "system_program",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "rent",
          "address": "SysvarRent111111111111111111111111111111111"
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
      ]
    },
    {
      "name": "unstake_tokens",
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
      "accounts": [
        {
          "name": "staker",
          "writable": true,
          "signer": true
        },
        {
          "name": "token_mint"
        },
        {
          "name": "reward_token_mint",
          "writable": true
        },
        {
          "name": "staker_token_account",
          "writable": true,
          "pda": {
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
            ],
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
            }
          }
        },
        {
          "name": "stake_token_account",
          "writable": true,
          "pda": {
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
            ],
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
            }
          }
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
          "name": "token_program",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "system_program",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "update_admin",
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
      "accounts": [
        {
          "name": "current_admin",
          "writable": true,
          "signer": true
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
      ]
    },
    {
      "name": "update_max_stake_amount",
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
      "accounts": [
        {
          "name": "admin",
          "writable": true,
          "signer": true
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
      ]
    }
  ],
  "accounts": [
    {
      "name": "ConfigAccount",
      "discriminator": [
        189,
        255,
        97,
        70,
        186,
        189,
        24,
        102
      ]
    },
    {
      "name": "NFTMetadata",
      "discriminator": [
        149,
        0,
        165,
        163,
        182,
        162,
        192,
        134
      ]
    },
    {
      "name": "NftCounter",
      "discriminator": [
        214,
        107,
        73,
        138,
        146,
        104,
        208,
        57
      ]
    },
    {
      "name": "StakeAccount",
      "discriminator": [
        80,
        158,
        67,
        124,
        50,
        189,
        192,
        255
      ]
    }
  ],
  "events": [
    {
      "name": "ConfigUpdateEvent",
      "discriminator": [
        158,
        144,
        170,
        167,
        15,
        184,
        45,
        12
      ]
    },
    {
      "name": "EmergencyPauseEvent",
      "discriminator": [
        159,
        241,
        192,
        232,
        29,
        208,
        51,
        21
      ]
    },
    {
      "name": "StakeAddedEvent",
      "discriminator": [
        169,
        109,
        164,
        175,
        240,
        130,
        209,
        25
      ]
    },
    {
      "name": "StakeUpdatedEvent",
      "discriminator": [
        134,
        138,
        97,
        88,
        73,
        6,
        150,
        64
      ]
    },
    {
      "name": "StakingEvent",
      "discriminator": [
        214,
        146,
        230,
        38,
        71,
        208,
        207,
        86
      ]
    },
    {
      "name": "TokenBurnEvent",
      "discriminator": [
        51,
        27,
        242,
        215,
        185,
        35,
        71,
        20
      ]
    },
    {
      "name": "UnstakingEvent",
      "discriminator": [
        249,
        22,
        125,
        15,
        215,
        161,
        9,
        170
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "Unauthorized",
      "msg": "Você não está autorizado a realizar esta ação"
    },
    {
      "code": 6001,
      "name": "InvalidPaymentToken",
      "msg": "Token de pagamento inválido"
    },
    {
      "code": 6002,
      "name": "InvalidPaymentAmount",
      "msg": "Valor de pagamento inválido"
    },
    {
      "code": 6003,
      "name": "PaymentTokenNotConfigured",
      "msg": "Token de pagamento não configurado"
    },
    {
      "code": 6004,
      "name": "StakingNotEnabled",
      "msg": "Staking não está habilitado"
    },
    {
      "code": 6005,
      "name": "InvalidStakeAmount",
      "msg": "Valor de stake inválido"
    },
    {
      "code": 6006,
      "name": "InsufficientFunds",
      "msg": "Fundos insuficientes"
    },
    {
      "code": 6007,
      "name": "StakingPeriodNotCompleted",
      "msg": "Período de staking não completado"
    },
    {
      "code": 6008,
      "name": "RewardsAlreadyClaimed",
      "msg": "Recompensas já foram reivindicadas"
    },
    {
      "code": 6009,
      "name": "PaymentNotApproved",
      "msg": "Pagamento não aprovado. Use approve_delegate primeiro"
    },
    {
      "code": 6010,
      "name": "SystemPaused",
      "msg": "O sistema está pausado para emergência"
    },
    {
      "code": 6011,
      "name": "InvalidInput",
      "msg": "Valor de entrada inválido"
    },
    {
      "code": 6012,
      "name": "MathOverflow",
      "msg": "Erro de overflow matemático"
    },
    {
      "code": 6013,
      "name": "StakeAmountTooLarge",
      "msg": "Valor de stake excede o limite máximo permitido"
    },
    {
      "code": 6014,
      "name": "StakeAlreadyClaimed",
      "msg": "Este stake já foi reivindicado"
    }
  ],
  "types": [
    {
      "name": "ConfigAccount",
      "type": {
        "kind": "struct",
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
          }
        ]
      }
    },
    {
      "name": "ConfigUpdateEvent",
      "type": {
        "kind": "struct",
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
        ]
      }
    },
    {
      "name": "EmergencyPauseEvent",
      "type": {
        "kind": "struct",
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
        ]
      }
    },
    {
      "name": "NFTMetadata",
      "type": {
        "kind": "struct",
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
        ]
      }
    },
    {
      "name": "NftCounter",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "count",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "StakeAccount",
      "type": {
        "kind": "struct",
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
        ]
      }
    },
    {
      "name": "StakeAddedEvent",
      "type": {
        "kind": "struct",
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
        ]
      }
    },
    {
      "name": "StakeInfo",
      "type": {
        "kind": "struct",
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
        ]
      }
    },
    {
      "name": "StakeUpdatedEvent",
      "type": {
        "kind": "struct",
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
        ]
      }
    },
    {
      "name": "StakingEvent",
      "type": {
        "kind": "struct",
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
        ]
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
        "kind": "struct",
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
        ]
      }
    },
    {
      "name": "UnstakingEvent",
      "type": {
        "kind": "struct",
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
        ]
      }
    }
  ]
}