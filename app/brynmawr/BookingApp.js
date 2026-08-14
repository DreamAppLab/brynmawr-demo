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
  {id:'82',zone:'oceanside',maxLen:40,sqft:0,points:'14,249 47,226 47,252 14,275'},
  {id:'81',zone:'oceanside',maxLen:40,sqft:0,points:'14,275 47,252 47,278 14,301'},
  {id:'80',zone:'oceanside',maxLen:40,sqft:0,points:'14,301 47,278 47,304 14,327'},
  {id:'79',zone:'oceanside',maxLen:40,sqft:0,points:'14,327 47,304 47,330 14,353'},
  {id:'78',zone:'oceanside',maxLen:40,sqft:0,points:'14,353 47,330 47,356 14,379'},
  {id:'77',zone:'oceanside',maxLen:40,sqft:0,points:'14,379 47,356 47,382 14,405'},
  {id:'76',zone:'oceanside',maxLen:40,sqft:0,points:'14,405 47,382 47,408 14,431'},
  {id:'75',zone:'oceanside',maxLen:40,sqft:0,points:'14,431 47,408 47,434 14,457'},
  {id:'74',zone:'oceanside',maxLen:40,sqft:0,points:'14,457 47,434 47,460 14,483'},
  {id:'73',zone:'oceanside',maxLen:40,sqft:0,points:'14,483 47,460 47,486 14,509'},
  {id:'72',zone:'oceanside',maxLen:40,sqft:0,points:'14,509 47,486 47,512 14,535'},
  {id:'71',zone:'oceanside',maxLen:40,sqft:0,points:'14,535 47,512 47,538 14,561'},
  {id:'70',zone:'oceanside',maxLen:40,sqft:0,points:'14,561 47,538 47,564 14,587'},
  {id:'95',zone:'oceanside',maxLen:40,sqft:0,points:'56,229 89,206 89,232 56,255'},
  {id:'94',zone:'oceanside',maxLen:40,sqft:0,points:'56,255 89,232 89,258 56,281'},
  {id:'93',zone:'oceanside',maxLen:40,sqft:0,points:'56,281 89,258 89,284 56,307'},
  {id:'92',zone:'oceanside',maxLen:40,sqft:0,points:'56,307 89,284 89,310 56,333'},
  {id:'91',zone:'oceanside',maxLen:40,sqft:0,points:'56,333 89,310 89,336 56,359'},
  {id:'90',zone:'oceanside',maxLen:40,sqft:0,points:'56,359 89,336 89,362 56,385'},
  {id:'89',zone:'oceanside',maxLen:40,sqft:0,points:'56,385 89,362 89,388 56,411'},
  {id:'88',zone:'oceanside',maxLen:40,sqft:0,points:'56,411 89,388 89,414 56,437'},
  {id:'87',zone:'oceanside',maxLen:40,sqft:0,points:'56,437 89,414 89,440 56,463'},
  {id:'86',zone:'oceanside',maxLen:40,sqft:0,points:'56,463 89,440 89,466 56,489'},
  {id:'85',zone:'oceanside',maxLen:40,sqft:0,points:'56,489 89,466 89,492 56,515'},
  {id:'84',zone:'oceanside',maxLen:40,sqft:0,points:'56,515 89,492 89,518 56,541'},
  {id:'83',zone:'oceanside',maxLen:40,sqft:0,points:'56,541 89,518 89,544 56,567'},
  {id:'110',zone:'midpark',maxLen:55,sqft:0,points:'98,209 131,186 131,212 98,235'},
  {id:'109',zone:'midpark',maxLen:55,sqft:0,points:'98,235 131,212 131,238 98,261'},
  {id:'108',zone:'midpark',maxLen:55,sqft:0,points:'98,261 131,238 131,264 98,287'},
  {id:'107',zone:'midpark',maxLen:55,sqft:0,points:'98,287 131,264 131,290 98,313'},
  {id:'106',zone:'midpark',maxLen:55,sqft:0,points:'98,313 131,290 131,316 98,339'},
  {id:'105',zone:'midpark',maxLen:55,sqft:0,points:'98,339 131,316 131,342 98,365'},
  {id:'104',zone:'midpark',maxLen:55,sqft:0,points:'98,365 131,342 131,368 98,391'},
  {id:'103',zone:'midpark',maxLen:55,sqft:0,points:'98,391 131,368 131,394 98,417'},
  {id:'102',zone:'midpark',maxLen:55,sqft:0,points:'98,417 131,394 131,420 98,443'},
  {id:'101',zone:'midpark',maxLen:55,sqft:0,points:'98,443 131,420 131,446 98,469'},
  {id:'100',zone:'midpark',maxLen:55,sqft:0,points:'98,469 131,446 131,472 98,495'},
  {id:'99',zone:'midpark',maxLen:55,sqft:0,points:'98,495 131,472 131,498 98,521'},
  {id:'98',zone:'midpark',maxLen:55,sqft:0,points:'98,521 131,498 131,524 98,547'},
  {id:'97',zone:'midpark',maxLen:55,sqft:0,points:'98,547 131,524 131,550 98,573'},
  {id:'123',zone:'midpark',maxLen:55,sqft:0,points:'140,189 173,166 173,192 140,215'},
  {id:'122',zone:'midpark',maxLen:55,sqft:0,points:'140,215 173,192 173,218 140,241'},
  {id:'121',zone:'midpark',maxLen:55,sqft:0,points:'140,241 173,218 173,244 140,267'},
  {id:'120',zone:'midpark',maxLen:55,sqft:0,points:'140,267 173,244 173,270 140,293'},
  {id:'119',zone:'midpark',maxLen:55,sqft:0,points:'140,293 173,270 173,296 140,319'},
  {id:'118',zone:'midpark',maxLen:55,sqft:0,points:'140,319 173,296 173,322 140,345'},
  {id:'117',zone:'midpark',maxLen:55,sqft:0,points:'140,345 173,322 173,348 140,371'},
  {id:'116',zone:'midpark',maxLen:55,sqft:0,points:'140,371 173,348 173,374 140,397'},
  {id:'115',zone:'midpark',maxLen:55,sqft:0,points:'140,397 173,374 173,400 140,423'},
  {id:'114',zone:'midpark',maxLen:55,sqft:0,points:'140,423 173,400 173,426 140,449'},
  {id:'113',zone:'midpark',maxLen:55,sqft:0,points:'140,449 173,426 173,452 140,475'},
  {id:'112',zone:'midpark',maxLen:55,sqft:0,points:'140,475 173,452 173,478 140,501'},
  {id:'111',zone:'midpark',maxLen:55,sqft:0,points:'140,501 173,478 173,504 140,527'},
  {id:'135',zone:'midpark',maxLen:55,sqft:0,points:'182,169 215,146 215,172 182,195'},
  {id:'134',zone:'midpark',maxLen:55,sqft:0,points:'182,195 215,172 215,198 182,221'},
  {id:'133',zone:'midpark',maxLen:55,sqft:0,points:'182,221 215,198 215,224 182,247'},
  {id:'132',zone:'midpark',maxLen:55,sqft:0,points:'182,247 215,224 215,250 182,273'},
  {id:'131',zone:'midpark',maxLen:55,sqft:0,points:'182,273 215,250 215,276 182,299'},
  {id:'130',zone:'midpark',maxLen:55,sqft:0,points:'182,299 215,276 215,302 182,325'},
  {id:'129',zone:'midpark',maxLen:55,sqft:0,points:'182,325 215,302 215,328 182,351'},
  {id:'128',zone:'midpark',maxLen:55,sqft:0,points:'182,351 215,328 215,354 182,377'},
  {id:'127',zone:'midpark',maxLen:55,sqft:0,points:'182,377 215,354 215,380 182,403'},
  {id:'126',zone:'midpark',maxLen:55,sqft:0,points:'182,403 215,380 215,406 182,429'},
  {id:'125',zone:'midpark',maxLen:55,sqft:0,points:'182,429 215,406 215,432 182,455'},
  {id:'124',zone:'midpark',maxLen:55,sqft:0,points:'182,455 215,432 215,458 182,481'},
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
  {id:'168',zone:'midpark',maxLen:55,sqft:0,points:'349,129 382,106 382,132 349,155'},
  {id:'167',zone:'midpark',maxLen:55,sqft:0,points:'349,155 382,132 382,158 349,181'},
  {id:'166',zone:'midpark',maxLen:55,sqft:0,points:'349,181 382,158 382,184 349,207'},
  {id:'165',zone:'midpark',maxLen:55,sqft:0,points:'349,207 382,184 382,210 349,233'},
  {id:'164',zone:'midpark',maxLen:55,sqft:0,points:'349,233 382,210 382,236 349,259'},
  {id:'163',zone:'midpark',maxLen:55,sqft:0,points:'349,259 382,236 382,262 349,285'},
  {id:'162',zone:'midpark',maxLen:55,sqft:0,points:'349,285 382,262 382,288 349,311'},
  {id:'161',zone:'midpark',maxLen:55,sqft:0,points:'349,311 382,288 382,314 349,337'},
  {id:'160',zone:'midpark',maxLen:55,sqft:0,points:'349,337 382,314 382,340 349,363'},
  {id:'159',zone:'midpark',maxLen:55,sqft:0,points:'349,363 382,340 382,366 349,389'},
  {id:'158',zone:'midpark',maxLen:55,sqft:0,points:'349,389 382,366 382,392 349,415'},
  {id:'157',zone:'midpark',maxLen:55,sqft:0,points:'349,415 382,392 382,418 349,441'},
  {id:'156',zone:'midpark',maxLen:55,sqft:0,points:'349,441 382,418 382,444 349,467'},
  {id:'155',zone:'midpark',maxLen:55,sqft:0,points:'349,467 382,444 382,470 349,493'},
  {id:'181',zone:'midpark',maxLen:55,sqft:0,points:'391,109 424,86 424,112 391,135'},
  {id:'180',zone:'midpark',maxLen:55,sqft:0,points:'391,135 424,112 424,138 391,161'},
  {id:'179',zone:'midpark',maxLen:55,sqft:0,points:'391,161 424,138 424,164 391,187'},
  {id:'178',zone:'midpark',maxLen:55,sqft:0,points:'391,187 424,164 424,190 391,213'},
  {id:'177',zone:'midpark',maxLen:55,sqft:0,points:'391,213 424,190 424,216 391,239'},
  {id:'176',zone:'midpark',maxLen:55,sqft:0,points:'391,239 424,216 424,242 391,265'},
  {id:'175',zone:'midpark',maxLen:55,sqft:0,points:'391,265 424,242 424,268 391,291'},
  {id:'174',zone:'midpark',maxLen:55,sqft:0,points:'391,291 424,268 424,294 391,317'},
  {id:'173',zone:'midpark',maxLen:55,sqft:0,points:'391,317 424,294 424,320 391,343'},
  {id:'172',zone:'midpark',maxLen:55,sqft:0,points:'391,343 424,320 424,346 391,369'},
  {id:'171',zone:'midpark',maxLen:55,sqft:0,points:'391,369 424,346 424,372 391,395'},
  {id:'170',zone:'midpark',maxLen:55,sqft:0,points:'391,395 424,372 424,398 391,421'},
  {id:'169',zone:'midpark',maxLen:55,sqft:0,points:'391,421 424,398 424,424 391,447'},
  {id:'195',zone:'midpark',maxLen:55,sqft:0,points:'433,109 466,86 466,112 433,135'},
  {id:'194',zone:'midpark',maxLen:55,sqft:0,points:'433,135 466,112 466,138 433,161'},
  {id:'193',zone:'midpark',maxLen:55,sqft:0,points:'433,161 466,138 466,164 433,187'},
  {id:'192',zone:'midpark',maxLen:55,sqft:0,points:'433,187 466,164 466,190 433,213'},
  {id:'191',zone:'midpark',maxLen:55,sqft:0,points:'433,213 466,190 466,216 433,239'},
  {id:'190',zone:'midpark',maxLen:55,sqft:0,points:'433,239 466,216 466,242 433,265'},
  {id:'189',zone:'midpark',maxLen:55,sqft:0,points:'433,265 466,242 466,268 433,291'},
  {id:'188',zone:'midpark',maxLen:55,sqft:0,points:'433,291 466,268 466,294 433,317'},
  {id:'187',zone:'midpark',maxLen:55,sqft:0,points:'433,317 466,294 466,320 433,343'},
  {id:'186',zone:'midpark',maxLen:55,sqft:0,points:'433,343 466,320 466,346 433,369'},
  {id:'185',zone:'midpark',maxLen:55,sqft:0,points:'433,369 466,346 466,372 433,395'},
  {id:'184',zone:'midpark',maxLen:55,sqft:0,points:'433,395 466,372 466,398 433,421'},
  {id:'183',zone:'midpark',maxLen:55,sqft:0,points:'433,421 466,398 466,424 433,447'},
  {id:'182',zone:'midpark',maxLen:55,sqft:0,points:'433,447 466,424 466,450 433,473'},
  {id:'209',zone:'midpark',maxLen:50,sqft:0,points:'475,109 508,86 508,112 475,135'},
  {id:'208',zone:'midpark',maxLen:50,sqft:0,points:'475,135 508,112 508,138 475,161'},
  {id:'207',zone:'midpark',maxLen:50,sqft:0,points:'475,161 508,138 508,164 475,187'},
  {id:'206',zone:'midpark',maxLen:50,sqft:0,points:'475,187 508,164 508,190 475,213'},
  {id:'205',zone:'midpark',maxLen:50,sqft:0,points:'475,213 508,190 508,216 475,239'},
  {id:'204',zone:'midpark',maxLen:50,sqft:0,points:'475,239 508,216 508,242 475,265'},
  {id:'203',zone:'midpark',maxLen:50,sqft:0,points:'475,265 508,242 508,268 475,291'},
  {id:'202',zone:'midpark',maxLen:50,sqft:0,points:'475,291 508,268 508,294 475,317'},
  {id:'201',zone:'midpark',maxLen:50,sqft:0,points:'475,317 508,294 508,320 475,343'},
  {id:'200',zone:'midpark',maxLen:50,sqft:0,points:'475,343 508,320 508,346 475,369'},
  {id:'199',zone:'midpark',maxLen:50,sqft:0,points:'475,369 508,346 508,372 475,395'},
  {id:'198',zone:'midpark',maxLen:50,sqft:0,points:'475,395 508,372 508,398 475,421'},
  {id:'197',zone:'midpark',maxLen:50,sqft:0,points:'475,421 508,398 508,424 475,447'},
  {id:'196',zone:'midpark',maxLen:50,sqft:0,points:'475,447 508,424 508,450 475,473'},
  {id:'218',zone:'oceanside',maxLen:40,sqft:0,points:'517,109 550,86 550,112 517,135'},
  {id:'217',zone:'oceanside',maxLen:40,sqft:0,points:'517,135 550,112 550,138 517,161'},
  {id:'216',zone:'oceanside',maxLen:40,sqft:0,points:'517,161 550,138 550,164 517,187'},
  {id:'215',zone:'oceanside',maxLen:40,sqft:0,points:'517,187 550,164 550,190 517,213'},
  {id:'214',zone:'oceanside',maxLen:40,sqft:0,points:'517,213 550,190 550,216 517,239'},
  {id:'213',zone:'oceanside',maxLen:40,sqft:0,points:'517,239 550,216 550,242 517,265'},
  {id:'211',zone:'oceanside',maxLen:40,sqft:0,points:'517,275 550,252 550,278 517,301'},
  {id:'210',zone:'oceanside',maxLen:40,sqft:0,points:'517,301 550,278 550,304 517,327'},
  {id:'41',zone:'oceanside',maxLen:40,sqft:0,points:'517,327 550,304 550,330 517,353'},
  {id:'40',zone:'oceanside',maxLen:40,sqft:0,points:'517,353 550,330 550,356 517,379'},
  {id:'39',zone:'oceanside',maxLen:40,sqft:0,points:'517,379 550,356 550,382 517,405'},
  {id:'38',zone:'oceanside',maxLen:40,sqft:0,points:'517,405 550,382 550,408 517,431'},
  {id:'37',zone:'oceanside',maxLen:40,sqft:0,points:'517,431 550,408 550,434 517,457'},
  {id:'36',zone:'oceanside',maxLen:40,sqft:0,points:'517,457 550,434 550,460 517,483'},
  {id:'35',zone:'oceanside',maxLen:40,sqft:0,points:'517,483 550,460 550,486 517,509'},
  {id:'34',zone:'oceanside',maxLen:40,sqft:0,points:'517,509 550,486 550,512 517,535'},
  {id:'219',zone:'beachfront',maxLen:0,sqft:0,points:'22,96 46,96 49,28 25,28'},
  {id:'220',zone:'beachfront',maxLen:0,sqft:0,points:'48,96 72,96 75,28 51,28'},
  {id:'221',zone:'beachfront',maxLen:0,sqft:0,points:'74,96 98,96 101,28 77,28'},
  {id:'222',zone:'beachfront',maxLen:0,sqft:0,points:'100,96 124,96 127,28 103,28'},
  {id:'223',zone:'beachfront',maxLen:0,sqft:0,points:'126,96 150,96 153,28 129,28'},
  {id:'224',zone:'beachfront',maxLen:0,sqft:0,points:'152,96 176,96 179,28 155,28'},
  {id:'225',zone:'beachfront',maxLen:0,sqft:0,points:'178,96 202,96 205,28 181,28'},
  {id:'226',zone:'beachfront',maxLen:0,sqft:0,points:'204,96 228,96 231,28 207,28'},
  {id:'227',zone:'beachfront',maxLen:0,sqft:0,points:'230,96 254,96 257,28 233,28'},
  {id:'228',zone:'beachfront',maxLen:0,sqft:0,points:'256,96 280,96 283,28 259,28'},
  {id:'229',zone:'beachfront',maxLen:0,sqft:0,points:'282,96 306,96 309,28 285,28'},
  {id:'230',zone:'beachfront',maxLen:0,sqft:0,points:'308,96 332,96 335,28 311,28'},
  {id:'231',zone:'beachfront',maxLen:0,sqft:0,points:'334,96 358,96 361,28 337,28'},
  {id:'232',zone:'beachfront',maxLen:0,sqft:0,points:'360,96 384,96 387,28 363,28'},
  {id:'233',zone:'beachfront',maxLen:0,sqft:0,points:'386,96 410,96 413,28 389,28'},
  {id:'234',zone:'beachfront',maxLen:0,sqft:0,points:'412,96 436,96 439,28 415,28'},
  {id:'235',zone:'beachfront',maxLen:0,sqft:0,points:'438,96 462,96 465,28 441,28'},
  {id:'236',zone:'beachfront',maxLen:0,sqft:0,points:'464,96 488,96 491,28 467,28'},
  {id:'237',zone:'beachfront',maxLen:0,sqft:0,points:'490,96 514,96 517,28 493,28'},
  {id:'238',zone:'beachfront',maxLen:0,sqft:0,points:'516,96 540,96 543,28 519,28'},
  {id:'29',zone:'oceanside',maxLen:40,sqft:0,points:'264,490 296,490 296,507 264,507'},
  {id:'28',zone:'oceanside',maxLen:40,sqft:0,points:'298,490 330,490 330,507 298,507'},
  {id:'27',zone:'oceanside',maxLen:40,sqft:0,points:'332,490 364,490 364,507 332,507'},
  {id:'26',zone:'oceanside',maxLen:40,sqft:0,points:'366,490 398,490 398,507 366,507'},
  {id:'25',zone:'oceanside',maxLen:40,sqft:0,points:'400,490 432,490 432,507 400,507'},
  {id:'24',zone:'oceanside',maxLen:40,sqft:0,points:'434,490 466,490 466,507 434,507'},
  {id:'23',zone:'oceanside',maxLen:40,sqft:0,points:'468,490 500,490 500,507 468,507'},
  {id:'22',zone:'oceanside',maxLen:40,sqft:0,points:'502,490 534,490 534,507 502,507'},
  {id:'21',zone:'oceanside',maxLen:40,sqft:0,points:'536,490 568,490 568,507 536,507'},
  {id:'20',zone:'oceanside',maxLen:40,sqft:0,points:'570,490 602,490 602,507 570,507'},
  {id:'11',zone:'oceanside',maxLen:38,sqft:0,points:'264,509 296,509 296,526 264,526'},
  {id:'12',zone:'oceanside',maxLen:38,sqft:0,points:'298,509 330,509 330,526 298,526'},
  {id:'13',zone:'oceanside',maxLen:38,sqft:0,points:'332,509 364,509 364,526 332,526'},
  {id:'14',zone:'oceanside',maxLen:38,sqft:0,points:'366,509 398,509 398,526 366,526'},
  {id:'15',zone:'oceanside',maxLen:38,sqft:0,points:'400,509 432,509 432,526 400,526'},
  {id:'16',zone:'oceanside',maxLen:38,sqft:0,points:'434,509 466,509 466,526 434,526'},
  {id:'17',zone:'oceanside',maxLen:38,sqft:0,points:'468,509 500,509 500,526 468,526'},
  {id:'18',zone:'oceanside',maxLen:38,sqft:0,points:'502,509 534,509 534,526 502,526'},
  {id:'19',zone:'oceanside',maxLen:38,sqft:0,points:'536,509 568,509 568,526 536,526'},
  {id:'42',zone:'oceanside',maxLen:38,sqft:0,points:'264,530 296,530 296,547 264,547'},
  {id:'43',zone:'oceanside',maxLen:38,sqft:0,points:'298,530 330,530 330,547 298,547'},
  {id:'44',zone:'oceanside',maxLen:38,sqft:0,points:'332,530 364,530 364,547 332,547'},
  {id:'45',zone:'oceanside',maxLen:38,sqft:0,points:'366,530 398,530 398,547 366,547'},
  {id:'46',zone:'oceanside',maxLen:38,sqft:0,points:'400,530 432,530 432,547 400,547'},
  {id:'47',zone:'oceanside',maxLen:38,sqft:0,points:'434,530 466,530 466,547 434,547'},
  {id:'48',zone:'oceanside',maxLen:38,sqft:0,points:'468,530 500,530 500,547 468,547'},
  {id:'49',zone:'oceanside',maxLen:38,sqft:0,points:'502,530 534,530 534,547 502,547'},
  {id:'50',zone:'oceanside',maxLen:38,sqft:0,points:'536,530 568,530 568,547 536,547'},
  {id:'51',zone:'oceanside',maxLen:38,sqft:0,points:'570,530 602,530 602,547 570,547'},
  {id:'1',zone:'oceanside',maxLen:35,sqft:0,points:'264,549 296,549 296,566 264,566'},
  {id:'2',zone:'oceanside',maxLen:35,sqft:0,points:'298,549 330,549 330,566 298,566'},
  {id:'3',zone:'oceanside',maxLen:35,sqft:0,points:'332,549 364,549 364,566 332,566'},
  {id:'4',zone:'oceanside',maxLen:35,sqft:0,points:'366,549 398,549 398,566 366,566'},
  {id:'5',zone:'oceanside',maxLen:35,sqft:0,points:'400,549 432,549 432,566 400,566'},
  {id:'6',zone:'oceanside',maxLen:35,sqft:0,points:'434,549 466,549 466,566 434,566'},
  {id:'7',zone:'oceanside',maxLen:35,sqft:0,points:'468,549 500,549 500,566 468,566'},
  {id:'8',zone:'oceanside',maxLen:35,sqft:0,points:'502,549 534,549 534,566 502,566'},
  {id:'9',zone:'oceanside',maxLen:35,sqft:0,points:'536,549 568,549 568,566 536,566'},
  {id:'10',zone:'oceanside',maxLen:35,sqft:0,points:'570,549 602,549 602,566 570,566'},
  {id:'31',zone:'oceanside',maxLen:35,sqft:0,points:'264,570 296,570 296,587 264,587'},
  {id:'32',zone:'oceanside',maxLen:35,sqft:0,points:'298,570 330,570 330,587 298,587'},
  {id:'33',zone:'oceanside',maxLen:35,sqft:0,points:'332,570 364,570 364,587 332,587'},
  {id:'34',zone:'oceanside',maxLen:35,sqft:0,points:'366,570 398,570 398,587 366,587'},
  {id:'30',zone:'oceanside',maxLen:35,sqft:0,points:'264,570 296,570 296,587 264,587'},
  {id:'52',zone:'oceanside',maxLen:38,sqft:0,points:'180,490 212,490 212,507 180,507'},
  {id:'51',zone:'oceanside',maxLen:38,sqft:0,points:'146,490 178,490 178,507 146,507'},
  {id:'50',zone:'oceanside',maxLen:38,sqft:0,points:'112,490 144,490 144,507 112,507'},
  {id:'49',zone:'oceanside',maxLen:38,sqft:0,points:'78,490 110,490 110,507 78,507'},
  {id:'48',zone:'oceanside',maxLen:38,sqft:0,points:'44,490 76,490 76,507 44,507'},
  {id:'53',zone:'oceanside',maxLen:38,sqft:0,points:'180,509 212,509 212,526 180,526'},
  {id:'46',zone:'oceanside',maxLen:38,sqft:0,points:'146,509 178,509 178,526 146,526'},
  {id:'45',zone:'oceanside',maxLen:38,sqft:0,points:'112,509 144,509 144,526 112,526'},
  {id:'44',zone:'oceanside',maxLen:38,sqft:0,points:'78,509 110,509 110,526 78,526'},
  {id:'43',zone:'oceanside',maxLen:38,sqft:0,points:'44,509 76,509 76,526 44,526'},
  {id:'54',zone:'oceanside',maxLen:35,sqft:0,points:'112,530 144,530 144,547 112,547'},
  {id:'212',zone:'oceanside',maxLen:35,sqft:0,points:'78,530 110,530 110,547 78,547'},
  {id:'55',zone:'oceanside',maxLen:35,sqft:0,points:'44,530 76,530 76,547 44,547'},
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
