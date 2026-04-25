<template>
  <div class="get-started">
    <div class="content">
      <div class="logo">
        <i class="fas fa-robot"></i>
      </div>
      <h1>Amkyawdev AI</h1>
      <p class="tagline">Your Smart AI Assistant</p>
      
      <button @click="$router.push('/register')" class="btn btn-primary">
        Get Started
      </button>
      <button @click="$router.push('/login')" class="btn btn-outline">
        Login
      </button>
      
      <div class="badges">
        <span class="badge"><i class="fas fa-shield-alt"></i> Secure</span>
        <span class="badge"><i class="fas fa-bolt"></i> Fast</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.get-started {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0A0A0A, #1a1a2e);
  padding: 20px;
}

.content {
  text-align: center;
  max-width: 320px;
}

.logo {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, var(--gold), var(--gold-dark));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
}

.logo i {
  font-size: 3rem;
  color: #000;
}

h1 {
  font-size: 2rem;
  font-weight: 800;
  color: var(--gold);
  margin-bottom: 8px;
}

.tagline {
  color: var(--text-secondary);
  margin-bottom: 32px;
}

.btn {
  width: 100%;
  padding: 14px 28px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  margin-bottom: 12px;
  transition: transform 0.2s;
}

.btn:active {
  transform: scale(0.97);
}

.btn-primary {
  background: linear-gradient(135deg, var(--gold), var(--gold-dark));
  color: #000;
  border: none;
}

.btn-outline {
  background: transparent;
  border: 2px solid var(--gold);
  color: var(--gold);
}

.badges {
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-top: 24px;
}

.badge {
  background: rgba(255, 215, 0, 0.15);
  color: var(--gold);
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 12px;
}
</style>
