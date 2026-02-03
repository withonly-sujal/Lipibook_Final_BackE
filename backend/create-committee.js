// Script to create committee account with proper password
// Run with: node create-committee.js

const API_URL = 'http://localhost:5000/api/auth/register';

const committeeData = {
    email: 'sujal.kadam20805@gmail.com',
    password: 'Committee@123',  // Strong password meeting Firebase requirements
    displayName: 'Sujal Kadam',
    role: 'committee'
};

async function createCommitteeAccount() {
    try {
        console.log('Creating committee account...');
        console.log('Email:', committeeData.email);

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(committeeData),
        });

        const data = await response.json();

        if (response.ok) {
            console.log('✅ Committee account created successfully!');
            console.log('User ID:', data.data.uid);
            console.log('Email:', data.data.email);
            console.log('Role:', data.data.role);
            console.log('\n' + '='.repeat(50));
            console.log('COMMITTEE LOGIN CREDENTIALS:');
            console.log('='.repeat(50));
            console.log('Email: sujal.kadam20805@gmail.com');
            console.log('Password: Committee@123');
            console.log('='.repeat(50));
        } else {
            console.error('❌ Failed to create account:', data.message);
        }
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

createCommitteeAccount();
