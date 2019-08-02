const socket = io();

socket.on("message", message => {
  console.log(message);
});

const form = document.querySelector("#message-form");

form.addEventListener("submit", evt => {
  evt.preventDefault();
  const messageInput = evt.target.elements.message;

  socket.emit("sendMessage", messageInput.value, error => {
    messageInput.value = "";
    messageInput.focus();

    if (error) {
      return console.log(error);
    }

    console.log("Message delivered!");
  });
});

document.querySelector("#send-location").addEventListener("click", evt => {
  if (!navigator.geolocation) {
    return alert("Geolocation is not supported by your browser ");
  }

  navigator.geolocation.getCurrentPosition(position => {
    socket.emit("sendLocation", {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  });
});
