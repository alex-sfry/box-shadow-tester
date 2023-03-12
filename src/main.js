import './css/styles.css';

//rgb color must be converted to hex ---> use 'convert' button
//alpha channel for rgb ---> use values between 0 and 1 or 100%, 50%, 0% etc
function shadowTester() {
    initShadowTester();

    function initShadowTester() {
        const inputFields = document.querySelectorAll('.input');
        const secondButton = document.querySelectorAll('.btn:last-child');

        inputFields.forEach((item, index) => index !== inputFields.length - 1 ? item.value = '0' : null)
        inputFields.forEach((item, index) => item.addEventListener('input', () => handleInput(item, index, inputFields)))
        document.querySelectorAll('.btn:first-child').forEach(item => {
            item.addEventListener('click', (e) => {
                e.target.nextElementSibling.value--;
                e.target.nextElementSibling.dispatchEvent(new Event('input'));
            })
        })
        secondButton.forEach((item, index) => {
            index !== secondButton.length - 1 ?
                item.addEventListener('click', (e) => {
                    e.target.previousElementSibling.value++;
                    e.target.previousElementSibling.dispatchEvent(new Event('input'));
                }) : item.addEventListener('click', convertColor)
        })
    }


    function convertColor() {
        const colorRgba = document.querySelectorAll('.input-rgba');
        const hexColor = document.querySelector('.input-container:last-child .input');
        const hexArr = [];

        colorRgba.forEach((item, index) => {
            const alphaChannel = item.value.slice(0, item.value.length - 1);
            const hexValue = rgbToHex(item, index, colorRgba, alphaChannel);

            if (index !== colorRgba.length - 1) {
                if (+item.value >= 0 && +item.value <= 255) {
                    hexValue.length === 1 ? hexArr.push('0' + hexValue) :
                        hexArr.push(hexValue)
                }
            } else if (!item.value.includes('%')) {
                +item.value >= 0 && +item.value <= 1 ?
                    hexArr.push(hexValue) :
                    null;
            }
            if (item.value.includes('%') && item.value.slice(item.value.length - 1) === '%') {
                +alphaChannel >= 0 && +alphaChannel <= 100 ? hexArr.push(hexValue) :
                    null
            }
        })
        hexColor.value = '#' + hexArr.join('')
        hexColor.dispatchEvent(new Event('input'))
    }

    function handleInput(item, index, inputFields) {
        const regExHex = new RegExp('^#(([0-9a-fA-F]{2}){3,4}|([0-9a-fA-F]){3,4})$');
        const shadowBox = document.querySelector('.shadow-box');
        if (index !== inputFields.length - 1) {
            Number.isNaN(+item.value) ? item.value = '0' : null
        } else document.querySelector('.color').style.background = item.value

        regExHex.test(inputFields[4].value) ?
            shadowBox.style.boxShadow =
            `${+inputFields[0].value}px ${+inputFields[1].value}px ${+inputFields[2].value}px ${+inputFields[3].value}px ${inputFields[4].value}` :
            shadowBox.style.boxShadow = '0 0 0'
    }

    function rgbToHex(item, index, colorRgba, alphaChannel) {
        if (index !== colorRgba.length - 1) return Number(item.value).toString(16);
        if (+item.value >= 0 && +item.value <= 1) return Math.round((Number(item.value) * 255)).toString(16);
        //if (+item.value >= 0 && +item.value <= 1) return Math.round((Number(item.value)*255)).toString(16);
        if (item.value.includes('%') && item.value.slice(item.value.length - 1) === '%') {
            return (Number(alphaChannel) / 100 * 255).toString(16);
        }
    }
}

shadowTester();