describe('Technical API Tests LNK', () => {
  it('POST TC_01 - Create user with valid data', () => {
    cy.request({
      method: 'POST',
      url: 'https://reqres.in/api/users',
      body: {
        name: 'Niken Arra', 
        job: 'Quality Assurance' 
      }
    }).then((response) => {
      expect(response.status).to.eq(201)
      expect(response.body).to.have.property('name', 'Niken Arra')
      expect(response.body).to.have.property('job', 'Quality Assurance')
    })
  })

  it('POST TC_02 - Missing "job" field', () => {
    cy.request({
      method: 'POST',
      url: 'https://reqres.in/api/users',
      body: {
        name: 'Niken Arra'
      }
    }).then((response) => {
      expect(response.status).to.eq(201)
      expect(response.body).to.have.property('name', 'Niken Arra')
      expect(response.body).to.have.property('id')
      expect(response.body).to.have.property('createdAt')
    })
  })
  
  it('POST TC_03 - Invalid JSON format', () => {
    const invalidJson = `{
      "name": "tidak valid",
      "job": "penguji"
    `;
    cy.request({
      method: 'POST',
      url: 'https://reqres.in/api/users',
      body: invalidJson,
      failOnStatusCode: false,  
      headers: { 'Content-Type': 'application/json' }
    }).then((response) => {
      expect(response.status).to.eq(400)  
      cy.log(`TC_InvalidJson Passed: Status Code ${response.status}`)
    })
  })
  
  it('GET TC_04 - Returns list of all users', () => {
    cy.request({
      method: 'GET',
      url: 'https://reqres.in/api/users'
    }).then((response) => {
      expect(response.status).to.eq(200)  
      expect(response.body).to.have.property('data')  
      expect(response.body.data).to.be.an('array')  
      cy.log(`TC_UsersList Passed: Status Code ${response.status}, Number of users: ${response.body.data.length}`)
    })
  })

  it('GET TC_05 - Returns user by ID', () => {
    const userId = 2; 
    cy.request({
      method: 'GET',
      url: `https://reqres.in/api/users/${userId}`
    }).then((response) => {
      expect(response.status).to.eq(200)  
      expect(response.body).to.have.property('data')  
      expect(response.body.data).to.have.property('id', userId)  
      expect(response.body.data).to.have.property('email')  
      expect(response.body.data).to.have.property('first_name') 
      expect(response.body.data).to.have.property('last_name') 
      cy.log(`TC_UserById Passed: Status Code ${response.status}, User ID: ${response.body.data.id}`)
    })
  })

  it('PUT TC_06 - Update existing user', () => {
    const userId = 2;  
    const updatedUserData = {
      name: 'Niken Arra Updated',
      job: 'QA Engineer Updated'
    };
  
    cy.request({
      method: 'PUT',
      url: `https://reqres.in/api/users/${userId}`,
      body: updatedUserData
    }).then((response) => {
      expect(response.status).to.eq(200)  
      expect(response.body).to.have.property('name', updatedUserData.name)  
      expect(response.body).to.have.property('job', updatedUserData.job)  
      cy.log(`TC_UpdateUser Passed: Status Code ${response.status}, Updated User ID: ${response.body.id}`)
    })
  })

  it('DELETE TC_07 - Deletes user by ID', () => {
    const userId = 2; 
  
    cy.request({
      method: 'DELETE',
      url: `https://reqres.in/api/users/${userId}`,
      failOnStatusCode: false  
    }).then((response) => {
      expect(response.status).to.eq(204) 
      cy.log(`TC_DeleteUser Passed: Status Code ${response.status}`)
    })
  })
  
  
  

  });