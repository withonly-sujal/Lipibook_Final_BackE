// Script to create admin account
// Run with: node create-admin.js

const API_URL = 'http://localhost:5000/api/auth/register';

const adminData = {
    email: 'admin@gmail.com',
    password: 'Admin@123456',  // Strong password meeting Firebase requirements
    displayName: 'System Administrator',
    role: 'admin'
};

async function createAdminAccount() {
    try {
        console.log('Creating admin account...');
        console.log('Email:', adminData.email);

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(adminData),
        });

        const data = await response.json();

        if (response.ok) {
            console.log('✅ Admin account created successfully!');
            console.log('User ID:', data.data.uid);
            console.log('Email:', data.data.email);
            console.log('Role:', data.data.role);
            console.log('\n' + '='.repeat(50));
            console.log('ADMIN LOGIN CREDENTIALS:');
            console.log('='.repeat(50));
            console.log('Email: admin@gmail.com');
            console.log('Password: Admin@123456');
            console.log('='.repeat(50));
        } else {
            console.error('❌ Failed to create account:', data.message);
        }
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

createAdminAccount();
