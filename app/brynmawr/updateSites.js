const fs = require('fs')

function poly(rx, lx, trY, h=26, dy=-23) {
  const tlY = trY - dy
  return `${lx},${tlY} ${rx},${trY} ${rx},${trY+h} ${lx},${tlY+h}`
}

const H = 26
const COLS = [
  ['sea_fan_a',  47,  14,  226, [82,81,80,79,78,77,76,75,74,73,72,71,70], 'oceanside', 40],
  ['sea_fan_b',  89,  56,  206, [95,94,93,92,91,90,89,88,87,86,85,84,83], 'oceanside', 40],
  ['sea_gull_a', 131, 98,  186, [110,109,108,107,106,105,104,103,102,101,100,99,98,97], 'midpark', 55],
  ['sea_gull_b', 173, 140, 166, [123,122,121,120,119,118,117,116,115,114,113,112,111], 'midpark', 55],
  ['sea_horse_a',215, 182, 146, [135,134,133,132,131,130,129,128,127,126,125,124], 'midpark', 55],
  ['sea_horse_b',340, 307, 126, [249,250,154,153,152,151,150,149,148,147,146,145,144,143,142,141,140], 'midpark', 55],
  ['sea_jetty_a',382, 349, 106, [168,167,166,165,164,163,162,161,160,159,158,157,156,155], 'midpark', 55],
  ['sea_jetty_b',424, 391, 86,  [181,180,179,178,177,176,175,174,173,172,171,170,169], 'midpark', 55],
  ['sea_anch_a', 466, 433, 86,  [195,194,193,192,191,190,189,188,187,186,185,184,183,182], 'midpark', 55],
  ['sea_anch_b', 508, 475, 86,  [209,208,207,206,205,204,203,202,201,200,199,198,197,196], 'midpark', 50],
  ['sea_nettle',  550, 517, 86, [218,217,216,215,214,213], 'oceanside', 40],
  ['sea_nettle_b',550, 517, 252,[211,210,41,40,39,38,37,36,35,34], 'oceanside', 40],
]

const lines = []

for (const [, rx, lx, topY, sites, zone, maxLen] of COLS) {
  sites.forEach((sid, i) => {
    const trY = topY + i * H
    lines.push(`  {id:'${sid}',zone:'${zone}',maxLen:${maxLen},sqft:0,points:'${poly(rx,lx,trY)}'},`)
  })
}

const BF = [219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238]
BF.forEach((sid, i) => {
  const lx = 22 + i*26, rx = lx+24
  lines.push(`  {id:'${sid}',zone:'beachfront',maxLen:0,sqft:0,points:'${lx},96 ${rx},96 ${rx+3},28 ${lx+3},28'},`)
})

const LRX=264, LRS=34, LRW=32, LRH=17
const lowerRows = [
  [490,[29,28,27,26,25,24,23,22,21,20],'oceanside',40],
  [509,[11,12,13,14,15,16,17,18,19],'oceanside',38],
  [530,[42,43,44,45,46,47,48,49,50,51],'oceanside',38],
  [549,[1,2,3,4,5,6,7,8,9,10],'oceanside',35],
  [570,[31,32,33,34],'oceanside',35],
]
for (const [rowY, slist, zone, maxLen] of lowerRows) {
  slist.forEach((sid, i) => {
    const x = LRX + i*LRS
    lines.push(`  {id:'${sid}',zone:'${zone}',maxLen:${maxLen},sqft:0,points:'${x},${rowY} ${x+LRW},${rowY} ${x+LRW},${rowY+LRH} ${x},${rowY+LRH}'},`)
  })
}
lines.push(`  {id:'30',zone:'oceanside',maxLen:35,sqft:0,points:'264,570 296,570 296,587 264,587'},`)

const leftLower = [
  [490,[52,51,50,49,48],'oceanside',38,180],
  [509,[53,46,45,44,43],'oceanside',38,180],
  [530,[54,212,55],'oceanside',35,112],
]
for (const [rowY, slist, zone, maxLen, startX] of leftLower) {
  slist.forEach((sid, i) => {
    const x = startX - i*LRS
    lines.push(`  {id:'${sid}',zone:'${zone}',maxLen:${maxLen},sqft:0,points:'${x},${rowY} ${x+LRW},${rowY} ${x+LRW},${rowY+LRH} ${x},${rowY+LRH}'},`)
  })
}

const shell = [
  [628,[62,61,60,59,58,57,56],'oceanside',35,44],
  [650,[246,247,248,241,242,243,244,245],'oceanside',30,44],
  [674,[63,64,65,66,67,68,69],'oceanside',35,44],
  [698,[239,240],'oceanside',30,44],
]
for (const [rowY, slist, zone, maxLen, sx] of shell) {
  slist.forEach((sid, i) => {
    const x = sx + i*40
    lines.push(`  {id:'${sid}',zone:'${zone}',maxLen:${maxLen},sqft:0,points:'${x},${rowY} ${x+36},${rowY} ${x+36},${rowY+18} ${x},${rowY+18}'},`)
  })
}

const pm = [['PM1',310,704,50,30,400],['PM2',364,704,50,30,500],['PM3',418,704,50,30,400],['PM4',310,738,50,30,400],['PM5',364,738,50,30,500],['PM6',418,738,50,30,400]]
for (const [sid,x,y,w,h,sqft] of pm) {
  lines.push(`  {id:'${sid}',zone:'parkmod',maxLen:0,sqft:${sqft},points:'${x},${y} ${x+w},${y} ${x+w},${y+h} ${x},${y+h}'},`)
}

const newSites = `const SITES = [\n${lines.join('\n')}\n]`

let content = fs.readFileSync('app/brynmawr/BookingApp.js', 'utf8')
const start = content.indexOf('const SITES = [')
const end = content.indexOf('\nconst BOOKED', start)
content = content.slice(0, start) + newSites + content.slice(end)
fs.writeFileSync('app/brynmawr/BookingApp.js', content)
console.log('Done! File length:', content.length)
console.log('Site 147 check:', content.includes('307,383 340,360 340,386 307,409'))
