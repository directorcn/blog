async function sleep(t) {
    return new Promise(resolve => {
        setTimeout(resolve, t)
    });
}

async function createFlexItem(containerWidth, flexLines, flexLine, str) {
    let len = 9;

    if (str !== 'nowrap')
        container.classList.add('wrap')
    else {
        container.classList.value.includes('wrap') ?
            container.classList.remove('wrap') : null;
        len = 5;
    }

    for (let i = flexLine.length; i <= len; i ++) {
        let div = document.createElement('div');
       
        if (str !== 'flex') {
            i % 2 ? div.classList.add('cls') : null;
        } else {
            div.classList.add('cls2');
        }
        div.classList.add('item');

        await sleep(1500);
        container.appendChild(div);
        if (str === 'flex')
            i % 3 ? null : div.classList.add('flex');
        
        // flex item main size 
        let currentMainSize = flexLine.reduce((accumulator, current) => {
            return accumulator + current.width < containerWidth ? accumulator + current.width
                : containerWidth;
        }, 0);

        let currentCrossSize = flexLine.length && flexLine[0].crossSize ? flexLine[0].crossSize : 0;

        if (str === 'nowrap') {
            div.classList.add('absolute');
            div.style.top = `${currentCrossSize}px`;
            div.style.left = `${currentMainSize}px`;

            let width = div.getClientRects()[0].width;
            div.innerText = `${width}px`;

            flexLine.push({ width: div.classList.value.includes('flex') ? 0 : width });

            if (currentMainSize >= containerWidth) {
                await sleep(1500);
                for (let div of container.children) {
                    div.classList.remove('absolute');
                    div.style.top = 'auto';
                    div.style.left = 'auto';
                }
                for (let div of container.children) {
                    let width = Math.round(div.getClientRects()[0].width);
                    div.style.transition = '.5s';
                    await sleep(400);
                    div.innerText = `${width}px`;
                    div.style.color = div.style.color !== 'white' ? 'white' : 'black';
                }
            }
        } else if (str === 'wrap'){
            if (containerWidth - currentMainSize >= 0) {
                div.classList.add('absolute');
                div.style.top = `${currentCrossSize}px`;
                div.style.left = `${currentMainSize}px`;
                let width = div.getClientRects()[0].width;
                let height = div.getClientRects()[0].height;
                div.innerText = `${width}px`;

                // create new flexLine
                if (containerWidth === currentMainSize) {
                    flexLines.push(flexLine);
                    let map = flexLines[flexLines.length - 1].map(it => it.height);
                    let top = Math.max(...map); // flexLine MaxHeight
                    flexLine = [];
                    currentMainSize = 0;
                    currentCrossSize += top;
                    await sleep(1200);
                    div.style.top = `${currentCrossSize}px`;
                    div.style.left = `${currentMainSize}px`;
                    div.style.transition = '.5s';
                }

                flexLine.push({
                    div,
                    width: div.classList.value.includes('flex') ? 0 : width,
                    height,
                    crossSize: currentCrossSize
                });
            }
            if (i === len) {
                for (let div of container.children) {
                    await sleep(400);
                    div.innerText = 'crossSpace\nchange';
                    div.style.color = 'white';
                    div.classList.remove('absolute');
                }    
            }
        } else if (str === 'flex') {
            
        }
    }
}
