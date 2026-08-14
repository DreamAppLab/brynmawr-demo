'use client'
import { useState } from 'react'

const C = {
  navy:'#1a2d4a', navyDark:'#152338', teal:'#5db8a8', tealDark:'#4aa090',
  white:'#ffffff', green:'#27ae60', orange:'#e67e22', red:'#c0392b',
  blue:'#2471a3', gold:'#c9a84c',
}

const MAP_W = 762
const MAP_H = 976

const SITES = [
  {id:'82',zone:'oceanside',maxLen:45,sqft:0,points:'18,105 55,105 65,121 28,121'},
  {id:'81',zone:'oceanside',maxLen:45,sqft:0,points:'28,123 65,123 75,139 38,139'},
  {id:'80',zone:'oceanside',maxLen:45,sqft:0,points:'38,141 75,141 85,157 48,157'},
  {id:'79',zone:'oceanside',maxLen:45,sqft:0,points:'48,159 85,159 95,175 58,175'},
  {id:'78',zone:'oceanside',maxLen:45,sqft:0,points:'58,177 95,177 105,193 68,193'},
  {id:'77',zone:'oceanside',maxLen:45,sqft:0,points:'68,195 105,195 115,211 78,211'},
  {id:'76',zone:'oceanside',maxLen:45,sqft:0,points:'78,213 115,213 125,229 88,229'},
  {id:'75',zone:'oceanside',maxLen:45,sqft:0,points:'88,231 125,231 135,247 98,247'},
  {id:'74',zone:'oceanside',maxLen:45,sqft:0,points:'98,249 135,249 145,265 108,265'},
  {id:'73',zone:'oceanside',maxLen:45,sqft:0,points:'108,267 145,267 155,283 118,283'},
  {id:'72',zone:'oceanside',maxLen:45,sqft:0,points:'118,285 155,285 165,301 128,301'},
  {id:'71',zone:'oceanside',maxLen:45,sqft:0,points:'128,303 165,303 175,319 138,319'},
  {id:'70',zone:'oceanside',maxLen:45,sqft:0,points:'138,321 175,321 185,337 148,337'},
  {id:'95',zone:'oceanside',maxLen:45,sqft:0,points:'60,105 97,105 107,121 70,121'},
  {id:'94',zone:'oceanside',maxLen:45,sqft:0,points:'70,123 107,123 117,139 80,139'},
  {id:'93',zone:'oceanside',maxLen:45,sqft:0,points:'80,141 117,141 127,157 90,157'},
  {id:'92',zone:'oceanside',maxLen:45,sqft:0,points:'90,159 127,159 137,175 100,175'},
  {id:'91',zone:'oceanside',maxLen:45,sqft:0,points:'100,177 137,177 147,193 110,193'},
  {id:'90',zone:'oceanside',maxLen:45,sqft:0,points:'110,195 147,195 157,211 120,211'},
  {id:'89',zone:'oceanside',maxLen:45,sqft:0,points:'120,213 157,213 167,229 130,229'},
  {id:'88',zone:'oceanside',maxLen:45,sqft:0,points:'130,231 167,231 177,247 140,247'},
  {id:'87',zone:'oceanside',maxLen:45,sqft:0,points:'140,249 177,249 187,265 150,265'},
  {id:'86',zone:'oceanside',maxLen:45,sqft:0,points:'150,267 187,267 197,283 160,283'},
  {id:'85',zone:'oceanside',maxLen:45,sqft:0,points:'160,285 197,285 207,301 170,301'},
  {id:'84',zone:'oceanside',maxLen:45,sqft:0,points:'170,303 207,303 217,319 180,319'},
  {id:'83',zone:'oceanside',maxLen:45,sqft:0,points:'180,321 217,321 227,337 190,337'},
  {id:'110',zone:'midpark',maxLen:55,sqft:0,points:'102,105 139,105 149,121 112,121'},
  {id:'109',zone:'midpark',maxLen:55,sqft:0,points:'112,123 149,123 159,139 122,139'},
  {id:'108',zone:'midpark',maxLen:55,sqft:0,points:'122,141 159,141 169,157 132,157'},
  {id:'107',zone:'midpark',maxLen:55,sqft:0,points:'132,159 169,159 179,175 142,175'},
  {id:'106',zone:'midpark',maxLen:55,sqft:0,points:'142,177 179,177 189,193 152,193'},
  {id:'105',zone:'midpark',maxLen:55,sqft:0,points:'152,195 189,195 199,211 162,211'},
  {id:'104',zone:'midpark',maxLen:55,sqft:0,points:'162,213 199,213 209,229 172,229'},
  {id:'103',zone:'midpark',maxLen:55,sqft:0,points:'172,231 209,231 219,247 182,247'},
  {id:'102',zone:'midpark',maxLen:55,sqft:0,points:'182,249 219,249 229,265 192,265'},
  {id:'101',zone:'midpark',maxLen:55,sqft:0,points:'192,267 229,267 239,283 202,283'},
  {id:'100',zone:'midpark',maxLen:55,sqft:0,points:'202,285 239,285 249,301 212,301'},
  {id:'99',zone:'midpark',maxLen:55,sqft:0,points:'212,303 249,303 259,319 222,319'},
  {id:'98',zone:'midpark',maxLen:55,sqft:0,points:'222,321 259,321 269,337 232,337'},
  {id:'97',zone:'midpark',maxLen:55,sqft:0,points:'232,339 269,339 279,355 242,355'},
  {id:'123',zone:'midpark',maxLen:55,sqft:0,points:'144,105 181,105 191,121 154,121'},
  {id:'122',zone:'midpark',maxLen:55,sqft:0,points:'154,123 191,123 201,139 164,139'},
  {id:'121',zone:'midpark',maxLen:55,sqft:0,points:'164,141 201,141 211,157 174,157'},
  {id:'120',zone:'midpark',maxLen:55,sqft:0,points:'174,159 211,159 221,175 184,175'},
  {id:'119',zone:'midpark',maxLen:55,sqft:0,points:'184,177 221,177 231,193 194,193'},
  {id:'118',zone:'midpark',maxLen:55,sqft:0,points:'194,195 231,195 241,211 204,211'},
  {id:'117',zone:'midpark',maxLen:55,sqft:0,points:'204,213 241,213 251,229 214,229'},
  {id:'116',zone:'midpark',maxLen:55,sqft:0,points:'214,231 251,231 261,247 224,247'},
  {id:'115',zone:'midpark',maxLen:55,sqft:0,points:'224,249 261,249 271,265 234,265'},
  {id:'114',zone:'midpark',maxLen:55,sqft:0,points:'234,267 271,267 281,283 244,283'},
  {id:'113',zone:'midpark',maxLen:55,sqft:0,points:'244,285 281,285 291,301 254,301'},
  {id:'112',zone:'midpark',maxLen:55,sqft:0,points:'254,303 291,303 301,319 264,319'},
  {id:'111',zone:'midpark',maxLen:55,sqft:0,points:'264,321 301,321 311,337 274,337'},
  {id:'135',zone:'midpark',maxLen:55,sqft:0,points:'186,115 223,115 233,131 196,131'},
  {id:'134',zone:'midpark',maxLen:55,sqft:0,points:'196,133 233,133 243,149 206,149'},
  {id:'133',zone:'midpark',maxLen:55,sqft:0,points:'206,151 243,151 253,167 216,167'},
  {id:'132',zone:'midpark',maxLen:55,sqft:0,points:'216,169 253,169 263,185 226,185'},
  {id:'131',zone:'midpark',maxLen:55,sqft:0,points:'226,187 263,187 273,203 236,203'},
  {id:'130',zone:'midpark',maxLen:55,sqft:0,points:'236,205 273,205 283,221 246,221'},
  {id:'129',zone:'midpark',maxLen:55,sqft:0,points:'246,223 283,223 293,239 256,239'},
  {id:'128',zone:'midpark',maxLen:55,sqft:0,points:'256,241 293,241 303,257 266,257'},
  {id:'127',zone:'midpark',maxLen:55,sqft:0,points:'266,259 303,259 313,275 276,275'},
  {id:'126',zone:'midpark',maxLen:55,sqft:0,points:'276,277 313,277 323,293 286,293'},
  {id:'125',zone:'midpark',maxLen:55,sqft:0,points:'286,295 323,295 333,311 296,311'},
  {id:'124',zone:'midpark',maxLen:55,sqft:0,points:'296,313 333,313 343,329 306,329'},
  {id:'249',zone:'midpark',maxLen:55,sqft:0,points:'228,105 265,105 275,121 238,121'},
  {id:'250',zone:'midpark',maxLen:55,sqft:0,points:'238,123 275,123 285,139 248,139'},
  {id:'154',zone:'midpark',maxLen:55,sqft:0,points:'248,141 285,141 295,157 258,157'},
  {id:'153',zone:'midpark',maxLen:55,sqft:0,points:'258,159 295,159 305,175 268,175'},
  {id:'152',zone:'midpark',maxLen:55,sqft:0,points:'268,177 305,177 315,193 278,193'},
  {id:'151',zone:'midpark',maxLen:55,sqft:0,points:'278,195 315,195 325,211 288,211'},
  {id:'150',zone:'midpark',maxLen:55,sqft:0,points:'288,213 325,213 335,229 298,229'},
  {id:'149',zone:'midpark',maxLen:55,sqft:0,points:'298,231 335,231 345,247 308,247'},
  {id:'148',zone:'midpark',maxLen:55,sqft:0,points:'308,249 345,249 355,265 318,265'},
  {id:'147',zone:'midpark',maxLen:55,sqft:0,points:'318,267 355,267 365,283 328,283'},
  {id:'146',zone:'midpark',maxLen:55,sqft:0,points:'328,285 365,285 375,301 338,301'},
  {id:'145',zone:'midpark',maxLen:55,sqft:0,points:'338,303 375,303 385,319 348,319'},
  {id:'144',zone:'midpark',maxLen:55,sqft:0,points:'348,321 385,321 395,337 358,337'},
  {id:'143',zone:'midpark',maxLen:55,sqft:0,points:'358,339 395,339 405,355 368,355'},
  {id:'142',zone:'midpark',maxLen:55,sqft:0,points:'368,357 405,357 415,373 378,373'},
  {id:'141',zone:'midpark',maxLen:55,sqft:0,points:'378,375 415,375 425,391 388,391'},
  {id:'140',zone:'midpark',maxLen:55,sqft:0,points:'388,393 425,393 435,409 398,409'},
  {id:'168',zone:'midpark',maxLen:55,sqft:0,points:'270,105 307,105 317,121 280,121'},
  {id:'167',zone:'midpark',maxLen:55,sqft:0,points:'280,123 317,123 327,139 290,139'},
  {id:'166',zone:'midpark',maxLen:55,sqft:0,points:'290,141 327,141 337,157 300,157'},
  {id:'165',zone:'midpark',maxLen:55,sqft:0,points:'300,159 337,159 347,175 310,175'},
  {id:'164',zone:'midpark',maxLen:55,sqft:0,points:'310,177 347,177 357,193 320,193'},
  {id:'163',zone:'midpark',maxLen:55,sqft:0,points:'320,195 357,195 367,211 330,211'},
  {id:'162',zone:'midpark',maxLen:55,sqft:0,points:'330,213 367,213 377,229 340,229'},
  {id:'161',zone:'midpark',maxLen:55,sqft:0,points:'340,231 377,231 387,247 350,247'},
  {id:'160',zone:'midpark',maxLen:55,sqft:0,points:'350,249 387,249 397,265 360,265'},
  {id:'159',zone:'midpark',maxLen:55,sqft:0,points:'360,267 397,267 407,283 370,283'},
  {id:'158',zone:'midpark',maxLen:55,sqft:0,points:'370,285 407,285 417,301 380,301'},
  {id:'157',zone:'midpark',maxLen:55,sqft:0,points:'380,303 417,303 427,319 390,319'},
  {id:'156',zone:'midpark',maxLen:55,sqft:0,points:'390,321 427,321 437,337 400,337'},
  {id:'155',zone:'midpark',maxLen:55,sqft:0,points:'400,339 437,339 447,355 410,355'},
  {id:'181',zone:'midpark',maxLen:55,sqft:0,points:'312,105 349,105 359,121 322,121'},
  {id:'180',zone:'midpark',maxLen:55,sqft:0,points:'322,123 359,123 369,139 332,139'},
  {id:'179',zone:'midpark',maxLen:55,sqft:0,points:'332,141 369,141 379,157 342,157'},
  {id:'178',zone:'midpark',maxLen:55,sqft:0,points:'342,159 379,159 389,175 352,175'},
  {id:'177',zone:'midpark',maxLen:55,sqft:0,points:'352,177 389,177 399,193 362,193'},
  {id:'176',zone:'midpark',maxLen:55,sqft:0,points:'362,195 399,195 409,211 372,211'},
  {id:'175',zone:'midpark',maxLen:55,sqft:0,points:'372,213 409,213 419,229 382,229'},
  {id:'174',zone:'midpark',maxLen:55,sqft:0,points:'382,231 419,231 429,247 392,247'},
  {id:'173',zone:'midpark',maxLen:55,sqft:0,points:'392,249 429,249 439,265 402,265'},
  {id:'172',zone:'midpark',maxLen:55,sqft:0,points:'402,267 439,267 449,283 412,283'},
  {id:'171',zone:'midpark',maxLen:55,sqft:0,points:'412,285 449,285 459,301 422,301'},
  {id:'170',zone:'midpark',maxLen:55,sqft:0,points:'422,303 459,303 469,319 432,319'},
  {id:'169',zone:'midpark',maxLen:55,sqft:0,points:'432,321 469,321 479,337 442,337'},
  {id:'195',zone:'midpark',maxLen:55,sqft:0,points:'354,105 391,105 401,121 364,121'},
  {id:'194',zone:'midpark',maxLen:55,sqft:0,points:'364,123 401,123 411,139 374,139'},
  {id:'193',zone:'midpark',maxLen:55,sqft:0,points:'374,141 411,141 421,157 384,157'},
  {id:'192',zone:'midpark',maxLen:55,sqft:0,points:'384,159 421,159 431,175 394,175'},
  {id:'191',zone:'midpark',maxLen:55,sqft:0,points:'394,177 431,177 441,193 404,193'},
  {id:'190',zone:'midpark',maxLen:55,sqft:0,points:'404,195 441,195 451,211 414,211'},
  {id:'189',zone:'midpark',maxLen:55,sqft:0,points:'414,213 451,213 461,229 424,229'},
  {id:'188',zone:'midpark',maxLen:55,sqft:0,points:'424,231 461,231 471,247 434,247'},
  {id:'187',zone:'midpark',maxLen:55,sqft:0,points:'434,249 471,249 481,265 444,265'},
  {id:'186',zone:'midpark',maxLen:55,sqft:0,points:'444,267 481,267 491,283 454,283'},
  {id:'185',zone:'midpark',maxLen:55,sqft:0,points:'454,285 491,285 501,301 464,301'},
  {id:'184',zone:'midpark',maxLen:55,sqft:0,points:'464,303 501,303 511,319 474,319'},
  {id:'183',zone:'midpark',maxLen:55,sqft:0,points:'474,321 511,321 521,337 484,337'},
  {id:'182',zone:'midpark',maxLen:55,sqft:0,points:'484,339 521,339 531,355 494,355'},
  {id:'209',zone:'midpark',maxLen:55,sqft:0,points:'396,105 433,105 443,121 406,121'},
  {id:'208',zone:'midpark',maxLen:55,sqft:0,points:'406,123 443,123 453,139 416,139'},
  {id:'207',zone:'midpark',maxLen:55,sqft:0,points:'416,141 453,141 463,157 426,157'},
  {id:'206',zone:'midpark',maxLen:55,sqft:0,points:'426,159 463,159 473,175 436,175'},
  {id:'205',zone:'midpark',maxLen:55,sqft:0,points:'436,177 473,177 483,193 446,193'},
  {id:'204',zone:'midpark',maxLen:55,sqft:0,points:'446,195 483,195 493,211 456,211'},
  {id:'203',zone:'midpark',maxLen:55,sqft:0,points:'456,213 493,213 503,229 466,229'},
  {id:'202',zone:'midpark',maxLen:55,sqft:0,points:'466,231 503,231 513,247 476,247'},
  {id:'201',zone:'midpark',maxLen:55,sqft:0,points:'476,249 513,249 523,265 486,265'},
  {id:'200',zone:'midpark',maxLen:55,sqft:0,points:'486,267 523,267 533,283 496,283'},
  {id:'199',zone:'midpark',maxLen:55,sqft:0,points:'496,285 533,285 543,301 506,301'},
  {id:'198',zone:'midpark',maxLen:55,sqft:0,points:'506,303 543,303 553,319 516,319'},
  {id:'197',zone:'midpark',maxLen:55,sqft:0,points:'516,321 553,321 563,337 526,337'},
  {id:'196',zone:'midpark',maxLen:55,sqft:0,points:'526,339 563,339 573,355 536,355'},
  {id:'218',zone:'oceanside',maxLen:45,sqft:0,points:'438,115 475,115 485,131 448,131'},
  {id:'217',zone:'oceanside',maxLen:45,sqft:0,points:'448,133 485,133 495,149 458,149'},
  {id:'216',zone:'oceanside',maxLen:45,sqft:0,points:'458,151 495,151 505,167 468,167'},
  {id:'215',zone:'oceanside',maxLen:45,sqft:0,points:'468,169 505,169 515,185 478,185'},
  {id:'214',zone:'oceanside',maxLen:45,sqft:0,points:'478,187 515,187 525,203 488,203'},
  {id:'213',zone:'oceanside',maxLen:45,sqft:0,points:'488,205 525,205 535,221 498,221'},
  {id:'211',zone:'oceanside',maxLen:45,sqft:0,points:'438,245 475,245 485,261 448,261'},
  {id:'210',zone:'oceanside',maxLen:45,sqft:0,points:'448,263 485,263 495,279 458,279'},
  {id:'41',zone:'oceanside',maxLen:45,sqft:0,points:'458,281 495,281 505,297 468,297'},
  {id:'40',zone:'oceanside',maxLen:45,sqft:0,points:'468,299 505,299 515,315 478,315'},
  {id:'39',zone:'oceanside',maxLen:45,sqft:0,points:'478,317 515,317 525,333 488,333'},
  {id:'38',zone:'oceanside',maxLen:45,sqft:0,points:'488,335 525,335 535,351 498,351'},
  {id:'37',zone:'oceanside',maxLen:45,sqft:0,points:'498,353 535,353 545,369 508,369'},
  {id:'36',zone:'oceanside',maxLen:45,sqft:0,points:'508,371 545,371 555,387 518,387'},
  {id:'35',zone:'oceanside',maxLen:45,sqft:0,points:'518,389 555,389 565,405 528,405'},
  {id:'34',zone:'oceanside',maxLen:45,sqft:0,points:'528,407 565,407 575,423 538,423'},
  {id:'219',zone:'beachfront',maxLen:0,sqft:0,points:'36,44 58,44 62,96 40,96'},
  {id:'220',zone:'beachfront',maxLen:0,sqft:0,points:'62,44 84,44 88,96 66,96'},
  {id:'221',zone:'beachfront',maxLen:0,sqft:0,points:'88,44 110,44 114,96 92,96'},
  {id:'222',zone:'beachfront',maxLen:0,sqft:0,points:'114,44 136,44 140,96 118,96'},
  {id:'223',zone:'beachfront',maxLen:0,sqft:0,points:'140,44 162,44 166,96 144,96'},
  {id:'224',zone:'beachfront',maxLen:0,sqft:0,points:'166,44 188,44 192,96 170,96'},
  {id:'225',zone:'beachfront',maxLen:0,sqft:0,points:'192,44 214,44 218,96 196,96'},
  {id:'226',zone:'beachfront',maxLen:0,sqft:0,points:'218,44 240,44 244,96 222,96'},
  {id:'227',zone:'beachfront',maxLen:0,sqft:0,points:'244,44 266,44 270,96 248,96'},
  {id:'228',zone:'beachfront',maxLen:0,sqft:0,points:'270,44 292,44 296,96 274,96'},
  {id:'229',zone:'beachfront',maxLen:0,sqft:0,points:'296,44 318,44 322,96 300,96'},
  {id:'230',zone:'beachfront',maxLen:0,sqft:0,points:'322,44 344,44 348,96 326,96'},
  {id:'231',zone:'beachfront',maxLen:0,sqft:0,points:'348,44 370,44 374,96 352,96'},
  {id:'232',zone:'beachfront',maxLen:0,sqft:0,points:'374,44 396,44 400,96 378,96'},
  {id:'233',zone:'beachfront',maxLen:0,sqft:0,points:'400,44 422,44 426,96 404,96'},
  {id:'234',zone:'beachfront',maxLen:0,sqft:0,points:'426,44 448,44 452,96 430,96'},
  {id:'235',zone:'beachfront',maxLen:0,sqft:0,points:'452,44 474,44 478,96 456,96'},
  {id:'236',zone:'beachfront',maxLen:0,sqft:0,points:'478,44 500,44 504,96 482,96'},
  {id:'237',zone:'beachfront',maxLen:0,sqft:0,points:'504,44 526,44 530,96 508,96'},
  {id:'238',zone:'beachfront',maxLen:0,sqft:0,points:'530,44 552,44 556,96 534,96'},
  {id:'29',zone:'oceanside',maxLen:40,sqft:0,points:'296,492 330,492 330,509 296,509'},
  {id:'28',zone:'oceanside',maxLen:40,sqft:0,points:'332,492 366,492 366,509 332,509'},
  {id:'27',zone:'oceanside',maxLen:40,sqft:0,points:'368,492 402,492 402,509 368,509'},
  {id:'26',zone:'oceanside',maxLen:40,sqft:0,points:'404,492 438,492 438,509 404,509'},
  {id:'25',zone:'oceanside',maxLen:40,sqft:0,points:'440,492 474,492 474,509 440,509'},
  {id:'24',zone:'oceanside',maxLen:40,sqft:0,points:'476,492 510,492 510,509 476,509'},
  {id:'23',zone:'oceanside',maxLen:40,sqft:0,points:'512,492 546,492 546,509 512,509'},
  {id:'22',zone:'oceanside',maxLen:40,sqft:0,points:'548,492 582,492 582,509 548,509'},
  {id:'21',zone:'oceanside',maxLen:40,sqft:0,points:'584,492 618,492 618,509 584,509'},
  {id:'20',zone:'oceanside',maxLen:40,sqft:0,points:'620,492 654,492 654,509 620,509'},
  {id:'11',zone:'oceanside',maxLen:38,sqft:0,points:'296,512 330,512 330,529 296,529'},
  {id:'12',zone:'oceanside',maxLen:38,sqft:0,points:'332,512 366,512 366,529 332,529'},
  {id:'13',zone:'oceanside',maxLen:38,sqft:0,points:'368,512 402,512 402,529 368,529'},
  {id:'14',zone:'oceanside',maxLen:38,sqft:0,points:'404,512 438,512 438,529 404,529'},
  {id:'15',zone:'oceanside',maxLen:38,sqft:0,points:'440,512 474,512 474,529 440,529'},
  {id:'16',zone:'oceanside',maxLen:38,sqft:0,points:'476,512 510,512 510,529 476,529'},
  {id:'17',zone:'oceanside',maxLen:38,sqft:0,points:'512,512 546,512 546,529 512,529'},
  {id:'18',zone:'oceanside',maxLen:38,sqft:0,points:'548,512 582,512 582,529 548,529'},
  {id:'19',zone:'oceanside',maxLen:38,sqft:0,points:'584,512 618,512 618,529 584,529'},
  {id:'42',zone:'oceanside',maxLen:38,sqft:0,points:'296,534 330,534 330,551 296,551'},
  {id:'43',zone:'oceanside',maxLen:38,sqft:0,points:'332,534 366,534 366,551 332,551'},
  {id:'44',zone:'oceanside',maxLen:38,sqft:0,points:'368,534 402,534 402,551 368,551'},
  {id:'45',zone:'oceanside',maxLen:38,sqft:0,points:'404,534 438,534 438,551 404,551'},
  {id:'46',zone:'oceanside',maxLen:38,sqft:0,points:'440,534 474,534 474,551 440,551'},
  {id:'47',zone:'oceanside',maxLen:38,sqft:0,points:'476,534 510,534 510,551 476,551'},
  {id:'48',zone:'oceanside',maxLen:38,sqft:0,points:'512,534 546,534 546,551 512,551'},
  {id:'49',zone:'oceanside',maxLen:38,sqft:0,points:'548,534 582,534 582,551 548,551'},
  {id:'50',zone:'oceanside',maxLen:38,sqft:0,points:'584,534 618,534 618,551 584,551'},
  {id:'51',zone:'oceanside',maxLen:38,sqft:0,points:'620,534 654,534 654,551 620,551'},
  {id:'1',zone:'oceanside',maxLen:35,sqft:0,points:'296,554 330,554 330,571 296,571'},
  {id:'2',zone:'oceanside',maxLen:35,sqft:0,points:'332,554 366,554 366,571 332,571'},
  {id:'3',zone:'oceanside',maxLen:35,sqft:0,points:'368,554 402,554 402,571 368,571'},
  {id:'4',zone:'oceanside',maxLen:35,sqft:0,points:'404,554 438,554 438,571 404,571'},
  {id:'5',zone:'oceanside',maxLen:35,sqft:0,points:'440,554 474,554 474,571 440,571'},
  {id:'6',zone:'oceanside',maxLen:35,sqft:0,points:'476,554 510,554 510,571 476,571'},
  {id:'7',zone:'oceanside',maxLen:35,sqft:0,points:'512,554 546,554 546,571 512,571'},
  {id:'8',zone:'oceanside',maxLen:35,sqft:0,points:'548,554 582,554 582,571 548,571'},
  {id:'9',zone:'oceanside',maxLen:35,sqft:0,points:'584,554 618,554 618,571 584,571'},
  {id:'10',zone:'oceanside',maxLen:35,sqft:0,points:'620,554 654,554 654,571 620,571'},
  {id:'31',zone:'oceanside',maxLen:35,sqft:0,points:'296,576 330,576 330,593 296,593'},
  {id:'32',zone:'oceanside',maxLen:35,sqft:0,points:'332,576 366,576 366,593 332,593'},
  {id:'33',zone:'oceanside',maxLen:35,sqft:0,points:'368,576 402,576 402,593 368,593'},
  {id:'30',zone:'oceanside',maxLen:35,sqft:0,points:'404,576 438,576 438,593 404,593'},
  {id:'52',zone:'oceanside',maxLen:38,sqft:0,points:'188,492 222,492 222,509 188,509'},
  {id:'53',zone:'oceanside',maxLen:38,sqft:0,points:'188,512 222,512 222,529 188,529'},
  {id:'54',zone:'oceanside',maxLen:35,sqft:0,points:'116,534 150,534 150,551 116,551'},
  {id:'212',zone:'oceanside',maxLen:35,sqft:0,points:'80,534 114,534 114,551 80,551'},
  {id:'55',zone:'oceanside',maxLen:35,sqft:0,points:'44,534 78,534 78,551 44,551'},
  {id:'62',zone:'oceanside',maxLen:35,sqft:0,points:'44,628 80,628 80,646 44,646'},
  {id:'61',zone:'oceanside',maxLen:35,sqft:0,points:'84,628 120,628 120,646 84,646'},
  {id:'60',zone:'oceanside',maxLen:35,sqft:0,points:'124,628 160,628 160,646 124,646'},
  {id:'59',zone:'oceanside',maxLen:35,sqft:0,points:'164,628 200,628 200,646 164,646'},
  {id:'58',zone:'oceanside',maxLen:35,sqft:0,points:'204,628 240,628 240,646 204,646'},
  {id:'57',zone:'oceanside',maxLen:35,sqft:0,points:'244,628 280,628 280,646 244,646'},
  {id:'56',zone:'oceanside',maxLen:35,sqft:0,points:'284,628 320,628 320,646 284,646'},
  {id:'246',zone:'oceanside',maxLen:30,sqft:0,points:'44,650 80,650 80,668 44,668'},
  {id:'247',zone:'oceanside',maxLen:30,sqft:0,points:'84,650 120,650 120,668 84,668'},
  {id:'248',zone:'oceanside',maxLen:30,sqft:0,points:'124,650 160,650 160,668 124,668'},
  {id:'241',zone:'oceanside',maxLen:30,sqft:0,points:'164,650 200,650 200,668 164,668'},
  {id:'242',zone:'oceanside',maxLen:30,sqft:0,points:'204,650 240,650 240,668 204,668'},
  {id:'243',zone:'oceanside',maxLen:30,sqft:0,points:'244,650 280,650 280,668 244,668'},
  {id:'244',zone:'oceanside',maxLen:30,sqft:0,points:'284,650 320,650 320,668 284,668'},
  {id:'245',zone:'oceanside',maxLen:30,sqft:0,points:'324,650 360,650 360,668 324,668'},
  {id:'63',zone:'oceanside',maxLen:35,sqft:0,points:'44,674 80,674 80,692 44,692'},
  {id:'64',zone:'oceanside',maxLen:35,sqft:0,points:'84,674 120,674 120,692 84,692'},
  {id:'65',zone:'oceanside',maxLen:35,sqft:0,points:'124,674 160,674 160,692 124,692'},
  {id:'66',zone:'oceanside',maxLen:35,sqft:0,points:'164,674 200,674 200,692 164,692'},
  {id:'67',zone:'oceanside',maxLen:35,sqft:0,points:'204,674 240,674 240,692 204,692'},
  {id:'68',zone:'oceanside',maxLen:35,sqft:0,points:'244,674 280,674 280,692 244,692'},
  {id:'69',zone:'oceanside',maxLen:35,sqft:0,points:'284,674 320,674 320,692 284,692'},
  {id:'239',zone:'oceanside',maxLen:30,sqft:0,points:'44,698 80,698 80,716 44,716'},
  {id:'240',zone:'oceanside',maxLen:30,sqft:0,points:'84,698 120,698 120,716 84,716'},
  {id:'PM1',zone:'parkmod',maxLen:0,sqft:400,points:'310,704 360,704 360,734 310,734'},
  {id:'PM2',zone:'parkmod',maxLen:0,sqft:500,points:'364,704 414,704 414,734 364,734'},
  {id:'PM3',zone:'parkmod',maxLen:0,sqft:400,points:'418,704 468,704 468,734 418,734'},
  {id:'PM4',zone:'parkmod',maxLen:0,sqft:400,points:'310,738 360,738 360,768 310,768'},
  {id:'PM5',zone:'parkmod',maxLen:0,sqft:500,points:'364,738 414,738 414,768 364,768'},
  {id:'PM6',zone:'parkmod',maxLen:0,sqft:400,points:'418,738 468,738 468,768 418,768'},
]

