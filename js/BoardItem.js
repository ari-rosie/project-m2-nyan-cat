class BoardItem {
    constructor(width, height, parentElement) {
        this.domElement = document.createElement('div');
        this.domElement.style.width = width;
        this.domElement.style.height = height;
        parentElement.appendChild(this.domElement);
        
    }

    positionScreen(top, left, z) {
        this.domElement.style.position = 'fixed';
        this.domElement.style.top = top;
        this.domElement.style.left = left;
        this.domElement.style.zIndex = z;

    }

    setStyle(bkg, radius, border, cursor) {
        this.domElement.style.backgroundColor = bkg;
        this.domElement.style.borderRadius = radius;
        this.domElement.style.border = border;
        this.domElement.style.cursor = cursor;
    }

    addMessage(text) {
        this.domElement.innerText = text;
        this.domElement.style.textAlign = 'center';
        this.domElement.style.color = 'black';
        this.domElement.style.padding = '10px';

    }
}