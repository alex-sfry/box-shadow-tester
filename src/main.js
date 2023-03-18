import './scss/styles.scss';

function shadowTester() {
    initShadowTester();

    function initShadowTester() {
        const addSet = document.querySelector('.wrapper__add-set');
        addSet.addEventListener('click', addNewInputSet);
        eListeners();
    }

    function eListeners() {
        const allInputSets = document.querySelectorAll('.input-wrapper');
        const lastInputSet = allInputSets[allInputSets.length - 1];
        const inputFields = lastInputSet.querySelectorAll('.input-div__input');
        const colorRgba = lastInputSet.querySelectorAll('.input-div__input-rgba');
        const firstButton = lastInputSet.querySelectorAll('.input-div__btn:first-child');
        const secondButton = lastInputSet.querySelectorAll('.input-div__btn:last-child');

        colorRgba.forEach(item => item.value = '');
        inputFields.forEach((item, index) => {
            index !== inputFields.length - 1 ? item.value = '0' : item.value = '';
        });

        inputFields.forEach(item => {
            item.addEventListener('input', () => {
                handleInput(item, allInputSets);
            });
        });

        colorRgba.forEach(item => {
            item.addEventListener('input', () => handleColor(colorRgba, lastInputSet));
        });

        firstButton.forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                e.target.nextElementSibling.value--;
                e.target.nextElementSibling.dispatchEvent(new Event('input'));
            });
        });

        secondButton.forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                e.target.previousElementSibling.value++;
                e.target.previousElementSibling.dispatchEvent(new Event('input'));
            });
        });
    }

    function addNewInputSet(e) {
        const newInputSet = document.querySelector('.input-wrapper').cloneNode(true);
        const newShadowBox = document.createElement("div");
        newShadowBox.classList.add('shadow-boxes__shadow-box');
        newShadowBox.classList.add('shadow-boxes__shadow-box_shadow-box-absolute');
        e.target.insertAdjacentElement('beforebegin', newInputSet);
        document.querySelector('.shadow-boxes__shadow-box').insertAdjacentElement('afterend', newShadowBox);
        const allInputSets = document.querySelectorAll('.input-wrapper');
        const lastInputSet = allInputSets[allInputSets.length - 1].querySelectorAll('.input-div__input');
        allInputSets[allInputSets.length - 1].querySelector('.color').style.background = 'none';

        lastInputSet.forEach((item, index) => {
            index !== lastInputSet.length - 1 ? item.value = '0' : null;
        });
        eListeners();
    }

    function handleColor(colorRgba, lastInputSet) {
        const hexColor = lastInputSet.querySelector('.input-container:last-child .input-div__input');
        const hexArr = [];

        colorRgba.forEach((item, index) => {
            const alphaChannel = item.value.slice(0, item.value.length - 1);
            const hexValue = rgbToHex(item, index, colorRgba, alphaChannel);

            if (index !== colorRgba.length - 1) {
                if (+item.value < 0 || +item.value > 255 || Number.isNaN(+item.value)) {
                    item.value = '';
                    hexColor.value = '';
                    return;
                }

                if (+item.value >= 0 && +item.value <= 255) {
                    hexValue.length === 1 ? hexArr.push('0' + hexValue) :
                        hexArr.push(hexValue);
                }
            } else if (!item.value.includes('%')) {
                +item.value > 0 && +item.value <= 1 ? hexArr.push(hexValue) : null;
            }

            if (item.value.includes('%') && item.value.slice(item.value.length - 1) === '%') {
                +alphaChannel >= 0 && +alphaChannel <= 100 ? hexArr.push(hexValue) :
                    null;
            }
        });

        hexColor.value = '#' + hexArr.join('');
        hexColor.dispatchEvent(new Event('input'));
    }

    function handleInput(inputItem, allInputSets) {
        const regExHex = new RegExp('^#(([0-9a-fA-F]{2}){3,4}|([0-9a-fA-F]){3,4})$');
        inputItem.classList.contains('input-div__input_hex-color') && regExHex.test(inputItem.value) ?
            inputItem.nextElementSibling.style.background = inputItem.value :
            null;

        allInputSets.forEach(set => {
            const inputFields = set.querySelectorAll('.input-div__input');

            if (!inputItem.classList.contains('input-div__input_hex-color')) {
                Number.isNaN(+inputItem.value) ? inputItem.value = '0' : null;
            }

            regExHex.test(inputFields[4].value) || inputFields[4].value === '' ?
                drawShadow(allInputSets) : null;
        });
    }

    function rgbToHex(item, index, colorRgba, alphaChannel) {
        if (index !== colorRgba.length - 1) return Number(item.value).toString(16);

        if (+item.value >= 0 && +item.value <= 1) {
            return Math.round((Number(item.value) * 255)).toString(16);
        }

        if (item.value.includes('%') && item.value.slice(item.value.length - 1) === '%') {
            return Math.round(Number(alphaChannel / 100) * 255).toString(16);
        }
    }

    function drawShadow(allInputSets) {
        const shadowBox = document.querySelectorAll('.shadow-boxes__shadow-box');

        allInputSets.forEach((item, index) => {
            const inputValues = item.querySelectorAll('.input-div__input');

            if (inputValues[4].value === '') return;
            shadowBox[index].style.boxShadow = `${+inputValues[0].value}px ${+inputValues[1].value}px 
                ${+inputValues[2].value}px ${+ inputValues[3].value}px ${inputValues[4].value}`;
        });
    }
}

shadowTester();