const BOOKED = new Set(['219','225','81','108','121','134','149','168','3','15','29','44','56','PM2','PM4','211','240','65','177','200'])

const SPECIAL_EVENTS = [
  {name:'Daytona Bike Week',start:'2026-03-06',end:'2026-03-15'},
  {name:'Memorial Day Weekend',start:'2026-05-22',end:'2026-05-25'},
  {name:'4th of July Week',start:'2026-06-28',end:'2026-07-05'},
  {name:'Labor Day Weekend',start:'2026-08-28',end:'2026-09-01'},
  {name:'Thanksgiving Weekend',start:'2026-11-26',end:'2026-11-30'},
  {name:'Christmas Week',start:'2026-12-21',end:'2026-12-28'},
]
function isSpecial(ds){return SPECIAL_EVENTS.find(e=>ds>=e.start&&ds<=e.end)}
function isWeekend(ds){const d=new Date(ds);return d.getDay()===5||d.getDay()===6}

function nightlyRate(zone,ds){
  if(zone==='parkmod') return 169
  const d=new Date(ds);const m=d.getMonth()+1;const day=d.getDate()
  if(m>=8&&m<=11) return 59
  const peak=(m===5&&day>=17)||m===6||m===7||(m===8&&day<=14)
  const fs=isWeekend(ds)
  if(peak) return zone==='beachfront'?120:zone==='midpark'?106:98
  if(fs) return zone==='beachfront'?148:zone==='midpark'?134:123
  return zone==='beachfront'?128:zone==='midpark'?113:102
}

