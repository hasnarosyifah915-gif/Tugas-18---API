describe("Quiz API Testing Reqres", () => {

    cy.visit = ("https://fakeapi.platzi.com/en/rest/categories", () => {

        
    })

    // 1 GET LIST USERS
    it("GET List Users", () => {
        cy.request(`${baseUrl}/users?page=2`)
        .then((res)=>{
            expect(res.status).to.eq(200)
            expect(res.body.data).to.have.length.greaterThan(0)
        })
    })

    // 2 GET SINGLE USER
    it("GET Single User", () => {
        cy.request(`${baseUrl}/users/2`)
        .then((res)=>{
            expect(res.status).to.eq(200)
            expect(res.body.data.id).to.eq(2)
        })
    })

    // 3 GET USER NOT FOUND
    it("GET User Not Found", () => {
        cy.request({
            url:`${baseUrl}/users/23`,
            failOnStatusCode:false
        })
        .then((res)=>{
            expect(res.status).to.eq(404)
        })
    })

    // 4 POST CREATE USER
    it("POST Create User", () => {
        cy.request("POST",`${baseUrl}/users`,{
            name:"Hasna",
            job:"QA Engineer"
        }).then((res)=>{
            expect(res.status).to.eq(201)
            expect(res.body.name).to.eq("Hasna")
        })
    })

    // 5 PUT UPDATE USER
    it("PUT Update User", () => {
        cy.request("PUT",`${baseUrl}/users/2`,{
            name:"Hasna Update",
            job:"QA Lead"
        }).then((res)=>{
            expect(res.status).to.eq(200)
            expect(res.body.name).to.eq("Hasna Update")
        })
    })

    // 6 PATCH UPDATE USER
    it("PATCH Update User", () => {
        cy.request("PATCH",`${baseUrl}/users/2`,{
            job:"Senior QA"
        }).then((res)=>{
            expect(res.status).to.eq(200)
            expect(res.body.job).to.eq("Senior QA")
        })
    })

    // 7 DELETE USER
    it("DELETE User", () => {
        cy.request("DELETE",`${baseUrl}/users/2`)
        .then((res)=>{
            expect(res.status).to.eq(204)
        })
    })

    // 8 REGISTER SUCCESS
    it("POST Register Success", () => {
        cy.request("POST",`${baseUrl}/register`,{
            email:"eve.holt@reqres.in",
            password:"pistol"
        }).then((res)=>{
            expect(res.status).to.eq(200)
            expect(res.body).to.have.property("token")
        })
    })

    // 9 REGISTER FAILED
    it("POST Register Failed", () => {
        cy.request({
            method:"POST",
            url:`${baseUrl}/register`,
            failOnStatusCode:false,
            body:{
                email:"sydney@fife"
            }
        }).then((res)=>{
            expect(res.status).to.eq(400)
            expect(res.body.error).to.exist
        })
    })

    // 10 DELAY RESPONSE
    it("GET Delayed Response", () => {
        cy.request(`${baseUrl}/users?delay=3`)
        .then((res)=>{
            expect(res.status).to.eq(200)
        })
    })

})
