function updateMovementControllerPosition(position) {
  const controlElements = document.getElementById('controlElements');
  const drawerControlsLeftAlignment = document.getElementById('drawerControlsLeftAlignment');
  const drawerControlsRightAlignment = document.getElementById('drawerControlsRightAlignment');
  const movementControlsAlignment = document.getElementById('movementControlsAlignment');

  const drawerControlsLeft = document.getElementById('drawerControlsLeft');
  const drawerControlsRight = document.getElementById('drawerControlsRight');
  const movementControls = document.getElementById('movementControls');

  const btnLeft = document.getElementById('btnLeft');
  const btnCenter = document.getElementById('btnCenter');
  const btnRight = document.getElementById('btnRight');

  btnLeft.classList.remove('btn-success', 'btn-settings');
  btnCenter.classList.remove('btn-success', 'btn-settings');
  btnRight.classList.remove('btn-success', 'btn-settings');

  drawerControlsLeftAlignment.style.width = 'fit-content';
  drawerControlsRightAlignment.style.width = 'fit-content';

  drawerControlsLeftAlignment.classList.remove('justify-content-start', 'justify-content-center', 'justify-content-end');
  drawerControlsRightAlignment.classList.remove('justify-content-start', 'justify-content-center', 'justify-content-end');
  movementControlsAlignment.classList.remove('justify-content-start', 'justify-content-center', 'justify-content-end');

  switch (position) {
    case "left":
      movementControls.style.order = 1;
      drawerControlsLeft.style.order = 2;
      drawerControlsRight.style.order = 3;

      drawerControlsRightAlignment.style.width = 'auto';

      movementControlsAlignment.classList.add('justify-content-start');
      drawerControlsLeftAlignment.classList.add('justify-content-end');
      drawerControlsRightAlignment.classList.add('justify-content-end');


      btnLeft.classList.add('btn-success');
      btnCenter.classList.add('btn-settings');
      btnRight.classList.add('btn-settings');
      break;
    case "center":
      drawerControlsLeft.style.order = 1;
      movementControls.style.order = 2;
      drawerControlsRight.style.order = 3;

      drawerControlsRightAlignment.classList.add('justify-content-end');
      drawerControlsLeftAlignment.classList.add('justify-content-start');
      movementControlsAlignment.classList.add('justify-content-center');
 
      btnCenter.classList.add('btn-success');
      btnLeft.classList.add('btn-settings');
      btnRight.classList.add('btn-settings');
      break;
    case "right":
      drawerControlsLeft.style.order = 1;
      drawerControlsRight.style.order = 2;
      movementControls.style.order = 3;

      drawerControlsLeftAlignment.style.width = 'auto';

      drawerControlsRightAlignment.classList.add('justify-content-start');
      drawerControlsLeftAlignment.classList.add('justify-content-start');
      movementControlsAlignment.classList.add('justify-content-end');

      btnRight.classList.add('btn-success');
      btnCenter.classList.add('btn-settings');
      btnLeft.classList.add('btn-settings');
      break;
  }
}

function toggleDrawer(drawerNumber) {
  var button = document.getElementById('drawer' + drawerNumber + '-toggle');
  if (button) { 
      var icon = button.querySelector('i');
      button.classList.toggle('btn-primary');
      button.classList.toggle('btn-danger');
      icon.classList.toggle('fa-lock-open');
      icon.classList.toggle('fa-lock'); 
    } else {
      console.error('Button not found with ID: drawer' + drawerNumber + '-toggle');
  }
}
  
function toggleLight(drawerNumber) {
  var button = document.getElementById('drawer' + drawerNumber + '-light');
  if (button) { 
    var icon = button.querySelector('i');

    button.classList.toggle('btn-normal');
    button.classList.toggle('btn-warning');

    icon.classList.toggle('fa-solid');
    icon.classList.toggle('fa-regular');

    icon.classList.toggle('icon-black');
    icon.classList.toggle('icon-white');
  } else {
    console.error('Button not found with ID: drawer' + drawerNumber + '-light');
  }
}