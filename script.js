class Subject {
  constructor() {
    this.observers = [];
    this.state = null;
  }

  attach(observer) {
    this.observers.push(observer);
  }

  detach(observer) {
    this.observers = this.observers.filter((o) => o !== observer);
  }

  notify() {
    this.observers.forEach((observer) => observer.update(this));
  }

  setState(state) {
    this.state = state;
    this.notify();
  }

  getState() {
    return this.state;
  }
}

class Observer {
  update(subject) {}
}

class ConcreteObserver1 extends Observer {
  update(subject) {
    const observerDiv = document.getElementById("observer1");
    const currentState = subject.getState();

    // Change background color  - observer 1
    observerDiv.style.backgroundColor =
      currentState === "Sunny"
        ? "#FF9800"
        : currentState === "Rainy"
        ? "#3F51B5"
        : "#4CAF50";
    document.getElementById("state1").innerText = "Weather: " + currentState;
  }
}

class ConcreteObserver2 extends Observer {
  update(subject) {
    const observerDiv = document.getElementById("observer2");
    const currentState = subject.getState();

    // change background color  - observer 2
    observerDiv.style.backgroundColor =
      currentState === "Stormy"
        ? "#F44336"
        : currentState === "Cloudy"
        ? "#9E9E9E"
        : "#2196F3";
    document.getElementById("state2").innerText = "Weather: " + currentState;
  }
}

const subject = new Subject();
const observer1 = new ConcreteObserver1();
const observer2 = new ConcreteObserver2();

// initially attach both observers
// subject.attach(observer1);
// subject.attach(observer2);

// update state button event
document.getElementById("changeState").onclick = () => {
  const stateInput = document.getElementById("stateInput").value;
  if (stateInput) {
    subject.setState(stateInput);
    document.getElementById("output").innerHTML +=
      "State changed to: " + stateInput + "<br>";
  } else {
    document.getElementById("output").innerHTML +=
      "Please enter a valid state.<br>";
  }
};

// attach and detach buttons - observer 1
document.getElementById("attach1").onclick = () => {
  subject.attach(observer1);
  document.getElementById("output").innerHTML += "Attached Observer 1.<br>";
};

document.getElementById("detach1").onclick = () => {
  subject.detach(observer1);
  document.getElementById("output").innerHTML += "Detached Observer 1.<br>";
};

// attach and detach buttons - observer 2
document.getElementById("attach2").onclick = () => {
  subject.attach(observer2);
  document.getElementById("output").innerHTML += "Attached Observer 2.<br>";
};

document.getElementById("detach2").onclick = () => {
  subject.detach(observer2);
  document.getElementById("output").innerHTML += "Detached Observer 2.<br>";
};
