const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

mongoose.connect('mongodb://localhost:27017/stalwartlc').then(async () => {
    console.log("Connected. Seeding data...");
    const db = mongoose.connection;
    await db.collection('users').deleteMany({});
    await db.collection('clients').deleteMany({});
    await db.collection('matters').deleteMany({});
    await db.collection('documents').deleteMany({});

    const uid1 = new Types.ObjectId();
    const uid2 = new Types.ObjectId();

    await db.collection('users').insertMany([
        { _id: uid1, firstName: "Aghogho", lastName: "Okpako Esq", email: "a.okpako@stalwart.com", role: "lawyer", passwordHash: "blank", status: "active", createdAt: new Date() },
        { _id: uid2, firstName: "Admin", lastName: "System", email: "admin@stalwart.com", role: "super_admin", passwordHash: "blank", status: "active", createdAt: new Date() }
    ]);

    const cid1 = new Types.ObjectId();
    const cid2 = new Types.ObjectId();

    await db.collection('clients').insertMany([
        { _id: cid1, clientNumber: 'STW-CL-00101', firstName: 'Olympia', lastName: 'Hotels', type: 'corporate', email: 'legal@olympia.com', status: 'active', assignedLawyers: [uid1], createdAt: new Date() },
        { _id: cid2, clientNumber: 'STW-CL-00102', firstName: 'David', lastName: 'Ojo', type: 'individual', email: 'dojo@demo.com', status: 'active', assignedLawyers: [uid1], createdAt: new Date() }
    ]);

    const mid1 = new Types.ObjectId();

    await db.collection('matters').insertMany([
        { _id: mid1, matterNumber: 'SLC/2026/0010', title: 'Olympia Concessions & Negotiations', clientId: cid1, assignedLawyerIds: [uid1], paralegalIds: [], status: 'active', priority: 'high', openedAt: new Date(), createdAt: new Date() }
    ]);

    await db.collection('documents').insertMany([
        { _id: new Types.ObjectId(), documentNumber: 'STW-DOC-0050', name: 'Concession Terms v4', originalFileName: 'terms.pdf', clientId: cid1, matterId: mid1, category: 'contract', uploadedBy: uid1, currentVersion: 2, status: 'draft', tags: [], confidentiality: 'standard', createdAt: new Date() }
    ]);
    
    console.log("? Seed completed.");
    process.exit(0);
});
