export function insertBefore(newNode, targetDom){
    var parentNode = targetDom.parentNode;
    parentNode.insertBefore(newNode, targetDom);
}

export function createAddBtn(){
    var btn = document.createElement("button");
    btn.innerHTML = "add";
    btn.className = "addPrompt";
    return btn;
}