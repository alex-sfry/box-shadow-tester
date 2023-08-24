import './scss/styles.scss';

function initShadowTester() {
    const wrapperDiv = document.querySelector('.wrapper');
    resetInputFields();
    addInputEvents();

    wrapperDiv.addEventListener('click', (e) => {
        switch (e.target.className) {
            case 'input-div__btn':
                handleClick(e.target);
                break;

            case 'wrapper__add-set' || 'checkbox-div__checkbox':
                addNewInputSet(e);
                break;

            case 'checkbox-div__checkbox':
                handleInput(e.target);
                break;

            default: return;
        }
    });

    function handleClick(eTarget) {
        const nextSibling = eTarget.nextElementSibling;
        const prevSibling = eTarget.previousElementSibling;

        if (nextSibling && nextSibling.classList.contains('input-div__input')) {
            if (nextSibling.classList.contains('input-div__input_not-negative') &&
                +nextSibling.value === 0) {
                return;
            }

            nextSibling.value--;
            nextSibling.dispatchEvent(new Event('input'));
        }

        if (prevSibling && prevSibling.classList.contains('input-div__input')) {
                prevSibling.value++;
                prevSibling.dispatchEvent(new Event('input'));
        }
    }
}

function addInputEvents() {
    const [, inputFields, colorRgba, lastInputSet] = selectElements();

    inputFields.forEach(item => {
        item.addEventListener('input', (e) => {
            handleInput(e.target);
        });
    });

    colorRgba.forEach(item => {
        item.addEventListener('input', () => handleColor(colorRgba, lastInputSet));
    });
}

function selectElements() {
    const allInputSets = document.querySelectorAll('.input-wrapper');
    const lastInputSet = allInputSets[allInputSets.length - 1];
    const inputFields = lastInputSet.querySelectorAll('.input-div__input');
    const colorRgba = lastInputSet.querySelectorAll('.input-div__input-rgba');
    return [allInputSets, inputFields, colorRgba, lastInputSet];
}

function resetInputFields() {
    const [, inputFields, colorRgba, lastInputSet] = selectElements();

    inputFields.forEach((item, index) => {
        index !== inputFields.length - 1 ? item.value = '0' : item.value = '';
    });

    colorRgba.forEach(item => item.value = '');
    lastInputSet.querySelector('.checkbox-div__checkbox').checked = false;
}

function addNewInputSet(e) {
    const newInputSet = document.querySelector('.input-wrapper').cloneNode(true);
    const newShadowBox = document.createElement("div");
    newShadowBox.classList.add('shadow-boxes__shadow-box');
    newShadowBox.classList.add('shadow-boxes__shadow-box_shadow-box-absolute');
    e.target.insertAdjacentElement('beforebegin', newInputSet);
    document.querySelector('.shadow-boxes__shadow-box').insertAdjacentElement('afterend', newShadowBox);
    const [allInputSets,] = selectElements();
    allInputSets[allInputSets.length - 1].querySelector('.input-div__color').style.background = 'none';
    resetInputFields();
    addInputEvents();
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
            +alphaChannel >= 0 && +alphaChannel <= 100 ? hexArr.push(hexValue) : null;
        }
    });

    hexColor.value = '#' + hexArr.join('');
    hexColor.dispatchEvent(new Event('input'));
}

function handleInput(eTarget) {
    const [allInputSets,] = selectElements();
    const regExHex = new RegExp('^#(([0-9a-fA-F]{2}){3,4}|([0-9a-fA-F]){3,4})$');
    const isInset = [];
    
    eTarget.classList.contains('input-div__input_hex-color') && regExHex.test(eTarget.value) ?
        eTarget.nextElementSibling.style.background = eTarget.value : null;

    allInputSets.forEach(set => {
        isInset.push(set.querySelector('.checkbox-div__checkbox').checked);
        const inputFields = set.querySelectorAll('.input-div__input');
        
        if (!eTarget.classList.contains('input-div__input_hex-color')) {
            if (eTarget.classList.contains('input-div__input_negative')) {
                Number.isNaN(+eTarget.value) && eTarget.value[0] !== '-' ? eTarget.value = '0' : null;
            } 
            
            if(eTarget.classList.contains('input-div__input_not-negative')) {
                Number.isNaN(+eTarget.value) ? eTarget.value = '0' : null;
            }
        }

        regExHex.test(inputFields[4].value) || inputFields[4].value === '' ?
            drawShadow(allInputSets, isInset) : null;
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

function drawShadow(allInputSets, isInset) {
    const shadowBox = document.querySelectorAll('.shadow-boxes__shadow-box');
    let inset = '';
    allInputSets.forEach((item, index) => {
        const inputValues = item.querySelectorAll('.input-div__input');
        isInset[index] ? inset = 'inset' : inset = '';
        if (inputValues[4].value === '') return;
        shadowBox[index].style.boxShadow = `${inset} ${+inputValues[0].value}px ${+inputValues[1].value}px 
            ${+inputValues[2].value}px ${+ inputValues[3].value}px ${inputValues[4].value}`;
    });
}

initShadowTester();