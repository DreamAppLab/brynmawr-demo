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
  {id:'1',zone:'oceanside',maxLen:40,sqft:0,points:'305.9,625.2 292.7,655.1 277.7,642.1 290.9,612.2'},
  {id:'2',zone:'oceanside',maxLen:40,sqft:0,points:'306.4,624.5 288.0,664.5 298.3,664.6 316.2,660.2'},
  {id:'3',zone:'oceanside',maxLen:40,sqft:0,points:'361.9,614.7 333.2,619.4 316.2,660.4 344.9,654.6'},
  {id:'4',zone:'oceanside',maxLen:40,sqft:0,points:'390.4,609.2 362.6,614.1 344.6,654.9 372.8,649.1'},
  {id:'5',zone:'oceanside',maxLen:40,sqft:0,points:'418.7,604.0 390.5,609.1 372.8,649.5 403.0,642.9'},
  {id:'6',zone:'oceanside',maxLen:40,sqft:0,points:'447.0,599.3 418.9,604.2 402.9,642.7 430.6,637.4'},
  {id:'7',zone:'oceanside',maxLen:40,sqft:0,points:'475.0,594.0 447.0,598.8 430.4,637.8 459.5,631.5'},
  {id:'8',zone:'oceanside',maxLen:40,sqft:0,points:'503.2,589.0 474.8,593.9 459.6,632.1 487.7,626.5'},
  {id:'9',zone:'oceanside',maxLen:40,sqft:0,points:'529.7,584.5 503.7,588.9 487.2,626.8 515.1,621.1'},
  {id:'11',zone:'oceanside',maxLen:40,sqft:0,points:'309.2,574.0 299.4,574.7 295.3,576.1 291.5,578.2'},
  {id:'12',zone:'oceanside',maxLen:40,sqft:0,points:'337.2,569.5 309.2,574.0 291.8,612.7 298.8,613.5'},
  {id:'13',zone:'oceanside',maxLen:40,sqft:0,points:'365.6,564.5 336.9,569.2 320.7,609.1 348.6,604.0'},
  {id:'14',zone:'oceanside',maxLen:40,sqft:0,points:'392.7,559.9 374.8,599.2 403.2,594.2 421.1,554.9'},
  {id:'15',zone:'oceanside',maxLen:40,sqft:0,points:'405.0,593.7 376.6,598.6 392.6,559.4 421.2,554.3'},
  {id:'16',zone:'oceanside',maxLen:40,sqft:0,points:'448.4,550.2 421.4,554.7 404.4,593.5 433.9,587.9'},
  {id:'17',zone:'oceanside',maxLen:40,sqft:0,points:'476.4,545.8 448.7,549.9 433.9,587.8 462.3,582.8'},
  {id:'18',zone:'oceanside',maxLen:40,sqft:0,points:'489.5,578.2 461.6,582.9 477.0,545.2 504.2,540.9'},
  {id:'19',zone:'oceanside',maxLen:40,sqft:0,points:'522.7,560.7 503.4,575.9 497.0,559.2 517.5,539.0'},
  {id:'20',zone:'oceanside',maxLen:40,sqft:0,points:'556.0,543.2 545.2,568.9 517.0,573.3 530.9,537.0'},
  {id:'21',zone:'oceanside',maxLen:40,sqft:0,points:'464.2,467.9 518.3,489.5 496.8,497.6 442.6,476.1'},
  {id:'22',zone:'oceanside',maxLen:40,sqft:0,points:'526.0,522.8 498.8,527.0 466.9,497.2 493.6,493.1'},
  {id:'23',zone:'oceanside',maxLen:40,sqft:0,points:'498.7,526.9 472.6,531.4 439.5,501.6 467.0,497.3'},
  {id:'24',zone:'oceanside',maxLen:40,sqft:0,points:'412.5,505.7 445.9,536.2 472.8,531.6 439.4,501.4'},
  {id:'25',zone:'oceanside',maxLen:40,sqft:0,points:'445.7,536.0 412.2,505.4 386.2,509.7 417.9,540.5'},
  {id:'26',zone:'oceanside',maxLen:40,sqft:0,points:'418.3,540.4 390.6,545.4 359.1,513.8 386.2,509.7'},
  {id:'27',zone:'oceanside',maxLen:40,sqft:0,points:'390.2,545.2 363.7,549.5 330.6,518.5 359.4,514.1'},
  {id:'28',zone:'oceanside',maxLen:40,sqft:0,points:'363.6,549.7 336.7,554.5 304.7,522.6 330.7,518.7'},
  {id:'29',zone:'oceanside',maxLen:40,sqft:0,points:'337.0,554.3 298.9,561.7 294.5,561.8 291.8,561.7'},
  {id:'30',zone:'oceanside',maxLen:40,sqft:0,points:'461.0,642.6 430.5,648.9 413.8,687.9 445.6,681.7'},
  {id:'31',zone:'oceanside',maxLen:40,sqft:0,points:'490.4,636.5 461.2,642.6 445.2,681.7 474.8,675.3'},
  {id:'32',zone:'oceanside',maxLen:40,sqft:0,points:'520.4,630.5 490.8,636.8 474.7,675.5 504.6,669.1'},
  {id:'33',zone:'oceanside',maxLen:40,sqft:0,points:'548.6,625.0 520.5,630.5 504.7,669.4 534.4,663.7'},
  {id:'34',zone:'oceanside',maxLen:40,sqft:0,points:'569.5,618.8 582.5,652.6 543.5,661.2 530.5,627.4'},
  {id:'35',zone:'oceanside',maxLen:40,sqft:0,points:'578.2,598.4 578.1,603.2 577.5,606.9 574.6,609.8'},
  {id:'36',zone:'oceanside',maxLen:40,sqft:0,points:'575.4,573.7 578.0,598.1 625.3,622.3 622.0,598.0'},
  {id:'37',zone:'oceanside',maxLen:40,sqft:0,points:'572.7,550.2 574.9,573.6 622.1,598.0 619.2,574.4'},
  {id:'38',zone:'oceanside',maxLen:40,sqft:0,points:'570.3,526.0 572.3,550.2 619.3,574.7 616.3,550.8'},
  {id:'39',zone:'oceanside',maxLen:40,sqft:0,points:'567.9,502.6 570.1,525.8 616.3,550.7 613.5,527.4'},
  {id:'40',zone:'oceanside',maxLen:40,sqft:0,points:'565.6,477.2 567.6,502.3 613.9,527.6 611.4,503.5'},
  {id:'41',zone:'oceanside',maxLen:40,sqft:0,points:'563.5,452.6 565.4,478.0 611.1,503.6 608.5,478.8'},
  {id:'42',zone:'oceanside',maxLen:40,sqft:0,points:'217.9,629.4 230.9,627.6 237.9,624.5 242.9,621.1'},
  {id:'43',zone:'oceanside',maxLen:40,sqft:0,points:'158.1,602.8 186.1,597.1 217.9,628.9 191.3,635.1'},
  {id:'44',zone:'oceanside',maxLen:40,sqft:0,points:'130.6,608.7 158.1,602.6 191.0,635.0 161.6,641.2'},
  {id:'45',zone:'oceanside',maxLen:40,sqft:0,points:'103.3,614.3 129.8,608.2 162.8,641.2 133.9,646.8'},
  {id:'46',zone:'oceanside',maxLen:40,sqft:0,points:'74.4,619.9 102.8,613.9 134.4,646.7 105.9,652.7'},
  {id:'47',zone:'oceanside',maxLen:40,sqft:0,points:'231.8,574.2 246.6,567.6 254.1,560.9 251.3,554.3'},
  {id:'48',zone:'oceanside',maxLen:40,sqft:0,points:'170.9,548.1 202.1,580.3 228.9,575.7 232.0,573.9'},
  {id:'49',zone:'oceanside',maxLen:40,sqft:0,points:'171.5,548.5 145.0,552.8 175.1,584.9 201.5,579.8'},
  {id:'50',zone:'oceanside',maxLen:40,sqft:0,points:'145.3,553.2 117.8,558.4 147.1,590.8 174.8,585.0'},
  {id:'51',zone:'oceanside',maxLen:40,sqft:0,points:'117.7,558.5 88.1,562.7 119.2,596.0 146.7,590.6'},
  {id:'52',zone:'oceanside',maxLen:40,sqft:0,points:'88.7,562.4 50.4,566.4 46.1,568.3 43.0,570.4'},
  {id:'53',zone:'oceanside',maxLen:40,sqft:0,points:'45.2,625.4 78.1,659.2 106.3,653.2 73.9,619.8'},
  {id:'54',zone:'oceanside',maxLen:40,sqft:0,points:'161.2,656.1 186.7,650.2 206.7,669.3 189.7,684.2'},
  {id:'55',zone:'oceanside',maxLen:40,sqft:0,points:'69.2,675.9 95.1,701.8 130.1,698.9 99.2,669.1'},
  {id:'56',zone:'oceanside',maxLen:40,sqft:0,points:'40.8,684.7 59.7,704.5 95.4,702.0 69.3,676.1'},
  {id:'57',zone:'oceanside',maxLen:40,sqft:0,points:'171.9,715.7 204.9,730.2 192.2,731.7 159.2,717.2'},
  {id:'58',zone:'oceanside',maxLen:40,sqft:0,points:'189.1,696.5 155.2,694.0 197.7,653.2 231.5,655.7'},
  {id:'59',zone:'oceanside',maxLen:40,sqft:0,points:'124.6,699.8 87.4,736.9 115.2,738.8 157.4,698.6'},
  {id:'60',zone:'oceanside',maxLen:40,sqft:0,points:'123.5,700.5 90.6,701.8 58.4,734.8 87.7,737.7'},
  {id:'61',zone:'oceanside',maxLen:40,sqft:0,points:'59.7,704.2 90.3,702.3 58.8,734.5 47.6,734.2'},
  {id:'62',zone:'oceanside',maxLen:40,sqft:0,points:'41.0,684.4 35.0,688.5 33.3,690.9 32.4,724.7'},
  {id:'63',zone:'oceanside',maxLen:40,sqft:0,points:'80.1,748.7 94.3,776.9 116.5,767.8 107.9,751.8'},
  {id:'64',zone:'oceanside',maxLen:40,sqft:0,points:'52.2,745.0 71.7,783.1 92.7,773.8 79.8,748.2'},
  {id:'65',zone:'oceanside',maxLen:40,sqft:0,points:'31.9,752.8 42.1,776.0 63.4,767.0 52.6,745.1'},
  {id:'66',zone:'oceanside',maxLen:40,sqft:0,points:'31.6,780.5 31.8,801.2 71.6,782.8 63.1,766.9'},
  {id:'67',zone:'oceanside',maxLen:40,sqft:0,points:'130.7,806.5 122.4,836.1 145.3,836.8 146.1,823.3'},
  {id:'68',zone:'oceanside',maxLen:40,sqft:0,points:'113.8,794.8 85.2,816.7 98.9,831.0 131.0,806.3'},
  {id:'69',zone:'oceanside',maxLen:40,sqft:0,points:'89.2,777.7 86.5,794.7 117.4,794.5 118.3,777.8'},
  {id:'70',zone:'oceanside',maxLen:40,sqft:0,points:'43.1,488.8 38.7,542.6 41.4,549.0 44.1,551.6'},
  {id:'71',zone:'oceanside',maxLen:40,sqft:0,points:'45.8,460.5 43.2,488.5 77.6,515.2 79.2,485.5'},
  {id:'72',zone:'oceanside',maxLen:40,sqft:0,points:'48.4,433.0 46.1,460.7 79.5,487.1 80.7,458.8'},
  {id:'73',zone:'oceanside',maxLen:40,sqft:0,points:'51.3,404.2 48.4,432.7 81.6,459.2 83.4,431.3'},
  {id:'74',zone:'oceanside',maxLen:40,sqft:0,points:'54.7,375.5 51.6,404.6 83.8,431.0 86.2,402.4'},
  {id:'75',zone:'oceanside',maxLen:40,sqft:0,points:'58.1,347.6 55.1,375.1 86.0,402.6 88.3,374.2'},
  {id:'76',zone:'oceanside',maxLen:40,sqft:0,points:'61.4,319.6 58.2,347.3 88.6,374.1 91.7,346.7'},
  {id:'77',zone:'oceanside',maxLen:40,sqft:0,points:'65.2,289.8 61.4,319.2 90.9,346.6 95.1,317.3'},
  {id:'78',zone:'oceanside',maxLen:40,sqft:0,points:'68.9,263.3 65.8,290.1 94.5,317.3 97.4,289.5'},
  {id:'79',zone:'oceanside',maxLen:40,sqft:0,points:'73.3,236.2 68.8,263.5 97.3,289.8 101.0,262.1'},
  {id:'80',zone:'oceanside',maxLen:40,sqft:0,points:'77.3,205.7 73.3,235.8 101.1,262.1 104.7,231.8'},
  {id:'81',zone:'oceanside',maxLen:40,sqft:0,points:'81.5,179.0 77.8,206.1 104.5,231.4 108.4,206.1'},
  {id:'82',zone:'oceanside',maxLen:40,sqft:0,points:'81.6,179.8 83.7,164.1 89.2,157.2 94.0,154.1'},
  {id:'83',zone:'oceanside',maxLen:40,sqft:0,points:'94.5,486.1 90.8,537.9 92.8,542.1 96.0,544.2'},
  {id:'84',zone:'oceanside',maxLen:40,sqft:0,points:'96.2,458.5 94.6,485.8 127.3,509.8 128.3,482.3'},
  {id:'85',zone:'oceanside',maxLen:40,sqft:0,points:'98.5,431.1 96.7,459.2 128.5,482.1 130.1,454.8'},
  {id:'86',zone:'oceanside',maxLen:40,sqft:0,points:'101.1,402.3 98.6,431.1 130.4,455.1 131.9,427.0'},
  {id:'87',zone:'oceanside',maxLen:40,sqft:0,points:'103.8,374.1 101.1,402.7 131.9,427.1 135.1,398.9'},
  {id:'88',zone:'oceanside',maxLen:40,sqft:0,points:'106.3,347.3 104.4,374.1 134.7,398.9 136.5,372.4'},
  {id:'89',zone:'oceanside',maxLen:40,sqft:0,points:'109.3,317.6 106.6,347.3 136.6,372.3 139.4,343.6'},
  {id:'90',zone:'oceanside',maxLen:40,sqft:0,points:'112.7,290.1 109.8,317.6 139.6,344.0 142.4,316.4'},
  {id:'91',zone:'oceanside',maxLen:40,sqft:0,points:'115.9,263.3 112.5,289.9 141.6,316.1 145.0,289.0'},
  {id:'92',zone:'oceanside',maxLen:40,sqft:0,points:'119.2,235.5 116.1,263.0 145.5,289.8 147.7,261.1'},
  {id:'93',zone:'oceanside',maxLen:40,sqft:0,points:'122.9,208.0 119.2,235.8 148.0,261.7 150.8,233.9'},
  {id:'94',zone:'oceanside',maxLen:40,sqft:0,points:'125.7,183.3 122.7,207.7 151.5,234.9 153.6,209.9'},
  {id:'95',zone:'oceanside',maxLen:40,sqft:0,points:'132.6,156.9 128.8,162.6 126.0,183.6 153.8,210.2'},
  {id:'96',zone:'oceanside',maxLen:40,sqft:0,points:'132.3,156.6 135.4,153.0 141.5,150.9 145.8,150.7'},
  {id:'97',zone:'midpark',maxLen:55,sqft:0,points:'144.2,478.4 142.1,530.5 144.9,534.6 148.3,536.2'},
  {id:'98',zone:'midpark',maxLen:55,sqft:0,points:'146.2,451.5 144.3,478.9 177.3,502.1 178.3,474.1'},
  {id:'99',zone:'midpark',maxLen:55,sqft:0,points:'148.4,423.9 146.1,451.7 178.6,474.6 179.2,447.2'},
  {id:'100',zone:'midpark',maxLen:55,sqft:0,points:'150.2,395.8 148.3,424.2 179.9,448.0 181.8,419.6'},
  {id:'101',zone:'midpark',maxLen:55,sqft:0,points:'151.8,368.0 150.5,396.1 181.6,420.3 183.0,392.1'},
  {id:'102',zone:'midpark',maxLen:55,sqft:0,points:'154.6,340.5 152.3,368.1 183.5,392.2 185.4,366.1'},
  {id:'103',zone:'midpark',maxLen:55,sqft:0,points:'157.6,312.8 154.8,340.6 185.4,365.8 187.5,338.3'},
  {id:'104',zone:'midpark',maxLen:55,sqft:0,points:'160.1,284.9 157.6,313.1 187.3,338.1 189.7,310.3'},
  {id:'105',zone:'midpark',maxLen:55,sqft:0,points:'162.9,258.3 160.1,284.6 189.7,309.9 192.3,284.0'},
  {id:'106',zone:'midpark',maxLen:55,sqft:0,points:'165.9,230.3 162.8,258.6 192.2,284.3 194.6,255.0'},
  {id:'107',zone:'midpark',maxLen:55,sqft:0,points:'169.4,204.3 165.7,230.2 195.2,255.9 197.7,230.3'},
  {id:'108',zone:'midpark',maxLen:55,sqft:0,points:'171.9,179.8 169.0,204.2 197.8,230.3 200.2,206.1'},
  {id:'109',zone:'midpark',maxLen:55,sqft:0,points:'178.0,153.3 174.8,158.6 172.1,179.3 200.2,206.5'},
  {id:'110',zone:'midpark',maxLen:55,sqft:0,points:'177.9,153.2 187.2,147.6 192.6,152.9 189.7,176.4'},
  {id:'111',zone:'midpark',maxLen:55,sqft:0,points:'193.2,475.6 191.6,511.4 192.8,514.9 195.2,518.0'},
  {id:'112',zone:'midpark',maxLen:55,sqft:0,points:'194.4,448.7 193.4,475.9 223.5,497.8 224.3,471.2'},
  {id:'113',zone:'midpark',maxLen:55,sqft:0,points:'195.9,423.0 194.7,448.3 224.6,471.2 225.3,446.2'},
  {id:'114',zone:'midpark',maxLen:55,sqft:0,points:'197.4,398.1 195.9,423.3 225.3,446.3 226.1,420.8'},
  {id:'115',zone:'midpark',maxLen:55,sqft:0,points:'198.8,373.4 197.5,398.9 226.3,421.2 227.2,396.1'},
  {id:'116',zone:'midpark',maxLen:55,sqft:0,points:'200.8,349.2 198.8,372.7 227.7,396.4 228.3,371.2'},
  {id:'117',zone:'midpark',maxLen:55,sqft:0,points:'203.0,323.6 200.8,348.6 228.9,371.5 229.8,346.8'},
  {id:'118',zone:'midpark',maxLen:55,sqft:0,points:'205.1,298.4 202.7,323.2 229.9,346.8 231.5,321.9'},
  {id:'119',zone:'midpark',maxLen:55,sqft:0,points:'231.7,321.6 204.9,298.6 207.6,273.1 233.4,296.4'},
  {id:'120',zone:'midpark',maxLen:55,sqft:0,points:'209.9,248.2 207.4,273.4 233.3,296.9 235.5,271.0'},
  {id:'121',zone:'midpark',maxLen:55,sqft:0,points:'213.2,216.3 209.9,248.2 234.8,270.6 237.7,239.5'},
  {id:'122',zone:'midpark',maxLen:55,sqft:0,points:'216.9,181.6 213.3,216.2 237.7,239.9 241.0,206.1'},
  {id:'123',zone:'midpark',maxLen:55,sqft:0,points:'246.3,149.0 258.0,204.2 233.9,179.9 222.2,124.8'},
  {id:'124',zone:'midpark',maxLen:55,sqft:0,points:'225.2,456.8 223.7,492.6 255.2,471.8 255.3,439.4'},
  {id:'125',zone:'midpark',maxLen:55,sqft:0,points:'226.2,430.8 225.2,457.1 256.1,439.5 256.8,413.8'},
  {id:'126',zone:'midpark',maxLen:55,sqft:0,points:'226.9,403.5 225.9,431.3 256.9,413.8 257.5,386.5'},
  {id:'127',zone:'midpark',maxLen:55,sqft:0,points:'229.0,376.3 227.4,403.6 257.8,386.0 258.7,359.6'},
  {id:'128',zone:'midpark',maxLen:55,sqft:0,points:'230.2,351.1 228.6,376.6 259.5,359.0 260.1,334.6'},
  {id:'129',zone:'midpark',maxLen:55,sqft:0,points:'231.5,327.5 230.1,351.7 260.4,334.6 261.2,310.8'},
  {id:'130',zone:'midpark',maxLen:55,sqft:0,points:'233.3,301.6 231.7,327.5 262.0,311.1 263.5,285.2'},
  {id:'131',zone:'midpark',maxLen:55,sqft:0,points:'264.8,260.4 263.3,285.9 233.7,301.4 235.2,275.9'},
  {id:'132',zone:'midpark',maxLen:55,sqft:0,points:'237.1,253.8 234.9,276.3 265.1,260.4 266.3,238.6'},
  {id:'133',zone:'midpark',maxLen:55,sqft:0,points:'268.3,211.1 266.9,238.6 236.7,254.4 238.9,227.8'},
  {id:'134',zone:'midpark',maxLen:55,sqft:0,points:'242.0,195.6 238.9,228.3 268.8,211.6 271.4,179.3'},
  {id:'135',zone:'midpark',maxLen:55,sqft:0,points:'256.7,101.6 278.8,114.7 246.8,148.9 224.6,135.7'},
  {id:'136',zone:'midpark',maxLen:55,sqft:0,points:'274.2,377.9 272.8,421.4 286.1,425.3 306.0,426.2'},
  {id:'137',zone:'midpark',maxLen:55,sqft:0,points:'306.7,402.0 274.1,377.5 275.6,350.3 307.0,374.1'},
  {id:'138',zone:'midpark',maxLen:55,sqft:0,points:'276.9,328.2 275.8,349.6 307.0,373.4 307.9,352.1'},
  {id:'139',zone:'midpark',maxLen:55,sqft:0,points:'278.4,305.6 277.2,327.4 307.9,351.2 308.5,329.8'},
  {id:'140',zone:'midpark',maxLen:55,sqft:0,points:'279.9,278.4 278.5,305.1 308.9,329.2 310.1,303.0'},
  {id:'141',zone:'midpark',maxLen:55,sqft:0,points:'283.9,226.9 282.2,252.3 311.7,277.2 313.2,250.4'},
  {id:'142',zone:'midpark',maxLen:55,sqft:0,points:'287.9,175.4 285.8,199.6 314.5,225.2 316.3,197.8'},
  {id:'143',zone:'midpark',maxLen:55,sqft:0,points:'291.8,154.3 289.2,157.7 288.0,175.7 316.6,198.1'},
  {id:'144',zone:'midpark',maxLen:55,sqft:0,points:'306.1,480.5 306.0,488.8 326.3,503.4 329.2,502.3'},
  {id:'145',zone:'midpark',maxLen:55,sqft:0,points:'306.0,464.9 319.2,464.5 340.3,447.5 340.2,425.8'},
  {id:'146',zone:'midpark',maxLen:55,sqft:0,points:'307.2,408.6 306.9,426.1 332.1,425.2 340.6,423.1'},
  {id:'147',zone:'midpark',maxLen:55,sqft:0,points:'307.5,383.4 306.5,409.7 340.9,386.1 341.2,360.4'},
  {id:'148',zone:'midpark',maxLen:55,sqft:0,points:'341.8,333.6 341.3,360.2 307.4,383.2 308.1,356.4'},
  {id:'149',zone:'midpark',maxLen:55,sqft:0,points:'309.2,332.8 308.3,355.1 341.8,333.4 342.7,310.3'},
  {id:'150',zone:'midpark',maxLen:55,sqft:0,points:'310.2,305.2 309.1,332.8 342.7,309.9 343.4,282.9'},
  {id:'151',zone:'midpark',maxLen:55,sqft:0,points:'311.3,278.1 310.0,304.9 343.6,282.5 344.8,256.5'},
  {id:'152',zone:'midpark',maxLen:55,sqft:0,points:'312.3,251.5 311.5,277.4 345.0,256.0 346.0,231.6'},
  {id:'153',zone:'midpark',maxLen:55,sqft:0,points:'314.4,225.1 348.6,202.3 349.6,179.1 316.4,198.9'},
  {id:'154',zone:'midpark',maxLen:55,sqft:0,points:'319.8,165.0 317.0,198.3 349.8,178.9 350.8,161.5'},
  {id:'155',zone:'midpark',maxLen:55,sqft:0,points:'357.3,462.3 357.5,486.1 360.6,490.8 367.2,494.7'},
  {id:'156',zone:'midpark',maxLen:55,sqft:0,points:'357.2,438.6 357.3,461.3 386.0,479.2 385.3,456.8'},
  {id:'157',zone:'midpark',maxLen:55,sqft:0,points:'357.5,392.8 381.2,393.1 395.6,382.0 372.0,381.7'},
  {id:'158',zone:'midpark',maxLen:55,sqft:0,points:'357.5,369.9 394.3,395.5 394.0,371.4 357.2,345.8'},
  {id:'159',zone:'midpark',maxLen:55,sqft:0,points:'358.4,345.0 376.5,370.6 394.0,370.9 375.8,345.3'},
  {id:'160',zone:'midpark',maxLen:55,sqft:0,points:'359.2,320.2 358.7,345.7 393.9,370.3 393.7,345.8'},
  {id:'161',zone:'midpark',maxLen:55,sqft:0,points:'359.4,296.0 359.0,319.9 394.1,345.9 394.0,322.6'},
  {id:'162',zone:'midpark',maxLen:55,sqft:0,points:'360.4,273.0 359.7,295.8 394.2,323.2 394.9,299.5'},
  {id:'163',zone:'midpark',maxLen:55,sqft:0,points:'361.9,249.3 361.0,273.1 394.9,299.8 395.4,275.8'},
  {id:'164',zone:'midpark',maxLen:55,sqft:0,points:'362.8,225.1 361.8,249.1 395.2,275.9 395.7,252.3'},
  {id:'165',zone:'midpark',maxLen:55,sqft:0,points:'363.7,200.4 363.2,225.3 395.6,252.1 396.2,228.8'},
  {id:'166',zone:'midpark',maxLen:55,sqft:0,points:'365.7,178.6 364.0,200.8 396.1,229.1 397.6,201.1'},
  {id:'167',zone:'midpark',maxLen:55,sqft:0,points:'366.2,162.5 365.8,178.3 397.4,200.8 398.1,182.1'},
  {id:'168',zone:'midpark',maxLen:55,sqft:0,points:'371.8,149.3 367.8,153.1 366.2,156.6 366.1,162.1'},
  {id:'169',zone:'midpark',maxLen:55,sqft:0,points:'385.4,457.1 406.6,456.4 407.9,493.2 386.8,497.2'},
  {id:'170',zone:'midpark',maxLen:55,sqft:0,points:'407.4,476.0 408.1,493.8 414.0,493.0 419.5,491.2'},
  {id:'171',zone:'midpark',maxLen:55,sqft:0,points:'406.8,453.1 407.1,476.2 432.6,459.0 431.6,438.6'},
  {id:'172',zone:'midpark',maxLen:55,sqft:0,points:'394.1,394.4 409.1,404.7 431.4,389.0 430.7,344.8'},
  {id:'173',zone:'midpark',maxLen:55,sqft:0,points:'394.0,370.7 394.1,394.4 430.6,371.4 430.4,348.0'},
  {id:'174',zone:'midpark',maxLen:55,sqft:0,points:'430.5,323.0 394.3,345.8 394.1,370.1 430.3,347.5'},
  {id:'175',zone:'midpark',maxLen:55,sqft:0,points:'394.4,345.9 395.0,323.0 430.8,299.7 430.3,322.6'},
  {id:'176',zone:'midpark',maxLen:55,sqft:0,points:'395.2,299.4 431.6,275.6 432.1,253.3 395.7,277.1'},
  {id:'177',zone:'midpark',maxLen:55,sqft:0,points:'395.8,276.0 395.2,299.2 431.1,276.6 431.3,253.4'},
  {id:'178',zone:'midpark',maxLen:55,sqft:0,points:'395.8,252.6 395.7,275.8 431.6,252.6 432.0,229.4'},
  {id:'179',zone:'midpark',maxLen:55,sqft:0,points:'397.1,228.8 432.9,205.8 432.3,228.8 396.3,252.7'},
  {id:'180',zone:'midpark',maxLen:55,sqft:0,points:'397.6,200.8 396.7,228.2 432.9,205.8 433.5,179.0'},
  {id:'181',zone:'midpark',maxLen:55,sqft:0,points:'398.8,159.3 397.7,200.5 433.6,178.6 434.5,157.1'},
  {id:'182',zone:'midpark',maxLen:55,sqft:0,points:'448.6,447.4 449.8,476.2 451.5,479.4 452.9,481.1'},
  {id:'183',zone:'midpark',maxLen:55,sqft:0,points:'448.2,424.1 450.5,419.7 450.8,415.4 449.7,401.4'},
  {id:'184',zone:'midpark',maxLen:55,sqft:0,points:'447.4,400.9 448.1,424.1 489.1,450.1 487.9,427.8'},
  {id:'185',zone:'midpark',maxLen:55,sqft:0,points:'447.0,377.3 447.4,401.3 488.4,427.3 487.2,404.1'},
  {id:'186',zone:'midpark',maxLen:55,sqft:0,points:'446.4,354.2 447.0,376.8 487.5,404.3 486.4,381.5'},
  {id:'187',zone:'midpark',maxLen:55,sqft:0,points:'446.4,330.7 486.4,358.7 486.2,336.3 446.2,308.3'},
  {id:'188',zone:'midpark',maxLen:55,sqft:0,points:'446.3,308.2 486.2,337.1 485.7,314.6 445.8,285.6'},
  {id:'189',zone:'midpark',maxLen:55,sqft:0,points:'446.3,283.6 485.4,312.4 484.8,288.5 445.7,259.8'},
  {id:'190',zone:'midpark',maxLen:55,sqft:0,points:'446.6,260.4 446.3,283.5 484.6,312.7 484.4,290.1'},
  {id:'191',zone:'midpark',maxLen:55,sqft:0,points:'446.6,237.3 484.3,267.2 484.6,243.7 446.8,213.8'},
  {id:'192',zone:'midpark',maxLen:55,sqft:0,points:'446.9,212.0 446.6,237.2 484.6,267.1 484.1,242.4'},
  {id:'193',zone:'midpark',maxLen:55,sqft:0,points:'447.6,190.1 447.4,212.2 484.0,242.8 484.1,220.4'},
  {id:'194',zone:'midpark',maxLen:55,sqft:0,points:'448.3,166.4 447.5,189.7 484.3,220.3 484.2,196.8'},
  {id:'195',zone:'midpark',maxLen:55,sqft:0,points:'455.7,164.1 473.8,146.2 485.5,153.8 484.6,197.2'},
  {id:'196',zone:'midpark',maxLen:55,sqft:0,points:'505.7,445.2 506.9,467.2 509.4,471.4 513.4,474.2'},
  {id:'197',zone:'midpark',maxLen:55,sqft:0,points:'504.6,420.3 506.0,445.4 544.0,467.9 542.7,442.7'},
  {id:'198',zone:'midpark',maxLen:55,sqft:0,points:'503.6,398.7 504.3,419.8 547.5,447.0 545.4,425.6'},
  {id:'199',zone:'midpark',maxLen:55,sqft:0,points:'502.4,375.2 503.7,398.7 545.6,425.5 544.0,402.5'},
  {id:'200',zone:'midpark',maxLen:55,sqft:0,points:'501.8,352.6 502.5,375.2 544.1,402.8 542.6,379.9'},
  {id:'201',zone:'midpark',maxLen:55,sqft:0,points:'501.5,330.2 502.1,352.7 542.8,380.3 541.6,358.1'},
  {id:'202',zone:'midpark',maxLen:55,sqft:0,points:'500.4,306.5 501.2,329.9 541.6,358.3 540.8,335.4'},
  {id:'203',zone:'midpark',maxLen:55,sqft:0,points:'500.4,283.3 500.5,306.2 540.7,335.6 539.5,312.8'},
  {id:'204',zone:'midpark',maxLen:55,sqft:0,points:'500.1,261.1 500.6,283.3 539.9,312.8 538.9,287.8'},
  {id:'205',zone:'midpark',maxLen:55,sqft:0,points:'500.1,238.7 500.5,261.0 538.5,288.3 537.9,266.2'},
  {id:'206',zone:'midpark',maxLen:55,sqft:0,points:'500.1,214.4 500.2,238.9 538.0,266.3 537.2,242.0'},
  {id:'207',zone:'midpark',maxLen:55,sqft:0,points:'500.3,191.8 500.2,214.4 536.9,242.0 536.5,218.9'},
  {id:'208',zone:'midpark',maxLen:55,sqft:0,points:'500.1,169.6 500.3,191.6 536.6,218.9 536.1,197.0'},
  {id:'209',zone:'midpark',maxLen:55,sqft:0,points:'510.5,188.3 536.5,197.3 500.2,211.3 474.2,202.3'},
  {id:'210',zone:'midpark',maxLen:55,sqft:0,points:'561.5,427.8 563.2,451.9 608.9,478.9 606.5,454.4'},
  {id:'211',zone:'midpark',maxLen:55,sqft:0,points:'558.6,394.6 561.3,427.6 606.5,454.4 601.7,395.1'},
  {id:'212',zone:'midpark',maxLen:55,sqft:0,points:'45.7,625.8 42.1,627.1 38.7,629.5 36.4,631.7'},
  {id:'213',zone:'midpark',maxLen:55,sqft:0,points:'595.6,293.9 596.0,307.4 554.3,305.4 553.9,291.9'},
  {id:'214',zone:'midpark',maxLen:55,sqft:0,points:'595.6,293.6 594.6,270.4 551.2,237.6 552.1,261.5'},
  {id:'215',zone:'midpark',maxLen:55,sqft:0,points:'593.7,246.7 594.5,270.7 551.4,238.0 550.5,213.5'},
  {id:'216',zone:'midpark',maxLen:55,sqft:0,points:'592.5,225.4 594.0,246.9 550.7,213.3 550.5,192.4'},
  {id:'217',zone:'midpark',maxLen:55,sqft:0,points:'550.1,165.2 550.5,191.5 593.0,225.4 592.3,198.8'},
  {id:'218',zone:'midpark',maxLen:55,sqft:0,points:'591.7,144.7 593.0,198.8 550.1,164.1 551.1,159.3'},
  {id:'219',zone:'beachfront',maxLen:0,sqft:0,points:'104.7,93.3 77.6,93.6 70.2,135.9 97.4,135.6'},
  {id:'220',zone:'beachfront',maxLen:0,sqft:0,points:'128.9,93.3 103.3,95.5 97.6,135.5 123.3,133.4'},
  {id:'221',zone:'beachfront',maxLen:0,sqft:0,points:'153.1,93.3 128.9,97.4 124.9,135.2 149.2,131.2'},
  {id:'222',zone:'beachfront',maxLen:0,sqft:0,points:'177.4,93.4 154.6,99.3 152.3,134.9 175.2,129.0'},
  {id:'223',zone:'beachfront',maxLen:0,sqft:0,points:'201.6,93.4 180.2,101.2 179.7,134.6 201.1,126.8'},
  {id:'224',zone:'beachfront',maxLen:0,sqft:0,points:'225.8,93.4 205.9,103.1 207.0,134.3 227.0,124.6'},
  {id:'225',zone:'beachfront',maxLen:0,sqft:0,points:'250.1,93.4 231.5,105.0 234.4,133.9 252.9,122.4'},
  {id:'226',zone:'beachfront',maxLen:0,sqft:0,points:'274.3,93.5 257.2,106.9 261.7,133.6 278.8,120.2'},
  {id:'227',zone:'beachfront',maxLen:0,sqft:0,points:'298.5,93.5 282.8,108.9 289.1,133.3 304.7,118.1'},
  {id:'228',zone:'beachfront',maxLen:0,sqft:0,points:'322.7,93.5 308.5,110.8 316.5,133.0 330.6,115.9'},
  {id:'229',zone:'beachfront',maxLen:0,sqft:0,points:'347.0,93.5 334.1,112.7 343.8,132.6 356.5,113.7'},
  {id:'230',zone:'beachfront',maxLen:0,sqft:0,points:'371.2,93.6 359.8,114.6 371.2,132.3 382.4,111.5'},
  {id:'231',zone:'beachfront',maxLen:0,sqft:0,points:'395.4,93.6 385.4,116.5 398.5,132.0 408.4,109.3'},
  {id:'232',zone:'beachfront',maxLen:0,sqft:0,points:'419.7,93.6 411.0,118.4 425.9,131.7 434.3,107.1'},
  {id:'233',zone:'beachfront',maxLen:0,sqft:0,points:'443.9,93.6 436.7,120.3 453.2,131.4 460.2,104.9'},
  {id:'234',zone:'beachfront',maxLen:0,sqft:0,points:'468.1,93.7 462.3,122.2 480.6,131.0 486.1,102.7'},
  {id:'235',zone:'beachfront',maxLen:0,sqft:0,points:'492.4,93.7 488.0,124.1 508.0,130.7 512.0,100.5'},
  {id:'236',zone:'beachfront',maxLen:0,sqft:0,points:'516.6,93.7 513.6,126.0 535.3,130.4 537.9,98.4'},
  {id:'237',zone:'beachfront',maxLen:0,sqft:0,points:'540.8,93.7 539.3,127.9 562.7,130.1 563.8,96.2'},
  {id:'238',zone:'beachfront',maxLen:0,sqft:0,points:'565.0,93.8 564.9,129.8 590.0,129.7 589.7,94.0'},
  {id:'239',zone:'midpark',maxLen:55,sqft:0,points:'255.8,754.1 232.8,785.2 199.2,761.8 227.2,734.5'},
  {id:'240',zone:'midpark',maxLen:55,sqft:0,points:'238.5,723.1 264.2,740.7 270.4,734.5 280.2,726.2'},
  {id:'241',zone:'midpark',maxLen:55,sqft:0,points:'256.5,703.1 270.9,691.5 275.0,689.4 283.4,685.9'},
  {id:'242',zone:'midpark',maxLen:55,sqft:0,points:'341.1,667.8 293.2,678.2 305.4,712.6 324.4,707.2'},
  {id:'243',zone:'midpark',maxLen:55,sqft:0,points:'341.5,667.6 323.9,707.4 353.1,701.0 370.8,661.5'},
  {id:'244',zone:'midpark',maxLen:55,sqft:0,points:'401.0,655.3 371.0,661.1 352.8,701.3 384.6,694.4'},
  {id:'245',zone:'midpark',maxLen:55,sqft:0,points:'430.8,648.6 401.3,655.1 384.3,694.6 414.3,687.8'},
  {id:'246',zone:'midpark',maxLen:55,sqft:0,points:'130.2,663.1 160.7,655.8 190.3,683.9 189.7,696.5'},
  {id:'247',zone:'midpark',maxLen:55,sqft:0,points:'129.5,662.3 166.3,696.6 130.6,699.8 99.3,669.7'},
  {id:'248',zone:'midpark',maxLen:55,sqft:0,points:'224.0,492.8 223.2,522.0 228.9,520.9 237.1,518.5'},
  {id:'249',zone:'midpark',maxLen:55,sqft:0,points:'292.1,154.3 296.1,157.3 300.0,159.8 305.5,162.5'},
  {id:'250',zone:'midpark',maxLen:55,sqft:0,points:'331.1,147.0 380.3,146.2 385.3,146.4 357.4,152.1'},
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