function totalCost(zone,arrival,departure){
  const a=new Date(arrival),d=new Date(departure)
  if(!a||!d||d<=a) return null
  let sub=0;const cur=new Date(a)
  while(cur<d){
    const ds=cur.toISOString().split('T')[0]
    sub+=nightlyRate(zone,ds)+(isSpecial(ds)?25:0)
    cur.setDate(cur.getDate()+1)
  }
  const nights=Math.round((d-a)/86400000)
  return{subtotal:sub,tax:Math.round(sub*0.115),grand:sub+Math.round(sub*0.115),nights}
}

const fmt=d=>d.toISOString().split('T')[0]
const addD=(d,n)=>{const x=new Date(d);x.setDate(x.getDate()+n);return x}
const today=new Date()
const ZL={beachfront:'Beachfront',midpark:'Oceanfront / Mid Park',oceanside:'Oceanside / Upper Park',parkmod:'Park Model'}
const FILTERS=[{k:'all',l:'All'},{k:'beachfront',l:'Beachfront'},{k:'midpark',l:'Mid Park'},{k:'oceanside',l:'Oceanside'},{k:'parkmod',l:'Park Model'}]

function siteState(s,rvLen){
  if(BOOKED.has(s.id)) return 'booked'
  if(s.zone!=='parkmod'&&rvLen>0&&s.maxLen>0&&rvLen>s.maxLen) return 'toolong'
  return 'available'
}

