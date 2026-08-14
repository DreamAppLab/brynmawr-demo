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
  {id:'1',zone:'oceanside',maxLen:40,sqft:0,points:'305.9,625.2 294.7,627.4 289.7,629.7 286.2,631.6 283.5,634.0 279.4,637.5 275.7,641.9 274.6,646.8 272.9,651.4 274.1,656.7 277.1,660.9 281.0,663.1 287.9,664.4'},
  {id:'2',zone:'oceanside',maxLen:40,sqft:0,points:'306.4,624.5 288.0,664.5 298.3,664.6 316.2,660.2 333.3,619.8'},
  {id:'3',zone:'oceanside',maxLen:40,sqft:0,points:'361.9,614.7 333.2,619.4 316.2,660.4 344.9,654.6 362.0,615.4'},
  {id:'4',zone:'oceanside',maxLen:40,sqft:0,points:'390.4,609.2 362.6,614.1 344.6,654.8 372.8,649.1'},
  {id:'5',zone:'oceanside',maxLen:40,sqft:0,points:'418.7,604.0 390.5,609.1 372.8,649.5 403.0,642.9'},
  {id:'6',zone:'oceanside',maxLen:40,sqft:0,points:'447.0,599.3 418.9,604.3 402.9,642.7 430.6,637.4'},
  {id:'7',zone:'oceanside',maxLen:40,sqft:0,points:'475.0,594.0 447.0,598.8 430.4,637.8 459.5,631.5'},
  {id:'8',zone:'oceanside',maxLen:40,sqft:0,points:'503.2,589.0 474.8,593.9 459.6,632.1 487.7,626.5'},
  {id:'9',zone:'oceanside',maxLen:40,sqft:0,points:'529.7,584.5 503.7,588.9 487.2,626.8 515.1,621.1'},
  {id:'10',zone:'oceanside',maxLen:40,sqft:0,points:'555.8,584.7 543.6,616.6 515.3,621.3 530.2,584.5 535.3,583.1 543.3,582.0 548.4,582.0 552.6,583.1'},
  {id:'11',zone:'oceanside',maxLen:40,sqft:0,points:'309.2,574.0 299.4,574.7 295.3,576.1 291.5,578.2 286.9,580.9 283.4,583.5 280.2,587.2 276.6,593.1 275.4,596.0 274.9,599.4 274.8,602.9 275.7,605.6 277.7,609.2 280.1,611.0 284.3,612.9 291.8,613.7'},
  {id:'12',zone:'oceanside',maxLen:40,sqft:0,points:'337.3,569.5 309.2,574.0 291.8,612.7 298.8,613.4 321.3,609.1'},
  {id:'13',zone:'oceanside',maxLen:40,sqft:0,points:'365.6,564.5 336.9,569.2 320.7,609.1 348.6,604.0'},
  {id:'14',zone:'oceanside',maxLen:40,sqft:0,points:'392.7,559.9 365.8,564.5 347.9,603.8 376.3,598.8'},
  {id:'15',zone:'oceanside',maxLen:40,sqft:0,points:'405.0,593.7 376.6,598.6 392.6,559.4 421.2,554.3'},
  {id:'16',zone:'oceanside',maxLen:40,sqft:0,points:'448.4,550.2 421.4,554.7 404.4,593.5 433.8,587.9'},
  {id:'17',zone:'oceanside',maxLen:40,sqft:0,points:'476.4,545.8 448.7,549.9 433.8,587.8 462.3,582.8'},
  {id:'18',zone:'oceanside',maxLen:40,sqft:0,points:'489.5,578.2 461.6,582.9 477.0,545.2 504.2,540.9'},
  {id:'19',zone:'oceanside',maxLen:40,sqft:0,points:'530.4,537.1 504.3,541.2 489.6,578.3 516.7,573.5'},
  {id:'20',zone:'oceanside',maxLen:40,sqft:0,points:'556.0,543.2 545.2,568.9 517.0,573.3 530.9,537.0 535.0,536.0 542.4,535.3 545.8,535.8 549.8,536.7 552.8,538.8 554.8,541.2'},
  {id:'21',zone:'oceanside',maxLen:40,sqft:0,points:'518.3,489.5 548.2,515.0 546.2,517.8 543.0,520.1 526.7,523.1 494.1,493.4'},
  {id:'22',zone:'oceanside',maxLen:40,sqft:0,points:'525.9,522.8 498.8,527.0 466.9,497.2 493.6,493.1'},
  {id:'23',zone:'oceanside',maxLen:40,sqft:0,points:'498.7,526.9 472.6,531.4 439.5,501.6 467.0,497.3'},
  {id:'24',zone:'oceanside',maxLen:40,sqft:0,points:'412.5,505.7 445.9,536.2 472.8,531.6 439.4,501.4'},
  {id:'25',zone:'oceanside',maxLen:40,sqft:0,points:'445.7,536.0 412.2,505.4 386.2,509.7 417.9,540.5'},
  {id:'26',zone:'oceanside',maxLen:40,sqft:0,points:'418.3,540.4 390.6,545.4 359.1,513.8 386.2,509.7'},
  {id:'27',zone:'oceanside',maxLen:40,sqft:0,points:'390.3,545.2 363.7,549.5 330.6,518.5 359.4,514.1'},
  {id:'28',zone:'oceanside',maxLen:40,sqft:0,points:'363.6,549.7 336.7,554.5 304.7,522.6 330.7,518.7'},
  {id:'29',zone:'oceanside',maxLen:40,sqft:0,points:'337.0,554.3 298.9,561.7 294.5,561.8 291.8,561.8 289.2,561.7 284.3,560.8 282.2,560.4 279.5,558.9 277.4,557.1 275.1,554.1 274.0,550.3 274.1,548.4 274.5,546.4 275.1,543.8 276.6,540.0 279.1,536.2 283.9,530.9 287.6,527.8 295.0,524.5 299.2,523.3 305.1,522.5'},
  {id:'30',zone:'oceanside',maxLen:40,sqft:0,points:'461.0,642.6 430.5,648.9 413.8,687.9 445.6,681.7'},
  {id:'31',zone:'oceanside',maxLen:40,sqft:0,points:'490.4,636.6 461.2,642.6 445.2,681.7 474.8,675.3'},
  {id:'32',zone:'oceanside',maxLen:40,sqft:0,points:'520.4,630.5 490.8,636.8 474.7,675.5 504.6,669.1'},
  {id:'33',zone:'oceanside',maxLen:40,sqft:0,points:'548.6,624.9 520.5,630.5 504.7,669.4 534.4,663.7'},
  {id:'34',zone:'oceanside',maxLen:40,sqft:0,points:'569.5,618.8 566.2,620.6 563.6,621.5 557.1,623.1 553.1,623.7 548.9,624.5 534.4,663.7 573.4,655.2'},
  {id:'35',zone:'oceanside',maxLen:40,sqft:0,points:'578.2,598.4 578.1,603.2 577.5,606.9 576.4,610.4 574.2,614.3 571.3,617.2 569.4,618.6 572.9,655.4 602.3,650.2 618.4,646.8 628.5,644.0 625.3,622.2'},
  {id:'36',zone:'oceanside',maxLen:40,sqft:0,points:'575.4,573.7 578.0,598.1 625.3,622.3 622.0,598.0'},
  {id:'37',zone:'oceanside',maxLen:40,sqft:0,points:'572.7,550.2 574.9,573.6 622.1,598.0 619.2,574.4'},
  {id:'38',zone:'oceanside',maxLen:40,sqft:0,points:'570.3,525.9 572.3,550.2 619.3,574.7 616.3,550.8'},
  {id:'39',zone:'oceanside',maxLen:40,sqft:0,points:'567.9,502.6 570.1,525.8 616.3,550.7 613.6,527.4'},
  {id:'40',zone:'oceanside',maxLen:40,sqft:0,points:'565.6,477.2 567.6,502.3 613.9,527.6 611.4,503.5'},
  {id:'41',zone:'oceanside',maxLen:40,sqft:0,points:'563.5,452.6 565.4,478.0 611.1,503.6 608.5,478.8'},
  {id:'42',zone:'oceanside',maxLen:40,sqft:0,points:'217.9,629.4 230.9,627.6 237.9,624.5 242.9,621.1 246.2,618.3 248.8,614.6 251.2,609.7 251.3,602.9 250.6,597.4 248.5,593.9 244.5,589.9 240.1,588.6 234.0,587.5 229.6,587.8 186.3,597.4'},
  {id:'43',zone:'oceanside',maxLen:40,sqft:0,points:'158.0,602.8 186.1,597.1 217.9,628.9 191.3,635.1'},
  {id:'44',zone:'oceanside',maxLen:40,sqft:0,points:'130.5,608.7 158.0,602.6 191.0,635.0 161.6,641.2'},
  {id:'45',zone:'oceanside',maxLen:40,sqft:0,points:'103.3,614.3 129.8,608.2 162.8,641.2 133.9,646.8'},
  {id:'46',zone:'oceanside',maxLen:40,sqft:0,points:'74.4,619.9 102.8,613.8 134.4,646.7 105.9,652.7'},
  {id:'47',zone:'oceanside',maxLen:40,sqft:0,points:'231.8,574.2 246.6,567.6 254.1,560.9 259.5,551.5 258.9,543.9 256.1,537.3 250.3,534.2 246.2,533.1 240.5,532.7 199.4,541.4'},
  {id:'48',zone:'oceanside',maxLen:40,sqft:0,points:'170.9,548.1 202.1,580.3 228.9,575.7 232.0,573.9 199.7,541.4'},
  {id:'49',zone:'oceanside',maxLen:40,sqft:0,points:'171.5,548.5 145.0,552.8 175.0,584.9 201.5,579.8'},
  {id:'50',zone:'oceanside',maxLen:40,sqft:0,points:'145.3,553.2 117.8,558.4 147.1,590.8 174.8,585.0'},
  {id:'51',zone:'oceanside',maxLen:40,sqft:0,points:'117.7,558.6 88.1,562.7 119.2,596.0 146.7,590.6'},
  {id:'52',zone:'oceanside',maxLen:40,sqft:0,points:'88.7,562.4 50.4,566.4 46.1,568.3 43.0,570.4 40.8,572.9 39.0,576.1 36.5,580.1 36.4,585.5 36.4,589.8 37.8,594.9 40.2,598.6 42.9,601.9 46.9,605.0 52.3,607.5 56.9,608.2 63.3,608.4 71.3,607.0 119.5,596.7'},
  {id:'53',zone:'oceanside',maxLen:40,sqft:0,points:'45.2,625.4 78.1,659.2 106.3,653.2 73.9,619.8'},
  {id:'54',zone:'parkmod',maxLen:0,sqft:0,points:'161.2,656.1 186.7,650.2 206.7,669.3 189.7,684.2'},
  {id:'55',zone:'parkmod',maxLen:0,sqft:0,points:'69.2,675.9 95.1,701.8 130.1,698.9 99.2,669.1'},
  {id:'56',zone:'parkmod',maxLen:0,sqft:0,points:'40.8,684.7 59.7,704.5 95.4,702.0 69.3,676.1 42.1,683.0'},
  {id:'57',zone:'oceanside',maxLen:40,sqft:0,points:'171.9,715.7 194.6,718.7 204.9,730.2 200.0,733.6 194.0,736.0 188.6,737.9 182.6,739.5 177.4,740.7 172.2,741.9 164.8,742.0 157.3,742.3 148.1,742.0'},
  {id:'58',zone:'parkmod',maxLen:0,sqft:0,points:'189.1,696.5 149.3,741.3 115.5,738.8 157.9,698.0'},
  {id:'59',zone:'parkmod',maxLen:0,sqft:0,points:'124.6,699.7 87.4,736.9 115.2,738.8 157.5,698.6'},
  {id:'60',zone:'parkmod',maxLen:0,sqft:0,points:'123.4,700.5 90.6,701.8 58.4,734.8 87.7,737.7'},
  {id:'61',zone:'parkmod',maxLen:0,sqft:0,points:'59.7,704.2 90.3,702.3 58.8,734.5 47.6,734.2 43.9,733.9 41.0,732.9 37.8,731.8 34.0,728.1'},
  {id:'62',zone:'parkmod',maxLen:0,sqft:0,points:'41.0,684.4 35.0,688.5 33.3,690.9 32.4,724.7 34.2,728.6 59.9,704.3'},
  {id:'63',zone:'parkmod',maxLen:0,sqft:0,points:'80.1,748.7 94.3,776.9 116.5,767.8 107.9,751.8'},
  {id:'64',zone:'parkmod',maxLen:0,sqft:0,points:'52.2,745.0 71.7,783.1 92.7,773.8 79.8,748.2'},
  {id:'65',zone:'parkmod',maxLen:0,sqft:0,points:'31.9,752.8 42.1,776.0 63.4,767.0 52.6,745.1 43.3,743.8 40.4,744.4 37.6,745.9 35.3,748.1 33.0,751.0'},
  {id:'66',zone:'parkmod',maxLen:0,sqft:0,points:'31.6,780.5 31.8,801.2 71.6,782.8 63.1,766.9'},
  {id:'67',zone:'parkmod',maxLen:0,sqft:0,points:'130.7,806.5 122.4,836.1 145.3,836.8 146.1,823.3 148.1,817.1 151.5,806.3'},
  {id:'68',zone:'parkmod',maxLen:0,sqft:0,points:'113.8,794.8 85.2,816.7 98.9,831.0 131.0,806.3 116.9,794.2'},
  {id:'69',zone:'parkmod',maxLen:0,sqft:0,points:'89.1,777.7 86.5,794.7 117.4,794.5 118.3,777.8'},
  {id:'70',zone:'oceanside',maxLen:40,sqft:0,points:'43.1,488.8 38.7,542.6 41.4,549.1 44.1,551.6 50.2,553.4 55.2,553.2 59.2,552.2 63.6,549.7 68.2,546.8 73.2,540.5 75.7,535.7 77.4,530.2 78.0,515.6'},
  {id:'71',zone:'oceanside',maxLen:40,sqft:0,points:'45.8,460.5 43.2,488.5 77.6,515.2 79.2,485.5'},
  {id:'72',zone:'oceanside',maxLen:40,sqft:0,points:'48.3,433.0 46.1,460.7 79.5,487.1 80.7,458.8'},
  {id:'73',zone:'oceanside',maxLen:40,sqft:0,points:'51.3,404.2 48.3,432.7 81.6,459.2 83.4,431.3'},
  {id:'74',zone:'oceanside',maxLen:40,sqft:0,points:'54.7,375.5 51.6,404.6 83.8,431.0 86.2,402.4'},
  {id:'75',zone:'oceanside',maxLen:40,sqft:0,points:'58.1,347.6 55.1,375.1 86.0,402.6 88.3,374.2'},
  {id:'76',zone:'oceanside',maxLen:40,sqft:0,points:'61.4,319.6 58.3,347.3 88.6,374.0 91.7,346.7'},
  {id:'77',zone:'oceanside',maxLen:40,sqft:0,points:'65.2,289.8 61.4,319.2 90.9,346.5 95.1,317.3'},
  {id:'78',zone:'oceanside',maxLen:40,sqft:0,points:'68.9,263.3 65.8,290.1 94.5,317.3 97.4,289.5'},
  {id:'79',zone:'oceanside',maxLen:40,sqft:0,points:'73.3,236.3 68.7,263.5 97.3,289.8 101.0,262.1'},
  {id:'80',zone:'oceanside',maxLen:40,sqft:0,points:'77.3,205.7 73.3,235.8 101.1,262.1 104.7,231.8'},
  {id:'81',zone:'oceanside',maxLen:40,sqft:0,points:'81.5,179.0 77.8,206.1 104.5,231.4 108.4,206.1'},
  {id:'82',zone:'oceanside',maxLen:40,sqft:0,points:'81.6,179.8 83.7,164.1 89.1,157.2 94.0,154.1 98.0,153.2 104.2,153.3 110.1,155.2 113.7,159.2 114.0,163.2 108.4,206.7'},
  {id:'83',zone:'oceanside',maxLen:40,sqft:0,points:'94.5,486.1 90.8,537.9 92.8,542.1 96.0,544.2 100.7,545.4 114.1,543.2 120.3,540.1 126.0,533.4 127.1,509.5'},
  {id:'84',zone:'oceanside',maxLen:40,sqft:0,points:'96.2,458.5 94.6,485.8 127.3,509.8 128.3,482.3'},
  {id:'85',zone:'oceanside',maxLen:40,sqft:0,points:'98.5,431.1 96.7,459.2 128.5,482.1 130.1,454.8'},
  {id:'86',zone:'oceanside',maxLen:40,sqft:0,points:'101.1,402.3 98.6,431.1 130.4,455.1 131.9,427.0'},
  {id:'87',zone:'oceanside',maxLen:40,sqft:0,points:'103.8,374.0 101.1,402.7 131.9,427.1 135.1,398.9'},
  {id:'88',zone:'oceanside',maxLen:40,sqft:0,points:'106.3,347.3 104.4,374.0 134.7,398.9 136.5,372.4'},
  {id:'89',zone:'oceanside',maxLen:40,sqft:0,points:'109.3,317.6 106.6,347.3 136.6,372.3 139.4,343.6'},
  {id:'90',zone:'oceanside',maxLen:40,sqft:0,points:'112.7,290.1 109.8,317.6 139.6,344.0 142.4,316.4'},
  {id:'91',zone:'oceanside',maxLen:40,sqft:0,points:'115.9,263.3 112.5,289.9 141.6,316.1 145.0,289.0'},
  {id:'92',zone:'oceanside',maxLen:40,sqft:0,points:'119.2,235.5 116.1,263.0 145.5,289.8 147.7,261.1'},
  {id:'93',zone:'oceanside',maxLen:40,sqft:0,points:'122.9,208.0 119.2,235.8 148.0,261.7 150.8,233.9'},
  {id:'94',zone:'oceanside',maxLen:40,sqft:0,points:'125.7,183.3 122.7,207.7 151.5,234.9 153.6,209.9'},
  {id:'95',zone:'oceanside',maxLen:40,sqft:0,points:'132.6,156.9 128.8,162.6 126.0,183.6 153.8,210.2 157.5,182.1'},
  {id:'96',zone:'oceanside',maxLen:40,sqft:0,points:'132.3,156.6 135.4,153.0 141.5,150.9 145.8,150.7 151.8,151.2 155.5,152.4 158.6,153.9 161.3,157.6 157.6,181.7'},
  {id:'97',zone:'midpark',maxLen:55,sqft:0,points:'144.1,478.4 142.1,530.5 144.9,534.6 148.3,536.2 153.2,536.5 160.7,535.2 167.1,534.2 172.5,530.3 177.4,523.8 177.7,502.1'},
  {id:'98',zone:'midpark',maxLen:55,sqft:0,points:'146.2,451.5 144.3,478.9 177.3,502.1 178.3,474.1'},
  {id:'99',zone:'midpark',maxLen:55,sqft:0,points:'148.4,423.9 146.1,451.7 178.6,474.6 179.2,447.2'},
  {id:'100',zone:'midpark',maxLen:55,sqft:0,points:'150.2,395.8 148.3,424.2 179.9,448.0 181.8,419.6 149.0,395.8'},
  {id:'101',zone:'midpark',maxLen:55,sqft:0,points:'151.8,368.0 150.5,396.1 181.6,420.3 183.0,392.1 150.7,367.5'},
  {id:'102',zone:'midpark',maxLen:55,sqft:0,points:'154.6,340.5 152.3,368.1 183.5,392.2 185.4,366.1'},
  {id:'103',zone:'midpark',maxLen:55,sqft:0,points:'157.6,312.8 154.8,340.6 185.4,365.8 187.5,338.3'},
  {id:'104',zone:'midpark',maxLen:55,sqft:0,points:'160.1,284.9 157.6,313.1 187.3,338.1 189.7,310.3'},
  {id:'105',zone:'midpark',maxLen:55,sqft:0,points:'162.9,258.3 160.1,284.6 189.7,309.9 192.3,284.0'},
  {id:'106',zone:'midpark',maxLen:55,sqft:0,points:'165.9,230.3 162.8,258.6 192.2,284.3 194.6,255.0'},
  {id:'107',zone:'midpark',maxLen:55,sqft:0,points:'169.4,204.3 165.7,230.2 195.2,255.9 197.7,230.3'},
  {id:'108',zone:'midpark',maxLen:55,sqft:0,points:'171.9,179.8 169.0,204.2 197.8,230.3 200.2,206.1'},
  {id:'109',zone:'midpark',maxLen:55,sqft:0,points:'178.0,153.3 174.8,158.6 172.1,179.3 200.2,206.5 203.6,178.3'},
  {id:'110',zone:'midpark',maxLen:55,sqft:0,points:'177.9,153.2 181.6,149.2 187.2,147.5 191.8,147.3 198.4,148.6 201.2,149.8 204.2,151.2 206.7,155.1 203.7,178.6'},
  {id:'111',zone:'midpark',maxLen:55,sqft:0,points:'193.2,475.6 191.6,511.4 192.8,514.9 195.2,518.0 198.6,520.9 202.7,522.6 208.2,524.0 212.5,524.4 216.3,524.1 223.8,522.5 223.8,497.2'},
  {id:'112',zone:'midpark',maxLen:55,sqft:0,points:'194.4,448.7 193.4,475.9 223.5,497.8 224.3,471.2'},
  {id:'113',zone:'midpark',maxLen:55,sqft:0,points:'195.9,423.0 194.7,448.3 224.6,471.2 225.3,446.2'},
  {id:'114',zone:'midpark',maxLen:55,sqft:0,points:'197.4,398.1 195.9,423.3 225.3,446.3 226.1,420.8'},
  {id:'115',zone:'midpark',maxLen:55,sqft:0,points:'198.9,373.5 197.5,398.9 226.3,421.2 227.2,396.1'},
  {id:'116',zone:'midpark',maxLen:55,sqft:0,points:'200.8,349.2 198.9,372.7 227.7,396.4 228.3,371.2 199.4,348.3'},
  {id:'117',zone:'midpark',maxLen:55,sqft:0,points:'203.0,323.6 200.8,348.6 228.9,371.5 229.7,346.8'},
  {id:'118',zone:'midpark',maxLen:55,sqft:0,points:'205.1,298.3 202.7,323.2 229.9,346.8 231.5,321.9'},
  {id:'119',zone:'midpark',maxLen:55,sqft:0,points:'231.7,321.6 204.9,298.6 207.6,273.1 233.4,296.4'},
  {id:'120',zone:'midpark',maxLen:55,sqft:0,points:'209.9,248.2 207.4,273.4 233.3,296.9 235.5,271.0'},
  {id:'121',zone:'midpark',maxLen:55,sqft:0,points:'213.2,216.3 209.9,248.2 234.8,270.6 237.7,239.5'},
  {id:'122',zone:'midpark',maxLen:55,sqft:0,points:'216.9,181.6 213.3,216.1 237.7,240.0 241.0,206.1'},
  {id:'123',zone:'midpark',maxLen:55,sqft:0,points:'246.3,149.0 238.5,149.0 234.6,149.6 229.2,151.2 225.2,153.3 220.9,157.0 218.7,161.0 217.9,166.0 216.7,182.1 240.8,206.4'},
  {id:'124',zone:'midpark',maxLen:55,sqft:0,points:'225.2,456.8 223.7,492.6 255.2,471.8 255.3,439.4'},
  {id:'125',zone:'midpark',maxLen:55,sqft:0,points:'226.2,430.8 225.2,457.1 256.1,439.5 256.8,413.8'},
  {id:'126',zone:'midpark',maxLen:55,sqft:0,points:'226.9,403.5 225.9,431.3 257.0,413.8 257.5,386.5'},
  {id:'127',zone:'midpark',maxLen:55,sqft:0,points:'229.0,376.3 227.4,403.6 257.8,386.0 258.7,359.6'},
  {id:'128',zone:'midpark',maxLen:55,sqft:0,points:'230.2,351.1 228.6,376.6 259.5,359.0 260.1,334.6'},
  {id:'129',zone:'midpark',maxLen:55,sqft:0,points:'231.5,327.5 230.0,351.7 260.4,334.6 261.2,310.8'},
  {id:'130',zone:'midpark',maxLen:55,sqft:0,points:'233.3,301.6 231.7,327.5 262.0,311.1 263.5,285.2'},
  {id:'131',zone:'midpark',maxLen:55,sqft:0,points:'264.8,260.4 263.3,285.9 233.7,301.5 235.2,275.9'},
  {id:'132',zone:'midpark',maxLen:55,sqft:0,points:'237.1,253.8 234.9,276.3 265.1,260.4 266.3,238.6'},
  {id:'133',zone:'midpark',maxLen:55,sqft:0,points:'268.3,211.1 266.9,238.6 236.7,254.4 238.9,227.8'},
  {id:'134',zone:'midpark',maxLen:55,sqft:0,points:'242.0,195.6 238.9,228.3 268.8,211.6 271.4,179.3'},
  {id:'135',zone:'midpark',maxLen:55,sqft:0,points:'246.8,148.9 241.3,196.0 271.9,179.3 273.4,161.9 271.0,157.2 267.6,153.9 262.0,151.1 256.4,149.6 251.2,148.7'},
  {id:'136',zone:'midpark',maxLen:55,sqft:0,points:'274.2,377.9 272.7,421.4 286.1,425.3 306.0,426.2 306.4,402.3'},
  {id:'137',zone:'midpark',maxLen:55,sqft:0,points:'306.7,402.0 274.1,377.5 275.6,350.3 307.0,374.0'},
  {id:'138',zone:'midpark',maxLen:55,sqft:0,points:'276.9,328.2 275.8,349.6 307.0,373.4 307.9,352.1'},
  {id:'139',zone:'midpark',maxLen:55,sqft:0,points:'278.4,305.6 277.2,327.4 307.9,351.2 308.5,329.8'},
  {id:'140',zone:'midpark',maxLen:55,sqft:0,points:'279.9,278.4 278.5,305.1 308.9,329.2 310.1,303.0'},
  {id:'141',zone:'midpark',maxLen:55,sqft:0,points:'281.7,250.9 280.0,278.1 310.0,302.6 310.8,278.3'},
  {id:'142',zone:'midpark',maxLen:55,sqft:0,points:'287.9,175.4 285.8,199.6 314.5,225.2 316.3,197.8'},
  {id:'143',zone:'midpark',maxLen:55,sqft:0,points:'291.8,154.3 289.2,157.6 288.0,175.7 316.6,198.1 319.4,165.1 314.5,164.5 310.1,163.9 304.7,162.6 301.5,160.9 296.1,157.6'},
  {id:'144',zone:'midpark',maxLen:55,sqft:0,points:'306.1,480.5 306.0,488.8 326.3,503.4 329.2,502.3 332.2,500.3 334.1,498.8 336.2,496.3 337.6,494.0 338.5,491.9 339.4,489.2 339.6,487.9 323.6,475.7 319.4,479.5 305.7,479.3'},
  {id:'145',zone:'midpark',maxLen:55,sqft:0,points:'306.0,464.9 306.0,480.5 319.2,480.1 340.3,463.1 340.2,441.4'},
  {id:'146',zone:'midpark',maxLen:55,sqft:0,points:'307.2,408.6 306.9,426.1 332.1,425.2 340.6,423.1 340.3,385.9'},
  {id:'147',zone:'midpark',maxLen:55,sqft:0,points:'307.5,383.4 306.5,409.7 340.9,386.1 341.2,360.4'},
  {id:'148',zone:'midpark',maxLen:55,sqft:0,points:'341.7,333.6 341.3,360.3 307.4,383.2 308.1,356.4'},
  {id:'149',zone:'midpark',maxLen:55,sqft:0,points:'309.2,332.8 308.3,355.1 341.7,333.4 342.7,310.3'},
  {id:'150',zone:'midpark',maxLen:55,sqft:0,points:'310.2,305.2 309.1,332.8 342.7,309.9 343.4,282.9'},
  {id:'151',zone:'midpark',maxLen:55,sqft:0,points:'311.3,278.1 310.0,304.9 343.6,282.5 344.8,256.5'},
  {id:'152',zone:'midpark',maxLen:55,sqft:0,points:'312.3,251.5 311.5,277.3 345.0,256.0 346.0,231.6'},
  {id:'153',zone:'midpark',maxLen:55,sqft:0,points:'314.4,225.1 348.6,202.3 349.6,179.1 316.4,198.9'},
  {id:'154',zone:'midpark',maxLen:55,sqft:0,points:'319.8,165.0 317.0,198.3 349.8,178.9 350.8,161.5 349.6,159.3 346.5,160.6 343.6,161.5 340.9,162.2 337.8,162.8 333.8,163.7 330.1,164.3 327.3,164.8 324.3,164.8'},
  {id:'155',zone:'midpark',maxLen:55,sqft:0,points:'357.3,462.3 357.5,486.1 360.6,490.8 367.2,494.7 371.7,495.6 379.5,497.1 386.8,497.6 385.9,479.5'},
  {id:'156',zone:'midpark',maxLen:55,sqft:0,points:'357.2,438.7 357.3,461.3 386.0,479.2 385.3,456.8'},
  {id:'157',zone:'midpark',maxLen:55,sqft:0,points:'357.5,392.8 356.7,430.2 380.3,430.5 394.7,419.4'},
  {id:'158',zone:'midpark',maxLen:55,sqft:0,points:'357.5,369.9 357.5,393.1 394.3,418.7 394.0,394.6'},
  {id:'159',zone:'midpark',maxLen:55,sqft:0,points:'358.3,345.7 357.8,369.8 394.0,394.5 394.0,370.7'},
  {id:'160',zone:'midpark',maxLen:55,sqft:0,points:'359.2,320.2 358.7,345.7 393.9,370.3 393.7,345.8 358.3,319.7'},
  {id:'161',zone:'midpark',maxLen:55,sqft:0,points:'359.4,296.0 359.0,319.9 394.1,345.9 394.0,322.6'},
  {id:'162',zone:'midpark',maxLen:55,sqft:0,points:'360.4,273.0 359.7,295.7 394.2,323.2 394.9,299.5 359.3,272.2'},
  {id:'163',zone:'midpark',maxLen:55,sqft:0,points:'361.9,249.3 361.0,273.1 394.9,299.8 395.4,275.8'},
  {id:'164',zone:'midpark',maxLen:55,sqft:0,points:'362.8,225.1 361.8,249.1 395.2,275.9 395.7,252.3'},
  {id:'165',zone:'midpark',maxLen:55,sqft:0,points:'363.7,200.4 363.2,225.3 395.6,252.0 396.2,228.8'},
  {id:'166',zone:'midpark',maxLen:55,sqft:0,points:'365.7,178.6 364.0,200.8 396.1,229.1 397.6,201.1'},
  {id:'167',zone:'midpark',maxLen:55,sqft:0,points:'366.2,162.5 365.8,178.3 397.4,200.8 398.1,182.1'},
  {id:'168',zone:'midpark',maxLen:55,sqft:0,points:'371.7,149.3 367.8,153.0 366.2,156.6 366.1,162.1 398.1,181.8 398.6,159.9 392.2,159.4 386.6,158.2 383.8,157.4 380.4,155.8 375.8,153.5 373.9,151.8'},
  {id:'169',zone:'midpark',maxLen:55,sqft:0,points:'385.4,457.1 406.6,456.4 407.9,493.2 386.8,497.2'},
  {id:'170',zone:'midpark',maxLen:55,sqft:0,points:'407.4,476.0 408.1,493.7 414.0,493.0 419.5,491.2 424.8,488.5 430.4,483.8 433.2,477.7 433.8,472.4 432.7,458.8'},
  {id:'171',zone:'midpark',maxLen:55,sqft:0,points:'406.8,453.1 407.1,476.2 432.6,459.0 431.7,438.6'},
  {id:'172',zone:'midpark',maxLen:55,sqft:0,points:'394.1,394.4 394.1,419.6 409.1,429.9 431.4,414.2 430.7,370.0'},
  {id:'173',zone:'midpark',maxLen:55,sqft:0,points:'394.0,370.7 394.1,394.4 430.6,371.4 430.4,348.0'},
  {id:'174',zone:'midpark',maxLen:55,sqft:0,points:'430.5,323.0 394.3,345.8 394.1,370.1 430.3,347.5'},
  {id:'175',zone:'midpark',maxLen:55,sqft:0,points:'394.4,345.9 395.0,323.0 430.8,299.7 430.8,322.9'},
  {id:'176',zone:'midpark',maxLen:55,sqft:0,points:'395.2,299.4 394.3,323.0 430.7,299.2 431.2,276.9'},
  {id:'177',zone:'midpark',maxLen:55,sqft:0,points:'395.8,276.0 395.2,299.2 431.1,276.6 431.3,253.4'},
  {id:'178',zone:'midpark',maxLen:55,sqft:0,points:'395.8,252.6 395.7,275.8 431.7,252.6 432.0,229.4'},
  {id:'179',zone:'midpark',maxLen:55,sqft:0,points:'397.0,228.8 432.9,205.8 432.3,228.8 396.3,252.7'},
  {id:'180',zone:'midpark',maxLen:55,sqft:0,points:'397.6,200.8 396.7,228.2 432.9,205.8 433.5,179.0'},
  {id:'181',zone:'midpark',maxLen:55,sqft:0,points:'398.8,159.3 397.7,200.5 433.6,178.6 434.5,157.1 431.5,153.8 427.5,155.5 423.9,156.7 418.5,157.8 413.5,158.8 409.0,159.2 404.2,159.5 398.8,159.3'},
  {id:'182',zone:'midpark',maxLen:55,sqft:0,points:'448.6,447.4 449.8,476.2 451.5,479.4 452.9,481.1 454.7,482.4 456.7,483.7 460.3,485.0 463.6,484.7 468.7,484.4 472.9,483.2 478.4,481.7 483.7,479.0 487.8,472.7'},
  {id:'183',zone:'midpark',maxLen:55,sqft:0,points:'448.2,424.1 448.9,447.4 487.5,472.7 489.8,468.3 490.1,464.1 489.0,450.1'},
  {id:'184',zone:'midpark',maxLen:55,sqft:0,points:'447.4,400.9 448.1,424.1 489.0,450.1 487.9,427.8'},
  {id:'185',zone:'midpark',maxLen:55,sqft:0,points:'447.0,377.3 447.4,401.3 488.4,427.3 487.2,404.1 446.7,376.5'},
  {id:'186',zone:'midpark',maxLen:55,sqft:0,points:'446.4,354.2 447.0,376.8 487.5,404.3 486.4,381.5'},
  {id:'187',zone:'midpark',maxLen:55,sqft:0,points:'446.4,330.7 446.4,354.1 486.4,382.1 486.2,359.7'},
  {id:'188',zone:'midpark',maxLen:55,sqft:0,points:'446.3,308.2 446.3,330.8 486.2,359.7 485.7,337.1'},
  {id:'189',zone:'midpark',maxLen:55,sqft:0,points:'446.3,283.6 446.3,308.0 485.4,336.7 484.8,312.9'},
  {id:'190',zone:'midpark',maxLen:55,sqft:0,points:'446.6,260.4 446.3,283.5 484.6,312.7 484.4,290.1'},
  {id:'191',zone:'midpark',maxLen:55,sqft:0,points:'446.6,237.3 446.6,260.3 484.3,290.2 484.6,266.7'},
  {id:'192',zone:'midpark',maxLen:55,sqft:0,points:'446.9,212.0 446.6,237.2 484.6,267.1 484.1,242.4'},
  {id:'193',zone:'midpark',maxLen:55,sqft:0,points:'447.6,190.1 447.4,212.2 484.0,242.7 484.1,220.4'},
  {id:'194',zone:'midpark',maxLen:55,sqft:0,points:'448.3,166.4 447.5,189.7 484.3,220.3 484.2,196.9'},
  {id:'195',zone:'midpark',maxLen:55,sqft:0,points:'484.7,197.2 485.5,153.8 483.8,149.9 481.4,147.8 478.7,146.8 473.8,146.3 469.9,146.4 465.7,146.5 460.4,146.9 456.5,147.7 452.7,148.3 450.5,149.7 448.3,152.0 448.0,165.6'},
  {id:'196',zone:'midpark',maxLen:55,sqft:0,points:'505.7,445.2 506.9,467.2 509.4,471.4 513.4,474.2 517.8,475.6 522.4,475.9 529.0,475.2 533.4,474.5 538.7,472.6 544.6,468.7'},
  {id:'197',zone:'midpark',maxLen:55,sqft:0,points:'504.6,420.3 506.0,445.5 544.0,467.9 547.3,462.8 548.5,458.1 547.8,447.1'},
  {id:'198',zone:'midpark',maxLen:55,sqft:0,points:'503.6,398.7 504.3,419.8 547.5,447.0 545.4,425.6'},
  {id:'199',zone:'midpark',maxLen:55,sqft:0,points:'502.4,375.2 503.7,398.7 545.6,425.5 544.0,402.5 501.9,374.4'},
  {id:'200',zone:'midpark',maxLen:55,sqft:0,points:'501.8,352.6 502.5,375.2 544.1,402.8 542.6,379.9'},
  {id:'201',zone:'midpark',maxLen:55,sqft:0,points:'501.5,330.2 502.1,352.7 542.8,380.3 541.6,358.1'},
  {id:'202',zone:'midpark',maxLen:55,sqft:0,points:'500.4,306.5 501.2,329.9 541.6,358.3 540.8,335.4 500.2,305.7'},
  {id:'203',zone:'midpark',maxLen:55,sqft:0,points:'500.4,283.3 500.5,306.2 540.7,335.6 539.5,312.8'},
  {id:'204',zone:'midpark',maxLen:55,sqft:0,points:'500.1,261.1 500.6,283.3 539.9,312.8 538.9,287.8'},
  {id:'205',zone:'midpark',maxLen:55,sqft:0,points:'500.1,238.7 500.5,261.0 538.5,288.3 537.9,266.2'},
  {id:'206',zone:'midpark',maxLen:55,sqft:0,points:'500.1,214.4 500.2,238.9 538.0,266.3 537.2,242.0'},
  {id:'207',zone:'midpark',maxLen:55,sqft:0,points:'500.3,191.8 500.2,214.4 536.9,242.0 536.5,218.9'},
  {id:'208',zone:'midpark',maxLen:55,sqft:0,points:'500.1,169.6 500.3,191.6 536.6,218.9 536.1,197.0'},
  {id:'209',zone:'midpark',maxLen:55,sqft:0,points:'536.5,197.3 536.5,155.1 533.2,150.5 528.8,147.6 524.7,146.7 519.8,146.3 510.5,146.1 506.1,146.7 501.9,148.4 500.4,149.9 500.2,169.1'},
  {id:'210',zone:'midpark',maxLen:55,sqft:0,points:'561.5,427.8 563.2,451.9 608.9,478.9 606.6,454.4'},
  {id:'211',zone:'midpark',maxLen:55,sqft:0,points:'558.6,394.6 561.3,427.6 606.4,454.4 601.7,395.1'},
  {id:'212',zone:'midpark',maxLen:55,sqft:0,points:'45.7,625.8 42.1,627.2 38.7,629.5 36.4,631.7 34.9,634.4 32.8,639.1 31.3,644.2 30.8,650.7 30.9,655.2 32.2,660.1 34.4,663.2 37.3,664.7 41.1,665.9 46.6,666.5 52.3,665.6 78.1,659.1'},
  {id:'213',zone:'midpark',maxLen:55,sqft:0,points:'595.6,293.9 596.0,307.4 554.3,305.4 552.1,262.3 595.6,293.9'},
  {id:'214',zone:'midpark',maxLen:55,sqft:0,points:'595.6,293.6 594.6,270.4 551.2,237.6 552.1,261.5'},
  {id:'215',zone:'midpark',maxLen:55,sqft:0,points:'593.7,246.7 594.5,270.7 551.4,238.0 550.5,213.5'},
  {id:'216',zone:'midpark',maxLen:55,sqft:0,points:'592.5,225.4 594.0,246.9 550.7,213.3 550.5,192.4'},
  {id:'217',zone:'midpark',maxLen:55,sqft:0,points:'550.1,165.2 550.5,191.5 593.0,225.4 592.3,198.8'},
  {id:'218',zone:'midpark',maxLen:55,sqft:0,points:'591.7,144.7 593.0,198.8 550.1,164.1 550.1,158.9 551.1,154.1 552.8,150.3 556.0,147.0 558.5,145.9 562.6,145.1'},
  {id:'219',zone:'beachfront',maxLen:0,sqft:0,points:'104.7,93.3 77.6,93.6 70.2,135.9 97.4,135.6'},
  {id:'220',zone:'beachfront',maxLen:0,sqft:0,points:'127.6,92.8 105.0,93.3 97.6,135.0 121.2,134.5'},
  {id:'221',zone:'beachfront',maxLen:0,sqft:0,points:'151.4,92.1 128.2,92.1 120.9,134.1 145.0,134.1'},
  {id:'222',zone:'beachfront',maxLen:0,sqft:0,points:'151.7,91.8 145.3,134.1 169.4,133.5 175.2,91.1'},
  {id:'223',zone:'beachfront',maxLen:0,sqft:0,points:'198.3,91.1 175.2,91.1 169.6,132.9 193.8,132.5'},
  {id:'224',zone:'beachfront',maxLen:0,sqft:0,points:'238.2,90.2 233.0,131.9 212.9,132.5 218.5,90.2'},
  {id:'225',zone:'beachfront',maxLen:0,sqft:0,points:'238.0,90.0 232.7,131.4 253.0,131.6 257.8,90.2'},
  {id:'226',zone:'beachfront',maxLen:0,sqft:0,points:'258.0,90.2 278.4,90.0 273.5,131.3 253.0,131.1'},
  {id:'227',zone:'beachfront',maxLen:0,sqft:0,points:'278.7,89.9 300.4,90.3 295.5,130.8 273.7,131.6'},
  {id:'228',zone:'beachfront',maxLen:0,sqft:0,points:'317.0,90.9 313.0,130.5 334.1,130.5 337.5,90.8'},
  {id:'229',zone:'beachfront',maxLen:0,sqft:0,points:'337.1,90.0 357.2,90.6 353.6,130.0 333.8,130.4'},
  {id:'230',zone:'beachfront',maxLen:0,sqft:0,points:'357.4,90.7 353.4,129.8 373.8,129.7 377.2,91.0'},
  {id:'231',zone:'beachfront',maxLen:0,sqft:0,points:'377.2,90.5 373.7,129.6 394.5,129.2 397.6,91.0'},
  {id:'232',zone:'beachfront',maxLen:0,sqft:0,points:'415.0,91.0 412.6,129.2 434.0,129.4 436.5,91.3'},
  {id:'233',zone:'beachfront',maxLen:0,sqft:0,points:'436.4,91.4 455.7,91.7 453.6,129.5 434.3,129.5'},
  {id:'234',zone:'beachfront',maxLen:0,sqft:0,points:'455.9,91.5 474.1,91.3 472.6,129.8 454.1,129.8'},
  {id:'235',zone:'beachfront',maxLen:0,sqft:0,points:'474.2,91.4 493.1,91.5 492.6,129.4 472.7,129.4'},
  {id:'236',zone:'beachfront',maxLen:0,sqft:0,points:'510.5,93.0 509.5,130.8 535.3,130.6 536.0,93.3'},
  {id:'237',zone:'beachfront',maxLen:0,sqft:0,points:'536.2,93.6 535.3,130.4 564.5,129.7 564.7,94.2'},
  {id:'238',zone:'beachfront',maxLen:0,sqft:0,points:'565.0,93.8 564.9,129.8 590.0,129.7 589.7,94.0'},
  {id:'239',zone:'parkmod',maxLen:0,sqft:0,points:'255.8,754.2 232.9,785.2 199.1,761.8 227.2,734.5'},
  {id:'240',zone:'parkmod',maxLen:0,sqft:0,points:'238.5,723.1 264.2,740.7 270.4,734.5 280.2,726.2 256.5,703.3'},
  {id:'241',zone:'parkmod',maxLen:0,sqft:0,points:'256.5,703.1 270.9,691.5 275.0,689.4 283.4,685.8 296.6,714.8 280.2,726.2 255.3,702.9'},
  {id:'242',zone:'parkmod',maxLen:0,sqft:0,points:'341.1,667.8 293.2,678.2 305.4,712.6 324.4,707.2'},
  {id:'243',zone:'midpark',maxLen:55,sqft:0,points:'341.5,667.6 323.9,707.4 353.1,701.0 370.8,661.5'},
  {id:'244',zone:'midpark',maxLen:55,sqft:0,points:'401.0,655.3 371.0,661.1 352.8,701.3 384.6,694.4'},
  {id:'245',zone:'midpark',maxLen:55,sqft:0,points:'430.8,648.6 401.3,655.1 384.3,694.6 414.3,687.8'},
  {id:'246',zone:'parkmod',maxLen:0,sqft:0,points:'130.3,663.1 160.7,655.8 190.3,683.9 189.7,696.5 166.3,698.0'},
  {id:'247',zone:'parkmod',maxLen:0,sqft:0,points:'129.5,662.3 166.3,696.6 130.5,699.7 99.4,669.7'},
  {id:'248',zone:'midpark',maxLen:55,sqft:0,points:'224.0,492.8 223.2,522.0 228.9,520.9 237.1,518.5 244.5,515.2 248.8,512.3 251.8,508.9 254.7,503.6 256.1,499.4 255.2,471.6'},
  {id:'249',zone:'midpark',maxLen:55,sqft:0,points:'292.1,154.3 296.1,157.3 300.0,159.8 305.5,162.5 312.2,164.1 318.5,164.3 327.4,164.4 332.3,163.6 339.8,162.2 349.9,159.3 344.9,153.8 340.3,151.6 335.0,150.1 329.0,149.1 322.1,148.6 316.6,148.3 308.6,148.2 305.2,148.7 301.5,149.6 297.9,150.1 294.1,152.2'},
  {id:'250',zone:'midpark',maxLen:55,sqft:0,points:'371.3,149.3 374.8,147.4 380.3,146.3 385.3,146.4 409.3,146.4 415.4,147.2 423.8,149.4 431.8,153.5 429.6,154.5 425.6,155.7 419.5,157.2 415.3,158.2 409.8,158.8 403.8,159.2 395.7,159.1 390.5,158.3 384.0,157.2 377.5,154.1'},
]
const BOOKED = new Set(['219','225','81','108','121','134','149','168','3','15','29','44','211','177','200'])

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
    if(selected?.id===s.id) return 'rgba(93,184,168,0.85)'
    if(!searched) return 'transparent'
    if(st==='booked') return 'rgba(192,57,43,0.75)'
    if(s.zone==='parkmod') return hovered===s.id ? 'rgba(52,152,219,0.90)' : 'rgba(36,113,163,0.78)'
    if(hovered===s.id&&st==='available') return 'rgba(255,255,255,0.40)'
    if(st==='toolong') return 'rgba(230,126,34,0.78)'
    return 'rgba(39,174,96,0.72)'
  }

  const DISPLAY_W=620
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

      <div style={{display:'flex',flex:1,width:'100%',minWidth:900,overflowX:'auto'}}>

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
                    stroke={isSel?'#ffffff':searched?'rgba(255,255,255,0.6)':'transparent'}
                    strokeWidth={isSel?2:1}
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
