//<reference types ="Cypress"/>

describe('Testes da Central de atendimento do cliente TAT', function () {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it ('verifica o titulo da aplicação', () => {
    cy.title().should('eq','Central de Atendimento ao Cliente TAT');
  })

  it ('preenche os campos obrigatórios e envia o formulário', () => {
    cy.get('#firstName').type('Angelina')
    cy.get('#lastName').type('Jolie')
    cy.get('#email').type('angelina@mailinator.com')
    cy.get('#phone').type('21999999999')
    cy.get('#open-text-area').type('estou satisfeito com o atendimento')
    cy.get('button[type="submit"]').click()
    cy.get('.success').should('be.visible')
  })


})



