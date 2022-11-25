#iPad
[Demo](https://i-pad-blond.vercel.app/)

## JS로 각 프레임 위치 계산하기
```js
let x = 0
let y = 0
let frames = ''
for (let i = 0; i < 60; i += 1) {
  // frames += `${(100 / 60 * i).toFixed(2)}% { background-position: ${x}px ${y}px; }<br />` // HTML으로 출력!
  frames += `${(100 / 60 * i).toFixed(2)}% { background-position: ${x}${x === 0 ? '' : 'px'} ${y}${y === 0 ? '' : 'px'}; }\n`
  if (x <= -500) {
    x = 0
    y -= 100
    continue // 현재 반복을 종료하고 다음 반복으로 넘어가기!
  }
  x -= 100
}
// document.body.innerHTML = frames // HTML으로 출력!
console.log(frames)
```
