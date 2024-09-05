//<reference types ="Cypress"/>

describe('Testes da Central de atendimento do cliente TAT', function () {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it ('verifica o titulo da aplicação', () => {
    cy.title().should('eq','Central de Atendimento ao Cliente TAT');
  })

  it ('preenche os campos obrigatórios e envia o formulário', () => {
    const textoLongo = "Minha sincera gratidão pelo seu trabalho. Sua habilidade e empenho são um exemplo para todos nós. Sei que o caminho profissional nem sempre é fácil, mas você tem enfrentado desafios com coragem e perseverança, inspirando todos ao seu redor."
    cy.get('#firstName').type('Angelina')
    cy.get('#lastName').type('Jolie')
    cy.get('#email').type('angelina@mailinator.com')
    cy.get('#phone').type('21999999999')
    cy.get('#open-text-area').type(textoLongo, {delay:0})
    cy.get('button[type="submit"]').click()
    cy.get('.success').should('be.visible')
  })

  it ('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
  cy.get('#firstName').type('Brad')
  cy.get('#lastName').type('Pitt')
  cy.get('#email').type('mailinator.com')
  cy.get('#phone').type('21999999999')
  cy.get('#open-text-area').type('Não gostei do atendimento', {delay:0})
  cy.get('button[type="submit"]').click()
  cy.get('.error').should('be.visible')
  })


  it ('verifica se campo telefone somente aceita números', () =>{
    cy.get('#phone').type('abcdefgh')
      .should('have.value', '')


  })
})



