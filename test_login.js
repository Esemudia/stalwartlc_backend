fetch('http://localhost:3000/api/v1/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'admin@stalwartlc.com', password: 'admin1234' })
}).then(async r => {
  console.log(r.status);
  console.log(await r.text());
}).catch(console.error);
