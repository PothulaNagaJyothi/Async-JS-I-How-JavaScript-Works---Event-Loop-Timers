const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Enter seconds to count down: ", (input) => {
  let seconds = parseInt(input);

  if (isNaN(seconds) || seconds <= 0) {
    console.log("Invalid number.");
    rl.close();
    return;
  }

  console.log(`Countdown started from ${seconds} seconds...`);
  console.log('Press "s" to stop immediately.');

  let timer = setInterval(() => {
    console.log(`Time left: ${seconds}`);
    seconds--;

    if (seconds < 0) {
      clearInterval(timer);
      console.log("Countdown Complete!");
      rl.close();
    }
  }, 1000);

  function checkStopKey() {
    setTimeout(() => {
      rl.input.once("data", (data) => {
        const key = data.toString().trim();
        if (key === "s") {
          clearInterval(timer);
          console.log("Countdown Stopped by User.");
          rl.close();
        } else {
          checkStopKey(); 
        }
      });
    }, 200); 
  }

  checkStopKey();
});
