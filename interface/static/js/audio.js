function toggleAudioInput() {
    var button = document.getElementById('microphoneToggle');
    if (button) { 
        var icon = button.querySelector('i');

        button.classList.toggle('btn-success');
        button.classList.toggle('btn-danger');
        icon.classList.toggle('fa-microphone');
        icon.classList.toggle('fa-microphone-slash'); 
      } else {
        console.error('Button not found with ID: microphoneToggle');
    }
  }
    
  function toggleAudioOutput() {
    var button = document.getElementById('speakersToggle');
    if (button) { 
      var icon = button.querySelector('i');

      button.classList.toggle('btn-success');
      button.classList.toggle('btn-danger');
      icon.classList.toggle('fa-volume-up');
      icon.classList.toggle('fa-volume-xmark');
    } else {
      console.error('Button not found with ID: speakersToggle');
    }
  }