export default function BookingApp(){
  const[arrival,setArrival]=useState(fmt(addD(today,7)))
  const[departure,setDeparture]=useState(fmt(addD(today,10)))
  const[rvLen,setRvLen]=useState('')
  const[filter,setFilter]=useState('all')
  const[searched,setSearched]=useState(false)
  const[selected,setSelected]=useState(null)
  const[step,setStep]=useState('map')
  const[form,setForm]=useState({name:'',email:'',phone:'',rig:''})
  const[errors,setErrors]=useState({})
  const[hovered,setHovered]=useState(null)

  const numLen=parseInt(rvLen)||0
  const cost=selected?totalCost(selected.zone,arrival,departure):null
  const nights=cost?.nights||0
  const activeSpecial=selected?isSpecial(arrival):null
  const visible=SITES.filter(s=>filter==='all'||s.zone===filter)

  function handleSearch(){setSearched(true);setSelected(null);setStep('map')}

  function handleClick(s){
    if(!searched||siteState(s,numLen)!=='available') return
    setSelected(s);setStep('map')
  }

  function handleSubmit(){
    const e={}
    if(!form.name.trim()) e.name='Enter your full name'
    if(!form.email.trim()||!/\S+@\S+\.\S+/.test(form.email)) e.email='Enter a valid email'
    if(!form.phone.trim()) e.phone='Enter a phone number'
    if(Object.keys(e).length){setErrors(e);return}
    setStep('confirm')
  }

  function overlayFill(s){
    const st=siteState(s,numLen)
    if(selected?.id===s.id) return 'rgba(93,184,168,0.60)'
    if(!searched) return 'transparent'
    if(hovered===s.id&&st==='available') return 'rgba(255,255,255,0.22)'
    if(st==='booked')  return 'rgba(192,57,43,0.58)'
    if(st==='toolong') return 'rgba(230,126,34,0.55)'
    return 'rgba(39,174,96,0.48)'
  }

  const DISPLAY_W=580
  const SCALE=DISPLAY_W/MAP_W
  const DISPLAY_H=Math.round(MAP_H*SCALE)

  return(
    <div style={{background:C.navy,minHeight:'100vh',display:'flex',flexDirection:'column',fontFamily:'sans-serif'}}>

      <header style={{background:C.navyDark,borderBottom:`3px solid ${C.teal}`,padding:'0 20px'}}>
        <div style={{maxWidth:1300,margin:'0 auto',display:'flex',alignItems:'center',justifyContent:'space-between',height:58}}>
          <div style={{display:'flex',alignItems:'center',gap:12}}>
            <div style={{width:40,height:40,background:C.teal,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontWeight:700,fontSize:14}}>BM</div>
            <div>
              <div style={{color:C.white,fontSize:14,fontWeight:700,letterSpacing:2,fontFamily:'Georgia,serif',textTransform:'uppercase',lineHeight:1.1}}>Bryn Mawr Ocean Resort</div>
              <div style={{color:C.teal,fontSize:9,letterSpacing:1.5,textTransform:'uppercase'}}>St. Augustine Beach, FL · Online Reservations</div>
            </div>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:14}}>
            <a href="https://brynmawroceanresort.net" target="_blank" rel="noopener noreferrer" style={{color:'rgba(255,255,255,0.5)',fontSize:11,textDecoration:'none'}}>← Main Site</a>
            <div style={{background:'rgba(93,184,168,0.12)',border:`1px solid ${C.teal}`,color:C.teal,fontSize:9,padding:'3px 10px',borderRadius:16,letterSpacing:1}}>DEMO · Dream App Lab</div>
          </div>
        </div>
      </header>

      <div style={{background:'#1e3a5a',padding:'10px 20px',borderBottom:'1px solid rgba(93,184,168,0.18)',textAlign:'center'}}>
        <div style={{fontSize:18,color:C.white,fontFamily:'Georgia,serif',marginBottom:2}}>Reserve Your Site</div>
        <div style={{fontSize:11,color:C.teal,letterSpacing:1}}>Choose your dates · Filter by type · Click your site directly on the park map</div>
      </div>

      <div style={{display:'flex',flex:1,maxWidth:1300,margin:'0 auto',width:'100%'}}>

        {/* SIDEBAR */}
        <aside style={{width:220,minWidth:220,background:C.navyDark,borderRight:'1px solid rgba(93,184,168,0.12)',padding:14,display:'flex',flexDirection:'column',gap:12,overflowY:'auto'}}>
          <S label="Your Stay">
            <F label="Arrival"><input type="date" value={arrival} onChange={e=>setArrival(e.target.value)} style={iS}/></F>
            <F label="Departure"><input type="date" value={departure} onChange={e=>setDeparture(e.target.value)} style={iS}/></F>
            {nights>0&&<div style={{background:'rgba(93,184,168,0.1)',border:'1px solid rgba(93,184,168,0.25)',borderRadius:14,padding:'3px 10px',fontSize:11,color:C.teal,textAlign:'center'}}>{nights} night{nights>1?'s':''}</div>}
            {activeSpecial&&<div style={{background:'rgba(201,168,76,0.1)',border:'1px solid rgba(201,168,76,0.25)',borderRadius:5,padding:'5px 8px',fontSize:9,color:C.gold,lineHeight:1.5}}>⚠ {activeSpecial.name}<br/>+$25/night · 3-night min</div>}
          </S>
          <Hr/>
          <S label="Your RV">
            <F label="Length in feet"><input type="number" value={rvLen} onChange={e=>setRvLen(e.target.value)} placeholder="e.g. 40" min="10" max="80" style={iS}/></F>
            <div style={{fontSize:9,color:'rgba(255,255,255,0.3)',lineHeight:1.5}}>Sites too small for your rig will show orange. Leave blank for park models.</div>
          </S>
          <Hr/>
          <S label="Filter by type">
            <div style={{display:'flex',flexWrap:'wrap',gap:4}}>
              {FILTERS.map(f=><button key={f.k} onClick={()=>setFilter(f.k)} style={{...cS,...(filter===f.k?cA:{})}}>{f.l}</button>)}
            </div>
          </S>
          <button onClick={handleSearch} style={gS}>Show available sites</button>
          <Hr/>
          <S label="Legend">
            <L color={C.green}  label="Available"/>
            <L color={C.orange} label="Too small for your rig"/>
            <L color={C.red}    label="Already reserved"/>
            <L color={C.blue}   label="Park model"/>
            <L color={C.teal}   label="Your selection"/>
          </S>
          <Hr/>
          <S label="Resort info">
            <IR label="Check-in"  val="2:00 PM"/>
            <IR label="Check-out" val="11 AM · PM 10 AM"/>
            <IR label="Office"    val="Mon–Sat 9–5 · Sun 9–4"/>
            <IR label="Phone"     val="(904) 471-3353"/>
            <IR label="Tax"       val="+11.5% at checkout"/>
          </S>
        </aside>

        {/* MAP */}
        <div style={{flex:1,background:'#0a1810',display:'flex',alignItems:'flex-start',justifyContent:'center',padding:'10px 6px',overflowY:'auto'}}>
          <div style={{position:'relative',width:DISPLAY_W,height:DISPLAY_H,flexShrink:0,borderRadius:6,overflow:'hidden',boxShadow:'0 4px 24px rgba(0,0,0,0.5)'}}>

            <img src="/parkmap.png" alt="Bryn Mawr Ocean Resort park map" style={{width:DISPLAY_W,height:DISPLAY_H,display:'block',userSelect:'none'}} draggable={false}/>

            {!searched&&(
              <div style={{position:'absolute',inset:0,background:'rgba(8,18,28,0.75)',display:'flex',alignItems:'center',justifyContent:'center'}}>
                <div style={{background:'rgba(21,35,56,0.97)',border:`1px solid rgba(93,184,168,0.45)`,borderRadius:10,padding:'22px 26px',maxWidth:230,textAlign:'center'}}>
                  <div style={{fontSize:30,marginBottom:8}}>🗺️</div>
                  <div style={{fontSize:13,color:C.teal,fontFamily:'Georgia,serif',marginBottom:6}}>Enter your dates first</div>
                  <div style={{fontSize:11,color:'rgba(255,255,255,0.5)',lineHeight:1.7}}>Click <em style={{color:C.teal}}>Show available sites</em> — then tap any green site directly on the park map.</div>
                </div>
              </div>
            )}

            {/* Transparent SVG overlay with proper diagonal polygon zones */}
            <svg
              style={{position:'absolute',top:0,left:0,width:DISPLAY_W,height:DISPLAY_H}}
              viewBox={`0 0 ${MAP_W} ${MAP_H}`}
              xmlns="http://www.w3.org/2000/svg"
            >
              {visible.map(s=>{
                const st=siteState(s,numLen)
                const fill=overlayFill(s)
                const isSel=selected?.id===s.id
                const clickable=searched&&st==='available'
                return(
                  <polygon
                    key={s.id}
                    points={s.points}
                    fill={fill}
                    stroke={isSel?'rgba(255,255,255,0.9)':searched?'rgba(255,255,255,0.25)':'transparent'}
                    strokeWidth={isSel?1.5:0.7}
                    style={{cursor:clickable?'pointer':searched&&st!=='available'?'not-allowed':'default',transition:'fill 0.12s'}}
                    onClick={()=>handleClick(s)}
                    onMouseEnter={()=>setHovered(s.id)}
                    onMouseLeave={()=>setHovered(null)}
                  />
                )
              })}
            </svg>

            {/* Hover tooltip */}
            {hovered&&searched&&(()=>{
              const s=SITES.find(x=>x.id===hovered)
              if(!s) return null
              const st=siteState(s,numLen)
              const stLabel=st==='booked'?'Reserved':st==='toolong'?'Too small for your rig':'Available — tap to select'
              const stColor=st==='booked'?C.red:st==='toolong'?C.orange:C.green
              const pts=s.points.split(' ').map(p=>p.split(',').map(Number))
              const cx=Math.round(pts.reduce((a,p)=>a+p[0],0)/pts.length)
              const cy=Math.round(pts.reduce((a,p)=>a+p[1],0)/pts.length)
              const tx=Math.min(cx*SCALE+8,DISPLAY_W-145)
              const ty=Math.max(cy*SCALE-52,4)
              return(
                <div style={{position:'absolute',left:tx,top:ty,background:'rgba(12,22,36,0.97)',border:`1px solid rgba(93,184,168,0.45)`,borderRadius:6,padding:'7px 11px',fontSize:11,color:'#fff',pointerEvents:'none',whiteSpace:'nowrap',zIndex:10,lineHeight:1.5}}>
                  <div style={{fontWeight:700,fontSize:13}}>Site {s.id}</div>
                  <div style={{fontSize:10,color:'rgba(255,255,255,0.55)'}}>{ZL[s.zone]}</div>
                  <div style={{fontSize:10,color:stColor,fontWeight:600,marginTop:2}}>{stLabel}</div>
                  {s.maxLen>0&&<div style={{fontSize:9,color:'rgba(255,255,255,0.38)',marginTop:1}}>Max {s.maxLen} ft RV</div>}
                </div>
              )
            })()}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <aside style={{width:215,minWidth:215,background:C.navyDark,borderLeft:'1px solid rgba(93,184,168,0.12)',display:'flex',flexDirection:'column'}}>
          <div style={{padding:'11px 14px',borderBottom:'1px solid rgba(93,184,168,0.12)',color:C.teal,fontSize:9,letterSpacing:2,textTransform:'uppercase'}}>
            {step==='map'?'Site Details':step==='form'?'Your Information':'Reservation Sent'}
          </div>
          <div style={{flex:1,padding:14,overflowY:'auto',display:'flex',flexDirection:'column',gap:9}}>

            {step==='map'&&!selected&&(
              <div style={{color:'rgba(255,255,255,0.35)',fontSize:11,textAlign:'center',padding:'32px 10px',lineHeight:1.9}}>
                {searched
                  ?<>Tap any <span style={{color:C.green,fontWeight:600}}>green site</span> on the map to view details and reserve.</>
                  :<>Set your dates and click <span style={{color:C.teal}}>Show available sites</span> to get started.</>}
              </div>
            )}

            {step==='map'&&selected&&(<>
              <div style={{fontSize:24,fontWeight:700,color:C.teal}}>Site {selected.id}</div>
              <div style={{fontSize:9,color:'rgba(255,255,255,0.45)',textTransform:'uppercase',letterSpacing:1}}>{ZL[selected.zone]}</div>
              <span style={{display:'inline-block',background:'rgba(39,174,96,0.14)',color:C.green,padding:'2px 8px',borderRadius:10,fontSize:9,fontWeight:700,letterSpacing:1}}>AVAILABLE</span>
              <div>
                {selected.zone!=='parkmod'&&<DR label="Max RV length" val={`${selected.maxLen} ft`}/>}
                {selected.zone==='parkmod'&&<DR label="Deposit required" val="$250"/>}
                <DR label="Hookup" val={selected.zone==='parkmod'?'Full kitchen + linens':'30/50 amp · water · sewer'}/>
                {cost&&<DR label="Avg nightly" val={`$${Math.round(cost.subtotal/cost.nights)}`}/>}
                {cost&&<DR label="Nights" val={cost.nights}/>}
              </div>
              {cost&&(
                <div style={{background:'rgba(93,184,168,0.08)',border:'1px solid rgba(93,184,168,0.22)',borderRadius:7,padding:'10px 12px'}}>
                  <div style={{fontSize:9,color:'rgba(255,255,255,0.4)',textTransform:'uppercase',letterSpacing:1}}>Estimated total</div>
                  <div style={{fontSize:24,color:C.teal,fontWeight:700,margin:'3px 0'}}>${cost.grand.toLocaleString()}</div>
                  <div style={{fontSize:10,color:'rgba(255,255,255,0.38)'}}>Subtotal ${cost.subtotal} + ${cost.tax} tax</div>
                  {selected.zone==='parkmod'&&<div style={{fontSize:9,color:'rgba(255,255,255,0.32)',marginTop:3}}>+ $100 cleaning fee</div>}
                </div>
              )}
              {activeSpecial&&<div style={{background:'rgba(201,168,76,0.1)',border:'1px solid rgba(201,168,76,0.22)',borderRadius:5,padding:'6px 9px',fontSize:9,color:C.gold,lineHeight:1.5}}>⚠ {activeSpecial.name}<br/>+$25/night · 3-night minimum</div>}
              <button onClick={()=>setStep('form')} style={rS}>Reserve this site →</button>
              <div style={{fontSize:9,color:'rgba(255,255,255,0.28)',textAlign:'center',lineHeight:1.6}}>Deposit at check-in. Office confirms within 24 hrs.</div>
            </>)}

            {step==='form'&&selected&&(<>
              <div style={{background:'rgba(93,184,168,0.08)',border:'1px solid rgba(93,184,168,0.18)',borderRadius:5,padding:'6px 10px',fontSize:11,color:C.white}}>
                Site {selected.id} · {cost?.nights} night{cost?.nights!==1?'s':''}{cost?` · $${cost.grand.toLocaleString()}`:''}
              </div>
              {[
                {k:'name',l:'Full name',t:'text',p:'Jane Smith'},
                {k:'email',l:'Email address',t:'email',p:'jane@example.com'},
                {k:'phone',l:'Phone number',t:'tel',p:'(904) 555-0100'},
                {k:'rig',l:'RV make/model (optional)',t:'text',p:'e.g. Entegra Cornerstone'},
              ].map(f=>(
                <div key={f.k} style={{display:'flex',flexDirection:'column',gap:3}}>
                  <label style={{fontSize:10,color:'rgba(255,255,255,0.4)'}}>{f.l}</label>
                  <input type={f.t} placeholder={f.p} value={form[f.k]} onChange={e=>{setForm(p=>({...p,[f.k]:e.target.value}));setErrors(p=>({...p,[f.k]:''}))} } style={{...iS,...(errors[f.k]?{borderColor:C.red}:{})}}/>
                  {errors[f.k]&&<span style={{fontSize:10,color:C.red}}>{errors[f.k]}</span>}
                </div>
              ))}
              <button onClick={handleSubmit} style={rS}>Submit reservation →</button>
              <button onClick={()=>setStep('map')} style={{background:'transparent',border:'1px solid rgba(93,184,168,0.25)',color:C.teal,padding:'7px',borderRadius:5,fontSize:10,cursor:'pointer',width:'100%'}}>← Back to map</button>
            </>)}

            {step==='confirm'&&selected&&(
              <div style={{textAlign:'center',paddingTop:12}}>
                <div style={{fontSize:38,marginBottom:8}}>🌊</div>
                <div style={{fontSize:14,color:C.teal,fontFamily:'Georgia,serif',marginBottom:6}}>Request submitted!</div>
                <div style={{fontSize:11,color:'rgba(255,255,255,0.5)',lineHeight:1.7,marginBottom:10}}>The Bryn Mawr team will confirm by email within 24 hours.</div>
                <div style={{background:'rgba(93,184,168,0.07)',border:'1px solid rgba(93,184,168,0.18)',borderRadius:6,padding:'9px 11px',marginBottom:10,textAlign:'left'}}>
                  <DR label="Name" val={form.name}/>
                  <DR label="Site" val={`${selected.id} · ${ZL[selected.zone]}`}/>
                  <DR label="Arrival" val={arrival}/>
                  <DR label="Departure" val={departure}/>
                  {cost&&<DR label="Est. total" val={`$${cost.grand.toLocaleString()}`}/>}
                </div>
                <div style={{fontSize:9,color:'rgba(255,255,255,0.28)',marginBottom:10,lineHeight:1.6}}>No payment required now. Deposit due at check-in on the resort's card terminal.</div>
                <button onClick={()=>{setStep('map');setSelected(null);setSearched(false)}} style={rS}>Start a new search</button>
              </div>
            )}
          </div>
        </aside>
      </div>

      <footer style={{background:C.navyDark,borderTop:'1px solid rgba(93,184,168,0.12)',padding:'10px 20px'}}>
        <div style={{maxWidth:1300,margin:'0 auto',display:'flex',justifyContent:'space-between',alignItems:'center',fontSize:10,color:'rgba(255,255,255,0.3)'}}>
          <span>© 2025 Bryn Mawr Ocean Resort · 4850 A1A S, St. Augustine Beach, FL 32080 · (904) 471-3353 · rentals@brynmawroceanresort.net</span>
          <span style={{color:'rgba(93,184,168,0.5)'}}>Demo by <strong style={{color:'rgba(93,184,168,0.8)'}}>Dream App Lab</strong></span>
        </div>
      </footer>
    </div>
  )
}

