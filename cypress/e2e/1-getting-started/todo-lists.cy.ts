before(() => {
    cy.visit('localhost:4200/')
})

describe('default todo list', { testIsolation: false }, () => {
     
    it('displays the default todo list', () => {
        cy.get('.list-item-name').should('have.length', 2)
        cy.get('.list-item-name').first().should('have.value', 'Item 1')
        cy.get('.list-item-name').last().should('have.value', 'Item 2')
        cy.get('.list-name').should('have.value', Cypress.env("defaultListName"))
    })
  
    it('can add new todo items to default list', () => {
        const newItem = 'Walk the dog'

        cy.get('[name=newListItem]').type(`${newItem}{enter}`)
        cy.get('.list-item-name')
            .should('have.length', 3)
            .last()
            .should('have.value', newItem)
    })
  
    it('can check off an item as completed from default list', () => {
        cy.get('.progress-bar').should(el => expect(el.width()).equals(0))
        
        cy.get('.list-item-name').first()
            .parent()
            .parent()
            .find('input[type=checkbox]')
            .check()
            .parent()
            .find('input[type=checkbox]')
            .should('have.class', 'checked')
            
        cy.get('.progress-bar').should(el => expect(el.width()).above(0))
    })

    it('can remove todo items from default list', () => {
        cy.get('.list-item-name').first()
            .parent()
            .parent()
            .find('input[type=checkbox]')
            .check()
            .parent()
            .parent()
            .find('button')
            .click()
    })

    it('can edit todo items', () => {
        const updatedName = "updated name"

        cy.get('.list-item-name').first()
            .click()
            .clear()
            .type(`${updatedName}{enter}`)
            .should('have.value', updatedName)
    })

    it('can add notes for default list', () => {
        const newNote = "notes for testing";

        cy.get('.notes').type(newNote)
    })
})

describe('default todo list', { testIsolation: false }, () => {

    it('can create a new list', () => {
        const newList = 'Groceries'
        Cypress.env('groceryList', newList);

        cy.get('.create-input').type(`${newList}{enter}`)
        cy.get('.list-item-name').should('have.length', 2)
        .first().should('have.value', 'Item 1')
        cy.get('.list-item-name').last().should('have.value', 'Item 2')
        cy.get('.list-name').should('have.value', newList)
    })

    it('can add, remove, and update items on new list', () => {
        // add
        const newItem = 'apples'

        cy.get('[name=newListItem]').type(`${newItem}{enter}`)
        cy.get('.list-item-name')
        .should('have.length', 3)
        .last()
        .should('have.value', newItem)

        // remove
        cy.get('.list-item-name').first()
            .parent()
            .parent()
            .find('input[type=checkbox]')
            .check()
            .parent()
            .parent()
            .find('button')
            .click()

        // update 
        const updatedItemName = "almond milk"

        cy.get('.list-item-name').first()
            .click()
            .clear()
            .type(`${updatedItemName}{enter}`)
            .should('have.value', updatedItemName)
    })

    it('can add notes for new list', () => {
        const newNote = "notes for groceries";

        cy.get('.notes').type(newNote)
    })

    it('can switch between lists', () => {
        cy.get('.list-button')
        .first()
        .click()

        cy.get('.list-name').should('have.value', Cypress.env("defaultListName"))

        cy.get('.list-button')
        .last()
        .click()

        cy.get('.list-name').should('have.value', Cypress.env("groceryList"))
    })
    
    it('can change the name of the selected list', () => {
        const newListName = 'Chores'

        cy.get('.list-button')
        .first()
        .click()

        cy.get('.list-name')
        .clear()
        .type(`${newListName}{enter}`)
        .should('have.value', newListName)
    })
    
    it('can delete the selected list', () => {
        cy.get('.delete-button').click()
        cy.get('.list-button').should('have.length', 1)
    })

    it('can show message when there is no list selected', () => {
        cy.get('.list-button')
        .first()
        .click()

        cy.get('.list-item-name').first()
            .parent()
            .parent()
            .find('input[type=checkbox]')
            .check()
            .parent()
            .parent()
            .find('button')
            .click()

        cy.get('.list-item-name').first()
            .parent()
            .parent()
            .find('input[type=checkbox]')
            .check()
            .parent()
            .parent()
            .find('button')
            .click()

        cy.get('.empty-list-message').contains("Add items to the list.")
    })
    
    it('can show message when there are no lists', () => {
        cy.get('.delete-button').click()
        cy.get('.no-lists-message').contains("You have no to-do lists.")
    })

})