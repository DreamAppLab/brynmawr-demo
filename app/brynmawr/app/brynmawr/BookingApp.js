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
  {id:'1',zone:'oceanside',maxLen:40,sqft:0,points:'305.89,625.16 294.7,627.35 289.68,629.65 286.23,631.64 283.52,634.04 279.44,637.49 275.68,641.89 274.63,646.8 272.92,651.4 274.1,656.72 277.06,660.86 281.01,663.11 287.91,664.36'},
  {id:'2',zone:'oceanside',maxLen:40,sqft:0,points:'306.41,624.53 288.01,664.47 298.26,664.57 316.24,660.18 333.28,619.83'},
  {id:'3',zone:'oceanside',maxLen:40,sqft:0,points:'361.92,614.7 333.17,619.41 316.24,660.39 344.88,654.64 362.03,615.44'},
  {id:'4',zone:'oceanside',maxLen:40,sqft:0,points:'390.36,609.16 362.55,614.08 344.57,654.85 372.8,649.1'},
  {id:'5',zone:'oceanside',maxLen:40,sqft:0,points:'418.69,604.04 390.46,609.06 372.8,649.52 403.01,642.93'},
  {id:'6',zone:'oceanside',maxLen:40,sqft:0,points:'447.02,599.34 418.9,604.25 402.9,642.72 430.61,637.39'},
  {id:'7',zone:'oceanside',maxLen:40,sqft:0,points:'475.04,594.01 447.02,598.81 430.4,637.81 459.46,631.54'},
  {id:'8',zone:'oceanside',maxLen:40,sqft:0,points:'503.16,588.99 474.83,593.9 459.56,632.06 487.69,626.52'},
  {id:'9',zone:'oceanside',maxLen:40,sqft:0,points:'529.71,584.49 503.68,588.88 487.16,626.83 515.08,621.08'},
  {id:'10',zone:'oceanside',maxLen:40,sqft:0,points:'555.85,584.7 543.62,616.59 515.29,621.29 530.23,584.49 535.25,583.13 543.3,581.98 548.43,581.98 552.61,583.13'},
  {id:'11',zone:'oceanside',maxLen:40,sqft:0,points:'309.22,574.0 299.38,574.74 295.32,576.15 291.47,578.22 286.89,580.88 283.42,583.54 280.16,587.16 276.62,593.08 275.43,596.03 274.92,599.43 274.77,602.91 275.73,605.57 277.73,609.19 280.09,611.04 284.3,612.89 291.84,613.7'},
  {id:'12',zone:'oceanside',maxLen:40,sqft:0,points:'337.25,569.54 309.23,574.04 291.78,612.72 298.78,613.45 321.26,609.06'},
  {id:'13',zone:'oceanside',maxLen:40,sqft:0,points:'365.58,564.52 336.94,569.23 320.73,609.06 348.65,604.04'},
  {id:'14',zone:'oceanside',maxLen:40,sqft:0,points:'392.66,559.92 365.79,564.52 347.91,603.83 376.35,598.81'},
  {id:'15',zone:'oceanside',maxLen:40,sqft:0,points:'404.99,593.69 376.56,598.6 392.55,559.4 421.2,554.28'},
  {id:'16',zone:'oceanside',maxLen:40,sqft:0,points:'448.38,550.2 421.41,554.7 404.37,593.48 433.85,587.94'},
  {id:'17',zone:'oceanside',maxLen:40,sqft:0,points:'476.4,545.81 448.69,549.89 433.85,587.84 462.28,582.82'},
  {id:'18',zone:'oceanside',maxLen:40,sqft:0,points:'489.46,578.22 461.55,582.92 477.02,545.18 504.2,540.9'},
  {id:'19',zone:'oceanside',maxLen:40,sqft:0,points:'522.705,560.71 503.365,575.92 496.99,559.2449999999999 517.53,538.9649999999999'},
  {id:'20',zone:'oceanside',maxLen:40,sqft:0,points:'555.95,543.2 545.18,568.92 516.96,573.31 530.86,537.03 535.04,535.98 542.36,535.25 545.81,535.78 549.78,536.72 552.82,538.81 554.8,541.21'},
  {id:'21',zone:'oceanside',maxLen:40,sqft:0,points:'518.32,489.46 548.22,514.97 546.23,517.79 542.99,520.09 526.68,523.13 494.06,493.44'},
  {id:'22',zone:'oceanside',maxLen:40,sqft:0,points:'525.95,522.81 498.77,526.99 466.88,497.2 493.65,493.12'},
  {id:'23',zone:'oceanside',maxLen:40,sqft:0,points:'498.66,526.89 472.63,531.38 439.49,501.59 466.99,497.3'},
  {id:'24',zone:'oceanside',maxLen:40,sqft:0,points:'412.52,505.67 445.87,536.19 472.84,531.59 439.39,501.38'},
  {id:'25',zone:'oceanside',maxLen:40,sqft:0,points:'445.66,535.98 412.21,505.35 386.18,509.74 417.85,540.48'},
  {id:'26',zone:'oceanside',maxLen:40,sqft:0,points:'418.27,540.38 390.57,545.39 359.1,513.82 386.18,509.74'},
  {id:'27',zone:'oceanside',maxLen:40,sqft:0,points:'390.25,545.18 363.7,549.47 330.56,518.53 359.41,514.14'},
  {id:'28',zone:'oceanside',maxLen:40,sqft:0,points:'363.6,549.68 336.73,554.49 304.74,522.6 330.66,518.74'},
  {id:'29',zone:'oceanside',maxLen:40,sqft:0,points:'337.01,554.27 298.94,561.73 294.51,561.81 291.84,561.81 289.18,561.73 284.3,560.77 282.16,560.4 279.5,558.92 277.36,557.08 275.14,554.12 273.96,550.28 274.1,548.43 274.47,546.36 275.14,543.84 276.62,540.0 279.13,536.16 283.86,530.91 287.56,527.8 295.02,524.48 299.24,523.29 305.08,522.48'},
  {id:'30',zone:'oceanside',maxLen:40,sqft:0,points:'461.03,642.62 430.5,648.89 413.78,687.88 445.56,681.72'},
  {id:'31',zone:'oceanside',maxLen:40,sqft:0,points:'490.4,636.55 461.24,642.62 445.24,681.72 474.83,675.34'},
  {id:'32',zone:'oceanside',maxLen:40,sqft:0,points:'520.41,630.49 490.82,636.76 474.72,675.55 504.62,669.07'},
  {id:'33',zone:'oceanside',maxLen:40,sqft:0,points:'548.63,624.95 520.51,630.49 504.73,669.38 534.42,663.73'},
  {id:'34',zone:'oceanside',maxLen:40,sqft:0,points:'569.54,618.78 566.2,620.56 563.58,621.5 557.1,623.07 553.13,623.69 548.95,624.53 534.42,663.73 573.41,655.16'},
  {id:'35',zone:'oceanside',maxLen:40,sqft:0,points:'578.22,598.4 578.11,603.2 577.49,606.86 576.44,610.42 574.25,614.29 571.32,617.21 569.44,618.57 572.89,655.37 602.26,650.25 618.36,646.8 628.5,643.98 625.26,622.23'},
  {id:'36',zone:'oceanside',maxLen:40,sqft:0,points:'575.4,573.72 578.01,598.08 625.26,622.34 622.02,597.98'},
  {id:'37',zone:'oceanside',maxLen:40,sqft:0,points:'572.68,550.2 574.87,573.62 622.13,597.98 619.2,574.35'},
  {id:'38',zone:'oceanside',maxLen:40,sqft:0,points:'570.27,525.95 572.26,550.2 619.3,574.66 616.27,550.83'},
  {id:'39',zone:'oceanside',maxLen:40,sqft:0,points:'567.87,502.64 570.07,525.84 616.27,550.72 613.55,527.41'},
  {id:'40',zone:'oceanside',maxLen:40,sqft:0,points:'565.57,477.23 567.56,502.32 613.87,527.62 611.36,503.47'},
  {id:'41',zone:'oceanside',maxLen:40,sqft:0,points:'563.48,452.56 565.36,477.96 611.15,503.58 608.54,478.8'},
  {id:'42',zone:'oceanside',maxLen:40,sqft:0,points:'217.92,629.37 230.93,627.6 237.88,624.49 242.91,621.09 246.16,618.28 248.82,614.59 251.19,609.71 251.33,602.91 250.6,597.44 248.53,593.89 244.53,589.9 240.1,588.57 234.04,587.53 229.6,587.83 186.28,597.44'},
  {id:'43',zone:'oceanside',maxLen:40,sqft:0,points:'158.05,602.76 186.14,597.14 217.92,628.93 191.31,635.14'},
  {id:'44',zone:'oceanside',maxLen:40,sqft:0,points:'130.55,608.67 158.05,602.61 191.01,634.99 161.59,641.2'},
  {id:'45',zone:'oceanside',maxLen:40,sqft:0,points:'103.34,614.29 129.81,608.23 162.78,641.2 133.95,646.82'},
  {id:'46',zone:'oceanside',maxLen:40,sqft:0,points:'74.37,619.91 102.75,613.85 134.39,646.67 105.86,652.73'},
  {id:'47',zone:'oceanside',maxLen:40,sqft:0,points:'231.82,574.23 246.6,567.57 254.14,560.92 259.47,551.46 258.88,543.92 256.07,537.27 250.3,534.16 246.16,533.13 240.54,532.68 199.44,541.41'},
  {id:'48',zone:'oceanside',maxLen:40,sqft:0,points:'170.91,548.06 202.1,580.29 228.86,575.7 231.97,573.93 199.74,541.41'},
  {id:'49',zone:'oceanside',maxLen:40,sqft:0,points:'171.5,548.5 145.04,552.79 175.05,584.87 201.51,579.84'},
  {id:'50',zone:'oceanside',maxLen:40,sqft:0,points:'145.33,553.23 117.83,558.41 147.1,590.78 174.75,585.02'},
  {id:'51',zone:'oceanside',maxLen:40,sqft:0,points:'117.68,558.55 88.12,562.69 119.16,595.96 146.66,590.64'},
  {id:'52',zone:'oceanside',maxLen:40,sqft:0,points:'88.71,562.4 50.41,566.39 46.13,568.31 43.02,570.38 40.8,572.9 39.03,576.15 36.52,580.14 36.37,585.46 36.37,589.75 37.85,594.92 40.21,598.62 42.87,601.87 46.87,604.98 52.34,607.49 56.92,608.23 63.28,608.38 71.26,607.05 119.46,596.7'},
  {id:'53',zone:'oceanside',maxLen:40,sqft:0,points:'45.24,625.38 78.06,659.24 106.3,653.18 73.92,619.76'},
  {id:'54',zone:'parkmod',maxLen:0,sqft:400,points:'161.15,656.13 186.73,650.22 206.69,669.29 189.68,684.22'},
  {id:'55',zone:'parkmod',maxLen:0,sqft:400,points:'69.19,675.94 95.06,701.82 130.1,698.86 99.2,669.14'},
  {id:'56',zone:'parkmod',maxLen:0,sqft:400,points:'40.8,684.67 59.73,704.48 95.36,701.96 69.34,676.09 42.14,683.04'},
  {id:'57',zone:'oceanside',maxLen:40,sqft:0,points:'171.94,715.71 194.56,718.67 204.91,730.2 200.03,733.6 193.97,735.97 188.65,737.89 182.59,739.52 177.41,740.7 172.24,741.88 164.85,742.03 157.31,742.33 148.14,742.03'},
  {id:'58',zone:'parkmod',maxLen:0,sqft:400,points:'189.09,696.49 149.32,741.29 115.47,738.78 157.9,697.97'},
  {id:'59',zone:'parkmod',maxLen:0,sqft:400,points:'124.63,699.75 87.38,736.85 115.17,738.78 157.45,698.56'},
  {id:'60',zone:'parkmod',maxLen:0,sqft:400,points:'123.45,700.49 90.63,701.82 58.4,734.79 87.67,737.74'},
  {id:'61',zone:'parkmod',maxLen:0,sqft:400,points:'59.73,704.18 90.33,702.26 58.84,734.49 47.61,734.19 43.91,733.9 40.95,732.86 37.85,731.83 34.0,728.13'},
  {id:'62',zone:'parkmod',maxLen:0,sqft:400,points:'40.95,684.37 35.04,688.51 33.26,690.88 32.38,724.73 34.15,728.58 59.88,704.33'},
  {id:'63',zone:'parkmod',maxLen:0,sqft:400,points:'80.13,748.68 94.32,776.92 116.5,767.75 107.93,751.79'},
  {id:'64',zone:'parkmod',maxLen:0,sqft:400,points:'52.19,744.99 71.7,783.13 92.7,773.82 79.84,748.24'},
  {id:'65',zone:'parkmod',maxLen:0,sqft:400,points:'31.93,752.82 42.14,776.03 63.43,767.02 52.63,745.13 43.32,743.8 40.36,744.39 37.55,745.87 35.33,748.09 32.97,751.05'},
  {id:'66',zone:'parkmod',maxLen:0,sqft:400,points:'31.64,780.47 31.79,801.17 71.56,782.83 63.13,766.87'},
  {id:'67',zone:'parkmod',maxLen:0,sqft:400,points:'130.69,806.49 122.41,836.06 145.33,836.8 146.07,823.34 148.14,817.13 151.54,806.34'},
  {id:'68',zone:'parkmod',maxLen:0,sqft:400,points:'113.84,794.81 85.16,816.69 98.91,831.03 130.99,806.34 116.94,794.22'},
  {id:'69',zone:'parkmod',maxLen:0,sqft:400,points:'89.15,777.66 86.49,794.66 117.39,794.51 118.28,777.81'},
  {id:'70',zone:'oceanside',maxLen:40,sqft:0,points:'43.07,488.84 38.68,542.57 41.4,549.05 44.12,551.56 50.18,553.44 55.2,553.23 59.17,552.19 63.56,549.68 68.16,546.75 73.18,540.48 75.69,535.67 77.36,530.23 77.99,515.6'},
  {id:'71',zone:'oceanside',maxLen:40,sqft:0,points:'45.83,460.53 43.17,488.48 77.62,515.24 79.24,485.52'},
  {id:'72',zone:'oceanside',maxLen:40,sqft:0,points:'48.35,433.04 46.13,460.68 79.54,487.15 80.72,458.76'},
  {id:'73',zone:'oceanside',maxLen:40,sqft:0,points:'51.3,404.21 48.35,432.74 81.61,459.2 83.38,431.26'},
  {id:'74',zone:'oceanside',maxLen:40,sqft:0,points:'54.7,375.52 51.6,404.65 83.83,430.97 86.19,402.43'},
  {id:'75',zone:'oceanside',maxLen:40,sqft:0,points:'58.1,347.58 55.15,375.08 86.05,402.58 88.26,374.19'},
  {id:'76',zone:'oceanside',maxLen:40,sqft:0,points:'61.36,319.64 58.25,347.29 88.56,374.05 91.66,346.69'},
  {id:'77',zone:'oceanside',maxLen:40,sqft:0,points:'65.2,289.77 61.36,319.2 90.92,346.55 95.06,317.27'},
  {id:'78',zone:'oceanside',maxLen:40,sqft:0,points:'68.9,263.31 65.79,290.07 94.47,317.27 97.43,289.48'},
  {id:'79',zone:'oceanside',maxLen:40,sqft:0,points:'73.33,236.25 68.75,263.46 97.28,289.77 100.98,262.13'},
  {id:'80',zone:'oceanside',maxLen:40,sqft:0,points:'77.32,205.65 73.33,235.81 101.13,262.13 104.67,231.82'},
  {id:'81',zone:'oceanside',maxLen:40,sqft:0,points:'81.46,179.04 77.77,206.09 104.53,231.38 108.37,206.09'},
  {id:'82',zone:'oceanside',maxLen:40,sqft:0,points:'81.61,179.78 83.68,164.11 89.15,157.16 94.03,154.05 98.02,153.17 104.23,153.31 110.14,155.24 113.69,159.23 113.99,163.22 108.37,206.69'},
  {id:'83',zone:'oceanside',maxLen:40,sqft:0,points:'94.47,486.11 90.78,537.86 92.85,542.14 95.95,544.21 100.68,545.4 114.14,543.18 120.35,540.07 125.96,533.42 127.15,509.47'},
  {id:'84',zone:'oceanside',maxLen:40,sqft:0,points:'96.25,458.46 94.62,485.82 127.29,509.77 128.33,482.27'},
  {id:'85',zone:'oceanside',maxLen:40,sqft:0,points:'98.46,431.11 96.69,459.2 128.48,482.12 130.1,454.77'},
  {id:'86',zone:'oceanside',maxLen:40,sqft:0,points:'101.13,402.28 98.61,431.11 130.4,455.06 131.88,426.97'},
  {id:'87',zone:'oceanside',maxLen:40,sqft:0,points:'103.79,374.05 101.13,402.73 131.88,427.12 135.13,398.88'},
  {id:'88',zone:'oceanside',maxLen:40,sqft:0,points:'106.3,347.29 104.38,374.05 134.69,398.88 136.46,372.42'},
  {id:'89',zone:'oceanside',maxLen:40,sqft:0,points:'109.26,317.57 106.6,347.29 136.61,372.27 139.42,343.59'},
  {id:'90',zone:'oceanside',maxLen:40,sqft:0,points:'112.66,290.07 109.85,317.57 139.56,344.03 142.37,316.39'},
  {id:'91',zone:'oceanside',maxLen:40,sqft:0,points:'115.91,263.31 112.51,289.92 141.63,316.09 145.04,289.04'},
  {id:'92',zone:'oceanside',maxLen:40,sqft:0,points:'119.16,235.52 116.06,263.01 145.48,289.77 147.7,261.09'},
  {id:'93',zone:'oceanside',maxLen:40,sqft:0,points:'122.86,208.02 119.16,235.81 147.99,261.68 150.8,233.89'},
  {id:'94',zone:'oceanside',maxLen:40,sqft:0,points:'125.67,183.33 122.71,207.72 151.54,234.92 153.61,209.94'},
  {id:'95',zone:'oceanside',maxLen:40,sqft:0,points:'132.62,156.86 128.77,162.63 125.96,183.62 153.76,210.23 157.45,182.14'},
  {id:'96',zone:'oceanside',maxLen:40,sqft:0,points:'132.32,156.57 135.43,153.02 141.49,150.95 145.77,150.65 151.84,151.24 155.53,152.43 158.64,153.91 161.3,157.6 157.6,181.7'},
  {id:'97',zone:'midpark',maxLen:55,sqft:0,points:'144.15,478.42 142.08,530.46 144.89,534.6 148.29,536.23 153.17,536.53 160.71,535.2 167.06,534.16 172.53,530.32 177.41,523.81 177.71,502.08'},
  {id:'98',zone:'midpark',maxLen:55,sqft:0,points:'146.22,451.52 144.3,478.87 177.27,502.08 178.3,474.14'},
  {id:'99',zone:'midpark',maxLen:55,sqft:0,points:'148.44,423.87 146.07,451.66 178.6,474.58 179.19,447.23'},
  {id:'100',zone:'midpark',maxLen:55,sqft:0,points:'150.21,395.78 148.29,424.16 179.93,447.97 181.85,419.58 149.03,395.78'},
  {id:'101',zone:'midpark',maxLen:55,sqft:0,points:'151.84,367.98 150.51,396.07 181.55,420.32 183.03,392.08 150.65,367.54'},
  {id:'102',zone:'midpark',maxLen:55,sqft:0,points:'154.64,340.48 152.28,368.13 183.47,392.23 185.4,366.06'},
  {id:'103',zone:'midpark',maxLen:55,sqft:0,points:'157.6,312.84 154.79,340.63 185.4,365.77 187.47,338.27'},
  {id:'104',zone:'midpark',maxLen:55,sqft:0,points:'160.12,284.9 157.6,313.13 187.32,338.12 189.68,310.32'},
  {id:'105',zone:'midpark',maxLen:55,sqft:0,points:'162.92,258.28 160.12,284.6 189.68,309.88 192.35,284.01'},
  {id:'106',zone:'midpark',maxLen:55,sqft:0,points:'165.88,230.34 162.78,258.58 192.2,284.3 194.56,255.03'},
  {id:'107',zone:'midpark',maxLen:55,sqft:0,points:'169.43,204.32 165.73,230.19 195.15,255.92 197.67,230.34'},
  {id:'108',zone:'midpark',maxLen:55,sqft:0,points:'171.94,179.78 168.99,204.17 197.82,230.34 200.18,206.09'},
  {id:'109',zone:'midpark',maxLen:55,sqft:0,points:'178.0,153.31 174.75,158.64 172.09,179.33 200.18,206.54 203.58,178.3'},
  {id:'110',zone:'midpark',maxLen:55,sqft:0,points:'177.86,153.17 181.55,149.17 187.17,147.55 191.75,147.25 198.41,148.58 201.22,149.77 204.17,151.24 206.69,155.09 203.73,178.6'},
  {id:'111',zone:'midpark',maxLen:55,sqft:0,points:'193.23,475.61 191.61,511.39 192.79,514.94 195.15,518.05 198.55,520.85 202.69,522.63 208.16,523.96 212.45,524.4 216.3,524.11 223.84,522.48 223.84,497.2'},
  {id:'112',zone:'midpark',maxLen:55,sqft:0,points:'194.41,448.71 193.38,475.91 223.54,497.79 224.28,471.18'},
  {id:'113',zone:'midpark',maxLen:55,sqft:0,points:'195.89,422.98 194.71,448.26 224.58,471.18 225.31,446.19'},
  {id:'114',zone:'midpark',maxLen:55,sqft:0,points:'197.37,398.14 195.89,423.28 225.31,446.34 226.05,420.76'},
  {id:'115',zone:'midpark',maxLen:55,sqft:0,points:'198.85,373.45 197.52,398.88 226.35,421.21 227.24,396.07'},
  {id:'116',zone:'midpark',maxLen:55,sqft:0,points:'200.77,349.21 198.85,372.71 227.68,396.37 228.27,371.24 199.44,348.32'},
  {id:'117',zone:'midpark',maxLen:55,sqft:0,points:'202.99,323.63 200.77,348.62 228.86,371.53 229.75,346.84'},
  {id:'118',zone:'midpark',maxLen:55,sqft:0,points:'205.06,298.35 202.69,323.19 229.9,346.84 231.52,321.86'},
  {id:'119',zone:'midpark',maxLen:55,sqft:0,points:'231.67,321.56 204.91,298.65 207.57,273.07 233.45,296.43'},
  {id:'120',zone:'midpark',maxLen:55,sqft:0,points:'209.94,248.23 207.43,273.36 233.3,296.87 235.52,271.0'},
  {id:'121',zone:'midpark',maxLen:55,sqft:0,points:'213.19,216.3 209.94,248.23 234.78,270.55 237.73,239.51'},
  {id:'122',zone:'midpark',maxLen:55,sqft:0,points:'216.89,181.55 213.34,216.15 237.73,239.95 240.99,206.09'},
  {id:'123',zone:'midpark',maxLen:55,sqft:0,points:'246.31,149.03 238.47,149.03 234.63,149.62 229.16,151.24 225.17,153.31 220.88,157.01 218.66,161.0 217.92,166.03 216.74,182.14 240.84,206.39'},
  {id:'124',zone:'midpark',maxLen:55,sqft:0,points:'225.17,456.84 223.69,492.62 255.18,471.77 255.33,439.39'},
  {id:'125',zone:'midpark',maxLen:55,sqft:0,points:'226.2,430.82 225.17,457.13 256.07,439.54 256.81,413.82'},
  {id:'126',zone:'midpark',maxLen:55,sqft:0,points:'226.94,403.47 225.91,431.26 256.95,413.82 257.54,386.46'},
  {id:'127',zone:'midpark',maxLen:55,sqft:0,points:'229.01,376.26 227.38,403.61 257.84,386.02 258.73,359.56'},
  {id:'128',zone:'midpark',maxLen:55,sqft:0,points:'230.19,351.13 228.57,376.56 259.47,358.97 260.06,334.57'},
  {id:'129',zone:'midpark',maxLen:55,sqft:0,points:'231.52,327.47 230.05,351.72 260.35,334.57 261.24,310.77'},
  {id:'130',zone:'midpark',maxLen:55,sqft:0,points:'233.3,301.6 231.67,327.47 261.98,311.06 263.46,285.19'},
  {id:'131',zone:'midpark',maxLen:55,sqft:0,points:'264.79,260.35 263.31,285.93 233.74,301.45 235.22,275.88'},
  {id:'132',zone:'midpark',maxLen:55,sqft:0,points:'237.14,253.85 234.92,276.32 265.08,260.35 266.27,238.62'},
  {id:'133',zone:'midpark',maxLen:55,sqft:0,points:'268.34,211.12 266.86,238.62 236.7,254.44 238.92,227.83'},
  {id:'134',zone:'midpark',maxLen:55,sqft:0,points:'242.02,195.6 238.92,228.27 268.78,211.56 271.44,179.33'},
  {id:'135',zone:'midpark',maxLen:55,sqft:0,points:'246.75,148.88 241.28,196.04 271.89,179.33 273.36,161.89 271.0,157.16 267.6,153.91 261.98,151.1 256.36,149.62 251.19,148.73'},
  {id:'136',zone:'midpark',maxLen:55,sqft:0,points:'274.21,377.92 272.75,421.41 286.13,425.28 305.99,426.22 306.41,402.28'},
  {id:'137',zone:'midpark',maxLen:55,sqft:0,points:'306.72,401.96 274.11,377.5 275.57,350.32 307.04,374.05'},
  {id:'138',zone:'midpark',maxLen:55,sqft:0,points:'276.93,328.16 275.78,349.59 307.04,373.42 307.87,352.1'},
  {id:'139',zone:'midpark',maxLen:55,sqft:0,points:'278.39,305.57 277.24,327.42 307.87,351.16 308.5,329.83'},
  {id:'140',zone:'midpark',maxLen:55,sqft:0,points:'279.86,278.39 278.5,305.05 308.92,329.2 310.07,302.96'},
  {id:'141',zone:'midpark',maxLen:55,sqft:0,points:'281.74,250.9 279.96,278.08 309.97,302.65 310.8,278.29'},
  {id:'142',zone:'midpark',maxLen:55,sqft:0,points:'287.91,175.42 285.82,199.57 314.46,225.18 316.34,197.79'},
  {id:'143',zone:'midpark',maxLen:55,sqft:0,points:'291.78,154.3 289.16,157.65 288.01,175.73 316.55,198.11 319.37,165.07 314.46,164.55 310.07,163.92 304.74,162.56 301.5,160.89 296.06,157.65'},
  {id:'144',zone:'midpark',maxLen:55,sqft:0,points:'306.11,480.49 305.96,488.77 326.29,503.41 329.17,502.3 332.21,500.3 334.13,498.75 336.2,496.31 337.6,494.02 338.49,491.88 339.38,489.22 339.6,487.89 323.63,475.69 319.42,479.46 305.67,479.31'},
  {id:'145',zone:'midpark',maxLen:55,sqft:0,points:'305.96,464.9 305.96,480.49 319.2,480.12 340.26,463.12 340.19,441.39'},
  {id:'146',zone:'midpark',maxLen:55,sqft:0,points:'307.22,408.64 306.92,426.09 332.06,425.2 340.63,423.13 340.34,385.87'},
  {id:'147',zone:'midpark',maxLen:55,sqft:0,points:'307.46,383.35 306.52,409.7 340.91,386.07 341.22,360.35'},
  {id:'148',zone:'midpark',maxLen:55,sqft:0,points:'341.75,333.59 341.33,360.25 307.35,383.25 308.08,356.38'},
  {id:'149',zone:'midpark',maxLen:55,sqft:0,points:'309.23,332.76 308.29,355.13 341.75,333.38 342.69,310.28'},
  {id:'150',zone:'midpark',maxLen:55,sqft:0,points:'310.17,305.16 309.13,332.76 342.69,309.86 343.42,282.89'},
  {id:'151',zone:'midpark',maxLen:55,sqft:0,points:'311.32,278.08 309.97,304.95 343.63,282.47 344.78,256.54'},
  {id:'152',zone:'midpark',maxLen:55,sqft:0,points:'312.27,251.53 311.53,277.35 344.99,256.02 346.03,231.56'},
  {id:'153',zone:'midpark',maxLen:55,sqft:0,points:'314.36,225.08 348.65,202.29 349.59,179.08 316.45,198.94'},
  {id:'154',zone:'midpark',maxLen:55,sqft:0,points:'319.79,164.97 316.97,198.32 349.8,178.87 350.84,161.52 349.59,159.32 346.45,160.58 343.63,161.52 340.91,162.25 337.77,162.77 333.8,163.71 330.14,164.34 327.32,164.76 324.29,164.76'},
  {id:'155',zone:'midpark',maxLen:55,sqft:0,points:'357.34,462.31 357.49,486.11 360.59,490.84 367.24,494.69 371.68,495.57 379.52,497.05 386.76,497.64 385.87,479.46'},
  {id:'156',zone:'midpark',maxLen:55,sqft:0,points:'357.19,438.65 357.34,461.27 386.02,479.16 385.28,456.84'},
  {id:'157',zone:'midpark',maxLen:55,sqft:0,points:'357.53,392.76 356.7,430.19 380.32,430.5 394.75,419.42'},
  {id:'158',zone:'midpark',maxLen:55,sqft:0,points:'357.53,369.87 357.53,393.08 394.33,418.69 394.02,394.64'},
  {id:'159',zone:'midpark',maxLen:55,sqft:0,points:'358.26,345.72 357.85,369.76 394.02,394.54 394.02,370.7'},
  {id:'160',zone:'midpark',maxLen:55,sqft:0,points:'359.2,320.21 358.68,345.72 393.91,370.29 393.7,345.82 358.26,319.69'},
  {id:'161',zone:'midpark',maxLen:55,sqft:0,points:'359.41,295.96 359.0,319.9 394.12,345.93 394.02,322.62'},
  {id:'162',zone:'midpark',maxLen:55,sqft:0,points:'360.35,272.96 359.73,295.75 394.23,323.24 394.85,299.51 359.31,272.23'},
  {id:'163',zone:'midpark',maxLen:55,sqft:0,points:'361.92,249.33 360.98,273.06 394.85,299.83 395.38,275.78'},
  {id:'164',zone:'midpark',maxLen:55,sqft:0,points:'362.76,225.08 361.82,249.12 395.17,275.89 395.69,252.26'},
  {id:'165',zone:'midpark',maxLen:55,sqft:0,points:'363.7,200.41 363.18,225.29 395.59,252.05 396.21,228.84'},
  {id:'166',zone:'midpark',maxLen:55,sqft:0,points:'365.69,178.56 364.01,200.82 396.11,229.05 397.57,201.14'},
  {id:'167',zone:'midpark',maxLen:55,sqft:0,points:'366.21,162.46 365.79,178.35 397.36,200.82 398.09,182.11'},
  {id:'168',zone:'midpark',maxLen:55,sqft:0,points:'371.75,149.29 367.78,153.05 366.21,156.6 366.1,162.14 398.09,181.8 398.62,159.95 392.24,159.43 386.59,158.17 383.77,157.44 380.43,155.77 375.83,153.47 373.95,151.79'},
  {id:'169',zone:'midpark',maxLen:55,sqft:0,points:'385.43,457.13 406.57,456.39 407.9,493.21 386.76,497.2'},
  {id:'170',zone:'midpark',maxLen:55,sqft:0,points:'407.4,475.98 408.13,493.75 413.98,493.02 419.53,491.24 424.75,488.52 430.4,483.82 433.22,477.65 433.85,472.42 432.7,458.83'},
  {id:'171',zone:'midpark',maxLen:55,sqft:0,points:'406.77,453.08 407.08,476.19 432.59,459.04 431.65,438.55'},
  {id:'172',zone:'midpark',maxLen:55,sqft:0,points:'394.12,394.44 394.12,419.63 409.07,429.87 431.44,414.19 430.71,369.97'},
  {id:'173',zone:'midpark',maxLen:55,sqft:0,points:'394.02,370.7 394.12,394.44 430.61,371.44 430.4,348.02'},
  {id:'174',zone:'midpark',maxLen:55,sqft:0,points:'430.5,323.03 394.33,345.82 394.12,370.08 430.29,347.5'},
  {id:'175',zone:'midpark',maxLen:55,sqft:0,points:'394.44,345.93 394.96,323.03 430.82,299.72 430.82,322.93'},
  {id:'176',zone:'midpark',maxLen:55,sqft:0,points:'395.17,299.41 394.33,323.03 430.71,299.2 431.23,276.93'},
  {id:'177',zone:'midpark',maxLen:55,sqft:0,points:'395.79,275.99 395.17,299.2 431.13,276.62 431.34,253.41'},
  {id:'178',zone:'midpark',maxLen:55,sqft:0,points:'395.79,252.57 395.69,275.78 431.65,252.57 431.97,229.36'},
  {id:'179',zone:'midpark',maxLen:55,sqft:0,points:'397.05,228.84 432.91,205.84 432.28,228.84 396.32,252.68'},
  {id:'180',zone:'midpark',maxLen:55,sqft:0,points:'397.57,200.82 396.74,228.21 432.91,205.84 433.53,178.98'},
  {id:'181',zone:'midpark',maxLen:55,sqft:0,points:'398.83,159.32 397.68,200.51 433.64,178.56 434.47,157.13 431.55,153.78 427.47,155.45 423.92,156.71 418.48,157.75 413.46,158.8 408.97,159.22 404.16,159.53 398.83,159.32'},
  {id:'182',zone:'midpark',maxLen:55,sqft:0,points:'448.59,447.44 449.84,476.19 451.51,479.43 452.87,481.1 454.65,482.35 456.74,483.71 460.3,484.97 463.64,484.65 468.66,484.45 472.95,483.19 478.38,481.73 483.71,479.01 487.79,472.74'},
  {id:'183',zone:'midpark',maxLen:55,sqft:0,points:'448.17,424.13 448.9,447.44 487.48,472.74 489.78,468.35 490.09,464.06 489.05,450.05'},
  {id:'184',zone:'midpark',maxLen:55,sqft:0,points:'447.44,400.92 448.07,424.13 489.05,450.05 487.9,427.78'},
  {id:'185',zone:'midpark',maxLen:55,sqft:0,points:'447.02,377.29 447.44,401.34 488.42,427.26 487.16,404.05 446.71,376.45'},
  {id:'186',zone:'midpark',maxLen:55,sqft:0,points:'446.39,354.19 447.02,376.77 487.48,404.26 486.43,381.47'},
  {id:'187',zone:'midpark',maxLen:55,sqft:0,points:'446.39,330.66 446.39,354.08 486.43,382.1 486.22,359.73'},
  {id:'188',zone:'midpark',maxLen:55,sqft:0,points:'446.29,308.19 446.29,330.77 486.22,359.73 485.7,337.15'},
  {id:'189',zone:'midpark',maxLen:55,sqft:0,points:'446.29,283.62 446.29,307.98 485.39,336.73 484.76,312.89'},
  {id:'190',zone:'midpark',maxLen:55,sqft:0,points:'446.6,260.41 446.29,283.52 484.55,312.68 484.45,290.1'},
  {id:'191',zone:'midpark',maxLen:55,sqft:0,points:'446.6,237.31 446.6,260.31 484.34,290.21 484.55,266.69'},
  {id:'192',zone:'midpark',maxLen:55,sqft:0,points:'446.92,212.01 446.6,237.2 484.55,267.1 484.13,242.43'},
  {id:'193',zone:'midpark',maxLen:55,sqft:0,points:'447.65,190.06 447.44,212.22 484.03,242.75 484.13,220.37'},
  {id:'194',zone:'midpark',maxLen:55,sqft:0,points:'448.27,166.43 447.54,189.74 484.34,220.27 484.24,196.85'},
  {id:'195',zone:'midpark',maxLen:55,sqft:0,points:'484.65,197.17 485.49,153.78 483.82,149.91 481.41,147.82 478.7,146.78 473.78,146.25 469.91,146.36 465.73,146.46 460.4,146.88 456.53,147.72 452.66,148.34 450.47,149.7 448.27,152.0 447.96,165.59'},
  {id:'196',zone:'midpark',maxLen:55,sqft:0,points:'505.67,445.24 506.92,467.2 509.43,471.38 513.4,474.2 517.79,475.56 522.39,475.87 528.98,475.25 533.37,474.51 538.7,472.63 544.56,468.66'},
  {id:'197',zone:'midpark',maxLen:55,sqft:0,points:'504.62,420.26 505.98,445.45 544.03,467.93 547.28,462.81 548.53,458.1 547.8,447.12'},
  {id:'198',zone:'midpark',maxLen:55,sqft:0,points:'503.58,398.72 504.31,419.84 547.48,447.02 545.39,425.59'},
  {id:'199',zone:'midpark',maxLen:55,sqft:0,points:'502.43,375.2 503.68,398.72 545.6,425.48 544.03,402.48 501.9,374.36'},
  {id:'200',zone:'midpark',maxLen:55,sqft:0,points:'501.8,352.62 502.53,375.2 544.14,402.8 542.57,379.9'},
  {id:'201',zone:'midpark',maxLen:55,sqft:0,points:'501.49,330.25 502.11,352.72 542.78,380.32 541.63,358.05'},
  {id:'202',zone:'midpark',maxLen:55,sqft:0,points:'500.44,306.52 501.17,329.93 541.63,358.26 540.79,335.37 500.23,305.68'},
  {id:'203',zone:'midpark',maxLen:55,sqft:0,points:'500.44,283.31 500.54,306.2 540.69,335.58 539.54,312.79'},
  {id:'204',zone:'midpark',maxLen:55,sqft:0,points:'500.13,261.14 500.65,283.31 539.85,312.79 538.91,287.8'},
  {id:'205',zone:'midpark',maxLen:55,sqft:0,points:'500.13,238.67 500.54,261.04 538.49,288.33 537.87,266.16'},
  {id:'206',zone:'midpark',maxLen:55,sqft:0,points:'500.13,214.41 500.23,238.88 537.97,266.27 537.24,242.01'},
  {id:'207',zone:'midpark',maxLen:55,sqft:0,points:'500.34,191.83 500.23,214.41 536.93,242.01 536.51,218.91'},
  {id:'208',zone:'midpark',maxLen:55,sqft:0,points:'500.13,169.57 500.34,191.62 536.61,218.91 536.09,196.96'},
  {id:'209',zone:'midpark',maxLen:55,sqft:0,points:'536.51,197.27 536.51,155.14 533.16,150.54 528.77,147.61 524.69,146.67 519.78,146.25 510.48,146.15 506.09,146.67 501.9,148.45 500.44,149.91 500.23,169.15'},
  {id:'210',zone:'midpark',maxLen:55,sqft:0,points:'561.49,427.78 563.17,451.93 608.85,478.9 606.55,454.44'},
  {id:'211',zone:'midpark',maxLen:55,sqft:0,points:'558.57,394.64 561.28,427.57 606.45,454.44 601.74,395.06'},
  {id:'212',zone:'midpark',maxLen:55,sqft:0,points:'45.68,625.82 42.14,627.15 38.74,629.52 36.37,631.74 34.89,634.4 32.82,639.13 31.34,644.16 30.75,650.66 30.9,655.25 32.23,660.12 34.45,663.23 37.26,664.71 41.1,665.89 46.57,666.48 52.34,665.59 78.06,659.09'},
  {id:'213',zone:'midpark',maxLen:55,sqft:0,points:'595.57,293.87 595.99,307.35 554.28,305.37 552.08,262.29 595.57,293.87'},
  {id:'214',zone:'midpark',maxLen:55,sqft:0,points:'595.57,293.55 594.63,270.45 551.25,237.62 552.08,261.46'},
  {id:'215',zone:'midpark',maxLen:55,sqft:0,points:'593.69,246.72 594.53,270.66 551.35,238.04 550.52,213.47'},
  {id:'216',zone:'midpark',maxLen:55,sqft:0,points:'592.54,225.39 594.01,246.93 550.72,213.26 550.52,192.36'},
  {id:'217',zone:'midpark',maxLen:55,sqft:0,points:'550.1,165.18 550.52,191.52 592.96,225.39 592.33,198.84'},
  {id:'218',zone:'midpark',maxLen:55,sqft:0,points:'591.71,144.69 592.96,198.84 550.1,164.13 550.1,158.9 551.14,154.09 552.82,150.33 555.95,146.99 558.46,145.94 562.64,145.1'},
  {id:'219',zone:'beachfront',maxLen:0,sqft:0,points:'104.67,93.29 77.62,93.59 70.23,135.87 97.43,135.57'},
  {id:'220',zone:'beachfront',maxLen:0,sqft:0,points:'127.59,92.85 104.97,93.29 97.58,134.98 121.23,134.54'},
  {id:'221',zone:'beachfront',maxLen:0,sqft:0,points:'151.39,92.11 128.18,92.11 120.94,134.09 145.04,134.09'},
  {id:'222',zone:'beachfront',maxLen:0,sqft:0,points:'151.69,91.81 145.33,134.09 169.43,133.5 175.2,91.07'},
  {id:'223',zone:'beachfront',maxLen:0,sqft:0,points:'198.26,91.07 175.2,91.07 169.58,132.91 193.82,132.47'},
  {id:'224',zone:'beachfront',maxLen:0,sqft:0,points:'238.18,90.18 233.0,131.88 212.9,132.47 218.51,90.18'},
  {id:'225',zone:'beachfront',maxLen:0,sqft:0,points:'238.03,90.04 232.71,131.43 252.96,131.58 257.84,90.18'},
  {id:'226',zone:'beachfront',maxLen:0,sqft:0,points:'257.99,90.18 278.39,90.04 273.51,131.29 252.96,131.14'},
  {id:'227',zone:'beachfront',maxLen:0,sqft:0,points:'278.69,89.89 300.42,90.33 295.54,130.84 273.66,131.58'},
  {id:'228',zone:'beachfront',maxLen:0,sqft:0,points:'316.98,90.92 312.99,130.55 334.13,130.55 337.53,90.78'},
  {id:'229',zone:'beachfront',maxLen:0,sqft:0,points:'337.08,90.04 357.19,90.63 353.64,129.95 333.83,130.4'},
  {id:'230',zone:'beachfront',maxLen:0,sqft:0,points:'357.43,90.74 353.35,129.84 373.84,129.74 377.19,90.95'},
  {id:'231',zone:'beachfront',maxLen:0,sqft:0,points:'377.19,90.53 373.74,129.63 394.54,129.21 397.57,90.95'},
  {id:'232',zone:'beachfront',maxLen:0,sqft:0,points:'415.03,90.95 412.63,129.21 433.95,129.42 436.46,91.26'},
  {id:'233',zone:'beachfront',maxLen:0,sqft:0,points:'436.36,91.37 455.7,91.68 453.61,129.53 434.27,129.53'},
  {id:'234',zone:'beachfront',maxLen:0,sqft:0,points:'455.91,91.47 474.1,91.26 472.63,129.84 454.13,129.84'},
  {id:'235',zone:'beachfront',maxLen:0,sqft:0,points:'474.2,91.37 493.12,91.47 492.6,129.42 472.74,129.42'},
  {id:'236',zone:'beachfront',maxLen:0,sqft:0,points:'510.48,93.04 509.54,130.78 535.25,130.57 535.98,93.25'},
  {id:'237',zone:'beachfront',maxLen:0,sqft:0,points:'536.19,93.56 535.25,130.36 564.52,129.74 564.73,94.19'},
  {id:'238',zone:'beachfront',maxLen:0,sqft:0,points:'565.05,93.77 564.94,129.84 590.03,129.74 589.72,93.98'},
  {id:'239',zone:'parkmod',maxLen:0,sqft:400,points:'255.77,754.15 232.85,785.2 199.15,761.84 227.24,734.49'},
  {id:'240',zone:'parkmod',maxLen:0,sqft:400,points:'238.47,723.11 264.2,740.7 270.41,734.49 280.16,726.21 256.51,703.29'},
  {id:'241',zone:'parkmod',maxLen:0,sqft:400,points:'256.51,703.15 270.85,691.47 274.99,689.4 283.42,685.85 296.58,714.83 280.16,726.21 255.33,702.85'},
  {id:'242',zone:'parkmod',maxLen:0,sqft:400,points:'341.12,667.81 293.24,678.16 305.37,712.56 324.39,707.22'},
  {id:'243',zone:'midpark',maxLen:55,sqft:0,points:'341.54,667.6 323.87,707.43 353.14,700.95 370.81,661.54'},
  {id:'244',zone:'midpark',maxLen:55,sqft:0,points:'401.02,655.27 371.02,661.12 352.83,701.26 384.61,694.37'},
  {id:'245',zone:'midpark',maxLen:55,sqft:0,points:'430.82,648.58 401.34,655.06 384.29,694.57 414.3,687.78'},
  {id:'246',zone:'parkmod',maxLen:0,sqft:400,points:'130.25,663.08 160.71,655.84 190.28,683.93 189.68,696.49 166.32,697.97'},
  {id:'247',zone:'parkmod',maxLen:0,sqft:400,points:'129.51,662.34 166.32,696.64 130.55,699.75 99.35,669.73'},
  {id:'248',zone:'midpark',maxLen:55,sqft:0,points:'223.98,492.76 223.24,522.04 228.86,520.85 237.14,518.49 244.53,515.24 248.82,512.28 251.78,508.88 254.74,503.56 256.07,499.42 255.18,471.62'},
  {id:'249',zone:'midpark',maxLen:55,sqft:0,points:'292.09,154.3 296.06,157.34 300.03,159.84 305.47,162.46 312.16,164.13 318.54,164.34 327.42,164.44 332.34,163.61 339.76,162.25 349.9,159.32 344.88,153.78 340.28,151.59 334.95,150.12 328.99,149.08 322.09,148.55 316.55,148.34 308.61,148.24 305.16,148.66 301.5,149.6 297.94,150.12 294.08,152.21'},
  {id:'250',zone:'midpark',maxLen:55,sqft:0,points:'371.33,149.29 374.78,147.4 380.32,146.25 385.34,146.36 409.28,146.36 415.45,147.19 423.81,149.39 431.76,153.47 429.56,154.51 425.59,155.66 419.53,157.23 415.34,158.17 409.8,158.8 403.84,159.22 395.69,159.11 390.46,158.28 383.98,157.23 377.5,154.09'},
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
    if(selected?.id===s.id) return 'rgba(93,184,168,0.60)'
    if(!searched) return 'transparent'
    if(st==='booked') return 'rgba(192,57,43,0.58)'
    if(s.zone==='parkmod') return hovered===s.id ? 'rgba(52,152,219,0.80)' : 'rgba(36,113,163,0.62)'
    if(hovered===s.id&&st==='available') return 'rgba(255,255,255,0.22)'
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
