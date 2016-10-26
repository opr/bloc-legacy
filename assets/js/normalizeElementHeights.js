function normalizeElementHeights( selectorName ) {
    let selector = document.body.querySelectorAll( selectorName ),
        tallestHeight = 0;
    if( ! selector ) {
        return;
    }
    for(let i of selector){
        i.style.minHeight = 0;
        tallestHeight = i.offsetHeight > tallestHeight ? i.offsetHeight : tallestHeight;
    }
    for(let i of selector){
        i.style.minHeight = tallestHeight + "px";
    }
}