<template>
  <div class="get-started">
    <div class="container">
      <div class="logo">
        <i class="bi bi-robot"></i>
      </div>
      <h1>Amkyawdev-ai</h1>
      <p class="subtitle">Burmese AI Bot for Everyone</p>
      
      <button class="btn btn-gold" @click="$router.push('/register')">
        Get Started
      </button>
      
      <p class="footer">
        Already have an account? 
        <router-link to="/login">Login</router-link>
      </p>
      
      <div class="badges">
        <span><i class="bi bi-shield-check"></i> Secure</span>
        <span><i class="bi bi-lightning-charge"></i> Fast</span>
        <span><i class="bi bi-cloud"></i> Cloud</span>
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
  background: linear-gradient(180deg, rgba(255,215,0,0.08) 0%, var(--bg) 100%);
}

.container {
  text-align: center;
  padding: 24px;
}

.logo {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, var(--gold), var(--gold-dark));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
  box-shadow: 0 0 40px rgba(255,215,0,0.3);
}

.logo i {
  font-size: 2.5rem;
  color: #000;
}

h1 {
  font-size: 28px;
  font-weight: 700;
  color: var(--gold);
  margin-bottom: 8px;
}

.subtitle {
  color: var(--text-secondary);
  font-size: 14px;
  margin-bottom: 32px;
}

.btn {
  display: block;
  width: 100%;
  max-width: 280px;
  padding: 14px 28px;
  border-radius: 28px;
  font-weight: 700;
  font-size: 15px;
  border: none;
  cursor: pointer;
  margin: 0 auto;
  transition: all 0.2s ease;
}

.btn:active {
  transform: scale(0.97);
}

.btn-gold {
  background: linear-gradient(135deg, var(--gold), var(--gold-dark));
  color: #000;
}

.footer {
  color: var(--text-secondary);
  font-size: 13px;
  margin-top: 20px;
}

.footer a {
  color: var(--gold);
  text-decoration: none;
}

.badges {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 40px;
}

.badges span {
  font-size: 12px;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  gap: 4px;
}

.badges i {
  color: var(--gold);
}
</style>
