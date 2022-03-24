const workContainerDiv = document.getElementById('work-container')

const workFolders = {
    'envelopes': ['sdf.png', 'https://drive.google.com/uc?export=view&id=1Mk6XBIKU08akBzfHip429UBoQuzZMKmk'], 
    'icarus': ['main.png', ], 
    'jewlerybox': ['r2.png', 'r2.1.jpg', ], 
    'portal': 
    ['main.png', 'bigFloatingStonesCavity.png','CavityPortal.png','cenromal.png',
    'PillarsCavity.png','PillarsNormal.png','portalEmisMap.png','r1.1.png','r1.png','scrs.png',
    'https://drive.google.com/uc?export=view&id=18kK9CK78RNMayXiyFuj7BGsl2GW3N-TM',], 
    'sword': ['main.png','r2.png' ],
    'boat':['r1.png']
}

const titles = {
    'envelopes': 'Cash Envelopes', 
    'icarus': 'Icarus Candle',
    'jewlerybox': 'Jewlery Box',
    'portal': 'Magic Portal Gate',
    'sword': 'Hidden Sword',
    'boat': 'Elven Boat'
}



function closeModal(e) {
    const openModal = document.getElementsByClassName('modal')[0]
    if (openModal && (e.target.id === 'modal' || e.target.id === 'close-button')) {
        document.body.removeChild(openModal)
    }
}

function createModalContent(modal, workFolderName) {
    let currentIndex = 0

    const modalContent = document.createElement('div')
    modalContent.id = 'modal-content'

    const closeButton = document.createElement('button')
    closeButton.className = 'close-modal-button'
    closeButton.id = 'close-button'
    closeButton.innerText = 'X'
    closeButton.onclick = (e) => closeModal(e)
    modalContent.appendChild(closeButton)

    const title = document.createElement('h3')
    title.className = 'modal-title'
    title.innerText = titles[workFolderName]
    modalContent.appendChild(title)

    const imageContainer = document.createElement('div')
    imageContainer.className = 'image-container'
    const prevButton = document.createElement('button')
    prevButton.className ="prevButton"
    prevButton.innerText = ''
    const nextButton = document.createElement('button')
    nextButton.className ="nextButton"
    nextButton.innerText = '>'

    let mainShowcase = document.createElement('img')

    if (workFolders[workFolderName][currentIndex].includes('https')) {
        mainShowcase = document.createElement('video')
    }


    prevButton.onclick = () => { 
        if (mainShowcase) {
            imageContainer.removeChild(mainShowcase)
        }

        currentIndex === 0 ? currentIndex = workFolders[workFolderName].length - 1 : currentIndex -= 1
        
        // is video
        if (workFolders[workFolderName][currentIndex].includes('https')) {
            mainShowcase = document.createElement('video')
            
            const showcaseSource = document.createElement('source')
            showcaseSource.src = `${workFolders[workFolderName][currentIndex]}`
            mainShowcase.controls=true
            mainShowcase.autoplay = false
            
            mainShowcase.appendChild(showcaseSource)
           
        } else { // is image
            mainShowcase = document.createElement('img')
            mainShowcase.src = `./images/work/${workFolderName}/${workFolders[workFolderName][currentIndex]}`
            
        }
        mainShowcase.className = 'shown-image'    

        if (workFolders[workFolderName].length === 1) {
            imageContainer.appendChild(mainShowcase)
        } else {
            imageContainer.appendChild(prevButton)
            imageContainer.appendChild(mainShowcase)
            imageContainer.appendChild(nextButton)
        }          
    }
 
    nextButton.onclick = () => {
        if (mainShowcase) {
            imageContainer.removeChild(mainShowcase)
        }

        currentIndex === workFolders[workFolderName].length - 1 ? currentIndex = 0 : currentIndex += 1

        // is video
        if (workFolders[workFolderName][currentIndex].includes('https')) {
            mainShowcase = document.createElement('video')
            
            const showcaseSource = document.createElement('source')
            showcaseSource.src = `${workFolders[workFolderName][currentIndex]}`
            console.log(showcaseSource.src)
            // showcaseSource.type = 'video/ogg'
            mainShowcase.controls=true
            mainShowcase.autoplay = false
            mainShowcase.appendChild(showcaseSource)
        } else { // is image
            mainShowcase = document.createElement('img')
            mainShowcase.src = `./images/work/${workFolderName}/${workFolders[workFolderName][currentIndex]}`
            
        }
        mainShowcase.className = 'shown-image'    
        
        if (workFolders[workFolderName].length === 1) {
            imageContainer.appendChild(mainShowcase)
        } else {
            imageContainer.appendChild(prevButton)
            imageContainer.appendChild(mainShowcase)
            imageContainer.appendChild(nextButton)
        }
    }

    mainShowcase.src = `./images/work/${workFolderName}/${workFolders[workFolderName][currentIndex]}`
    mainShowcase.className = 'shown-image'


    if (workFolders[workFolderName].length === 1) {
        imageContainer.appendChild(mainShowcase)
    } else {
        imageContainer.appendChild(prevButton)
        imageContainer.appendChild(mainShowcase)
        imageContainer.appendChild(nextButton)
    }

    modalContent.appendChild(imageContainer)

    modal.appendChild(modalContent)
}

function showModal(workFolderName) {    
    const modal = document.createElement('div')
    modal.className = 'modal'
    modal.id = 'modal'
    modal.onclick = (e) => closeModal(e)

    createModalContent(modal, workFolderName)
    document.body.appendChild(modal)
}

function addWorkImages() {
    Object.keys(workFolders).forEach((workFolderName) => {
        const myImg = document.createElement('img')
        myImg.src = `./images/work/${workFolderName}/${workFolders[workFolderName][0]}`
        myImg.alt = workFolderName
        myImg.className = 'work-image'
        myImg.onclick = () => showModal(workFolderName)
        workContainerDiv.appendChild(myImg)
    })
}

addWorkImages()