function S({label,children}){return <div style={{display:'flex',flexDirection:'column',gap:7}}><div style={{fontSize:9,letterSpacing:2,color:C.teal,textTransform:'uppercase'}}>{label}</div>{children}</div>}
function Hr(){return <hr style={{border:'none',borderTop:'1px solid rgba(93,184,168,0.1)',margin:'2px 0'}}/>}
function F({label,children}){return <div style={{display:'flex',flexDirection:'column',gap:3}}><label style={{fontSize:10,color:'rgba(255,255,255,0.38)'}}>{label}</label>{children}</div>}
function L({color,label}){return <div style={{display:'flex',alignItems:'center',gap:7,fontSize:10,color:'rgba(255,255,255,0.42)'}}><div style={{width:11,height:11,borderRadius:2,background:color,flexShrink:0}}/>{label}</div>}
function IR({label,val}){return <div style={{display:'flex',justifyContent:'space-between',padding:'3px 0',borderBottom:'1px solid rgba(255,255,255,0.04)',gap:6}}><span style={{fontSize:9,color:'rgba(255,255,255,0.35)',flexShrink:0}}>{label}</span><span style={{fontSize:9,color:'#fff',textAlign:'right'}}>{val}</span></div>}
function DR({label,val}){return <div style={{display:'flex',justifyContent:'space-between',padding:'4px 0',borderBottom:'1px solid rgba(255,255,255,0.05)',gap:6}}><span style={{fontSize:10,color:'rgba(255,255,255,0.38)',flexShrink:0}}>{label}</span><span style={{fontSize:11,color:'#fff',fontWeight:500,textAlign:'right'}}>{val}</span></div>}

const iS={background:'rgba(255,255,255,0.07)',border:'1px solid rgba(93,184,168,0.22)',color:'#fff',padding:'6px 8px',borderRadius:5,fontSize:12,width:'100%',boxSizing:'border-box',fontFamily:'sans-serif'}
const cS={background:'rgba(255,255,255,0.06)',border:'1px solid rgba(93,184,168,0.18)',color:'rgba(255,255,255,0.48)',padding:'3px 8px',borderRadius:12,fontSize:10,cursor:'pointer'}
const cA={background:C.teal,borderColor:C.teal,color:'#0f2030',fontWeight:700}
const gS={background:C.teal,color:'#0f2030',border:'none',padding:'9px',borderRadius:5,fontSize:12,fontWeight:700,letterSpacing:1,textTransform:'uppercase',cursor:'pointer',width:'100%'}
const rS={background:C.teal,color:'#0f2030',border:'none',padding:'9px',borderRadius:5,fontSize:11,fontWeight:700,letterSpacing:1,textTransform:'uppercase',cursor:'pointer',width:'100%'}
