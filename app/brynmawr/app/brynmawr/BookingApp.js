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
  {id:'82',zone:'oceanside',maxLen:40,sqft:0,points:'43,197 79,174 79,200 43,223'},
  {id:'81',zone:'oceanside',maxLen:40,sqft:0,points:'43,223 79,200 79,226 43,249'},
  {id:'80',zone:'oceanside',maxLen:40,sqft:0,points:'43,249 79,226 79,252 43,275'},
  {id:'79',zone:'oceanside',maxLen:40,sqft:0,points:'43,275 79,252 79,278 43,301'},
  {id:'78',zone:'oceanside',maxLen:40,sqft:0,points:'43,301 79,278 79,304 43,327'},
  {id:'77',zone:'oceanside',maxLen:40,sqft:0,points:'43,327 79,304 79,330 43,353'},
  {id:'76',zone:'oceanside',maxLen:40,sqft:0,points:'43,353 79,330 79,356 43,379'},
  {id:'75',zone:'oceanside',maxLen:40,sqft:0,points:'43,379 79,356 79,382 43,405'},
  {id:'74',zone:'oceanside',maxLen:40,sqft:0,points:'43,405 79,382 79,408 43,431'},
  {id:'73',zone:'oceanside',maxLen:40,sqft:0,points:'43,431 79,408 79,434 43,457'},
  {id:'72',zone:'oceanside',maxLen:40,sqft:0,points:'43,457 79,434 79,460 43,483'},
  {id:'71',zone:'oceanside',maxLen:40,sqft:0,points:'43,483 79,460 79,486 43,509'},
  {id:'70',zone:'oceanside',maxLen:40,sqft:0,points:'43,509 79,486 79,512 43,535'},
  {id:'95',zone:'oceanside',maxLen:40,sqft:0,points:'94,192 127,169 127,195 94,218'},
  {id:'94',zone:'oceanside',maxLen:40,sqft:0,points:'94,218 127,195 127,221 94,244'},
  {id:'93',zone:'oceanside',maxLen:40,sqft:0,points:'94,244 127,221 127,247 94,270'},
  {id:'92',zone:'oceanside',maxLen:40,sqft:0,points:'94,270 127,247 127,273 94,296'},
  {id:'91',zone:'oceanside',maxLen:40,sqft:0,points:'94,296 127,273 127,299 94,322'},
  {id:'90',zone:'oceanside',maxLen:40,sqft:0,points:'94,322 127,299 127,325 94,348'},
  {id:'89',zone:'oceanside',maxLen:40,sqft:0,points:'94,348 127,325 127,351 94,374'},
  {id:'88',zone:'oceanside',maxLen:40,sqft:0,points:'94,374 127,351 127,377 94,400'},
  {id:'87',zone:'oceanside',maxLen:40,sqft:0,points:'94,400 127,377 127,403 94,426'},
  {id:'86',zone:'oceanside',maxLen:40,sqft:0,points:'94,426 127,403 127,429 94,452'},
  {id:'85',zone:'oceanside',maxLen:40,sqft:0,points:'94,452 127,429 127,455 94,478'},
  {id:'84',zone:'oceanside',maxLen:40,sqft:0,points:'94,478 127,455 127,481 94,504'},
  {id:'83',zone:'oceanside',maxLen:40,sqft:0,points:'94,504 127,481 127,507 94,530'},
  {id:'110',zone:'midpark',maxLen:55,sqft:0,points:'145,159 178,136 178,162 145,185'},
  {id:'109',zone:'midpark',maxLen:55,sqft:0,points:'145,185 178,162 178,188 145,211'},
  {id:'108',zone:'midpark',maxLen:55,sqft:0,points:'145,211 178,188 178,214 145,237'},
  {id:'107',zone:'midpark',maxLen:55,sqft:0,points:'145,237 178,214 178,240 145,263'},
  {id:'106',zone:'midpark',maxLen:55,sqft:0,points:'145,263 178,240 178,266 145,289'},
  {id:'105',zone:'midpark',maxLen:55,sqft:0,points:'145,289 178,266 178,292 145,315'},
  {id:'104',zone:'midpark',maxLen:55,sqft:0,points:'145,315 178,292 178,318 145,341'},
  {id:'103',zone:'midpark',maxLen:55,sqft:0,points:'145,341 178,318 178,344 145,367'},
  {id:'102',zone:'midpark',maxLen:55,sqft:0,points:'145,367 178,344 178,370 145,393'},
  {id:'101',zone:'midpark',maxLen:55,sqft:0,points:'145,393 178,370 178,396 145,419'},
  {id:'100',zone:'midpark',maxLen:55,sqft:0,points:'145,419 178,396 178,422 145,445'},
  {id:'99',zone:'midpark',maxLen:55,sqft:0,points:'145,445 178,422 178,448 145,471'},
  {id:'98',zone:'midpark',maxLen:55,sqft:0,points:'145,471 178,448 178,474 145,497'},
  {id:'97',zone:'midpark',maxLen:55,sqft:0,points:'145,497 178,474 178,500 145,523'},
  {id:'123',zone:'midpark',maxLen:55,sqft:0,points:'194,182 224,159 224,185 194,208'},
  {id:'122',zone:'midpark',maxLen:55,sqft:0,points:'194,208 224,185 224,211 194,234'},
  {id:'121',zone:'midpark',maxLen:55,sqft:0,points:'194,234 224,211 224,237 194,260'},
  {id:'120',zone:'midpark',maxLen:55,sqft:0,points:'194,260 224,237 224,263 194,286'},
  {id:'119',zone:'midpark',maxLen:55,sqft:0,points:'194,286 224,263 224,289 194,312'},
  {id:'118',zone:'midpark',maxLen:55,sqft:0,points:'194,312 224,289 224,315 194,338'},
  {id:'117',zone:'midpark',maxLen:55,sqft:0,points:'194,338 224,315 224,341 194,364'},
  {id:'116',zone:'midpark',maxLen:55,sqft:0,points:'194,364 224,341 224,367 194,390'},
  {id:'115',zone:'midpark',maxLen:55,sqft:0,points:'194,390 224,367 224,393 194,416'},
  {id:'114',zone:'midpark',maxLen:55,sqft:0,points:'194,416 224,393 224,419 194,442'},
  {id:'113',zone:'midpark',maxLen:55,sqft:0,points:'194,442 224,419 224,445 194,468'},
  {id:'112',zone:'midpark',maxLen:55,sqft:0,points:'194,468 224,445 224,471 194,494'},
  {id:'111',zone:'midpark',maxLen:55,sqft:0,points:'194,494 224,471 224,497 194,520'},
  {id:'135',zone:'midpark',maxLen:55,sqft:0,points:'224,177 255,154 255,180 224,203'},
  {id:'134',zone:'midpark',maxLen:55,sqft:0,points:'224,203 255,180 255,206 224,229'},
  {id:'133',zone:'midpark',maxLen:55,sqft:0,points:'224,229 255,206 255,232 224,255'},
  {id:'132',zone:'midpark',maxLen:55,sqft:0,points:'224,255 255,232 255,258 224,281'},
  {id:'131',zone:'midpark',maxLen:55,sqft:0,points:'224,281 255,258 255,284 224,307'},
  {id:'130',zone:'midpark',maxLen:55,sqft:0,points:'224,307 255,284 255,310 224,333'},
  {id:'129',zone:'midpark',maxLen:55,sqft:0,points:'224,333 255,310 255,336 224,359'},
  {id:'128',zone:'midpark',maxLen:55,sqft:0,points:'224,359 255,336 255,362 224,385'},
  {id:'127',zone:'midpark',maxLen:55,sqft:0,points:'224,385 255,362 255,388 224,411'},
  {id:'126',zone:'midpark',maxLen:55,sqft:0,points:'224,411 255,388 255,414 224,437'},
  {id:'125',zone:'midpark',maxLen:55,sqft:0,points:'224,437 255,414 255,440 224,463'},
  {id:'124',zone:'midpark',maxLen:55,sqft:0,points:'224,463 255,440 255,466 224,489'},
  {id:'249',zone:'midpark',maxLen:55,sqft:0,points:'307,149 340,126 340,152 307,175'},
  {id:'250',zone:'midpark',maxLen:55,sqft:0,points:'307,175 340,152 340,178 307,201'},
  {id:'154',zone:'midpark',maxLen:55,sqft:0,points:'307,201 340,178 340,204 307,227'},
  {id:'153',zone:'midpark',maxLen:55,sqft:0,points:'307,227 340,204 340,230 307,253'},
  {id:'152',zone:'midpark',maxLen:55,sqft:0,points:'307,253 340,230 340,256 307,279'},
  {id:'151',zone:'midpark',maxLen:55,sqft:0,points:'307,279 340,256 340,282 307,305'},
  {id:'150',zone:'midpark',maxLen:55,sqft:0,points:'307,305 340,282 340,308 307,331'},
  {id:'149',zone:'midpark',maxLen:55,sqft:0,points:'307,331 340,308 340,334 307,357'},
  {id:'148',zone:'midpark',maxLen:55,sqft:0,points:'307,357 340,334 340,360 307,383'},
  {id:'147',zone:'midpark',maxLen:55,sqft:0,points:'307,383 340,360 340,386 307,409'},
  {id:'146',zone:'midpark',maxLen:55,sqft:0,points:'307,409 340,386 340,412 307,435'},
  {id:'145',zone:'midpark',maxLen:55,sqft:0,points:'307,435 340,412 340,438 307,461'},
  {id:'144',zone:'midpark',maxLen:55,sqft:0,points:'307,461 340,438 340,464 307,487'},
  {id:'143',zone:'midpark',maxLen:55,sqft:0,points:'307,487 340,464 340,490 307,513'},
  {id:'142',zone:'midpark',maxLen:55,sqft:0,points:'307,513 340,490 340,516 307,539'},
  {id:'141',zone:'midpark',maxLen:55,sqft:0,points:'307,539 340,516 340,542 307,565'},
  {id:'140',zone:'midpark',maxLen:55,sqft:0,points:'307,565 340,542 340,568 307,591'},
  {id:'168',zone:'midpark',maxLen:55,sqft:0,points:'365,129 397,106 397,132 365,155'},
  {id:'167',zone:'midpark',maxLen:55,sqft:0,points:'365,155 397,132 397,158 365,181'},
  {id:'166',zone:'midpark',maxLen:55,sqft:0,points:'365,181 397,158 397,184 365,207'},
  {id:'165',zone:'midpark',maxLen:55,sqft:0,points:'365,207 397,184 397,210 365,233'},
  {id:'164',zone:'midpark',maxLen:55,sqft:0,points:'365,233 397,210 397,236 365,259'},
  {id:'163',zone:'midpark',maxLen:55,sqft:0,points:'365,259 397,236 397,262 365,285'},
  {id:'162',zone:'midpark',maxLen:55,sqft:0,points:'365,285 397,262 397,288 365,311'},
  {id:'161',zone:'midpark',maxLen:55,sqft:0,points:'365,311 397,288 397,314 365,337'},
  {id:'160',zone:'midpark',maxLen:55,sqft:0,points:'365,337 397,314 397,340 365,363'},
  {id:'159',zone:'midpark',maxLen:55,sqft:0,points:'365,363 397,340 397,366 365,389'},
  {id:'158',zone:'midpark',maxLen:55,sqft:0,points:'365,389 397,366 397,392 365,415'},
  {id:'157',zone:'midpark',maxLen:55,sqft:0,points:'365,415 397,392 397,418 365,441'},
  {id:'156',zone:'midpark',maxLen:55,sqft:0,points:'365,441 397,418 397,444 365,467'},
  {id:'155',zone:'midpark',maxLen:55,sqft:0,points:'365,467 397,444 397,470 365,493'},
  {id:'181',zone:'midpark',maxLen:55,sqft:0,points:'397,109 432,86 432,112 397,135'},
  {id:'180',zone:'midpark',maxLen:55,sqft:0,points:'397,135 432,112 432,138 397,161'},
  {id:'179',zone:'midpark',maxLen:55,sqft:0,points:'397,161 432,138 432,164 397,187'},
  {id:'178',zone:'midpark',maxLen:55,sqft:0,points:'397,187 432,164 432,190 397,213'},
  {id:'177',zone:'midpark',maxLen:55,sqft:0,points:'397,213 432,190 432,216 397,239'},
  {id:'176',zone:'midpark',maxLen:55,sqft:0,points:'397,239 432,216 432,242 397,265'},
  {id:'175',zone:'midpark',maxLen:55,sqft:0,points:'397,265 432,242 432,268 397,291'},
  {id:'174',zone:'midpark',maxLen:55,sqft:0,points:'397,291 432,268 432,294 397,317'},
  {id:'173',zone:'midpark',maxLen:55,sqft:0,points:'397,317 432,294 432,320 397,343'},
  {id:'172',zone:'midpark',maxLen:55,sqft:0,points:'397,343 432,320 432,346 397,369'},
  {id:'171',zone:'midpark',maxLen:55,sqft:0,points:'397,369 432,346 432,372 397,395'},
  {id:'170',zone:'midpark',maxLen:55,sqft:0,points:'397,395 432,372 432,398 397,421'},
  {id:'169',zone:'midpark',maxLen:55,sqft:0,points:'397,421 432,398 432,424 397,447'},
  {id:'195',zone:'midpark',maxLen:55,sqft:0,points:'448,109 484,86 484,112 448,135'},
  {id:'194',zone:'midpark',maxLen:55,sqft:0,points:'448,135 484,112 484,138 448,161'},
  {id:'193',zone:'midpark',maxLen:55,sqft:0,points:'448,161 484,138 484,164 448,187'},
  {id:'192',zone:'midpark',maxLen:55,sqft:0,points:'448,187 484,164 484,190 448,213'},
  {id:'191',zone:'midpark',maxLen:55,sqft:0,points:'448,213 484,190 484,216 448,239'},
  {id:'190',zone:'midpark',maxLen:55,sqft:0,points:'448,239 484,216 484,242 448,265'},
  {id:'189',zone:'midpark',maxLen:55,sqft:0,points:'448,265 484,242 484,268 448,291'},
  {id:'188',zone:'midpark',maxLen:55,sqft:0,points:'448,291 484,268 484,294 448,317'},
  {id:'187',zone:'midpark',maxLen:55,sqft:0,points:'448,317 484,294 484,320 448,343'},
  {id:'186',zone:'midpark',maxLen:55,sqft:0,points:'448,343 484,320 484,346 448,369'},
  {id:'185',zone:'midpark',maxLen:55,sqft:0,points:'448,369 484,346 484,372 448,395'},
  {id:'184',zone:'midpark',maxLen:55,sqft:0,points:'448,395 484,372 484,398 448,421'},
  {id:'183',zone:'midpark',maxLen:55,sqft:0,points:'448,421 484,398 484,424 448,447'},
  {id:'182',zone:'midpark',maxLen:55,sqft:0,points:'448,447 484,424 484,450 448,473'},
  {id:'209',zone:'midpark',maxLen:50,sqft:0,points:'500,109 536,86 536,112 500,135'},
  {id:'208',zone:'midpark',maxLen:50,sqft:0,points:'500,135 536,112 536,138 500,161'},
  {id:'207',zone:'midpark',maxLen:50,sqft:0,points:'500,161 536,138 536,164 500,187'},
  {id:'206',zone:'midpark',maxLen:50,sqft:0,points:'500,187 536,164 536,190 500,213'},
  {id:'205',zone:'midpark',maxLen:50,sqft:0,points:'500,213 536,190 536,216 500,239'},
  {id:'204',zone:'midpark',maxLen:50,sqft:0,points:'500,239 536,216 536,242 500,265'},
  {id:'203',zone:'midpark',maxLen:50,sqft:0,points:'500,265 536,242 536,268 500,291'},
  {id:'202',zone:'midpark',maxLen:50,sqft:0,points:'500,291 536,268 536,294 500,317'},
  {id:'201',zone:'midpark',maxLen:50,sqft:0,points:'500,317 536,294 536,320 500,343'},
  {id:'200',zone:'midpark',maxLen:50,sqft:0,points:'500,343 536,320 536,346 500,369'},
  {id:'199',zone:'midpark',maxLen:50,sqft:0,points:'500,369 536,346 536,372 500,395'},
  {id:'198',zone:'midpark',maxLen:50,sqft:0,points:'500,395 536,372 536,398 500,421'},
  {id:'197',zone:'midpark',maxLen:50,sqft:0,points:'500,421 536,398 536,424 500,447'},
  {id:'196',zone:'midpark',maxLen:50,sqft:0,points:'500,447 536,424 536,450 500,473'},
  {id:'218',zone:'oceanside',maxLen:40,sqft:0,points:'550,109 592,86 592,112 550,135'},
  {id:'217',zone:'oceanside',maxLen:40,sqft:0,points:'550,135 592,112 592,138 550,161'},
  {id:'216',zone:'oceanside',maxLen:40,sqft:0,points:'550,161 592,138 592,164 550,187'},
  {id:'215',zone:'oceanside',maxLen:40,sqft:0,points:'550,187 592,164 592,190 550,213'},
  {id:'214',zone:'oceanside',maxLen:40,sqft:0,points:'550,213 592,190 592,216 550,239'},
  {id:'213',zone:'oceanside',maxLen:40,sqft:0,points:'550,239 592,216 592,242 550,265'},
  {id:'211',zone:'oceanside',maxLen:40,sqft:0,points:'550,275 592,252 592,278 550,301'},
  {id:'210',zone:'oceanside',maxLen:40,sqft:0,points:'550,301 592,278 592,304 550,327'},
  {id:'41',zone:'oceanside',maxLen:40,sqft:0,points:'550,327 592,304 592,330 550,353'},
  {id:'40',zone:'oceanside',maxLen:40,sqft:0,points:'550,353 592,330 592,356 550,379'},
  {id:'39',zone:'oceanside',maxLen:40,sqft:0,points:'550,379 592,356 592,382 550,405'},
  {id:'38',zone:'oceanside',maxLen:40,sqft:0,points:'550,405 592,382 592,408 550,431'},
  {id:'37',zone:'oceanside',maxLen:40,sqft:0,points:'550,431 592,408 592,434 550,457'},
  {id:'36',zone:'oceanside',maxLen:40,sqft:0,points:'550,457 592,434 592,460 550,483'},
  {id:'35',zone:'oceanside',maxLen:40,sqft:0,points:'550,483 592,460 592,486 550,509'},
  {id:'34',zone:'oceanside',maxLen:40,sqft:0,points:'550,509 592,486 592,512 550,535'},
  {id:'219',zone:'beachfront',maxLen:0,sqft:0,points:'71,135 98,135 98,93 71,93'},
  {id:'220',zone:'beachfront',maxLen:0,sqft:0,points:'97,135 124,135 124,93 97,93'},
  {id:'221',zone:'beachfront',maxLen:0,sqft:0,points:'123,134 150,134 150,93 123,93'},
  {id:'222',zone:'beachfront',maxLen:0,sqft:0,points:'149,134 176,134 176,93 149,93'},
  {id:'223',zone:'beachfront',maxLen:0,sqft:0,points:'175,134 202,134 202,93 175,93'},
  {id:'224',zone:'beachfront',maxLen:0,sqft:0,points:'200,134 227,134 227,93 200,93'},
  {id:'225',zone:'beachfront',maxLen:0,sqft:0,points:'226,133 253,133 253,93 226,93'},
  {id:'226',zone:'beachfront',maxLen:0,sqft:0,points:'252,133 279,133 279,93 252,93'},
  {id:'227',zone:'beachfront',maxLen:0,sqft:0,points:'278,133 305,133 305,93 278,93'},
  {id:'228',zone:'beachfront',maxLen:0,sqft:0,points:'304,132 331,132 331,93 304,93'},
  {id:'229',zone:'beachfront',maxLen:0,sqft:0,points:'330,132 357,132 357,94 330,94'},
  {id:'230',zone:'beachfront',maxLen:0,sqft:0,points:'356,132 383,132 383,94 356,94'},
  {id:'231',zone:'beachfront',maxLen:0,sqft:0,points:'382,131 409,131 409,94 382,94'},
  {id:'232',zone:'beachfront',maxLen:0,sqft:0,points:'408,131 435,131 435,94 408,94'},
  {id:'233',zone:'beachfront',maxLen:0,sqft:0,points:'434,131 461,131 461,94 434,94'},
  {id:'234',zone:'beachfront',maxLen:0,sqft:0,points:'460,130 487,130 487,94 460,94'},
  {id:'235',zone:'beachfront',maxLen:0,sqft:0,points:'485,130 512,130 512,94 485,94'},
  {id:'236',zone:'beachfront',maxLen:0,sqft:0,points:'511,130 538,130 538,94 511,94'},
  {id:'237',zone:'beachfront',maxLen:0,sqft:0,points:'537,130 564,130 564,94 537,94'},
  {id:'238',zone:'beachfront',maxLen:0,sqft:0,points:'563,129 590,129 590,94 563,94'},
  {id:'29',zone:'oceanside',maxLen:40,sqft:0,points:'272,523 310,564 345,557 304,518'},
  {id:'28',zone:'oceanside',maxLen:40,sqft:0,points:'306,522 336,554 363,549 331,518'},
  {id:'27',zone:'oceanside',maxLen:40,sqft:0,points:'340,521 362,544 381,541 358,518'},
  {id:'26',zone:'oceanside',maxLen:40,sqft:0,points:'374,520 388,534 399,533 385,518'},
  {id:'25',zone:'oceanside',maxLen:40,sqft:0,points:'408,519 414,524 417,525 412,518'},
  {id:'24',zone:'oceanside',maxLen:40,sqft:0,points:'442,518 440,514 435,517 439,518'},
  {id:'23',zone:'oceanside',maxLen:40,sqft:0,points:'476,517 466,504 453,509 466,518'},
  {id:'22',zone:'oceanside',maxLen:40,sqft:0,points:'510,516 492,494 471,501 493,518'},
  {id:'21',zone:'oceanside',maxLen:40,sqft:0,points:'544,515 518,484 489,493 520,518'},
  {id:'20',zone:'oceanside',maxLen:40,sqft:0,points:'578,514 544,474 507,485 547,518'},
  {id:'11',zone:'oceanside',maxLen:38,sqft:0,points:'272,498 310,539 345,532 304,493'},
  {id:'12',zone:'oceanside',maxLen:38,sqft:0,points:'306,497 336,529 363,524 331,493'},
  {id:'13',zone:'oceanside',maxLen:38,sqft:0,points:'340,496 362,519 381,516 358,493'},
  {id:'14',zone:'oceanside',maxLen:38,sqft:0,points:'374,495 388,509 399,508 385,493'},
  {id:'15',zone:'oceanside',maxLen:38,sqft:0,points:'408,494 414,499 417,500 412,493'},
  {id:'16',zone:'oceanside',maxLen:38,sqft:0,points:'442,493 440,489 435,492 439,493'},
  {id:'17',zone:'oceanside',maxLen:38,sqft:0,points:'476,492 466,479 453,484 466,493'},
  {id:'18',zone:'oceanside',maxLen:38,sqft:0,points:'510,491 492,469 471,476 493,493'},
  {id:'19',zone:'oceanside',maxLen:38,sqft:0,points:'544,490 518,459 489,468 520,493'},
  {id:'42',zone:'oceanside',maxLen:38,sqft:0,points:'272,553 310,594 345,587 304,548'},
  {id:'43',zone:'oceanside',maxLen:38,sqft:0,points:'306,552 336,584 363,579 331,548'},
  {id:'44',zone:'oceanside',maxLen:38,sqft:0,points:'340,551 362,574 381,571 358,548'},
  {id:'45',zone:'oceanside',maxLen:38,sqft:0,points:'374,550 388,564 399,563 385,548'},
  {id:'46',zone:'oceanside',maxLen:38,sqft:0,points:'408,549 414,554 417,555 412,548'},
  {id:'47',zone:'oceanside',maxLen:38,sqft:0,points:'442,548 440,544 435,547 439,548'},
  {id:'48',zone:'oceanside',maxLen:38,sqft:0,points:'476,547 466,534 453,539 466,548'},
  {id:'49',zone:'oceanside',maxLen:38,sqft:0,points:'510,546 492,524 471,531 493,548'},
  {id:'50',zone:'oceanside',maxLen:38,sqft:0,points:'544,545 518,514 489,523 520,548'},
  {id:'51',zone:'oceanside',maxLen:38,sqft:0,points:'578,544 544,504 507,515 547,548'},
  {id:'1',zone:'oceanside',maxLen:35,sqft:0,points:'274,630 307,621 292,664 256,673'},
  {id:'2',zone:'oceanside',maxLen:35,sqft:0,points:'305,625 333,620 316,659 286,663'},
  {id:'3',zone:'oceanside',maxLen:35,sqft:0,points:'336,620 359,619 340,654 316,653'},
  {id:'4',zone:'oceanside',maxLen:35,sqft:0,points:'367,615 385,618 364,649 346,643'},
  {id:'5',zone:'oceanside',maxLen:35,sqft:0,points:'398,610 411,617 388,644 376,633'},
  {id:'6',zone:'oceanside',maxLen:35,sqft:0,points:'429,605 437,616 412,639 406,623'},
  {id:'7',zone:'oceanside',maxLen:35,sqft:0,points:'460,600 463,615 436,634 436,613'},
  {id:'8',zone:'oceanside',maxLen:35,sqft:0,points:'491,595 489,614 460,629 466,603'},
  {id:'9',zone:'oceanside',maxLen:35,sqft:0,points:'522,590 515,613 484,624 496,593'},
  {id:'10',zone:'oceanside',maxLen:35,sqft:0,points:'553,585 541,612 508,619 526,583'},
  {id:'31',zone:'oceanside',maxLen:35,sqft:0,points:'305,670 333,665 316,704 286,708'},
  {id:'32',zone:'oceanside',maxLen:35,sqft:0,points:'336,665 359,664 340,699 316,698'},
  {id:'33',zone:'oceanside',maxLen:35,sqft:0,points:'367,660 385,663 364,694 346,688'},
  {id:'34',zone:'oceanside',maxLen:35,sqft:0,points:'398,655 411,662 388,689 376,678'},
  {id:'30',zone:'oceanside',maxLen:35,sqft:0,points:'429,650 437,661 412,684 406,668'},
  {id:'52',zone:'oceanside',maxLen:40,sqft:0,points:'231,573 200,542 171,548 201,579'},
  {id:'48',zone:'oceanside',maxLen:38,sqft:0,points:'231,573 200,542 171,548 201,579'},
  {id:'51',zone:'oceanside',maxLen:38,sqft:0,points:'146,589 117,558 89,563 118,595'},
  {id:'53',zone:'oceanside',maxLen:38,sqft:0,points:'46,626 76,657 105,652 75,620'},
  {id:'43',zone:'oceanside',maxLen:38,sqft:0,points:'189,634 217,629 185,598 159,604'},
  {id:'54',zone:'oceanside',maxLen:35,sqft:0,points:'205,669 190,684 161,656 187,651'},
  {id:'56',zone:'oceanside',maxLen:35,sqft:0,points:'95,701 59,704 41,685 69,676'},
  {id:'57',zone:'oceanside',maxLen:35,sqft:0,points:'127,699 161,699 143,668 109,671'},
  {id:'58',zone:'oceanside',maxLen:35,sqft:0,points:'187,697 157,698 116,738 149,740'},
  {id:'61',zone:'oceanside',maxLen:35,sqft:0,points:'59,704 89,702 59,734 34,728'},
  {id:'62',zone:'oceanside',maxLen:35,sqft:0,points:'89,703 120,700 92,732 62,734'},
  {id:'63',zone:'oceanside',maxLen:35,sqft:0,points:'107,752 115,767 94,777 80,749'},
  {id:'64',zone:'oceanside',maxLen:35,sqft:0,points:'130,742 160,735 140,766 110,772'},
  {id:'65',zone:'oceanside',maxLen:35,sqft:0,points:'158,730 188,722 168,752 138,760'},
  {id:'66',zone:'oceanside',maxLen:35,sqft:0,points:'31,801 31,781 63,767 70,782'},
  {id:'67',zone:'oceanside',maxLen:35,sqft:0,points:'70,782 70,800 99,783 99,764'},
  {id:'68',zone:'oceanside',maxLen:35,sqft:0,points:'105,762 136,750 143,773 112,787'},
  {id:'69',zone:'oceanside',maxLen:35,sqft:0,points:'138,749 166,735 173,758 145,771'},
  {id:'50',zone:'oceanside',maxLen:38,sqft:0,points:'189,581 158,550 129,556 159,587'},
  {id:'49',zone:'oceanside',maxLen:38,sqft:0,points:'158,585 127,554 98,560 128,591'},
  {id:'46',zone:'oceanside',maxLen:38,sqft:0,points:'189,617 217,612 199,643 170,648'},
  {id:'45',zone:'oceanside',maxLen:38,sqft:0,points:'159,622 187,617 169,648 140,653'},
  {id:'44',zone:'oceanside',maxLen:38,sqft:0,points:'129,628 157,622 139,653 110,658'},
  {id:'55',zone:'oceanside',maxLen:35,sqft:0,points:'46,656 75,649 58,680 28,686'},
  {id:'212',zone:'oceanside',maxLen:35,sqft:0,points:'77,648 106,641 89,672 59,678'},
  {id:'239',zone:'oceanside',maxLen:30,sqft:0,points:'199,762 227,758 227,738 199,742'},
  {id:'240',zone:'oceanside',maxLen:30,sqft:0,points:'227,734 255,730 255,710 227,714'},
  {id:'241',zone:'oceanside',maxLen:30,sqft:0,points:'238,723 266,719 266,699 238,703'},
  {id:'242',zone:'oceanside',maxLen:30,sqft:0,points:'257,703 285,699 285,679 257,683'},
  {id:'243',zone:'oceanside',maxLen:30,sqft:0,points:'283,685 311,681 311,661 283,665'},
  {id:'244',zone:'oceanside',maxLen:30,sqft:0,points:'293,678 321,674 321,654 293,658'},
  {id:'245',zone:'oceanside',maxLen:30,sqft:0,points:'341,668 369,664 369,644 341,648'},
  {id:'246',zone:'oceanside',maxLen:30,sqft:0,points:'370,672 398,668 398,648 370,652'},
  {id:'247',zone:'oceanside',maxLen:30,sqft:0,points:'400,655 428,651 428,631 400,635'},
  {id:'248',zone:'oceanside',maxLen:30,sqft:0,points:'430,649 458,645 458,625 430,629'},
  {id:'PM1',zone:'parkmod',maxLen:0,sqft:400,points:'310,734 360,734 360,704 310,704'},
  {id:'PM2',zone:'parkmod',maxLen:0,sqft:500,points:'364,734 414,734 414,704 364,704'},
  {id:'PM3',zone:'parkmod',maxLen:0,sqft:400,points:'418,734 468,734 468,704 418,704'},
  {id:'PM4',zone:'parkmod',maxLen:0,sqft:400,points:'310,768 360,768 360,738 310,738'},
  {id:'PM5',zone:'parkmod',maxLen:0,sqft:500,points:'364,768 414,768 414,738 364,738'},
  {id:'PM6',zone:'parkmod',maxLen:0,sqft:400,points:'418,768 468,768 468,738 418,738'},
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
