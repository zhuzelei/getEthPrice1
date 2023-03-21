const ethPrice = document.getElementById('ethPrice')

window.electronAPI.onNowEthPrice((_event, value) => {
    ethPrice.innerText = value
})