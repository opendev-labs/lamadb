# LamaDB 🦙 | Local Real-time Testing Guide

To test LamaDB locally in real-time, follow these 3 steps to manifest the sovereign engine and interact with the mesh.

### 1. Start the Sovereign Engine 🐳
LamaDB runs as a containerized persistent daemon. Launch it using Docker Compose:

```bash
# In /home/cube/syncstack/opendev-labs/LamaDB
docker compose up -d
```

Validates:
- Engine manifestation on port `5174`.
- Volume mapping for local state persistence.
- Mesh networking initialization.

---

### 2. Launch the High-Fidelity Console 🖥️
Since you already have `npx serve` running, the interactive dashboard is live.

**Visit:** `http://localhost:5000/dashboard.html` (Check terminal for exact port if 5000 is occupied).

**What to look for:**
- The "Mesh Live" heartbeat animation.
- Real-time connection status with `opendev-labs.github.io`.
- Live event stream simulating database transactions.

---

### 3. Orchestrate with the CLI ⌨️
Use the `lamadb` command to interact with your local node.

**Initialize & Manifest:**
```bash
./cli.js init
./cli.js up
```

**Real-time Mesh Sync:**
```bash
./cli.js sync
```
*Tip: This will show a live progression of state convergence in your terminal.*

**Check Node Health:**
```bash
./cli.js status
```

---

### 💳 Testing the Revenue Flow
To simulate the "Revenue-Scale" manifestation (Razorpay Webhook):

1. Ensure the provisioner is running: `node provisioner.js`
2. Trigger a mock payment:
```bash
curl -X POST http://localhost:5174/v1/webhooks/razorpay \
     -H "Content-Type: application/json" \
     -d '{"event":"payment.captured","payload":{"payment":{"entity":{"email":"tester@opendev-labs.io","notes":{"tier":"sovereign"}}}}}'
```
3. Watch the `provisioner.js` logs as it manifests a new node orchestration.
