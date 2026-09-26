fetch('http://localhost:3000/api/v1/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    firstName: "Test",
    lastName: "User",
    email: "test@example.com",
    role: "lawyer",
    passwordHash: "temp-password-hash",
    phone: "123"
  })
}).then(async r => {
  console.log(r.status);
  console.log(await r.text());
}).catch(console.error);
