document.addEventListener('DOMContentLoaded', function () {
  async function hashSHA256(message) {
      const encoder = new TextEncoder();
      const data = encoder.encode(message);
      const hashBuffer = await crypto.subtle.digest("SHA-256", data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  async function crackSHA256(targetHash) {
      document.getElementById('result').textContent = "Cracking... Please wait.";
      
      for (let i = 100; i <= 999; i++) {
          let hash = await hashSHA256(i.toString());
          if (hash === targetHash) {
              document.getElementById('result').textContent = `✅ Found! The original number is: ${i}`;
              return;
          }
      }
      document.getElementById('result').textContent = "❌ No match found.";
  }

  window.startCracking = function () {
      let hashInput = document.getElementById("hashInput").value.trim();
      if (hashInput.length !== 64) {
          document.getElementById("result").textContent = "⚠️ Invalid SHA256 hash!";
          return;
      }
      crackSHA256(hashInput);
  };
});