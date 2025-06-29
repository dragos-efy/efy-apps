const $efy_drag =(list)=>{

let currentElement = '', initialX = 0, initialY = 0, x, y, chld = '*:not(.efy_no_drag, [efy_drag] > * > *, [efy_drag] [efy_drag_cursor])';

const isTouchDevice =()=>{ try { event.touches[0].clientX; return true} catch (e){ return false}},

getPosition =(value)=>{ let elementIndex;

  $$all(list, chld).forEach((element, index)=>{
    let elementValue = element.getAttribute("data-value");
    if (value == elementValue){ elementIndex = index}
  });
  return elementIndex;
},

dragStart =(e)=>{
  /*Target from pointer*/ if (isTouchDevice()){ initialX = e.touches[0].clientX; initialY = e.touches[0].clientY} else {initialX = e.clientX; initialY = e.clientY};
  currentElement = e.target; try { e.dataTransfer.setDragImage($('[efy_drag_cursor]'), 0, 0)} catch {/*Fix this*/}
},

dragOver =(e)=>{ e.preventDefault();
  /*Target from pointer*/ if (isTouchDevice()){ x = e.touches[0].clientX; y = e.touches[0].clientY} else {x = e.clientX; y = e.clientY}; targetElement = document.elementFromPoint(x, y);
  /*Active Class*/ $$all(list, '*').forEach(a => {a.classList.remove('active')}); targetElement.classList.add("active");
},

drop =(e)=>{ e.preventDefault();
  /*Target from pointer*/ if (isTouchDevice()){ x = e.touches[0].clientX; y = e.touches[0].clientY} else {x = e.clientX; y = e.clientY}; targetElement = document.elementFromPoint(x, y);

  /*Active Class*/ $$all(list, '*').forEach(a => {a.classList.remove('active')}); targetElement.classList.add("active"); $wait(0.3, ()=>{ targetElement.classList.remove("active") });

  let currentValue = currentElement.getAttribute("data-value"), targetValue = targetElement.getAttribute("data-value");
  /*Get index of current & target*/ let [currentPosition, targetPosition] = [getPosition(currentValue), getPosition(targetValue)]; initialX = x; initialY = y;

  if (list.contains(targetElement) && (list != targetElement) && (targetElement != currentElement) && currentElement.hasAttribute('data-value') && targetElement.hasAttribute('data-value') && (list.getAttribute('efy_drag') == 'on')){ try {
    if (currentPosition < targetPosition){ targetElement.insertAdjacentElement("afterend", currentElement)}
    else {targetElement.insertAdjacentElement("beforebegin", currentElement)}
  } catch (err){} }
};

if ($('#pn_drag_toggle').checked){ $$all(list, chld).forEach((a)=>{ a.draggable = true;
    $event(a, 'dragstart', dragStart, false); $event(a, 'dragover', dragOver, false); $event(a, 'drop', drop, false);
    $event(a, 'touchstart', dragStart, {passive: false}); $event(a, 'touchmove', drop, {passive: false});
})}
else { $$all(list, chld).forEach((a)=>{ a.draggable = false;
    $event_rm(a, 'dragstart', dragStart); $event_rm(a, 'dragover', dragOver); $event_rm(a, 'drop', drop);
    $event_rm(a, 'touchstart', dragStart); $event_rm(a, 'touchmove', drop);
})}

}