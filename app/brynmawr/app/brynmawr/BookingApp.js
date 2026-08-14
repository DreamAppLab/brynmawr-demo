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
  {id:'219',zone:'beachfront',maxLen:0,sqft:0,points:'71,135 98,134 98,93 71,95'},
  {id:'220',zone:'beachfront',maxLen:0,sqft:0,points:'97,135 124,134 124,93 97,95'},
  {id:'221',zone:'beachfront',maxLen:0,sqft:0,points:'123,134 150,133 150,93 123,95'},
  {id:'222',zone:'beachfront',maxLen:0,sqft:0,points:'149,134 176,133 176,93 149,95'},
  {id:'223',zone:'beachfront',maxLen:0,sqft:0,points:'175,134 201,133 201,93 175,95'},
  {id:'224',zone:'beachfront',maxLen:0,sqft:0,points:'201,133 227,133 227,93 201,95'},
  {id:'225',zone:'beachfront',maxLen:0,sqft:0,points:'227,133 253,132 253,93 227,95'},
  {id:'226',zone:'beachfront',maxLen:0,sqft:0,points:'253,133 279,132 279,93 253,95'},
  {id:'227',zone:'beachfront',maxLen:0,sqft:0,points:'279,132 305,132 305,93 279,95'},
  {id:'228',zone:'beachfront',maxLen:0,sqft:0,points:'305,132 331,132 331,93 305,95'},
  {id:'229',zone:'beachfront',maxLen:0,sqft:0,points:'330,132 356,131 356,94 330,94'},
  {id:'230',zone:'beachfront',maxLen:0,sqft:0,points:'356,132 382,131 382,94 356,94'},
  {id:'231',zone:'beachfront',maxLen:0,sqft:0,points:'382,131 408,131 408,94 382,94'},
  {id:'232',zone:'beachfront',maxLen:0,sqft:0,points:'408,131 434,131 434,94 408,94'},
  {id:'233',zone:'beachfront',maxLen:0,sqft:0,points:'434,131 460,130 460,94 434,94'},
  {id:'234',zone:'beachfront',maxLen:0,sqft:0,points:'460,130 486,130 486,94 460,94'},
  {id:'235',zone:'beachfront',maxLen:0,sqft:0,points:'486,130 511,130 511,94 486,94'},
  {id:'236',zone:'beachfront',maxLen:0,sqft:0,points:'512,130 537,130 537,94 512,94'},
  {id:'237',zone:'beachfront',maxLen:0,sqft:0,points:'538,129 563,129 563,94 538,94'},
  {id:'238',zone:'beachfront',maxLen:0,sqft:0,points:'564,129 589,129 589,94 564,94'},
  {id:'100',zone:'midpark',maxLen:55,sqft:0,points:'136,501 138,474 106,451 105,479'},
  {id:'101',zone:'midpark',maxLen:55,sqft:0,points:'140,501 142,474 110,451 109,479'},
  {id:'102',zone:'midpark',maxLen:55,sqft:0,points:'144,501 146,474 114,451 113,479'},
  {id:'103',zone:'midpark',maxLen:55,sqft:0,points:'148,501 150,474 118,451 117,479'},
  {id:'104',zone:'midpark',maxLen:55,sqft:0,points:'152,501 154,474 122,451 121,479'},
  {id:'105',zone:'midpark',maxLen:55,sqft:0,points:'156,501 158,474 126,451 125,479'},
  {id:'106',zone:'midpark',maxLen:55,sqft:0,points:'160,501 162,474 130,451 129,479'},
  {id:'107',zone:'midpark',maxLen:55,sqft:0,points:'164,501 166,474 134,451 133,479'},
  {id:'108',zone:'midpark',maxLen:55,sqft:0,points:'168,501 170,474 138,451 137,479'},
  {id:'109',zone:'midpark',maxLen:55,sqft:0,points:'172,501 174,474 142,451 141,479'},
  {id:'110',zone:'midpark',maxLen:55,sqft:0,points:'176,501 178,474 146,451 145,479'},
  {id:'111',zone:'midpark',maxLen:55,sqft:0,points:'316,509 288,487 286,509 314,536'},
  {id:'112',zone:'midpark',maxLen:55,sqft:0,points:'316,483 288,461 286,483 314,510'},
  {id:'113',zone:'midpark',maxLen:55,sqft:0,points:'316,457 288,435 286,457 314,484'},
  {id:'114',zone:'midpark',maxLen:55,sqft:0,points:'316,431 288,409 286,431 314,458'},
  {id:'115',zone:'midpark',maxLen:55,sqft:0,points:'316,405 288,383 286,405 314,432'},
  {id:'116',zone:'midpark',maxLen:55,sqft:0,points:'316,379 288,357 286,379 314,406'},
  {id:'117',zone:'midpark',maxLen:55,sqft:0,points:'316,353 288,331 286,353 314,380'},
  {id:'118',zone:'midpark',maxLen:55,sqft:0,points:'316,327 288,305 286,327 314,354'},
  {id:'119',zone:'midpark',maxLen:55,sqft:0,points:'316,301 288,279 286,301 314,328'},
  {id:'120',zone:'midpark',maxLen:55,sqft:0,points:'316,275 288,253 286,275 314,302'},
  {id:'121',zone:'midpark',maxLen:55,sqft:0,points:'316,249 288,227 286,249 314,276'},
  {id:'122',zone:'midpark',maxLen:55,sqft:0,points:'316,223 288,201 286,223 314,250'},
  {id:'123',zone:'midpark',maxLen:55,sqft:0,points:'316,197 288,175 286,197 314,224'},
  {id:'124',zone:'midpark',maxLen:55,sqft:0,points:'251,436 251,457 219,477 228,453'},
  {id:'125',zone:'midpark',maxLen:55,sqft:0,points:'256,435 256,452 224,468 232,450'},
  {id:'126',zone:'midpark',maxLen:55,sqft:0,points:'261,434 261,447 229,459 236,447'},
  {id:'127',zone:'midpark',maxLen:55,sqft:0,points:'266,433 266,442 234,450 240,444'},
  {id:'128',zone:'midpark',maxLen:55,sqft:0,points:'271,432 271,437 239,441 244,441'},
  {id:'129',zone:'midpark',maxLen:55,sqft:0,points:'276,431 276,432 244,432 248,438'},
  {id:'130',zone:'midpark',maxLen:55,sqft:0,points:'281,430 281,427 249,423 252,435'},
  {id:'131',zone:'midpark',maxLen:55,sqft:0,points:'286,429 286,422 254,414 256,432'},
  {id:'132',zone:'midpark',maxLen:55,sqft:0,points:'291,428 291,417 259,405 260,429'},
  {id:'133',zone:'midpark',maxLen:55,sqft:0,points:'296,427 296,412 264,396 264,426'},
  {id:'134',zone:'midpark',maxLen:55,sqft:0,points:'301,426 301,407 269,387 268,423'},
  {id:'135',zone:'midpark',maxLen:55,sqft:0,points:'306,425 306,402 274,378 272,420'},
  {id:'136',zone:'midpark',maxLen:55,sqft:0,points:'306,425 306,402 274,378 272,420'},
  {id:'140',zone:'midpark',maxLen:55,sqft:0,points:'258,621 321,541 366,575 290,653'},
  {id:'141',zone:'midpark',maxLen:55,sqft:0,points:'265,587 323,515 362,548 292,618'},
  {id:'142',zone:'midpark',maxLen:55,sqft:0,points:'272,553 325,489 358,521 294,583'},
  {id:'143',zone:'midpark',maxLen:55,sqft:0,points:'279,519 327,463 354,494 296,548'},
  {id:'144',zone:'midpark',maxLen:55,sqft:0,points:'286,485 329,437 350,467 298,513'},
  {id:'145',zone:'midpark',maxLen:55,sqft:0,points:'293,451 331,411 346,440 300,478'},
  {id:'146',zone:'midpark',maxLen:55,sqft:0,points:'300,417 333,385 342,413 302,443'},
  {id:'147',zone:'midpark',maxLen:55,sqft:0,points:'307,383 335,359 338,386 304,408'},
  {id:'148',zone:'midpark',maxLen:55,sqft:0,points:'314,349 337,333 334,359 306,373'},
  {id:'149',zone:'midpark',maxLen:55,sqft:0,points:'321,315 339,307 330,332 308,338'},
  {id:'150',zone:'midpark',maxLen:55,sqft:0,points:'328,281 341,281 326,305 310,303'},
  {id:'151',zone:'midpark',maxLen:55,sqft:0,points:'335,247 343,255 322,278 312,268'},
  {id:'152',zone:'midpark',maxLen:55,sqft:0,points:'342,213 345,229 318,251 314,233'},
  {id:'153',zone:'midpark',maxLen:55,sqft:0,points:'349,179 347,203 314,224 316,198'},
  {id:'154',zone:'midpark',maxLen:55,sqft:0,points:'356,145 349,177 310,197 318,163'},
  {id:'155',zone:'midpark',maxLen:55,sqft:0,points:'397,501 397,482 367,463 365,478'},
  {id:'156',zone:'midpark',maxLen:55,sqft:0,points:'397,476 397,457 367,438 365,453'},
  {id:'157',zone:'midpark',maxLen:55,sqft:0,points:'397,451 397,432 367,413 365,428'},
  {id:'158',zone:'midpark',maxLen:55,sqft:0,points:'397,426 397,407 367,388 365,403'},
  {id:'159',zone:'midpark',maxLen:55,sqft:0,points:'397,401 397,382 367,363 365,378'},
  {id:'160',zone:'midpark',maxLen:55,sqft:0,points:'397,376 397,357 367,338 365,353'},
  {id:'161',zone:'midpark',maxLen:55,sqft:0,points:'397,351 397,332 367,313 365,328'},
  {id:'162',zone:'midpark',maxLen:55,sqft:0,points:'397,326 397,307 367,288 365,303'},
  {id:'163',zone:'midpark',maxLen:55,sqft:0,points:'397,301 397,282 367,263 365,278'},
  {id:'164',zone:'midpark',maxLen:55,sqft:0,points:'397,276 397,257 367,238 365,253'},
  {id:'165',zone:'midpark',maxLen:55,sqft:0,points:'397,251 397,232 367,213 365,228'},
  {id:'166',zone:'midpark',maxLen:55,sqft:0,points:'397,226 397,207 367,188 365,203'},
  {id:'167',zone:'midpark',maxLen:55,sqft:0,points:'397,201 397,182 367,163 365,178'},
  {id:'168',zone:'midpark',maxLen:55,sqft:0,points:'397,176 397,157 367,138 365,153'},
  {id:'169',zone:'midpark',maxLen:55,sqft:0,points:'433,454 432,481 396,504 397,476'},
  {id:'170',zone:'midpark',maxLen:55,sqft:0,points:'433,429 432,456 396,479 397,451'},
  {id:'171',zone:'midpark',maxLen:55,sqft:0,points:'433,404 432,431 396,454 397,426'},
  {id:'172',zone:'midpark',maxLen:55,sqft:0,points:'433,379 432,406 396,429 397,401'},
  {id:'173',zone:'midpark',maxLen:55,sqft:0,points:'433,354 432,381 396,404 397,376'},
  {id:'174',zone:'midpark',maxLen:55,sqft:0,points:'433,329 432,356 396,379 397,351'},
  {id:'175',zone:'midpark',maxLen:55,sqft:0,points:'433,304 432,331 396,354 397,326'},
  {id:'176',zone:'midpark',maxLen:55,sqft:0,points:'433,279 432,306 396,329 397,301'},
  {id:'177',zone:'midpark',maxLen:55,sqft:0,points:'433,254 432,281 396,304 397,276'},
  {id:'178',zone:'midpark',maxLen:55,sqft:0,points:'433,229 432,256 396,279 397,251'},
  {id:'179',zone:'midpark',maxLen:55,sqft:0,points:'433,204 432,231 396,254 397,226'},
  {id:'180',zone:'midpark',maxLen:55,sqft:0,points:'433,179 432,206 396,229 397,201'},
  {id:'181',zone:'midpark',maxLen:55,sqft:0,points:'433,154 432,181 396,204 397,176'},
  {id:'182',zone:'midpark',maxLen:55,sqft:0,points:'484,484 484,508 448,478 448,454'},
  {id:'183',zone:'midpark',maxLen:55,sqft:0,points:'484,460 484,484 448,454 448,430'},
  {id:'184',zone:'midpark',maxLen:55,sqft:0,points:'484,436 484,460 448,430 448,406'},
  {id:'185',zone:'midpark',maxLen:55,sqft:0,points:'484,412 484,436 448,406 448,382'},
  {id:'186',zone:'midpark',maxLen:55,sqft:0,points:'484,388 484,412 448,382 448,358'},
  {id:'187',zone:'midpark',maxLen:55,sqft:0,points:'484,364 484,388 448,358 448,334'},
  {id:'188',zone:'midpark',maxLen:55,sqft:0,points:'484,340 484,364 448,334 448,310'},
  {id:'189',zone:'midpark',maxLen:55,sqft:0,points:'484,316 484,340 448,310 448,286'},
  {id:'190',zone:'midpark',maxLen:55,sqft:0,points:'484,292 484,316 448,286 448,262'},
  {id:'191',zone:'midpark',maxLen:55,sqft:0,points:'484,268 484,292 448,262 448,238'},
  {id:'192',zone:'midpark',maxLen:55,sqft:0,points:'484,244 484,268 448,238 448,214'},
  {id:'193',zone:'midpark',maxLen:55,sqft:0,points:'484,220 484,244 448,214 448,190'},
  {id:'194',zone:'midpark',maxLen:55,sqft:0,points:'484,196 484,220 448,190 448,166'},
  {id:'195',zone:'midpark',maxLen:55,sqft:0,points:'484,172 484,196 448,166 448,142'},
  {id:'196',zone:'midpark',maxLen:55,sqft:0,points:'536,473 536,495 500,468 500,445'},
  {id:'197',zone:'midpark',maxLen:55,sqft:0,points:'536,450 536,472 500,445 500,422'},
  {id:'198',zone:'midpark',maxLen:55,sqft:0,points:'536,427 536,449 500,422 500,399'},
  {id:'199',zone:'midpark',maxLen:55,sqft:0,points:'536,404 536,426 500,399 500,376'},
  {id:'200',zone:'midpark',maxLen:55,sqft:0,points:'536,381 536,403 500,376 500,353'},
  {id:'201',zone:'midpark',maxLen:55,sqft:0,points:'536,358 536,380 500,353 500,330'},
  {id:'202',zone:'midpark',maxLen:55,sqft:0,points:'536,335 536,357 500,330 500,307'},
  {id:'203',zone:'midpark',maxLen:55,sqft:0,points:'536,312 536,334 500,307 500,284'},
  {id:'204',zone:'midpark',maxLen:55,sqft:0,points:'536,289 536,311 500,284 500,261'},
  {id:'205',zone:'midpark',maxLen:55,sqft:0,points:'536,266 536,288 500,261 500,238'},
  {id:'206',zone:'midpark',maxLen:55,sqft:0,points:'536,243 536,265 500,238 500,215'},
  {id:'207',zone:'midpark',maxLen:55,sqft:0,points:'536,220 536,242 500,215 500,192'},
  {id:'208',zone:'midpark',maxLen:55,sqft:0,points:'536,197 536,219 500,192 500,169'},
  {id:'209',zone:'midpark',maxLen:55,sqft:0,points:'536,174 536,196 500,169 500,146'},
  {id:'210',zone:'midpark',maxLen:55,sqft:0,points:'559,420 561,453 606,480 601,421'},
  {id:'211',zone:'midpark',maxLen:55,sqft:0,points:'559,394 561,427 606,454 601,395'},
  {id:'212',zone:'midpark',maxLen:55,sqft:0,points:'177,673 162,688 133,660 159,655'},
  {id:'213',zone:'midpark',maxLen:55,sqft:0,points:'550,268 550,295 592,329 592,302'},
  {id:'214',zone:'midpark',maxLen:55,sqft:0,points:'550,242 550,269 592,303 592,276'},
  {id:'215',zone:'midpark',maxLen:55,sqft:0,points:'550,216 550,243 592,277 592,250'},
  {id:'216',zone:'midpark',maxLen:55,sqft:0,points:'550,190 550,217 592,251 592,224'},
  {id:'217',zone:'midpark',maxLen:55,sqft:0,points:'550,164 550,191 592,225 592,198'},
  {id:'218',zone:'midpark',maxLen:55,sqft:0,points:'550,138 550,165 592,199 592,172'},
  {id:'239',zone:'midpark',maxLen:55,sqft:0,points:'31,839 31,819 63,805 70,820'},
  {id:'240',zone:'midpark',maxLen:55,sqft:0,points:'61,835 61,815 93,801 100,816'},
  {id:'241',zone:'midpark',maxLen:55,sqft:0,points:'95,739 59,742 41,723 69,714'},
  {id:'242',zone:'midpark',maxLen:55,sqft:0,points:'127,737 91,740 73,721 101,712'},
  {id:'243',zone:'midpark',maxLen:55,sqft:0,points:'187,735 157,736 116,776 149,778'},
  {id:'244',zone:'midpark',maxLen:55,sqft:0,points:'155,733 125,734 84,774 117,776'},
  {id:'245',zone:'midpark',maxLen:55,sqft:0,points:'123,731 93,732 52,772 85,774'},
  {id:'246',zone:'midpark',maxLen:55,sqft:0,points:'91,740 121,738 91,770 66,764'},
  {id:'247',zone:'midpark',maxLen:55,sqft:0,points:'59,742 89,740 59,772 34,766'},
  {id:'248',zone:'midpark',maxLen:55,sqft:0,points:'127,737 91,740 73,721 101,712'},
  {id:'249',zone:'midpark',maxLen:55,sqft:0,points:'370,77 353,125 302,143 322,93'},
  {id:'250',zone:'midpark',maxLen:55,sqft:0,points:'363,111 351,151 306,170 320,128'},
  {id:'97',zone:'midpark',maxLen:55,sqft:0,points:'124,501 126,474 94,451 93,479'},
  {id:'98',zone:'midpark',maxLen:55,sqft:0,points:'128,501 130,474 98,451 97,479'},
  {id:'99',zone:'midpark',maxLen:55,sqft:0,points:'132,501 134,474 102,451 101,479'},
  {id:'1',zone:'oceanside',maxLen:40,sqft:0,points:'323,581 300,580 312,554 339,548'},
  {id:'10',zone:'oceanside',maxLen:40,sqft:0,points:'170,770 624,1066 771,1229 267,998'},
  {id:'11',zone:'oceanside',maxLen:40,sqft:0,points:'323,531 300,530 312,504 339,498'},
  {id:'12',zone:'oceanside',maxLen:40,sqft:0,points:'306,552 336,584 363,579 331,548'},
  {id:'13',zone:'oceanside',maxLen:40,sqft:0,points:'289,573 372,638 414,654 323,598'},
  {id:'14',zone:'oceanside',maxLen:40,sqft:0,points:'272,594 408,692 465,729 315,648'},
  {id:'15',zone:'oceanside',maxLen:40,sqft:0,points:'255,615 444,746 516,804 307,698'},
  {id:'16',zone:'oceanside',maxLen:40,sqft:0,points:'238,636 480,800 567,879 299,748'},
  {id:'17',zone:'oceanside',maxLen:40,sqft:0,points:'221,657 516,854 618,954 291,798'},
  {id:'18',zone:'oceanside',maxLen:40,sqft:0,points:'204,678 552,908 669,1029 283,848'},
  {id:'19',zone:'oceanside',maxLen:40,sqft:0,points:'187,699 588,962 720,1104 275,898'},
  {id:'2',zone:'oceanside',maxLen:40,sqft:0,points:'306,602 336,634 363,629 331,598'},
  {id:'20',zone:'oceanside',maxLen:40,sqft:0,points:'170,690 624,986 771,1149 267,918'},
  {id:'21',zone:'oceanside',maxLen:40,sqft:0,points:'187,669 588,932 720,1074 275,868'},
  {id:'22',zone:'oceanside',maxLen:40,sqft:0,points:'204,648 552,878 669,999 283,818'},
  {id:'23',zone:'oceanside',maxLen:40,sqft:0,points:'221,627 516,824 618,924 291,768'},
  {id:'24',zone:'oceanside',maxLen:40,sqft:0,points:'238,606 480,770 567,849 299,718'},
  {id:'25',zone:'oceanside',maxLen:40,sqft:0,points:'255,585 444,716 516,774 307,668'},
  {id:'26',zone:'oceanside',maxLen:40,sqft:0,points:'272,564 408,662 465,699 315,618'},
  {id:'27',zone:'oceanside',maxLen:40,sqft:0,points:'289,543 372,608 414,624 323,568'},
  {id:'28',zone:'oceanside',maxLen:40,sqft:0,points:'306,522 336,554 363,549 331,518'},
  {id:'29',zone:'oceanside',maxLen:40,sqft:0,points:'323,501 300,500 312,474 339,468'},
  {id:'3',zone:'oceanside',maxLen:40,sqft:0,points:'289,623 372,688 414,704 323,648'},
  {id:'30',zone:'oceanside',maxLen:40,sqft:0,points:'255,670 444,801 516,859 307,753'},
  {id:'31',zone:'oceanside',maxLen:40,sqft:0,points:'323,586 300,585 312,559 339,553'},
  {id:'32',zone:'oceanside',maxLen:40,sqft:0,points:'306,607 336,639 363,634 331,603'},
  {id:'33',zone:'oceanside',maxLen:40,sqft:0,points:'289,628 372,693 414,709 323,653'},
  {id:'34',zone:'oceanside',maxLen:40,sqft:0,points:'272,649 408,747 465,784 315,703'},
  {id:'35',zone:'oceanside',maxLen:40,sqft:0,points:'559,602 561,635 606,662 601,603'},
  {id:'36',zone:'oceanside',maxLen:40,sqft:0,points:'559,576 561,609 606,636 601,577'},
  {id:'37',zone:'oceanside',maxLen:40,sqft:0,points:'559,550 561,583 606,610 601,551'},
  {id:'38',zone:'oceanside',maxLen:40,sqft:0,points:'559,524 561,557 606,584 601,525'},
  {id:'39',zone:'oceanside',maxLen:40,sqft:0,points:'559,498 561,531 606,558 601,499'},
  {id:'4',zone:'oceanside',maxLen:40,sqft:0,points:'272,644 408,742 465,779 315,698'},
  {id:'40',zone:'oceanside',maxLen:40,sqft:0,points:'559,472 561,505 606,532 601,473'},
  {id:'41',zone:'oceanside',maxLen:40,sqft:0,points:'559,446 561,479 606,506 601,447'},
  {id:'42',zone:'oceanside',maxLen:40,sqft:0,points:'323,556 300,555 312,529 339,523'},
  {id:'43',zone:'oceanside',maxLen:40,sqft:0,points:'189,634 217,629 185,598 159,604'},
  {id:'44',zone:'oceanside',maxLen:40,sqft:0,points:'129,612 157,607 125,576 99,582'},
  {id:'45',zone:'oceanside',maxLen:40,sqft:0,points:'159,608 187,603 155,572 129,578'},
  {id:'46',zone:'oceanside',maxLen:40,sqft:0,points:'189,604 217,599 185,568 159,574'},
  {id:'47',zone:'oceanside',maxLen:40,sqft:0,points:'238,661 480,825 567,904 299,773'},
  {id:'48',zone:'oceanside',maxLen:40,sqft:0,points:'231,573 200,542 171,548 201,579'},
  {id:'49',zone:'oceanside',maxLen:40,sqft:0,points:'86,585 57,554 29,559 58,591'},
  {id:'5',zone:'oceanside',maxLen:40,sqft:0,points:'255,665 444,796 516,854 307,748'},
  {id:'50',zone:'oceanside',maxLen:40,sqft:0,points:'116,585 87,554 59,559 88,591'},
  {id:'51',zone:'oceanside',maxLen:40,sqft:0,points:'146,589 117,558 89,563 118,595'},
  {id:'52',zone:'oceanside',maxLen:40,sqft:0,points:'263,569 232,538 203,544 233,575'},
  {id:'53',zone:'oceanside',maxLen:40,sqft:0,points:'46,626 76,657 105,652 75,620'},
  {id:'54',zone:'oceanside',maxLen:40,sqft:0,points:'205,669 190,684 161,656 187,651'},
  {id:'55',zone:'oceanside',maxLen:40,sqft:0,points:'175,675 160,690 131,662 157,657'},
  {id:'56',zone:'oceanside',maxLen:40,sqft:0,points:'95,701 59,704 41,685 69,676'},
  {id:'57',zone:'oceanside',maxLen:40,sqft:0,points:'127,699 91,702 73,683 101,674'},
  {id:'58',zone:'oceanside',maxLen:40,sqft:0,points:'187,697 157,698 116,738 149,740'},
  {id:'59',zone:'oceanside',maxLen:40,sqft:0,points:'155,695 125,696 84,736 117,738'},
  {id:'6',zone:'oceanside',maxLen:40,sqft:0,points:'238,686 480,850 567,929 299,798'},
  {id:'60',zone:'oceanside',maxLen:40,sqft:0,points:'123,693 93,694 52,734 85,736'},
  {id:'61',zone:'oceanside',maxLen:40,sqft:0,points:'59,704 89,702 59,734 34,728'},
  {id:'62',zone:'oceanside',maxLen:40,sqft:0,points:'91,702 121,700 91,732 66,726'},
  {id:'63',zone:'oceanside',maxLen:40,sqft:0,points:'107,752 115,767 94,777 80,749'},
  {id:'64',zone:'oceanside',maxLen:40,sqft:0,points:'133,748 141,763 120,773 106,745'},
  {id:'65',zone:'oceanside',maxLen:40,sqft:0,points:'159,744 167,759 146,769 132,741'},
  {id:'66',zone:'oceanside',maxLen:40,sqft:0,points:'31,801 31,781 63,767 70,782'},
  {id:'67',zone:'oceanside',maxLen:40,sqft:0,points:'71,817 71,797 103,783 110,798'},
  {id:'68',zone:'oceanside',maxLen:40,sqft:0,points:'101,811 101,791 133,777 140,792'},
  {id:'69',zone:'oceanside',maxLen:40,sqft:0,points:'131,805 131,785 163,771 170,786'},
  {id:'7',zone:'oceanside',maxLen:40,sqft:0,points:'221,707 516,904 618,1004 291,848'},
  {id:'70',zone:'oceanside',maxLen:40,sqft:0,points:'77,541 79,512 46,487 43,514'},
  {id:'71',zone:'oceanside',maxLen:40,sqft:0,points:'77,515 79,486 46,461 43,488'},
  {id:'72',zone:'oceanside',maxLen:40,sqft:0,points:'77,489 79,460 46,435 43,462'},
  {id:'73',zone:'oceanside',maxLen:40,sqft:0,points:'77,463 79,434 46,409 43,436'},
  {id:'74',zone:'oceanside',maxLen:40,sqft:0,points:'77,437 79,408 46,383 43,410'},
  {id:'75',zone:'oceanside',maxLen:40,sqft:0,points:'77,411 79,382 46,357 43,384'},
  {id:'76',zone:'oceanside',maxLen:40,sqft:0,points:'77,385 79,356 46,331 43,358'},
  {id:'77',zone:'oceanside',maxLen:40,sqft:0,points:'77,359 79,330 46,305 43,332'},
  {id:'78',zone:'oceanside',maxLen:40,sqft:0,points:'77,333 79,304 46,279 43,306'},
  {id:'79',zone:'oceanside',maxLen:40,sqft:0,points:'77,307 79,278 46,253 43,280'},
  {id:'8',zone:'oceanside',maxLen:40,sqft:0,points:'204,728 552,958 669,1079 283,898'},
  {id:'80',zone:'oceanside',maxLen:40,sqft:0,points:'77,281 79,252 46,227 43,254'},
  {id:'81',zone:'oceanside',maxLen:40,sqft:0,points:'77,255 79,226 46,201 43,228'},
  {id:'82',zone:'oceanside',maxLen:40,sqft:0,points:'77,229 79,200 46,175 43,202'},
  {id:'83',zone:'oceanside',maxLen:40,sqft:0,points:'126,536 127,507 97,484 94,511'},
  {id:'84',zone:'oceanside',maxLen:40,sqft:0,points:'126,510 127,481 97,458 94,485'},
  {id:'85',zone:'oceanside',maxLen:40,sqft:0,points:'126,484 127,455 97,432 94,459'},
  {id:'86',zone:'oceanside',maxLen:40,sqft:0,points:'126,458 127,429 97,406 94,433'},
  {id:'87',zone:'oceanside',maxLen:40,sqft:0,points:'126,432 127,403 97,380 94,407'},
  {id:'88',zone:'oceanside',maxLen:40,sqft:0,points:'126,406 127,377 97,354 94,381'},
  {id:'89',zone:'oceanside',maxLen:40,sqft:0,points:'126,380 127,351 97,328 94,355'},
  {id:'9',zone:'oceanside',maxLen:40,sqft:0,points:'187,749 588,1012 720,1154 275,948'},
  {id:'90',zone:'oceanside',maxLen:40,sqft:0,points:'126,354 127,325 97,302 94,329'},
  {id:'91',zone:'oceanside',maxLen:40,sqft:0,points:'126,328 127,299 97,276 94,303'},
  {id:'92',zone:'oceanside',maxLen:40,sqft:0,points:'126,302 127,273 97,250 94,277'},
  {id:'93',zone:'oceanside',maxLen:40,sqft:0,points:'126,276 127,247 97,224 94,251'},
  {id:'94',zone:'oceanside',maxLen:40,sqft:0,points:'126,250 127,221 97,198 94,225'},
  {id:'95',zone:'oceanside',maxLen:40,sqft:0,points:'126,224 127,195 97,172 94,199'},
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
