<template>
  <div class="get-started">
    <div class="content">
      <div class="logo"><i class="bi bi-robot"></i></div>
      <h1>Amkyawdev-ai</h1>
      <p class="subhead">Burmese AI Bot for Everyone</p>
      <button @click="$router.push('/register')" class="btn btn-primary">Get Started</button>
      <p class="footer">Already have an account? <router-link to="/login">Login</router-link></p>
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
  background: linear-gradient(180deg, rgba(255,215,0,0.05) 0%, var(--bg) 50%);
  padding: 20px;
}
.content { text-align: center; max-width: 320px; width: 80%; }
.logo { width: 80px; height: 80px; background: linear-gradient(135deg, var(--gold), var(--gold-dark)); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px; }
.logo i { font-size: 2.5rem; color: #000; }
h1 { font-size: 28px; font-weight: 700; color: var(--gold); margin-bottom: 8px; }
.subhead { color: var(--text-secondary); font-size: 14px; margin-bottom: 32px; }
.btn { width: 100%; padding: 14px 28px; border-radius: 40px; font-weight: 700; font-size: 14px; cursor: pointer; transition: all 0.1s ease; }
.btn:active { transform: scale(0.97); }
.btn-primary { background: linear-gradient(135deg, var(--gold), var(--gold-dark)); color: #000; border: none; margin-bottom: 16px; }
.footer { color: var(--text-secondary); font-size: 13px; margin-top: 16px; }
.footer a { color: var(--gold); text-decoration: none; }
.badges { display: flex; gap: 12px; justify-content: center; margin-top: 32px; }
.badges span { font-size: 12px; color: var(--text-secondary); }
.badges i { color: var(--gold); margin-right: 4px; }
</style>
