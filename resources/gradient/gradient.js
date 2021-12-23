export default class Gradient extends HTMLElement {

  static get observedAttributes() { return ['data']; }

  constructor () {
    super();
    this.i = 0;
    this.section = document.createElement('section');
    this.section.classList.add('timeline');

    const container = document.createElement('div');
    container.classList.add('container');
    this.section.appendChild(container);

    const timelineWrapper = document.createElement('div');
    timelineWrapper.classList.add('timeline__wrapper');
    container.appendChild(timelineWrapper);

    const timelineProgressbar = document.createElement('div');
    timelineProgressbar.classList.add('timeline__progressbar');
    timelineWrapper.appendChild(timelineProgressbar);


    const timelineBlock = this.buildBlock('10 Janvier 2020 12:50');
    timelineWrapper.appendChild(timelineBlock);

    const timelineBlock2 = this.buildBlock('10 Janvier 2020 12:51');
    timelineWrapper.appendChild(timelineBlock2);

    const timelineBlock3 = this.buildBlock('10 Janvier 2020 12:52');
    timelineWrapper.appendChild(timelineBlock3);
    




    //this.span.classList.add('badge-secondary');
    //this.span.innerHTML = this.i;
    this.$data = document.createElement('span');
    
    this.appendChild(this.$data);
    this.appendChild(this.section);
  }

  buildBlock(data){
    const timelineBlock = document.createElement('div');
    timelineBlock.classList.add('timeline__block');

    const timelineBlockBulletPoint = document.createElement('div');
    timelineBlockBulletPoint.classList.add('timeline__block__bullet-point');
    timelineBlock.appendChild(timelineBlockBulletPoint);

    const timelineBlockCircle = document.createElement('span');
    timelineBlockCircle.classList.add('timeline__block__circle');
    timelineBlockBulletPoint.appendChild(timelineBlockCircle);

    const timelineBlockHead = document.createElement('div');
    timelineBlockHead.classList.add('timeline__block__head');
    timelineBlock.appendChild(timelineBlockHead);

    const timelineBlockTitle = document.createElement('h1');
    timelineBlockTitle.classList.add('timeline__block__title');
    timelineBlockTitle.innerHTML = 'test'
    timelineBlockHead.appendChild(timelineBlockTitle);

    const timelineBlockBody = document.createElement('div');
    timelineBlockBody.classList.add('timeline__block__body');
    timelineBlock.appendChild(timelineBlockBody);

    const timelineBlockText = document.createElement('p');
    timelineBlockText.classList.add('timeline__block__text');
    timelineBlockText.innerHTML = data
    timelineBlockBody.appendChild(timelineBlockText);
    return timelineBlock;
  }

  connectedCallback () {
  }

  disconnectedCallback () {
    clearInterval(this.timer);
  }

  attributeChangedCallback (name, oldValue, newValue) {
    debugger;
    if (name === 'data' && oldValue !== newValue) {
      this.$data.innerHTML = newValue;
    }
  }

}